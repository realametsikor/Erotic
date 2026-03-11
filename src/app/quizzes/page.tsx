"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  Users,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowRight,
} from "lucide-react";
import { quizzes, quizCategories } from "@/data/content";
import type { Quiz } from "@/data/content";

type SortOption = "popular" | "questions" | "title";

export default function QuizzesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...quizzes];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(q) ||
          quiz.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((quiz) => quiz.category === selectedCategory);
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.takenCount - a.takenCount);
        break;
      case "questions":
        result.sort((a, b) => a.questionCount - b.questionCount);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-accent/10 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-6 h-6 text-accent" />
            <h1 className="text-3xl sm:text-4xl font-bold">
              Relationship Quizzes
            </h1>
          </div>
          <p className="text-muted max-w-xl">
            Discover more about yourself and your love life with our fun,
            insightful quizzes.
          </p>

          {/* Search */}
          <div className="mt-6 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm"
            />
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {quizCategories.map((cat) => (
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

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-surface border border-border rounded-lg px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-accent"
              >
                <option value="popular">Most Popular</option>
                <option value="questions">Fewest Questions</option>
                <option value="title">A-Z</option>
              </select>
            </div>

            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                aria-label="Grid view"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 ${
                  viewMode === "grid"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                aria-label="List view"
                onClick={() => setViewMode("list")}
                className={`p-1.5 ${
                  viewMode === "list"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-6">
          {filtered.length} quiz{filtered.length !== 1 ? "zes" : ""} found
        </p>

        {/* Quizzes grid/list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No quizzes found</p>
            <p className="text-sm text-muted mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((quiz) => (
              <QuizListItem key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link
      href={`/quizzes/${quiz.slug}`}
      className="group block rounded-xl bg-surface border border-border hover:border-accent/50 transition-all overflow-hidden"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-primary/20 relative flex items-center justify-center">
        <HelpCircle className="w-12 h-12 text-accent/40" />
        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs">
          {quiz.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {quiz.title}
        </h3>
        <p className="text-xs text-muted line-clamp-2">{quiz.description}</p>
        <div className="flex items-center justify-between text-xs text-muted pt-1">
          <span>{quiz.questionCount} questions</span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {(quiz.takenCount / 1000).toFixed(1)}k taken
          </span>
        </div>
        <div className="pt-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all">
            Take Quiz <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function QuizListItem({ quiz }: { quiz: Quiz }) {
  return (
    <Link
      href={`/quizzes/${quiz.slug}`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all"
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
        <HelpCircle className="w-6 h-6 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate group-hover:text-accent transition-colors">
          {quiz.title}
        </h3>
        <p className="text-xs text-muted mt-0.5 line-clamp-1">
          {quiz.description}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted">
          <span className="text-accent">{quiz.category}</span>
          <span>&middot;</span>
          <span>{quiz.questionCount} questions</span>
          <span>&middot;</span>
          <Users className="w-3 h-3" />
          <span>{(quiz.takenCount / 1000).toFixed(1)}k taken</span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors flex-shrink-0" />
    </Link>
  );
}
