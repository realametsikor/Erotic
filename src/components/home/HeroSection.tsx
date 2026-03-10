import Link from "next/link";
import { Play, Clock, Headphones } from "lucide-react";
import { episodes } from "@/data/episodes";

export default function HeroSection() {
  const latest = episodes[0];

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-accent)_0%,_transparent_50%)] opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm">
              <Headphones className="w-4 h-4" />
              Latest Episode
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Real Talk About{" "}
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                Love & Relationships
              </span>
            </h1>
            <p className="text-lg text-muted max-w-lg leading-relaxed">
              Dive into honest conversations about dating, intimacy, emotional
              intelligence, and everything in between. No judgment, just real
              connection.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/episodes/${latest.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <Play className="w-5 h-5" fill="white" />
                Play Latest Episode
              </Link>
              <Link
                href="/episodes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-surface transition-colors"
              >
                Browse All Episodes
              </Link>
            </div>

            {/* Latest episode card */}
            <div className="mt-4 p-4 rounded-xl bg-surface/60 border border-border backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {latest.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {latest.duration}
                    </span>
                    <span>{latest.category}</span>
                    <span>{new Date(latest.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual element */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-80 h-80">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full border-2 border-accent/20 animate-pulse [animation-delay:0.5s]" />
              <div className="absolute inset-8 rounded-full border-2 border-primary/30 animate-pulse [animation-delay:1s]" />
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-xl flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Headphones className="w-16 h-16 text-primary-light mx-auto" />
                  <p className="text-sm font-medium text-primary-light">
                    {episodes.length}+ Episodes
                  </p>
                  <p className="text-xs text-muted">Streaming Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
