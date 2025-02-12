'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '../hooks/use-profile-controller';

interface MyFriendsProps {
  friends: User[];
}

export function MyFriends({ friends }: MyFriendsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {friends?.length === 0 ? (
            <p className="text-sm text-gray-500">No friends yet. Start by adding some!</p>
          ) : (
            friends?.map((friend) => (
              <Card key={friend.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{friend.name}</h3>
                      <p className="text-sm text-gray-500">{friend.email}</p>
                    </div>
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
