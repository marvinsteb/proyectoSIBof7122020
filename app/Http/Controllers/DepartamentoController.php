<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departamento;
use App\Models\Pais;

class DepartamentoController extends Controller
{
    public function getDepartamento(Request $request) {
        if($request->ajax()){
            $departamentos = Departamento::all();
            return response()->json($departamentos);
        }
    }
}
