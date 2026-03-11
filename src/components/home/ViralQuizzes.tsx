import Link from "next/link";
import { HelpCircle, ArrowRight, Users } from "lucide-react";
import { quizzes } from "@/data/content";

export default function ViralQuizzes() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-5 h-5 text-accent" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                Relationship Quizzes
              </h2>
            </div>
            <p className="text-muted">Discover more about yourself and your love life</p>
          </div>
          <Link
            href="/quizzes"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-light hover:text-accent transition-colors"
          >
            All quizzes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quizzes/${quiz.slug}`}
              className="group block rounded-xl bg-surface border border-border hover:border-accent/50 transition-all overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <HelpCircle className="w-12 h-12 text-accent/40" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-xs text-muted line-clamp-2">
                  {quiz.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted pt-1">
                  <span>{quiz.questionCount} questions</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {(quiz.takenCount / 1000).toFixed(1)}k taken
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
