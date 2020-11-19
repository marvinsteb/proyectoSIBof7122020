<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiccionarioProductoServicio extends Model
{
    use HasFactory;
    protected $table = 'diccionarioProductoServicio';
    protected $primaryKey = 'idDiccionarioProductoServicio';
    public $timestamps = false;

    protected $fillable = [
        'idDiccionarioFormulario',
        'idProductoServicio'
    ];
}
