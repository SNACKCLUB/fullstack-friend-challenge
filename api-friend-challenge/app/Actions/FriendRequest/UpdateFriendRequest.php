<?php

namespace App\Actions\FriendRequest;

use App\Models\FriendRequest;
use App\Traits\HttpResponses;
use Illuminate\Http\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

final class UpdateFriendRequest
{
    static function handle(FriendRequest $friendRequest, array $data): FriendRequest
    {
        if (!$friendRequest->isRequestedUser()) {
            throw new HttpResponseException(HttpResponses::responseWithError(Response::HTTP_FORBIDDEN, message: 'Access denied'));
        }

        $friendRequest->update($data);

        return $friendRequest;
    }
}
