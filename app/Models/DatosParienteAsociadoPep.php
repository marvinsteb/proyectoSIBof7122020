<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosParienteAsociadoPep extends Model
{
    use HasFactory;
    protected $table = 'datosParienteAsociadoPep';
    protected $primaryKey = 'idDatosParienteAsociadoPep';
    public $timestamps = false;
    protected $fillable = [
        'parentesco',
        'otroParentesco',
        'motivoAsociacion',
        'otroMotivoAsociacion',
        'primerApellido',
        'segundoApellido',
        'apellidoCasada',
        'primerNombre',
        'segundoNombre',
        'otrosNombres',
        'sexo',
        'condicion',
        'entidad',
        'puestoDesempenia',
        'paisEntidad'
    ];
}
