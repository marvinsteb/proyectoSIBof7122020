<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CondicionMigratoria extends Model
{
    use HasFactory;
    protected $table = 'listaCondicionMigratoria';
    protected $primaryKey = 'idListaCondicionMigratoria';
    public $timestamps = false;
    protected $fillable = 
    [
        'descripcion'
    ];
}
