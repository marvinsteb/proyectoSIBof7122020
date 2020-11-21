<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtrosFirmantes extends Model
{
    use HasFactory;
    protected $table = 'otrosFirmantes';
    protected $primaryKey = 'idOtrosFirmantes';
    public $timestamps = false;

    protected $fillable = [
        'idProductoServicio',
        'idCamposMinimosFirmante'
    ];
}
