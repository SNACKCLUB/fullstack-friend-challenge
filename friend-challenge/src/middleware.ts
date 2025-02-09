import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPages = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isAuth = false;
  const { pathname } = request.nextUrl;

  if (publicPages.includes(pathname) && !isAuth) {
    return NextResponse.next();
  }

  if (publicPages.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuth) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
