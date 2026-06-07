<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'credit_id',
        'amount',
        'payment_date',
        'payment_method',
        'note',
        'confirmation_id'
    ];

    /**
     * Get the credit that this payment belongs to.
     */
    public function credit()
    {
        return $this->belongsTo(Credit::class);
    }
}
