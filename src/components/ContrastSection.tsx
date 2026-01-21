import { Check, X } from "lucide-react";

const ContrastSection = () => {
  const isItems = [
    "A workspace for organizing and annotating documents",
    "A system for preserving chains of reasoning to sources",
    "A tool for highlights, tags, notes, and chronologies",
    "Software that treats your judgment as irreplaceable"
  ];

  const isNotItems = [
    "An AI or automation platform",
    "A scoring, ranking, or prediction engine",
    "A tool that makes claims on your behalf",
    "Software that prioritizes or filters without your direction"
  ];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container-wide">
        <div className="container-narrow mx-0 mb-12">
          <h2 className="heading-section text-foreground">
            What It Is. What It Is Not.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h3 className="font-serif text-lg font-medium text-foreground mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-foreground" />
              </span>
              Corpus Review is
            </h3>
            <ul className="space-y-4">
              {isItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium text-foreground mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-accent" />
              </span>
              Corpus Review is not
            </h3>
            <ul className="space-y-4">
              {isNotItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContrastSection;
