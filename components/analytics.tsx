/** Softune marketing GA4. Override with NEXT_PUBLIC_GA_ID on staging. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-3XKQHQE2TP";

// Meta Pixel for the Phase 1 Meta Ads traffic campaign (see Events Manager
// under the SoftuneBD business). Override with NEXT_PUBLIC_META_PIXEL_ID on
// staging so test traffic doesn't pollute production ad data.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1093333280052054";

// Production only. Vercel sets VERCEL_ENV on the server; locally it's
// unset. The inline script also checks the hostname, so a preview deploy
// that somehow renders this still sends nothing.
const IS_PROD_DEPLOY = process.env.VERCEL_ENV === "production";
const PROD_HOST = "www.softunebd.com";

function isGaId(id: string) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

function isMetaPixelId(id: string) {
  return /^\d{10,20}$/.test(id);
}

/**
 * Real <script> tags in the first HTML — Google's (and Meta's) installer
 * fetches the page without running Next.js Script hydration, so next/script
 * left the ID only in a preload / __next_s queue and the wizard said "tag
 * wasn't detected". GTM was removed — it was an empty container doing
 * nothing. Meta Pixel was removed too, back when it wasn't set up yet (see
 * app/support/community's own "don't ship what isn't real yet" precedent
 * from this session) — it's back now that a real pixel exists.
 */
export function Analytics() {
  const ga = isGaId(GA_ID) ? GA_ID : null;
  const pixel = IS_PROD_DEPLOY && isMetaPixelId(META_PIXEL_ID) ? META_PIXEL_ID : null;

  return (
    <>
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
      {pixel ? (
        <script
          dangerouslySetInnerHTML={{
            // Only on www.softunebd.com. Before the pixel loads, an ad
            // click's fbclid becomes the _fbc cookie (Meta's format,
            // shared across *.softunebd.com for 90 days) so the server
            // can send it with every CAPI event, signup included.
            __html: `if(location.hostname==='${PROD_HOST}'){try{var c=new URLSearchParams(location.search).get('fbclid');if(c&&!/(?:^|; )_fbc=/.test(document.cookie)){document.cookie='_fbc=fb.1.'+Date.now()+'.'+c+'; domain=.softunebd.com; path=/; max-age=7776000; SameSite=Lax; Secure'}}catch(e){}!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');}`,
          }}
        />
      ) : null}
    </>
  );
}

export function AnalyticsNoscript() {
  const pixel = IS_PROD_DEPLOY && isMetaPixelId(META_PIXEL_ID) ? META_PIXEL_ID : null;
  if (!pixel) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
