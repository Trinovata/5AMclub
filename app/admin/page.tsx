import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Operations concept",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
