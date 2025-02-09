<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FriendRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user' => new UserResource($this->user),
            'requested_user_id' => $this->requested_user_id,
            'requested_user' => new UserResource($this->requested_user),
            'status' => $this->title,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
