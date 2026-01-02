import { loginAction } from "@/features/auth/actions/login-action";

import { LoginForm } from "./components";

export default function LoginPage() {
  return (
    <div className="flex items-center h-full min-h-screen justify-center">
      <LoginForm action={loginAction} />
    </div>
  );
}
