"use client";

import { useState } from "react";
import {
  HelpCircle,
  Send,
  Heart,
  Shield,
  Mic,
  MessageCircle,
  Star,
  ChevronDown,
} from "lucide-react";

const categories = [
  "Relationships",
  "Dating",
  "Breakups",
  "Intimacy",
  "Communication",
  "Self-Love",
  "Marriage",
  "Situationships",
  "Other",
];

const featuredQuestions = [
  {
    question: "How do I know if I'm settling or just being realistic?",
    category: "Relationships",
    answered: true,
    episode: "Ep. 47",
  },
  {
    question: "Is it normal to feel lonely even in a relationship?",
    category: "Communication",
    answered: true,
    episode: "Ep. 52",
  },
  {
    question:
      "How do you rebuild trust after emotional cheating?",
    category: "Breakups",
    answered: true,
    episode: "Ep. 38",
  },
  {
    question: "What's the difference between love and attachment?",
    category: "Self-Love",
    answered: false,
    episode: null,
  },
  {
    question: "How do I set boundaries without pushing people away?",
    category: "Communication",
    answered: false,
    episode: null,
  },
  {
    question: "When is the right time to define the relationship?",
    category: "Dating",
    answered: true,
    episode: "Ep. 41",
  },
];

export default function AskPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredQuestions =
    selectedFilter === "All"
      ? featuredQuestions
      : featuredQuestions.filter((q) => q.category === selectedFilter);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    })
      .then(() => {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-6 h-6 text-primary-light" />
            <h1 className="text-3xl sm:text-4xl font-bold">
              Ask Us Anything
            </h1>
          </div>
          <p className="text-muted max-w-xl">
            Got a burning question about love, relationships, or intimacy?
            Submit it anonymously and it might get answered on the podcast.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border">
              <Shield className="w-8 h-8 text-accent shrink-0" />
              <div>
                <p className="text-sm font-semibold">100% Anonymous</p>
                <p className="text-xs text-muted">
                  No account or personal info needed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border">
              <Mic className="w-8 h-8 text-primary-light shrink-0" />
              <div>
                <p className="text-sm font-semibold">Featured on Podcast</p>
                <p className="text-xs text-muted">
                  Best questions get answered on air
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border">
              <MessageCircle className="w-8 h-8 text-accent shrink-0" />
              <div>
                <p className="text-sm font-semibold">Expert Answers</p>
                <p className="text-xs text-muted">
                  Thoughtful responses from the hosts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7 text-primary-light" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Question Submitted!
                </h3>
                <p className="text-sm text-muted max-w-sm mx-auto">
                  Thanks for your question! If selected, it will be answered in
                  an upcoming episode.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-1">
                  Submit Your Question
                </h2>
                <p className="text-sm text-muted mb-6">
                  All submissions are anonymous. Be real, be honest.
                </p>

                <form
                  name="questions"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="questions" />

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Your Question <span className="text-accent">*</span>
                    </label>
                    <textarea
                      name="question"
                      required
                      placeholder="What's on your mind? Ask anything about love, relationships, intimacy..."
                      rows={4}
                      maxLength={800}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        defaultValue="Relationships"
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-primary text-sm appearance-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Extra Context{" "}
                      <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <textarea
                      name="context"
                      placeholder="Any background that would help us understand your situation better..."
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Nickname{" "}
                      <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      placeholder="A fun alias, e.g. 'Confused in Lagos'"
                      maxLength={50}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                    Submit Question
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Previously Asked */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-2">Previously Asked</h2>
        <p className="text-sm text-muted mb-6">
          Questions from the community — some answered, some coming soon.
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {["All", ...new Set(featuredQuestions.map((q) => q.category))].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === cat
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((q, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-colors"
            >
              <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary-light text-xs font-medium mb-3">
                {q.category}
              </span>
              <p className="text-sm font-medium leading-relaxed mb-3">
                &ldquo;{q.question}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                {q.answered ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Answered — {q.episode}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-surface-light text-muted text-xs font-medium">
                    <MessageCircle className="w-3 h-3" />
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No questions in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
