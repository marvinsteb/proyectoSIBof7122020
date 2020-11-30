<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilEconomicoOtrosIngresos extends Model
{
    use HasFactory;
    protected $table = 'perfilEconomicoOtrosIngresos';
    protected $primaryKey = 'idPerfilEconomicoOtrosIngresos';
    public $timestamps = false;

    protected $fillable = [
        'idPerfilEconomicoTransaccional',
        'tipoOtrosIngresos',
        'detalleOtrosIngresos',
        'tipoMoneda',
        'montoAproximado',
    ];
    protected $guarded = [];
}