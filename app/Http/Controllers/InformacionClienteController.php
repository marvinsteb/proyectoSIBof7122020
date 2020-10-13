<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CamposMinimos;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class InformacionClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function formatoFechaDB($fecha)
    {
        $fechaFormateada = Carbon::createFromFormat('d/m/Y', $fecha)->format('Y-m-d');
        return $fechaFormateada;
    }
    public function index()
    {
        return view('contenido.oficioive7122020');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $paises = DB::table('pais');
        $paises = $paises->get();

        $departamentos = DB::table('departamento');
        $departamentos = $departamentos->get();

        $listaCondicionMigratoria = DB::table('listaCondicionMigratoria');
        $listaCondicionMigratoria = $listaCondicionMigratoria->get();

        return view('contenido.diccionarioFormulario', [
            'paises' => $paises,
            'departamentos' => $departamentos,
            'listaCondicionMigratoria' => $listaCondicionMigratoria
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        DB::beginTransaction();
        try {
            // diccionario formulario 

            $idDiccionarioFormulario = DB::table('diccionarioformulario')->insertGetId([
                "estado" => "A"
            ]);

            for ($i = 0; $i < count($request->titulares); $i++) {


                $idLugarCamposMinimos = DB::table('lugar')->insertGetId([
                    "pais" => $respuesta =  $request->titulares[$i]["lugar"]["pais"],
                    "departamento" => $respuesta =  $request->titulares[$i]["lugar"]["departamento"],
                    "municipio" => $respuesta =  $request->titulares[$i]["lugar"]["municipio"]
                ]);

                $idCamposMinimos = DB::table('camposMinimos')->insertGetId([
                    'tipoActuacion' => $request->titulares[$i]["tipoActuacion"],
                    'calidadActua' => $request->titulares[$i]["calidadActua"],
                    'lugar' => $idLugarCamposMinimos,
                    'fecha' => $this->formatoFechaDB($request->titulares[$i]["fecha"]),
                    // 'cliente' => null,
                    // 'representante' => null,
                    // 'infoEconomica' => null,
                    'diccionarioFormulario' => $idDiccionarioFormulario,

                ]);
            }

            //ipoActuacion: "C", calidadActua: null, lugar: {…}, fecha: null, cliente: {…}, …}

            $respuesta = $request;
            DB::commit();
            // all good
        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
            $respuesta = $e;
        }


        return Response()->json(
            $respuesta,
            200,
            ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
