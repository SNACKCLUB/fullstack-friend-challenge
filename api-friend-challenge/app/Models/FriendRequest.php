<?php

namespace App\Models;

use App\Models\Scopes\OwnerScope;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

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
            'created_at' => 'string',
            'updated_at' => 'string'
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new OwnerScope);

        static::creating(function (FriendRequest $friendRequest) {
            $friendRequest->user_id ??= Auth::id();
        });
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
