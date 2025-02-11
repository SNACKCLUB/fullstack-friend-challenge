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
