type UserTypes = {
  id: string;
  name: string;
  email: string;
};

type UserStoreTypes = {
  users: UserTypes[];
  term: string;
  setTerm: (term: string) => void;
  fetchUsers: () => Promise<void>;
};

export type { UserTypes, UserStoreTypes };
