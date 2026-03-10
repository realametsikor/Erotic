import Link from "next/link";
import {
  Shield,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { sexEdGuides } from "@/data/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
};

export default function SexEdGuides() {
  return (
    <section className="py-16 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Sex Education Knowledge Hub
          </h2>
          <p className="text-muted mt-2 max-w-xl mx-auto">
            Evidence-based guides on consent, intimacy, communication, and emotional connection
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sexEdGuides.map((guide) => {
            const Icon = iconMap[guide.icon] || Heart;
            return (
              <Link
                key={guide.id}
                href="/sex-education"
                className="group p-5 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                  <Icon className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary-light transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {guide.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/sex-education"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-light hover:text-accent transition-colors"
          >
            Explore all guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
