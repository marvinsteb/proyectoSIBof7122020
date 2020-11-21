<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CamposMinimosOtrosFirmantes extends Model
{
    use HasFactory;
    protected $table = 'camposMinimosFirmante';
    protected $primaryKey = 'idCamposMinimosFirmante';
    public $timestamps = false;

    protected $fillable = [
        'idCamposMinimosFirmante',
        'tipoActuacion',
        'calidadActua',
        'lugar',
        'fecha',
        'firmante',
        'representante'
    ];
}
