import type { MetadataRoute } from "next";
import { episodes } from "@/data/episodes";
import { articles, confessions, quizzes, sexEdGuides } from "@/data/content";
import { stories } from "@/data/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://capable-kheer-fd7f34.netlify.app";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/episodes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quizzes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/confessions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/story-mode`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sex-education`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ask`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/premium`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const episodePages: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${baseUrl}/episodes/${episode.slug}`,
    lastModified: new Date(episode.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const confessionPages: MetadataRoute.Sitemap = confessions.map(
    (confession) => ({
      url: `${baseUrl}/confessions/${confession.slug}`,
      lastModified: new Date(confession.date),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  const quizPages: MetadataRoute.Sitemap = quizzes.map((quiz) => ({
    url: `${baseUrl}/quizzes/${quiz.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${baseUrl}/story-mode/${story.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...episodePages,
    ...articlePages,
    ...confessionPages,
    ...quizPages,
    ...storyPages,
  ];
}
