import { Metadata } from "next";
import { notFound } from "next/navigation";
import { quizzes, getQuizBySlug } from "@/data/content";
import QuizClient from "./QuizClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return quizzes.map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return {};

  return {
    title: quiz.title,
    description: quiz.description,
    openGraph: {
      title: quiz.title,
      description: quiz.description,
      type: "website",
    },
    alternates: {
      canonical: `/quizzes/${quiz.slug}`,
    },
  };
}

export default async function QuizDetailPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: quiz.title,
    description: quiz.description,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: quiz.category,
    },
    provider: {
      "@type": "Organization",
      name: "Heartcast",
    },
    url: `https://capable-kheer-fd7f34.netlify.app/quizzes/${quiz.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuizClient quiz={quiz} />
    </>
  );
}
