<?php

use App\Models\User;

use function Pest\Laravel\postJson;

it("should authenticate user", function () {
    $user = User::factory()->create();

    $response = postJson(route("auth.login"), [
        "email" => $user->email,
        "password" => "password",
    ]);

    $response->assertOk()->assertJsonStructure(["message", "token"])->assertJson(["message" => "Authenticated"]);
});

it("shouldn't authenticate user with invalid credentials", function () {
    $user = User::factory()->create();

    $response = postJson(route("auth.login"), [
        "email" => $user->email,
        "password" => "invalid-password",
    ]);

    $response->assertUnauthorized()->assertJson(["message" => "Unauthorized"]);
});

it("should logout user", function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(route("auth.logout"));
    $response->assertOk()->assertJson(["message" => "Logged out"]);
});

it("should register user", function () {
    $response = postJson(route("auth.register"), [
        "name" => "John Doe",
        "email" => "john.doe@example.com",
        "password" => "password",
    ]);

    $response->assertCreated()->assertJson(["message" => "User created"]);
});

it("shouldn't register user with invalid data", function () {
    $response = postJson(route("auth.register"), [
        "name" => "John Doe",
        "email" => "invalid-email",
        "password" => "password",
    ]);

    $response->assertUnprocessable()->assertJsonValidationErrors(["email"]);
});

it("should refresh user token", function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(route("auth.refresh"));
    $response->assertOk()->assertJsonStructure(["message", "token"])->assertJson(["message" => "Token refreshed"]);
});

// TODO: it("should send forgot password email", function () {});

// TODO: it("should recover user password", function () {});

it("should get user authenticated", function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(route("auth.me"));
    $response->assertOk()->assertJson(["data" => ["name" => $user->name, "email" => $user->email]]);
});
