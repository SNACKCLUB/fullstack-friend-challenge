<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => [
                "required",
                "min:3",
                "max:255"
            ],
            "email" => [
                "nullable",
                Rule::unique('users')->ignore($this->user),
                "email",
                "max:255"
            ],
            "password" => [
                "nullable",
                "min:6",
                "max:50"
            ],
            "image" => [
                "nullable",
            ]
        ];
    }
}
