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
    <main className="grid grid-cols-[1fr] lg:grid-cols-[2fr,2fr] xl:grid-cols-[1fr,3fr] h-dvh">
      {children}
    </main>
  );
}
