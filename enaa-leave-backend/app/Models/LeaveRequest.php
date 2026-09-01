<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'reason',
        'status',
        'replacement_plan',
    ];
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // Relation : Une demande appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}