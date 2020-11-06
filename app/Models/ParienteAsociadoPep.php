<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParienteAsociadoPep extends Model
{
    use HasFactory;
    protected $table = 'parienteAsociadoPep';
    protected $primaryKey = 'idParienteAsociadoPep';
    public $timestamps = false;

    protected $fillable = [
        'idDatosPersonales',
        'idDatosParienteAsociadoPep'
    ];
}
