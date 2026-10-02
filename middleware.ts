import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasBnStaticRoute } from "@/lib/seo";

/** Set by components/language-switcher.tsx whenever a visitor picks a
 * language by hand. Only "en" matters here: it's the one value that must
 * stop the Bangla-first redirect below, otherwise clicking "English" in the
 * header would bounce a Bangladesh visitor straight back to Bangla. */
const LANG_COOKIE = "softunebd_lang";

/** Bangladesh by IP (Vercel sets x-vercel-ip-country on every request), or a
 * browser whose FIRST language choice is Bangla — not merely one that lists
 * it somewhere, so an English-primary browser isn't redirected. */
function prefersBangla(request: NextRequest): boolean {
  if (request.headers.get("x-vercel-ip-country") === "BD") return true;
  const primary =
    request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  return primary.startsWith("bn");
}

/** Stamps the request's locale onto a header so app/layout.tsx's root
 * layout (the only layout allowed to render <html>) can set the correct
 * lang attribute — see that file's use of headers().get("x-locale").
 *
 * Also makes Bangla the default for Bangladesh visitors: English top-level
 * pages that have a Bangla twin redirect to it (307, query string kept so
 * ad UTM parameters survive). x-default hreflang still points at English,
 * and crawlers (US IPs, no Bangla Accept-Language) never match
 * prefersBangla, so the English canonicals Google indexes are untouched. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isBn = pathname.startsWith("/bn");

  if (
    !isBn &&
    (request.method === "GET" || request.method === "HEAD") &&
    request.cookies.get(LANG_COOKIE)?.value !== "en" &&
    hasBnStaticRoute(pathname) &&
    prefersBangla(request)
  ) {
    const clean = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const url = request.nextUrl.clone();
    url.pathname = `/bn${clean === "/" ? "" : clean}`;
    return NextResponse.redirect(url, 307);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", isBn ? "bn" : "en");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
