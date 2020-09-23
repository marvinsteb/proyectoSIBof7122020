<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lugar extends Model
{
    use HasFactory;
    protected $table = 'lugar';
    protected $primarykey = 'idLugar';
    public $timestamps = false;

    protected $fillable = [
        'pais',
        'departamento',
        'municipio'
    ];
}
