'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { io, Socket } from 'socket.io-client';
import { RESPOND_TO_FRIEND_REQUEST } from '@/lib/graphql/queries';

type WebSocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  setRefetchFunction: (refetch: () => void) => void;
};

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  setRefetchFunction: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [refetchFunction, setRefetchFunction] = useState<(() => void) | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    console.log('Attempting to connect with token:', token);
    const socketInstance = io('http://localhost:3001', {
      auth: {
        token: `Bearer ${token}`
      },
      transports: ['websocket', 'polling'],
      withCredentials: true,
      forceNew: true,
      timeout: 10000,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Socket.IO Connected');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket.IO Disconnected');
    });

    socketInstance.on('connected', (data) => {
      console.log('Connected to notifications:', data);
    });

    socketInstance.on('friendRequest', (data) => {
      console.log('New friend request from:', data.sender.name);
      toast({
        title: 'New Friend Request',
        description: (
          <div className="flex flex-col space-y-2">
            <p className="text-sm">
              <span className="font-semibold">{data.sender.name}</span> wants to be your friend!
            </p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={async () => {
                  console.log('Accepted friend request from:', data);
                  try {
                    const response = await fetch('http://localhost:3001/graphql', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                      },
                      body: JSON.stringify({
                        query: RESPOND_TO_FRIEND_REQUEST.loc?.source.body,
                        variables: {
                          id: data.id,
                          updateFriendshipInput: {
                            status: 'ACCEPTED'
                          }
                        },
                      }),
                    });
                    
                    const result = await response.json();
                    if (result.errors) throw new Error(result.errors[0].message);
                    
                    toast({
                      title: 'Success',
                      description: `You are now friends with ${data.sender.name}!`,
                      duration: 3000,
                    });
                    
                    if (refetchFunction) refetchFunction();
                  } catch (error) {
                    toast({
                      title: 'Error',
                      description: 'Failed to accept friend request. Please try again.',
                      variant: 'destructive',
                      duration: 3000,
                    });
                  }
                }}
                className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('http://localhost:3001/graphql', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                      },
                      body: JSON.stringify({
                        query: RESPOND_TO_FRIEND_REQUEST.loc?.source.body,
                        variables: {
                          id: data.id,
                          updateFriendshipInput: {
                            status: 'REJECTED'
                          }
                        },
                      }),
                    });
                    
                    const result = await response.json();
                    if (result.errors) throw new Error(result.errors[0].message);
                    
                    toast({
                      title: 'Friend Request Declined',
                      description: `You declined ${data.sender.name}'s friend request`,
                      duration: 3000,
                    });
                    
                    if (refetchFunction) refetchFunction();
                  } catch (error) {
                    toast({
                      title: 'Error',
                      description: 'Failed to decline friend request. Please try again.',
                      variant: 'destructive',
                      duration: 3000,
                    });
                  }
                }}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ),
        duration: 10000,
      });
      if (refetchFunction) {
        refetchFunction();
      }
    });

    socketInstance.on('friendRequestAccepted', (data) => {
      console.log('Friend request accepted by:', data.accepter.name);
      toast({
        title: 'Friend Request Accepted',
        description: `${data.accepter.name} accepted your friend request!`,
        duration: 5000,
      });
      if (refetchFunction) {
        refetchFunction();
      }
    });

    socketInstance.on('friendRequestRejected', (data) => {
      console.log('Friend request rejected by:', data.rejecter.name);
      toast({
        title: 'Friend Request Rejected',
        description: `${data.rejecter.name} declined your friend request`,
        duration: 5000,
      });
    });

    // Error handling
    socketInstance.on('connect_error', (error) => {
      console.error('Socket.IO Connection Error:', error);
      console.error('Connection details:', {
        token: token ? 'Token exists' : 'No token',
        url: 'http://localhost:3000',
        error: error.message
      });
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [toast]);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, setRefetchFunction }}>
      {children}
    </WebSocketContext.Provider>
  );
}
