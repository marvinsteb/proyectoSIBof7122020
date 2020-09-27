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

        $listaCondicionMigratoria = DB::table('listaCondicionMigratoria');
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
             "pais" => $request->paisCamposMinimosCliente,
             "departamento" => $request->departamentoCamposMinimosCliente,
             "municipio" => $request->municipioCamposMinimosCliente
        );
        $camposMinimos = array(
            'tipoActuacion' => $request->tipoActuacionCliente,
            'calidadActua' => $request->calidadActuaCliente,
            'lugar' =>  $lugarCamposMinimos ,
            'fecha' => $this->formatoFechaDB($request->fechaCamposMinimosCliente),
            'cliente' => null,
            'representante' => null,
            'infoEconomica' => null,
        );

        $diccionarioFormulario = array(
            'titulares' => $camposMinimos,
            'productos' => 'dicccionario producto y servicio',
            'perfilEconomico'=> 'diccionario Perfil economico'
        );




        DB::beginTransaction();

        try {
            //insertar lugar

            $idLugarCamposMinimos = DB::table('lugar')->insertGetId([
                "pais" => $request->paisCamposMinimosCliente,
                "departamento" => $request->departamentoCamposMinimosCliente,
                "municipio" => $request->municipioCamposMinimosCliente
                ]);

            $idLugarNacimientoCliente = DB::table('lugar')->insertGetId([
                    "pais" => $request->paisNacimientoCliente,
                    "departamento" => $request->departamentoNacimientoCliente,
                    "municipio" => $request->municipioNaciminentoCliente
                    ]);
            $idlugarRecidenciaCliente = DB::table('lugar')->insertGetId([
                "pais" => $request->paisRecidenciaCliente,
                "departamento" => $request->departamentoRecidenciaCliente,
                "municipio" => $request->municipioRecidenciaCliente
            ]);
            $idClienteCamposMinimos = DB::table('datosPersonales')->insertGetID([
                'primerApellido' => $request->primerApellidoCliente,
                'segundoApellido' => $request->segundoApellidoCliente,
                'apellidoCasada' => $request->apellidoCasadaCliente,
                'primerNombre' => $request->primerNombreCliente,
                'segundoNombre' => $request->segundoNombreCliente,
                'otrosNombres' => $request->otrosNombresCliente,
                'fechaNacimiento' => $this->formatoFechaDB($request->fechaNacimientoCliente),
                // inplementar una tabla para guardar el arreglo de las nacionalidades
                'nacionalidades' => 1,
                'nacimiento' =>  $idLugarNacimientoCliente,
                'condicionMigratoria' => $request->condicionMigratoriaCliente,
                'otraCondicionMigratoria' => $request->otraCondicionMigratoriacliente,
                'sexo' => $request->sexoCliente,
                'estadoCivil' => $request->estadoCivilCliente,
                'profesionOficio' => $request->nitCliente,
                'tipoDocumentoIdentificacion' => $request->tipoDoctoIdentificacionCliente,
                'numeroDocumentoIdentificacion' =>$request->numeroDocumentoIdentificacionCliente,
                'emisionPasaporte' => $request->emicionPasaporteCliente,
                'nit' => $request->nitCliente,
                /*implementar una tabla para guardar los valores del arreglo telefono,
                 que se envia desde la vista diccionarFormulario.
                 ,por el momento enviamos null, pero la llave es obligatoria para generar el json*/
                'telefonos'  => null,
                'email' => $request->emailCliente,
                'direccionResidencia' => $request->direccionRecidenciaCliente,
                'residencia' => $idlugarRecidenciaCliente ,
                //datos por default, implementa en la vista los inputs para los siguientes campos
                'pep' => 'S',
                'datosPep' => null,
                'parienteAsociadoPep' => 'S',
                'datosParienteAsociadoPep' => null,
                'cep' => 'S'
            ]);

            $idCamposMinimos = DB::table('camposMinimos')->insertGetId([
                'tipoActuacion' => $request->tipoActuacionCliente,
                'calidadActua' => $request->calidadActuaCliente,
                'lugar' => $idLugarCamposMinimos,
                'fecha' => $this->formatoFechaDB($request->fechaCamposMinimosCliente),
                'cliente' => $idClienteCamposMinimos,
                'representante' => null,
                'infoEconomica' => null,
            ]);
            $respuesta = $request;
            DB::commit();
            // all good
        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
            $respuesta = $e;
        }

        

       return Response()->json( $respuesta, 200 ,['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
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
