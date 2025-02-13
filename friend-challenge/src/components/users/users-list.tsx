"use client";

import { getUsers } from "@/app/actions/users/getUsers";
import { useCallback, useEffect, useState } from "react";
import { User } from "../contexts/user";
import { UserItem } from "./user-item";
import { UserActions } from "./user-actions";

type UsersListProps = {
  mode: string;
};

export const UsersList = ({ mode }: UsersListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const users = await getUsers(`?selection=${mode}`);
    setUsers(users);
    setLoading(false);
  }, [mode]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="flex flex-col gap-4 w-full mt-1">
      {loading && <span className="text-center">Loading...</span>}

      {!loading &&
        users.map((user) => {
          return (
            <UserItem key={user.email} user={user}>
              <UserActions user={user} mode={mode} />
            </UserItem>
          );
        })}
    </div>
  );
};
