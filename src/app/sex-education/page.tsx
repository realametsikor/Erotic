"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  ArrowRight,
} from "lucide-react";
import { sexEdGuides } from "@/data/content";
import type { SexEdGuide } from "@/data/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
};

export default function SexEducationPage() {
  const [search, setSearch] = useState("");
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  const filtered = search
    ? sexEdGuides.filter(
        (g) =>
          g.title.toLowerCase().includes(search.toLowerCase()) ||
          g.description.toLowerCase().includes(search.toLowerCase()) ||
          g.keyTopics.some((t) =>
            t.toLowerCase().includes(search.toLowerCase())
          )
      )
    : sexEdGuides;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 via-accent/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-7 h-7 text-primary-light" />
              <h1 className="text-3xl sm:text-4xl font-bold">
                Sex Education Knowledge Hub
              </h1>
            </div>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Evidence-based guides on consent, intimacy, communication, and
              emotional connection. Explore thoughtfully written resources
              designed to help you build healthier, more fulfilling
              relationships.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search guides and topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 py-4">
            {sexEdGuides.map((guide) => {
              const Icon = iconMap[guide.icon] || Heart;
              return (
                <a
                  key={guide.id}
                  href={`#guide-${guide.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-sm text-muted hover:text-primary-light hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {guide.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results count */}
      {search && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <p className="text-sm text-muted">
            {filtered.length} guide{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      {/* Guides */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No guides found</p>
            <p className="text-sm text-muted mt-1">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                isExpanded={expandedGuide === guide.id}
                onToggle={() =>
                  setExpandedGuide(
                    expandedGuide === guide.id ? null : guide.id
                  )
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="bg-surface/50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Want to learn more?
          </h2>
          <p className="text-muted mb-6 leading-relaxed">
            Explore our articles section for in-depth features on relationships,
            dating, and emotional well-being.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function GuideCard({
  guide,
  isExpanded,
  onToggle,
}: {
  guide: SexEdGuide;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = iconMap[guide.icon] || Heart;

  return (
    <div
      id={`guide-${guide.slug}`}
      className="rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all scroll-mt-24"
    >
      {/* Guide header */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-6 text-left"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary-light" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold mb-1">{guide.title}</h2>
              <p className="text-sm text-muted leading-relaxed">
                {guide.description}
              </p>
            </div>
            <div className="flex-shrink-0 mt-1">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock className="w-3 h-3" />
              {guide.readTime}
            </span>
            {guide.keyTopics.map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-full bg-primary/10 text-primary-light text-xs"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-0">
          <div className="border-t border-border pt-6 ml-16">
            <article className="prose prose-invert max-w-none">
              {guide.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h3
                      key={i}
                      className="text-base font-bold mt-6 mb-2 text-foreground first:mt-0"
                    >
                      {block.replace("## ", "")}
                    </h3>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-sm text-muted leading-relaxed my-2.5"
                  >
                    {block}
                  </p>
                );
              })}
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
