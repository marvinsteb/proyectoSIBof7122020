<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficiario extends Model
{
    use HasFactory;
    protected $table = 'beneficiario';
    protected $primaryKey = 'idBeneficiario';
    public $timestamps = false;

    protected $fillable = [
        'idProductoServicio',
        'idCamposMinimos'
    ];
}
