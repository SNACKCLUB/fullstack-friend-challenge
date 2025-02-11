"use client";

import { UserProvider } from "@/components/contexts/user";

export default function DashboardPage() {
  return (
    <UserProvider>
      <div className="flex flex-col gap-10 items-center justify-center"></div>
    </UserProvider>
  );
}
