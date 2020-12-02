<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrincipalesUbicacionesGeograficas extends Model
{
    use HasFactory;
    protected $table = 'principalesUbicacionesGeograficas';
    protected $primaryKey = 'idPrincipalesUbicacionesGeograficas';
    public $timestamps = false;

    protected $fillable = [
        'idDiccionarioPerfilTransaccional',
        'idLugar'
    ];
}