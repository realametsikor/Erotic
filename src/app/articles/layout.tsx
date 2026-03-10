import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Expert insights on love, dating, emotional intelligence, and building healthier relationships.",
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
