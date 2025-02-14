<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\HttpResponses;
use App\Actions\User\CreateUser;
use App\Actions\User\UpdateUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Redis;

class UserController
{
    use HttpResponses;

    public function index(): JsonResponse
    {
        $users = Redis::get('users');

        if ($users) {
            $users = User::filter()->get();
            Redis::set('users', $users);
        }

        return $this->response(Response::HTTP_OK, UserResource::collection($users));
    }

    public function show(User $user)
    {
        return $this->response(Response::HTTP_OK, new UserResource($user));
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = CreateUser::handle($data);

        return $this->response(Response::HTTP_CREATED, new UserResource($user));
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $data = $request->validated();
        $user = UpdateUser::handle($user, $data);

        return $this->response(Response::HTTP_OK, new UserResource($user));
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return $this->response(Response::HTTP_NO_CONTENT);
    }
}
