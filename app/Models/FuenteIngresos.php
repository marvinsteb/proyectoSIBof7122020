<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuenteIngresos extends Model
{
    use HasFactory;
    protected $table = 'fuenteIngresos';
    protected $primaryKey = 'idFuenteIngresos';
    public $timestamps = false;

    protected $fillable = [
        'idInformacionEconomicaInicial',
        'tipo',
        'nombreComercial',
        'nombreEmpleador',
        'otrasFuentesIngreso',
    ];
}
