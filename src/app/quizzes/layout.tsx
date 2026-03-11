import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzes",
  description:
    "Take fun, insightful relationship quizzes to discover your love language, partner type, and more.",
};

export default function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
