/**
 * JSON-LD structured data definitions for corpusreview.com.
 *
 * References:
 *  - https://schema.org/SoftwareApplication
 *  - https://schema.org/Organization
 *  - https://schema.org/WebSite
 */

export const softwareApplicationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Corpus Review",
  description:
    "A disciplined workspace for legal professionals, expert witnesses, and investigators who work with large document sets. Organize, annotate, and reason over evidence with a clear chain from assertion to source.",
  applicationCategory: "Legal",
  operatingSystem: "Windows 10+, macOS 12+",
  softwareVersion: "1.6.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "14-day free trial",
  },
  downloadUrl: "https://corpusreview.com/download",
  url: "https://corpusreview.com",
  publisher: {
    "@type": "Organization",
    name: "Digital Extensions",
    url: "https://digital-extensions.com",
  },
  featureList: [
    "Source-linked annotations",
    "Chronology building",
    "Full-text search",
    "Document tagging and categorization",
    "Cross-document linking",
    "Non-destructive evidence handling",
  ],
};

export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Extensions",
  url: "https://digital-extensions.com",
  logo: "https://corpusreview.com/favicon-32x32.png",
  sameAs: [],
};

export const webSiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Corpus Review",
  url: "https://corpusreview.com",
  publisher: {
    "@type": "Organization",
    name: "Digital Extensions",
  },
};
