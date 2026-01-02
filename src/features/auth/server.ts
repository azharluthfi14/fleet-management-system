"use server";

import { cookies } from "next/headers";

import { env } from "@/config/env";

import { DrizzleAuthRepository } from "./auth-repository";
import { AuthService } from "./auth-service";

const authService = new AuthService({
  repo: new DrizzleAuthRepository(),
  sessionTTLms: env.SESSION_TTL_HOURS,
});

export async function getAuthUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  if (!sessionId) return null;

  return authService.resolveSession(sessionId);
}
