import { FriendshipStatus } from '@prisma/client';

export const mockFriendship = {
  id: '1',
  senderId: '1',
  receiverId: '2',
  status: FriendshipStatus.PENDING,
  createdAt: new Date(),
  updatedAt: new Date(),
  sender: {
    id: '1',
    email: 'sender@example.com',
    name: 'Sender User',
  },
  receiver: {
    id: '2',
    email: 'receiver@example.com',
    name: 'Receiver User',
  },
};

export const mockCreateFriendshipInput = {
  receiverId: '2',
};

export const mockUpdateFriendshipInput = {
  status: FriendshipStatus.ACCEPTED,
};