"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { menuItems, type MenuCategory, type MenuItem } from "@/lib/brand-data";

type Filter = "All" | MenuCategory;
const filters: Filter[] = ["All", "Breakfast", "Summer menu"];

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const inFilter = filter === "All" || item.category === filter;
      const inSearch =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized);
      return inFilter && inSearch;
    });
  }, [filter, query]);

  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        window.setTimeout(() => returnFocusRef.current?.focus(), 0);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  function open(item: MenuItem, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setSelected(item);
  }

  function close() {
    setSelected(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }

  return (
    <>
      <section className="v5-menu-explorer" aria-labelledby="menu-explorer-title">
        <div className="v5-menu-explorer__bar">
          <div>
            <SlidersHorizontal aria-hidden="true" size={18} />
            <span>Browse the supplied menu</span>
          </div>
          <label className="v5-menu-search">
            <span className="sr-only">Search menu</span>
            <Search aria-hidden="true" size={18} />
            <input
              type="search"
              placeholder="Search a drink or plate"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="v5-menu-filters" aria-label="Menu categories">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "is-active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              <span>
                {item === "All"
                  ? menuItems.length
                  : menuItems.filter((menuItem) => menuItem.category === item).length}
              </span>
            </button>
          ))}
        </div>

        <div className="v5-menu-explorer__result-line" aria-live="polite">
          <h2 id="menu-explorer-title">
            {filter === "All" ? "Everything we can verify" : filter}
          </h2>
          <span>{visibleItems.length} items</span>
        </div>

        {visibleItems.length > 0 ? (
          <div className="v5-menu-grid">
            {visibleItems.map((item, index) => (
              <article className={`v5-menu-card v5-accent--${item.accent}`} id={item.id} key={item.id}>
                <Link className="v5-menu-card__link" href={`/menu/${item.id}`} aria-label={`Open ${item.name} page`}>
                  <span className="v5-menu-card__image">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                    <span className="v5-menu-card__number">0{index + 1}</span>
                  </span>
                  <span className="v5-menu-card__copy">
                    <span>{item.category}</span>
                    <strong>{item.name}</strong>
                    <small>{item.serviceNote}</small>
                  </span>
                </Link>
                <button className="v5-menu-card__quick" type="button" onClick={(event) => open(item, event.currentTarget)}>
                  <Eye aria-hidden="true" size={16} /> Quick view <ArrowUpRight aria-hidden="true" size={15} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="v5-menu-empty">
            <strong>No match yet.</strong>
            <p>Try “matcha”, “tofu”, “chicken”, or clear the filters.</p>
            <button type="button" onClick={() => { setQuery(""); setFilter("All"); }}>
              Reset menu
            </button>
          </div>
        )}
      </section>

      {selected && (
        <div className="v5-drawer-backdrop" role="presentation" onMouseDown={close}>
          <aside
            className="v5-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-drawer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button ref={closeRef} className="v5-drawer-close" type="button" onClick={close}>
              <X aria-hidden="true" size={20} /> Close
            </button>
            <div className="v5-menu-drawer__image">
              <Image src={selected.image} alt={selected.imageAlt} fill sizes="(max-width: 680px) 100vw, 48vw" />
            </div>
            <div className="v5-menu-drawer__copy">
              <span>{selected.category}</span>
              <h2 id="menu-drawer-title">{selected.name}</h2>
              <p>{selected.description}</p>
              <dl>
                <div><dt>Service</dt><dd>{selected.serviceNote}</dd></div>
                <div><dt>Source</dt><dd>Official post · {selected.published}</dd></div>
                <div><dt>Price</dt><dd>Confirm in store</dd></div>
              </dl>
              <p className="v5-source-note">
                Ingredient and availability information is limited to what appears in the supplied official media.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
