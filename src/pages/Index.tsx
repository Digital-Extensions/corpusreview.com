import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ToggleSection from "@/components/ToggleSection";
import WorkflowSection from "@/components/WorkflowSection";
import ContrastSection from "@/components/ContrastSection";
import QuickClipsSection from "@/components/QuickClipsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  softwareApplicationSchema,
  webSiteSchema,
} from "@/lib/structuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={webSiteSchema} />
      <Header />
      <main>
        <HeroSection />
        <div className="divider-subtle" />
        <PhilosophySection />
        <div className="divider-subtle" />
        <ToggleSection />
        <WorkflowSection />
        <ContrastSection />
        <QuickClipsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
