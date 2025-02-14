<?php

use App\Enums\FriendRequestStatus;
use App\Models\FriendRequest;
use App\Models\User;

it('should create a friend request for an authenticated user', function () {
    $user = User::factory()->create();
    $requestedUser = User::factory()->create();

    $response = $this->actingAs($user)->postJson(route("friend-request.store"), [
        'requested_user_id' => $requestedUser->id
    ]);

    $response->assertCreated()->assertJson(["data" => ["status" => FriendRequestStatus::PENDING]]);
});

it("shouldn't create a friend request for an unauthenticated user", function () {
    $requestedUser = User::factory()->create();

    $response = $this->postJson(route("friend-request.store"), [
        'requested_user_id' => $requestedUser->id
    ]);

    $response->assertUnauthorized()->assertJson(["message" => "Unauthenticated."]);
});

it('should update a friend request only for requested user', function () {
    $user = User::factory()->create();
    $userRequested = User::factory()->create();

    $friendRequest = FriendRequest::factory()->create([
        'user_id' => $userRequested->id,
        'requested_user_id' => $user->id
    ]);

    $response = $this->actingAs($user)->put(route("friend-request.update", $friendRequest->id), [
        'status' => FriendRequestStatus::ACCEPTED
    ]);

    $response->assertOk()->assertJson(["data" => ["status" => FriendRequestStatus::ACCEPTED]]);
});

it("shouldn't update a friend request for a different requested user", function () {
    $user = User::factory()->create();
    $userRequested = User::factory()->create();
    $anotherUser = User::factory()->create();

    $friendRequest = FriendRequest::factory()->create([
        'user_id' => $userRequested->id,
        'requested_user_id' => $user->id
    ]);

    $response = $this->actingAs($anotherUser)->put(route("friend-request.update", $friendRequest->id), [
        'status' => FriendRequestStatus::ACCEPTED
    ]);

    $response->assertForbidden()->assertJson(["message" => "Access denied"]);
});
