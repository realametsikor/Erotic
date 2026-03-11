import { episodes, type Episode } from "./episodes";

export interface Story {
  id: string;
  slug: string;
  title: string;
  description: string;
  gradient: string;
  icon: string;
  episodeSlugs: string[];
  totalDuration: string;
}

export const stories: Story[] = [
  {
    id: "1",
    slug: "the-dating-journey",
    title: "The Dating Journey",
    description:
      "From mastering first dates to navigating dating apps, and discovering why self-love is the foundation of it all.",
    gradient: "from-pink-500 to-rose-600",
    icon: "heart",
    episodeSlugs: [
      "art-of-first-dates",
      "navigating-modern-dating-apps",
      "self-love-before-romance",
    ],
    totalDuration: "1h 58min",
  },
  {
    id: "2",
    slug: "building-lasting-love",
    title: "Building Lasting Love",
    description:
      "Learn the communication secrets, understand love languages, and discover how to keep the spark alive for years to come.",
    gradient: "from-violet-500 to-purple-600",
    icon: "sparkles",
    episodeSlugs: [
      "communication-secrets",
      "love-languages-decoded",
      "keeping-spark-alive",
    ],
    totalDuration: "2h 10min",
  },
  {
    id: "3",
    slug: "healing-and-growth",
    title: "Healing & Growth",
    description:
      "A powerful journey through heartbreak recovery, rebuilding trust, and understanding the attachment patterns that shape your love life.",
    gradient: "from-emerald-500 to-teal-600",
    icon: "leaf",
    episodeSlugs: [
      "healing-after-heartbreak",
      "building-trust-after-betrayal",
      "attachment-styles-explained",
    ],
    totalDuration: "2h 38min",
  },
  {
    id: "4",
    slug: "intimacy-unlocked",
    title: "Intimacy Unlocked",
    description:
      "Explore consent, emotional bonds, and open communication to build a deeply fulfilling intimate connection.",
    gradient: "from-amber-500 to-orange-600",
    icon: "flame",
    episodeSlugs: [
      "consent-and-healthy-boundaries",
      "intimacy-beyond-physical",
      "sexual-communication-guide",
    ],
    totalDuration: "2h 15min",
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getStoryEpisodes(story: Story): Episode[] {
  return story.episodeSlugs
    .map((slug) => episodes.find((ep) => ep.slug === slug))
    .filter((ep): ep is Episode => ep !== undefined);
}
