"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { LogIn, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch {
      // Error is handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Admin Login
          </h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Sign in to manage your content
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
        >
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--muted)] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) clearError();
              }}
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="input-field"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--muted)] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) clearError();
              }}
              required
              placeholder="Your password"
              autoComplete="current-password"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !email.trim() || !password}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
