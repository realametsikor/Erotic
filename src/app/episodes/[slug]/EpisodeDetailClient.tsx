"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Clock,
  Calendar,
  Tag,
  Share2,
  Crown,
  ChevronDown,
  ChevronUp,
  Headphones,
  Heart,
  MessageCircle,
  Twitter,
  Facebook,
  Link2,
} from "lucide-react";
import type { Episode } from "@/data/episodes";

interface Props {
  episode: Episode;
  relatedEpisodes: Episode[];
}

export default function EpisodeDetailClient({
  episode,
  relatedEpisodes,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Episode Header */}
      <section className="bg-gradient-to-b from-primary/15 via-surface/50 to-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/episodes"
              className="hover:text-foreground transition-colors"
            >
              Episodes
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{episode.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-medium">
              {episode.category}
            </span>
            {episode.isPremium && (
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium flex items-center gap-1">
                <Crown className="w-3 h-3" /> Premium
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            {episode.title}
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-6">
            {episode.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-8">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {episode.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(episode.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4" />
              {episode.popularity}% popular
            </span>
          </div>

          {/* Audio Player */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" fill="white" />
                )}
              </button>
              <div className="flex-1">
                <p className="font-semibold text-sm">{episode.title}</p>
                <p className="text-xs text-muted">Heartcast Podcast</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-muted">
                <span>
                  {Math.floor((progress / 100) * 42)}:
                  {String(
                    Math.floor(((progress / 100) * 42 * 60) % 60)
                  ).padStart(2, "0")}
                </span>
                <span>{episode.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video player */}
            {episode.videoUrl && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary-light" />
                  Watch Episode
                </h2>
                <div className="aspect-video rounded-xl overflow-hidden border border-border">
                  <iframe
                    src={episode.videoUrl}
                    title={episode.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Summary */}
            <div>
              <h2 className="text-xl font-bold mb-3">Episode Summary</h2>
              <p className="text-muted leading-relaxed">{episode.summary}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold mb-3">Key Highlights</h2>
              <ul className="space-y-2">
                {episode.highlights.map((hl, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {hl}
                  </li>
                ))}
              </ul>
            </div>

            {/* Transcript */}
            <div>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center gap-2 text-lg font-bold hover:text-primary-light transition-colors"
              >
                Transcript
                {showTranscript ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {showTranscript && (
                <div className="mt-3 p-4 rounded-xl bg-surface border border-border">
                  <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                    {episode.transcript}
                  </p>
                </div>
              )}
            </div>

            {/* Comments section placeholder */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary-light" />
                Comments
              </h2>
              <div className="p-6 rounded-xl bg-surface border border-border text-center">
                <MessageCircle className="w-10 h-10 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted">
                  Join the conversation — comments coming soon!
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium hover:border-primary/50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Episode
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

            {/* Like */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors">
              <Heart className="w-4 h-4" />
              Save Episode
            </button>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary-light" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {episode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-surface-light text-xs text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Ad placement */}
            <div className="p-4 rounded-xl bg-surface border border-border text-center">
              <p className="text-xs text-muted mb-2">Advertisement</p>
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                <p className="text-xs text-muted">Ad Space</p>
              </div>
            </div>

            {/* Related Episodes */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Related Episodes</h3>
              <div className="space-y-3">
                {relatedEpisodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/episodes/${ep.slug}`}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-primary-light" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold line-clamp-2 group-hover:text-primary-light transition-colors">
                        {ep.title}
                      </h4>
                      <p className="text-xs text-muted mt-0.5">
                        {ep.duration}
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
