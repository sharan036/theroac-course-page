import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "roac_course_admin";
function secretKey(): Uint8Array | null {
  const secret = process.env.ROAC_ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? new TextEncoder().encode(secret) : null;
}
export function credentialsConfigured(): boolean {
  return Boolean(process.env.ROAC_ADMIN_PASSWORD && secretKey());
}
export function passwordMatches(value: string): boolean {
  const stored = process.env.ROAC_ADMIN_PASSWORD || "";
  if (!stored || value.length > 500) return false;
  const actual = Buffer.from(value, "utf8");
  const wanted = Buffer.from(stored, "utf8");
  return actual.length === wanted.length && timingSafeEqual(actual, wanted);
}
export async function newSession(): Promise<string> {
  const key = secretKey();
  if (!key) throw new Error("Admin session secret is not configured");
  return new SignJWT({ role: "course-admin" }).setProtectedHeader({ alg: "HS256" })
    .setIssuedAt().setExpirationTime("12h").sign(key);
}
export async function isAdmin(): Promise<boolean> {
  const key = secretKey();
  if (!key) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.role === "course-admin";
  } catch { return false; }
}
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const target = new URL(origin);
    const actual = req.headers.get("x-forwarded-host") || req.headers.get("host");
    return target.host === actual && target.protocol === "https:" || (process.env.NODE_ENV !== "production" && target.host === actual && target.protocol === "http:");
  } catch { return false; }
}
