<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    protected $fillable = [
        'consumer_id',
        'seller_id',
        'product_name',
        'total_amount',
        'paid_amount',
        'remaining_amount',
        'status',
        'due_date'
    ];

    /**
     * Get the consumer that owns the credit.
     */
    public function consumer()
    {
        return $this->belongsTo(Consumer::class);
    }

    /**
     * Get the seller that issued the credit.
     */
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    /**
     * Get the payments for the credit.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
