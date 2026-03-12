"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Crown,
  Check,
  Sparkles,
  Headphones,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Zap,
  Star,
  Heart,
  Users,
  Lock,
  Gift,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  X,
  Loader2,
} from "lucide-react";
import { articles } from "@/data/content";
import PremiumLock from "@/components/PremiumLock";

const tiers = [
  {
    name: "Basic",
    price: "$4.99",
    yearlyPrice: "$49.99",
    period: "/month",
    yearlyPeriod: "/year",
    yearlySavings: "Save $10",
    description: "Get early access to new content",
    features: [
      "Early episode access (24h before public)",
      "Ad-supported listening",
      "Basic community access",
      "Monthly newsletter extras",
    ],
    cta: "Start Basic",
    popular: false,
    icon: Headphones,
  },
  {
    name: "Premium",
    price: "$9.99",
    yearlyPrice: "$99.99",
    period: "/month",
    yearlyPeriod: "/year",
    yearlySavings: "Save $20",
    description: "Unlock exclusive content and features",
    features: [
      "Everything in Basic",
      "Exclusive podcast episodes",
      "Ad-free listening experience",
      "Premium articles & guides",
      "Priority Q&A with hosts",
      "Members-only discussion threads",
    ],
    cta: "Go Premium",
    popular: true,
    icon: Crown,
  },
  {
    name: "Elite",
    price: "$19.99",
    yearlyPrice: "$199.99",
    period: "/month",
    yearlyPeriod: "/year",
    yearlySavings: "Save $40",
    description: "The complete intimate experience",
    features: [
      "Everything in Premium",
      "Erotic audio library",
      "Story Mode experience",
      "Members-only private community",
      "1-on-1 advice sessions monthly",
      "Early access to live events",
      "Exclusive merchandise discounts",
    ],
    cta: "Join Elite",
    popular: false,
    icon: Star,
  },
];

const benefits = [
  {
    icon: Headphones,
    title: "Exclusive Episodes",
    description:
      "Access premium-only episodes featuring in-depth conversations, unfiltered discussions, and bonus content you won't find anywhere else.",
  },
  {
    icon: Lock,
    title: "Ad-Free Listening",
    description:
      "Enjoy every episode without interruptions. Pure, uninterrupted audio for a seamless listening experience.",
  },
  {
    icon: BookOpen,
    title: "Premium Articles & Guides",
    description:
      "Deep-dive articles written by relationship experts, therapists, and the Heartcast team on love, intimacy, and personal growth.",
  },
  {
    icon: Users,
    title: "Private Community",
    description:
      "Connect with like-minded listeners in our members-only community. Share stories, ask questions, and build real connections.",
  },
  {
    icon: MessageSquare,
    title: "Priority Q&A",
    description:
      "Get your questions answered first. Premium members get priority in live Q&A sessions and dedicated mailbag episodes.",
  },
  {
    icon: Gift,
    title: "Exclusive Perks",
    description:
      "Early access to live events, merchandise discounts, and surprise bonus content delivered straight to your inbox.",
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time with no penalties. Your access continues until the end of your current billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "New members get a 7-day free trial on any plan. You won't be charged until the trial ends, and you can cancel anytime during the trial period.",
  },
  {
    question: "How do I access premium content?",
    answer:
      "Once subscribed, premium content is automatically unlocked across the platform. Look for the crown icon to find exclusive episodes, articles, and community features.",
  },
  {
    question: "Can I share my account?",
    answer:
      "Each subscription is for individual use. However, our Elite plan includes the ability to gift a Basic membership to one friend each quarter.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    plan: "Premium Member",
    text: "The exclusive episodes are so worth it. The unfiltered conversations have genuinely helped me understand my relationship better.",
    rating: 5,
  },
  {
    name: "James L.",
    plan: "Elite Member",
    text: "The 1-on-1 advice sessions changed my life. Having direct access to relationship experts is priceless.",
    rating: 5,
  },
  {
    name: "Maya K.",
    plan: "Premium Member",
    text: "Ad-free listening and the private community alone make this worth every penny. Love being part of this space.",
    rating: 5,
  },
];

