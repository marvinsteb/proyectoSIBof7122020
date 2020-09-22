<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Municipio;

class MunicipioController extends Controller
{
    
    public function getMunicipio(Request $request,$idDepartamento)
    {
        if($request->ajax())
        {
            $municipios = Municipio::municipioPorDepartamento($idDepartamento);
            // $municipios = array(
            //     'prueba' => 1
            // );
            return response()->json($municipios);
        }
    }
}
