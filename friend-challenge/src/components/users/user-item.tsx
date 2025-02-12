import { ReactNode } from "react";
import { User } from "../contexts/user";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tooltip } from "../ui/tooltip";

type UserItemProps = {
  user: User;
  children: ReactNode;
  showDetails?: boolean;
  contentClassName?: string;
  buttonClassName?: string;
};

export const UserItem = ({
  user,
  children,
  showDetails = true,
  contentClassName,
  buttonClassName,
}: UserItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 border border-gray-800 p-4 rounded-lg",
        contentClassName
      )}
    >
      <figure>
        <Tooltip title={user.name}>
          <Image
            className="rounded-full outline outline-1 outline-red-400 size-[50px] min-w-[50px] object-cover"
            src={user.image}
            alt="Picture of the author"
            width={50}
            height={50}
          />
        </Tooltip>
      </figure>

      {showDetails && (
        <div className="flex flex-col">
          <h3 className="font-bold">{user.name}</h3>
          <small>{user.email}</small>
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 justify-end gap-2",
          "[&>*]:bg-gray-800 [&>*]:rounded-full [&>*]:p-2 [&>span]:px-4",
          "hover:[&>button]:text-red-400 [&>button]:transition-colors",
          buttonClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
