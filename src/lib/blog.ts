/**
 * Blog content loader and frontmatter parser.
 *
 * Uses Vite's import.meta.glob to load markdown files at build time.
 * Parses YAML frontmatter without Node dependencies (browser-safe).
 */

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  description: string;
  keywords: string[];
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

/**
 * Parse YAML-style frontmatter from a markdown string.
 * Handles scalar values, quoted strings, and simple arrays.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, yamlBlock, body] = match;
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of yamlBlock.split("\n")) {
    // Array item (indented "- value")
    const arrayMatch = line.match(/^\s+-\s+(.+)$/);
    if (arrayMatch && currentKey && currentArray) {
      currentArray.push(arrayMatch[1].trim());
      continue;
    }

    // Flush any in-progress array
    if (currentKey && currentArray) {
      data[currentKey] = currentArray;
      currentKey = null;
      currentArray = null;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kvMatch) {
      const [, key, rawValue] = kvMatch;
      const value = rawValue.trim();

      if (value === "" || value === "|") {
        // Start of an array or multiline block
        currentKey = key;
        currentArray = [];
      } else {
        // Strip surrounding quotes
        data[key] = value.replace(/^["']|["']$/g, "");
      }
    }
  }

  // Flush trailing array
  if (currentKey && currentArray) {
    data[currentKey] = currentArray;
  }

  return { data, content: body };
}

/**
 * Load all blog posts from src/content/blog/*.md.
 * Sorted by date descending (newest first).
 */
const markdownModules = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [, raw] of Object.entries(markdownModules)) {
    const { data, content } = parseFrontmatter(raw);

    posts.push({
      meta: {
        title: (data.title as string) ?? "Untitled",
        slug: (data.slug as string) ?? "",
        date: (data.date as string) ?? "",
        description: (data.description as string) ?? "",
        keywords: (data.keywords as string[]) ?? [],
      },
      content,
    });
  }

  // Sort newest first
  posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
  return posts;
}

const allPosts = loadPosts();

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.meta.slug === slug);
}
