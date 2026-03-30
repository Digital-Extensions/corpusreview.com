import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, ExternalLink, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * ANCHOR video configuration.
 *
 * Replace PLACEHOLDER_VIDEO_ID with the actual YouTube ID once the video is published.
 * The hero section will display a placeholder state until a valid ID is provided.
 */
const ANCHOR_VIDEO = {
  id: "anchor",
  title: "3,000 Pages. One Expert. Zero Room for Error.",
  subtitle: "Every Page Matters",
  description:
    "See how Corpus Review takes a disorganized set of medical records and turns them into a defensible, source-linked chronology — from import to final report.",
  youtubeId: null as string | null, // Replace with YouTube ID when ready, e.g., "dQw4w9WgXcQ"
  duration: "2:55",
};

/**
 * Legacy quick clips — the original 3 published videos.
 * Shown in a collapsible secondary section below the main video.
 */
const quickClips = [
  {
    id: "keeping-track",
    title: "Keeping track of what matters across thousands of pages",
    description:
      "How to maintain focus and organization when evidence is scattered across hundreds of files.",
    youtubeId: "aptzcFaCJKQ",
    duration: "0:52",
  },
  {
    id: "defensible-chronology",
    title: "Building a defensible chronology from scattered documents",
    description:
      "Constructing timelines where every entry links back to its source.",
    youtubeId: "-Df8os_jQsA",
    duration: "1:17",
  },
  {
    id: "messy-medical-records",
    title: "Turning Messy Medical Records Into Defensible Chronologies",
    description:
      "How an expert witness transforms disorganized medical records into a structured, source-linked chronology.",
    youtubeId: "Mdk7ljVklfk",
    duration: "3:06",
  },
];

interface VideoInfo {
  id: string;
  title: string;
  youtubeId: string | null;
  description: string;
  duration: string;
}

const Documentation = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoInfo | null>(null);
  const [clipsExpanded, setClipsExpanded] = useState(false);

  const youtubeUrl = selectedVideo?.youtubeId
    ? `https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`
    : null;

  const embedUrl = selectedVideo?.youtubeId
    ? `https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`
    : null;

  const anchorReady = ANCHOR_VIDEO.youtubeId !== null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-narrow text-center">
            <p className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-4">
              {ANCHOR_VIDEO.subtitle}
            </p>
            <h1 className="heading-section text-foreground mb-4">
              {ANCHOR_VIDEO.title}
            </h1>
            <p className="prose-legal text-lg text-muted-foreground max-w-2xl mx-auto">
              {ANCHOR_VIDEO.description}
            </p>
          </div>
        </section>

        {/* Main Video Section */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container-narrow">
            {anchorReady ? (
              /* Live video embed */
              <div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-border shadow-sm">
                  <iframe
                    src={`https://www.youtube.com/embed/${ANCHOR_VIDEO.youtubeId}`}
                    title={ANCHOR_VIDEO.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {ANCHOR_VIDEO.duration}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${ANCHOR_VIDEO.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ) : (
              /* Placeholder state — video not yet published */
              <div className="aspect-video w-full rounded-lg border border-border bg-card flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-muted-foreground ml-1" />
                </div>
                <p className="font-serif text-lg text-foreground mb-1">
                  Coming soon
                </p>
                <p className="text-sm text-muted-foreground max-w-md text-center px-6">
                  A full walkthrough of Corpus Review — from importing 3,200 pages of medical records
                  to producing a defensible, source-linked report.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  {ANCHOR_VIDEO.duration} · Narrated walkthrough
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Clips Section — collapsible */}
        <section className="py-12 md:py-16">
          <div className="container-narrow">
            <button
              onClick={() => setClipsExpanded(!clipsExpanded)}
              className="w-full flex items-center justify-between group mb-6"
            >
              <div className="text-left">
                <h2 className="heading-section text-foreground text-xl">
                  Quick Clips
                </h2>
                <p className="prose-legal text-sm mt-1">
                  Short workflow recordings showing specific features in action.
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                  clipsExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {clipsExpanded && (
              <div className="grid gap-4 md:grid-cols-3">
                {quickClips.map((clip) => (
                  <button
                    key={clip.id}
                    onClick={() => setSelectedVideo(clip)}
                    className="border border-border rounded-lg p-5 bg-card hover:border-border/80 transition-colors text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-9 h-9 rounded bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <Play className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                          {clip.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {clip.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {clip.duration}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Video Modal — for quick clips */}
      <Dialog
        open={selectedVideo !== null}
        onOpenChange={(open) => !open && setSelectedVideo(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="pr-8">{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-2">
            <p className="text-sm text-muted-foreground">
              {selectedVideo?.description}
            </p>
          </div>
          {embedUrl && (
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={selectedVideo?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          <div className="p-4 pt-2 flex justify-end">
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Watch on YouTube
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documentation;
