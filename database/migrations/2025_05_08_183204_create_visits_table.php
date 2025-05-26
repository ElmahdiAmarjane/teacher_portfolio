<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address')->nullable();
            $table->string('session_id')->nullable(); // Better than IP for unique tracking
            $table->date('visit_date'); // For daily
            $table->integer('visit_week'); // For weekly (1-52)
            $table->integer('visit_month'); // For monthly (1-12)
            $table->integer('visit_year'); // For yearly
            $table->timestamps();
            
            // Indexes for faster queries
            $table->index(['visit_date']);
            $table->index(['visit_year', 'visit_month']);
            $table->index(['visit_year', 'visit_week']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('visits');
    }
};
