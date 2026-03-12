import HeroSection from "@/components/home/HeroSection";
import LatestEpisodes from "@/components/home/LatestEpisodes";
import TrendingEpisodes from "@/components/home/TrendingEpisodes";
import RelationshipAdvice from "@/components/home/RelationshipAdvice";
import SexEdGuides from "@/components/home/SexEdGuides";
import ViralQuizzes from "@/components/home/ViralQuizzes";
import ConfessionHighlights from "@/components/home/ConfessionHighlights";
import PremiumPromo from "@/components/home/PremiumPromo";
import Newsletter from "@/components/home/Newsletter";
import CommunityHighlights from "@/components/home/CommunityHighlights";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Heartcast",
  url: "https://capable-kheer-fd7f34.netlify.app",
  description:
    "Your go-to podcast for honest conversations about love, relationships, intimacy, dating, and emotional intelligence.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://capable-kheer-fd7f34.netlify.app/episodes?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <LatestEpisodes />
      <TrendingEpisodes />
      <RelationshipAdvice />
      <SexEdGuides />
      <ViralQuizzes />
      <ConfessionHighlights />
      <PremiumPromo />
      <Newsletter />
      <CommunityHighlights />
    </>
  );
}
