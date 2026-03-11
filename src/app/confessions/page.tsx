"use client";

import { useState, useMemo } from "react";
import {
  Search,
  MessageSquare,
  MessageCircle,
  SlidersHorizontal,
  Send,
  PenLine,
  X,
  Heart,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { confessions, confessionCategories } from "@/data/content";
import type { Confession } from "@/data/content";

type SortOption = "date" | "comments" | "title";

export default function ConfessionsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [showForm, setShowForm] = useState(false);
  const [localConfessions, setLocalConfessions] = useState<Confession[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    preview: "",
    category: "Secrets",
  });
  const [submitted, setSubmitted] = useState(false);

  const allConfessions = useMemo(
    () => [...localConfessions, ...confessions],
    [localConfessions]
  );

  const filtered = useMemo(() => {
    let result = [...allConfessions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.preview.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    switch (sortBy) {
      case "date":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "comments":
        result.sort((a, b) => b.commentCount - a.commentCount);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy, allConfessions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.preview.trim()) return;

    const newConfession: Confession = {
      id: `local-${Date.now()}`,
      slug: `confession-${Date.now()}`,
      title: formData.title.trim(),
      preview: formData.preview.trim(),
      content: formData.preview.trim(),
      category: formData.category,
      commentCount: 0,
      date: new Date().toISOString().split("T")[0],
    };

    setLocalConfessions((prev) => [newConfession, ...prev]);
    setFormData({ title: "", preview: "", category: "Secrets" });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-accent/10 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-6 h-6 text-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold">
              Anonymous Confessions
            </h1>
          </div>
          <p className="text-muted max-w-xl">
            Real stories from real people — shared anonymously. A safe space to
            share what&apos;s on your heart.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search confessions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm"
              />
            </div>

            {/* Submit button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-accent to-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <PenLine className="w-4 h-4" />
              Share Your Story
            </button>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      {showForm && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-surface border border-accent/30 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  Thank you for sharing
                </h3>
                <p className="text-sm text-muted">
                  Your confession has been added anonymously.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-accent" />
                  Share Your Confession
                </h3>
                <p className="text-sm text-muted mb-4">
                  Everything is anonymous. No account needed.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Give your confession a title..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      maxLength={100}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Your Story
                    </label>
                    <textarea
                      placeholder="Share what's on your heart..."
                      value={formData.preview}
                      onChange={(e) =>
                        setFormData({ ...formData, preview: e.target.value })
                      }
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm resize-none"
                    />
                    <p className="text-xs text-muted mt-1 text-right">
                      {formData.preview.length}/500
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-accent text-sm"
                    >
                      {confessionCategories
                        .filter((c) => c !== "All")
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      !formData.title.trim() || !formData.preview.trim()
                    }
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent to-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Submit Anonymously
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {confessionCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-accent text-white"
                    : "bg-surface border border-border text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-surface border border-border rounded-lg px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-accent"
            >
              <option value="date">Latest</option>
              <option value="comments">Most Discussed</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-6">
          {filtered.length} confession{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Confessions list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No confessions found</p>
            <p className="text-sm text-muted mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((confession) => (
              <ConfessionCard key={confession.id} confession={confession} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ConfessionCard({ confession }: { confession: Confession }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group p-6 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all">
      <span className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-3">
        {confession.category}
      </span>
      <Link href={`/confessions/${confession.slug}`}>
        <h3 className="font-semibold text-sm mb-2 group-hover:text-accent transition-colors">
          &ldquo;{confession.title}&rdquo;
        </h3>
      </Link>
      <p className="text-xs text-muted leading-relaxed line-clamp-3">
        {confession.preview}
      </p>
      <Link
        href={`/confessions/${confession.slug}`}
        className="flex items-center gap-1 text-xs text-accent mt-1 hover:underline"
      >
        Read full story <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
      </Link>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <MessageCircle className="w-3 h-3" />
          <span>{confession.commentCount} comments</span>
          <span>&middot;</span>
          <span>
            {new Date(confession.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className={`p-1.5 rounded-lg transition-colors ${
            liked
              ? "text-accent"
              : "text-muted hover:text-accent"
          }`}
        >
          <Heart
            className="w-4 h-4"
            fill={liked ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}
