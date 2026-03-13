"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { KeyRound, Loader2, AlertCircle } from "lucide-react";

export default function PasswordReset() {
  const { error, clearError, resetPassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(newPassword);
    } catch {
      // Error is handled in AuthProvider
    } finally {
      setSubmitting(false);
    }
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
            <KeyRound className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Set New Password
          </h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Enter a new password for your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
        >
          {displayError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{displayError}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-[var(--muted)] mb-1"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setValidationError(null);
                if (error) clearError();
              }}
              required
              minLength={6}
              placeholder="Enter new password"
              autoComplete="new-password"
              className="input-field"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-[var(--muted)] mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setValidationError(null);
                if (error) clearError();
              }}
              required
              minLength={6}
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !newPassword || !confirmPassword}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <KeyRound className="w-4 h-4" />
            )}
            {submitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
