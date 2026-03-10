import { Metadata } from "next";
import { notFound } from "next/navigation";
import { episodes, getEpisodeBySlug, getRelatedEpisodes } from "@/data/episodes";
import EpisodeDetailClient from "./EpisodeDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return {};

  return {
    title: episode.title,
    description: episode.description,
    openGraph: {
      title: episode.title,
      description: episode.description,
      type: "article",
    },
  };
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const related = getRelatedEpisodes(slug);

  return <EpisodeDetailClient episode={episode} relatedEpisodes={related} />;
}
