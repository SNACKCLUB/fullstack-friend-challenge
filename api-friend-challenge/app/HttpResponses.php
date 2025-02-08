<?php

namespace App;

use Illuminate\Contracts\Support\MessageBag;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;

trait HttpResponses
{
    public static function response(int $status, array|Model|JsonResource $data = [], string $message = "")
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ], $status);
    }

    public static function responseWithToken(int $status, string $token, array|Model|JsonResource $data = [], string $message = "")
    {
        return response()->json([
            'message' => $message,
            "token" => $token,
            'data' => $data
        ], $status);
    }

    public static function responseWithError(int $status, array|MessageBag $errors = [], array $data = [], string $message = "")
    {
        return response()->json([
            'message' => $message,
            'errors' => $errors,
            'data' => $data
        ], $status);
    }
}
