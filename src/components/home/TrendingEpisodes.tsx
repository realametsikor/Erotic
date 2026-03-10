import Link from "next/link";
import { TrendingUp, Play, Clock, Crown } from "lucide-react";
import { episodes } from "@/data/episodes";

export default function TrendingEpisodes() {
  const trending = [...episodes]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  return (
    <section className="py-16 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-accent" />
          <h2 className="text-2xl sm:text-3xl font-bold">Trending Now</h2>
        </div>

        <div className="space-y-3">
          {trending.map((ep, i) => (
            <Link
              key={ep.id}
              href={`/episodes/${ep.slug}`}
              className="group flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all"
            >
              <span className="text-3xl font-bold text-border group-hover:text-primary/50 transition-colors w-8 text-center">
                {i + 1}
              </span>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <Play className="w-5 h-5 text-primary-light" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm truncate group-hover:text-primary-light transition-colors">
                    {ep.title}
                  </h3>
                  {ep.isPremium && (
                    <Crown className="w-4 h-4 text-accent flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                  <span className="text-primary-light">{ep.category}</span>
                  <span>&middot;</span>
                  <Clock className="w-3 h-3" />
                  <span>{ep.duration}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted">
                <TrendingUp className="w-3 h-3 text-accent" />
                <span>{ep.popularity}%</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
