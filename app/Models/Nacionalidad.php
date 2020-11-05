<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nacionalidad extends Model
{
    use HasFactory;
    protected $table = 'nacionalidad';
    protected $primarykey = 'idNacionalidad';
    public $timestamps = false;

    protected $fillable = [
        'idDatosPersonales',
        'idPais'
    ];
}
