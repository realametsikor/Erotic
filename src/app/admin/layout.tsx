import type { Metadata } from "next";
import AdminAuthGate from "./AdminAuthGate";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] overflow-auto -mt-16">
      <AdminAuthGate>{children}</AdminAuthGate>
    </div>
  );
}
