import Script from "next/script";

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

/** Marketing-site tags only. Merchant storefront pixels live in the
 * dashboard Site Settings, not here. `afterInteractive` fires on load
 * (after first paint), not after a click. Set NEXT_PUBLIC_GTM_ID and/or
 * NEXT_PUBLIC_GA_ID in the host env — we do not invent measurement IDs. */
export function Analytics() {
  const gtm = GTM_ID && isGtmId(GTM_ID) ? GTM_ID : null;
  const ga = GA_ID && isGaId(GA_ID) ? GA_ID : null;
  if (!gtm && !ga) return null;

  return (
    <>
      {gtm ? (
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      ) : null}
      {ga ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${ga}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}
    </>
  );
}

export function AnalyticsNoscript() {
  const gtm = GTM_ID && isGtmId(GTM_ID) ? GTM_ID : null;
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
