<?php

namespace App\Models;

use App\Models\Scopes\OwnerScope;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;
use App\Enums\FriendRequestStatus;
use Illuminate\Database\Eloquent\Builder;

class FriendRequest extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'user_id',
        'requested_user_id',
        'status'
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
