<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Titular extends Model
{
    use HasFactory;
    protected $table = 'titular';
    protected $primaryKey = 'idTitular';
    public $timestamps = false;

    protected $fillable = [
        'idDiccionarioFormulario',
        'idCamposMinimos',
    ];
}
