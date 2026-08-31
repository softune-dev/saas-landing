/** Softune marketing GA4. Override with NEXT_PUBLIC_GA_ID on staging. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-3XKQHQE2TP";

function isGaId(id: string) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

/**
 * Real <script> tags in the first HTML — Google's installer fetches the
 * page without running Next.js Script hydration, so next/script left the
 * ID only in a preload / __next_s queue and the wizard said "tag wasn't
 * detected". GTM and Meta Pixel were both removed — GTM was an empty
 * container doing nothing, and Meta Pixel isn't set up yet (see
 * app/support/community's own "don't ship what isn't real yet" precedent
 * from this session).
 */
export function Analytics() {
  const ga = isGaId(GA_ID) ? GA_ID : null;
  if (!ga) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
        }}
      />
    </>
  );
}

export function AnalyticsNoscript() {
  return null;
}
