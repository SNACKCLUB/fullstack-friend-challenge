import Image from "next/image";
import logoImg from "@/assets/images/logo.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  appName?: string;
  alt: string;
  size: number;
  imageClassName?: string;
  containerClassName?: string;
};

export const Logo = ({
  appName,
  alt,
  size,
  imageClassName,
  containerClassName,
}: LogoProps) => {
  return (
    <div className={containerClassName}>
      <figure>
        <Image
          className={cn("w-[200px] rounded-full", imageClassName)}
          src={logoImg}
          alt={alt}
          width={size}
          height={size}
          priority
        />
      </figure>
      {appName && <small className="font-sm">{appName}</small>}
    </div>
  );
};
