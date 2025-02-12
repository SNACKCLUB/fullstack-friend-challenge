'use client';

import { useProfileController } from './hooks/use-profile-controller';
import { FindFriends } from './components/find-friends';
import { MyFriends } from './components/my-friends';
import { FriendRequests } from './components/friend-requests';
import { MyProfile } from './components/my-profile';

export default function ProfilePage() {
  const {
    currentUser,
    userLoading,
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    handleSendFriendRequest,
    handleRespondToRequest,
    handleLogout,
    shouldDisableAddFriend,
    getFriendButtonText,
  } = useProfileController();
  
  if (userLoading) return <div>Loading...</div>;

  
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <MyProfile currentUser={currentUser} onLogout={handleLogout} />

        <div className="md:col-span-2 space-y-6">
          <FindFriends
            currentUser={currentUser}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            searchResults={searchResults}
            searchLoading={searchLoading}
            onSendFriendRequest={handleSendFriendRequest}
            shouldDisableAddFriend={shouldDisableAddFriend}
            getFriendButtonText={getFriendButtonText}
          />

          <MyFriends
            friends={currentUser?.friends || []}
          />

          <FriendRequests
            friendRequests={currentUser?.receivedFriendRequests || []}
            onRespondToRequest={handleRespondToRequest}
          />
        </div>
      </div>
    </div>
  );
}
