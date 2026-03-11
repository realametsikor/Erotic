import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confessions",
  description:
    "Anonymous relationship confessions from real people. Share your story or find comfort in others.",
};

export default function ConfessionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
