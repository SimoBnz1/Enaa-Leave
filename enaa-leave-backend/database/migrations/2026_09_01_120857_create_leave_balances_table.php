<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_balances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('year'); // Année ex: 2026
            $table->integer('total_days')->default(22); // Solde annuel de base
            $table->integer('used_days')->default(0); // Jours consommés
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_balances');
    }
};