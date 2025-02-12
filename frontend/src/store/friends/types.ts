type FriendRelationTypes = {
  userId?: string;
  friendId?: string;
  status?: FriendStatusTypes;
};

type FriendStatusTypes = "ACCEPTED" | "PENDING" | "DECLINED";

type FriendStoreTypes = {
  friendships: FriendApiTypes[];
  fetchFriendships: ({ userId, status }: FriendRelationTypes) => Promise<void>;
  removeFriendship: ({
    userId,
    friendId,
  }: FriendRelationTypes) => Promise<void>;
  addFriendship: (friendId: FriendRelationTypes["friendId"]) => Promise<void>;
  updateFriendship: (status: FriendStatusTypes) => Promise<void>;
  updateFriendshipStatus: ({
    friendId,
    status,
  }: FriendRelationTypes) => Promise<void>;
};

type FriendTypes = {
  id: string;
  name: string;
  email: string;
};

type FriendApiTypes = {
  id: string;
  senderId: string;
  receiverId: string;
  status: FriendStatusTypes;
  createdAt: string;
  updatedAt: string;
  friend: FriendTypes;
};

export type {
  FriendRelationTypes,
  FriendStoreTypes,
  FriendTypes,
  FriendStatusTypes,
  FriendApiTypes,
};
