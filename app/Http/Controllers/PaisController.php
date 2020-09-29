<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;

class PaisController extends Controller
{
    public function getPais(Request $request){
        if($request->ajax()){
            $pais = Pais::all();
            return response()->json($pais);
        }
    }
}
