export const mockAuthUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  password: '$2a$10$somehashedpassword',
  createdAt: new Date(),
  updatedAt: new Date(),
  sentFriendRequests: [],
  receivedFriendRequests: []
};

export const mockLoginInput = {
  email: 'test@example.com',
  password: 'password123',
};

export const mockJwtToken = 'mock.jwt.token';