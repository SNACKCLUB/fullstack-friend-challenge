'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '../hooks/use-profile-controller';

interface MyProfileProps {
  currentUser: User | null | undefined;
  onLogout: () => void;
}

export function MyProfile({ currentUser, onLogout }: MyProfileProps) {
  console.log(currentUser);

  return (
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
          <Button 
            variant="destructive"
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
