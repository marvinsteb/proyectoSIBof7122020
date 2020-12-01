<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiccionarioPerfilTransaccional extends Model
{
    use HasFactory;
    protected $table = 'diccionarioPerfilTransaccional';
    protected $primaryKey = 'idDiccionarioPerfilTransaccional';
    public $timestamps = false;

    protected $fillable = [
        'idPerfilEconomicoTransaccional',
        'fecha',
        'productoServicio',
        'tipoMoneda',
        'montoPromedioMensual',
    ];
}
