"use client";

import { Button, cn, Input } from "@heroui/react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import type { LoginFormState } from "@/features/auth/types";

interface Props {
  action: (
    state: LoginFormState,
    formData: FormData
  ) => Promise<LoginFormState>;
}

export const LoginForm = ({ action }: Props) => {
  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (!state?.error) return;
    toast.error(state.error, { id: "login-error" });
  }, [state?.error]);

  return (
    <form
      noValidate
      autoComplete="off"
      action={formAction}
      key={state?.errors ? "error" : "clean"}
      className="w-full max-w-sm space-y-6"
    >
      <Input
        label="Email address"
        placeholder="example@user.com"
        labelPlacement="outside"
        type="email"
        name="email"
        variant="bordered"
        color="primary"
        radius="sm"
        classNames={{
          label: cn("text-neutral-800"),
          inputWrapper: cn("shadow-none!"),
        }}
        size="lg"
        isInvalid={!!state?.errors?.email}
        errorMessage={state?.errors?.email?.[0]}
      />
      <Input
        label="Password"
        size="lg"
        name="password"
        color="primary"
        radius="sm"
        variant="bordered"
        placeholder="••••••••"
        labelPlacement="outside-top"
        type="password"
        classNames={{
          label: cn("text-neutral-800"),
          inputWrapper: cn("shadow-none!"),
        }}
        isInvalid={!!state?.errors?.password}
        errorMessage={state?.errors?.password?.[0]}
      />
      <Button
        size="lg"
        type="submit"
        isLoading={pending}
        color="primary"
        fullWidth
      >
        Login
      </Button>
    </form>
  );
};
