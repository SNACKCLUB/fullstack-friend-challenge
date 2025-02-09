<?php

namespace App\Actions\FriedRequest;

use App\Models\FriendRequest;

final class CreateFriendRequest
{
    static function handle(array $data): FriendRequest
    {
        return FriendRequest::create($data);
    }
}
