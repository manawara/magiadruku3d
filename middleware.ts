import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "./auth"; // Import from the correct file
import {
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  loggedAuth,
  DASHBOARD_REDIRECT,
} from "./routes";

const intlMiddleware = createIntlMiddleware(routing);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLoggedAuth = loggedAuth.includes(nextUrl.pathname);
  const lang = nextUrl.pathname.startsWith("/pl")
    ? "pl"
    : nextUrl.pathname.startsWith("/en")
    ? "en"
    : "pl";

  if (isApiAuthRoute) {
    return NextResponse.redirect(
      new URL(`/${lang}/${DEFAULT_LOGIN_REDIRECT}`, nextUrl)
    );
  }

  if (isAuthRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/${lang}/${DEFAULT_LOGIN_REDIRECT}`, nextUrl)
      );
    }
    return NextResponse.next();
  }

  if (isLoggedIn && isLoggedAuth) {
    return NextResponse.redirect(
      new URL(`/${lang}/${DASHBOARD_REDIRECT}`, nextUrl)
    );
  }

  if (
    (nextUrl.pathname.startsWith("/pl/dashboard") ||
      nextUrl.pathname.startsWith("/en/dashboard")) &&
    !isLoggedAuth
  ) {
    if (!isLoggedIn) {
      // Redirect to /pl if the user is not logged in, regardless of the full path
      return NextResponse.redirect(
        new URL(`/pl${DEFAULT_LOGIN_REDIRECT}`, nextUrl)
      );
    }
  }

  if (!isLoggedIn && isAuthRoute) {
    const callbackUrl = nextUrl.pathname;
    return NextResponse.redirect(
      new URL(
        `${lang}/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        nextUrl
      )
    );
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|.*\\..*|_next).*)", "/", "/(pl|en)/:path*"],
};
