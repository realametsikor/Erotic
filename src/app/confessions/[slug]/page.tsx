import { Metadata } from "next";
import { notFound } from "next/navigation";
import { confessions, getConfessionBySlug, getRelatedConfessions } from "@/data/content";
import ConfessionDetailClient from "./ConfessionDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return confessions.map((confession) => ({ slug: confession.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const confession = getConfessionBySlug(slug);
  if (!confession) return {};

  return {
    title: `"${confession.title}" — Anonymous Confession`,
    description: confession.preview,
    openGraph: {
      title: confession.title,
      description: confession.preview,
      type: "article",
      publishedTime: confession.date,
    },
    alternates: {
      canonical: `/confessions/${confession.slug}`,
    },
  };
}

export default async function ConfessionDetailPage({ params }: Props) {
  const { slug } = await params;
  const confession = getConfessionBySlug(slug);

  if (!confession) {
    notFound();
  }

  const related = getRelatedConfessions(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: confession.title,
    description: confession.preview,
    datePublished: confession.date,
    publisher: {
      "@type": "Organization",
      name: "Heartcast",
    },
    url: `https://capable-kheer-fd7f34.netlify.app/confessions/${confession.slug}`,
    genre: "confession",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConfessionDetailClient confession={confession} relatedConfessions={related} />
    </>
  );
}