export default function PremiumPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const premiumArticles = articles.filter((a) => a.isPremium);

  const handleSubscribe = (tierName: string) => {
    setSelectedTier(tierName);
    setFormSubmitted(false);
    setFormError("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams();
    formData.forEach((value, key) => params.append(key, value.toString()));

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })
      .then(() => {
        setFormSubmitted(true);
      })
      .catch(() => {
        setFormError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/15 via-accent/5 to-background py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            Premium Membership
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Unlock the Full{" "}
            <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              Heartcast
            </span>{" "}
            Experience
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
            Get exclusive episodes, ad-free listening, premium articles, and
            access to a private community of passionate listeners. Deepen your
            understanding of love, relationships, and intimacy.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity"
            >
              View Plans
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-surface transition-colors font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Why Go Premium?
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Join thousands of listeners who&apos;ve upgraded their Heartcast
              experience with exclusive perks and content.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group p-6 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary-light" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="plans"
        className="py-20 bg-gradient-to-b from-surface/50 to-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Choose Your Plan
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-8">
              Start with a 7-day free trial on any plan. Cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-surface border border-border">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Yearly
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    billingCycle === "yearly"
                      ? "bg-white/20"
                      : "bg-accent/20 text-accent"
                  }`}
                >
                  Save
                </span>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => {
              const TierIcon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-7 border transition-all ${
                    tier.popular
                      ? "bg-gradient-to-b from-primary/10 to-accent/10 border-primary/50 lg:scale-105"
                      : "bg-surface border-border hover:border-primary/30"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tier.popular
                          ? "bg-gradient-to-br from-primary to-accent"
                          : "bg-surface-light"
                      }`}
                    >
                      <TierIcon
                        className={`w-5 h-5 ${tier.popular ? "text-white" : "text-primary-light"}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{tier.name}</h3>
                      <p className="text-xs text-muted">{tier.description}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {billingCycle === "monthly"
                          ? tier.price
                          : tier.yearlyPrice}
                      </span>
                      <span className="text-sm text-muted">
                        {billingCycle === "monthly"
                          ? tier.period
                          : tier.yearlyPeriod}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-xs text-accent mt-1 font-medium">
                        {tier.yearlySavings}
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-7">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <Check className="w-4 h-4 text-primary-light flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(tier.name)}
                    className={`w-full text-center py-3 rounded-full text-sm font-semibold transition-all ${
                      tier.popular
                        ? "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                        : "border border-border text-foreground hover:bg-surface-light"
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted mt-8">
            All plans include a 7-day free trial. No credit card required to
            start.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Loved by Members
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Hear from listeners who upgraded their Heartcast experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-xl bg-surface border border-border"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-primary-light">
                    {testimonial.plan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Content Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-4">
              <Lock className="w-4 h-4" />
              Premium Preview
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              A Taste of What Awaits
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Premium members get access to in-depth articles written by
              relationship experts, therapists, and coaches.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumArticles.map((article) => (
              <div
                key={article.id}
                className="group relative rounded-xl bg-surface border border-border overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 relative flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-white/20" />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary/90 text-white text-xs font-medium flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Premium
                  </span>
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs">
                    {article.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <PremiumLock compact />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Unlock All Premium Content
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-b from-surface/50 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Compare Plans
            </h2>
            <p className="text-muted">See exactly what you get with each plan.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 pr-4 font-semibold text-muted">
                    Feature
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      className={`text-center py-4 px-4 font-semibold ${tier.popular ? "text-primary-light" : ""}`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Early episode access", basic: true, premium: true, elite: true },
                  { feature: "Ad-free listening", basic: false, premium: true, elite: true },
                  { feature: "Exclusive episodes", basic: false, premium: true, elite: true },
                  { feature: "Premium articles", basic: false, premium: true, elite: true },
                  { feature: "Community access", basic: "Basic", premium: "Full", elite: "VIP" },
                  { feature: "Priority Q&A", basic: false, premium: true, elite: true },
                  { feature: "Erotic audio library", basic: false, premium: false, elite: true },
                  { feature: "Story Mode", basic: false, premium: false, elite: true },
                  { feature: "1-on-1 advice sessions", basic: false, premium: false, elite: true },
                  { feature: "Live event early access", basic: false, premium: false, elite: true },
                  { feature: "Merch discounts", basic: false, premium: false, elite: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-muted">{row.feature}</td>
                    {(["basic", "premium", "elite"] as const).map((plan) => (
                      <td key={plan} className="text-center py-3 px-4">
                        {typeof row[plan] === "boolean" ? (
                          row[plan] ? (
                            <Check className="w-4 h-4 text-primary-light mx-auto" />
                          ) : (
                            <span className="text-muted/40">&mdash;</span>
                          )
                        ) : (
                          <span className="text-xs font-medium text-primary-light">
                            {row[plan]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted">
              Everything you need to know about Premium membership.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surface/50 transition-colors"
                >
                  <span className="font-medium text-sm pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-muted flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 p-10 text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
            </div>
            <div className="relative">
              <Crown className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Ready to Upgrade Your Experience?
              </h2>
              <p className="text-muted max-w-lg mx-auto mb-6">
                Start your 7-day free trial today and discover why thousands of
                listeners have gone Premium.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => handleSubscribe("Premium")}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Free Trial
                </button>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <ShieldCheck className="w-4 h-4" />
                  No credit card required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Modal */}
      {selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-background border border-border p-6 sm:p-8 shadow-xl">
            <button
              onClick={() => setSelectedTier(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-primary-light" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  You&apos;re on the list!
                </h3>
                <p className="text-sm text-muted max-w-sm mx-auto mb-6">
                  Thanks for signing up for the {selectedTier} plan. We&apos;ll
                  send you an email with next steps to activate your 7-day free
                  trial.
                </p>
                <button
                  onClick={() => setSelectedTier(null)}
                  className="px-6 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-surface transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      Start Your Free Trial
                    </h3>
                    <p className="text-xs text-muted">
                      {selectedTier} Plan &middot;{" "}
                      {billingCycle === "monthly" ? "Monthly" : "Yearly"}{" "}
                      billing
                    </p>
                  </div>
                </div>

                <form
                  name="premium-subscription"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                >
                  <input
                    type="hidden"
                    name="form-name"
                    value="premium-subscription"
                  />
                  <input type="hidden" name="plan" value={selectedTier} />
                  <input
                    type="hidden"
                    name="billing"
                    value={billingCycle}
                  />

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-surface/80 border border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Selected plan</span>
                      <span className="font-semibold">{selectedTier}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted">Billing</span>
                      <span className="font-semibold capitalize">
                        {billingCycle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted">Trial</span>
                      <span className="font-semibold text-primary-light">
                        7 days free
                      </span>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-xs text-red-500">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Start 7-Day Free Trial
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted">
                    No credit card required. Cancel anytime during your trial.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
