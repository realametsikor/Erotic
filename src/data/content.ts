export interface Confession {
  id: string;
  title: string;
  preview: string;
  category: string;
  commentCount: number;
  date: string;
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  traits: string[];
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  questionCount: number;
  takenCount: number;
  thumbnail: string;
  questions: QuizQuestion[];
  results: QuizResult[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  readTime: string;
  date: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}

export const articleCategories = [
  "All",
  "Relationship Advice",
  "Dating",
  "Emotional Intelligence",
  "Sex Education",
  "Communication",
  "Self-Love",
];

export const confessionCategories = [
  "All",
  "Breakup Stories",
  "Secrets",
  "Secret Crushes",
  "Long Distance",
  "Marriage",
  "Dating Fails",
];

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
  {
    id: "4",
    title: "We've been long distance for 3 years",
    preview:
      "Everyone says it won't work. My family thinks I'm wasting my time. But every video call reminds me why I keep holding on...",
    category: "Long Distance",
    commentCount: 91,
    date: "2026-02-25",
  },
  {
    id: "5",
    title: "I said 'I love you' and they didn't say it back",
    preview:
      "Three months in, I couldn't hold it in anymore. I told them how I felt. The silence that followed was the longest of my life...",
    category: "Dating Fails",
    commentCount: 55,
    date: "2026-02-20",
  },
  {
    id: "6",
    title: "I'm happily married but sometimes feel lonely",
    preview:
      "From the outside we look perfect. Two kids, nice house, good jobs. But some nights I lie awake feeling like we're roommates...",
    category: "Marriage",
    commentCount: 112,
    date: "2026-02-18",
  },
  {
    id: "7",
    title: "I sabotage every good relationship I'm in",
    preview:
      "The moment things start going well, I find a reason to push them away. I know it's a pattern. I just don't know how to stop...",
    category: "Secrets",
    commentCount: 74,
    date: "2026-02-15",
  },
  {
    id: "8",
    title: "My crush liked my story and I panicked",
    preview:
      "They viewed my story within 30 seconds. Then they liked it. I've been drafting a DM for two hours. Send help...",
    category: "Secret Crushes",
    commentCount: 38,
    date: "2026-02-12",
  },
  {
    id: "9",
    title: "I went on a date with my ex's friend",
    preview:
      "It wasn't planned. We bumped into each other at a coffee shop and ended up talking for three hours. Now I don't know what to do...",
    category: "Dating Fails",
    commentCount: 66,
    date: "2026-02-08",
  },
];

export const quizCategories = [
  "All",
  "Love & Attachment",
  "Personality",
  "Relationship Health",
  "Compatibility",
];

