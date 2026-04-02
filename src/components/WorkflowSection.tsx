import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Screenshot sequence configuration.
 *
 * To add real screenshots:
 * 1. Place images in /public/screenshots/ (e.g., volume-1.png, volume-2.png, volume-3.png)
 * 2. Set the `screenshots` array on the relevant pain point with paths like "/screenshots/volume-1.png"
 * 3. Each screenshot entry has: src (image path), label (the annotation text), step (the step number)
 *
 * Pain points without a `screenshots` array will render placeholder slots.
 */

interface Screenshot {
  src: string;
  label: string;
  step: number;
}

interface PainPoint {
  quote: string;
  label: string;
  description: string;
  screenshots?: Screenshot[];
}

const painPoints: PainPoint[] = [
  {
    quote:
      "\u201cI got 4,000 pages of records yesterday and my deposition is in three weeks.\u201d",
    label: "The volume problem.",
    description:
      "Expert witnesses receive massive, disorganized document dumps and have to absorb them under deadline pressure. Every hour spent just orienting to the corpus is an hour not spent on analysis. CR solves this with structured import, tagging, and search across the full corpus from day one.",
  },
  {
    quote:
      "\u201cI know I saw that lab result somewhere \u2014 but I can\u2019t find it now.\u201d",
    label: "The retrieval problem.",
    description:
      "During report writing or deposition prep, experts know they encountered a critical piece of evidence but can\u2019t relocate it. Flipping through PDFs or scrolling through binders is how details get lost. CR\u2019s highlights, annotations, and cross-references make every piece of evidence relocatable.",
  },
  {
    quote:
      "\u201cOpposing counsel asked me to show exactly where in the record I found that \u2014 and I fumbled.\u201d",
    label: "The provenance problem.",
    description:
      "At deposition or trial, the expert\u2019s credibility depends on pointing to the precise source for every claim. Vague citations like \u201cit\u2019s in the hospital records\u201d get torn apart on cross. CR\u2019s page-level source tracking and Bates-aware exports mean every statement maps back to a specific location.",
  },
  {
    quote:
      "\u201cI spent an entire weekend just building the timeline by hand.\u201d",
    label: "The chronology problem.",
    description:
      "Reconstructing what happened and when \u2014 across multiple providers, facilities, and record types \u2014 is grueling manual work. It\u2019s also where errors creep in. CR lets you assign dates to highlighted passages and generates the chronology automatically, with each entry linked to its source.",
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
    quote:
      "\u201cThree months later, the records were supplemented and I had to figure out what changed.\u201d",
    label: "The integrity problem.",
    description:
      "Records get supplemented, corrected, or re-produced. The expert needs to know what\u2019s new, what\u2019s different, and whether prior conclusions still hold. CR detects source file changes and surfaces them so the record\u2019s integrity is never silently assumed.",
  },
];

const ScreenshotLightbox = ({
  screenshots,
  currentIndex,
  onClose,
  onNavigate,
}: {
  screenshots: Screenshot[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) => {
  const screenshot = screenshots[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < screenshots.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] w-fit rounded-lg overflow-hidden shadow-2xl ring-1 ring-black/20"
        style={{
          background: `linear-gradient(to bottom, hsl(0 32% 38%), hsl(0 35% 35%) 30%, hsl(0 35% 35%) 70%, hsl(0 38% 30%))`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <p className="font-serif text-base font-medium tracking-wide text-accent-foreground">
            {screenshot.label}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tracking-widest uppercase text-accent-foreground/50">
              {currentIndex + 1} of {screenshots.length}
            </span>
            <button
              onClick={onClose}
              className="rounded p-1.5 text-accent-foreground/60 hover:text-accent-foreground hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        {/* Image area with nav buttons */}
        <div className="relative flex items-center px-3 pt-3 pb-4">
          {/* Left nav */}
          <div className="flex-none w-10 flex items-center justify-center">
            {hasPrev && (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="rounded-full p-2 text-accent-foreground/40 hover:text-accent-foreground hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </button>
            )}
          </div>

          <img
            src={screenshot.src}
            alt={screenshot.label}
            className="max-w-full h-auto rounded shadow-sm"
          />

          {/* Right nav */}
          <div className="flex-none w-10 flex items-center justify-center">
            {hasNext && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="rounded-full p-2 text-accent-foreground/40 hover:text-accent-foreground hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScreenshotSequence = ({ screenshots }: { screenshots: Screenshot[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.step}
            className="relative group text-left cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            {/* Step number badge */}
            <div className="absolute -top-3 -left-2 z-10 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold shadow-sm">
              {screenshot.step}
            </div>
            {/* Screenshot image */}
            <div className="rounded-lg border border-border overflow-hidden bg-card shadow-sm group-hover:border-foreground/20 transition-colors">
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
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <ScreenshotLightbox
          screenshots={screenshots}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
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
  return (
    <section id="workflow" className="py-16 md:py-24">
      <div className="container-wide">
        <div className="container-narrow mx-0 mb-16">
          <h2 className="heading-section text-foreground mb-4">
            Problems Corpus Review Solves
          </h2>
          <p className="prose-legal">
            These are real problems voiced by medical expert witnesses,
            litigators, and investigators who work with large document sets
            under adversarial conditions.
          </p>
        </div>

        <div className="space-y-20">
          {painPoints.map((point, index) => (
            <div key={index} className="container-narrow mx-0">
              <p className="font-serif text-xl md:text-2xl italic text-foreground mb-3">
                {point.quote}
              </p>
              <h3 className="font-serif text-lg font-medium text-foreground mb-3">
                {point.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                {point.description}
              </p>
              {point.screenshots ? (
                <ScreenshotSequence screenshots={point.screenshots} />
              ) : (
                <ScreenshotPlaceholder />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
