'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FriendRequest } from '../hooks/use-profile-controller';

interface FriendRequestsProps {
  friendRequests: FriendRequest[];
  onRespondToRequest: (requestId: string, status: 'ACCEPTED' | 'REJECTED') => void;
}

export function FriendRequests({ friendRequests, onRespondToRequest }: FriendRequestsProps) {
  const pendingRequests = friendRequests.filter(request => request.status === 'PENDING');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friend Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <p className="text-sm text-gray-500">No pending friend requests</p>
          ) : (
            pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {request.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{request.sender.name}</h3>
                      <p className="text-sm text-gray-500">{request.sender.email}</p>
                      <p className="text-xs text-gray-400">
                        Sent {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="default"
                      onClick={() => onRespondToRequest(request.id, 'ACCEPTED')}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => onRespondToRequest(request.id, 'REJECTED')}
                    >
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
