import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading-screen";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import LegalCompanyInfo from "@/components/legal-company-info";
import TokenChart from "@/components/token-chart";
import RoadmapSection from "@/components/roadmap-section";
import WhitepaperSection from "@/components/whitepaper-section";
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
      <LegalCompanyInfo />
      <TokenChart />
      <RoadmapSection />
      <WhitepaperSection />
      <Footer />
    </div>
  );
}
