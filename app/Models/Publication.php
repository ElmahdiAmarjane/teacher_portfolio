<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $table = 'publications';

    protected $fillable = [
        'title',
        'description',
        'files',
        'publie_at',
        'type'
    ];

    protected $casts = [
        'files' => 'array', // Since we are storing files as JSON
    ];
}