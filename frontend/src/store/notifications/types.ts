type NotificationTypes = {
  id: string;
  type: string;
  status: string;
  friendshipId: string;
  createdAt: string;
};

type NotificationStoreTypes = {
  notifications: NotificationTypes[];
  count: number;
  clearNotifications: () => void;
  connectUser: (userId: string) => void;
};

export type { NotificationTypes, NotificationStoreTypes };
