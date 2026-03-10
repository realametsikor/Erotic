import { Users, Headphones, BookOpen, MessageSquare } from "lucide-react";

const stats = [
  {
    icon: Headphones,
    value: "200+",
    label: "Episodes",
    color: "text-primary-light",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Listeners",
    color: "text-accent",
  },
  {
    icon: BookOpen,
    value: "100+",
    label: "Articles",
    color: "text-primary-light",
  },
  {
    icon: MessageSquare,
    value: "10K+",
    label: "Community Members",
    color: "text-accent",
  },
];

export default function CommunityHighlights() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Join Our Growing Community
          </h2>
          <p className="text-muted mt-2">
            Thousands of people are already part of the Heartcast family
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-surface border border-border text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-surface-light flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
