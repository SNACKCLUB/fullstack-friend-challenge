<?php

namespace App\Http\Controllers;

use App\Actions\Friend\RemoveFriend;
use App\Http\Resources\UserResource;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FriendController
{
    use HttpResponses;

    public function index() {}

    public function remove(Request $request)
    {
        $data = $request->only("friend_id");
        $user = RemoveFriend::handle($data["friend_id"]);

        return $this->response(Response::HTTP_CREATED, new UserResource($user));
    }
}
