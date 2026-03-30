import { FileText, Highlighter, Link2, Clock, FileCheck } from "lucide-react";

/**
 * Screenshot sequence configuration.
 *
 * To add real screenshots:
 * 1. Place images in /public/screenshots/ (e.g., highlight-1.png, highlight-2.png, highlight-3.png)
 * 2. Set the `screenshots` array on the relevant step with paths like "/screenshots/highlight-1.png"
 * 3. Each screenshot entry has: src (image path), label (the annotation text), step (the step number)
 *
 * Steps without a `screenshots` array will render as text-only cards (the current style).
 */

interface Screenshot {
  src: string;
  label: string;
  step: number;
}

interface WorkflowStep {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  screenshots?: Screenshot[];
}

const steps: WorkflowStep[] = [
  {
    icon: FileText,
    title: "Import your corpus",
    description:
      "Load documents in any standard format. The original files remain untouched; all annotations exist in a separate layer. If source files change, the system detects and surfaces those changes so the integrity of the record is never assumed.",
  },
  {
    icon: Clock,
    title: "Construct chronologies",
    description:
      "Extract dated events and arrange them in sequence. Each entry remains linked to its source document.",
    screenshots: [
      {
        src: "/screenshots/annotate-1-highlight.png",
        label: "Highlight key text",
        step: 1,
      },
      {
        src: "/screenshots/annotate-2-date.png",
        label: "Assign a date",
        step: 2,
      },
      {
        src: "/screenshots/annotate-3-chronology.png",
        label: "See it in Chronology",
        step: 3,
      },
    ],
  },
  {
    icon: Link2,
    title: "Build cross-references",
    description:
      "Link related passages across documents. Trace how evidence in one record connects to evidence in another.",
  },
  {
    icon: Highlighter,
    title: "Annotate with precision",
    description:
      "Highlight passages, attach notes, apply tags. Every annotation records its exact source location—page, paragraph, character offset.",
  },
  {
    icon: FileCheck,
    title: "Export with provenance",
    description:
      "Generate reports where every statement can be traced back to a specific location in a specific source document. Supporting pages can be bundled as appendices with Bates-aware references, preserving a clear evidentiary chain suitable for external review.",
  },
];

const ScreenshotSequence = ({ screenshots }: { screenshots: Screenshot[] }) => {
  return (
    <div className="mt-6 flex flex-col gap-8">
      {screenshots.map((screenshot) => (
        <div key={screenshot.step} className="relative group">
          {/* Step number badge */}
          <div className="absolute -top-3 -left-2 z-10 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold shadow-sm">
            {screenshot.step}
          </div>
          {/* Screenshot image */}
          <div className="rounded-lg border border-border overflow-hidden bg-card shadow-sm">
            <img
              src={screenshot.src}
              alt={screenshot.label}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {/* Label */}
          <p className="mt-2 text-sm text-muted-foreground font-medium text-center">
            {screenshot.label}
          </p>
        </div>
      ))}
    </div>
  );
};

const ScreenshotPlaceholder = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((step) => (
        <div key={step} className="relative">
          <div className="absolute -top-3 -left-2 z-10 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold shadow-sm">
            {step}
          </div>
          <div className="rounded-lg border border-border border-dashed bg-card/50 aspect-[4/3] flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              Screenshot {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const WorkflowSection = () => {
  // Separate steps that have screenshots from those that don't
  const stepsWithScreenshots = steps.filter(
    (s) => s.screenshots && s.screenshots.length > 0,
  );
  const textOnlySteps = steps.filter(
    (s) => !s.screenshots || s.screenshots.length === 0,
  );

  return (
    <section id="workflow" className="py-16 md:py-24">
      <div className="container-wide">
        <div className="container-narrow mx-0 mb-12">
          <h2 className="heading-section text-foreground mb-4">
            How Professionals Use It
          </h2>
          <p className="italic text-muted-foreground mb-4">
            Used by medical experts, litigators, and investigators who must
            explain—not just assert—how conclusions arise from the record.
          </p>
          <p className="prose-legal">
            Corpus Review supports a deliberate, document-grounded workflow.
            This is how evidence analysis proceeds when transparency is
            non-negotiable.
          </p>
        </div>

        {/* Featured steps with screenshot sequences */}
        {stepsWithScreenshots.map((step, index) => (
          <div key={`featured-${index}`} className="container-narrow mx-0 mb-16">
            <div className="flex items-start gap-4 mb-2">
              <div className="flex-shrink-0 w-10 h-10 rounded bg-secondary flex items-center justify-center">
                <step.icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                  {step.description}
                </p>
              </div>
            </div>
            <ScreenshotSequence screenshots={step.screenshots!} />
          </div>
        ))}

        {/* Remaining text-only steps — grid layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {textOnlySteps.map((step, index) => (
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
