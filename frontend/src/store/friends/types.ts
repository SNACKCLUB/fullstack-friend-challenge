type FriendRelationTypes = {
  userId?: string;
  friendId?: string;
  status?: FriendStatusTypes;
};

type FriendStatusTypes = "ACCEPTED" | "PENDING" | "DECLINED";

type FriendStoreTypes = {
  friends: FriendApiTypes[];
  fetchFriends: ({ userId, status }: FriendRelationTypes) => Promise<void>;
  removeFriend: ({ userId, friendId }: FriendRelationTypes) => Promise<void>;
  addFriend: (friendId: FriendRelationTypes["friendId"]) => Promise<void>;
  updateFriends: (status: FriendStatusTypes) => Promise<void>;
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
