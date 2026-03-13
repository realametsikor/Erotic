"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { LogIn, Loader2, AlertCircle, ArrowLeft, Mail } from "lucide-react";

export default function AdminLogin() {
  const { login, error, clearError, requestRecovery } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);

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

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) return;
    setSubmitting(true);
    try {
      await requestRecovery(recoveryEmail.trim());
      setRecoverySent(true);
    } catch {
      // Error is handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  if (showRecovery) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Reset Password
            </h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              {recoverySent
                ? "Check your email for a reset link"
                : "Enter your email to receive a reset link"}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {recoverySent ? (
              <div className="text-center space-y-3">
                <p className="text-sm text-[var(--foreground)]">
                  A password reset link has been sent to{" "}
                  <strong>{recoveryEmail}</strong>. Please check your inbox and
                  follow the link to reset your password.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowRecovery(false);
                    setRecoverySent(false);
                    setRecoveryEmail("");
                    clearError();
                  }}
                  className="inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:opacity-80 transition-opacity"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="recovery-email"
                    className="block text-sm font-medium text-[var(--muted)] mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="recovery-email"
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => {
                      setRecoveryEmail(e.target.value);
                      if (error) clearError();
                    }}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="input-field"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !recoveryEmail.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  {submitting ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRecovery(false);
                      clearError();
                    }}
                    className="inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:opacity-80 transition-opacity"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

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

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowRecovery(true);
                clearError();
              }}
              className="text-sm text-[var(--primary)] hover:opacity-80 transition-opacity"
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
