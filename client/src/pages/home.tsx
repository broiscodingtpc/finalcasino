import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading-screen";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PresaleSection from "@/components/presale-section";
import RoadmapSection from "@/components/roadmap-section";
import WhitepaperSection from "@/components/whitepaper-section";
import PartnersSection from "@/components/partners-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <Navigation />
      <HeroSection />
      <PresaleSection />
      <RoadmapSection />
      <WhitepaperSection />
      <PartnersSection />
      <Footer />
    </div>
  );
}
