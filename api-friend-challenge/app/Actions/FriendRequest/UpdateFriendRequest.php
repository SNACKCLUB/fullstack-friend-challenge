<?php

namespace App\Actions\FriedRequest;

use App\Models\FriendRequest;

final class UpdateFriendRequest
{
    static function handle(FriendRequest $friendRequest, array $data): FriendRequest
    {
        $friendRequest->update($data);

        return $friendRequest;
    }
}
