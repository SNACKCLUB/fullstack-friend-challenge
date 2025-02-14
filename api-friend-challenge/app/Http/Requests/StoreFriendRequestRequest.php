<?php

namespace App\Http\Requests;

use App\Enums\FriendRequestStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFriendRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "requested_user_id" => [
                "required"
            ]
        ];
    }
}
