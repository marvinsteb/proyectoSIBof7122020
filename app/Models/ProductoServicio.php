<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoServicio extends Model
{
    use HasFactory;
    protected $table = 'productoServicio';
    protected $primaryKey = 'idProductoServicio';
    public $timestamps = false;

    protected $fillable = [
                'lugar',
                'fecha',
                'tipo',
                'nombre',
                'descripcion',
                'identificador',
                'nombreContrata',
                'moneda',
                'valor'
            ];
}
