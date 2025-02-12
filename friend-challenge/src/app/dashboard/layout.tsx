import { Rights } from "@/components/footer/rights";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-rows-[1fr] h-dvh">
      {children}
      <Rights></Rights>
    </main>
  );
}
