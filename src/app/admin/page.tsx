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
  Edit3,
  TrendingUp,
  Clock,
  Star,
  Menu,
  ChevronLeft,
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

type View = "dashboard" | "episodes" | "articles" | "settings";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [view, setView] = useState<View>("dashboard");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Episode form state
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);

  // Article form state
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

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

  const saveEpisode = async (data: Partial<Episode>, isEdit: boolean) => {
    setSaving(true);
    try {
      const res = await fetch("/api/episodes", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const ep = await res.json();
        if (isEdit) {
          setEpisodes((prev) =>
            prev.map((e) => (e.slug === ep.slug ? ep : e))
          );
        } else {
          setEpisodes((prev) => [...prev, ep]);
        }
        setShowEpisodeForm(false);
        setEditingEpisode(null);
        showMsg("success", isEdit ? "Episode updated!" : "Episode created!");
      } else if (res.status === 401) {
        await handleUnauthorized();
      } else {
        showMsg("error", `Failed to ${isEdit ? "update" : "create"} episode`);
      }
    } catch {
      showMsg("error", `Failed to ${isEdit ? "update" : "create"} episode`);
    }
    setSaving(false);
  };

  const saveArticle = async (data: Partial<Article>, isEdit: boolean) => {
    setSaving(true);
    try {
      const res = await fetch("/api/articles", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const article = await res.json();
        if (isEdit) {
          setArticles((prev) =>
            prev.map((a) => (a.slug === article.slug ? article : a))
          );
        } else {
          setArticles((prev) => [...prev, article]);
        }
        setShowArticleForm(false);
        setEditingArticle(null);
        showMsg("success", isEdit ? "Article updated!" : "Article created!");
      } else if (res.status === 401) {
        await handleUnauthorized();
      } else {
        showMsg("error", `Failed to ${isEdit ? "update" : "create"} article`);
      }
    } catch {
      showMsg("error", `Failed to ${isEdit ? "update" : "create"} article`);
    }
    setSaving(false);
  };

  const startEditEpisode = (ep: Episode) => {
    setEditingEpisode(ep);
    setShowEpisodeForm(true);
  };

  const startEditArticle = (a: Article) => {
    setEditingArticle(a);
    setShowArticleForm(true);
  };

  const cancelEpisodeForm = () => {
    setShowEpisodeForm(false);
    setEditingEpisode(null);
  };

  const cancelArticleForm = () => {
    setShowArticleForm(false);
    setEditingArticle(null);
  };

  const navItems: { key: View; label: string; icon: React.ReactNode }[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      key: "episodes",
      label: "Episodes",
      icon: <Mic className="w-5 h-5" />,
    },
    {
      key: "articles",
      label: "Articles",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const recentEpisodes = [...episodes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  const premiumEpisodes = episodes.filter((e) => e.isPremium).length;
  const featuredArticles = articles.filter((a) => a.featured).length;

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-[var(--surface)] border-r border-[var(--border)] flex flex-col transition-all duration-200 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static ${sidebarOpen ? "w-64" : "w-[72px]"}`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--border)] shrink-0">
          {sidebarOpen && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[var(--foreground)] truncate">
                Admin
              </span>
            </div>
          )}
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              setMobileSidebarOpen(false);
            }}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-light)] transition-colors hidden lg:flex"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${
                !sidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setView(item.key);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                view === item.key
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-light)]"
              }`}
              title={item.label}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Sidebar footer - user info */}
        <div className="border-t border-[var(--border)] p-3 shrink-0">
          {sidebarOpen && user && (
            <div className="mb-2 px-3">
              <p className="text-xs text-[var(--muted)] truncate">
                {user.email}
              </p>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-light)] transition-colors lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-[var(--foreground)] capitalize">
                  {view}
                </h1>
                <p className="text-xs text-[var(--muted)] hidden sm:block">
                  {view === "dashboard" && "Overview of your content"}
                  {view === "episodes" && `${episodes.length} total episodes`}
                  {view === "articles" && `${articles.length} total articles`}
                  {view === "settings" && "Manage site configuration"}
                </p>
              </div>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </header>

        {/* Toast */}
        {message && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg border ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Page content */}
        <main className="p-4 sm:p-6 max-w-6xl">
          {view === "dashboard" && (
            <DashboardView
              episodes={episodes}
              articles={articles}
              premiumEpisodes={premiumEpisodes}
              featuredArticles={featuredArticles}
              recentEpisodes={recentEpisodes}
              recentArticles={recentArticles}
              loading={loading}
              onNavigate={setView}
              onEditEpisode={(ep) => {
                setView("episodes");
                startEditEpisode(ep);
              }}
              onEditArticle={(a) => {
                setView("articles");
                startEditArticle(a);
              }}
            />
          )}

          {view === "episodes" && (
            <EpisodesView
              episodes={episodes}
              loading={loading}
              saving={saving}
              showForm={showEpisodeForm}
              editingEpisode={editingEpisode}
              onToggleForm={() => {
                if (showEpisodeForm) {
                  cancelEpisodeForm();
                } else {
                  setEditingEpisode(null);
                  setShowEpisodeForm(true);
                }
              }}
              onCancelForm={cancelEpisodeForm}
              onSave={saveEpisode}
              onEdit={startEditEpisode}
              onDelete={deleteEpisode}
            />
          )}

          {view === "articles" && (
            <ArticlesView
              articles={articles}
              loading={loading}
              saving={saving}
              showForm={showArticleForm}
              editingArticle={editingArticle}
              onToggleForm={() => {
                if (showArticleForm) {
                  cancelArticleForm();
                } else {
                  setEditingArticle(null);
                  setShowArticleForm(true);
                }
              }}
              onCancelForm={cancelArticleForm}
              onSave={saveArticle}
              onEdit={startEditArticle}
              onDelete={deleteArticle}
            />
          )}

          {view === "settings" && (
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
        </main>
      </div>
    </div>
  );
}

