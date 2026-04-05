import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/structuredData";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={organizationSchema} />
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container-narrow">
            <div className="max-w-xl">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-8">
                About Digital Extensions
              </h1>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Digital Extensions builds software for professionals who work
                  with complex document sets. Our focus is on tools that support
                  structured reasoning, traceability, and disciplined
                  organization of evidence.
                </p>

                <p>
                  We believe professional judgment should be supported by
                  software, not replaced by it. The tools we build preserve a
                  clear chain from conclusions to source material, so that the
                  reasoning behind every assertion remains transparent and
                  defensible.
                </p>

                <p>
                  Corpus Review is our primary product, designed for legal
                  professionals, expert witnesses, and investigators who need to
                  organize, annotate, and reason over large document corpora with
                  precision.
                </p>

                <p>
                  For inquiries, please{" "}
                  <Link
                    to="/contact"
                    className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
                  >
                    get in touch
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
