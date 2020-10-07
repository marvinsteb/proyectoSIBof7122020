<?php

namespace App\Http\Controllers;

use App\Models\CondicionMigratoria;
use Illuminate\Http\Request;

class CondicionMigratoriaController extends Controller
{
    public function getCondicionMigratoria(Request $request)
    {
        if ($request->ajax()) {
            $listaCondicionMigratoria = CondicionMigratoria::all();
            return response()->json($listaCondicionMigratoria);
        }
    }
}
