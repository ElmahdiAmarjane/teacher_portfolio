<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type', ['course', 'td', 'tp']);
            $table->foreignId('formation_id')->constrained()->onDelete('cascade');
            $table->text('context')->nullable();
            $table->string('file')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
        });

    }
};
