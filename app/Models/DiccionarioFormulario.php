<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiccionarioFormulario extends Model
{
    use HasFactory;
    protected $table = 'diccionarioFormulario';
    protected $primaryKey = 'idDiccionarioFormulario';
    public $timestamps = false;

    protected $fillable = [
        'estado',
        'idUser'
    ];
}
