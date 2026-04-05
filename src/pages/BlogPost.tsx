import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const { meta, content } = post;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    url: `https://corpusreview.com/blog/${meta.slug}`,
    keywords: meta.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: "Digital Extensions",
    },
    publisher: {
      "@type": "Organization",
      name: "Digital Extensions",
      url: "https://digital-extensions.com",
    },
  };

  // Find previous and next posts for navigation
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.meta.slug === meta.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={articleSchema} />
      <Header />
      <main className="flex-1">
        <article className="py-16 md:py-24">
          <div className="container-narrow">
            <div className="mb-10">
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                &larr; All posts
              </Link>
            </div>

            <header className="mb-12">
              <time
                dateTime={meta.date}
                className="text-sm text-muted-foreground"
              >
                {new Date(meta.date + "T00:00:00").toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mt-2 leading-tight">
                {meta.title}
              </h1>
            </header>

            <div className="prose-blog">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>

            {/* Post navigation */}
            <nav className="mt-16 pt-8 border-t border-border flex justify-between gap-8">
              <div className="flex-1">
                {prevPost && (
                  <Link
                    to={`/blog/${prevPost.meta.slug}`}
                    className="group block"
                  >
                    <span className="text-sm text-muted-foreground">
                      &larr; Previous
                    </span>
                    <span className="block font-serif text-foreground group-hover:text-accent transition-colors mt-1">
                      {prevPost.meta.title}
                    </span>
                  </Link>
                )}
              </div>
              <div className="flex-1 text-right">
                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.meta.slug}`}
                    className="group block"
                  >
                    <span className="text-sm text-muted-foreground">
                      Next &rarr;
                    </span>
                    <span className="block font-serif text-foreground group-hover:text-accent transition-colors mt-1">
                      {nextPost.meta.title}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
