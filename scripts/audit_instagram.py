#!/usr/bin/env python3
"""Build a read-only visual and metadata audit of a downloaded Instagram media folder."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont, ImageOps


MEDIA_PATTERN = re.compile(
    r"^(?P<account>[^_]+)_(?P<timestamp>\d+)_(?P<media_id>\d+)_(?P<user_id>\d+)_(?P<sequence>\d+)$"
)
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
VIDEO_EXTENSIONS = {".mp4", ".mov", ".m4v", ".webm"}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def parsed_name(path: Path) -> dict[str, Any]:
    match = MEDIA_PATTERN.match(path.stem)
    if not match:
        return {
            "account": "unknown",
            "timestamp": None,
            "published_utc": None,
            "media_id": None,
            "user_id": None,
            "sequence": None,
            "post_key": path.stem,
        }

    values = match.groupdict()
    timestamp = int(values["timestamp"])
    return {
        "account": values["account"],
        "timestamp": timestamp,
        "published_utc": datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat(),
        "media_id": values["media_id"],
        "user_id": values["user_id"],
        "sequence": int(values["sequence"]),
        "post_key": f'{values["account"]}_{values["timestamp"]}',
    }


def probe_video(path: Path, ffprobe: str) -> dict[str, Any]:
    command = [
        ffprobe,
        "-v",
        "error",
        "-show_entries",
        "format=duration,size,bit_rate:stream=index,codec_type,codec_name,width,height,avg_frame_rate,bit_rate:format_tags",
        "-of",
        "json",
        str(path),
    ]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode != 0:
        return {"probe_error": result.stderr.strip() or "ffprobe failed"}

    raw = json.loads(result.stdout)
    video_stream = next(
        (stream for stream in raw.get("streams", []) if stream.get("codec_type") == "video"),
        {},
    )
    audio_stream = next(
        (stream for stream in raw.get("streams", []) if stream.get("codec_type") == "audio"),
        None,
    )
    raw_duration = raw.get("format", {}).get("duration")
    return {
        "width": video_stream.get("width"),
        "height": video_stream.get("height"),
        "duration_seconds": round(float(raw_duration), 3) if raw_duration else None,
        "video_codec": video_stream.get("codec_name"),
        "frame_rate": video_stream.get("avg_frame_rate"),
        "has_audio": audio_stream is not None,
        "audio_codec": audio_stream.get("codec_name") if audio_stream else None,
        "embedded_tags": raw.get("format", {}).get("tags", {}),
    }


def contain_image(image: Image.Image, size: tuple[int, int], background: str = "#14120f") -> Image.Image:
    prepared = ImageOps.exif_transpose(image).convert("RGB")
    prepared.thumbnail(size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, background)
    offset = ((size[0] - prepared.width) // 2, (size[1] - prepared.height) // 2)
    canvas.paste(prepared, offset)
    return canvas


def make_image_thumbnail(source: Path, destination: Path) -> tuple[int, int]:
    with Image.open(source) as image:
        dimensions = image.size
        thumb = contain_image(image, (260, 290))
        destination.parent.mkdir(parents=True, exist_ok=True)
        thumb.save(destination, "JPEG", quality=86, optimize=True)
        return dimensions


def make_video_storyboard(
    source: Path,
    destination: Path,
    duration: float | None,
    ffmpeg: str,
) -> bool:
    destination.parent.mkdir(parents=True, exist_ok=True)
    safe_duration = max(duration or 1.0, 0.25)
    filters = (
        f"fps=fps={3.0 / safe_duration:.8f}:round=near,"
        "scale=240:300:force_original_aspect_ratio=decrease,"
        "pad=240:300:(ow-iw)/2:(oh-ih)/2:color=0x14120f,"
        "tile=3x1:padding=3:margin=0"
    )
    command = [
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        str(source),
        "-vf",
        filters,
        "-frames:v",
        "1",
        "-q:v",
        "3",
        "-y",
        str(destination),
    ]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode == 0 and destination.exists():
        return True

    fallback = [
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-ss",
        str(safe_duration * 0.5),
        "-i",
        str(source),
        "-vf",
        "scale=720:300:force_original_aspect_ratio=decrease,pad=720:300:(ow-iw)/2:(oh-ih)/2:color=0x14120f",
        "-frames:v",
        "1",
        "-q:v",
        "3",
        "-y",
        str(destination),
    ]
    result = subprocess.run(fallback, capture_output=True, text=True, check=False)
    return result.returncode == 0 and destination.exists()


def text_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/segoeui.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def label_for(item: dict[str, Any], compact: bool = False) -> list[str]:
    date = "unknown date"
    if item.get("published_utc"):
        date = item["published_utc"][:10]
    if compact:
        return [f'{item["index"]:03} · {item["account"]} · {date}', item["filename"][-42:]]
    return [
        f'{item["index"]:03} · {item["account"]} · {date}',
        item["filename"][:52],
    ]


def make_sheets(
    records: list[dict[str, Any]],
    thumbnail_root: Path,
    sheet_root: Path,
    kind: str,
) -> None:
    sheet_root.mkdir(parents=True, exist_ok=True)
    is_video = kind == "video"
    columns = 3 if is_video else 5
    rows = 4
    thumb_width = 430 if is_video else 260
    media_height = 180 if is_video else 290
    label_height = 58
    cell_height = media_height + label_height
    per_sheet = columns * rows
    font = text_font(15 if is_video else 13)
    secondary = text_font(11)

    for sheet_index in range(0, len(records), per_sheet):
        batch = records[sheet_index : sheet_index + per_sheet]
        sheet = Image.new("RGB", (columns * thumb_width, rows * cell_height), "#ece5d8")
        draw = ImageDraw.Draw(sheet)
        for batch_index, item in enumerate(batch):
            column = batch_index % columns
            row = batch_index // columns
            x = column * thumb_width
            y = row * cell_height
            thumb_path = thumbnail_root / item["thumbnail"]
            if thumb_path.exists():
                with Image.open(thumb_path) as thumb_source:
                    thumb = contain_image(thumb_source, (thumb_width, media_height), "#14120f")
                    sheet.paste(thumb, (x, y))
            draw.rectangle((x, y + media_height, x + thumb_width, y + cell_height), fill="#f7f1e7")
            lines = label_for(item, compact=is_video)
            draw.text((x + 8, y + media_height + 7), lines[0], fill="#16130f", font=font)
            draw.text((x + 8, y + media_height + 32), lines[1], fill="#5e574c", font=secondary)
            draw.rectangle((x, y, x + thumb_width - 1, y + cell_height - 1), outline="#a99d8b", width=1)

        output = sheet_root / f"{kind}-{sheet_index // per_sheet + 1:02}.jpg"
        sheet.save(output, "JPEG", quality=88, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--reuse", action="store_true", help="Reuse existing thumbnails/storyboards")
    args = parser.parse_args()

    source = args.source.resolve()
    output = args.output.resolve()
    ffmpeg = shutil.which("ffmpeg")
    ffprobe = shutil.which("ffprobe")
    if not source.exists():
        raise SystemExit(f"Source folder does not exist: {source}")
    if not ffmpeg or not ffprobe:
        raise SystemExit("ffmpeg and ffprobe are required")

    paths = sorted(
        path
        for path in source.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS | VIDEO_EXTENSIONS
    )
    output.mkdir(parents=True, exist_ok=True)
    records: list[dict[str, Any]] = []

    for index, path in enumerate(paths, start=1):
        kind = "image" if path.suffix.lower() in IMAGE_EXTENSIONS else "video"
        parsed = parsed_name(path)
        relative = path.relative_to(source).as_posix()
        thumb_relative = f'{kind}s/{index:04}.jpg'
        thumb_path = output / "thumbs" / thumb_relative
        record: dict[str, Any] = {
            "index": index,
            "filename": path.name,
            "source_relative": relative,
            "kind": kind,
            "extension": path.suffix.lower(),
            "bytes": path.stat().st_size,
            "sha256": sha256(path),
            "thumbnail": thumb_relative,
            **parsed,
        }

        if kind == "image":
            try:
                if args.reuse and thumb_path.exists():
                    with Image.open(path) as image:
                        width, height = image.size
                else:
                    width, height = make_image_thumbnail(path, thumb_path)
                record.update({"width": width, "height": height})
            except Exception as error:  # pragma: no cover - audit should continue
                record["audit_error"] = str(error)
        else:
            probe = probe_video(path, ffprobe)
            record.update(probe)
            if not (args.reuse and thumb_path.exists()):
                made = make_video_storyboard(path, thumb_path, probe.get("duration_seconds"), ffmpeg)
                if not made:
                    record["storyboard_error"] = "ffmpeg storyboard extraction failed"

        records.append(record)
        if index % 25 == 0 or index == len(paths):
            print(f"Audited {index}/{len(paths)}", flush=True)

    image_records = [record for record in records if record["kind"] == "image"]
    video_records = [record for record in records if record["kind"] == "video"]
    make_sheets(image_records, output / "thumbs", output / "sheets", "image")
    make_sheets(video_records, output / "thumbs", output / "sheets", "video")

    hash_groups: dict[str, list[str]] = defaultdict(list)
    for record in records:
        hash_groups[record["sha256"]].append(record["source_relative"])
    duplicates = [group for group in hash_groups.values() if len(group) > 1]
    post_counts = Counter(record["post_key"] for record in records)
    account_counts = Counter(record["account"] for record in records)
    kind_counts = Counter(record["kind"] for record in records)
    summary = {
        "source": str(source),
        "generated_utc": datetime.now(tz=timezone.utc).isoformat(),
        "asset_count": len(records),
        "post_count": len(post_counts),
        "accounts": dict(sorted(account_counts.items())),
        "kinds": dict(sorted(kind_counts.items())),
        "duplicate_groups": duplicates,
        "earliest_published_utc": min(
            (record["published_utc"] for record in records if record["published_utc"]),
            default=None,
        ),
        "latest_published_utc": max(
            (record["published_utc"] for record in records if record["published_utc"]),
            default=None,
        ),
    }
    (output / "media-index.json").write_text(
        json.dumps({"summary": summary, "assets": records}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(json.dumps(summary, indent=2), flush=True)


if __name__ == "__main__":
    main()
