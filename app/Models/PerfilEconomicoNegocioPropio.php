<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilEconomicoNegocioPropio extends Model
{
    use HasFactory;
    protected $table = 'perfilEconomicoNegocioPropio';
    protected $primaryKey = 'idDiccionarioPerfilEconomicoNegocioPropio';
    public $timestamps = false;

    protected $fillable = [
        'idPerfilEconomicoTransaccional',
        'nombreComercial',
        'principalActividadEconomica',
        'fechaInscripcionNegocio',
        'numeroRegistro',
        'folio',
        'libro',
        'direccionNegocio',
        'lugar',
        'tipoMoneda',
        'montoAproximado'
    ];
}

