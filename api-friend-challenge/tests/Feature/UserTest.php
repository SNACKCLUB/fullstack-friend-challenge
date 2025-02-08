<?php

use App\Models\User;

it("should create a user", function () {
    $user = User::factory()->make();
    $email = "john.doe@example.com";

    $response = $this->actingAs($user)->postJson(route("user.store"), [
        "name" => "John Doe",
        "email" => $email,
        "password" => "password",
    ]);

    $response->assertCreated()->assertJson(["data" => ["email" => $email]]);
});

it("shouldn't create a user with invalid data", function () {
    $user = User::factory()->make();

    $response = $this->actingAs($user)->postJson(route("user.store"), [
        "name" => "John Doe",
        "email" => "invalid-email",
        "password" => "password",
    ]);

    $response->assertUnprocessable()->assertJsonValidationErrors(["email"]);
});

it("should delete a user", function () {
    $user = User::factory()->create();
    $userToDelete = User::factory()->create();

    $response = $this->actingAs($user)->deleteJson(route("user.destroy", $userToDelete->id));

    $response->assertNoContent();
});

it("shouldn't delete a user not found", function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->deleteJson(route("user.destroy", 10));

    $response->assertNotFound();
});

it("should show a user", function () {
    $user = User::factory()->create();
    $userToShow = User::factory()->create();

    $response = $this->actingAs($user)->getJson(route("user.show", $userToShow->id));

    $response->assertOk()->assertJson(["data" => ["id" => $userToShow->id]]);
});

it("should update a user", function () {
    $user = User::factory()->create();
    $userToUpdate = User::factory()->create();

    $name = "John Doe Edited";

    $response = $this->actingAs($user)->putJson(route("user.update", $userToUpdate->id), [
        "name" => $name,
    ]);

    $response->assertOk()->assertJson(["data" => ["name" => $name]]);
});
