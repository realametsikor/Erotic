import { getStore } from "@netlify/blobs";

export function getEpisodesStore() {
  return getStore({ name: "episodes", consistency: "strong" });
}

export function getArticlesStore() {
  return getStore({ name: "articles", consistency: "strong" });
}

export function getSettingsStore() {
  return getStore({ name: "settings", consistency: "strong" });
}
