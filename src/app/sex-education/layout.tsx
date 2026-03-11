import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sex Education Knowledge Hub",
  description:
    "Evidence-based guides on consent, intimacy, communication, and emotional connection. Explore our comprehensive sex education resources.",
};

export default function SexEducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
