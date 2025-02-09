import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col">
      Register Page
      <Link href="/login">Login</Link>
    </div>
  );
}
