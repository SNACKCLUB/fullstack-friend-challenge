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

it("should get users for networking", function () {
    $user = User::factory()->create();
    $users = User::factory(10)->create();

    $response = $this->actingAs($user)->getJson(route("user.index", [
        "selection" => "networking"
    ]));

    $response->assertOk()->assertJsonCount(count($users), 'data');
});

it("should get users for user friends", function () {
    $user = User::factory()->create();
    $users = User::factory(10)->create();

    $response = $this->actingAs($user)->getJson(route("user.index", [
        "selection" => "friend"
    ]));

    $response->assertOk()->assertJsonCount(0, 'data');
});

it("should get users for friend_request", function () {
    $user = User::factory()->create();
    $users = User::factory(10)->create();

    $response = $this->actingAs($user)->getJson(route("user.index", [
        "selection" => "friend-request"
    ]));

    $response->assertOk()->assertJsonCount(0, 'data');
});
