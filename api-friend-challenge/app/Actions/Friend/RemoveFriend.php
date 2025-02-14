<?php

namespace App\Actions\Friend;

use App\Models\Friend;
use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Traits\HttpResponses;
use Illuminate\Http\Response;

final class RemoveFriend
{
    static function handle(int $friend_id): User
    {
        try {
            $user = DB::transaction(function () use ($friend_id) {
                $user = User::findOrFail($friend_id);

                Friend::where(function ($q) use ($friend_id) {
                    $q->where('user_id', $friend_id)->where('friend_id', Auth::id());
                })->orWhere(function ($q) use ($friend_id) {
                    $q->where('user_id', Auth::id())->where('friend_id', $friend_id);
                })->delete();

                FriendRequest::where(function ($q) use ($friend_id) {
                    $q->where('user_id', $friend_id)->where('requested_user_id', Auth::id());
                })->orWhere(function ($q) use ($friend_id) {
                    $q->where('user_id', Auth::id())->where('requested_user_id', $friend_id);
                })->delete();

                return $user;
            });

            return $user;
        } catch (\Throwable $e) {
            throw new HttpResponseException(HttpResponses::responseWithError(Response::HTTP_FORBIDDEN, message: 'Access denied'));
        }
    }
}
