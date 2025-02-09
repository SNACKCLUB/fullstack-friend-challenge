<?php

namespace App\Http\Controllers;

use App\Actions\FriedRequest\CreateFriendRequest;
use App\Actions\FriedRequest\UpdateFriendRequest;
use App\Http\Requests\StoreFriendRequestRequest;
use App\Http\Requests\UpdateFriendRequestRequest;
use App\Http\Resources\FriendRequestResource;
use App\Models\FriendRequest;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class FriendRequestController
{
    use HttpResponses;

    public function index(): JsonResponse
    {
        return $this->response(Response::HTTP_OK, FriendRequestResource::collection(FriendRequest::get()));
    }

    public function store(StoreFriendRequestRequest $request): JsonResponse
    {
        $data = $request->validated();
        $friendRequest = CreateFriendRequest::handle($data);

        return $this->response(Response::HTTP_CREATED, new FriendRequestResource($friendRequest));
    }

    public function update(UpdateFriendRequestRequest $request, FriendRequest $friendRequest)
    {
        $data = $request->validated();
        $friendRequest = UpdateFriendRequest::handle($friendRequest, $data);

        return $this->response(Response::HTTP_OK, new FriendRequestResource($friendRequest));
    }
}
