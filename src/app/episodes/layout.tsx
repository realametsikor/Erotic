import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast Episodes",
  description:
    "Browse our full library of podcast episodes covering love, dating, intimacy, emotional intelligence, and relationship advice.",
};

export default function EpisodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
