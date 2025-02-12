import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      friends {
        id
        name
        email
      }
      receivedFriendRequests {
        id
        sender {
          id
          name
          email
        }
        status
        createdAt
      }
      sentFriendRequests {
        id
        receiver {
          id
          name
          email
        }
        status
        createdAt
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($input: SearchUsersInput!) {
    searchUsers(input: $input) {
      id
      name
      email
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($createFriendshipInput: CreateFriendshipInput!) {
    sendFriendRequest(createFriendshipInput: $createFriendshipInput) {
      id
      sender {
        id
        name
      }
      receiver {
        id
        name
      }
      status
      createdAt
    }
  }
`;

export const RESPOND_TO_FRIEND_REQUEST = gql`
  mutation RespondToFriendRequest($id: String!, $updateFriendshipInput: UpdateFriendshipInput!) {
    respondToFriendRequest(id: $id, updateFriendshipInput: $updateFriendshipInput) {
      id
      status
      sender {
        id
        name
      }
      receiver {
        id
        name
      }
      createdAt
    }
  }
`;
