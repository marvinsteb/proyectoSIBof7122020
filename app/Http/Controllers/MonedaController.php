<?php

namespace App\Http\Controllers;

use App\Models\Moneda;
use Illuminate\Http\Request;

class MonedaController extends Controller
{
      public function getMoneda(Request $request){
        if($request->ajax()){
            $moneda = Moneda::all();
            return response()->json($moneda);
        }
    }
}
