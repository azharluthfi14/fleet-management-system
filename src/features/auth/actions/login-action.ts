"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/config/env";

import { InvalidCredentialsError, UserInactiveError } from "../auth.errors";
import { DrizzleAuthRepository } from "../auth.repository";
import { loginFormSchema } from "../auth.schema";
import { AuthService } from "../auth.service";
import type { LoginFormState } from "../auth.types";

const authService = new AuthService({
  repo: new DrizzleAuthRepository(),
  sessionTTLms: env.SESSION_TTL_HOURS,
});

export async function loginAction(state: LoginFormState, formdData: FormData) {
  const cookieStore = await cookies();
  const raw = Object.fromEntries(formdData.entries());
  const parsed = loginFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const session = await authService.login(parsed.data);
    cookieStore.set("session_id", session.sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: session.expiresAt,
      path: "/",
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return {
        error: "Invalid email address or password",
      };
    }

    if (error instanceof UserInactiveError) {
      return {
        error: "Unactive user",
      };
    }

    throw error;
  }
}
