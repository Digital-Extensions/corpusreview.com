import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-narrow text-center">
        <h2 className="heading-section text-foreground mb-4">
          Begin with the Evidence
        </h2>
        <p className="prose-legal text-lg mx-auto mb-8 max-w-xl">
          Download Corpus Review and start working with your documents. 
          The free trial is fully functional with no time limit on small corpora.
        </p>
        
        <Button variant="cta" size="xl">
          <Download className="w-4 h-4" />
          Download Free Trial
        </Button>
        
        <p className="text-sm text-muted-foreground mt-6">
          Available for Windows and macOS
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
