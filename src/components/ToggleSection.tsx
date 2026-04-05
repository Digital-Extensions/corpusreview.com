import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ToggleSection = () => {
  return (
    <section id="the-toggle" className="py-16 md:py-24">
      <div className="container-narrow">
        <h2 className="heading-section text-foreground mb-4">The Toggle</h2>

        <p className="prose-legal text-lg md:text-xl mb-4 max-w-prose">
          Every document in Corpus Review exists in two layers.{" "}
          <span className="font-medium text-foreground">Original File</span> is
          the unmodified source — the PDF, the scanned image, the records as
          produced.{" "}
          <span className="font-medium text-foreground">
            Text for Analysis
          </span>{" "}
          is where your work lives: highlights, annotations, tags, and notes.
          The Toggle switches between them instantly.
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose mb-10">
          This separation is the foundation of non-destructive review. Your
          analysis never alters the original record. At any point — during
          report writing, in deposition prep, or on the stand — you can toggle
          back to the source and confirm exactly what the document says. No
          layers to flatten. No changes to undo. The original is always one
          click away.
        </p>

        <Tabs defaultValue="original" className="w-full">
          <TabsList className="mx-auto flex w-fit gap-1">
            <TabsTrigger
              value="original"
              className="px-5 py-2 font-medium text-sm"
            >
              Original File
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="px-5 py-2 font-medium text-sm"
            >
              Text for Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="mt-6">
            <div className="rounded-lg border border-border border-dashed bg-card/50 aspect-video flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                Screenshot: Original File view
              </span>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <div className="rounded-lg border border-border border-dashed bg-card/50 aspect-video flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                Screenshot: Text for Analysis view
              </span>
            </div>
          </TabsContent>
        </Tabs>

        <p className="mt-8 font-serif italic text-muted-foreground text-center max-w-2xl mx-auto">
          A way to find not just text, but your reasoning about that text,
          without ever losing sight of the source.
        </p>
      </div>
    </section>
  );
};

export default ToggleSection;
