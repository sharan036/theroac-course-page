import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ROLE_PATHS: Record<string, string[]> = {
  "/dashboard/candidate": ["candidate"],
  "/dashboard/recruiter": ["recruiter", "admin"],
  "/dashboard/admin": ["admin"],
};

const ROLE_HOME: Record<string, string> = {
  candidate: "/dashboard/candidate",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
};

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    return payload as {
      id?: string;
      role?: string;
      email?: string;
    };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;
  if (
    pathname === "/auth/login" ||
    pathname === "/auth/signup"
  ) {
    if (!token) {
      return NextResponse.next();
    }
    const payload = await verifyToken(token);

    if (!payload?.role) {
      const response = NextResponse.next();
      response.cookies.delete("auth_token");
      return response;
    }
    return NextResponse.redirect(
      new URL(
        ROLE_HOME[payload.role] || "/dashboard",
        req.url
      )
    );
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }

    const payload = await verifyToken(token);
    if (!payload?.role) {
      const response = NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
      response.cookies.delete("auth_token");
      return response;
    }

    const role = payload.role;
    const matchedRoute = Object.entries(
      ROLE_PATHS
    ).find(([route]) => pathname.startsWith(route));

    if (matchedRoute) {
      const [, allowedRoles] = matchedRoute;
      if (!allowedRoles.includes(role)) {
        return NextResponse.redirect(
          new URL(
            ROLE_HOME[role] || "/dashboard",
            req.url
          )
        );
      }
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};