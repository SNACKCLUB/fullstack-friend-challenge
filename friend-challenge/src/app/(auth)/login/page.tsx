import { Logo } from "@/components/images/logo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function LoginPage() {
  const appName: string = process.env.APP_NAME as string;

  return (
    <div className="flex flex-col items-center justify-center">
      <Logo
        appName={appName}
        alt={appName}
        size={125}
        imageClassName="w-[125px]"
        containerClassName="flex flex-col gap-4 items-center justify-center"
      />
      <Link href="/register">Register</Link>
    </div>
  );
}
