import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPages = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuth = !!(await cookies()).get("auth.token")?.value;

  if (publicPages.includes(pathname) && !isAuth) {
    return NextResponse.next();
  }

  if (publicPages.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isAuth && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
