"use client";

import { UserProvider } from "@/components/contexts/user";
import { UserPanel } from "@/components/panel/user-panel";

export default function DashboardPage() {
  return (
    <UserProvider>
      <div className="flex flex-col gap-10 items-center justify-center">
        <UserPanel />
      </div>
    </UserProvider>
  );
}
