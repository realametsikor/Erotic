"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  MessageCircle,
  Heart,
  Calendar,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Link2,
  Send,
  User,
} from "lucide-react";
import type { Confession } from "@/data/content";

interface Props {
  confession: Confession;
  relatedConfessions: Confession[];
}

export default function ConfessionDetailClient({
  confession,
  relatedConfessions,
}: Props) {
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    { id: string; text: string; date: string }[]
  >([]);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        text: comment.trim(),
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    setComment("");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-accent/15 via-surface/50 to-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/confessions"
              className="hover:text-foreground transition-colors"
            >
              Confessions
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">
              {confession.title}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
              {confession.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-light text-muted text-xs font-medium">
              Anonymous
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            &ldquo;{confession.title}&rdquo;
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-6">
            {confession.preview}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(confession.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              {confession.commentCount + comments.length} comments
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
              {confession.content.split("\n\n").map((block, i) => (
                <p key={i} className="text-muted leading-relaxed my-4 text-base">
                  {block}
                </p>
              ))}
            </article>

            {/* Interaction bar */}
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  liked
                    ? "bg-accent/20 text-accent"
                    : "bg-surface border border-border text-muted hover:text-accent hover:border-accent/50"
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={liked ? "currentColor" : "none"}
                />
                {liked ? "Sending love" : "Send love"}
              </button>
            </div>

            {/* Comments */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                Comments ({confession.commentCount + comments.length})
              </h3>

              {/* Comment form */}
              <form onSubmit={handleComment} className="mb-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your thoughts anonymously..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      maxLength={300}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted">
                        {comment.length}/300
                      </p>
                      <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-3 h-3" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* User comments */}
              {comments.length > 0 && (
                <div className="space-y-4 mb-6">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-surface border border-accent/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                          <User className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-xs font-medium text-accent">
                          Anonymous
                        </span>
                        <span className="text-xs text-muted">
                          &middot; Just now
                        </span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Placeholder existing comments */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-3 h-3 text-primary-light" />
                    </div>
                    <span className="text-xs font-medium">Anonymous</span>
                    <span className="text-xs text-muted">
                      &middot; 2 days ago
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    Thank you for sharing this. I felt every word. You&apos;re
                    not alone in this.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-3 h-3 text-primary-light" />
                    </div>
                    <span className="text-xs font-medium">Anonymous</span>
                    <span className="text-xs text-muted">
                      &middot; 5 days ago
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    This hit close to home. Sending you all the love and
                    strength. It gets better, I promise.
                  </p>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/confessions"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary-light transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all confessions
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Anonymous card */}
            <div className="p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Anonymous</p>
                  <p className="text-xs text-muted">Shared bravely</p>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                This confession was shared anonymously. Heartcast provides a
                safe space for people to share their deepest feelings without
                judgment.
              </p>
            </div>

            {/* Share */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
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

            {/* Send Love */}
            <button
              onClick={() => setLiked(!liked)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                liked
                  ? "bg-accent/20 border border-accent/30 text-accent"
                  : "bg-surface border border-border hover:border-accent/50 hover:text-accent"
              }`}
            >
              <Heart
                className="w-4 h-4"
                fill={liked ? "currentColor" : "none"}
              />
              {liked ? "Love sent" : "Send love"}
            </button>

            {/* Related confessions */}
            <div>
              <h3 className="text-sm font-semibold mb-3">
                More Confessions
              </h3>
              <div className="space-y-3">
                {relatedConfessions.map((c) => (
                  <Link
                    key={c.id}
                    href={`/confessions/${c.slug}`}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold line-clamp-2 group-hover:text-accent transition-colors">
                        &ldquo;{c.title}&rdquo;
                      </h4>
                      <p className="text-xs text-muted mt-0.5">
                        {c.category}
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
