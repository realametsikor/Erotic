"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Calendar,
  Tag,
  Share2,
  Heart,
  User,
  Twitter,
  Facebook,
  Link2,
  ArrowLeft,
} from "lucide-react";
import type { Article } from "@/data/content";

interface Props {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetailClient({
  article,
  relatedArticles,
}: Props) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="bg-gradient-to-b from-primary/15 via-surface/50 to-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/articles"
              className="hover:text-foreground transition-colors"
            >
              Articles
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{article.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-medium">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author.name}
              <span className="text-xs">({article.author.role})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <article className="prose prose-invert max-w-none">
              {article.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-xl font-bold mt-8 mb-3 text-foreground"
                    >
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3
                      key={i}
                      className="text-lg font-semibold mt-6 mb-2 text-foreground"
                    >
                      {block.replace("### ", "")}
                    </h3>
                  );
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="space-y-1.5 my-3">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-muted leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{renderInlineFormatting(item.replace(/^- /, ""))}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (/^\d+\./.test(block)) {
                  const items = block.split("\n").filter((l) => /^\d+\./.test(l));
                  return (
                    <ol key={i} className="space-y-1.5 my-3">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-muted leading-relaxed"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {j + 1}
                          </span>
                          <span>{renderInlineFormatting(item.replace(/^\d+\.\s*/, ""))}</span>
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={i} className="text-muted leading-relaxed my-3">
                    {renderInlineFormatting(block)}
                  </p>
                );
              })}
            </article>

            {/* Back to articles */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author card */}
            <div className="p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{article.author.name}</p>
                  <p className="text-xs text-muted">{article.author.role}</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium hover:border-primary/50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
              {showShareMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 rounded-xl bg-surface border border-border space-y-2 z-10">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors">
                    <Twitter className="w-4 h-4" /> Twitter
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors">
                    <Facebook className="w-4 h-4" /> Facebook
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-light transition-colors">
                    <Link2 className="w-4 h-4" /> Copy Link
                  </button>
                </div>
              )}
            </div>

            {/* Save */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors">
              <Heart className="w-4 h-4" />
              Save Article
            </button>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary-light" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-surface-light text-xs text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Related Articles</h3>
              <div className="space-y-3">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.id}
                    href={`/articles/${a.slug}`}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-primary-light" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold line-clamp-2 group-hover:text-primary-light transition-colors">
                        {a.title}
                      </h4>
                      <p className="text-xs text-muted mt-0.5">
                        {a.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Split on **bold** patterns
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
