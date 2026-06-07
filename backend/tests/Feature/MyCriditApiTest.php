<?php

namespace Tests\Feature;

use App\Models\Consumer;
use App\Models\Credit;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MyCriditApiTest extends TestCase
{
    use DatabaseTransactions;

    private User $seller;
    private User $consumerUser;
    private Consumer $consumerProfile;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a Seller User
        $this->seller = User::factory()->create([
            'name' => 'Seller Ahmed',
            'email' => 'test_ahmed@seller.com',
            'role' => 'seller',
            'phone' => '+212600111222',
        ]);

        // Create a Consumer User
        $this->consumerUser = User::factory()->create([
            'name' => 'Consumer Ooutmane',
            'email' => 'test_ooutmane@consumer.com',
            'role' => 'consumer',
            'phone' => '+212600112233',
        ]);

        // Create a Consumer profile under Ahmed and link it to Ooutmane
        $this->consumerProfile = Consumer::create([
            'seller_id' => $this->seller->id,
            'user_id' => $this->consumerUser->id,
            'name' => $this->consumerUser->name,
            'phone' => $this->consumerUser->phone,
            'cin' => 'BJ998877',
            'address' => 'Morocco, Casablanca',
            'trust_score' => 85,
        ]);
    }

    /**
     * Test Seller: List consumers and search.
     */
    public function test_seller_can_list_and_search_consumers(): void
    {
        Sanctum::actingAs($this->seller);

        // Add a second consumer
        Consumer::create([
            'seller_id' => $this->seller->id,
            'name' => 'Rachid El Alami',
            'phone' => '+212600555666',
            'cin' => 'BK112233',
            'trust_score' => 60,
        ]);

        // Fetch index
        $response = $this->getJson('/api/v1/seller/consumers');
        $response->assertStatus(200)
            ->assertJsonCount(2, 'consumers');

        // Search for 'Rachid'
        $response = $this->getJson('/api/v1/seller/consumers?search=Rachid');
        $response->assertStatus(200)
            ->assertJsonCount(1, 'consumers')
            ->assertJsonPath('consumers.0.name', 'Rachid El Alami');
    }

    /**
     * Test Seller: Create a consumer.
     */
    public function test_seller_can_create_consumer_and_auto_link_to_existing_user(): void
    {
        Sanctum::actingAs($this->seller);

        // Create a new consumer user that exists in system but is not linked yet
        $newConsumerUser = User::factory()->create([
            'name' => 'New Consumer',
            'email' => 'new@consumer.com',
            'role' => 'consumer',
            'phone' => '+212699999999',
        ]);

        // Store a consumer profile matching the phone number
        $response = $this->postJson('/api/v1/seller/consumers', [
            'name' => 'New Consumer Profile',
            'phone' => '+212699999999',
            'cin' => 'AB123456',
            'address' => 'Marrakech',
            'trust_score' => 70,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('consumer.name', 'New Consumer Profile')
            ->assertJsonPath('consumer.user_id', $newConsumerUser->id); // Auto-linked by phone!
    }

    /**
     * Test Seller: Create a credit and check notification.
     */
    public function test_seller_can_create_credit_and_generates_notification(): void
    {
        Sanctum::actingAs($this->seller);

        $response = $this->postJson('/api/v1/seller/credits', [
            'consumer_id' => $this->consumerProfile->id,
            'product_name' => 'Flour Bag',
            'total_amount' => 350.00,
            'due_date' => now()->addDays(5)->toDateString(),
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('credit.product_name', 'Flour Bag')
            ->assertJsonPath('credit.status', 'unpaid');
        
        $this->assertEquals(350.00, $response->json('credit.remaining_amount'));

        // Verify notification was created for the consumer user
        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->consumerUser->id,
            'type' => 'credit_created',
        ]);
    }

    /**
     * Test Seller: Record a payment, verify calculations & trust score dynamics.
     */
    public function test_seller_can_record_payment_updates_credit_and_trust_score(): void
    {
        Sanctum::actingAs($this->seller);

        // Create a credit first
        $credit = Credit::create([
            'consumer_id' => $this->consumerProfile->id,
            'seller_id' => $this->seller->id,
            'product_name' => 'Sugar Pack',
            'total_amount' => 100.00,
            'paid_amount' => 0.00,
            'remaining_amount' => 100.00,
            'status' => 'unpaid',
        ]);

        // Record a partial payment (amount = 40.00)
        $response = $this->postJson('/api/v1/seller/payments', [
            'credit_id' => $credit->id,
            'amount' => 40.00,
            'payment_method' => 'Cash',
            'note' => 'Partial payment',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('credit.status', 'partial');
        
        $this->assertEquals(40.00, $response->json('payment.amount'));
        $this->assertEquals(60.00, $response->json('credit.remaining_amount'));

        $this->consumerProfile->refresh();
        $this->assertEquals(86, $this->consumerProfile->trust_score); // Incremented by 1 for partial pay

        // Record final payment (amount = 60.00) to clear the credit
        $response = $this->postJson('/api/v1/seller/payments', [
            'credit_id' => $credit->id,
            'amount' => 60.00,
            'payment_method' => 'Cash',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('credit.status', 'paid');
        
        $this->assertEquals(0.00, $response->json('credit.remaining_amount'));

        $this->consumerProfile->refresh();
        $this->assertEquals(91, $this->consumerProfile->trust_score); // Incremented by 5 for full pay off

        // Verify payment notification was sent
        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->consumerUser->id,
            'type' => 'payment_registered',
        ]);
    }

    /**
     * Test Seller: Dashboard Stats.
     */
    public function test_seller_can_retrieve_dashboard_stats(): void
    {
        Sanctum::actingAs($this->seller);

        // Create some credits
        Credit::create([
            'consumer_id' => $this->consumerProfile->id,
            'seller_id' => $this->seller->id,
            'product_name' => 'Rice Bag',
            'total_amount' => 300.00,
            'paid_amount' => 100.00,
            'remaining_amount' => 200.00,
            'status' => 'partial',
        ]);

        $response = $this->getJson('/api/v1/seller/dashboard-stats');
        $response->assertStatus(200)
            ->assertJsonPath('stats.total_consumers', 1)
            ->assertJsonPath('stats.active_debtors', 1);
            
        $this->assertEquals(300.00, $response->json('stats.total_issued_amount'));
        $this->assertEquals(100.00, $response->json('stats.total_collected_amount'));
        $this->assertEquals(200.00, $response->json('stats.total_unpaid_amount'));
        $response->assertJsonCount(1, 'recent_credits');
    }

    /**
     * Test Consumer: View credits & payment history.
     */
    public function test_consumer_can_view_credits_and_payments(): void
    {
        // Setup a credit and a payment
        $credit = Credit::create([
            'consumer_id' => $this->consumerProfile->id,
            'seller_id' => $this->seller->id,
            'product_name' => 'Tea Box',
            'total_amount' => 50.00,
            'paid_amount' => 20.00,
            'remaining_amount' => 30.00,
            'status' => 'partial',
        ]);

        Payment::create([
            'credit_id' => $credit->id,
            'amount' => 20.00,
            'payment_date' => now()->toDateString(),
            'payment_method' => 'Cash',
            'confirmation_id' => 'PAY-TEST-99',
        ]);

        Sanctum::actingAs($this->consumerUser);

        // Fetch credits
        $response = $this->getJson('/api/v1/consumer/credits');
        $response->assertStatus(200)
            ->assertJsonCount(1, 'credits')
            ->assertJsonPath('credits.0.product_name', 'Tea Box');

        // Fetch payments
        $response = $this->getJson('/api/v1/consumer/payments');
        $response->assertStatus(200)
            ->assertJsonCount(1, 'payments')
            ->assertJsonPath('payments.0.confirmation_id', 'PAY-TEST-99');
    }

    /**
     * Test Consumer: Dashboard stats.
     */
    public function test_consumer_can_retrieve_dashboard_stats(): void
    {
        Credit::create([
            'consumer_id' => $this->consumerProfile->id,
            'seller_id' => $this->seller->id,
            'product_name' => 'Oil bottle',
            'total_amount' => 200.00,
            'paid_amount' => 150.00,
            'remaining_amount' => 50.00,
            'status' => 'partial',
            'due_date' => now()->addDays(2)->toDateString(),
        ]);

        Sanctum::actingAs($this->consumerUser);

        $response = $this->getJson('/api/v1/consumer/dashboard-stats');
        $response->assertStatus(200)
            ->assertJsonPath('stats.trust_score', 85)
            ->assertJsonPath('stats.next_due_date', now()->addDays(2)->toDateString());
            
        $this->assertEquals(50.00, $response->json('stats.total_remaining_debt'));
        $this->assertEquals(150.00, $response->json('stats.total_paid_amount'));
        $this->assertEquals(75.00, $response->json('stats.debt_progress_percentage'));
    }

    /**
     * Test Notifications: Read & Write.
     */
    public function test_user_can_view_and_read_notifications(): void
    {
        $notif = Notification::create([
            'user_id' => $this->consumerUser->id,
            'type' => 'alert',
            'title' => 'Test Notification',
            'message' => 'Hello World',
            'is_read' => false,
        ]);

        Sanctum::actingAs($this->consumerUser);

        // List notifications
        $response = $this->getJson('/api/v1/notifications');
        $response->assertStatus(200)
            ->assertJsonCount(1, 'notifications');

        // Mark as read
        $response = $this->patchJson("/api/v1/notifications/{$notif->id}/read");
        $response->assertStatus(200)
            ->assertJsonPath('notification.is_read', true);
    }
}
