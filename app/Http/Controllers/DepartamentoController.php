<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departamento;

class DepartamentoController extends Controller
{
    public function getDepartamento(Request $request) {
        if($request->ajax()){
            $departamentos = Departamento::select('codigoDepartamento','nombreDepartamento')->get();
            return response()->json($departamentos);
        }
    }
}
