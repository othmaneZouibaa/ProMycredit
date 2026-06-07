<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_register_as_seller(): void
    {
        $response = $this->postJson('/api/v1/register', [
            'name' => 'Test Seller',
            'email' => 'seller_' . uniqid() . '@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'seller',
            'phone' => '+212600000001',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('user.role', 'seller')
            ->assertJsonStructure(['access_token', 'token_type']);
    }

    public function test_user_can_register_as_consumer(): void
    {
        $response = $this->postJson('/api/v1/register', [
            'name' => 'Test Consumer',
            'email' => 'consumer_' . uniqid() . '@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'consumer',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('user.role', 'consumer');
    }

    public function test_user_can_login_and_logout(): void
    {
        $user = User::factory()->create([
            'email' => 'login_' . uniqid() . '@test.com',
            'role' => 'seller',
        ]);

        $login = $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'password',
            'role' => 'seller',
        ]);

        $login->assertStatus(200)
            ->assertJsonStructure(['access_token', 'user']);

        $token = $login->json('access_token');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/me')
            ->assertStatus(200)
            ->assertJsonPath('email', $user->email);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/logout')
            ->assertStatus(200);
    }

    public function test_login_rejects_wrong_role(): void
    {
        $user = User::factory()->create([
            'email' => 'role_' . uniqid() . '@test.com',
            'role' => 'consumer',
        ]);

        $this->postJson('/api/v1/login', [
            'email' => $user->email,
            'password' => 'password',
            'role' => 'seller',
        ])->assertStatus(401);
    }

    public function test_consumer_cannot_access_seller_routes(): void
    {
        $consumer = User::factory()->create(['role' => 'consumer']);
        Sanctum::actingAs($consumer);

        $this->getJson('/api/v1/seller/consumers')
            ->assertStatus(403);
    }

    public function test_seller_cannot_access_consumer_routes(): void
    {
        $seller = User::factory()->create(['role' => 'seller']);
        Sanctum::actingAs($seller);

        $this->getJson('/api/v1/consumer/credits')
            ->assertStatus(403);
    }
}
