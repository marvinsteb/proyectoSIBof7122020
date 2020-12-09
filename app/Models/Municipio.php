<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    use HasFactory;
    protected $table = 'municipio';
    protected $primaryKey = 'idMunicipio';
    public $timestamps = false;
    protected $fillable = 
    [
        'codigoDepartamento',
        'codigoMunicipio',
        'nombreMunicipio'

    ];
    public static function municipioPorDepartamento($idDepartamento){
        return Municipio::select('idMunicipio','nombreMunicipio')->where('codigoDepartamento','=',$idDepartamento)->get();
    }
}
