import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play } from "lucide-react";

// Placeholder for video data - will be populated as videos are created
// Each video links to YouTube, following the "Show Me, Don't Sell Me" principle
interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string | null; // null until video is published
  duration: string;
}

interface VideoSection {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

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
      },
      {
        id: "defensible-chronology",
        title: "Building a defensible chronology from scattered documents",
        description:
          "Constructing timelines where every entry links back to its source.",
        youtubeId: null,
        duration: "2:00",
      },
      {
        id: "linking-conclusions",
        title: "Linking conclusions back to exact source pages",
        description:
          "Ensuring every assertion in your work product traces to specific evidence.",
        youtubeId: null,
        duration: "1:45",
      },
      {
        id: "refinding-evidence",
        title: "Re-finding critical evidence weeks or months later",
        description:
          "Returning to a case and locating previously identified evidence instantly.",
        youtubeId: null,
        duration: "1:30",
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
      },
      {
        id: "highlighting-tagging",
        title: "Highlighting and tagging with intent",
        description:
          "Using color-coded highlights and tags to mark evidence systematically.",
        youtubeId: null,
        duration: "1:45",
      },
      {
        id: "linking-notes",
        title: "Linking notes, documents, and excerpts",
        description:
          "Creating connections between your analysis and the underlying evidence.",
        youtubeId: null,
        duration: "2:00",
      },
      {
        id: "side-by-side",
        title: "Seeing related evidence side-by-side",
        description:
          "Using document caddies to compare and cross-reference materials.",
        youtubeId: null,
        duration: "1:30",
      },
    ],
  },
  {
    id: "use-cases",
    title: "Common Use Cases",
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
      },
      {
        id: "experts-tracing",
        title: "Tracing clinical events across records",
        description:
          "Following a patient's treatment history through multiple facilities and providers.",
        youtubeId: null,
        duration: "2:00",
      },
      {
        id: "experts-opinions",
        title: "Linking opinions to primary source material",
        description:
          "Ensuring expert conclusions are grounded in documented evidence.",
        youtubeId: null,
        duration: "1:45",
      },
      {
        id: "evolving-documents",
        title: "Managing evolving document sets",
        description:
          "Handling late-produced documents without disrupting existing analysis.",
        youtubeId: null,
        duration: "1:30",
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
      },
      {
        id: "revisiting-work",
        title: "Revisiting work months later with full context intact",
        description:
          "Returning to a case and understanding your previous analysis immediately.",
        youtubeId: null,
        duration: "1:30",
      },
    ],
  },
];

const VideoCard = ({ video }: { video: Video }) => {
  const isAvailable = video.youtubeId !== null;
  const youtubeUrl = video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : null;

  return (
    <div className="border border-border rounded-lg p-5 bg-card hover:border-border/80 transition-colors">
      {isAvailable ? (
        <a
          href={youtubeUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
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
        </a>
      ) : (
        <div className="flex items-start gap-4 opacity-50">
          <div className="flex-shrink-0 w-10 h-10 rounded bg-muted flex items-center justify-center">
            <Play className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground">{video.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {video.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
          </div>
        </div>
      )}
    </div>
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
