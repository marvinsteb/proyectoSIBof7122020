<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiccionarioFormulario extends Model
{
    use HasFactory;
    protected $table = 'diccionarioFormulario';
    protected $primaryKey = 'iddiccionarioFormulario';
    public $timestamps = false;

    protected $fillable = [
        'estado'
    ];
}
