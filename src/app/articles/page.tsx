"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Clock,
  User,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Crown,
} from "lucide-react";
import { articles as staticArticles, articleCategories } from "@/data/content";
import type { Article } from "@/data/content";

type SortOption = "date" | "readTime" | "title";

export default function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [articles, setArticles] = useState<Article[]>(staticArticles);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((cms: Article[]) => {
        if (cms.length > 0) setArticles([...staticArticles, ...cms]);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let result = [...articles];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.tags.some((t) => t.includes(q))
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (article) => article.category === selectedCategory
      );
    }

    switch (sortBy) {
      case "date":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "readTime":
        result.sort(
          (a, b) =>
            parseInt(a.readTime) - parseInt(b.readTime)
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [articles, search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-primary-light" />
            <h1 className="text-3xl sm:text-4xl font-bold">Articles</h1>
          </div>
          <p className="text-muted max-w-xl">
            Expert insights on love, dating, emotional intelligence, and
            building healthier relationships.
          </p>

          {/* Search */}
          <div className="mt-6 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm"
            />
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {articleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
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
                className="bg-surface border border-border rounded-lg px-2 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                <option value="date">Latest</option>
                <option value="readTime">Quick Reads</option>
                <option value="title">A-Z</option>
              </select>
            </div>

            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                aria-label="Grid view"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
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
                    ? "bg-primary text-white"
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
          {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Articles grid/list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No articles found</p>
            <p className="text-sm text-muted mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-xl bg-surface border border-border hover:border-primary/50 transition-all overflow-hidden"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 relative flex items-center justify-center">
        <BookOpen className="w-10 h-10 text-white/20" />
        {article.isPremium ? (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-accent/90 text-white text-xs font-medium flex items-center gap-1">
            <Crown className="w-3 h-3" /> Premium
          </span>
        ) : article.featured ? (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-accent/90 text-white text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" /> Featured
          </span>
        ) : null}
        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs">
          {article.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary-light transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-muted line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span>
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <User className="w-3 h-3 text-muted" />
          <span className="text-xs text-muted">{article.author.name}</span>
        </div>
      </div>
    </Link>
  );
}

function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all"
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-6 h-6 text-primary-light" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm truncate group-hover:text-primary-light transition-colors">
            {article.title}
          </h3>
          {article.isPremium ? (
            <Crown className="w-4 h-4 text-accent flex-shrink-0" />
          ) : article.featured ? (
            <Star className="w-4 h-4 text-accent flex-shrink-0" />
          ) : null}
        </div>
        <p className="text-xs text-muted mt-0.5 line-clamp-1">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted">
          <span className="text-primary-light">{article.category}</span>
          <span>&middot;</span>
          <Clock className="w-3 h-3" />
          <span>{article.readTime}</span>
          <span>&middot;</span>
          <span>{article.author.name}</span>
          <span>&middot;</span>
          <span>
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
