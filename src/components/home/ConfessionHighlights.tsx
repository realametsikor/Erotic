import Link from "next/link";
import { MessageSquare, ArrowRight, MessageCircle } from "lucide-react";
import { confessions } from "@/data/content";

export default function ConfessionHighlights() {
  return (
    <section className="py-16 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-5 h-5 text-accent" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                Anonymous Confessions
              </h2>
            </div>
            <p className="text-muted">Real stories from real people — shared anonymously</p>
          </div>
          <Link
            href="/confessions"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-light hover:text-accent transition-colors"
          >
            Read more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {confessions.map((confession) => (
            <Link
              key={confession.id}
              href={`/confessions/${confession.slug}`}
              className="group block p-6 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all"
            >
              <span className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-3">
                {confession.category}
              </span>
              <h3 className="font-semibold text-sm mb-2 group-hover:text-accent transition-colors">
                &ldquo;{confession.title}&rdquo;
              </h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-3">
                {confession.preview}
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted">
                <MessageCircle className="w-3 h-3" />
                <span>{confession.commentCount} comments</span>
                <span>&middot;</span>
                <span>
                  {new Date(confession.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
