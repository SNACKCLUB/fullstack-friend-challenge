<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use FilterQueryString;

    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $filters = [
        'selection',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'string',
            'updated_at' => 'string',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (User $user) {
            $user->image ??= "https://i.pravatar.cc/300?u=" . Str::random(10);
            $user->email_verified_at ??= now();
            $user->remember_token ??= Str::random(10);
        });
    }

    public function selection($query, $value)
    {
        if ($value === 'networking') {
            return $query->where('id', '<>', Auth::id());
        }

        if ($value === 'friend') {
            return $query->whereHas('friends', function ($q) {
                $q->where('friends.friend_id', Auth::id());
            })->orWhereHas('friendsRequest', function ($q) {
                $q->where('friends.user_id', Auth::id());
            });
        }

        if ($value === 'friend-request') {
            return $query->whereHas('friendRequested', function ($q) {
                $q->where('friend_requests.user_id', Auth::id());
            });
        }

        return $query;
    }

    public function requestStatus(): string
    {
        $friendRequest = FriendRequest::where('user_id', $this->id)->orWhere('requested_user_id', $this->id)->get()->last();
        return $friendRequest ? $friendRequest->status : "";
    }

    public function friendRequests(): HasMany
    {
        return $this->hasMany(FriendRequest::class);
    }

    public function friendRequested(): HasMany
    {
        return $this->hasMany(FriendRequest::class, "requested_user_id");
    }

    public function friends(): HasMany
    {
        return $this->hasMany(Friend::class, "user_id");
    }

    public function friendsRequest(): HasMany
    {
        return $this->hasMany(Friend::class, "friend_id");
    }
}
