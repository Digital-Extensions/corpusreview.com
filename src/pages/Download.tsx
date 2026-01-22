import { Button } from "@/components/ui/button";
import {
  Apple,
  Monitor,
  Download as DownloadIcon,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GITHUB_RELEASES_URL =
  "https://github.com/Digital-Extensions/corpus-review-releases/releases";
const LATEST_VERSION = "1.1.8";

const downloads = {
  mac: {
    name: "macOS",
    icon: Apple,
    available: true,
    filename: `Corpus.Review_${LATEST_VERSION}_aarch64.dmg`,
    url: `${GITHUB_RELEASES_URL}/download/v${LATEST_VERSION}/Corpus.Review_${LATEST_VERSION}_aarch64.dmg`,
    requirements: "macOS 12.0 or later (Apple Silicon)",
  },
  windows: {
    name: "Windows",
    icon: Monitor,
    available: false,
    filename: null,
    url: null,
    requirements: "Windows 10 or later (64-bit)",
  },
};

const Download = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <h1 className="heading-section text-foreground mb-4">
                Download Corpus Review
              </h1>
              <p className="prose-legal text-lg text-muted-foreground max-w-xl mx-auto">
                14-day free trial. Fully functional. No account required.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Current version: {LATEST_VERSION}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* macOS */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <downloads.mac.icon className="w-8 h-8 text-foreground" />
                  <div>
                    <h2 className="font-semibold text-foreground">
                      {downloads.mac.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {downloads.mac.requirements}
                    </p>
                  </div>
                </div>
                <Button variant="cta" size="lg" className="w-full" asChild>
                  <a href={downloads.mac.url}>
                    <DownloadIcon className="w-4 h-4" />
                    Download for Mac
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  {downloads.mac.filename}
                </p>
              </div>

              {/* Windows */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <downloads.windows.icon className="w-8 h-8 text-foreground" />
                  <div>
                    <h2 className="font-semibold text-foreground">
                      {downloads.windows.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {downloads.windows.requirements}
                    </p>
                  </div>
                </div>
                <Button variant="subtle" size="lg" className="w-full" disabled>
                  Coming Soon
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Windows release in development
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href={GITHUB_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View all releases on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Download;
