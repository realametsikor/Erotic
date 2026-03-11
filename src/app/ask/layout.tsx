import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Us Anything",
  description:
    "Submit your questions about love, relationships, intimacy, and more. Get featured on the Heartcast podcast.",
};

export default function AskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
