<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consumers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('cin')->nullable();
            $table->text('address')->nullable();
            $table->integer('trust_score')->default(50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consumers');
    }
};
