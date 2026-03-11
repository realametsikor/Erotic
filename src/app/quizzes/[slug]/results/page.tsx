import { Metadata } from "next";
import { notFound } from "next/navigation";
import { quizzes, getQuizBySlug } from "@/data/content";
import ResultsClient from "./ResultsClient";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ r?: string }>;
}

export async function generateStaticParams() {
  return quizzes.map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const { r } = await searchParams;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return {};

  const result = r ? quiz.results.find((res) => res.id === r) : null;

  if (result) {
    const title = `I got "${result.title}" — ${quiz.title}`;
    const description = result.description;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        siteName: "Heartcast",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  return {
    title: quiz.title,
    description: quiz.description,
    openGraph: {
      title: quiz.title,
      description: quiz.description,
      type: "website",
    },
  };
}

export default async function QuizResultsPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { r } = await searchParams;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const result = r ? quiz.results.find((res) => res.id === r) : null;

  if (!result) {
    notFound();
  }

  return <ResultsClient quiz={quiz} result={result} />;
}
