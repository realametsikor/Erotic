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

export default function HomePage() {
  return (
    <>
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
