import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useToast } from '@/hooks/use-toast';
import { useWebSocket } from '@/contexts/websocket-context';
import { GET_CURRENT_USER, SEARCH_USERS, SEND_FRIEND_REQUEST, RESPOND_TO_FRIEND_REQUEST } from '@/lib/graphql/queries';
import { useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SearchUser extends User {}

export interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  status: string;
  createdAt: string;
}

export function useProfileController() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { toast } = useToast();
  const { data: userData, loading: userLoading, refetch: refetchUser, error: userError } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('Error fetching current user:', error);
      if (error.message.includes('Unauthorized')) {
        window.location.href = '/auth';
      }
    },
  });

  useEffect(() => {
    if (userError) {
      console.error('User query error:', userError);
    }
  }, [userError]);

  useEffect(() => {
    console.log('Current user data:', userData);
  }, [userData]);

  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_USERS, {
    variables: { 
      input: { query: debouncedQuery }
    },
    skip: !debouncedQuery,
  });
  
  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    const handleFriendRequest = () => {
      console.log('Friend request received');
      refetchUser();
      toast({
        title: 'New Friend Request',
        description: 'You have received a new friend request!',
      });
    };

    const handleFriendRequestAccepted = () => {
      console.log('Friend request accepted');
      refetchUser();
      toast({
        title: 'Friend Request Accepted',
        description: 'Your friend request has been accepted!',
      });
    };

    const handleFriendRequestRejected = () => {
      console.log('Friend request rejected');
      refetchUser();
      toast({
        title: 'Friend Request Rejected',
        description: 'Your friend request has been rejected.',
      });
    };

    socket.on('friendRequest', handleFriendRequest);
    socket.on('friendRequestAccepted', handleFriendRequestAccepted);
    socket.on('friendRequestRejected', handleFriendRequestRejected);

    return () => {
      socket.off('friendRequest', handleFriendRequest);
      socket.off('friendRequestAccepted', handleFriendRequestAccepted);
      socket.off('friendRequestRejected', handleFriendRequestRejected);
    };
  }, [socket, refetchUser, toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    onCompleted: () => {
      toast({
        title: 'Friend Request Sent',
        description: 'Your friend request has been sent successfully!',
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error('Error sending friend request:', error.message);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        duration: 5000,
      });
    },
    update: (cache) => {
      cache.evict({ fieldName: 'me' });
      cache.gc();
      refetchUser();
    },
  });

  const [respondToFriendRequest] = useMutation(RESPOND_TO_FRIEND_REQUEST, {
    onCompleted: (data) => {
      const status = data.respondToFriendRequest.status;
      toast({
        title: status === 'ACCEPTED' ? 'Friend Request Accepted' : 'Friend Request Declined',
        description: status === 'ACCEPTED' ? 'You are now friends!' : 'The friend request has been declined.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
    update: (cache, { data }) => {
      cache.evict({ fieldName: 'me' });
      cache.gc();
      refetchUser();
    },
  });

  const handleSendFriendRequest = (userId: string) => {
    sendFriendRequest({
      variables: {
        createFriendshipInput: {
          receiverId: userId
        }
      }
    });
  };

  const handleRespondToRequest = (requestId: string, status: 'ACCEPTED' | 'REJECTED') => {
    respondToFriendRequest({ 
      variables: { 
        id: requestId,
        updateFriendshipInput: { status }
      } 
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  };

  const isOwnProfile = (targetUser: SearchUser) => {
    return userData?.me?.id === targetUser.id;
  };

  const isAlreadyFriend = (targetUserId: string) => {
    return userData?.me?.friends?.some((friend: User) => friend.id === targetUserId) ?? false;
  };

  const hasPendingReceivedRequest = (targetUserId: string) => {
    return userData?.me?.receivedFriendRequests?.some(
      (request: FriendRequest) => request.sender.id === targetUserId && request.status === 'pending'
    ) ?? false;
  };

  const hasPendingSentRequest = (targetUserId: string) => {
    return userData?.me?.sentFriendRequests?.some(
      (request: FriendRequest) => request.receiver.id === targetUserId && request.status === 'pending'
    ) ?? false;
  };

  const getFriendButtonText = (targetUser: SearchUser): string => {
    if (isOwnProfile(targetUser)) return 'This is you';
    if (isAlreadyFriend(targetUser.id)) return 'Already Friends';
    if (hasPendingReceivedRequest(targetUser.id)) return 'Request Pending';
    if (hasPendingSentRequest(targetUser.id)) return 'Request Sent';
    return 'Add Friend';
  };

  const shouldDisableAddFriend = (targetUser: SearchUser): boolean => {
    return (
      isOwnProfile(targetUser) ||
      isAlreadyFriend(targetUser.id) ||
      hasPendingReceivedRequest(targetUser.id) ||
      hasPendingSentRequest(targetUser.id)
    );
  };

  return {
    currentUser: userData?.me,
    refetchUser,
    userLoading,
    searchQuery,
    setSearchQuery,
    searchResults: searchData?.searchUsers || [],
    searchLoading,
    handleSendFriendRequest,
    handleRespondToRequest,
    handleLogout,
    shouldDisableAddFriend,
    getFriendButtonText,
  };
}
