export interface Confession {
  id: string;
  title: string;
  preview: string;
  category: string;
  commentCount: number;
  date: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  takenCount: number;
  thumbnail: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  thumbnail: string;
}

export const confessions: Confession[] = [
  {
    id: "1",
    title: "I still think about my ex every day",
    preview:
      "It's been two years since we broke up, but not a single day goes by without me thinking about what could have been...",
    category: "Breakup Stories",
    commentCount: 47,
    date: "2026-03-05",
  },
  {
    id: "2",
    title: "My partner doesn't know about my past",
    preview:
      "There's something from my past that I've never told my partner. I'm afraid that if they knew, everything would change...",
    category: "Secrets",
    commentCount: 82,
    date: "2026-03-02",
  },
  {
    id: "3",
    title: "I fell in love with my best friend",
    preview:
      "We've been friends for 8 years. Last month something shifted. I can't stop thinking about them in a different way...",
    category: "Secret Crushes",
    commentCount: 63,
    date: "2026-02-28",
  },
];

export const quizzes: Quiz[] = [
  {
    id: "1",
    title: "What Is Your Love Language?",
    description:
      "Discover how you give and receive love with this comprehensive love language assessment.",
    questionCount: 15,
    takenCount: 24500,
    thumbnail: "/images/quiz-love-language.jpg",
  },
  {
    id: "2",
    title: "What Type of Partner Are You?",
    description:
      "Find out your relationship personality type and what it means for your love life.",
    questionCount: 12,
    takenCount: 18200,
    thumbnail: "/images/quiz-partner-type.jpg",
  },
  {
    id: "3",
    title: "How Healthy Is Your Relationship?",
    description:
      "Take a deep look at your relationship dynamics and get personalized insights.",
    questionCount: 20,
    takenCount: 31000,
    thumbnail: "/images/quiz-healthy.jpg",
  },
  {
    id: "4",
    title: "How Compatible Are You?",
    description:
      "Explore your compatibility with your partner across key relationship dimensions.",
    questionCount: 18,
    takenCount: 15800,
    thumbnail: "/images/quiz-compatible.jpg",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "10 Signs You're in a Healthy Relationship",
    excerpt:
      "Healthy relationships aren't about perfection — they're about mutual respect, communication, and growth.",
    category: "Relationship Advice",
    readTime: "6 min read",
    date: "2026-03-08",
    thumbnail: "/images/article-healthy.jpg",
  },
  {
    id: "2",
    title: "The Science of Attraction: What Really Draws Us Together",
    excerpt:
      "Beyond physical appearance, discover the psychological and biological factors that create lasting attraction.",
    category: "Dating",
    readTime: "8 min read",
    date: "2026-03-04",
    thumbnail: "/images/article-attraction.jpg",
  },
  {
    id: "3",
    title: "How to Set Boundaries Without Feeling Guilty",
    excerpt:
      "Setting boundaries is an act of self-love. Learn how to communicate your needs without the guilt.",
    category: "Emotional Intelligence",
    readTime: "5 min read",
    date: "2026-02-27",
    thumbnail: "/images/article-boundaries.jpg",
  },
  {
    id: "4",
    title: "Understanding Consent in Modern Relationships",
    excerpt:
      "A comprehensive guide to enthusiastic consent and why it's the foundation of every healthy intimate relationship.",
    category: "Sex Education",
    readTime: "7 min read",
    date: "2026-02-20",
    thumbnail: "/images/article-consent.jpg",
  },
];

export const sexEdGuides = [
  {
    id: "1",
    title: "Consent & Boundaries",
    description: "Understanding enthusiastic consent and setting healthy boundaries",
    icon: "Shield",
  },
  {
    id: "2",
    title: "Healthy Intimacy",
    description: "Building fulfilling intimate connections with trust and respect",
    icon: "Heart",
  },
  {
    id: "3",
    title: "Relationship Psychology",
    description: "The science behind attraction, attachment, and lasting love",
    icon: "Brain",
  },
  {
    id: "4",
    title: "Sexual Communication",
    description: "How to talk openly about desires, needs, and preferences",
    icon: "MessageCircle",
  },
  {
    id: "5",
    title: "Emotional Connection",
    description: "Deepening emotional bonds for more meaningful relationships",
    icon: "Sparkles",
  },
];
