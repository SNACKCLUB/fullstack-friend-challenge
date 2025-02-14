<?php

namespace App\Actions\FriendRequest;

use App\Models\FriendRequest;

final class CreateFriendRequest
{
    static function handle(array $data): FriendRequest
    {
        return FriendRequest::create($data);
    }
}
