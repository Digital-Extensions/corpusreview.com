const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-16 md:py-24 bg-card">
      <div className="container-narrow">
        <h2 className="heading-section text-foreground mb-8">
          Philosophy of Evidence
        </h2>
        
        <div className="prose-legal text-base md:text-lg space-y-6">
          <p>
            Corpus Review is built on a simple premise: in matters of consequence—litigation, 
            expert testimony, regulatory review—conclusions must trace unambiguously to their 
            sources. Every assertion should be inspectable. Every inference should be visible. 
            The tool exists to enforce this discipline, not to replace it.
          </p>
          
          <p>
            We make no claims about completeness. We offer no scoring, no prioritization, 
            no "analysis" beyond what you explicitly create. The software provides structure 
            for your reasoning—highlights, annotations, chronologies, cross-references—but 
            the reasoning remains yours, and the responsibility remains with you.
          </p>
          
          <p className="text-muted-foreground italic">
            This is evidence work as it should be: grounded, traceable, and honest about 
            what the record does and does not contain.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
