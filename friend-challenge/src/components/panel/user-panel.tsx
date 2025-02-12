"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { Bell, Ellipsis, LogOut } from "lucide-react";
import { Tooltip } from "../ui/tooltip";
import { logOut as logOutRequest } from "@/app/actions/auth/logout";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UsersList } from "../users/users-list";
import { Popover } from "../ui/popover";
import { UserNotification } from "../users/user-notification";

type PanelProps = {
  className?: string;
};

export const UserPanel = ({ className }: PanelProps) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      router.replace("/login");
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
            "hover:[&>button]:text-red-400 [&>button]:transition-colors"
          )}
        >
          <UserNotification loading={loading} />

          <Tooltip title="Logout">
            <button onClick={handleLogOut} disabled={loading}>
              {loading ? <Ellipsis size={18} /> : <LogOut size={18} />}
            </button>
          </Tooltip>
        </div>
      </div>
      {/* card */}
      <div>
        <Tabs
          defaultValue="friends"
          className="w-full flex flex-col justify-center items-center"
        >
          <TabsList className="bg-gray-950 w-fit">
            <TabsTrigger
              value="networking"
              className="data-[state=active]:bg-red-400 data-[state=active]:text-gray-200"
            >
              Networking
            </TabsTrigger>
            <TabsTrigger
              value="friends"
              className="data-[state=active]:bg-red-400 data-[state=active]:text-gray-200"
            >
              My friends
            </TabsTrigger>
            <TabsTrigger
              value="friend-requests"
              className="data-[state=active]:bg-red-400 data-[state=active]:text-gray-200"
            >
              My friend requests
            </TabsTrigger>
          </TabsList>
          <TabsContent value="friends" className="w-full">
            <UsersList mode="friend" />
          </TabsContent>
          <TabsContent value="networking" className="w-full">
            <UsersList mode="networking" />
          </TabsContent>
          <TabsContent value="friend-requests" className="w-full">
            <UsersList mode="friend-request" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
