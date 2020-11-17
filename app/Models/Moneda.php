<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moneda extends Model
{
    use HasFactory;
    protected $table = 'moneda';
    protected $primaryKey = 'idMoneda';
    public $timestamps = false;

    protected $fillable = [
        'codigoMoneda',
        'nombreMoneda'
    ];
}
