const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-16 md:py-24 bg-card">
      <div className="container-narrow">
        <h2 className="heading-section text-foreground mb-8">
          Philosophy of Evidence
        </h2>

        <div className="prose-legal text-base md:text-lg space-y-6">
          <p>
            In matters of consequence — litigation, expert testimony, regulatory review — conclusions
            must trace unambiguously to their sources. Every assertion should be inspectable.
            Every inference should be visible. Corpus Review exists to enforce this discipline,
            not to replace it.
          </p>

          <p>
            We make no claims about completeness. We offer no scoring, no prioritisation,
            and no machine-generated analysis. The software provides structure
            for your reasoning — highlights, annotations, chronologies, and source-linking — but
            the reasoning remains yours, and the responsibility remains with you.
          </p>

          <p>
            We call this <strong>pristine knowledge</strong>: an inviolable source of truth. The corpus is
            never altered. Every annotation lives separately from the original. Every assertion
            traces back to its source — intact, stable, and auditable.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6 border-t border-border pt-8">
          <div>
            <p className="font-serif font-medium text-foreground mb-1">Air-gapped.</p>
            <p className="text-sm text-muted-foreground">No network connection required. No data leaves the machine.</p>
          </div>
          <div>
            <p className="font-serif font-medium text-foreground mb-1">Local-first.</p>
            <p className="text-sm text-muted-foreground">Every corpus, every annotation, every report lives on your drive.</p>
          </div>
          <div>
            <p className="font-serif font-medium text-foreground mb-1">Zero cloud exposure.</p>
            <p className="text-sm text-muted-foreground">Zero PHI in third-party systems. Zero compliance anxiety.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
