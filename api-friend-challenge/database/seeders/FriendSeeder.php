<?php

namespace Database\Seeders;

use App\Enums\FriendRequestStatus;
use App\Models\Friend;
use App\Models\FriendRequest;
use Illuminate\Database\Seeder;

class FriendSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 friend accepted requests for the first user
        $friendRequests = FriendRequest::factory(5)->create([
            'user_id' => 1,
            'status' => FriendRequestStatus::ACCEPTED
        ]);

        foreach ($friendRequests as $friendRequest) {
            Friend::factory()->create([
                'user_id' => 1,
                'friend_id' => $friendRequest->requested_user_id,
                'friend_request_id' => $friendRequest->id
            ]);
        }

        // Create A friend pending requests for the second user
        $friendRequests = FriendRequest::factory(1)->create([
            'requested_user_id' => 1,
            'user_id' => 2,
            'status' => FriendRequestStatus::PENDING
        ]);


        // Create A friend pending requests for the third user
        $friendRequests = FriendRequest::factory(1)->create([
            'requested_user_id' => 1,
            'user_id' => 3,
            'status' => FriendRequestStatus::PENDING
        ]);
    }
}
