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
        User::factory()->create([
            'name' => 'Seller Ahmed',
            'email' => 'ahmed@seller.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'seller',
        ]);

        // Create a Consumer
        User::factory()->create([
            'name' => 'Consumer Ooutmane',
            'email' => 'ooutmane@consumer.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'consumer',
        ]);
    }
}
