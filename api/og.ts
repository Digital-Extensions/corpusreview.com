import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

interface OgMeta {
  title: string;
  description: string;
  image?: string;
  url: string;
}

const routeMeta: Record<string, OgMeta> = {
  "/medical-expert-witness-document-review": {
    title:
      "Document Review for Medical Expert Witnesses \u2014 Corpus Review",
    description:
      "A non-destructive, air-gapped workspace for medical expert witnesses. Build source-linked chronologies, annotate records with full provenance, and produce defensible reports.",
    image: "/og-image-1.png",
    url: "/medical-expert-witness-document-review",
  },
};

function getBaseUrl(req: VercelRequest): string {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "corpusreview.com";
  return `${proto}://${host}`;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.query.path as string) || "/";
  const meta = routeMeta[path];

  if (!meta) {
    return res.status(404).send("Not found");
  }

  const baseUrl = getBaseUrl(req);

  // Read the built index.html
  let html: string;
  try {
    html = readFileSync(join(process.cwd(), "dist", "index.html"), "utf-8");
  } catch {
    // Fallback: try the output directory Vercel uses
    try {
      html = readFileSync(join(process.cwd(), ".vercel", "output", "static", "index.html"), "utf-8");
    } catch {
      return res.status(500).send("Could not read index.html");
    }
  }

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`,
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`,
  );

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${meta.title}" />`,
  );

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${meta.description}" />`,
  );

  // Add og:url after og:type
  html = html.replace(
    /<meta\s+property="og:type"\s+content="website"\s*\/?>/,
    `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${baseUrl}${meta.url}" />`,
  );

  // Add og:image before twitter:card if an image is specified
  if (meta.image) {
    html = html.replace(
      /<meta\s+name="twitter:card"/,
      `<meta property="og:image" content="${baseUrl}${meta.image}" />\n    <meta name="twitter:card"`,
    );
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  return res.status(200).send(html);
}
