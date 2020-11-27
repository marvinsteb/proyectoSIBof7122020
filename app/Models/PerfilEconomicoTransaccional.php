<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilEconomicoTransaccional extends Model
{
    use HasFactory;
    protected $table = 'perfilEconomicoTransaccional';
    protected $primaryKey = 'idPerfilEconomicoTransaccional';
    public $timestamps = false;

    protected $fillable = [
        'idDiccionarioFormulario',
        'actualizacion',
        'fecha'
    ];

}
