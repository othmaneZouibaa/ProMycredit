<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'phone', 'address', 'avatar'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the consumers managed by this user (if role is seller).
     */
    public function managedConsumers()
    {
        return $this->hasMany(Consumer::class, 'seller_id');
    }

    /**
     * Get the credits issued by this user (if role is seller).
     */
    public function issuedCredits()
    {
        return $this->hasMany(Credit::class, 'seller_id');
    }

    /**
     * Get the consumer profile for this user (if role is consumer).
     */
    public function consumerProfile()
    {
        return $this->hasOne(Consumer::class, 'user_id');
    }

    /**
     * Get the notifications for this user.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
