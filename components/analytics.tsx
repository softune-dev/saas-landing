/** Softune marketing GTM. Override with NEXT_PUBLIC_GTM_ID on staging. */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-PP7J8GF2";
/** Softune marketing GA4. Override with NEXT_PUBLIC_GA_ID on staging. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-3XKQHQE2TP";

function isGtmId(id: string) {
  return /^GTM-[A-Z0-9]+$/i.test(id);
}

function isGaId(id: string) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

/**
 * Real <script> tags in the first HTML — Google's installer fetches the
 * page without running Next.js Script hydration, so next/script left the
 * IDs only in a preload / __next_s queue and the wizard said "tag wasn't
 * detected".
 */
export function Analytics() {
  const gtm = isGtmId(GTM_ID) ? GTM_ID : null;
  const ga = isGaId(GA_ID) ? GA_ID : null;
  if (!gtm && !ga) return null;

  return (
    <>
      {gtm ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`,
          }}
        />
      ) : null}
      {ga ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
            }}
          />
        </>
      ) : null}
    </>
  );
}

export function AnalyticsNoscript() {
  const gtm = isGtmId(GTM_ID) ? GTM_ID : null;
  if (!gtm) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
