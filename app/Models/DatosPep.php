<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosPep extends Model
{
    use HasFactory;
    protected $table = 'datosPep';
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
