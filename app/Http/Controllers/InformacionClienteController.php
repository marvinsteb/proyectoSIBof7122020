<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CamposMinimos;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class InformacionClienteController extends Controller
{
    public function guradarDatosPersonales($datosPersonales){
        
                    $camposMinimos = [
                        'primerApellido' => $datosPersonales["primerApellido"],
                        'segundoApellido' => empty($datosPersonales["segundoApellido"]) ? 'SOA' : $datosPersonales["segundoApellido"],
                        'apellidoCasada' => $datosPersonales["apellidoCasada"],
                        'primerNombre' => $datosPersonales["primerNombre"],
                        'segundoNombre' => empty($datosPersonales["segundoNombre"]) ? 'SON' : $datosPersonales["segundoNombre"],
                        'otrosNombres' => $datosPersonales["otrosNombres"],
                        'fechaNacimiento' => $this->formatoFechaDB(
                            $datosPersonales["fechaNacimiento"]
                        ),
                        'nacimiento' => DB::table('lugar')->insertGetId([
                            "pais" => $datosPersonales["nacimiento"]["pais"],
                            "departamento" => $datosPersonales["nacimiento"]["departamento"],
                            "municipio" => $datosPersonales["nacimiento"]["municipio"],
                        ]),
                        'condicionMigratoria' => $datosPersonales["condicionMigratoria"],
                        'otraCondicionMigratoria' => $datosPersonales["otraCondicionMigratoria"],
                        'sexo' => $datosPersonales["sexo"],
                        'estadoCivil' => $datosPersonales["estadoCivil"],
                        'nit' => $datosPersonales["nit"],
                        'profesionOficio' => $datosPersonales["profesionOficio"],
                        'tipoDocumentoIdentificacion' => $datosPersonales["tipoDocumentoIdentificacion"],
                        'numeroDocumentoIdentificacion' => $datosPersonales["numeroDocumentoIdentificacion"],
                        'emisionPasaporte' => $datosPersonales["emisionPasaporte"],
                        'email' => $datosPersonales["email"],
                        'direccionResidencia' => $datosPersonales["direccionResidencia"],
                        'residencia' => DB::table('lugar')->insertGetId([
                            "pais" => $datosPersonales["residencia"]["pais"],
                            "departamento" => $datosPersonales["residencia"]["departamento"],
                            "municipio" => $datosPersonales["residencia"]["municipio"],
                        ]),
                        'pep' => $datosPersonales["pep"],
                        'parienteAsociadoPep' => $datosPersonales["parienteAsociadoPep"],
                        'cpe' => $datosPersonales["cpe"]
                    ];
                if($camposMinimos["pep"]== "S"){
                    $camposMinimos['datosPep']  = DB::table("datosPep")->insertGetID([
                        'entidad'=> $datosPersonales["datospep"]["entidad"],
                        'puestoDesempenia' => $datosPersonales["datospep"]["puestoDesempenia"],
                        'paisEntidad' => $datosPersonales["datospep"]["paisEntidad"],
                        'origenRiqueza'=> $datosPersonales["datospep"]["origenRiqueza"],
                        'otroOrigenRiqueza'=> $datosPersonales["datospep"]["otroOrigenRiqueza"],
                    ]);

                };
                $idClienteCamposMinimos = DB::table('datosPersonales')->insertGetID($camposMinimos);
                
                if($camposMinimos["parienteAsociadoPep"]=='S'){
                    $arrayDatosParienteAsociadoPep = $datosPersonales["datosParienteAsociadoPep"];
                  foreach ($arrayDatosParienteAsociadoPep as $parienteAsociadoPep) {
                      $datos = $parienteAsociadoPep;
                      $datos["segundoApellido"] = empty($datos["segundoApellido"]) ? 'SOA':$datos["segundoApellido"];
                      $datos["segundoNombre"] = empty($datos["segundoNombre"]) ? 'SON':$datos["segundoNombre"];
                      $idDatosParAsoPep = DB::table('datosParienteAsociadoPep')->insertGetId($datos);
                      DB::table('parienteAsociadoPep')->insertGetId([
                            'idDatosPersonales' => $idClienteCamposMinimos,
                            'idDatosParienteAsociadoPep' => $idDatosParAsoPep
                      ]);

                  } 
                }


                 $telefonosTitulares = $datosPersonales["telefonos"];
                  for ($a = 0; $a < count($telefonosTitulares); $a++) {
                      $idTelefonos = DB::table('telefono')->insertGetId([
                          'idDatosPersonales' => $idClienteCamposMinimos,
                          'numTelefono' => $telefonosTitulares[$a]
                      ]);
                  }

                  $nacionalidadTitulares = $datosPersonales["nacionalidades"];
                  foreach ($nacionalidadTitulares as $nacionalidad) { 
                      $idNacionalidad = DB::table('nacionalidad')->insertGetId([
                          'idDatosPersonales' => $idClienteCamposMinimos,
                          'idPais' => $nacionalidad
                          ]);
                  }
                  return $idClienteCamposMinimos;
    }

     public function formatoFechaDB($fecha)
    {
        $fechaFormateada = Carbon::createFromFormat('d/m/Y', $fecha)->format('Y-m-d');
        return $fechaFormateada;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

            $idDiccionarioFormulario = DB::table('diccionarioFormulario')->insertGetId([
                "estado" => "A"
            ]);

            for ($i = 0; $i < count($request->titulares); $i++) {
                $camposMinimos = [
                    'tipoActuacion' => $request->titulares[$i]["tipoActuacion"],
                    'calidadActua' => $request->titulares[$i]["calidadActua"],
                    'lugar' =>  DB::table('lugar')->insertGetId([
                        "pais" => $request->titulares[$i]["lugar"]["pais"],
                        "departamento" => $request->titulares[$i]["lugar"]["departamento"],
                        "municipio" => $request->titulares[$i]["lugar"]["municipio"]
                    ]),
                    'fecha' => $this->formatoFechaDB($request->titulares[$i]["fecha"]),
                    'cliente' => $this->guradarDatosPersonales($request->titulares[$i]["cliente"]),
                    'infoEconomica' => null,
                    'diccionarioFormulario' => $idDiccionarioFormulario,
                    ];
                if($camposMinimos['tipoActuacion'] == 'R'){
                    $camposMinimos['representante'] = $this->guradarDatosPersonales($request->titulares[$i]["representante"]);
                } 
                $idCamposMinimos = DB::table('camposMinimos')->insertGetId($camposMinimos);
            }

            $respuesta = $request;
            
     

            DB::commit();
            // all good
        } catch (\Exception $e) {
            $respuesta = [
                'error'=> true,
                'mensaje'=> $e->getMessage()
            ];
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
