import { NextRequest, NextResponse } from "next/server";
import { getArticlesStore } from "@/lib/blobs";
import type { Article } from "@/data/content";

export async function GET() {
  try {
    const store = getArticlesStore();
    const { blobs } = await store.list();
    const articles: Article[] = [];
    for (const blob of blobs) {
      const data = await store.get(blob.key, { type: "json" });
      if (data) articles.push(data as Article);
    }
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const store = getArticlesStore();
    const body = await request.json();

    const id = body.id || Date.now().toString();
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const article: Article = {
      id,
      slug,
      title: body.title,
      excerpt: body.excerpt || "",
      content: body.content || "",
      category: body.category || "Relationship Advice",
      author: body.author || { name: "Admin", role: "Editor" },
      readTime: body.readTime || "5 min",
      date: body.date || new Date().toISOString().split("T")[0],
      thumbnail: body.thumbnail || "/images/article-default.jpg",
      tags: body.tags || [],
      featured: body.featured || false,
      isPremium: body.isPremium || false,
    };

    await store.setJSON(slug, article);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { slug } = await request.json();
    const store = getArticlesStore();
    await store.delete(slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
