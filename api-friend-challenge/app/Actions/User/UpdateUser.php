<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class UpdateUser
{
    static function handle(User $user, array $data): User
    {
        if (isset($data['password'])) $data['password'] = Hash::make($data['password']);

        $user->update($data);

        return $user;
    }
}
