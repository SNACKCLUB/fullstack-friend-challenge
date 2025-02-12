"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { Bell, Ellipsis, LogOut } from "lucide-react";
import { Tooltip } from "../ui/tooltip/tooltip";
import { logOut as logOutRequest } from "@/app/actions/auth/logout";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type PanelProps = {
  className?: string;
};

export const UserPanel = ({ className }: PanelProps) => {
  const [loading, setLoading] = useState<boolean>();
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const router = useRouter();

  if (!user) {
    return <div>Loading user...</div>;
  }

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await logOutRequest();
      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Try again!`,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 min-w-[700px]",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-4 [&>*]:border [&>*]:border-gray-800 [&>*]:p-4 [&>*]:rounded-lg",
        className
      )}
    >
      {/* card */}
      <div>
        {user?.image && (
          <figure>
            <Image
              className="rounded-full outline outline-red-400 size-[100px] object-cover"
              src={user.image}
              alt="Picture of the author"
              width={100}
              height={100}
            />
          </figure>
        )}
        <div className="flex flex-col">
          <h3 className="font-bold">{user.name}</h3>
          <small>{user.email}</small>
        </div>
        <div
          className={cn(
            "flex flex-1 justify-end gap-2 ",
            "[&>*]:bg-gray-800 [&>*]:rounded-full [&>*]:p-2",
            "hover:[&>button]:outline hover:[&>button]:outline-red-400"
          )}
        >
          <Tooltip title="Notifications">
            <button disabled={loading}>
              <Bell size={18} />
            </button>
          </Tooltip>

          <Tooltip title="Logout">
            <button onClick={handleLogOut} disabled={loading}>
              {loading ? <Ellipsis size={18} /> : <LogOut size={18} />}
            </button>
          </Tooltip>
        </div>
      </div>
      {/* card */}
      <div></div>
    </div>
  );
};
