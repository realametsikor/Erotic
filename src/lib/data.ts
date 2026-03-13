import { getEpisodesStore, getArticlesStore } from "@/lib/blobs";
import { episodes as staticEpisodes } from "@/data/episodes";
import type { Episode } from "@/data/episodes";
import { articles as staticArticles } from "@/data/content";
import type { Article } from "@/data/content";

export async function getAllEpisodes(): Promise<Episode[]> {
  try {
    const store = getEpisodesStore();
    const { blobs } = await store.list();
    const cmsEpisodes: Episode[] = [];
    for (const blob of blobs) {
      const data = await store.get(blob.key, { type: "json" });
      if (data) cmsEpisodes.push(data as Episode);
    }
    return [...staticEpisodes, ...cmsEpisodes];
  } catch {
    return staticEpisodes;
  }
}

export async function getEpisodeBySlugMerged(
  slug: string
): Promise<Episode | undefined> {
  const all = await getAllEpisodes();
  return all.find((ep) => ep.slug === slug);
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const store = getArticlesStore();
    const { blobs } = await store.list();
    const cmsArticles: Article[] = [];
    for (const blob of blobs) {
      const data = await store.get(blob.key, { type: "json" });
      if (data) cmsArticles.push(data as Article);
    }
    return [...staticArticles, ...cmsArticles];
  } catch {
    return staticArticles;
  }
}

export async function getArticleBySlugMerged(
  slug: string
): Promise<Article | undefined> {
  const all = await getAllArticles();
  return all.find((a) => a.slug === slug);
}
