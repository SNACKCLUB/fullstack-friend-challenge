<?php

namespace App\Http\Requests;

use App\Enums\FriendRequestStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFriendRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "status" => [
                "required",
                Rule::in([FriendRequestStatus::ACCEPTED, FriendRequestStatus::DECLINED])
            ],
        ];
    }
}
