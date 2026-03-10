"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Mail className="w-7 h-7 text-primary-light" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Stay in the Loop
          </h2>
          <p className="text-muted mb-6">
            Get weekly relationship insights, new episode alerts, and exclusive
            content delivered to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-sm text-primary-light">
              <Check className="w-5 h-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-full bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-xs text-muted mt-3">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
