# To run this project, you need to have Docker and Docker Compose installed on your machine. Then, run the following command:

```bash
cd backend && pnpm docker:build && pnpm docker:up
```

# To run the frontend, you need to have Node.js and pnpm installed on your machine. Then, run the following command:

```bash
cd frontend && pnpm install && pnpm run dev
```

# Credentials:
```
[
        {
            email: "jane@example.com",
            password: "password123",
        },
        {
            email: "john@example.com",
            password: "password123",
        },
        {
            email: "bob@example.com",
            password: "password123",
        }
]
```

# About the project:
- You can sign up using the `signUp` mutation.
- You can login using the `login` mutation.
- You can create a friendship using the `createFriendship` mutation.
- You can update a friendship status using the `updateFriendship` mutation.
- You can delete a friendship using the `deleteFriendship` mutation.
- You can get a list of friends using the `friends` query.
- You can get a list of pending friend requests using the `pendingFriendRequests` query.
- You can get a list of received friend requests using the `receivedFriendRequests` query.
- You can accept a friend request using the `acceptFriendRequest` mutation.
- You can reject a friend request using the `rejectFriendRequest` mutation.
- You can delete a friend using the `deleteFriend` mutation.
- You have a websocket connection, so you can send friend requests and accept/reject them real-time.
- You have cache for some requests.