import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import WorkflowSection from "@/components/WorkflowSection";
import ContrastSection from "@/components/ContrastSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="divider-subtle" />
        <PhilosophySection />
        <WorkflowSection />
        <ContrastSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
