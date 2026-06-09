<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentRequest extends Model
{
    protected $fillable = [
        'credit_id',
        'consumer_id',
        'amount',
        'note',
        'status',
    ];

    /**
     * Get the credit associated with the payment request.
     */
    public function credit(): BelongsTo
    {
        return $this->belongsTo(Credit::class);
    }

    /**
     * Get the consumer associated with the payment request.
     */
    public function consumer(): BelongsTo
    {
        return $this->belongsTo(Consumer::class);
    }
}
