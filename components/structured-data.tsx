/** Renders one schema.org JSON-LD block. Server-safe (no "use client") —
 * this only ever needs to exist in the initial HTML for crawlers/LLMs to
 * read, never needs to react to anything client-side. */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON.stringify of our
      // own typed object, never user input; this is the standard way to
      // emit JSON-LD in Next.js (no safe alternative API exists).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
