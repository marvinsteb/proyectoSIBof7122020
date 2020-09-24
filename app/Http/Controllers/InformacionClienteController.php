<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\CamposMinimos;
use Carbon\Carbon;

class InformacionClienteController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function formatoFechaDB($fecha)
    {
        $fechaFormateada = Carbon::parse($fecha);
        return $fechaFormateada->format('Y-m-d');
    }
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

        $listaCondicionMigratoria = DB::table('listacondicionmigratoria');
        $listaCondicionMigratoria = $listaCondicionMigratoria->get();

        return view('contenido.diccionarioFormulario',[
            'paises'=> $paises,
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
        
        $lugarCamposMinimos = array(
            "pais" => $request->paisCamposMinimos,
            "departamento" => $request->departamentoCamposMinimos,
            "municipio" => $request->municipioCamposMinimos
        );
        $camposMinimos = array(
            'tipoActuacion' => $request->tipoActuacion,
            'calidadActua' => $request->calidadActua,
            'lugar' => $lugarCamposMinimos,
            'fecha' => $this->formatoFechaDB($request->fechaCamposMinimos),
            'cliente' => $request->tipoActuacion,
            'representante' => $request->tipoActuacion,
            'infoEconomica' => $request->tipoActuacion,
        );

        $diccionarioFormulario = array(
            'titulares' => $camposMinimos,
            'productos' => 'dicccionario producto y servicio',
            'perfilEconomico'=> 'diccionario Perfil economico'
        );
       

        DB::beginTransaction();

        try {
            //insertar lugar
            $idLugar = DB::table('lugar')->insertGetId([
                "pais" => $request->paisCamposMinimos,
                "departamento" => $request->departamentoCamposMinimos,
                "municipio" => $request->municipioCamposMinimos
                ]);

            $idCamposMinimos = DB::table('camposminimos')->insertGetId([
                'tipoActuacion' => $request->tipoActuacion,
                'calidadActua' => $request->calidadActua,
                'lugar' => $idLugar,
                'fecha' => $this->formatoFechaDB($request->fechaCamposMinimos),
                'cliente' => null,
                'representante' => null,
                'infoEconomica' => null,
            ]);

            DB::commit();
            // all good
        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
        }
                
        $respuesta = $request;

       return Response()->json($respuesta, 200 ,['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
       JSON_UNESCAPED_UNICODE);  
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
