import { FileText, Highlighter, Link2, Clock, FileCheck } from "lucide-react";

const WorkflowSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "Import your corpus",
      description: "Load documents in any standard format. The original files remain untouched; all annotations exist in a separate layer."
    },
    {
      icon: Highlighter,
      title: "Annotate with precision",
      description: "Highlight passages, attach notes, apply tags. Every annotation records its exact source location—page, paragraph, character offset."
    },
    {
      icon: Link2,
      title: "Build cross-references",
      description: "Link related passages across documents. Trace how evidence in one record connects to evidence in another."
    },
    {
      icon: Clock,
      title: "Construct chronologies",
      description: "Extract dated events and arrange them in sequence. Each entry remains linked to its source document."
    },
    {
      icon: FileCheck,
      title: "Export with provenance",
      description: "Generate reports where every statement can be traced back to a specific location in a specific source document."
    }
  ];

  return (
    <section id="workflow" className="py-16 md:py-24">
      <div className="container-wide">
        <div className="container-narrow mx-0 mb-12">
          <h2 className="heading-section text-foreground mb-4">
            How Professionals Use It
          </h2>
          <p className="prose-legal">
            Corpus Review supports a deliberate, document-grounded workflow. 
            This is how evidence analysis proceeds when transparency is non-negotiable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-secondary flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
