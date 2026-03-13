import { NextRequest, NextResponse } from "next/server";
import { getSettingsStore } from "@/lib/blobs";

const SETTINGS_KEY = "site-settings";

export interface SiteSettings {
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

const defaultSettings: SiteSettings = {
  siteName: "Heartcast",
  siteDescription: "Love, Relationships & Intimacy Podcast",
  contactEmail: "",
  socialLinks: {
    instagram: "",
    twitter: "",
    youtube: "",
    tiktok: "",
  },
  podcastLinks: {
    spotify: "",
    applePodcasts: "",
    googlePodcasts: "",
  },
  footerText: "",
  enablePremium: true,
};

export async function GET() {
  try {
    const store = getSettingsStore();
    const data = await store.get(SETTINGS_KEY, { type: "json" });
    return NextResponse.json(data || defaultSettings);
  } catch {
    return NextResponse.json(defaultSettings);
  }
}

export async function POST(request: NextRequest) {
  try {
    const store = getSettingsStore();
    const body = await request.json();

    const settings: SiteSettings = {
      siteName: body.siteName ?? defaultSettings.siteName,
      siteDescription: body.siteDescription ?? defaultSettings.siteDescription,
      contactEmail: body.contactEmail ?? defaultSettings.contactEmail,
      socialLinks: {
        instagram: body.socialLinks?.instagram ?? defaultSettings.socialLinks.instagram,
        twitter: body.socialLinks?.twitter ?? defaultSettings.socialLinks.twitter,
        youtube: body.socialLinks?.youtube ?? defaultSettings.socialLinks.youtube,
        tiktok: body.socialLinks?.tiktok ?? defaultSettings.socialLinks.tiktok,
      },
      podcastLinks: {
        spotify: body.podcastLinks?.spotify ?? defaultSettings.podcastLinks.spotify,
        applePodcasts: body.podcastLinks?.applePodcasts ?? defaultSettings.podcastLinks.applePodcasts,
        googlePodcasts: body.podcastLinks?.googlePodcasts ?? defaultSettings.podcastLinks.googlePodcasts,
      },
      footerText: body.footerText ?? defaultSettings.footerText,
      enablePremium: body.enablePremium ?? defaultSettings.enablePremium,
    };

    await store.setJSON(SETTINGS_KEY, settings);
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
