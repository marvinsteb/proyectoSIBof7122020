<?php

namespace App\Http\Controllers;

use App\Models\Beneficiario;
use Illuminate\Http\Request;
use App\Models\CamposMinimos;
use App\Models\DatosPersonales;
use App\Models\DiccionarioFormulario;
use App\Models\Lugar;
use App\Models\Nacionalidad;
use App\Models\Telefono;
use App\Models\Pais;
use App\Models\DatosPep;
use App\Models\DiccionarioProductoServicio;
use App\Models\FuenteIngresos;
use App\Models\InformacionEconomicaInicial;
use App\Models\Moneda;
use App\Models\ParienteAsociadoPep;
use App\Models\ProductoServicio;
use App\Models\Titular;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class InformacionClienteController extends Controller
{
    public function guardarLugar($lugar){
        DB::table('lugar')->updateOrInsert([
                                "pais" => $lugar ["pais"],
                                "departamento" => $lugar ["departamento"],
                                "municipio" => $lugar ["municipio"],
                            ]);
        $obLugar = DB::table('lugar')
                    ->where('pais', $lugar ["pais"])
                    ->where('departamento', $lugar ["departamento"])
                    ->where('municipio', $lugar ["municipio"])
                    ->first();
        
        return $obLugar->idLugar;
    }
    public function guardarDatosPersonales($datosPersonales){
        
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
                        'nacimiento' => $this->guardarLugar($datosPersonales["nacimiento"]),
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
                        'residencia' => $this->guardarLugar($datosPersonales["residencia"]),
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
    public function guardarFueneIngresos($id,$fuenteIng,$tipo){
        foreach($fuenteIng as $info){
            $idFuIng =[];
             $obFuenteIngresos =[
                            'idInformacionEconomicaInicial' => $id,
                            'tipo'=> $tipo,
                            'nombreComercial'=>null,
                            'nombreEmpleador'=>null,
                            'otrasFuentesIngreso'=>null,
                        ];
            switch ($tipo) {
                case 'NP':
                    $idFuIng['idFuenteIngresos'] = $info['idNombreComercial'];
                    $obFuenteIngresos['nombreComercial'] = $info['nombreComercial'];
                break;
                case 'RD':
                    $idFuIng['idFuenteIngresos'] = $info['idNombreEmpleador'];
                    $obFuenteIngresos['nombreEmpleador'] = $info['nombreEmpleador'];
                break;
                case 'OI':
                    $idFuIng ['idFuenteIngresos'] = $info['idOtrasFuentesIngreso'];
                    $obFuenteIngresos['otrasFuentesIngreso'] = $info['otrasFuentesIngreso'];
                break;
            }
            FuenteIngresos::updateOrCreate($idFuIng,$obFuenteIngresos);
        }
        
    }
    public function guardarInformacionEconomica($infoEconomica){
        $obInfoEcoIni = InformacionEconomicaInicial::updateOrCreate(
            ['idInformacionEconomicaInicial' => $infoEconomica["idInformacionEconomicaInicial"]],
            [
                 'montoIngresos' => $infoEconomica["montoIngresos"],
                 'propositoRC' => $infoEconomica["propositoRC"]
            ]
        );
        if(!empty($infoEconomica["negocioPropio"])){
            $this->guardarFueneIngresos($obInfoEcoIni->idInformacionEconomicaInicial,$infoEconomica["negocioPropio"],"NP");
        }
        if(!empty($infoEconomica["relacionDependencia"])){
            $this->guardarFueneIngresos($obInfoEcoIni->idInformacionEconomicaInicial,$infoEconomica["relacionDependencia"],"RD");
        }
        if(!empty($infoEconomica["otrosIngresos"])){
            $this->guardarFueneIngresos($obInfoEcoIni->idInformacionEconomicaInicial,$infoEconomica["otrosIngresos"],"OI");
        }
        
        return $obInfoEcoIni->idInformacionEconomicaInicial;
    }

    public function guardarProductosServicios($listaProductosServicios,$idDiccionarioFormulario){
        if(!empty($listaProductosServicios)){
            foreach ($listaProductosServicios as  $productoServicio) {
                $obProductoServicio = ProductoServicio::updateOrCreate(
                    ["idProductoServicio"=>$productoServicio["idProductoServicio"]],
                    [
                    'lugar' => $this->guardarLugar($productoServicio["lugar"]),
                    'fecha' => $this->formatoFechaDB($productoServicio["fecha"]),
                    'tipo' => $productoServicio["tipo"],
                    'nombre' => $productoServicio["nombre"],
                    'descripcion' => $productoServicio["descripcion"],
                    'identificador' => $productoServicio["identificador"],
                    'nombreContrata' => $productoServicio["nombreContrata"],
                    'moneda' => $productoServicio["moneda"],
                    'valor' => $productoServicio["valor"]
                    ]
                );
                $idProductoServicio = $obProductoServicio->idProductoServicio;
                foreach ($productoServicio["beneficiarios"] as $beneficiario) {
                     $idBeneficiario =  $this->guardarCamposMinimos($beneficiario);
                     Beneficiario::updateOrCreate([
                                'idProductoServicio' => $idProductoServicio,
                                'idCamposMinimos' =>  $idBeneficiario],[
                                'idProductoServicio' => $idProductoServicio,
                                'idCamposMinimos' =>  $idBeneficiario]
                            );
                }
                // implementar update or create para no duplicar los valores en la tabla diccionario formulario 
                DiccionarioProductoServicio::updateOrCreate([
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'idProductoServicio' => $idProductoServicio,
                ],[
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'idProductoServicio' => $idProductoServicio,
                ]);
            }
        }
    }
    public function formatoFechaDB($fecha){
        return  Carbon::createFromFormat('d/m/Y', $fecha)->format('Y-m-d');
        
    }
    // funciones para crear el archivo json diccionario formulario
    public function formatoFechaJson($fecha){
        return  Carbon::createFromFormat('Y-m-d', $fecha)->format('Ymd');
    }
    public function querylugar($idLugar){
        $arrLugarCM = Lugar::select('lugar.idlugar','pais.codigoPais as pais','departamento.codigoDepartamento as departamento','municipio.codigoMunicipio as municipio', 'pais.nombrePais','departamento.nombreDepartamento','municipio.nombreMunicipio')
                            ->join('pais', 'lugar.pais', '=', 'pais.idPais')
                            ->leftJoin('departamento', 'lugar.departamento', '=', 'departamento.idDepartamento')
                            ->leftJoin('municipio', 'lugar.municipio', '=', 'municipio.idMunicipio')
                            ->where('lugar.idLugar','=',$idLugar)->get()[0];
        return $arrLugarCM;
    }
    public function arrayNacionalidades($idNacionalidad){
        $nacionalidades = [];
       $nacdsAso = Nacionalidad::select('pais.codigoPais')->join('pais','nacionalidad.idPais','=','pais.idPais')->where('nacionalidad.idDatosPersonales','=',$idNacionalidad)->get();
       foreach ($nacdsAso as $naccd) {
           $nacionalidades[]= $naccd["codigoPais"];
       }
       return $nacionalidades;
    }
    public function arrayTelefonos($idDatosPersonales){
        $telefonos = [];
       $querytbTelefonos = Telefono::select('numTelefono')->where('telefono.idDatosPersonales','=',$idDatosPersonales)->get();
       foreach ($querytbTelefonos as $telefono) {
           $telefonos[]= $telefono["numTelefono"];
       }
       return $telefonos;
    }
    public function formatoNit($nit){
        return str_replace("-","",$nit);
    }
    public function formatoDPI($dpi){
        $dpiSinGiones = str_replace("-","",$dpi);
        $dpiSinEspacios = str_replace(" ","",$dpiSinGiones);
        return $dpiSinEspacios;
    }
    
    public function obtenerCodigoPais($idPais){
        return Pais::select("codigoPais")->where('idPais','=',$idPais)->get()[0]["codigoPais"];
    }
    public function queryDatosParienteAsociadoPep($idDatosPersonales){
        $arrParienteAsociadoPep = ParienteAsociadoPep::select('datosParienteAsociadoPep.*')
                            ->join('datosParienteAsociadoPep', 'datosParienteAsociadoPep.idDatosParienteAsociadoPep', '=', 'parienteAsociadoPep.idDatosParienteAsociadoPep')
                            ->where('parienteAsociadoPep.idDatosPersonales','=',$idDatosPersonales)->get();
        foreach($arrParienteAsociadoPep as $dt){
            $dt['paisEntidad'] = $this->obtenerCodigoPais($dt['paisEntidad']);
        }
        return $arrParienteAsociadoPep;
    }
    public function queryDatosPersonales($idDatosPersonales){
                    $datosPersonales = DatosPersonales::where('idDatosPersonales','=',$idDatosPersonales)->get()[0];
                    $datosPersonales["fechaNacimiento"] = $this->formatoFechaJson($datosPersonales["fechaNacimiento"]);
                    $datosPersonales["nacionalidades"] = $this->arrayNacionalidades($datosPersonales["idDatosPersonales"]);
                    $datosPersonales["nacimiento"] = $this->querylugar($datosPersonales["nacimiento"]);
                    $datosPersonales["nit"] = $this->formatoNit($datosPersonales["nit"]);
                    $datosPersonales["numeroDocumentoIdentificacion"] = $this->formatoDPI($datosPersonales["numeroDocumentoIdentificacion"]);
                    if($datosPersonales["tipoDocumentoIdentificacion"] == 'P'){
                        $datosPersonales["emisionPasaporte"] =  $this->obtenerCodigoPais($datosPersonales["emisionPasaporte"]);
                    } else {
                        $datosPersonales["emisionPasaporte"] = "";
                    }
                    $datosPersonales["residencia"] = $this->querylugar($datosPersonales["residencia"]);
                    $datosPersonales["telefonos"] = $this->arrayTelefonos($datosPersonales["idDatosPersonales"]);
                    if($datosPersonales["pep"] == 'S'){
                        $datosPersonales["datosPep"] = DatosPep::where('idDatosPep','=',$datosPersonales["datosPep"])->get()[0];
                        $datosPersonales["datosPep"] ["paisEntidad"] =  $this->obtenerCodigoPais($datosPersonales["datosPep"] ["paisEntidad"]);
                    } else {
                        $datosPersonales["datosPep"] = "";
                    }
                    if($datosPersonales["parienteAsociadoPep"] == 'S'){
                        $datosPersonales["datosParienteAsociadoPep"] = $this->queryDatosParienteAsociadoPep($datosPersonales["idDatosPersonales"]);
                    } else {
                        $datosPersonales["datosParienteAsociadoPep"] = "";
                    }
                    return $datosPersonales;
    }
    public function queryArrayFuenteIngresos($idInfoEco,$tipo){
        $arrFuentIngresos = [];
        $campo = '';
        switch ($tipo) {
            case 'NP':
                $campo = "nombreComercial";
            break;
            case 'RD':
                $campo = "nombreEmpleador";
            break;
            case 'OI':
                $campo = "otrasFuentesIngreso";
            break;
        }
        $queryFuenteIngresos = FuenteIngresos::select($campo)->where('tipo','=',$tipo)->where('idInformacionEconomicaInicial','=',$idInfoEco)->get();
        foreach ($queryFuenteIngresos as $fi) {
          $ob[$campo] = $fi[$campo];
          $arrFuentIngresos[] = $ob;
        }
        return $arrFuentIngresos;
    }
    public function queryInfoEconommicaInicial($infoEconomicaCamposMinimos){
        $obInfoEco = InformacionEconomicaInicial::where('idInformacionEconomicaInicial','=',$infoEconomicaCamposMinimos)->first();
        $obInfoEco["negocioPropio"] = $this->queryArrayFuenteIngresos($obInfoEco->idInformacionEconomicaInicial,'NP');
        $obInfoEco["relacionDependencia"] = $this->queryArrayFuenteIngresos($obInfoEco->idInformacionEconomicaInicial,'RD');
        $obInfoEco["otrosIngresos"] = $this->queryArrayFuenteIngresos($obInfoEco->idInformacionEconomicaInicial,'OI');
        return $obInfoEco;
    }
    public function queryCamposMinimos($id){
         $ObCamposMinimos = CamposMinimos::where('idCamposMinimos','=',$id)->first();
                if($ObCamposMinimos['tipoActuacion'] == 'R'){
                    $ObCamposMinimos["representante"] = $this->queryDatosPersonales($ObCamposMinimos["representante"]);
                }else{
                    $ObCamposMinimos["calidadActua"] = "";
                    $ObCamposMinimos["representante"] = "";
                }

                $ObCamposMinimos["lugar"] = $this->queryLugar($ObCamposMinimos["lugar"]);
                $ObCamposMinimos["fecha"] = $this->formatoFechaJson($ObCamposMinimos["fecha"]);
                $ObCamposMinimos["cliente"] = $this->queryDatosPersonales($ObCamposMinimos["cliente"]);
                $ObCamposMinimos["infoEconomica"] = $this->queryInfoEconommicaInicial($ObCamposMinimos["infoEconomica"]);
        return  $ObCamposMinimos;
    }
    public function queryDicionarioFormulario($id){
            $ObDicFormulario = DiccionarioFormulario::where('idDiccionarioFormulario', '=',$id)->first();

            $ObTitulares = Titular::where('idDiccionarioFormulario', '=', $ObDicFormulario->idDiccionarioFormulario)->get();
            $listaTitulares = [];
            foreach ($ObTitulares as $t) {
                $listaTitulares[] = $this->queryCamposMinimos($t["idCamposMinimos"]);
            }

            $obDiccionarioFormulario = DiccionarioProductoServicio::where('idDiccionarioFormulario','=',$ObDicFormulario->idDiccionarioFormulario)->get();
            $listaProductosServicios = [];
            foreach ($obDiccionarioFormulario as $dc) {
                $obPS = ProductoServicio::where('idProductoServicio','=',$dc["idProductoServicio"])->first();
                $obPS["lugar"] = $this->querylugar($obPS["lugar"]);
                $obPS["fecha"] = $this->formatoFechaJson($obPS["fecha"]);
                $obPS["moneda"] = Moneda::select('codigoMoneda')->where('idMoneda','=',$obPS["moneda"])->first()["codigoMoneda"];
                $listaBeneficiarios = [];
                $obListaBenefifiarios = Beneficiario::where('idProductoServicio','=',$obPS["idProductoServicio"])->get();
                foreach ($obListaBenefifiarios as $beneficiario) {
                    $listaBeneficiarios[] = $this->queryCamposMinimos($beneficiario["idCamposMinimos"]);
                }
                $obPS["beneficiarios"] = $listaBeneficiarios; 
                $listaProductosServicios[] = $obPS;
            }
            $dicFormuario = [
                'idDiccionarioFormulario'=> $ObDicFormulario['idDiccionarioFormulario'],
                'estado'=> $ObDicFormulario['estado'],
                'titulares'=> $listaTitulares,
                'productos'=> $listaProductosServicios,
                'perfilEconomico'=>'perfilEconomico'
            ];
            return $dicFormuario;
    }


    public function diccionarioFormularioJson($id){
        $respuesta = $this->queryDicionarioFormulario($id);
        return Response()->json(
        $respuesta,
        200,
        ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
        JSON_UNESCAPED_UNICODE
        );
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        $dicFormulario = DB::table('listaDiccionarioFormulario')->select('*')->orderBy('idDiccionarioFormulario','desc')->simplePaginate(7);
        return view('contenido.oficioive7122020',compact('dicFormulario'));
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


    public function guardarCamposMinimos($requesCamposMinimos){
        $camposMinimos = [
            'tipoActuacion' => $requesCamposMinimos ["tipoActuacion"],
            'lugar' => $this->guardarLugar($requesCamposMinimos ["lugar"]),
            'fecha' => $this->formatoFechaDB($requesCamposMinimos ["fecha"]),
            'cliente' => $this->guardarDatosPersonales($requesCamposMinimos ["cliente"]),
            'infoEconomica' => $this->guardarInformacionEconomica($requesCamposMinimos ["infoEconomicaInical"]),
            ]; 
            if($camposMinimos["tipoActuacion"] == "R"){
            $camposMinimos["calidadActua"] = $requesCamposMinimos ["calidadActua"];
            $camposMinimos["representante"] =  $this->guardarDatosPersonales($requesCamposMinimos ["representante"]);
        }
        $obcm = CamposMinimos::updateOrCreate([
            'idCamposMinimos'=>$requesCamposMinimos["idCamposMinimos"]
        ],
        $camposMinimos);
        return $obcm->idCamposMinimos;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */   
    public function store(Request $request)
    {
         $camposMinimos = [];
        DB::beginTransaction();
        try {
            // diccionario formulario
            
            $obdFormulario = DiccionarioFormulario::updateOrCreate(
                ['idDiccionarioFormulario'=> $request->idDiccionarioFormulario] ,
                ["estado" => "A"]
            ); 
            $idDiccionarioFormulario = $obdFormulario->idDiccionarioFormulario;

            for ($i = 0; $i < count($request->titulares); $i++) {
                $idCamposMinimos = $this->guardarCamposMinimos($request->titulares[$i]); 
                Titular::updateOrCreate([
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'idCamposMinimos' => $idCamposMinimos,
                ],[
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'idCamposMinimos' => $idCamposMinimos,
                ]);
            }
            $this->guardarProductosServicios($request->productos,$idDiccionarioFormulario);
            $respuesta = $this->queryDicionarioFormulario($idDiccionarioFormulario);

            DB::commit();
            // all good
        } catch (\Exception $e) {
            $respuesta = [
                'error'=> true,
                'mensaje'=> $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'code' => $e->getCode(),
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
        $dFormulario = DiccionarioFormulario::findOrFail($id);
        $dFormulario->estado = 'E';
        $dFormulario->update();
           return Redirect::to('/oficios/7122020');
    }
}
