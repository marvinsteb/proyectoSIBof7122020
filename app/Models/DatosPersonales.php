<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosPersonales extends Model
{
    use HasFactory;
    /*
    `oficioive7122020`.`datospersonales`
)
    */
    protected $table = 'datospersonales';
    protected $primarykey = 'idDatosPersonales';
    public $timestamps = false;
    protected $fillable = [
        'primerApellido',
        'segundoApellido',
        'apellidoCasada',
        'primerNombre',
        'segundoNombre',
        'otrosNombres',
        'fechaNacimiento',
        'nacionalidades',
        'nacimiento',
        'condicionMigratoria',
        'otraCondicionMigratoria',
        'sexo',
        'estadoCivil',
        'profesionOficio',
        'tipoDocumentoIdentificacion',
        'numeroDocumentoIdentificacion',
        'emisionPasaporte',
        'nit',
        'telefonos',
        'email',
        'direccionResidencia',
        'residencia',
        'pep',
        'datosPep',
        'parienteAsociadoPep',
        'datosParienteAsociadoPep',
        'cep'
    ];

}
