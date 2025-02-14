<?php

namespace App\Actions\Friend;

use App\Models\Friend;

final class CreateFriend
{
    static function handle(array $data): Friend
    {
        return Friend::create($data);
    }
}
