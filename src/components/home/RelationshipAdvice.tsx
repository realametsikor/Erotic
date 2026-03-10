import Link from "next/link";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import { articles } from "@/data/content";

export default function RelationshipAdvice() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-primary-light" />
              <h2 className="text-2xl sm:text-3xl font-bold">Relationship Advice</h2>
            </div>
            <p className="text-muted">Expert insights for your love life</p>
          </div>
          <Link
            href="/articles"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-light hover:text-accent transition-colors"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block rounded-xl bg-surface border border-border hover:border-primary/50 transition-all overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-primary/30" />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-xs font-medium text-accent">
                  {article.category}
                </span>
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary-light transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-muted line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-muted pt-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
