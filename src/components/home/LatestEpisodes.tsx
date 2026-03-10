import Link from "next/link";
import { Play, Clock, ArrowRight } from "lucide-react";
import { episodes } from "@/data/episodes";

export default function LatestEpisodes() {
  const latestEps = episodes.slice(0, 4);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Latest Episodes</h2>
            <p className="text-muted mt-1">Fresh conversations, just for you</p>
          </div>
          <Link
            href="/episodes"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-light hover:text-accent transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestEps.map((ep) => (
            <Link
              key={ep.id}
              href={`/episodes/${ep.slug}`}
              className="group block rounded-xl bg-surface border border-border hover:border-primary/50 transition-all overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
                {ep.isPremium && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-accent/90 text-white text-xs font-medium">
                    Premium
                  </span>
                )}
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs">
                  {ep.category}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary-light transition-colors">
                  {ep.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Clock className="w-3 h-3" />
                  <span>{ep.duration}</span>
                  <span>&middot;</span>
                  <span>
                    {new Date(ep.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/episodes"
          className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium text-primary-light hover:text-accent transition-colors"
        >
          View all episodes <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
