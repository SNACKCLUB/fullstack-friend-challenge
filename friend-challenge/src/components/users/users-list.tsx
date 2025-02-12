"use client";

import { getUsers } from "@/app/actions/users/getUsers";
import { useEffect, useState } from "react";
import { User } from "../contexts/user";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Handshake, Trash } from "lucide-react";
import { Tooltip } from "../ui/tooltip";
import { UserItem } from "./user-item";

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
            <UserItem key={user.email} user={user}>
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
            </UserItem>
          );
        })}
    </div>
  );
};
