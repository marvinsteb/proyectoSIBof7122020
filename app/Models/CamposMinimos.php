<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CamposMinimos extends Model
{
    protected $table = 'camposMinimos';
    protected $primarykey = 'idCamposMinimos';
    public $timestamps = false;

    protected $fillable = [
        'idCamposMinimos',
        'tipoActuacion',
        'calidadActua',
        'lugar',
        'fecha',
        'cliente',
        'representante',
        'infoEconomica',
        'diccionarioFormulario'

    ];
}
