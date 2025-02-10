import { cn } from "@/lib/utils";

type RightsProps = {
  className?: string;
};

export const Rights = ({ className }: RightsProps) => {
  const appName: string = process.env.APP_NAME as string;
  const year: number = new Date().getFullYear();
  const rights: string = `© ${year} ${appName}. All rights reserved.`;

  return (
    <footer className={cn("text-sm text-center p-2", className)}>
      <small>{rights}</small>
    </footer>
  );
};
