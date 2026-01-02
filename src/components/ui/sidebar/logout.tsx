import { LogOut } from "lucide-react";

import { logoutAction } from "@/features/auth/actions/logout-action";

export const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <button className="w-full flex space-x-3 items-center cursor-pointer   text-danger">
        <LogOut className="size-5" />
        <div>Sign out</div>
      </button>
    </form>
  );
};
