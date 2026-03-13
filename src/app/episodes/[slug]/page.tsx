import { Metadata } from "next";
import { notFound } from "next/navigation";
import { episodes, getRelatedEpisodes } from "@/data/episodes";
import { getEpisodeBySlugMerged } from "@/lib/data";
import EpisodeDetailClient from "./EpisodeDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlugMerged(slug);
  if (!episode) return {};

  return {
    title: episode.title,
    description: episode.description,
    keywords: episode.tags,
    openGraph: {
      title: episode.title,
      description: episode.description,
      type: "article",
      publishedTime: episode.date,
      tags: episode.tags,
    },
    alternates: {
      canonical: `/episodes/${episode.slug}`,
    },
  };
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { slug } = await params;
  const episode = await getEpisodeBySlugMerged(slug);

  if (!episode) {
    notFound();
  }

  const related = getRelatedEpisodes(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    datePublished: episode.date,
    duration: episode.duration,
    url: `https://capable-kheer-fd7f34.netlify.app/episodes/${episode.slug}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Heartcast",
      url: "https://capable-kheer-fd7f34.netlify.app",
    },
    keywords: episode.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EpisodeDetailClient episode={episode} relatedEpisodes={related} />
    </>
  );
}
