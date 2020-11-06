<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    protected $table = 'pais';
    protected $primaryKey = 'idPais';
    public $timestamps = false;

    protected $fillable = [
        'codigoPais',
        'nombrePais'
    ];
    protected $guarded = [];
}
