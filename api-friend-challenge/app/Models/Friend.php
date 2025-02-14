<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Friend extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'user_id',
        'friend_id',
        'friend_request_id'
    ];

    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'friend_id' => 'integer',
            'friend_request_id' => 'integer',
            'created_at' => 'string',
            'updated_at' => 'string'
        ];
    }

    public function scopeMyFriends(Builder $query): void
    {
        $query->where('user_id', Auth::id())->orWhere('friend_id', Auth::id());
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function friend(): BelongsTo
    {
        return $this->belongsTo(User::class, 'friend_id');
    }

    public function friendRequest(): BelongsTo
    {
        return $this->belongsTo(FriendRequest::class);
    }
}
