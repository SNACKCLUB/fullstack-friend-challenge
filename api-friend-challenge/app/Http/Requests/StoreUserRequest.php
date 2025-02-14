<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
                "max:50"
            ],
            "email" => [
                "required",
                Rule::unique('users'),
                "email",
                "max:255"
            ],
            "password" => [
                "required",
                "min:6",
                "max:50"
            ],
            "image" => [
                "nullable",
            ]
        ];
    }
}
