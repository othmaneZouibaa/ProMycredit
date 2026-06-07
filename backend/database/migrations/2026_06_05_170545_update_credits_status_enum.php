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
        Schema::table('credits', function (Blueprint $table) {
            $table->enum('status', ['pending', 'unpaid', 'partial', 'paid', 'rejected'])->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('credits', function (Blueprint $table) {
            $table->enum('status', ['unpaid', 'partial', 'paid'])->default('unpaid')->change();
        });
    }
};
