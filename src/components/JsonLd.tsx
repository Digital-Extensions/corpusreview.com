/**
 * Renders a JSON-LD structured data script tag.
 * Accepts any Schema.org-compatible object and serializes it safely.
 */
interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
