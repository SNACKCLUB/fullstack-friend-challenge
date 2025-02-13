type UserTypes = {
  id: string;
  name: string;
  email: string;
};

type UserCreateTypes = {
  password: string;
  name: string;
  email: string;
};

type UserStoreTypes = {
  users: UserTypes[];
  term: string;
  setTerm: (term: string) => void;
  fetchUsers: () => Promise<void>;
  createUser: ({ email, name, password }: UserCreateTypes) => Promise<void>;
};

export type { UserTypes, UserStoreTypes, UserCreateTypes };
