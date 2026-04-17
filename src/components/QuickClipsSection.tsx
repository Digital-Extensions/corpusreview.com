import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
}

const videos: Video[] = [
  {
    id: "keeping-track",
    title: "Keeping track of what matters across thousands of pages",
    description:
      "How to maintain focus and organization when evidence is scattered across hundreds of files.",
    youtubeId: "aptzcFaCJKQ",
    duration: "1:00",
  },
  {
    id: "defensible-chronology",
    title: "Building a defensible chronology from scattered documents",
    description:
      "Constructing timelines where every entry links back to its source.",
    youtubeId: "-Df8os_jQsA",
    duration: "1:15",
  },
  {
    id: "messy-medical-records",
    title: "Turning messy medical records into defensible chronologies",
    description:
      "How an expert witness transforms disorganized medical records into a structured, source-linked chronology.",
    youtubeId: "Mdk7ljVklfk",
    duration: "3:00",
  },
];

const VideoCard = ({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (video: Video) => void;
}) => {
  return (
    <button
      onClick={() => onPlay(video)}
      className="block group w-full text-left border border-border rounded-lg p-5 bg-card hover:border-border/80 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
          <Play className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {video.description}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {video.duration}
          </p>
        </div>
      </div>
    </button>
  );
};

const QuickClipsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const youtubeUrl = selectedVideo
    ? `https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`
    : null;

  const embedUrl = selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`
    : null;

  return (
    <section id="quick-clips" className="py-16 md:py-24">
      <div className="container-narrow">
        <div className="mb-10">
          <h2 className="heading-section text-foreground mb-3">Quick Clips</h2>
          <p className="prose-legal text-lg text-muted-foreground max-w-2xl">
            Short, task-focused demonstrations. Each three minutes or less.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={setSelectedVideo}
            />
          ))}
        </div>
      </div>

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
            <a
              href={youtubeUrl!}
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

export default QuickClipsSection;
