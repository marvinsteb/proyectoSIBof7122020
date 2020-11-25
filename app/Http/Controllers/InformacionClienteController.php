<?php

namespace App\Http\Controllers;

use App\Models\Beneficiario;
use Illuminate\Http\Request;
use App\Models\CamposMinimos;
use App\Models\CamposMinimosOtrosFirmantes;
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
use App\Models\Municipio;
use App\Models\OtrosFirmantes;
use App\Models\ParienteAsociadoPep;
use App\Models\ProductoServicio;
use App\Models\Titular;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
                    $obpep = DatosPep::updateOrCreate(['idDatosPep'=>$datosPersonales["datospep"]["idDatosPep"]],[
                        'entidad'=> $datosPersonales["datospep"]["entidad"],
                        'puestoDesempenia' => $datosPersonales["datospep"]["puestoDesempenia"],
                        'paisEntidad' => $datosPersonales["datospep"]["paisEntidad"],
                        'origenRiqueza'=> $datosPersonales["datospep"]["origenRiqueza"],
                        'otroOrigenRiqueza'=> $datosPersonales["datospep"]["otroOrigenRiqueza"],
                    ]);
                        $camposMinimos['datosPep'] = $obpep->idDatosPep;
                }else{
                    $camposMinimos['datosPep'] = null;
                    //implementar un trigger para eliminar los datos pep;
                }
                $obdatos= DatosPersonales::updateOrCreate([
                    'idDatosPersonales'=>$datosPersonales["idDatosPersonales"]
                ],
                $camposMinimos);
                $idClienteCamposMinimos = $obdatos->idDatosPersonales;
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
                 $listaTelefonos = Telefono::where('idDatosPersonales','=',$idClienteCamposMinimos)->get()->pluck('idTelefono','idTelefono')->toArray();
                  for ($a = 0; $a < count($telefonosTitulares); $a++) {
                      $obT = Telefono::updateOrCreate([
                          'idDatosPersonales' => $idClienteCamposMinimos,
                          'numTelefono' => $telefonosTitulares[$a]
                      ]);
                     if (!empty($listaTelefonos[$obT->idTelefono])) {
                        unset($listaTelefonos[$obT->idTelefono]);
                     }
                  }
                  if (count($listaTelefonos)) {
                        Telefono::whereRaw(sprintf('idTelefono IN (%s)', implode(',', $listaTelefonos)))->delete();
                    }

                  $nacionalidadTitulares = $datosPersonales["nacionalidades"];
                  $listaNacionalidad = Nacionalidad::where('idDatosPersonales','=',$idClienteCamposMinimos)->get()->pluck('idNacionalidad','idNacionalidad')->toArray();
                  foreach ($nacionalidadTitulares as $nacionalidad) { 
                     $obN = Nacionalidad::updateOrCreate([
                          'idDatosPersonales' => $idClienteCamposMinimos,
                          'idPais' => $nacionalidad
                          ]);
                     if (!empty($listaNacionalidad[$obN->idNacionalidad])) {
                        unset($listaNacionalidad[$obN->idNacionalidad]);
                     }
                  }
                 if (count($listaNacionalidad)) {
                        Nacionalidad::whereRaw(sprintf('idNacionalidad IN (%s)', implode(',', $listaNacionalidad)))->delete();
                 }
                  return $idClienteCamposMinimos;
    }
    public function guardarFueneIngresos($id,$fuenteIng,$tipo){
        
        //FuenteIngresos::where('idInformacionEconomicaInicial','=',$id)->delete();
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
            $createdOrUpdated = FuenteIngresos::updateOrCreate($obFuenteIngresos,$obFuenteIngresos);
            //  if (!empty($listaFuenteIngresos[$createdOrUpdated->idFuenteIngresos])) {
            //         unset($listaFuenteIngresos[$createdOrUpdated->idFuenteIngresos]);
            //  }
        }

        //      if (count($listaFuenteIngresos)) {
        //      FuenteIngresos::whereRaw(sprintf('idFuenteIngresos IN (%s)', implode(',', $listaFuenteIngresos)))->delete();

        //      /* Alternatively you could use 
        //      *     Model::whereIn('id', $usersRoleToDelete)->delete();
        //      *  if the amount of ids is smaller than the maximum PDO arguments allowed
        //      */
        //  }

    }
    public function guardarInformacionEconomica($infoEconomica){
        $obInfoEcoIni = InformacionEconomicaInicial::updateOrCreate(
            ['idInformacionEconomicaInicial' => $infoEconomica["idInformacionEconomicaInicial"]],
            [
                 'montoIngresos' => $infoEconomica["montoIngresos"],
                 'propositoRC' => $infoEconomica["propositoRC"]
            ]
        );
        // $listaFuenteIngresos = FuenteIngresos::where('idInformacionEconomicaInicial','=',$obInfoEcoIni->idInformacionEconomicaInicial)->get()->pluck('idFuenteIngresos','idFuenteIngresos')->toArray();
        $listaFuenteIngresos = FuenteIngresos::where('idInformacionEconomicaInicial','=',$obInfoEcoIni->idInformacionEconomicaInicial)->delete();
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
                if(!empty($productoServicio["beneficiarios"])){                   
                    foreach ($productoServicio["beneficiarios"] as $beneficiario) {
                         $idBeneficiario =  $this->guardarCamposMinimos($beneficiario);
                         Beneficiario::updateOrCreate([
                                    'idProductoServicio' => $idProductoServicio,
                                    'idCamposMinimos' =>  $idBeneficiario],[
                                    'idProductoServicio' => $idProductoServicio,
                                    'idCamposMinimos' =>  $idBeneficiario]
                                );
                    }
                }
                if(!empty($productoServicio["otrosFirmantes"])){
                    foreach ($productoServicio["otrosFirmantes"] as $of) {
                        $idOtrosFirmantes =  $this->guardarCamposMinimosFirmante($of);
                        OtrosFirmantes::updateOrCreate([
                                    'idProductoServicio' => $idProductoServicio,
                                    'idCamposMinimosFirmante' =>  $idBeneficiario],[
                                    'idProductoServicio' => $idProductoServicio,
                                    'idCamposMinimosFirmante' =>  $idOtrosFirmantes
                        ]);
                    }
                }
                //otrosFirmantes
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
    public function queryCamposMinimosOtrosFirmantes($id){
        $ObCamposMinimosOtrosFirmantes = CamposMinimosOtrosFirmantes::where('idCamposMinimosFirmante','=',$id)->first();
                if($ObCamposMinimosOtrosFirmantes['tipoActuacion'] == 'R'){
                     $ObCamposMinimosOtrosFirmantes["representante"] = $this->queryDatosPersonales($ObCamposMinimosOtrosFirmantes["representante"]);
                }else{
                     $ObCamposMinimosOtrosFirmantes["calidadActua"] = "";
                     $ObCamposMinimosOtrosFirmantes["representante"] = "";
                }

                 $ObCamposMinimosOtrosFirmantes["lugar"] = $this->queryLugar($ObCamposMinimosOtrosFirmantes["lugar"]);
                 $ObCamposMinimosOtrosFirmantes["fecha"] = $this->formatoFechaJson($ObCamposMinimosOtrosFirmantes["fecha"]);
                 $ObCamposMinimosOtrosFirmantes["firmante"] = $this->queryDatosPersonales($ObCamposMinimosOtrosFirmantes["firmante"]);
        return  $ObCamposMinimosOtrosFirmantes;
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
                $listaOtrosFirmantes = [];
                $obListaBenefifiarios = Beneficiario::where('idProductoServicio','=',$obPS["idProductoServicio"])->get();
                foreach ($obListaBenefifiarios as $beneficiario) {
                    $listaBeneficiarios[] = $this->queryCamposMinimos($beneficiario["idCamposMinimos"]);
                }
                $obListaOtrosFirmantes = OtrosFirmantes::where('idProductoServicio','=',$obPS["idProductoServicio"])->get();
                foreach($obListaOtrosFirmantes as $otroFirmante){
                    $listaOtrosFirmantes[] = $this->queryCamposMinimosOtrosFirmantes($otroFirmante["idCamposMinimosFirmante"]);
                } 
                $obPS["beneficiarios"] = $listaBeneficiarios; 
                $obPS["otrosFirmantes"] = $listaOtrosFirmantes; 
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
        $dicFormulario = DB::table('listaDiccionarioFormulario')->select('*')->where('idUser','=',Auth::id())->orderBy('idDiccionarioFormulario','desc')->simplePaginate(7);
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
    public function guardarCamposMinimosFirmante($requesCamposMinimosFirmante){
        $camposMinimosFirmante = [
            'tipoActuacion' => $requesCamposMinimosFirmante ["tipoActuacion"],
            'lugar' => $this->guardarLugar($requesCamposMinimosFirmante ["lugar"]),
            'fecha' => $this->formatoFechaDB($requesCamposMinimosFirmante ["fecha"]),
            'firmante' => $this->guardarDatosPersonales($requesCamposMinimosFirmante ["cliente"]),
            ]; 
            if($camposMinimosFirmante["tipoActuacion"] == "R"){
            $camposMinimosFirmante["calidadActua"] = $requesCamposMinimosFirmante ["calidadActua"];
            $camposMinimosFirmante["representante"] =  $this->guardarDatosPersonales($requesCamposMinimosFirmante ["representante"]);
        }
        $obcm = CamposMinimosOtrosFirmantes::updateOrCreate([
            'idCamposMinimosFirmante'=>$requesCamposMinimosFirmante["idCamposMinimos"]
        ],
        $camposMinimosFirmante);
        return $obcm->idCamposMinimosFirmante;
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
                ['idDiccionarioFormulario'=> $request->iddiccionarioFormulario],
                [
                    "estado" => "A",
                    "idUser" =>  Auth::id(),
                ]
            ); 
            $idDiccionarioFormulario = $obdFormulario->idDiccionarioFormulario;
            $listaTitular = Titular::where('idDiccionarioFormulario','=',$idDiccionarioFormulario)->get()->pluck('idTitular','idTitular')->toArray();
            for ($i = 0; $i < count($request->titulares); $i++) {
                $idCamposMinimos = $this->guardarCamposMinimos($request->titulares[$i]); 
                $obT = Titular::updateOrCreate([
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'idCamposMinimos' => $idCamposMinimos,
                ],[
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'idCamposMinimos' => $idCamposMinimos,
                ]);
                if (!empty($listaTitular[$obT->idTitular])) {
                    unset($listaTitular[$obT->idTitular]);
                    }
            }
            if (count($listaTitular)) {
                Titular::whereRaw(sprintf('idTitular IN (%s)', implode(',', $listaTitular)))->delete();
            }
             $respuesta = [
                'Status'=> 'Success',
                'DiccionarioFormulario'=> $this->queryDicionarioFormulario($idDiccionarioFormulario),
            ];
            $this->guardarProductosServicios($request->productos,$idDiccionarioFormulario);

            DB::commit();
            // all good
        } catch (\Exception $e) {
            $respuesta = [
                'Status'=> 'Error',
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
        $paises = DB::table('pais');
        $paises = $paises->get();

        $departamentos = DB::table('departamento');
        $departamentos = $departamentos->get();
        $municipios = Municipio::all();
        $listaCondicionMigratoria = DB::table('listaCondicionMigratoria');
        $listaCondicionMigratoria = $listaCondicionMigratoria->get();
        $dc = $this->queryDicionarioFormulario($id);

        return view('contenido.diccionarioFormularioedit', [
            'paises' => $paises,
            'departamentos' => $departamentos,
            'municipios' => $municipios,
            'listaCondicionMigratoria' => $listaCondicionMigratoria,
            "dc"=>$dc
        ]);
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
