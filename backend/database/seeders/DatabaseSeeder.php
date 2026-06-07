<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a Seller
        $seller = User::factory()->create([
            'name' => 'Seller Ahmed',
            'email' => 'ahmed@seller.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'seller',
            'phone' => '+212 600 111 222',
            'address' => 'Morocco, Casablanca, Maarif',
        ]);

        // Create a Consumer User
        $consumerUser = User::factory()->create([
            'name' => 'Consumer Ooutmane',
            'email' => 'ooutmane@consumer.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'consumer',
            'phone' => '+212 600 112 233',
            'address' => 'Morocco, Casablanca, Sidi Maarouf',
        ]);

        // Link the Consumer User to a Consumer profile under Ahmed
        $consumerProfile1 = \App\Models\Consumer::create([
            'seller_id' => $seller->id,
            'user_id' => $consumerUser->id,
            'name' => $consumerUser->name,
            'phone' => $consumerUser->phone,
            'cin' => 'BJ998877',
            'address' => $consumerUser->address,
            'trust_score' => 85,
        ]);

        // Create an unlinked Consumer profile under Ahmed (doesn't have a login account yet)
        $consumerProfile2 = \App\Models\Consumer::create([
            'seller_id' => $seller->id,
            'user_id' => null,
            'name' => 'Consumer Rachid',
            'phone' => '+212 600 555 666',
            'cin' => 'BK112233',
            'address' => 'Morocco, Casablanca, Hay Riad',
            'trust_score' => 60,
        ]);

        // Create credits for Ooutmane
        $credit1 = \App\Models\Credit::create([
            'consumer_id' => $consumerProfile1->id,
            'seller_id' => $seller->id,
            'product_name' => 'Grocery Pack',
            'total_amount' => 1500.00,
            'paid_amount' => 500.00,
            'remaining_amount' => 1000.00,
            'status' => 'partial',
            'due_date' => now()->addMonth(),
        ]);

        $credit2 = \App\Models\Credit::create([
            'consumer_id' => $consumerProfile1->id,
            'seller_id' => $seller->id,
            'product_name' => 'Gas Cylinder',
            'total_amount' => 150.00,
            'paid_amount' => 150.00,
            'remaining_amount' => 0.00,
            'status' => 'paid',
            'due_date' => now()->subDays(5),
        ]);

        $credit3 = \App\Models\Credit::create([
            'consumer_id' => $consumerProfile1->id,
            'seller_id' => $seller->id,
            'product_name' => 'Flour & Sugar',
            'total_amount' => 450.00,
            'paid_amount' => 0.00,
            'remaining_amount' => 450.00,
            'status' => 'unpaid',
            'due_date' => now()->addDays(10),
        ]);

        // Create credits for Rachid
        $credit4 = \App\Models\Credit::create([
            'consumer_id' => $consumerProfile2->id,
            'seller_id' => $seller->id,
            'product_name' => 'Rice & Oil',
            'total_amount' => 800.00,
            'paid_amount' => 200.00,
            'remaining_amount' => 600.00,
            'status' => 'partial',
            'due_date' => now()->addDays(15),
        ]);

        // Create payments for Ooutmane
        \App\Models\Payment::create([
            'credit_id' => $credit1->id,
            'amount' => 500.00,
            'payment_date' => now()->subDays(3)->toDateString(),
            'payment_method' => 'Cash',
            'note' => 'First installment',
            'confirmation_id' => 'PAY-OUT-001',
        ]);

        \App\Models\Payment::create([
            'credit_id' => $credit2->id,
            'amount' => 150.00,
            'payment_date' => now()->subDays(5)->toDateString(),
            'payment_method' => 'Cash',
            'note' => 'Fully paid',
            'confirmation_id' => 'PAY-OUT-002',
        ]);

        // Create payments for Rachid
        \App\Models\Payment::create([
            'credit_id' => $credit4->id,
            'amount' => 200.00,
            'payment_date' => now()->subDays(1)->toDateString(),
            'payment_method' => 'Cash',
            'note' => 'Partial pay',
            'confirmation_id' => 'PAY-RAC-001',
        ]);

        // Create notifications for Ooutmane
        \App\Models\Notification::create([
            'user_id' => $consumerUser->id,
            'type' => 'credit_created',
            'title' => 'New Credit Added',
            'message' => 'Ahmed added a credit of 1500.00 DH for Grocery Pack.',
            'is_read' => false,
        ]);

        \App\Models\Notification::create([
            'user_id' => $consumerUser->id,
            'type' => 'payment_registered',
            'title' => 'Payment Registered',
            'message' => 'A payment of 500.00 DH was registered for your Grocery Pack credit.',
            'is_read' => true,
        ]);
    }
}
