<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('leave_type');

            $table->date('start_date');

            $table->date('end_date');

            $table->string('duration_type')->default('full_day');

            $table->text('reason');

            $table->string('attachment')->nullable();

            $table->text('replacement_plan')->nullable();

            $table->string('status')->default('pending_manager');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
