import LoginForm from "@/components/forms/loginForm";
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
    <div className="flex flex-col gap-10 items-center justify-center">
      <Logo
        appName={appName}
        alt={appName}
        size={125}
        imageClassName="w-[125px]"
        containerClassName="flex flex-col gap-4 items-center justify-center"
      />
      <LoginForm />
      <div className="flex gap-2 text-sm">
        <span>Don&apos;t have an account?</span>
        <Link href="/register" className="hover:text-red-400">
          Register Now
        </Link>
      </div>
    </div>
  );
}
