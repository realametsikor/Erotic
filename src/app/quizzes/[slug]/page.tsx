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
  };
}

export default async function QuizDetailPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  return <QuizClient quiz={quiz} />;
}
