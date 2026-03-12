import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { stories, getStoryBySlug, getStoryEpisodes } from "@/data/stories";
import StoryPlayerClient from "./StoryPlayerClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };
  return {
    title: `${story.title} — Story Mode`,
    description: story.description,
    openGraph: {
      title: `${story.title} — Story Mode`,
      description: story.description,
      type: "website",
    },
    alternates: {
      canonical: `/story-mode/${story.slug}`,
    },
  };
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryPlayerPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const storyEpisodes = getStoryEpisodes(story);
  if (storyEpisodes.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: story.title,
    description: story.description,
    url: `https://capable-kheer-fd7f34.netlify.app/story-mode/${story.slug}`,
    provider: {
      "@type": "Organization",
      name: "Heartcast",
    },
    numberOfEpisodes: storyEpisodes.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryPlayerClient story={story} episodes={storyEpisodes} />
    </>
  );
}
