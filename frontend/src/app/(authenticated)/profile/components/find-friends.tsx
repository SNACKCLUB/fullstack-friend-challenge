'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchUser, User } from '../hooks/use-profile-controller';

interface FindFriendsProps {
  currentUser: User | null | undefined;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  searchResults: SearchUser[];
  searchLoading: boolean;
  onSendFriendRequest: (userId: string) => void;
  shouldDisableAddFriend: (targetUser: SearchUser) => boolean;
  getFriendButtonText: (targetUser: SearchUser) => string;
}

export function FindFriends({ 
  currentUser,
  searchQuery,
  onSearchQueryChange,
  searchResults,
  searchLoading,
  onSendFriendRequest,
  shouldDisableAddFriend,
  getFriendButtonText,
}: FindFriendsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Friends</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full"
          />
          <div className="rounded-lg border shadow-md divide-y">
            {!searchQuery && (
              <div className="p-4 text-sm text-gray-500 text-center">
                Type to search for users...
              </div>
            )}
            {searchQuery && searchLoading && (
              <div className="p-4 text-sm text-gray-500 text-center">
                Searching...
              </div>
            )}
            {searchQuery && !searchLoading && searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSendFriendRequest(user.id)}
                  disabled={shouldDisableAddFriend(user)}
                >
                  {getFriendButtonText(user)}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
