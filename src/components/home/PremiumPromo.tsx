import Link from "next/link";
import { Crown, Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "$4.99",
    period: "/month",
    description: "Get early access to new content",
    features: [
      "Early episode access",
      "Ad-supported listening",
      "Basic community access",
    ],
    cta: "Start Basic",
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Unlock exclusive content and features",
    features: [
      "Everything in Basic",
      "Exclusive podcast episodes",
      "Ad-free listening",
      "Premium articles",
      "Priority Q&A",
    ],
    cta: "Go Premium",
    popular: true,
  },
  {
    name: "Elite",
    price: "$19.99",
    period: "/month",
    description: "The complete intimate experience",
    features: [
      "Everything in Premium",
      "Erotic audio library",
      "Story Mode experience",
      "Members-only community",
      "1-on-1 advice sessions",
    ],
    cta: "Join Elite",
    popular: false,
  },
];

export default function PremiumPromo() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Crown className="w-4 h-4" />
            Premium Membership
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Unlock the Full Experience
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Get exclusive episodes, ad-free listening, and premium content designed to deepen your understanding of love and intimacy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-6 border transition-all ${
                tier.popular
                  ? "bg-gradient-to-b from-primary/10 to-accent/10 border-primary/50 scale-105"
                  : "bg-surface border-border hover:border-primary/30"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}
              <div className="text-center mb-5">
                <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-muted">{tier.period}</span>
                </div>
                <p className="text-xs text-muted mt-1">{tier.description}</p>
              </div>
              <ul className="space-y-2.5 mb-6">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <Check className="w-4 h-4 text-primary-light flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/premium"
                className={`block text-center py-2.5 rounded-full text-sm font-semibold transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                    : "border border-border text-foreground hover:bg-surface-light"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
