import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-narrow text-center">
        <h1 className="heading-display text-foreground mb-6">
          Evidence Analysis<br />
          <span className="text-muted-foreground">Grounded in Primary Sources</span>
        </h1>
        
        <p className="prose-legal text-lg md:text-xl mx-auto mb-6 max-w-2xl">
          A disciplined workspace for legal professionals, expert witnesses, and investigators
          who work with large document sets. No AI. No automation.
          Just transparent reasoning from assertion to source.
        </p>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl">
          Designed for early case assessment, expert review, and evidence-driven reporting—before positions harden and costs escalate.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="cta" size="xl">
            <Download className="w-4 h-4" />
            Download Free Trial
          </Button>
          <Button variant="subtle" size="xl">
            <BookOpen className="w-4 h-4" />
            Read the Philosophy
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Windows &amp; macOS · No account required
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
