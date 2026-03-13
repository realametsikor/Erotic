"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mic,
  BookOpen,
  Plus,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface Episode {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  topic: string;
  date: string;
  duration: string;
  thumbnail: string;
  audioUrl: string;
  videoUrl?: string;
  isPremium: boolean;
  popularity: number;
  highlights: string[];
  transcript: string;
  tags: string[];
}

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: { name: string; role: string };
  readTime: string;
  date: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
  isPremium?: boolean;
}

const episodeCategories = [
  "Dating",
  "Communication",
  "Intimacy",
  "Breakups",
  "Marriage",
  "Emotional Intelligence",
  "Self-Love",
];

const articleCategories = [
  "Relationship Advice",
  "Dating",
  "Emotional Intelligence",
  "Sex Education",
  "Communication",
  "Self-Love",
];

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  podcastLinks: {
    spotify: string;
    applePodcasts: string;
    googlePodcasts: string;
  };
  footerText: string;
  enablePremium: boolean;
}

type Tab = "episodes" | "articles" | "settings";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("episodes");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [epRes, arRes, setRes] = await Promise.all([
        fetch("/api/episodes"),
        fetch("/api/articles"),
        fetch("/api/settings"),
      ]);
      if (epRes.ok) setEpisodes(await epRes.json());
      if (arRes.ok) setArticles(await arRes.json());
      if (setRes.ok) setSettings(await setRes.json());
    } catch {
      setMessage({ type: "error", text: "Failed to load data" });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUnauthorized = useCallback(async () => {
    showMsg("error", "Session expired. Please log in again.");
    await logout();
  }, [logout]);

  const deleteEpisode = async (slug: string) => {
    if (!confirm("Delete this episode?")) return;
    const res = await fetch("/api/episodes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) {
      setEpisodes((prev) => prev.filter((e) => e.slug !== slug));
      showMsg("success", "Episode deleted");
    } else if (res.status === 401) {
      await handleUnauthorized();
    } else {
      showMsg("error", "Failed to delete episode");
    }
  };

  const deleteArticle = async (slug: string) => {
    if (!confirm("Delete this article?")) return;
    const res = await fetch("/api/articles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
      showMsg("success", "Article deleted");
    } else if (res.status === 401) {
      await handleUnauthorized();
    } else {
      showMsg("error", "Failed to delete article");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-[var(--primary)]" />
            <h1 className="text-lg font-bold text-[var(--foreground)]">
              Admin CMS
            </h1>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-xs text-[var(--muted)] hidden sm:inline">
                {user.email}
              </span>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Message toast */}
      {message && (
        <div
          className={`fixed top-24 right-4 z-50 px-4 py-2 rounded-lg text-sm font-medium shadow-lg ${
            message.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("episodes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "episodes"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Mic className="w-4 h-4" />
            Podcasts ({episodes.length})
          </button>
          <button
            onClick={() => setTab("articles")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "articles"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Articles ({articles.length})
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "settings"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Episodes tab */}
        {tab === "episodes" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                Podcast Episodes
              </h2>
              <button
                onClick={() => setShowEpisodeForm(!showEpisodeForm)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {showEpisodeForm ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {showEpisodeForm ? "Cancel" : "Add Episode"}
              </button>
            </div>

            {showEpisodeForm && (
              <EpisodeForm
                saving={saving}
                onSave={async (data) => {
                  setSaving(true);
                  try {
                    const res = await fetch("/api/episodes", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });
                    if (res.ok) {
                      const ep = await res.json();
                      setEpisodes((prev) => [...prev, ep]);
                      setShowEpisodeForm(false);
                      showMsg("success", "Episode created!");
                    } else if (res.status === 401) {
                      await handleUnauthorized();
                    } else {
                      showMsg("error", "Failed to create episode");
                    }
                  } catch {
                    showMsg("error", "Failed to create episode");
                  }
                  setSaving(false);
                }}
              />
            )}

            {loading ? (
              <div className="text-center py-12 text-[var(--muted)]">
                Loading...
              </div>
            ) : episodes.length === 0 ? (
              <div className="text-center py-12 text-[var(--muted)]">
                <Mic className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No CMS episodes yet</p>
                <p className="text-sm mt-1">
                  Click &quot;Add Episode&quot; to create one
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {episodes.map((ep) => (
                  <div
                    key={ep.slug}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium text-[var(--foreground)] truncate">
                        {ep.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[var(--muted)]">
                        <span className="text-[var(--primary-light)]">
                          {ep.category}
                        </span>
                        <span>&middot;</span>
                        <span>{ep.duration}</span>
                        <span>&middot;</span>
                        <span>{ep.date}</span>
                        {ep.isPremium && (
                          <>
                            <span>&middot;</span>
                            <span className="text-amber-500">Premium</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEpisode(ep.slug)}
                      className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Articles tab */}
        {tab === "articles" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                Articles
              </h2>
              <button
                onClick={() => setShowArticleForm(!showArticleForm)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {showArticleForm ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {showArticleForm ? "Cancel" : "Add Article"}
              </button>
            </div>

            {showArticleForm && (
              <ArticleForm
                saving={saving}
                onSave={async (data) => {
                  setSaving(true);
                  try {
                    const res = await fetch("/api/articles", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });
                    if (res.ok) {
                      const article = await res.json();
                      setArticles((prev) => [...prev, article]);
                      setShowArticleForm(false);
                      showMsg("success", "Article created!");
                    } else if (res.status === 401) {
                      await handleUnauthorized();
                    } else {
                      showMsg("error", "Failed to create article");
                    }
                  } catch {
                    showMsg("error", "Failed to create article");
                  }
                  setSaving(false);
                }}
              />
            )}

            {loading ? (
              <div className="text-center py-12 text-[var(--muted)]">
                Loading...
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 text-[var(--muted)]">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No CMS articles yet</p>
                <p className="text-sm mt-1">
                  Click &quot;Add Article&quot; to create one
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {articles.map((a) => (
                  <div
                    key={a.slug}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium text-[var(--foreground)] truncate">
                        {a.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[var(--muted)]">
                        <span className="text-[var(--primary-light)]">
                          {a.category}
                        </span>
                        <span>&middot;</span>
                        <span>{a.readTime}</span>
                        <span>&middot;</span>
                        <span>{a.author.name}</span>
                        <span>&middot;</span>
                        <span>{a.date}</span>
                        {a.featured && (
                          <>
                            <span>&middot;</span>
                            <span className="text-amber-500">Featured</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteArticle(a.slug)}
                      className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings tab */}
        {tab === "settings" && (
          <SettingsForm
            settings={settings}
            saving={saving}
            onSave={async (data) => {
              setSaving(true);
              try {
                const res = await fetch("/api/settings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
                if (res.ok) {
                  const updated = await res.json();
                  setSettings(updated);
                  showMsg("success", "Settings saved!");
                } else {
                  showMsg("error", "Failed to save settings");
                }
              } catch {
                showMsg("error", "Failed to save settings");
              }
              setSaving(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ── Episode Form ─────────────────────────────────────────────── */

function EpisodeForm({
  saving,
  onSave,
}: {
  saving: boolean;
  onSave: (data: Partial<Episode>) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Dating");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [duration, setDuration] = useState("30 min");
  const [audioUrl, setAudioUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [tagsStr, setTagsStr] = useState("");
  const [highlightsStr, setHighlightsStr] = useState("");
  const [transcript, setTranscript] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      summary: summary.trim(),
      category,
      topic: topic.trim(),
      date,
      duration,
      audioUrl: audioUrl.trim(),
      videoUrl: videoUrl.trim() || undefined,
      isPremium,
      highlights: highlightsStr
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      transcript: transcript.trim(),
      tags: tagsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
    >
      <h3 className="font-semibold text-[var(--foreground)]">New Episode</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *" required>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Episode title"
            className="input-field"
          />
        </Field>
        <Field label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {episodeCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Short description"
          className="input-field"
        />
      </Field>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </Field>
        <Field label="Duration">
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 45 min"
            className="input-field"
          />
        </Field>
        <Field label="Topic">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. First Dates"
            className="input-field"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Audio URL">
          <input
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://..."
            className="input-field"
          />
        </Field>
        <Field label="Video URL (optional)">
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/embed/..."
            className="input-field"
          />
        </Field>
      </div>

      <Field label="Tags (comma-separated)">
        <input
          value={tagsStr}
          onChange={(e) => setTagsStr(e.target.value)}
          placeholder="dating, love, communication"
          className="input-field"
        />
      </Field>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="ep-premium"
          checked={isPremium}
          onChange={(e) => setIsPremium(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="ep-premium" className="text-sm text-[var(--foreground)]">
          Premium episode
        </label>
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        {showAdvanced ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        Advanced fields
      </button>

      {showAdvanced && (
        <div className="space-y-4">
          <Field label="Summary">
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              placeholder="Detailed summary"
              className="input-field"
            />
          </Field>
          <Field label="Highlights (one per line)">
            <textarea
              value={highlightsStr}
              onChange={(e) => setHighlightsStr(e.target.value)}
              rows={3}
              placeholder={"Key takeaway 1\nKey takeaway 2"}
              className="input-field"
            />
          </Field>
          <Field label="Transcript">
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={4}
              placeholder="Episode transcript..."
              className="input-field"
            />
          </Field>
        </div>
      )}

      <button
        type="submit"
        disabled={saving || !title.trim()}
        className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save Episode"}
      </button>
    </form>
  );
}

/* ── Article Form ─────────────────────────────────────────────── */

function ArticleForm({
  saving,
  onSave,
}: {
  saving: boolean;
  onSave: (data: Partial<Article>) => void;
}) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Relationship Advice");
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("Editor");
  const [readTime, setReadTime] = useState("5 min");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tagsStr, setTagsStr] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category,
      author: {
        name: authorName.trim() || "Admin",
        role: authorRole.trim() || "Editor",
      },
      readTime,
      date,
      tags: tagsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      featured,
      isPremium,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
    >
      <h3 className="font-semibold text-[var(--foreground)]">New Article</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *" required>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Article title"
            className="input-field"
          />
        </Field>
        <Field label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {articleCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Excerpt">
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Brief summary shown in listings"
          className="input-field"
        />
      </Field>

      <Field label="Content">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="Full article content..."
          className="input-field"
        />
      </Field>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Author Name">
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author name"
            className="input-field"
          />
        </Field>
        <Field label="Author Role">
          <input
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            placeholder="e.g. Editor"
            className="input-field"
          />
        </Field>
        <Field label="Read Time">
          <input
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            placeholder="e.g. 5 min"
            className="input-field"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <input
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            placeholder="love, dating, advice"
            className="input-field"
          />
        </Field>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="rounded"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="rounded"
          />
          Premium
        </label>
      </div>

      <button
        type="submit"
        disabled={saving || !title.trim()}
        className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save Article"}
      </button>
    </form>
  );
}

/* ── Settings Form ────────────────────────────────────────────── */

function SettingsForm({
  settings,
  saving,
  onSave,
}: {
  settings: SiteSettings | null;
  saving: boolean;
  onSave: (data: SiteSettings) => void;
}) {
  const [siteName, setSiteName] = useState(settings?.siteName ?? "Heartcast");
  const [siteDescription, setSiteDescription] = useState(
    settings?.siteDescription ?? "Love, Relationships & Intimacy Podcast"
  );
  const [contactEmail, setContactEmail] = useState(settings?.contactEmail ?? "");
  const [instagram, setInstagram] = useState(settings?.socialLinks?.instagram ?? "");
  const [twitter, setTwitter] = useState(settings?.socialLinks?.twitter ?? "");
  const [youtube, setYoutube] = useState(settings?.socialLinks?.youtube ?? "");
  const [tiktok, setTiktok] = useState(settings?.socialLinks?.tiktok ?? "");
  const [spotify, setSpotify] = useState(settings?.podcastLinks?.spotify ?? "");
  const [applePodcasts, setApplePodcasts] = useState(settings?.podcastLinks?.applePodcasts ?? "");
  const [googlePodcasts, setGooglePodcasts] = useState(settings?.podcastLinks?.googlePodcasts ?? "");
  const [footerText, setFooterText] = useState(settings?.footerText ?? "");
  const [enablePremium, setEnablePremium] = useState(settings?.enablePremium ?? true);

  useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName);
      setSiteDescription(settings.siteDescription);
      setContactEmail(settings.contactEmail);
      setInstagram(settings.socialLinks.instagram);
      setTwitter(settings.socialLinks.twitter);
      setYoutube(settings.socialLinks.youtube);
      setTiktok(settings.socialLinks.tiktok);
      setSpotify(settings.podcastLinks.spotify);
      setApplePodcasts(settings.podcastLinks.applePodcasts);
      setGooglePodcasts(settings.podcastLinks.googlePodcasts);
      setFooterText(settings.footerText);
      setEnablePremium(settings.enablePremium);
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      siteName: siteName.trim(),
      siteDescription: siteDescription.trim(),
      contactEmail: contactEmail.trim(),
      socialLinks: {
        instagram: instagram.trim(),
        twitter: twitter.trim(),
        youtube: youtube.trim(),
        tiktok: tiktok.trim(),
      },
      podcastLinks: {
        spotify: spotify.trim(),
        applePodcasts: applePodcasts.trim(),
        googlePodcasts: googlePodcasts.trim(),
      },
      footerText: footerText.trim(),
      enablePremium,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* General Settings */}
      <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <h3 className="font-semibold text-[var(--foreground)]">General</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Site Name">
            <input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Site name"
              className="input-field"
            />
          </Field>
          <Field label="Contact Email">
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="hello@example.com"
              className="input-field"
            />
          </Field>
        </div>
        <Field label="Site Description">
          <textarea
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            rows={2}
            placeholder="A short description of your site"
            className="input-field"
          />
        </Field>
        <Field label="Footer Text">
          <input
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            placeholder="e.g. © 2026 Heartcast. All rights reserved."
            className="input-field"
          />
        </Field>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="settings-premium"
            checked={enablePremium}
            onChange={(e) => setEnablePremium(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="settings-premium" className="text-sm text-[var(--foreground)]">
            Enable premium content
          </label>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <h3 className="font-semibold text-[var(--foreground)]">Social Links</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Instagram">
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/..."
              className="input-field"
            />
          </Field>
          <Field label="Twitter / X">
            <input
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://twitter.com/..."
              className="input-field"
            />
          </Field>
          <Field label="YouTube">
            <input
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="https://youtube.com/..."
              className="input-field"
            />
          </Field>
          <Field label="TikTok">
            <input
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              placeholder="https://tiktok.com/..."
              className="input-field"
            />
          </Field>
        </div>
      </div>

      {/* Podcast Links */}
      <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <h3 className="font-semibold text-[var(--foreground)]">Podcast Platforms</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Spotify">
            <input
              value={spotify}
              onChange={(e) => setSpotify(e.target.value)}
              placeholder="https://open.spotify.com/show/..."
              className="input-field"
            />
          </Field>
          <Field label="Apple Podcasts">
            <input
              value={applePodcasts}
              onChange={(e) => setApplePodcasts(e.target.value)}
              placeholder="https://podcasts.apple.com/..."
              className="input-field"
            />
          </Field>
        </div>
        <Field label="Google Podcasts">
          <input
            value={googlePodcasts}
            onChange={(e) => setGooglePodcasts(e.target.value)}
            placeholder="https://podcasts.google.com/..."
            className="input-field"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}

/* ── Shared field wrapper ──────────────────────────────────────── */

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[var(--muted)] mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
