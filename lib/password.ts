import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const buf = scryptSync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  const [hashed, salt] = hash.split(".");
  if (!hashed || !salt) return false;
  const hashedBuf = Buffer.from(hashed, "hex");
  const buf = scryptSync(password, salt, 64);
  return timingSafeEqual(hashedBuf, buf);
}
