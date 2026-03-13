"use client";

import AuthProvider, { useAuth } from "@/components/AuthProvider";
import AdminLogin from "@/components/AdminLogin";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}
