'use client';

import { useQuery } from '@apollo/client';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { GET_CURRENT_USER, SEARCH_USERS } from '@/lib/graphql/queries';

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_USERS, {
    variables: {
      input: { query: debouncedQuery },
    },
    skip: !debouncedQuery,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (userLoading) return <div>Loading...</div>;

  const currentUser = userData?.me;
  const searchResults = searchData?.searchUsers || [];

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-lg">
                  {currentUser?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{currentUser?.name}</h2>
              <p className="text-gray-500">{currentUser?.email}</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle>Find Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Command className="rounded-lg border shadow-md">
                <CommandInput
                  placeholder="Search users..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandEmpty>No users found.</CommandEmpty>
                {searchQuery && !searchLoading && (
                  <CommandGroup>
                    {searchResults.map((user: any) => (
                      <CommandItem
                        key={user.id}
                        value={user.email}
                        className="flex items-center justify-between p-2"
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
                        <Button variant="outline" size="sm">Add Friend</Button>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </Command>

              {searchLoading && (
                <div className="p-4 text-center text-sm text-gray-500">
                  Searching...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Friends List */}
          <Card>
            <CardHeader>
              <CardTitle>My Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentUser?.friends?.length === 0 ? (
                  <p className="text-sm text-gray-500">No friends yet. Start by adding some!</p>
                ) : (
                  currentUser?.friends?.map((friend: any) => (
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

          {/* Friend Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Friend Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentUser?.receivedFriendRequests?.length === 0 ? (
                  <p className="text-sm text-gray-500">No pending friend requests</p>
                ) : (
                  currentUser?.receivedFriendRequests
                    ?.filter((request: any) => request.status === 'pending')
                    .map((request: any) => (
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
                            <Button variant="default">Accept</Button>
                            <Button variant="outline">Decline</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
