<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilEconomicoRelacionDependencia extends Model
{
    use HasFactory;
    protected $table = 'perfilEconommicoRelacionDependencia';
    protected $primaryKey = 'idPerfilEconommicoRelacionDependencia';
    public $timestamps = false;

    protected $fillable = [
        'idPerfilEconomicoTransaccional',
        'sector',
        'nombreEmpleador',
        'principalActividadEconomicaEmpleador',
        'puestoDesempenia',
        'direccionEmpleador',
        'lugar',
        'tipoMoneda',
        'montoAproximado'
    ];
}