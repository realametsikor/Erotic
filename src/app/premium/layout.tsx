import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Membership | Heartcast",
  description:
    "Unlock exclusive episodes, ad-free listening, premium articles, and access to a private community. Start your 7-day free trial today.",
};

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
