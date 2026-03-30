import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_VIDEO_YOUTUBE_ID = "l8uRksAY6tI";

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-20 md:py-28">
      <div className="container-narrow text-center">
        <h1 className="heading-display text-foreground mb-6">
          Evidence Analysis<br />
          <span className="text-muted-foreground">Grounded in Primary Sources</span>
        </h1>

        <p className="prose-legal text-lg md:text-xl mx-auto mb-6 max-w-2xl">
          A disciplined workspace for legal professionals, expert witnesses, and investigators
          who work with large document sets. No AI. No automation.
          Just transparent reasoning from assertion to source.
        </p>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl">
          Designed for early case assessment, expert review, and evidence-driven reporting—before positions harden and costs escalate.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="cta" size="xl" asChild>
            <Link to="/download">
              <Download className="w-4 h-4" />
              Download Free Trial
            </Link>
          </Button>
          <Button variant="subtle" size="xl" onClick={() => setVideoOpen(true)}>
            <Play className="w-4 h-4" />
            Watch the Demo
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Windows &amp; macOS · No account required
        </p>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="pr-8">Corpus Review Demo</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {videoOpen && (
              <iframe
                src={`https://www.youtube.com/embed/${HERO_VIDEO_YOUTUBE_ID}?autoplay=1`}
                title="Corpus Review Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
          <div className="p-4 pt-2 flex justify-end">
            <a
              href={`https://www.youtube.com/watch?v=${HERO_VIDEO_YOUTUBE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
