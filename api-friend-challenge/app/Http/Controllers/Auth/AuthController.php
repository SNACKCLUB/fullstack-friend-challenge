<?php

namespace App\Http\Controllers\Auth;

use App\Actions\User\CreateUser;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    use HttpResponses;

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return $this->response(Response::HTTP_UNAUTHORIZED, message: 'Unauthorized');
        }

        $user = $request->user();
        $user->tokens()->delete();

        return $this->responseWithToken(Response::HTTP_OK, $user->createToken('auth_token')->plainTextToken, message: 'Authenticated');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return $this->response(Response::HTTP_OK, message: 'Logged out');
    }

    public function register(StoreUserRequest $request): JsonResponse
    {
        $data = $request->validated();
        CreateUser::handle($data);

        return $this->response(Response::HTTP_CREATED, message: 'User created');
    }

    public function refresh(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return $this->responseWithToken(Response::HTTP_OK, $request->user()->createToken('auth_token')->plainTextToken, message: 'Token refreshed');
    }

    public function forgotPassword(Request $request)
    {
        // TODO:
    }

    public function recover(Request $request)
    {
        // TODO:
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return $this->response(Response::HTTP_OK, new UserResource($user));
    }
}
