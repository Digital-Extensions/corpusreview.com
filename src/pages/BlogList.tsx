import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

const BlogList = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container-narrow">
            <div className="max-w-xl mb-12">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                Blog
              </h1>
              <p className="prose-legal text-lg">
                Writing on evidence analysis, defensible workflows, and the
                professional standards that expert work demands.
              </p>
            </div>

            <div className="space-y-10">
              {posts.map((post) => (
                <article key={post.meta.slug} className="group">
                  <Link to={`/blog/${post.meta.slug}`} className="block">
                    <time
                      dateTime={post.meta.date}
                      className="text-sm text-muted-foreground"
                    >
                      {new Date(post.meta.date + "T00:00:00").toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h2 className="font-serif text-xl md:text-2xl font-medium text-foreground mt-1 mb-2 group-hover:text-accent transition-colors">
                      {post.meta.title}
                    </h2>
                    <p className="prose-legal">
                      {post.meta.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>

            {posts.length === 0 && (
              <p className="prose-legal">No posts yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
