import { Rights } from "@/components/footer/rights";
import { Logo } from "@/components/images/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appName: string = process.env.APP_NAME as string;

  return (
    <main className="grid grid-cols-[3fr,1fr] h-dvh">
      <div className="grid grid-rows-[1fr,auto] bg-gray-950/50">
        <Logo
          alt={appName}
          size={200}
          containerClassName="flex justify-center items-center"
        />
        <Rights />
      </div>
      <div>
        <aside className="grid grid-rows-[1fr,auto] h-full ">
          {children}
          <Rights />
        </aside>
      </div>
    </main>
  );
}
