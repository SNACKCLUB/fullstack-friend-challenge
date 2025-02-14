<?php

namespace App\Models;

use App\Actions\Friend\CreateFriend;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;
use App\Enums\FriendRequestStatus;
use Illuminate\Database\Eloquent\Builder;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class FriendRequest extends Model
{
    use HasFactory, HasUlids;
    use FilterQueryString;

    protected $fillable = [
        'user_id',
        'requested_user_id',
        'status'
    ];

    protected $filters = [
        'selection',
    ];

    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'requested_user_id' => 'integer',
            'status' => 'string',
            'created_at' => 'string',
            'updated_at' => 'string'
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (FriendRequest $friendRequest) {
            $friendRequest->user_id ??= Auth::id();
            $friendRequest->status ??= FriendRequestStatus::PENDING;
        });

        static::updating(function (FriendRequest $friendRequest) {
            if ($friendRequest->status == FriendRequestStatus::ACCEPTED) {
                CreateFriend::handle([
                    'friend_request_id' => $friendRequest->id,
                    'user_id' => $friendRequest->user_id,
                    'friend_id' => $friendRequest->requested_user_id,
                ]);
            }
        });
    }

    public function selection($query, $value)
    {
        if ($value === 'notification') {
            return $query->with('user')->where('requested_user_id', Auth::id())->where('status', FriendRequestStatus::PENDING);
        }

        return $query;
    }

    public function scopeOwner(Builder $query): void
    {
        $query->where('user_id', Auth::id());
    }

    public function isRequestedUser(): bool
    {
        return $this->requested_user_id == Auth::id();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function requestedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_user_id');
    }
}
