import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Screenshot {
  src: string;
  label: string;
  step: number;
}

const chronologyScreenshots: Screenshot[] = [
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
];

const capabilities = [
  {
    heading: "Full-text search across OCR\u2019d scans",
    description:
      "Every page is indexed with full OCR. Search the entire corpus\u2014including blurry scans and faxed records\u2014and find what Ctrl+F never could.",
  },
  {
    heading: "Source-linked notes and highlights",
    description:
      "Every highlight, note, and report assertion links back to the exact page and passage it came from. When opposing counsel asks where you found it, the answer is one click away.",
  },
  {
    heading: "Chronology built from dated highlights",
    description:
      "Assign dates to highlighted passages as you read. Corpus Review builds the chronology for you\u2014each entry linked to its source, ready for cross-examination.",
  },
  {
    heading: "Air-gapped and local-first",
    description:
      "Nothing leaves your machine. No cloud upload, no account required, no PHI exposure. Your client\u2019s medical records stay exactly where they should: on your computer, under your control.",
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

        <div className="relative flex items-center px-3 pt-3 pb-4">
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

const MedicalExpertWitness = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Document Review for Medical Expert Witnesses \u2014 Corpus Review";

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") || "";
    metaDesc?.setAttribute(
      "content",
      "A non-destructive, air-gapped workspace for medical expert witnesses. Build source-linked chronologies, annotate records with full provenance, and produce defensible reports.",
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitle?.getAttribute("content") || "";
    ogTitle?.setAttribute(
      "content",
      "Document Review for Medical Expert Witnesses \u2014 Corpus Review",
    );

    const ogDesc = document.querySelector('meta[property="og:description"]');
    const prevOgDesc = ogDesc?.getAttribute("content") || "";
    ogDesc?.setAttribute(
      "content",
      "A non-destructive, air-gapped workspace for medical expert witnesses. Build source-linked chronologies, annotate records with full provenance, and produce defensible reports.",
    );

    return () => {
      document.title = prevTitle;
      metaDesc?.setAttribute("content", prevDesc);
      ogTitle?.setAttribute("content", prevOgTitle);
      ogDesc?.setAttribute("content", prevOgDesc);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* S1: Hero */}
        <section className="py-20 md:py-28">
          <div className="container-narrow text-center">
            <h1 className="heading-display text-foreground mb-6">
              Your Chronology Will Be Challenged.
              <br />
              <span className="text-muted-foreground">
                Can You Trace Every Entry to Its Source?
              </span>
            </h1>

            <p className="prose-legal text-lg md:text-xl mx-auto mb-10 max-w-2xl">
              Corpus Review is a non-destructive document review workspace for
              medical expert witnesses who need to organise, annotate, and reason
              over thousands of pages of medical records&mdash;with full
              provenance, under deadline, without uploading patient data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="cta" size="xl" asChild>
                <Link to="/download">
                  <Download className="w-4 h-4" />
                  Download Free Trial
                </Link>
              </Button>
              <Button variant="subtle" size="xl" asChild>
                <Link to="/contact">
                  <Mail className="w-4 h-4" />
                  Request a Demonstration
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Windows &amp; macOS &middot; No account required
            </p>
          </div>
        </section>

        <div className="divider-subtle" />

        {/* S2: The pain */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container-narrow">
            <div className="max-w-2xl space-y-6 text-muted-foreground leading-relaxed">
              <p>
                You review three to five cases a month alongside clinical work.
                Each case arrives as hundreds or thousands of pages&mdash;GP
                records, hospital notes, imaging reports, surgical logs,
                correspondence&mdash;often scanned, often disorganised, always
                under deadline.
              </p>

              <p>
                Your current approach works until it doesn&rsquo;t. Ctrl+F fails
                on scanned PDFs. Your Word chronology disconnects from the
                source records. When opposing counsel asks &ldquo;Doctor, can you
                show me exactly where in the records you derived that
                opinion?&rdquo;&mdash;the answer needs to be immediate and
                precise.
              </p>

              <p className="text-foreground font-medium">
                A missed record in a high-value case isn&rsquo;t an
                inconvenience. It&rsquo;s a professional risk.
              </p>
            </div>
          </div>
        </section>

        {/* S3: How CR addresses this */}
        <section className="py-16 md:py-24">
          <div className="container-wide">
            <div className="container-narrow mx-0 mb-12">
              <h2 className="heading-section text-foreground mb-4">
                Defensible Review from First Page to Final Report
              </h2>
              <p className="prose-legal">
                Every capability in Corpus Review exists to reduce the risk of
                working with large document sets under adversarial conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
              {capabilities.map((item, index) => (
                <div key={index}>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-subtle" />

        {/* S4: Chronology in action */}
        <section className="py-16 md:py-24">
          <div className="container-wide">
            <div className="container-narrow mx-0 mb-8">
              <h2 className="heading-section text-foreground mb-4">
                A Chronology Built as You Read
              </h2>
              <p className="prose-legal">
                As you review records, highlight relevant passages and assign
                dates. Corpus Review assembles the chronology
                automatically&mdash;each entry linked to the exact page it came
                from. Click any entry to return to the source.
              </p>
            </div>

            <div className="container-narrow mx-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {chronologyScreenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.step}
                    className="relative group text-left cursor-pointer"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="absolute -top-3 -left-2 z-10 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold shadow-sm">
                      {screenshot.step}
                    </div>
                    <div className="rounded-lg border border-border overflow-hidden bg-card shadow-sm group-hover:border-foreground/20 transition-colors">
                      <img
                        src={screenshot.src}
                        alt={screenshot.label}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground font-medium text-center">
                      {screenshot.label}
                    </p>
                  </button>
                ))}
              </div>

              {selectedIndex !== null && (
                <ScreenshotLightbox
                  screenshots={chronologyScreenshots}
                  currentIndex={selectedIndex}
                  onClose={() => setSelectedIndex(null)}
                  onNavigate={setSelectedIndex}
                />
              )}
            </div>
          </div>
        </section>

        <div className="divider-subtle" />

        {/* S5: Not AI */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container-narrow">
            <div className="max-w-2xl space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Corpus Review uses no artificial intelligence. It does not score,
                rank, summarise, or filter your evidence. It does not upload your
                files. It does not form opinions on your behalf.
              </p>
              <p>
                It provides structure for your reasoning&mdash;highlights, notes,
                chronologies, source-linked reports&mdash;so that the reasoning
                remains yours, and the chain from conclusion to source remains
                intact.
              </p>
            </div>
          </div>
        </section>

        {/* S6: CTA */}
        <section className="py-20 md:py-28">
          <div className="container-narrow text-center">
            <h2 className="heading-section text-foreground mb-4">
              Begin with the Evidence
            </h2>
            <p className="prose-legal text-lg mx-auto mb-8 max-w-xl">
              Download Corpus Review and start working with your documents. The
              free trial is fully functional.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="cta" size="xl" asChild>
                <Link to="/download">
                  <Download className="w-4 h-4" />
                  Download Free Trial
                </Link>
              </Button>
              <Button variant="subtle" size="xl" asChild>
                <Link to="/contact">
                  <Mail className="w-4 h-4" />
                  Request a Demonstration
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Available for Windows and macOS
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MedicalExpertWitness;