/* ── Dashboard View ──────────────────────────────────────────── */

function DashboardView({
  episodes,
  articles,
  premiumEpisodes,
  featuredArticles,
  recentEpisodes,
  recentArticles,
  loading,
  onNavigate,
  onEditEpisode,
  onEditArticle,
}: {
  episodes: Episode[];
  articles: Article[];
  premiumEpisodes: number;
  featuredArticles: number;
  recentEpisodes: Episode[];
  recentArticles: Article[];
  loading: boolean;
  onNavigate: (view: View) => void;
  onEditEpisode: (ep: Episode) => void;
  onEditArticle: (a: Article) => void;
}) {
  if (loading) {
    return (
      <div className="text-center py-20 text-[var(--muted)]">Loading...</div>
    );
  }

  const stats = [
    {
      label: "Total Episodes",
      value: episodes.length,
      icon: <Mic className="w-5 h-5" />,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Total Articles",
      value: articles.length,
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Premium Episodes",
      value: premiumEpisodes,
      icon: <Star className="w-5 h-5" />,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Featured Articles",
      value: featuredArticles,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}
              >
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {stat.value}
            </p>
            <p className="text-xs text-[var(--muted)] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate("episodes")}
          className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors text-left group"
        >
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Add New Episode
            </p>
            <p className="text-xs text-[var(--muted)]">
              Create a new podcast episode
            </p>
          </div>
        </button>
        <button
          onClick={() => onNavigate("articles")}
          className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors text-left group"
        >
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Add New Article
            </p>
            <p className="text-xs text-[var(--muted)]">
              Write a new article
            </p>
          </div>
        </button>
      </div>

      {/* Recent Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Episodes */}
        <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-400" />
              Recent Episodes
            </h3>
            <button
              onClick={() => onNavigate("episodes")}
              className="text-xs text-[var(--primary-light)] hover:underline"
            >
              View all
            </button>
          </div>
          {recentEpisodes.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--muted)]">
              No episodes yet
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {recentEpisodes.map((ep) => (
                <div
                  key={ep.slug}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-light)] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">
                      {ep.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--muted)]">
                      <span className="text-[var(--primary-light)]">
                        {ep.category}
                      </span>
                      <span>&middot;</span>
                      <Clock className="w-3 h-3" />
                      <span>{ep.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onEditEpisode(ep)}
                    className="p-1.5 text-[var(--muted)] hover:text-[var(--primary)] transition-colors shrink-0"
                    title="Edit episode"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Articles */}
        <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Recent Articles
            </h3>
            <button
              onClick={() => onNavigate("articles")}
              className="text-xs text-[var(--primary-light)] hover:underline"
            >
              View all
            </button>
          </div>
          {recentArticles.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--muted)]">
              No articles yet
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {recentArticles.map((a) => (
                <div
                  key={a.slug}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-light)] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">
                      {a.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--muted)]">
                      <span className="text-[var(--primary-light)]">
                        {a.category}
                      </span>
                      <span>&middot;</span>
                      <Clock className="w-3 h-3" />
                      <span>{a.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onEditArticle(a)}
                    className="p-1.5 text-[var(--muted)] hover:text-[var(--primary)] transition-colors shrink-0"
                    title="Edit article"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Episodes View ───────────────────────────────────────────── */

