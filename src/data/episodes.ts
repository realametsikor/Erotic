export interface Episode {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  topic: string;
  date: string;
  duration: string;
  thumbnail: string;
  audioUrl: string;
  videoUrl?: string;
  isPremium: boolean;
  popularity: number;
  highlights: string[];
  transcript: string;
  tags: string[];
}

export const categories = [
  "All",
  "Dating",
  "Communication",
  "Intimacy",
  "Breakups",
  "Marriage",
  "Emotional Intelligence",
  "Self-Love",
];

export const episodes: Episode[] = [
  {
    id: "1",
    slug: "art-of-first-dates",
    title: "The Art of First Dates: Making Genuine Connections",
    description:
      "Discover how to show up authentically on first dates and create meaningful connections that go beyond surface-level small talk.",
    summary:
      "In this episode, we explore the psychology behind first impressions and how to create genuine chemistry. We discuss body language, active listening, and the art of vulnerability on first dates. Our guest expert shares research-backed tips for making authentic connections.",
    category: "Dating",
    topic: "First Dates",
    date: "2026-03-01",
    duration: "42 min",
    thumbnail: "/images/ep-first-dates.jpg",
    audioUrl: "/audio/sample.mp3",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isPremium: false,
    popularity: 95,
    highlights: [
      "The 3-second rule for first impressions",
      "Questions that spark real conversation",
      "Reading body language signals",
      "When to text after a first date",
    ],
    transcript:
      "Welcome to another episode where we dive deep into the world of dating and relationships. Today we're talking about something that makes almost everyone nervous — first dates...",
    tags: ["dating", "first dates", "connections", "chemistry"],
  },
  {
    id: "2",
    slug: "communication-secrets",
    title: "Communication Secrets Every Couple Needs to Know",
    description:
      "Learn the communication techniques that therapists recommend to strengthen your relationship and resolve conflicts with empathy.",
    summary:
      "Communication is the foundation of every healthy relationship. In this episode, we break down the most common communication pitfalls couples face and share therapist-approved techniques for expressing needs, setting boundaries, and truly hearing your partner.",
    category: "Communication",
    topic: "Couple Communication",
    date: "2026-02-22",
    duration: "38 min",
    thumbnail: "/images/ep-communication.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: false,
    popularity: 92,
    highlights: [
      "The 'I feel' framework for expressing emotions",
      "Active listening techniques",
      "How to argue without damaging your bond",
      "Setting healthy boundaries together",
    ],
    transcript:
      "Today we're tackling one of the most important topics in relationships — communication. Whether you've been together for three months or thirty years...",
    tags: ["communication", "couples", "conflict resolution", "boundaries"],
  },
  {
    id: "3",
    slug: "healing-after-heartbreak",
    title: "Healing After Heartbreak: Your Guide to Moving Forward",
    description:
      "A compassionate guide to navigating the pain of a breakup and emerging stronger, wiser, and ready for love again.",
    summary:
      "Breakups are one of the most painful experiences we go through. In this episode, we talk about the stages of heartbreak, why it hurts so much, and practical steps for healing. We hear from listeners who share their own recovery stories and the lessons they learned.",
    category: "Breakups",
    topic: "Healing",
    date: "2026-02-15",
    duration: "51 min",
    thumbnail: "/images/ep-heartbreak.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: false,
    popularity: 88,
    highlights: [
      "The 5 stages of heartbreak recovery",
      "Why no-contact works",
      "Rebuilding your identity after a breakup",
      "Signs you're ready to date again",
    ],
    transcript:
      "If you're listening to this episode, chances are you're going through something really tough right now. First, I want you to know — it's okay to not be okay...",
    tags: ["breakups", "healing", "self-care", "moving on"],
  },
  {
    id: "4",
    slug: "love-languages-decoded",
    title: "Love Languages Decoded: Speaking Your Partner's Heart",
    description:
      "Understand the five love languages and learn how to express love in the way your partner truly receives it.",
    summary:
      "Do you know your love language? More importantly, do you know your partner's? In this episode, we go beyond the basics of love languages and explore how understanding these communication styles can transform your relationship from good to extraordinary.",
    category: "Emotional Intelligence",
    topic: "Love Languages",
    date: "2026-02-08",
    duration: "45 min",
    thumbnail: "/images/ep-love-languages.jpg",
    audioUrl: "/audio/sample.mp3",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isPremium: false,
    popularity: 97,
    highlights: [
      "Identifying your primary love language",
      "Common love language mismatches",
      "Daily practices for each love language",
      "When love languages change over time",
    ],
    transcript:
      "Love languages — you've probably heard the term before. But today we're going deeper than the surface level quiz results...",
    tags: ["love languages", "emotional intelligence", "partnership", "affection"],
  },
  {
    id: "5",
    slug: "building-trust-after-betrayal",
    title: "Building Trust After Betrayal: Is It Possible?",
    description:
      "An honest conversation about whether trust can be rebuilt after infidelity and what the journey truly looks like.",
    summary:
      "Trust is the cornerstone of every relationship, and when it's broken, the path forward is anything but clear. We sit down with a couples therapist to discuss the real process of rebuilding trust — what works, what doesn't, and how to know if your relationship can survive.",
    category: "Marriage",
    topic: "Trust & Infidelity",
    date: "2026-02-01",
    duration: "55 min",
    thumbnail: "/images/ep-trust.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: true,
    popularity: 91,
    highlights: [
      "The difference between forgiveness and reconciliation",
      "Red flags vs. genuine remorse",
      "Timeline for rebuilding trust",
      "When to walk away",
    ],
    transcript:
      "This is one of those episodes that we know many of you have been waiting for. It's a topic that's deeply personal, often painful, and surrounded by so much judgment...",
    tags: ["trust", "infidelity", "marriage", "forgiveness"],
  },
  {
    id: "6",
    slug: "intimacy-beyond-physical",
    title: "Intimacy Beyond the Physical: Deepening Emotional Bonds",
    description:
      "Explore the different dimensions of intimacy and discover how to cultivate deeper emotional, intellectual, and spiritual connections.",
    summary:
      "Intimacy is so much more than physical closeness. In this episode, we explore emotional intimacy, intellectual connection, and the often-overlooked spiritual dimension of partnerships. Learn practical exercises to deepen your bond on every level.",
    category: "Intimacy",
    topic: "Emotional Intimacy",
    date: "2026-01-25",
    duration: "48 min",
    thumbnail: "/images/ep-intimacy.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: true,
    popularity: 86,
    highlights: [
      "The 4 types of intimacy",
      "Vulnerability exercises for couples",
      "Building intellectual connection",
      "Creating rituals of connection",
    ],
    transcript:
      "When we say the word intimacy, most people's minds go straight to one place. But today, we're expanding that definition...",
    tags: ["intimacy", "emotional bonds", "vulnerability", "connection"],
  },
  {
    id: "7",
    slug: "self-love-before-romance",
    title: "Self-Love First: Why Your Relationship With Yourself Matters Most",
    description:
      "Before you can truly love someone else, you need to build a strong relationship with yourself. Here's how.",
    summary:
      "The most important relationship you'll ever have is the one with yourself. In this powerful episode, we discuss why self-love isn't selfish, how to break patterns of people-pleasing, and practical daily practices for building unshakeable self-worth.",
    category: "Self-Love",
    topic: "Self-Worth",
    date: "2026-01-18",
    duration: "40 min",
    thumbnail: "/images/ep-self-love.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: false,
    popularity: 94,
    highlights: [
      "Signs you're abandoning yourself in relationships",
      "Morning self-love rituals",
      "Setting boundaries without guilt",
      "The mirror exercise",
    ],
    transcript:
      "I want to start today's episode with a question that might seem simple but is actually incredibly profound: How do you treat yourself when no one is watching?...",
    tags: ["self-love", "self-worth", "boundaries", "personal growth"],
  },
  {
    id: "8",
    slug: "navigating-modern-dating-apps",
    title: "Navigating Modern Dating Apps Without Losing Your Mind",
    description:
      "Practical strategies for dating app success while protecting your mental health and staying true to who you are.",
    summary:
      "Dating apps can feel like a full-time job. In this episode, we share profile optimization tips, conversation starters that actually work, and most importantly, how to maintain your mental health in the swipe culture. Plus, we reveal the best times to be active on apps.",
    category: "Dating",
    topic: "Online Dating",
    date: "2026-01-11",
    duration: "36 min",
    thumbnail: "/images/ep-dating-apps.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: false,
    popularity: 85,
    highlights: [
      "Profile photo psychology",
      "Opening lines that get responses",
      "Setting app time limits",
      "Transitioning from app to real life",
    ],
    transcript:
      "Raise your hand if you've ever felt personally victimized by a dating app. Yeah, we thought so. Today we're diving into the wild world of digital dating...",
    tags: ["dating apps", "online dating", "mental health", "profiles"],
  },
  {
    id: "9",
    slug: "consent-and-healthy-boundaries",
    title: "Consent & Healthy Boundaries: The Foundation of Every Relationship",
    description:
      "An essential conversation about consent, boundary-setting, and creating a culture of respect in all your relationships.",
    summary:
      "Consent and boundaries are the bedrock of healthy relationships. This episode covers enthusiastic consent, recognizing boundary violations, how to communicate your limits clearly, and creating a relationship culture where both partners feel safe and respected.",
    category: "Intimacy",
    topic: "Consent & Boundaries",
    date: "2026-01-04",
    duration: "44 min",
    thumbnail: "/images/ep-consent.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: false,
    popularity: 90,
    highlights: [
      "What enthusiastic consent looks like",
      "Common boundary violations people overlook",
      "Scripts for communicating boundaries",
      "Teaching consent by example",
    ],
    transcript:
      "Today's episode is one of the most important we'll ever record. We're talking about consent and boundaries — topics that affect every single relationship in your life...",
    tags: ["consent", "boundaries", "respect", "safety"],
  },
  {
    id: "10",
    slug: "keeping-spark-alive",
    title: "Keeping the Spark Alive in Long-Term Relationships",
    description:
      "Proven strategies to reignite passion and maintain excitement in relationships that have stood the test of time.",
    summary:
      "Every long-term couple faces the challenge of keeping things fresh. In this episode, we share science-backed strategies for maintaining passion, novelty, and excitement years into your relationship. From date night ideas to deeper practices of reconnection.",
    category: "Marriage",
    topic: "Long-Term Love",
    date: "2025-12-28",
    duration: "47 min",
    thumbnail: "/images/ep-spark.jpg",
    audioUrl: "/audio/sample.mp3",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isPremium: true,
    popularity: 93,
    highlights: [
      "The novelty principle in relationships",
      "36 questions to reignite connection",
      "Adventure date ideas",
      "The importance of separate interests",
    ],
    transcript:
      "If you've been with your partner for a while, you might have noticed that the butterflies have settled down a bit. That's completely normal, but it doesn't mean the excitement has to end...",
    tags: ["long-term love", "passion", "marriage", "spark"],
  },
  {
    id: "11",
    slug: "attachment-styles-explained",
    title: "Attachment Styles Explained: Why You Love the Way You Do",
    description:
      "Understanding your attachment style is the key to breaking toxic relationship patterns and finding secure love.",
    summary:
      "Your attachment style shapes every romantic relationship you have. In this deep-dive episode, we explore the four attachment styles, how they form in childhood, and most importantly, how you can move toward secure attachment regardless of where you start.",
    category: "Emotional Intelligence",
    topic: "Attachment Theory",
    date: "2025-12-21",
    duration: "52 min",
    thumbnail: "/images/ep-attachment.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: false,
    popularity: 96,
    highlights: [
      "The 4 attachment styles breakdown",
      "How childhood shapes adult love",
      "Anxious-avoidant trap explained",
      "Steps toward earned secure attachment",
    ],
    transcript:
      "Have you ever wondered why you always seem to end up in the same kind of relationship? Why you push people away, or why you can't stop worrying about being abandoned?...",
    tags: ["attachment styles", "psychology", "patterns", "secure love"],
  },
  {
    id: "12",
    slug: "sexual-communication-guide",
    title: "Talking About Desire: A Guide to Sexual Communication",
    description:
      "Break the taboo and learn how to openly discuss desires, preferences, and boundaries with your partner.",
    summary:
      "One of the hardest conversations for couples is talking about their sexual needs and desires. This episode provides a safe, judgment-free framework for opening up about what you want, what you need, and how to create a fulfilling intimate life together.",
    category: "Intimacy",
    topic: "Sexual Communication",
    date: "2025-12-14",
    duration: "43 min",
    thumbnail: "/images/ep-desire.jpg",
    audioUrl: "/audio/sample.mp3",
    isPremium: true,
    popularity: 89,
    highlights: [
      "Starting the conversation without awkwardness",
      "The 'yes/no/maybe' list exercise",
      "Dealing with desire discrepancies",
      "Creating a judgment-free zone",
    ],
    transcript:
      "Let's talk about something that most couples find incredibly difficult to discuss — their intimate needs and desires. If you've ever wanted to bring something up but didn't know how...",
    tags: ["sexual communication", "desire", "intimacy", "openness"],
  },
];

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((ep) => ep.slug === slug);
}

export function getRelatedEpisodes(currentSlug: string, limit = 3): Episode[] {
  const current = getEpisodeBySlug(currentSlug);
  if (!current) return episodes.slice(0, limit);
  return episodes
    .filter((ep) => ep.slug !== currentSlug && ep.category === current.category)
    .slice(0, limit)
    .concat(
      episodes
        .filter((ep) => ep.slug !== currentSlug && ep.category !== current.category)
        .slice(0, limit)
    )
    .slice(0, limit);
}
