<?php

namespace Database\Seeders;

use App\Models\FriendRequest;
use Illuminate\Database\Seeder;

class FriendRequestSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 friend requests for the first user
        FriendRequest::factory(5)->create([
            'user_id' => 1
        ]);
    }
}
