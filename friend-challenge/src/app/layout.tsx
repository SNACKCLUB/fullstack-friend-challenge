import type { Metadata } from "next";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const MontserratMono = Montserrat({
  variable: "--font-Montserrat-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.APP_NAME}`,
    default: `${process.env.APP_NAME}`,
  },
  description:
    "Comprehensive friend system where users can manage friend requests, view their friend list, and receive notifications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${openSans.variable} ${roboto.variable} ${MontserratMono.variable}`,
          "antialiased"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
