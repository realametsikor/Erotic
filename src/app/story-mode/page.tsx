import type { Metadata } from "next";
import { stories } from "@/data/stories";
import StoryModeClient from "./StoryModeClient";

export const metadata: Metadata = {
  title: "Story Mode",
  description:
    "Immerse yourself in curated audio journeys. Each story weaves together episodes into a seamless listening experience.",
};

export default function StoryModePage() {
  return <StoryModeClient stories={stories} />;
}
