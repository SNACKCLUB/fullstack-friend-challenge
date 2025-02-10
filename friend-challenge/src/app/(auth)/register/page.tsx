import RegisterForm from "@/components/forms/registerForm";
import { Logo } from "@/components/images/logo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};

export default function RegisterPage() {
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
      <RegisterForm />
      <div className="flex gap-2 text-sm">
        <span>Already have an account?</span>
        <Link href="/login" className="hover:text-red-400">
          Login
        </Link>
      </div>
    </div>
  );
}
