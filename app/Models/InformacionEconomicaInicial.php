<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformacionEconomicaInicial extends Model
{
    use HasFactory;
    //
    protected $table = 'informacionEconomicaInicial';
    protected $primaryKey = 'idInformacionEconomicaInicial';
    public $timestamps = false;

    protected $fillable = [
        'montoIngresos',
        'propositoRC'
    ];
}
