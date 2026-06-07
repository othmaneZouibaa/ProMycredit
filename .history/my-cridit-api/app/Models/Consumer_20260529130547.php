<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consumer extends Model
{
    protected $fillable = [
        'seller_id',
        'user_id',
        'name',
        'phone',
        'cin',
        'address',
        'trust_score'
    ];

    /**
     * Get the seller that manages this consumer.
     */
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    /**
     * Get the user account linked to this consumer profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the credits for this consumer.
     */
    public function credits()
    {
        return $this->hasMany(Credit::class);
    }
}
