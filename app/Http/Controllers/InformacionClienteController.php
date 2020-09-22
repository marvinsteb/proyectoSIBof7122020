<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\CamposMinimos;

class InformacionClienteController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departamentos = DB::table('departamento');
        $departamentos = $departamentos->get();
        return view('contenido.oficioive7122020',['departamentos' => $departamentos]);
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

        return view('contenido.diccionarioFormulario',[
            'paises'=> $paises,
            'departamentos' => $departamentos
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
        $lugarCamposMinimos = array(
            "pais"=> $request->paisCamposMinimos,
            "departamento" => $request->departamentoCamposMinimos,
            "municipio" => $request->municipioCamposMinimos
        );
        $camposMinimos = array(
            'tipoActuacion' => $request->tipoActuacion,
            'calidadActua' => $request->tipoActuacion,
            'lugar' => $lugarCamposMinimos,
            'fecha' => $request->tipoActuacion,
            'cliente' => $request->tipoActuacion,
            'representante' => $request->tipoActuacion,
            'infoEconomica' => $request->tipoActuacion,
        );

        $diccionarioFormulario = array(
            'titulares' => $camposMinimos,
            'productos' => 'dicccionario producto y servicio',
            'perfilEconomico'=> 'diccionario Perfil economico'
        );
        
        $camposMinimos = $request;

       return Response()->json($camposMinimos);  
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