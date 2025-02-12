"use client";

import { getUsers } from "@/app/actions/users/getUsers";
import { useEffect, useState } from "react";
import { User } from "../contexts/user";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Handshake, Trash } from "lucide-react";
import { Tooltip } from "../ui/tooltip/tooltip";

type UsersListProps = {
  mode: string;
};

export const UsersList = ({ mode }: UsersListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const users = await getUsers();
      setUsers(users);
      setLoading(false);
    };

    loadUsers();
  }, [setUsers, setLoading]);

  return (
    <div className="flex flex-col gap-4 w-full mt-1">
      {loading && <span className="text-center">Loading...</span>}

      {!loading &&
        users.map((user) => {
          return (
            <div
              key={user.email}
              className="flex items-center gap-4 border border-gray-800 p-4 rounded-lg"
            >
              <figure>
                <Image
                  className="rounded-full outline outline-1 outline-red-400 size-[50px] object-cover"
                  src={user.image}
                  alt="Picture of the author"
                  width={50}
                  height={50}
                />
              </figure>
              <div className="flex flex-col">
                <h3 className="font-bold">{user.name}</h3>
                <small>{user.email}</small>
              </div>
              <div
                className={cn(
                  "flex flex-1 justify-end gap-2 ",
                  "[&>*]:bg-gray-800 [&>*]:rounded-full [&>*]:p-2 [&>span]:px-4",
                  "hover:[&>button]:text-red-400 [&>button]:transition-colors"
                )}
              >
                {mode === "friend" && (
                  <Tooltip title="Remove friend">
                    <button disabled={false}>
                      <Trash size={18} />
                    </button>
                  </Tooltip>
                )}

                {mode === "networking" && (
                  <Tooltip title="Request friend">
                    <button disabled={false}>
                      <Handshake size={18} />
                    </button>
                  </Tooltip>
                )}

                {mode === "friend-request" && (
                  <Tooltip title="Request status">
                    <span className="text-sm">pending</span>
                  </Tooltip>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
