import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getEpisodesStore } from "@/lib/blobs";
import type { Episode } from "@/data/episodes";

export async function GET() {
  try {
    const store = getEpisodesStore();
    const { blobs } = await store.list();
    const episodes: Episode[] = [];
    for (const blob of blobs) {
      const data = await store.get(blob.key, { type: "json" });
      if (data) episodes.push(data as Episode);
    }
    return NextResponse.json(episodes);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const store = getEpisodesStore();
    const body = await request.json();

    const id = body.id || Date.now().toString();
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const episode: Episode = {
      id,
      slug,
      title: body.title,
      description: body.description || "",
      summary: body.summary || "",
      category: body.category || "Dating",
      topic: body.topic || "",
      date: body.date || new Date().toISOString().split("T")[0],
      duration: body.duration || "30 min",
      thumbnail: body.thumbnail || "/images/ep-default.jpg",
      audioUrl: body.audioUrl || "",
      videoUrl: body.videoUrl || undefined,
      isPremium: body.isPremium || false,
      popularity: body.popularity || 50,
      highlights: body.highlights || [],
      transcript: body.transcript || "",
      tags: body.tags || [],
    };

    await store.setJSON(slug, episode);
    return NextResponse.json(episode, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create episode" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await request.json();
    const store = getEpisodesStore();
    await store.delete(slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete episode" },
      { status: 500 }
    );
  }
}
