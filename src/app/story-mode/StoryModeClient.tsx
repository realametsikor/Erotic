"use client";

import Link from "next/link";
import {
  Play,
  Clock,
  Headphones,
  Heart,
  Sparkles,
  Leaf,
  Flame,
  ChevronRight,
  Crown,
} from "lucide-react";
import { episodes } from "@/data/episodes";
import type { Story } from "@/data/stories";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  sparkles: Sparkles,
  leaf: Leaf,
  flame: Flame,
};

interface Props {
  stories: Story[];
}

export default function StoryModeClient({ stories }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/15 via-accent/5 to-background py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-6">
            <Headphones className="w-4 h-4" />
            Immersive Listening
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              Story Mode
            </span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Curated audio journeys that weave episodes together into seamless
            listening experiences. Pick a story, press play, and let the
            narrative carry you.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-center mb-10">
          How Story Mode Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Pick a Story",
              desc: "Choose a curated journey that matches your mood or interest.",
            },
            {
              step: "2",
              title: "Press Play",
              desc: "Episodes play in sequence with an integrated audio player.",
            },
            {
              step: "3",
              title: "Stay Immersed",
              desc: "Auto-advance between episodes and track your progress throughout.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  const Icon = iconMap[story.icon] || Headphones;
  const storyEpisodes = story.episodeSlugs
    .map((slug) => episodes.find((ep) => ep.slug === slug))
    .filter(Boolean);

  const hasPremium = storyEpisodes.some((ep) => ep?.isPremium);

  return (
    <Link
      href={`/story-mode/${story.slug}`}
      className="group block rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all overflow-hidden"
    >
      {/* Header gradient */}
      <div
        className={`bg-gradient-to-r ${story.gradient} p-6 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {story.title}
            </h3>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5" />
                {story.episodeSlugs.length} episodes
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.totalDuration}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-white" fill="white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-muted mb-4 leading-relaxed">
          {story.description}
        </p>

        {/* Episode list preview */}
        <div className="space-y-2">
          {storyEpisodes.map((ep, i) =>
            ep ? (
              <div
                key={ep.slug}
                className="flex items-center gap-3 text-sm"
              >
                <span className="w-5 h-5 rounded-full bg-primary/15 text-primary-light text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted truncate flex-1">
                  {ep.title}
                </span>
                <span className="text-xs text-muted/60 flex-shrink-0">
                  {ep.duration}
                </span>
                {ep.isPremium && (
                  <Crown className="w-3 h-3 text-accent flex-shrink-0" />
                )}
              </div>
            ) : null
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-sm font-medium text-primary-light group-hover:text-accent transition-colors flex items-center gap-1">
            Start Listening
            <ChevronRight className="w-4 h-4" />
          </span>
          {hasPremium && (
            <span className="text-xs text-accent flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Includes premium
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
