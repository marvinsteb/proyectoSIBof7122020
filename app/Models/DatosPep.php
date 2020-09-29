<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosPep extends Model
{
    /*
    `datospep`
(`idDatosPep`,
`entidad`,
`puestoDesempenia`,
`pais`,
`origenRiqueza`,
`otroOrigenRiqueza`)
    */
    use HasFactory;
    protected $table = 'datospep';
    protected $primarykey = 'idDatosPep';
    public $timestamps = false;
    protected $fillable = [
        'entidad',
        'puestoDesempenia',
        'pais',
        'origenRiqueza', 
        'otroOrigenRiqueza' 
    ];
}
