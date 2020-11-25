<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosPep extends Model
{
    use HasFactory;
    protected $table = 'datosPep';
    protected $primaryKey = 'idDatosPep';
    public $timestamps = false;
    protected $fillable = [
        'entidad',
        'puestoDesempenia',
        'paisEntidad',
        'origenRiqueza', 
        'otroOrigenRiqueza' 
    ];
}
