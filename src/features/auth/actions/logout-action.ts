"use server";

import { cookies } from "next/headers";

import { env } from "@/config/env";

import { DrizzleAuthRepository } from "../auth-repository";
import { AuthService } from "../auth-service";

const authService = new AuthService({
  repo: new DrizzleAuthRepository(),
  sessionTTLms: env.SESSION_TTL_HOURS,
});

export async function logoutAction() {
  const sessionId = (await cookies()).get("session_id")?.value;

  if (sessionId) {
    await authService.logout(sessionId);
  }

  (await cookies()).delete("session_id");
}
