import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual, pbkdf2Sync, createHmac } from "crypto";

const SESSION_COOKIE = "priya_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const derived = pbkdf2Sync(password, salt, 210000, 32, "sha256").toString("hex");
  return `pbkdf2_sha256$210000$${salt}$${derived}`;
}

export function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, iterations, salt, expected] = encodedHash.split("$");
  if (algorithm !== "pbkdf2_sha256" || !iterations || !salt || !expected) return false;
  const actual = pbkdf2Sync(password, salt, Number(iterations), 32, "sha256");
  const expectedBuffer = Buffer.from(expected, "hex");
  return expectedBuffer.length === actual.length && timingSafeEqual(expectedBuffer, actual);
}

function getSessionSecret() {
  return process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || "";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export function isAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && getSessionSecret());
}

export async function createAdminSession() {
  if (!getSessionSecret()) throw new Error("SESSION_SECRET is not configured.");
  const issuedAt = Date.now().toString();
  const nonce = randomBytes(16).toString("hex");
  const fingerprint = createHash("sha256").update(`${issuedAt}.${nonce}`).digest("hex");
  const payload = `${issuedAt}.${nonce}.${fingerprint}`;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  if (!isAuthConfigured()) return false;
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (!session) return false;
  const parts = session.split(".");
  if (parts.length !== 4) return false;
  const payload = parts.slice(0, 3).join(".");
  const signature = parts[3];
  const expected = sign(payload);
  const issuedAt = Number(parts[0]);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  const validSignature = signatureBuffer.length === expectedBuffer.length && timingSafeEqual(signatureBuffer, expectedBuffer);
  const fresh = Number.isFinite(issuedAt) && Date.now() - issuedAt < SESSION_MAX_AGE_SECONDS * 1000;
  return validSignature && fresh;
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}