export const quizzes: Quiz[] = [
  {
    id: "1",
    slug: "love-language",
    title: "What Is Your Love Language?",
    description:
      "Discover how you give and receive love with this comprehensive love language assessment.",
    category: "Love & Attachment",
    questionCount: 6,
    takenCount: 24500,
    thumbnail: "/images/quiz-love-language.jpg",
    questions: [
      {
        id: "q1",
        question: "After a long day, what would make you feel most loved?",
        options: [
          { id: "a", text: "Hearing \"I'm so proud of you\"", value: "words" },
          { id: "b", text: "Cuddling on the couch together", value: "touch" },
          { id: "c", text: "Your partner cooking dinner for you", value: "service" },
          { id: "d", text: "Receiving a thoughtful little gift", value: "gifts" },
        ],
      },
      {
        id: "q2",
        question: "Which gesture means the most to you in a relationship?",
        options: [
          { id: "a", text: "A heartfelt love letter or message", value: "words" },
          { id: "b", text: "An unplanned weekend getaway together", value: "quality" },
          { id: "c", text: "A surprise care package just because", value: "gifts" },
          { id: "d", text: "A long hug after time apart", value: "touch" },
        ],
      },
      {
        id: "q3",
        question: "What bothers you the most in a relationship?",
        options: [
          { id: "a", text: "Not hearing \"I love you\" enough", value: "words" },
          { id: "b", text: "Not spending enough quality time together", value: "quality" },
          { id: "c", text: "Your partner forgetting special occasions", value: "gifts" },
          { id: "d", text: "Your partner not helping around the house", value: "service" },
        ],
      },
      {
        id: "q4",
        question: "What's your ideal date night?",
        options: [
          { id: "a", text: "A deep, meaningful conversation over dinner", value: "quality" },
          { id: "b", text: "A surprise evening planned entirely by your partner", value: "service" },
          { id: "c", text: "Exchanging meaningful, personal gifts", value: "gifts" },
          { id: "d", text: "Slow dancing together at home", value: "touch" },
        ],
      },
      {
        id: "q5",
        question: "How do you typically show love to your partner?",
        options: [
          { id: "a", text: "Compliments and words of encouragement", value: "words" },
          { id: "b", text: "Giving them my undivided attention", value: "quality" },
          { id: "c", text: "Doing chores or tasks to help them out", value: "service" },
          { id: "d", text: "Hugs, hand-holding, and physical closeness", value: "touch" },
        ],
      },
      {
        id: "q6",
        question: "What makes you feel most secure in a relationship?",
        options: [
          { id: "a", text: "Regular verbal affirmation and reassurance", value: "words" },
          { id: "b", text: "Consistent, dedicated quality time", value: "quality" },
          { id: "c", text: "Physical closeness and affection", value: "touch" },
          { id: "d", text: "Seeing your partner go out of their way for you", value: "service" },
        ],
      },
    ],
    results: [
      {
        id: "words",
        title: "Words of Affirmation",
        description: "You feel most loved through verbal expressions of care. Compliments, \"I love you\"s, words of encouragement, and heartfelt messages fill your emotional tank. You treasure when your partner articulates how they feel about you.",
        traits: ["Great communicator", "Values verbal appreciation", "Expressive with feelings", "Sensitive to criticism"],
      },
      {
        id: "quality",
        title: "Quality Time",
        description: "Nothing says \"I love you\" like undivided attention. You thrive when your partner is fully present — phones down, eyes locked, sharing meaningful experiences together. Deep conversations and shared activities are your love fuel.",
        traits: ["Values presence over presents", "Deeply attentive", "Enjoys shared activities", "Feels loved through togetherness"],
      },
      {
        id: "gifts",
        title: "Receiving Gifts",
        description: "It's not about materialism — it's about the thought behind the gift. You feel deeply loved when someone takes the time to choose something meaningful for you. A well-chosen gift tells you that your partner truly knows and thinks about you.",
        traits: ["Appreciates thoughtfulness", "Symbolic thinker", "Remembers special occasions", "Values effort and intention"],
      },
      {
        id: "service",
        title: "Acts of Service",
        description: "Actions speak louder than words for you. When your partner helps with tasks, takes care of responsibilities, or goes out of their way to make your life easier, you feel profoundly loved. You believe love is shown through doing.",
        traits: ["Action-oriented", "Appreciates reliability", "Values partnership", "Shows love through helping"],
      },
      {
        id: "touch",
        title: "Physical Touch",
        description: "Physical connection is your primary love language. Hugs, hand-holding, cuddles, and closeness make you feel safe and loved. You communicate love through touch and feel most connected when you're physically close to your partner.",
        traits: ["Physically affectionate", "Values closeness", "Comforted by touch", "Expressive through affection"],
      },
    ],
  },
  {
    id: "2",
    slug: "partner-type",
    title: "What Type of Partner Are You?",
    description:
      "Find out your relationship personality type and what it means for your love life.",
    category: "Personality",
    questionCount: 6,
    takenCount: 18200,
    thumbnail: "/images/quiz-partner-type.jpg",
    questions: [
      {
        id: "q1",
        question: "Your partner is going through a tough time. What do you do first?",
        options: [
          { id: "a", text: "Listen to them and offer emotional support", value: "nurturer" },
          { id: "b", text: "Plan something fun to take their mind off it", value: "adventurer" },
          { id: "c", text: "Sit down and talk through the problem together", value: "communicator" },
          { id: "d", text: "Take charge of practical matters to ease their stress", value: "protector" },
        ],
      },
      {
        id: "q2",
        question: "What's your biggest strength in a relationship?",
        options: [
          { id: "a", text: "My empathy and emotional awareness", value: "nurturer" },
          { id: "b", text: "My ability to keep things exciting and fresh", value: "adventurer" },
          { id: "c", text: "My openness and honest communication", value: "communicator" },
          { id: "d", text: "My reliability and willingness to step up", value: "protector" },
        ],
      },
      {
        id: "q3",
        question: "How do you handle conflict with your partner?",
        options: [
          { id: "a", text: "I try to understand their feelings first", value: "nurturer" },
          { id: "b", text: "I suggest we cool off and revisit it later", value: "adventurer" },
          { id: "c", text: "I want to talk it out right away", value: "communicator" },
          { id: "d", text: "I focus on finding a practical solution", value: "protector" },
        ],
      },
      {
        id: "q4",
        question: "What does your ideal weekend together look like?",
        options: [
          { id: "a", text: "A cozy day in, cooking and watching movies", value: "nurturer" },
          { id: "b", text: "An unplanned road trip or outdoor adventure", value: "adventurer" },
          { id: "c", text: "A long brunch with deep conversation", value: "communicator" },
          { id: "d", text: "Tackling a home project or planning the future", value: "protector" },
        ],
      },
      {
        id: "q5",
        question: "What do friends typically come to you for?",
        options: [
          { id: "a", text: "A shoulder to cry on and emotional support", value: "nurturer" },
          { id: "b", text: "Fun plans and spontaneous adventures", value: "adventurer" },
          { id: "c", text: "Honest advice and a different perspective", value: "communicator" },
          { id: "d", text: "Help solving a problem or fixing something", value: "protector" },
        ],
      },
      {
        id: "q6",
        question: "What's most important to you in a relationship?",
        options: [
          { id: "a", text: "Emotional depth and vulnerability", value: "nurturer" },
          { id: "b", text: "Shared excitement and new experiences", value: "adventurer" },
          { id: "c", text: "Trust and transparent communication", value: "communicator" },
          { id: "d", text: "Stability and mutual support", value: "protector" },
        ],
      },
    ],
    results: [
      {
        id: "nurturer",
        title: "The Nurturer",
        description: "You lead with empathy and emotional intelligence. You create a safe, warm space for your partner and instinctively know how to comfort others. Your relationships are built on deep emotional connection and mutual care.",
        traits: ["Deeply empathetic", "Emotionally intuitive", "Supportive and caring", "Creates emotional safety"],
      },
      {
        id: "adventurer",
        title: "The Adventurer",
        description: "You bring excitement and spontaneity to your relationships. You believe love should be an adventure, and you're always finding ways to keep the spark alive. Your enthusiasm is contagious and your partner never gets bored.",
        traits: ["Spontaneous and fun", "Keeps things exciting", "Open to new experiences", "Optimistic outlook"],
      },
      {
        id: "communicator",
        title: "The Communicator",
        description: "You believe that honest, open dialogue is the foundation of every great relationship. You're the partner who checks in, talks things through, and creates space for real conversations. Your relationships thrive on transparency.",
        traits: ["Open and honest", "Great listener", "Values transparency", "Resolves conflicts through dialogue"],
      },
      {
        id: "protector",
        title: "The Protector",
        description: "You show love through action and reliability. When things get tough, you step up. Your partner can always count on you to handle challenges and provide stability. You build relationships on trust and dependability.",
        traits: ["Reliable and steady", "Action-oriented", "Problem solver", "Creates stability"],
      },
    ],
  },
  {
    id: "3",
    slug: "relationship-health",
    title: "How Healthy Is Your Relationship?",
    description:
      "Take a deep look at your relationship dynamics and get personalized insights.",
    category: "Relationship Health",
    questionCount: 6,
    takenCount: 31000,
    thumbnail: "/images/quiz-healthy.jpg",
    questions: [
      {
        id: "q1",
        question: "How often do you and your partner have meaningful conversations?",
        options: [
          { id: "a", text: "Daily — we talk about everything", value: "thriving" },
          { id: "b", text: "A few times a week", value: "growing" },
          { id: "c", text: "Occasionally, when something comes up", value: "attention" },
          { id: "d", text: "Rarely — we mostly talk about logistics", value: "reflect" },
        ],
      },
      {
        id: "q2",
        question: "When you disagree, how do you typically resolve conflict?",
        options: [
          { id: "a", text: "We talk it out calmly and find a compromise", value: "thriving" },
          { id: "b", text: "It takes time, but we eventually work through it", value: "growing" },
          { id: "c", text: "One of us usually gives in to avoid a fight", value: "attention" },
          { id: "d", text: "We tend to avoid the issue or it escalates", value: "reflect" },
        ],
      },
      {
        id: "q3",
        question: "Do you feel emotionally safe being vulnerable with your partner?",
        options: [
          { id: "a", text: "Absolutely — I can share anything", value: "thriving" },
          { id: "b", text: "Mostly, but some topics feel risky", value: "growing" },
          { id: "c", text: "Sometimes — it depends on their mood", value: "attention" },
          { id: "d", text: "Not really — I hold back a lot", value: "reflect" },
        ],
      },
      {
        id: "q4",
        question: "How well does your partner respect your boundaries?",
        options: [
          { id: "a", text: "They always respect and support my boundaries", value: "thriving" },
          { id: "b", text: "Usually, with occasional misunderstandings", value: "growing" },
          { id: "c", text: "Sometimes they push back or dismiss them", value: "attention" },
          { id: "d", text: "My boundaries are often ignored or violated", value: "reflect" },
        ],
      },
      {
        id: "q5",
        question: "How do you feel about the balance of effort in your relationship?",
        options: [
          { id: "a", text: "We both contribute equally and appreciate each other", value: "thriving" },
          { id: "b", text: "It's mostly balanced, with some imbalance at times", value: "growing" },
          { id: "c", text: "I often feel like I'm putting in more effort", value: "attention" },
          { id: "d", text: "The relationship feels very one-sided", value: "reflect" },
        ],
      },
      {
        id: "q6",
        question: "When you think about your relationship's future, how do you feel?",
        options: [
          { id: "a", text: "Excited and optimistic — we're building something great", value: "thriving" },
          { id: "b", text: "Hopeful, but aware there's room to grow", value: "growing" },
          { id: "c", text: "Uncertain — I have some concerns", value: "attention" },
          { id: "d", text: "Anxious or doubtful about where things are heading", value: "reflect" },
        ],
      },
    ],
    results: [
      {
        id: "thriving",
        title: "Thriving Relationship",
        description: "Your relationship shows all the hallmarks of a healthy, strong partnership. You and your partner have built a solid foundation of trust, communication, and mutual respect. Keep nurturing what you have — it's something special.",
        traits: ["Strong communication", "Mutual respect", "Emotional safety", "Balanced partnership"],
      },
      {
        id: "growing",
        title: "Growing Strong",
        description: "Your relationship has a solid foundation with room to grow. You're on the right track, and with continued effort and open communication, your bond will only deepen. Focus on the areas that need attention and celebrate your progress.",
        traits: ["Good foundation", "Willing to improve", "Generally supportive", "Open to growth"],
      },
      {
        id: "attention",
        title: "Needs Some Attention",
        description: "Your relationship has potential, but some areas need focus. Consider having honest conversations about your needs and boundaries. Small, consistent changes can make a big difference. You might benefit from couples counseling or reading together.",
        traits: ["Has potential", "Needs better communication", "Boundary work needed", "Would benefit from intention"],
      },
      {
        id: "reflect",
        title: "Time to Reflect",
        description: "Your answers suggest some significant challenges in your relationship. It's important to take an honest look at whether your needs are being met and whether both partners are committed to growth. Consider seeking professional support.",
        traits: ["Significant challenges", "Professional support recommended", "Self-reflection needed", "Important decisions ahead"],
      },
    ],
  },
  {
    id: "4",
    slug: "compatibility-check",
    title: "How Compatible Are You?",
    description:
      "Explore your compatibility with your partner across key relationship dimensions.",
    category: "Compatibility",
    questionCount: 6,
    takenCount: 15800,
    thumbnail: "/images/quiz-compatible.jpg",
    questions: [
      {
        id: "q1",
        question: "How aligned are you and your partner on life goals?",
        options: [
          { id: "a", text: "We share the same vision for the future", value: "cosmic" },
          { id: "b", text: "Our goals overlap in most key areas", value: "strong" },
          { id: "c", text: "We agree on some things but differ on others", value: "growing" },
          { id: "d", text: "We want very different things but make it work", value: "opposites" },
        ],
      },
      {
        id: "q2",
        question: "How do you and your partner spend free time?",
        options: [
          { id: "a", text: "We love doing the same activities together", value: "cosmic" },
          { id: "b", text: "We enjoy some shared hobbies and some solo ones", value: "strong" },
          { id: "c", text: "We're learning to appreciate each other's interests", value: "growing" },
          { id: "d", text: "We have totally different interests — and that's exciting", value: "opposites" },
        ],
      },
      {
        id: "q3",
        question: "How do your communication styles compare?",
        options: [
          { id: "a", text: "We naturally understand each other without much effort", value: "cosmic" },
          { id: "b", text: "We communicate well with occasional misunderstandings", value: "strong" },
          { id: "c", text: "We sometimes struggle to get on the same page", value: "growing" },
          { id: "d", text: "We communicate very differently but are learning to bridge the gap", value: "opposites" },
        ],
      },
      {
        id: "q4",
        question: "How do your social needs compare?",
        options: [
          { id: "a", text: "We're both the same — equally social or equally homebody", value: "cosmic" },
          { id: "b", text: "Pretty similar, with minor differences", value: "strong" },
          { id: "c", text: "One of us is more social, but we manage it well", value: "growing" },
          { id: "d", text: "We're complete opposites — introvert and extrovert", value: "opposites" },
        ],
      },
      {
        id: "q5",
        question: "How do you handle financial matters together?",
        options: [
          { id: "a", text: "We're completely aligned on money and spending", value: "cosmic" },
          { id: "b", text: "We mostly agree with occasional compromises needed", value: "strong" },
          { id: "c", text: "Money is sometimes a source of tension", value: "growing" },
          { id: "d", text: "We have very different approaches but respect each other's style", value: "opposites" },
        ],
      },
      {
        id: "q6",
        question: "How do your core values compare?",
        options: [
          { id: "a", text: "Our values are almost identical", value: "cosmic" },
          { id: "b", text: "We share the most important values", value: "strong" },
          { id: "c", text: "We agree on some values but differ on others", value: "growing" },
          { id: "d", text: "We have different values but deeply respect each other's perspective", value: "opposites" },
        ],
      },
    ],
    results: [
      {
        id: "cosmic",
        title: "Cosmic Connection",
        description: "You and your partner are remarkably aligned across all key dimensions. Your natural compatibility creates an effortless flow in your relationship. You share values, goals, and communication styles that make your bond feel almost destined.",
        traits: ["Deeply aligned values", "Natural understanding", "Shared vision", "Effortless connection"],
      },
      {
        id: "strong",
        title: "Strong Match",
        description: "You and your partner have a strong foundation of compatibility with healthy room for individuality. Your alignment on the big things gives you a solid base, while your differences keep things interesting and promote growth.",
        traits: ["Solid foundation", "Healthy individuality", "Good communication", "Balanced partnership"],
      },
      {
        id: "growing",
        title: "Growing Together",
        description: "You and your partner are on a growth journey together. While you have some natural differences, your willingness to learn from each other is your greatest asset. Focus on communication and understanding to keep strengthening your bond.",
        traits: ["Growth mindset", "Learning from differences", "Building understanding", "Evolving together"],
      },
      {
        id: "opposites",
        title: "Complementary Opposites",
        description: "They say opposites attract — and that might just be your superpower. Your differences bring balance, fresh perspectives, and excitement to the relationship. The key is maintaining mutual respect and appreciation for what each of you brings.",
        traits: ["Balanced perspectives", "Exciting dynamic", "Mutual respect", "Complementary strengths"],
      },
    ],
  },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "10-signs-healthy-relationship",
    title: "10 Signs You're in a Healthy Relationship",
    excerpt:
      "Healthy relationships aren't about perfection — they're about mutual respect, communication, and growth.",
    content: `Every relationship has its ups and downs, but healthy partnerships share certain hallmarks that set them apart. Whether you're in a new relationship or have been with your partner for years, these ten signs can help you gauge the health of your connection.

## 1. Open and Honest Communication

You feel safe expressing your thoughts, feelings, and concerns without fear of judgment. Both partners actively listen and work to understand each other's perspective, even during disagreements.

## 2. Mutual Respect

Respect is the foundation of any healthy relationship. You value each other's opinions, boundaries, and individuality. Neither partner tries to control or belittle the other.

## 3. Trust and Security

You don't feel the need to constantly check up on your partner. There's a deep sense of trust that allows both of you to maintain your independence while feeling secure in the relationship.

## 4. Healthy Conflict Resolution

Disagreements are inevitable, but how you handle them matters. In a healthy relationship, conflicts are addressed calmly and constructively rather than through yelling, stonewalling, or passive-aggression.

## 5. Shared Values and Goals

While you don't need to agree on everything, having aligned core values and life goals creates a strong foundation. You support each other's dreams and work together toward a shared future.

## 6. Quality Time Together

You genuinely enjoy spending time together and make it a priority. Whether it's a date night, a quiet evening at home, or an adventure, you both invest in keeping the connection alive.

## 7. Space for Individuality

A healthy relationship doesn't mean being joined at the hip. Both partners maintain their own friendships, hobbies, and interests. Time apart actually strengthens the bond.

## 8. Physical and Emotional Intimacy

Intimacy goes beyond the physical. You share a deep emotional connection characterized by vulnerability, empathy, and affection. Both partners feel comfortable expressing their needs.

## 9. Support During Hard Times

Life throws curveballs, and having a partner who stands by you during difficult moments is a sign of true partnership. You lift each other up rather than tear each other down.

## 10. Growth Together

Healthy couples grow and evolve together. You encourage each other's personal development and celebrate milestones, both big and small. The relationship itself continues to deepen over time.

If you recognize most of these signs in your relationship, you're on a strong path. If some areas need work, that's perfectly normal — awareness is the first step toward positive change.`,
    category: "Relationship Advice",
    author: { name: "Dr. Maya Chen", role: "Relationship Therapist" },
    readTime: "6 min read",
    date: "2026-03-08",
    thumbnail: "/images/article-healthy.jpg",
    tags: ["healthy relationships", "relationship advice", "communication", "trust"],
    featured: true,
  },
  {
    id: "2",
    slug: "science-of-attraction",
    title: "The Science of Attraction: What Really Draws Us Together",
    excerpt:
      "Beyond physical appearance, discover the psychological and biological factors that create lasting attraction.",
    content: `Attraction is one of the most complex and fascinating aspects of human connection. While we often think of it in terms of physical appearance, the science behind what draws us together goes much deeper than meets the eye.

## The Biology of Attraction

Our brains are wired for connection. When we encounter someone attractive, a cascade of neurochemicals floods our system. Dopamine creates feelings of excitement and pleasure, while norepinephrine makes our hearts race and palms sweat. Serotonin levels drop, which is why new love can feel almost obsessive.

## The Role of Pheromones

Research suggests that we're subconsciously influenced by each other's scent. Studies have shown that people tend to be attracted to those whose immune system genes (MHC) differ from their own — a biological mechanism that could lead to healthier offspring.

## Psychological Factors

### The Proximity Effect

We tend to develop attraction to people we see regularly. This "mere exposure effect" means that familiarity breeds fondness, not contempt. Your next great love might already be in your daily orbit.

### Similarity and Complementarity

While opposites can attract initially, research consistently shows that long-term compatibility is built on shared values, attitudes, and interests. We're drawn to people who reflect and reinforce our sense of self.

### The Power of Vulnerability

Psychologist Arthur Aron's famous "36 Questions" study demonstrated that mutual vulnerability accelerates intimacy. Sharing personal stories and listening deeply creates a powerful bond that goes beyond surface-level attraction.

## Emotional Intelligence and Attraction

People with high emotional intelligence — those who can read, understand, and respond to emotions — are consistently rated as more attractive. The ability to make someone feel seen and understood is one of the most powerful attractors.

## The Halo Effect

First impressions matter more than we'd like to admit. Research shows that when we find someone attractive in one way (such as their sense of humor), we tend to rate them more favorably across other traits as well. This "halo effect" can work in your favor when you lead with your strengths.

## Building Lasting Attraction

The initial spark of attraction is just the beginning. Lasting attraction requires ongoing effort, novelty, and emotional investment. Couples who continue to learn about each other, try new experiences together, and maintain their individual growth tend to sustain attraction over the long term.

Understanding the science behind attraction doesn't diminish its magic — it helps us make more intentional choices about who we pursue and how we nurture our connections.`,
    category: "Dating",
    author: { name: "Jordan Wells", role: "Psychology Writer" },
    readTime: "8 min read",
    date: "2026-03-04",
    thumbnail: "/images/article-attraction.jpg",
    tags: ["attraction", "dating", "psychology", "chemistry"],
  },
  {
    id: "3",
    slug: "setting-boundaries-without-guilt",
    title: "How to Set Boundaries Without Feeling Guilty",
    excerpt:
      "Setting boundaries is an act of self-love. Learn how to communicate your needs without the guilt.",
    content: `Boundaries are the invisible lines that define where you end and another person begins. They're essential for maintaining your mental health, self-respect, and the overall quality of your relationships. Yet for many of us, setting boundaries feels uncomfortable — even selfish. Let's change that narrative.

## Why Boundaries Matter

Without boundaries, relationships can become breeding grounds for resentment, burnout, and emotional exhaustion. Boundaries aren't walls designed to keep people out; they're guidelines that communicate how you want to be treated.

## Common Types of Boundaries

### Emotional Boundaries
Protecting your emotional energy by choosing what feelings you take on from others. Example: "I care about you, but I can't be your sole source of emotional support."

### Time Boundaries
Respecting your own schedule and priorities. Example: "I need at least one evening a week for myself to recharge."

### Physical Boundaries
Defining your comfort level with physical touch and personal space. Example: "I'm not comfortable with surprise visits — please call first."

### Digital Boundaries
Managing your availability and communication expectations. Example: "I don't respond to work messages after 7 PM."

## How to Set Boundaries: A Step-by-Step Approach

### 1. Get Clear on Your Needs
Before you can communicate a boundary, you need to understand what you need. Pay attention to situations that leave you feeling drained, resentful, or uncomfortable. These feelings are signals that a boundary is needed.

### 2. Use "I" Statements
Frame your boundaries around your own needs rather than criticizing the other person. "I need some quiet time in the evenings" lands better than "You're always so loud and demanding."

### 3. Be Direct and Specific
Vague boundaries are hard to respect. Instead of "I need more space," try "I need Saturdays to myself for personal time."

### 4. Prepare for Pushback
Not everyone will respect your boundaries right away, especially if they're used to you not having any. Stay firm but compassionate. Their reaction is not your responsibility.

### 5. Follow Through
A boundary without follow-through is just a suggestion. If someone repeatedly violates a boundary, be prepared to enforce consequences.

## Overcoming the Guilt

Guilt is the most common barrier to boundary-setting, particularly for people-pleasers. Here's the truth: setting boundaries isn't mean. It's an act of self-preservation that ultimately benefits everyone involved.

When you maintain healthy boundaries, you show up as a better partner, friend, and human being. You have more energy to give from a place of genuine generosity rather than obligation.

Remember: you can be a kind person with strong boundaries. The two are not mutually exclusive — in fact, they go hand in hand.`,
    category: "Emotional Intelligence",
    author: { name: "Dr. Maya Chen", role: "Relationship Therapist" },
    readTime: "5 min read",
    date: "2026-02-27",
    thumbnail: "/images/article-boundaries.jpg",
    tags: ["boundaries", "self-love", "emotional intelligence", "communication"],
  },
  {
    id: "4",
    slug: "understanding-consent-modern-relationships",
    title: "Understanding Consent in Modern Relationships",
    excerpt:
      "A comprehensive guide to enthusiastic consent and why it's the foundation of every healthy intimate relationship.",
    content: `Consent isn't just a one-time checkbox — it's an ongoing conversation that forms the bedrock of healthy, respectful intimate relationships. In today's world, understanding consent deeply is more important than ever.

## What Is Enthusiastic Consent?

Enthusiastic consent means a clear, excited, and freely given "yes" — not just the absence of "no." It's about both partners actively and willingly participating in every aspect of their intimate life.

## The FRIES Model of Consent

A helpful framework for understanding consent uses the acronym FRIES:

### Freely Given
Consent must be offered without pressure, coercion, manipulation, or the influence of substances. If someone feels obligated or afraid to say no, it's not genuine consent.

### Reversible
Anyone has the right to change their mind at any point, even if they initially agreed. Consent for one activity doesn't automatically extend to another, and it can be withdrawn at any time.

### Informed
Consent requires honesty. Both partners should have a clear understanding of what they're agreeing to. Deception or withholding important information invalidates consent.

### Enthusiastic
Look for genuine excitement and engagement, not reluctant compliance. A partner who seems hesitant, uncomfortable, or disengaged is not giving enthusiastic consent.

### Specific
Saying yes to one thing doesn't mean yes to everything. Consent should be given for each specific activity and situation.

## Consent in Long-Term Relationships

A common misconception is that consent becomes less important over time. In reality, ongoing consent is just as crucial in a 10-year marriage as it is on a first date. Past consent doesn't imply future consent.

## How to Practice Consent

### Check In Regularly
Make it normal to ask how your partner is feeling. Simple questions like "Is this okay?" or "Do you want to continue?" can go a long way.

### Read Non-Verbal Cues
Pay attention to body language. Tension, pulling away, or lack of engagement can signal discomfort even when someone hasn't verbalized it.

### Create a Safe Space for "No"
Make sure your partner knows that saying no is always acceptable and will be respected without consequence. This safety actually deepens trust and intimacy.

### Discuss Boundaries Ahead of Time
Having conversations about boundaries, desires, and limits outside of intimate moments reduces pressure and allows for more honest communication.

## Teaching Consent by Example

The way we practice consent in our relationships sets a powerful example for those around us — including our children, friends, and communities. By normalizing open communication about boundaries and respect, we contribute to a culture where everyone feels safe and valued.

Consent is not about limiting intimacy — it's about enhancing it through mutual respect and trust.`,
    category: "Sex Education",
    author: { name: "Alex Rivera", role: "Sex Educator" },
    readTime: "7 min read",
    date: "2026-02-20",
    thumbnail: "/images/article-consent.jpg",
    tags: ["consent", "sex education", "boundaries", "respect"],
  },
  {
    id: "5",
    slug: "attachment-styles-love-life",
    title: "How Your Attachment Style Shapes Your Love Life",
    excerpt:
      "Understanding your attachment style is the key to breaking unhealthy patterns and building secure, lasting relationships.",
    content: `Your attachment style — formed in early childhood — profoundly influences how you behave in romantic relationships. By understanding these patterns, you can break free from cycles that no longer serve you and move toward healthier, more fulfilling connections.

## The Four Attachment Styles

### Secure Attachment
People with secure attachment feel comfortable with intimacy and independence. They communicate openly, trust their partners, and handle conflict constructively. About 50-60% of adults fall into this category.

**Signs you're securely attached:**
- You feel comfortable depending on others and having them depend on you
- You communicate your needs clearly
- You can handle disagreements without catastrophizing
- You maintain a positive view of yourself and your relationships

### Anxious Attachment
Those with anxious attachment crave closeness but worry constantly about their partner's commitment. They tend to be highly attuned to their partner's moods and may interpret small signals as signs of rejection.

**Signs you might be anxiously attached:**
- You need frequent reassurance from your partner
- You worry about being abandoned or unloved
- You tend to be clingy or overly accommodating
- Small changes in your partner's behavior trigger anxiety

### Avoidant Attachment
Avoidant individuals value independence above all else and may feel uncomfortable with deep emotional intimacy. They tend to suppress their feelings and may withdraw when a partner gets too close.

**Signs you might be avoidantly attached:**
- You feel suffocated when partners want more closeness
- You prioritize independence over emotional connection
- You have difficulty expressing your feelings
- You tend to pull away when things get serious

### Disorganized Attachment
This style combines elements of both anxious and avoidant patterns. People with disorganized attachment may simultaneously crave and fear intimacy, leading to unpredictable relationship behavior.

## The Anxious-Avoidant Trap

One of the most common and painful relationship dynamics occurs when an anxiously attached person pairs with an avoidant partner. The anxious partner's need for closeness triggers the avoidant partner's need for space, creating a push-pull cycle that can feel impossible to escape.

## Moving Toward Secure Attachment

The good news is that attachment styles are not fixed. With awareness, intention, and often professional support, you can develop what psychologists call "earned secure attachment."

### Steps to Heal
1. **Identify your patterns** — Recognize how your attachment style shows up in your relationships
2. **Understand the origins** — Connect your current patterns to early experiences
3. **Challenge your narratives** — Question the beliefs that drive your relationship anxiety or avoidance
4. **Practice new behaviors** — Gradually try the opposite of your default response
5. **Seek support** — Therapy, particularly attachment-focused therapy, can accelerate healing

## Choosing Partners Wisely

Understanding attachment theory can help you make better choices about who you partner with. Instead of being drawn to partners who activate your insecure patterns, you can learn to recognize and appreciate the qualities of secure attachment.

Your attachment style is not your destiny — it's your starting point. With self-awareness and effort, you can build the kind of love you truly deserve.`,
    category: "Emotional Intelligence",
    author: { name: "Dr. Maya Chen", role: "Relationship Therapist" },
    readTime: "9 min read",
    date: "2026-02-14",
    thumbnail: "/images/article-attachment.jpg",
    tags: ["attachment styles", "psychology", "emotional intelligence", "self-awareness"],
    featured: true,
  },
  {
    id: "6",
    slug: "navigating-first-three-months",
    title: "Navigating the First Three Months of a New Relationship",
    excerpt:
      "The honeymoon phase is exhilarating, but it's also when patterns are set. Here's how to build a strong foundation.",
    content: `The first three months of a relationship are often called the "honeymoon phase" — a period of excitement, discovery, and intense connection. But beneath the butterflies, this is also when the foundation of your entire relationship is being laid. Here's how to make the most of it.

## Month One: The Discovery Phase

The first month is all about exploration. Everything feels new and exciting, and you're learning about each other at a rapid pace.

### What to Focus On
- **Be authentically you.** It's tempting to present a curated version of yourself, but authenticity builds stronger foundations. Share your real interests, opinions, and quirks.
- **Pay attention to values.** While it's easy to get swept up in chemistry, notice whether your core values align. How do they treat service workers? What do they prioritize in life?
- **Maintain your own life.** Don't disappear into the new relationship. Keep seeing friends, pursuing hobbies, and maintaining your routine.

## Month Two: Getting Real

By the second month, the initial infatuation starts to settle, and you begin to see each other more clearly. This is when small incompatibilities and differences start to emerge.

### What to Focus On
- **Handle the first disagreement well.** How you navigate your first conflict sets the tone for all future ones. Practice active listening, avoid blame, and seek understanding.
- **Meet each other's friends.** Integrating your social circles is a natural step that provides valuable perspective on your new partner.
- **Have the conversation about exclusivity.** Don't assume — communicate clearly about where you both stand.

## Month Three: Building or Breaking

The third month is often decisive. The rose-colored glasses are fading, and you're making a more informed choice about whether to continue investing in the relationship.

### What to Focus On
- **Evaluate your emotional safety.** Do you feel safe being vulnerable? Can you express concerns without fear of dismissal or anger?
- **Notice patterns, not just moments.** A single bad day doesn't define someone, but recurring patterns of disrespect, dishonesty, or emotional unavailability are red flags.
- **Discuss the future.** You don't need a five-year plan, but understanding whether you're generally headed in the same direction is important.

## Red Flags to Watch For

- Love-bombing (excessive flattery or gifts early on)
- Refusing to discuss the relationship's direction
- Isolating you from friends and family
- Inconsistent behavior (hot and cold cycles)
- Disrespecting your boundaries

## Green Flags to Celebrate

- Consistent communication and follow-through
- Genuine interest in your life and well-being
- Willingness to compromise and grow
- Healthy handling of disagreements
- Respect for your boundaries and independence

The first three months aren't about perfection — they're about paying attention. Trust the process, trust yourself, and remember that a strong relationship is built one honest conversation at a time.`,
    category: "Dating",
    author: { name: "Jordan Wells", role: "Psychology Writer" },
    readTime: "7 min read",
    date: "2026-02-10",
    thumbnail: "/images/article-new-relationship.jpg",
    tags: ["dating", "new relationship", "red flags", "green flags"],
  },
  {
    id: "7",
    slug: "art-of-active-listening",
    title: "The Art of Active Listening in Relationships",
    excerpt:
      "Most relationship problems stem from poor listening. Master this one skill and watch your connection transform.",
    content: `We spend so much time thinking about what to say in our relationships that we often forget the most powerful communication tool: listening. Not just hearing words, but truly listening with intention, empathy, and presence.

## Why We're Bad at Listening

Most of us aren't as good at listening as we think. Research shows that we typically retain only about 25-50% of what we hear. In relationships, this percentage often drops even lower because we're busy formulating our response, defending our position, or assuming we already know what our partner is going to say.

## What Active Listening Looks Like

### Full Presence
Put away your phone. Turn off the TV. Make eye contact. Give your partner your undivided attention. In a world of constant distraction, presence is one of the greatest gifts you can offer.

### Reflective Responses
Instead of jumping to advice or your own experience, reflect back what you've heard. "It sounds like you're feeling overwhelmed at work" shows that you're genuinely processing their words.

### Asking Open-Ended Questions
Questions that begin with "how," "what," or "tell me about" encourage deeper sharing. "How did that make you feel?" opens up far more than "Were you upset?"

### Validating Emotions
You don't have to agree with your partner's perspective to validate their feelings. "I can understand why that would be frustrating" acknowledges their emotional experience without judgment.

### Withholding Judgment
Create a space where your partner feels safe to share anything — even things that are hard to hear. If they feel judged, they'll stop being honest with you.

## Common Listening Mistakes

### The Fix-It Response
When your partner shares a problem, resist the urge to immediately offer solutions. Often, they need to feel heard before they want advice. Ask: "Do you want me to listen or help problem-solve?"

### Competitive Listening
"Oh, you think that's bad? Let me tell you about MY day." This one-upmanship invalidates your partner's experience and turns sharing into a competition.

### Mind Reading
Don't assume you know what your partner is going to say or what they're feeling. Even if you've been together for years, give them the space to surprise you.

### Defensive Listening
If you're listening only to find something to defend against, you're not really listening at all. Try to hear your partner's underlying need, not just the words that trigger you.

## Practicing Active Listening

### The 3-Minute Exercise
Set a timer for three minutes. One partner shares while the other only listens — no interrupting, no responding. Then switch. This simple exercise can transform your communication.

### The Weekly Check-In
Set aside 20 minutes each week for an intentional conversation. Take turns sharing what's on your mind while the other practices active listening. Cover highs, lows, and anything that needs attention.

Active listening isn't just a skill — it's a practice of love. Every time you truly listen to your partner, you're saying: "You matter to me. Your thoughts and feelings are important." And that message, more than any words, is what builds lasting connection.`,
    category: "Communication",
    author: { name: "Dr. Maya Chen", role: "Relationship Therapist" },
    readTime: "6 min read",
    date: "2026-02-03",
    thumbnail: "/images/article-listening.jpg",
    tags: ["communication", "active listening", "couples", "connection"],
  },
  {
    id: "8",
    slug: "self-love-journey",
    title: "The Self-Love Journey: Learning to Be Your Own Best Partner",
    excerpt:
      "Before you can fully love someone else, you need to cultivate a deep, compassionate relationship with yourself.",
    content: `Self-love isn't bubble baths and face masks — although those are nice. It's a fundamental shift in how you relate to yourself that transforms every other relationship in your life.

## What Self-Love Really Means

Self-love is the practice of treating yourself with the same kindness, respect, and compassion that you would offer your closest friend. It means accepting your imperfections, honoring your needs, and refusing to settle for less than you deserve.

## Why Self-Love Matters for Relationships

When you don't love yourself, you enter relationships from a place of lack. You look to your partner to fill a void that only you can fill, which puts immense pressure on the relationship and often leads to codependency, jealousy, or settling for unhealthy dynamics.

Conversely, when you have a strong sense of self-worth, you:
- Choose partners who genuinely respect and value you
- Set and maintain healthy boundaries
- Communicate your needs without guilt
- Handle rejection without it destroying your sense of self
- Bring your best self to the relationship

## Signs You Might Need More Self-Love

- You constantly seek validation from others
- You abandon your own needs to please your partner
- You stay in relationships that don't serve you out of fear of being alone
- Your self-worth fluctuates based on your relationship status
- You have a harsh inner critic that never lets up

## Building a Self-Love Practice

### 1. Rewrite Your Inner Dialogue
Start noticing how you talk to yourself. Would you say those things to someone you love? Begin replacing harsh self-criticism with gentler, more compassionate language.

### 2. Set Non-Negotiable Boundaries
Identify the things you will no longer tolerate — from others and from yourself. These boundaries are acts of self-respect that communicate your worth to the world.

### 3. Invest in Your Growth
Take that class. Read that book. Start that hobby. Investing in your personal development sends a powerful message to yourself: "I am worth the effort."

### 4. Practice Body Neutrality
You don't have to love every part of your body every day. Instead, practice gratitude for what your body does for you. Shift the focus from appearance to function and capability.

### 5. Curate Your Environment
Surround yourself with people, media, and experiences that uplift you. Unfollow accounts that make you feel inadequate. Distance yourself from relationships that drain you.

### 6. Embrace Solitude
Learn to enjoy your own company. Take yourself on dates. Sit with your thoughts without needing distraction. The ability to be alone without being lonely is a superpower.

## The Mirror Exercise

Each morning, look at yourself in the mirror and say something kind. It might feel awkward at first — that discomfort is telling you something important. Over time, this practice rewires your relationship with yourself.

## Self-Love Is Not Selfish

There's a persistent myth that prioritizing yourself is selfish. The truth is the opposite. When you take care of yourself, you have more to give. You show up more fully in your relationships, your work, and your community.

Self-love is the foundation upon which all other love is built. Start building yours today.`,
    category: "Self-Love",
    author: { name: "Aisha Thompson", role: "Life Coach & Author" },
    readTime: "7 min read",
    date: "2026-01-28",
    thumbnail: "/images/article-self-love.jpg",
    tags: ["self-love", "self-worth", "personal growth", "boundaries"],
    featured: true,
  },
  {
    id: "9",
    slug: "fighting-fair-conflict-resolution",
    title: "Fighting Fair: A Couple's Guide to Healthy Conflict Resolution",
    excerpt:
      "Every couple fights. The difference between couples who last and those who don't is how they handle conflict.",
    content: `Conflict is inevitable in any relationship. Two separate people with different backgrounds, experiences, and perspectives are bound to disagree. The goal isn't to eliminate conflict — it's to learn how to navigate it in a way that strengthens rather than destroys your bond.

## Why Conflict Can Be Healthy

Research by relationship expert Dr. John Gottman shows that the presence of conflict doesn't predict relationship failure. What matters is the ratio of positive to negative interactions (ideally 5:1) and how couples repair after disagreements.

Healthy conflict can:
- Deepen understanding of each other's needs
- Strengthen trust when handled respectfully
- Lead to creative solutions and growth
- Prevent resentment from building up

## The Four Horsemen of Relationship Apocalypse

Gottman identified four destructive communication patterns that predict relationship failure:

### 1. Criticism
Attacking your partner's character rather than addressing a specific behavior. "You always forget everything" vs. "I felt hurt when you forgot our plans."

### 2. Contempt
Showing disrespect through sarcasm, eye-rolling, name-calling, or mockery. Contempt is the single greatest predictor of divorce.

### 3. Defensiveness
Responding to complaints with counter-complaints or excuses rather than taking responsibility. It sends the message: "The problem isn't me, it's you."

### 4. Stonewalling
Withdrawing from the conversation entirely — shutting down, walking away, or giving the silent treatment. This leaves the other partner feeling abandoned.

## Rules for Fighting Fair

### Take a Time-Out When Needed
If emotions are escalating, it's okay to take a 20-minute break. Say: "I need a pause to calm down so I can have this conversation respectfully." Then come back.

### Stick to One Issue
Don't kitchen-sink — bringing up every past grievance during a single argument. Stay focused on the issue at hand.

### Use Soft Start-Ups
How you begin a conversation determines how it will end. Start with "I feel..." rather than "You always..." or "You never..."

### Seek to Understand, Not to Win
Approach conflict with curiosity rather than combativeness. "Help me understand your perspective" is far more productive than "Here's why you're wrong."

### Take Responsibility
Even in conflicts where you feel mostly right, there's usually something you can own. Acknowledging your part disarms defensiveness and opens the door to resolution.

### Make Repair Attempts
During or after conflict, reach out with humor, affection, or acknowledgment. "I know we're disagreeing, but I love you" can defuse tension and remind both partners of their bond.

## After the Fight

### Debrief Together
Once emotions have settled, revisit the conflict calmly. Discuss what triggered each of you, what you each need, and how you can handle similar situations better in the future.

### Reconnect Physically
A hug, holding hands, or simply sitting close can help restore the emotional connection after a difficult conversation.

Conflict doesn't have to be the enemy of love. When handled with respect, empathy, and intentionality, it becomes one of the most powerful tools for building a deeper, more authentic relationship.`,
    category: "Communication",
    author: { name: "Jordan Wells", role: "Psychology Writer" },
    readTime: "8 min read",
    date: "2026-01-20",
    thumbnail: "/images/article-conflict.jpg",
    tags: ["conflict resolution", "communication", "couples", "marriage"],
  },
  {
    id: "10",
    slug: "pleasure-and-intimacy-guide",
    title: "A Modern Guide to Pleasure and Intimacy",
    excerpt:
      "Exploring intimacy with openness, communication, and mutual respect can deepen your connection in ways you never expected.",
    content: `Intimacy is a journey, not a destination. Whether you're exploring a new relationship or deepening a long-standing one, approaching pleasure with openness, communication, and mutual respect can transform your connection.

## Redefining Intimacy

Intimacy encompasses far more than physical acts. True intimacy includes:

- **Emotional intimacy**: Sharing your innermost thoughts and feelings
- **Intellectual intimacy**: Connecting through ideas, curiosity, and conversation
- **Experiential intimacy**: Building bonds through shared activities and adventures
- **Physical intimacy**: The full spectrum of touch, from holding hands to sexual expression

## The Foundation: Communication

The most important intimate organ is your voice. Being able to talk openly about desires, boundaries, and preferences is what separates fulfilling intimate lives from frustrating ones.

### Starting the Conversation
- Choose a relaxed, non-intimate moment to bring up the topic
- Use "I" statements: "I'd love to explore..." rather than "You never..."
- Frame it positively: Focus on what you want more of, not what's lacking
- Be receptive: Listen to your partner's desires with the same openness you'd want

### The Yes/No/Maybe List
This exercise involves each partner independently marking activities as "yes" (interested), "no" (not interested), or "maybe" (open to discussing). Comparing lists opens up honest, judgment-free conversation.

## Understanding Desire

### Spontaneous vs. Responsive Desire
Not everyone experiences desire the same way. Some people feel spontaneous desire (wanting intimacy "out of the blue"), while others experience responsive desire (becoming interested once intimacy begins). Neither is better or more valid.

### The Desire Discrepancy
It's completely normal for partners to have different levels of desire. The key is finding a balance that works for both without pressure or resentment. Regular check-ins about your intimate life can prevent misunderstandings.

## Creating Safety

### Emotional Safety
When both partners feel emotionally safe, vulnerability becomes possible. This means no judgment, no criticism, and no using intimate information as ammunition during arguments.

### Physical Safety
Always prioritize consent, comfort, and well-being. Check in with your partner regularly and create a space where either person can pause or stop at any time without guilt.

## Keeping Things Fresh

### Novelty and Exploration
Our brains thrive on novelty. Introducing new experiences — whether it's a different setting, a new way of connecting, or exploring something you've both been curious about — can reignite excitement.

### Mindfulness and Presence
Being fully present during intimate moments — rather than distracted by stress, to-do lists, or performance anxiety — dramatically enhances the experience for both partners.

## When to Seek Help

If intimacy challenges are causing significant distress in your relationship, working with a qualified sex therapist or couples counselor can make a world of difference. These professionals create safe spaces for exploring sensitive topics and developing personalized strategies.

Intimacy is a skill that can be learned, practiced, and refined throughout your life. Approach it with curiosity, kindness, and open communication, and it will continue to evolve and deepen.`,
    category: "Sex Education",
    author: { name: "Alex Rivera", role: "Sex Educator" },
    readTime: "8 min read",
    date: "2026-01-15",
    thumbnail: "/images/article-intimacy.jpg",
    tags: ["intimacy", "sex education", "communication", "pleasure"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.slug === slug);
}

export function getRelatedQuizzes(currentSlug: string, limit = 3): Quiz[] {
  return quizzes.filter((q) => q.slug !== currentSlug).slice(0, limit);
}

export function getRelatedArticles(
  currentSlug: string,
  limit = 3
): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return articles.slice(0, limit);
  return articles
    .filter(
      (a) => a.slug !== currentSlug && a.category === current.category
    )
    .slice(0, limit)
    .concat(
      articles
        .filter(
          (a) => a.slug !== currentSlug && a.category !== current.category
        )
        .slice(0, limit)
    )
    .slice(0, limit);
}

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
