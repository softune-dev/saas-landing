import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Stamps the request's locale onto a header so app/layout.tsx's root
 * layout (the only layout allowed to render <html>) can set the correct
 * lang attribute — see that file's use of headers().get("x-locale"). */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  const isBn = pathname.startsWith("/bn");

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