function EpisodesView({
  episodes,
  loading,
  saving,
  showForm,
  editingEpisode,
  onToggleForm,
  onCancelForm,
  onSave,
  onEdit,
  onDelete,
}: {
  episodes: Episode[];
  loading: boolean;
  saving: boolean;
  showForm: boolean;
  editingEpisode: Episode | null;
  onToggleForm: () => void;
  onCancelForm: () => void;
  onSave: (data: Partial<Episode>, isEdit: boolean) => void;
  onEdit: (ep: Episode) => void;
  onDelete: (slug: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Podcast Episodes
        </h2>
        <button
          onClick={onToggleForm}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {showForm ? (
            <X className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {showForm ? "Cancel" : "Add Episode"}
        </button>
      </div>

      {showForm && (
        <EpisodeForm
          saving={saving}
          episode={editingEpisode}
          onSave={(data) => onSave(data, !!editingEpisode)}
          onCancel={onCancelForm}
        />
      )}

      {loading ? (
        <div className="text-center py-12 text-[var(--muted)]">Loading...</div>
      ) : episodes.length === 0 ? (
        <div className="text-center py-12 text-[var(--muted)]">
          <Mic className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No CMS episodes yet</p>
          <p className="text-sm mt-1">
            Click &quot;Add Episode&quot; to create one
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {episodes.map((ep) => (
            <div
              key={ep.slug}
              className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border)]/80 transition-colors"
            >
              <div className="min-w-0 flex-1">
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
                      <span className="text-amber-500 font-medium">
                        Premium
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-3">
                <button
                  onClick={() => onEdit(ep)}
                  className="p-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-[var(--surface-light)]"
                  title="Edit episode"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(ep.slug)}
                  className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                  title="Delete episode"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Articles View ───────────────────────────────────────────── */

function ArticlesView({
  articles,
  loading,
  saving,
  showForm,
  editingArticle,
  onToggleForm,
  onCancelForm,
  onSave,
  onEdit,
  onDelete,
}: {
  articles: Article[];
  loading: boolean;
  saving: boolean;
  showForm: boolean;
  editingArticle: Article | null;
  onToggleForm: () => void;
  onCancelForm: () => void;
  onSave: (data: Partial<Article>, isEdit: boolean) => void;
  onEdit: (a: Article) => void;
  onDelete: (slug: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Articles
        </h2>
        <button
          onClick={onToggleForm}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {showForm ? (
            <X className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {showForm ? "Cancel" : "Add Article"}
        </button>
      </div>

      {showForm && (
        <ArticleForm
          saving={saving}
          article={editingArticle}
          onSave={(data) => onSave(data, !!editingArticle)}
          onCancel={onCancelForm}
        />
      )}

      {loading ? (
        <div className="text-center py-12 text-[var(--muted)]">Loading...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-[var(--muted)]">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No CMS articles yet</p>
          <p className="text-sm mt-1">
            Click &quot;Add Article&quot; to create one
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {articles.map((a) => (
            <div
              key={a.slug}
              className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border)]/80 transition-colors"
            >
              <div className="min-w-0 flex-1">
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
                      <span className="text-amber-500 font-medium">
                        Featured
                      </span>
                    </>
                  )}
                  {a.isPremium && (
                    <>
                      <span>&middot;</span>
                      <span className="text-amber-500 font-medium">
                        Premium
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-3">
                <button
                  onClick={() => onEdit(a)}
                  className="p-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-[var(--surface-light)]"
                  title="Edit article"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(a.slug)}
                  className="p-2 text-[var(--muted)] hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                  title="Delete article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Episode Form ────────────────────────────────────────────── */

function EpisodeForm({
  saving,
  episode,
  onSave,
  onCancel,
}: {
  saving: boolean;
  episode: Episode | null;
  onSave: (data: Partial<Episode>) => void;
  onCancel: () => void;
}) {
  const isEdit = !!episode;
  const [title, setTitle] = useState(episode?.title ?? "");
  const [description, setDescription] = useState(episode?.description ?? "");
  const [summary, setSummary] = useState(episode?.summary ?? "");
  const [category, setCategory] = useState(episode?.category ?? "Dating");
  const [topic, setTopic] = useState(episode?.topic ?? "");
  const [date, setDate] = useState(
    episode?.date ?? new Date().toISOString().split("T")[0]
  );
  const [duration, setDuration] = useState(episode?.duration ?? "30 min");
  const [audioUrl, setAudioUrl] = useState(episode?.audioUrl ?? "");
  const [videoUrl, setVideoUrl] = useState(episode?.videoUrl ?? "");
  const [isPremium, setIsPremium] = useState(episode?.isPremium ?? false);
  const [tagsStr, setTagsStr] = useState(episode?.tags?.join(", ") ?? "");
  const [highlightsStr, setHighlightsStr] = useState(
    episode?.highlights?.join("\n") ?? ""
  );
  const [transcript, setTranscript] = useState(episode?.transcript ?? "");
  const [showAdvanced, setShowAdvanced] = useState(isEdit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const data: Partial<Episode> = {
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
    };
    if (isEdit) {
      data.slug = episode!.slug;
      data.id = episode!.id;
    }
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[var(--foreground)]">
          {isEdit ? "Edit Episode" : "New Episode"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *">
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

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Save className="w-4 h-4" />
          {saving
            ? "Saving..."
            : isEdit
            ? "Update Episode"
            : "Save Episode"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface-light)] border border-[var(--border)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ── Article Form ────────────────────────────────────────────── */

function ArticleForm({
  saving,
  article,
  onSave,
  onCancel,
}: {
  saving: boolean;
  article: Article | null;
  onSave: (data: Partial<Article>) => void;
  onCancel: () => void;
}) {
  const isEdit = !!article;
  const [title, setTitle] = useState(article?.title ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [category, setCategory] = useState(
    article?.category ?? "Relationship Advice"
  );
  const [authorName, setAuthorName] = useState(article?.author?.name ?? "");
  const [authorRole, setAuthorRole] = useState(
    article?.author?.role ?? "Editor"
  );
  const [readTime, setReadTime] = useState(article?.readTime ?? "5 min");
  const [date, setDate] = useState(
    article?.date ?? new Date().toISOString().split("T")[0]
  );
  const [tagsStr, setTagsStr] = useState(article?.tags?.join(", ") ?? "");
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [isPremium, setIsPremium] = useState(article?.isPremium ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const data: Partial<Article> = {
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
    };
    if (isEdit) {
      data.slug = article!.slug;
      data.id = article!.id;
    }
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[var(--foreground)]">
          {isEdit ? "Edit Article" : "New Article"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *">
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

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Save className="w-4 h-4" />
          {saving
            ? "Saving..."
            : isEdit
            ? "Update Article"
            : "Save Article"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface-light)] border border-[var(--border)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ── Settings Form ───────────────────────────────────────────── */

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
  const [contactEmail, setContactEmail] = useState(
    settings?.contactEmail ?? ""
  );
  const [instagram, setInstagram] = useState(
    settings?.socialLinks?.instagram ?? ""
  );
  const [twitter, setTwitter] = useState(settings?.socialLinks?.twitter ?? "");
  const [youtube, setYoutube] = useState(settings?.socialLinks?.youtube ?? "");
  const [tiktok, setTiktok] = useState(settings?.socialLinks?.tiktok ?? "");
  const [spotify, setSpotify] = useState(
    settings?.podcastLinks?.spotify ?? ""
  );
  const [applePodcasts, setApplePodcasts] = useState(
    settings?.podcastLinks?.applePodcasts ?? ""
  );
  const [googlePodcasts, setGooglePodcasts] = useState(
    settings?.podcastLinks?.googlePodcasts ?? ""
  );
  const [footerText, setFooterText] = useState(settings?.footerText ?? "");
  const [enablePremium, setEnablePremium] = useState(
    settings?.enablePremium ?? true
  );

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
    <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="e.g. &copy; 2026 Heartcast. All rights reserved."
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
          <label
            htmlFor="settings-premium"
            className="text-sm text-[var(--foreground)]"
          >
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
        <h3 className="font-semibold text-[var(--foreground)]">
          Podcast Platforms
        </h3>
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

/* ── Shared field wrapper ────────────────────────────────────── */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
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
