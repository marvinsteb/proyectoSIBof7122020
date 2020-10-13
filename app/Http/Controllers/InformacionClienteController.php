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
                //cliente
                $idClienteCamposMinimos = DB::table('datosPersonales')->insertGetID([
                    'primerApellido' => $request->titulares[$i]["cliente"]["primerApellido"],
                    'segundoApellido' => $request->titulares[$i]["cliente"]["segundoApellido"],
                    'apellidoCasada' => $request->titulares[$i]["cliente"]["apellidoCasada"],
                    'primerNombre' => $request->titulares[$i]["cliente"]["primerNombre"],
                    'segundoNombre' => $request->titulares[$i]["cliente"]["segundoNombre"],
                    'otrosNombres' => $request->titulares[$i]["cliente"]["otrosNombres"],
                    'fechaNacimiento' => $this->formatoFechaDB(
                        $request->titulares[$i]["cliente"]["fechaNacimiento"]
                    ),
                    // inplementar una tabla para guardar el arreglo de las nacionalidades
                    'nacionalidades' => 1,
                    'nacimiento' => DB::table('lugar')->insertGetId([
                        "pais" => $request->titulares[$i]["cliente"]["nacimiento"]["pais"],
                        "departamento" => $request->titulares[$i]["cliente"]["nacimiento"]["departamento"],
                        "municipio" => $request->titulares[$i]["cliente"]["nacimiento"]["municipio"],
                    ]),

                    'condicionMigratoria' => $request->titulares[$i]["cliente"]["condicionMigratoria"],
                    'otraCondicionMigratoria' => $request->titulares[$i]["cliente"]["otraCondicionMigratoria"],
                    'sexo' => $request->titulares[$i]["cliente"]["sexo"],
                    'estadoCivil' => $request->titulares[$i]["cliente"]["estadoCivil"],
                    'nit' => $request->titulares[$i]["cliente"]["nit"],
                    'profesionOficio' => $request->titulares[$i]["cliente"]["profesionOficio"],
                    'tipoDocumentoIdentificacion' => $request->titulares[$i]["cliente"]["tipoDocumentoIdentificacion"],
                    'numeroDocumentoIdentificacion' => $request->titulares[$i]["cliente"]["numeroDocumentoIdentificacion"],
                    'emisionPasaporte' => $request->titulares[$i]["cliente"]["emisionPasaporte"],
                    /*implementar una tabla para guardar los valores del arreglo telefono,
                que se envia desde la vista diccionarFormulario.
                ,por el momento enviamos null, pero la llave es obligatoria para generar el json*/
                    'telefonos'  => null,
                    'email' => $request->titulares[$i]["cliente"]["email"],
                    'direccionResidencia' => $request->titulares[$i]["cliente"]["direccionResidencia"],
                    'residencia' => DB::table('lugar')->insertGetId([
                        "pais" => $request->titulares[$i]["cliente"]["residencia"]["pais"],
                        "departamento" => $request->titulares[$i]["cliente"]["residencia"]["departamento"],
                        "municipio" => $request->titulares[$i]["cliente"]["residencia"]["municipio"],
                    ]),
                    //datos por default, implementa en la vista los inputs para los siguientes campos
                    'pep' => 'S',
                    'datosPep' => null,
                    'parienteAsociadoPep' => 'S',
                    'datosParienteAsociadoPep' => null,
                    'cpe' => 'S'
                ]);


                // campos minimos
                $idCamposMinimos = DB::table('camposMinimos')->insertGetId([
                    'tipoActuacion' => $request->titulares[$i]["tipoActuacion"],
                    'calidadActua' => $request->titulares[$i]["calidadActua"],
                    'lugar' =>  DB::table('lugar')->insertGetId([
                        "pais" => $request->titulares[$i]["lugar"]["pais"],
                        "departamento" => $request->titulares[$i]["lugar"]["departamento"],
                        "municipio" => $request->titulares[$i]["lugar"]["municipio"]
                    ]),
                    'fecha' => $this->formatoFechaDB($request->titulares[$i]["fecha"]),
                    'cliente' => $idClienteCamposMinimos,
                    'representante' => null,
                    'infoEconomica' => null,
                    'diccionarioFormulario' => $idDiccionarioFormulario,
                ]);
            }

            $respuesta = $request;

            DB::commit();
            // all good
        } catch (\Exception $e) {
            $respuesta = $e;
            DB::rollback();
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
