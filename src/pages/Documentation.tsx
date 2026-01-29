import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Video data structure - includes script and curation specs
interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string | null; // null until video is published
  duration: string;
  script: {
    narration: string;
    curation: string;
  } | null; // null until script is written
}

interface VideoSection {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

// Script content will be populated as scripts are completed
const sections: VideoSection[] = [
  {
    id: "core-challenges",
    title: "Core Review Challenges",
    description:
      "Common problems faced by professionals working with large document sets.",
    videos: [
      {
        id: "keeping-track",
        title: "Keeping track of what matters across thousands of pages",
        description:
          "How to maintain focus and organization when evidence is scattered across hundreds of files.",
        youtubeId: null,
        duration: "1:30",
        script: null, // Script 01 - pending
      },
      {
        id: "defensible-chronology",
        title: "Building a defensible chronology from scattered documents",
        description:
          "Constructing timelines where every entry links back to its source.",
        youtubeId: null,
        duration: "2:00",
        script: null, // Script 02 - pending
      },
      {
        id: "linking-conclusions",
        title: "Linking conclusions back to exact source pages",
        description:
          "Ensuring every assertion in your work product traces to specific evidence.",
        youtubeId: null,
        duration: "1:45",
        script: null, // Script 03 - pending
      },
      {
        id: "refinding-evidence",
        title: "Re-finding critical evidence weeks or months later",
        description:
          "Returning to a case and locating previously identified evidence instantly.",
        youtubeId: null,
        duration: "1:30",
        script: null, // Script 04 - pending
      },
    ],
  },
  {
    id: "structured-review",
    title: "How Corpus Review Supports Structured Review",
    description:
      "Demonstrations of how Corpus Review approaches document organization and analysis.",
    videos: [
      {
        id: "organizing-documents",
        title: "Organizing documents without losing context",
        description:
          "Categorizing and tagging while preserving the relationships between files.",
        youtubeId: null,
        duration: "2:00",
        script: null, // Script 05 - pending
      },
      {
        id: "highlighting-tagging",
        title: "Highlighting and tagging with intent",
        description:
          "Using color-coded highlights and tags to mark evidence systematically.",
        youtubeId: null,
        duration: "1:45",
        script: null, // Script 06 - pending
      },
      {
        id: "linking-notes",
        title: "Linking notes, documents, and excerpts",
        description:
          "Creating connections between your analysis and the underlying evidence.",
        youtubeId: null,
        duration: "2:00",
        script: null, // Script 07 - pending
      },
      {
        id: "side-by-side",
        title: "Viewing Related Material Side-by-Side",
        description:
          "Using document caddies to compare and cross-reference materials.",
        youtubeId: null,
        duration: "1:30",
        script: null, // Script 08 - pending
      },
    ],
  },
  {
    id: "use-cases",
    title: "Example Applications",
    description:
      "Short examples of how different professionals apply Corpus Review to their work.",
    videos: [
      {
        id: "lawyers-chronology",
        title: "Preparing a chronology for pleadings or trial",
        description:
          "Building a timeline from medical records for litigation support.",
        youtubeId: null,
        duration: "2:30",
        script: null, // Script 09 - pending
      },
      {
        id: "experts-tracing",
        title: "Tracing clinical events across records",
        description:
          "Following a patient's treatment history through multiple facilities and providers.",
        youtubeId: null,
        duration: "2:00",
        script: null, // Script 10 - pending
      },
      {
        id: "experts-opinions",
        title: "Linking opinions to primary source material",
        description:
          "Ensuring expert conclusions are grounded in documented evidence.",
        youtubeId: null,
        duration: "1:45",
        script: null, // Script 11 - pending
      },
      {
        id: "evolving-documents",
        title: "Managing evolving document sets",
        description:
          "Handling late-produced documents without disrupting existing analysis.",
        youtubeId: null,
        duration: "1:30",
        script: null, // Script 12 - pending
      },
    ],
  },
  {
    id: "reporting",
    title: "Producing Defensible Work Product",
    description:
      "How Corpus Review supports the creation of traceable, evidence-grounded reports.",
    videos: [
      {
        id: "linked-assertions",
        title: "Writing reports that link every assertion to evidence",
        description:
          "Creating work product where each claim connects directly to its source.",
        youtubeId: null,
        duration: "2:00",
        script: null, // Script 13 - pending
      },
      {
        id: "revisiting-work",
        title: "Revisiting work months later with full context intact",
        description:
          "Returning to a case and understanding your previous analysis immediately.",
        youtubeId: null,
        duration: "1:30",
        script: null, // Script 14 - pending
      },
    ],
  },
];

// Modal component for displaying script and curation specs
const ScriptModal = ({
  video,
  open,
  onOpenChange,
}: {
  video: Video;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">{video.title}</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Duration: {video.duration} • Script Preview
          </p>
        </DialogHeader>

        {video.script ? (
          <Tabs defaultValue="narration" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="narration">Narration Script</TabsTrigger>
              <TabsTrigger value="curation">Corpus Setup</TabsTrigger>
            </TabsList>
            <TabsContent value="narration">
              <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {video.script.narration}
                  </pre>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="curation">
              <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {video.script.curation}
                  </pre>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Script in development</p>
            <p className="text-sm mt-1">
              The narration script and corpus setup for this video are being
              prepared.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const VideoCard = ({ video }: { video: Video }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const hasVideo = video.youtubeId !== null;
  const hasScript = video.script !== null;
  const youtubeUrl = video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : null;

  // If video exists, link to YouTube; otherwise show script modal
  const handleClick = () => {
    if (hasVideo && youtubeUrl) {
      window.open(youtubeUrl, "_blank", "noopener,noreferrer");
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`border border-border rounded-lg p-5 bg-card transition-colors cursor-pointer ${
          hasVideo || hasScript
            ? "hover:border-border/80"
            : "hover:border-border/60"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded flex items-center justify-center transition-colors ${
              hasVideo
                ? "bg-muted group-hover:bg-accent/10"
                : hasScript
                  ? "bg-muted/50"
                  : "bg-muted/30"
            }`}
          >
            {hasVideo ? (
              <Play className="w-4 h-4 text-muted-foreground" />
            ) : (
              <FileText
                className={`w-4 h-4 ${hasScript ? "text-muted-foreground" : "text-muted-foreground/50"}`}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium transition-colors ${
                hasVideo || hasScript
                  ? "text-foreground hover:text-accent"
                  : "text-foreground/70"
              }`}
            >
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {video.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {hasVideo
                ? video.duration
                : hasScript
                  ? "Script ready • Click to preview"
                  : "Coming soon"}
            </p>
          </div>
        </div>
      </div>

      <ScriptModal
        video={video}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Header Section */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-narrow text-center">
            <h1 className="heading-section text-foreground mb-4">
              See how Corpus Review helps professionals master large case
              document sets.
            </h1>
            <p className="prose-legal text-lg text-muted-foreground max-w-2xl mx-auto">
              Short, task-focused demonstrations showing how Corpus Review
              supports evidence-driven review and reporting.
            </p>
          </div>
        </section>

        {/* Video Sections */}
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="py-12 md:py-16 border-b border-border last:border-b-0"
          >
            <div className="container-narrow">
              <div className="mb-8">
                <h2 className="heading-section text-foreground mb-2">
                  {section.title}
                </h2>
                <p className="prose-legal">{section.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {section.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
