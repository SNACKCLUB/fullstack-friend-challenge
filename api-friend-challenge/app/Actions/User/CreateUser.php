<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class CreateUser
{
    static function handle(array $data): User
    {
        $data['password'] = Hash::make($data['password']);

        return User::create($data);
    }
}
