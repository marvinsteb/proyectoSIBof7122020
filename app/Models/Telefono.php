<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telefono extends Model
{
    use HasFactory;
    protected $table = 'telefono';
    protected $primarykey = 'idTelefono';
    public $timestamps = false;

    protected $fillable = [
        'idDatosPersonales',
        'numTelefono'
    ];
}
