<?php

namespace App\Http\Controllers;

use App\Models\Beneficiario;
use Illuminate\Http\Request;
use App\Models\CamposMinimos;
use App\Models\CamposMinimosOtrosFirmantes;
use App\Models\DatosParienteAsociadoPep;
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
use App\Models\PerfilEconomicoNegocioPropio;
use App\Models\PerfilEconomicoRelacionDependencia;
use App\Models\PerfilEconomicoTransaccional;
use App\Models\ProductoServicio;
use App\Models\Titular;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class InformacionClienteController extends Controller
{
    public function guardarLugar($lugar)
    {
        DB::table('lugar')->updateOrInsert([
            "pais" => $lugar["pais"],
            "departamento" => $lugar["departamento"],
            "municipio" => $lugar["municipio"],
        ]);
        $obLugar = DB::table('lugar')
            ->where('pais', $lugar["pais"])
            ->where('departamento', $lugar["departamento"])
            ->where('municipio', $lugar["municipio"])
            ->first();

        return $obLugar->idLugar;
    }
    public function guardarDatosPersonales($datosPersonales)
    {

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
        if ($camposMinimos["pep"] == "S") {
            $obpep = DatosPep::updateOrCreate(['idDatosPep' => $datosPersonales["datospep"]["idDatosPep"]], [
                'entidad' => $datosPersonales["datospep"]["entidad"],
                'puestoDesempenia' => $datosPersonales["datospep"]["puestoDesempenia"],
                'paisEntidad' => $datosPersonales["datospep"]["paisEntidad"],
                'origenRiqueza' => $datosPersonales["datospep"]["origenRiqueza"],
                'otroOrigenRiqueza' => $datosPersonales["datospep"]["otroOrigenRiqueza"],
            ]);
            $camposMinimos['datosPep'] = $obpep->idDatosPep;
        } else {
            $camposMinimos['datosPep'] = null;
            //implementar un trigger para eliminar los datos pep;
        }
        $obdatos = DatosPersonales::updateOrCreate(
            [
                'idDatosPersonales' => $datosPersonales["idDatosPersonales"]
            ],
            $camposMinimos
        );
        $idClienteCamposMinimos = $obdatos->idDatosPersonales;
        $listaParienteAsoPep = ParienteAsociadoPep::where('idDatosPersonales', '=', $idClienteCamposMinimos)->get()->pluck('idParienteAsociadoPep', 'idParienteAsociadoPep')->toArray();
        if ($camposMinimos["parienteAsociadoPep"] == 'S') {
            $arrayDatosParienteAsociadoPep = $datosPersonales["datosParienteAsociadoPep"];

            foreach ($arrayDatosParienteAsociadoPep as $parienteAsociadoPep) {
                $datos = $parienteAsociadoPep;
                $datos["segundoApellido"] = empty($datos["segundoApellido"]) ? 'SOA' : $datos["segundoApellido"];
                $datos["segundoNombre"] = empty($datos["segundoNombre"]) ? 'SON' : $datos["segundoNombre"];
                $idDatosParAsoPep = DatosParienteAsociadoPep::updateOrCreate(['idDatosParienteAsociadoPep' => $datos["idDatosParienteAsociadoPep"]], $datos);
                $oPAP = ParienteAsociadoPep::updateOrCreate([
                    'idDatosPersonales' => $idClienteCamposMinimos,
                    'idDatosParienteAsociadoPep' => $idDatosParAsoPep->idDatosParienteAsociadoPep
                ]);
                if (!empty($listaParienteAsoPep[$oPAP->idParienteAsociadoPep])) {
                    unset($listaParienteAsoPep[$oPAP->idParienteAsociadoPep]);
                }
            }
            if (count($listaParienteAsoPep)) {
                ParienteAsociadoPep::whereRaw(sprintf('idParienteAsociadoPep IN (%s)', implode(',', $listaParienteAsoPep)))->delete();
            }
        } else {
            if (count($listaParienteAsoPep)) {
                ParienteAsociadoPep::whereRaw(sprintf('idParienteAsociadoPep IN (%s)', implode(',', $listaParienteAsoPep)))->delete();
            }
        }



        $telefonosTitulares = $datosPersonales["telefonos"];
        $listaTelefonos = Telefono::where('idDatosPersonales', '=', $idClienteCamposMinimos)->get()->pluck('idTelefono', 'idTelefono')->toArray();
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
        $listaNacionalidad = Nacionalidad::where('idDatosPersonales', '=', $idClienteCamposMinimos)->get()->pluck('idNacionalidad', 'idNacionalidad')->toArray();
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
    public function guardarFueneIngresos($id, $fuenteIng, $tipo)
    {

        //FuenteIngresos::where('idInformacionEconomicaInicial','=',$id)->delete();
        foreach ($fuenteIng as $info) {
            $idFuIng = [];
            $obFuenteIngresos = [
                'idInformacionEconomicaInicial' => $id,
                'tipo' => $tipo,
                'nombreComercial' => null,
                'nombreEmpleador' => null,
                'otrasFuentesIngreso' => null,
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
                    $idFuIng['idFuenteIngresos'] = $info['idOtrasFuentesIngreso'];
                    $obFuenteIngresos['otrasFuentesIngreso'] = $info['otrasFuentesIngreso'];
                    break;
            }
            $createdOrUpdated = FuenteIngresos::updateOrCreate($obFuenteIngresos, $obFuenteIngresos);
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
    public function guardarInformacionEconomica($infoEconomica)
    {
        $obInfoEcoIni = InformacionEconomicaInicial::updateOrCreate(
            ['idInformacionEconomicaInicial' => $infoEconomica["idInformacionEconomicaInicial"]],
            [
                'montoIngresos' => $infoEconomica["montoIngresos"],
                'propositoRC' => $infoEconomica["propositoRC"]
            ]
        );
        // $listaFuenteIngresos = FuenteIngresos::where('idInformacionEconomicaInicial','=',$obInfoEcoIni->idInformacionEconomicaInicial)->get()->pluck('idFuenteIngresos','idFuenteIngresos')->toArray();
        $listaFuenteIngresos = FuenteIngresos::where('idInformacionEconomicaInicial', '=', $obInfoEcoIni->idInformacionEconomicaInicial)->delete();
        if (!empty($infoEconomica["negocioPropio"])) {
            $this->guardarFueneIngresos($obInfoEcoIni->idInformacionEconomicaInicial, $infoEconomica["negocioPropio"], "NP");
        }
        if (!empty($infoEconomica["relacionDependencia"])) {
            $this->guardarFueneIngresos($obInfoEcoIni->idInformacionEconomicaInicial, $infoEconomica["relacionDependencia"], "RD");
        }
        if (!empty($infoEconomica["otrosIngresos"])) {
            $this->guardarFueneIngresos($obInfoEcoIni->idInformacionEconomicaInicial, $infoEconomica["otrosIngresos"], "OI");
        }

        return $obInfoEcoIni->idInformacionEconomicaInicial;
    }
    public function guardarPerfilEconomicoTransaccional($perEco,$idDiccionarioFormulario){
        if (!empty($perEco)){
            $obpet =PerfilEconomicoTransaccional::updateOrCreate(
                ['idPerfilEconomicoTransaccional'=>$perEco["idPerfilEconomicoTransaccional"]],
                [
                    'idDiccionarioFormulario'=>$idDiccionarioFormulario,
                    'actualizacion'=>$perEco["actualizacion"],
                    'fecha'=>$this->formatoFechaDB($perEco["fecha"])
                ]);
            $idObpet = $obpet->idPerfilEconomicoTransaccional;
            

            // negocio propio 
            $listapenp = PerfilEconomicoNegocioPropio::where('idPerfilEconomicoTransaccional', '=',  $idObpet)->get()->pluck('idDiccionarioPerfilEconomicoNegocioPropio', 'idDiccionarioPerfilEconomicoNegocioPropio')->toArray();
            if(!empty($perEco["negocioPropio"])){
                foreach ($perEco["negocioPropio"] as $ngp) {
                    $obpenp = PerfilEconomicoNegocioPropio::updateOrCreate(
                        [
                            'idDiccionarioPerfilEconomicoNegocioPropio'=>$ngp['idDiccionarioPerfilEconomicoNegocioPropio']
                        ],
                        [
                            'idPerfilEconomicoTransaccional'=>$idObpet,
                            'nombreComercial'=>$ngp["nombreComercial"],
                            'principalActividadEconomica'=>$ngp["principalActividadEconomica"],
                            'fechaInscripcionNegocio'=>$this->formatoFechaDB($ngp["fechaInscripcionNegocio"]),
                            'numeroRegistro'=>$ngp["numeroRegistro"],
                            'folio'=>$ngp["folio"],
                            'libro'=>$ngp["libro"],
                            'direccionNegocio'=>$ngp["direccionNegocio"],
                            'lugar'=>$this->guardarLugar($ngp["lugar"]),
                            'tipoMoneda'=>$ngp["tipoMoneda"],
                            'montoAproximado'=>$ngp["montoAproximado"]
                        ]
                    );
                    if (!empty($listapenp[$obpenp->idDiccionarioPerfilEconomicoNegocioPropio])) {
                        unset($listapenp[$obpenp->idDiccionarioPerfilEconomicoNegocioPropio]);
                    }
                }
                if (count($listapenp)) {
                    PerfilEconomicoNegocioPropio::whereRaw(sprintf('idDiccionarioPerfilEconomicoNegocioPropio IN (%s)', implode(',', $listapenp)))->delete();
                }
            }else{
                if (count($listapenp)) {
                    PerfilEconomicoNegocioPropio::whereRaw(sprintf('idDiccionarioPerfilEconomicoNegocioPropio IN (%s)', implode(',', $listapenp)))->delete();
                }
            }
            //relacion de dependencia 
            $listaPerfilErd = PerfilEconomicoRelacionDependencia::where('idPerfilEconomicoTransaccional', '=',  $idObpet)->get()->pluck('idPerfilEconommicoRelacionDependencia', 'idPerfilEconommicoRelacionDependencia')->toArray();
            if(!empty($perEco["relacionDependencia"])){
                foreach ($perEco["relacionDependencia"] as $prd) {
                    $oprd = PerfilEconomicoRelacionDependencia::updateOrCreate(
                        [
                            'idPerfilEconommicoRelacionDependencia'=>$prd['idPerd']
                        ],
                        [
                            'idPerfilEconomicoTransaccional' => $idObpet,
                            'sector' =>  $prd["sector"],
                            'nombreEmpleador' => $prd["nombreEmpleador"],
                            'principalActividadEconomicaEmpleador' => $prd["priActEcoE"],
                            'puestoDesempenia' => $prd["puestoDesempenia"],
                            'direccionEmpleador' => $prd["direccionEmpleador"],
                            'lugar' => $this->guardarLugar($prd["lugar"]),
                            'tipoMoneda'=>$prd["tipoMoneda"],
                            'montoAproximado'=>$prd["montoAproximado"]
                        ]
                    );
                    if (!empty($listaPerfilErd[$oprd->idPerfilEconommicoRelacionDependencia])) {
                        unset($listaPerfilErd[$oprd->idPerfilEconommicoRelacionDependencia]);
                    }
                }
                if (count($listaPerfilErd)) {
                    PerfilEconomicoRelacionDependencia::whereRaw(sprintf('idPerfilEconommicoRelacionDependencia IN (%s)', implode(',', $listaPerfilErd)))->delete();
                }
            }else{
                if (count($listaPerfilErd)) {
                    PerfilEconomicoRelacionDependencia::whereRaw(sprintf('idPerfilEconommicoRelacionDependencia IN (%s)', implode(',', $listaPerfilErd)))->delete();
                }
            }

        }
    }
    public function guardarProductosServicios($listaProductosServicios, $idDiccionarioFormulario)
    {
        $listaProductos = DiccionarioProductoServicio::where('idDiccionarioFormulario', '=', $idDiccionarioFormulario)->get()->pluck('idDiccionarioProductoServicio', 'idDiccionarioProductoServicio')->toArray();
        if (!empty($listaProductosServicios)) {
            foreach ($listaProductosServicios as  $productoServicio) {
                $obProductoServicio = ProductoServicio::updateOrCreate(
                    ["idProductoServicio" => $productoServicio["idProductoServicio"]],
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
                //Beneficiarios
                $listaBenef = Beneficiario::where('idProductoServicio', '=', $idProductoServicio)->get()->pluck('idBeneficiario', 'idBeneficiario')->toArray();
                if (!empty($productoServicio["beneficiarios"])) {
                    foreach ($productoServicio["beneficiarios"] as $beneficiario) {
                        $idBeneficiario =  $this->guardarCamposMinimos($beneficiario);
                       $obB =  Beneficiario::updateOrCreate([
                            'idProductoServicio' => $idProductoServicio,
                            'idCamposMinimos' =>  $idBeneficiario
                        ], [
                            'idProductoServicio' => $idProductoServicio,
                            'idCamposMinimos' =>  $idBeneficiario
                        ]);
                        if (!empty($listaBenef[$obB->idBeneficiario])) {
                            unset($listaBenef[$obB->idBeneficiario]);
                        }
                    }
                    if (count($listaBenef)) {
                        Beneficiario::whereRaw(sprintf('idBeneficiario IN (%s)', implode(',', $listaBenef)))->delete();
                    }
                }else{
                        if (count($listaBenef)) {
                            Beneficiario::whereRaw(sprintf('idBeneficiario IN (%s)', implode(',', $listaBenef)))->delete();
                        }
                }
                //otros firmantes
                $listaOtFi = OtrosFirmantes::where('idProductoServicio', '=', $idProductoServicio)->get()->pluck('idOtrosFirmantes', 'idOtrosFirmantes')->toArray();
                if (!empty($productoServicio["otrosFirmantes"])) {
                    foreach ($productoServicio["otrosFirmantes"] as $of) {
                        $idOtrosFirmantes =  $this->guardarCamposMinimosFirmante($of);
                       $oOF =  OtrosFirmantes::updateOrCreate([
                            'idCamposMinimosFirmante' =>  $idOtrosFirmantes,
                            'idProductoServicio' => $idProductoServicio
                        ], [
                            'idCamposMinimosFirmante' =>  $idOtrosFirmantes,
                            'idProductoServicio' => $idProductoServicio
                        ]);
                        if (!empty($listaOtFi[$oOF->idOtrosFirmantes])) {
                            unset($listaOtFi[$oOF->idOtrosFirmantes]);
                        }
                    }
                    if (count($listaOtFi)) {
                        OtrosFirmantes::whereRaw(sprintf('idOtrosFirmantes IN (%s)', implode(',', $listaOtFi)))->delete();
                    }
                }else {
                    if (count($listaOtFi)) {
                        OtrosFirmantes::whereRaw(sprintf('idOtrosFirmantes IN (%s)', implode(',', $listaOtFi)))->delete();
                    }
                } 
                $obPS = DiccionarioProductoServicio::updateOrCreate([
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'idProductoServicio' => $idProductoServicio,
                ]);
                if (!empty($listaProductos[$obPS->idDiccionarioProductoServicio])) {
                    unset($listaProductos[$obPS->idDiccionarioProductoServicio]);
                }
            }
             if (count($listaProductos)) {
                DiccionarioProductoServicio::whereRaw(sprintf('idDiccionarioProductoServicio IN (%s)', implode(',', $listaProductos)))->delete();
            }
        }else{
             if (count($listaProductos)) {
                DiccionarioProductoServicio::whereRaw(sprintf('idDiccionarioProductoServicio IN (%s)', implode(',', $listaProductos)))->delete();
            }
        }
    }
    public function formatoFechaDB($fecha)
    {
        return  Carbon::createFromFormat('d/m/Y', $fecha)->format('Y-m-d');
    }
    // funciones para crear el archivo json diccionario formulario
    public function formatoFechaJson($fecha)
    {
        return  Carbon::createFromFormat('Y-m-d', $fecha)->format('Ymd');
    }
    public function querylugar($idLugar, $jsonive)
    {
        $arrLugarCM = Lugar::select('lugar.idlugar', 'pais.codigoPais as pais', 'departamento.codigoDepartamento as departamento', 'municipio.codigoMunicipio as municipio', 'pais.nombrePais', 'departamento.nombreDepartamento', 'municipio.nombreMunicipio')
            ->join('pais', 'lugar.pais', '=', 'pais.idPais')
            ->leftJoin('departamento', 'lugar.departamento', '=', 'departamento.idDepartamento')
            ->leftJoin('municipio', 'lugar.municipio', '=', 'municipio.idMunicipio')
            ->where('lugar.idLugar', '=', $idLugar)->get()[0];
        if ($arrLugarCM["pais"] != 'GT') {
            $arrLugarCM["departamento"] = "";
            $arrLugarCM["municipio"] = "";
        }
        if ($jsonive) {
            unset($arrLugarCM["idlugar"]);
            unset($arrLugarCM["nombrePais"]);
            unset($arrLugarCM["nombreDepartamento"]);
            unset($arrLugarCM["nombreMunicipio"]);
        }
        return $arrLugarCM;
    }
    public function arrayNacionalidades($idNacionalidad)
    {
        $nacionalidades = [];
        $nacdsAso = Nacionalidad::select('pais.codigoPais')->join('pais', 'nacionalidad.idPais', '=', 'pais.idPais')->where('nacionalidad.idDatosPersonales', '=', $idNacionalidad)->get();
        foreach ($nacdsAso as $naccd) {
            $nacionalidades[] = $naccd["codigoPais"];
        }
        return $nacionalidades;
    }
    public function arrayTelefonos($idDatosPersonales)
    {
        $telefonos = [];
        $querytbTelefonos = Telefono::select('numTelefono')->where('telefono.idDatosPersonales', '=', $idDatosPersonales)->get();
        foreach ($querytbTelefonos as $telefono) {
            $telefonos[] = $telefono["numTelefono"];
        }
        return $telefonos;
    }
    public function formatoNit($nit)
    {
        return str_replace("-", "", $nit);
    }
    public function formatoDPI($dpi)
    {
        $dpiSinGiones = str_replace("-", "", $dpi);
        $dpiSinEspacios = str_replace(" ", "", $dpiSinGiones);
        return $dpiSinEspacios;
    }

    public function obtenerCodigoPais($idPais)
    {
        return Pais::select("codigoPais")->where('idPais', '=', $idPais)->get()[0]["codigoPais"];
    }
    public function queryDatosParienteAsociadoPep($idDatosPersonales,$jsonive)
    {
        $arrParienteAsociadoPep = ParienteAsociadoPep::select('datosParienteAsociadoPep.*')
            ->join('datosParienteAsociadoPep', 'datosParienteAsociadoPep.idDatosParienteAsociadoPep', '=', 'parienteAsociadoPep.idDatosParienteAsociadoPep')
            ->where('parienteAsociadoPep.idDatosPersonales', '=', $idDatosPersonales)->get();
        foreach ($arrParienteAsociadoPep as $dt) {
            $dt['paisEntidad'] = $this->obtenerCodigoPais($dt['paisEntidad']);
            if ($dt["apellidoCasada"] == null) {
                $dt["apellidoCasada"] = "";
            }
            if ($dt["otrosNombres"] == null) {
                $dt["otrosNombres"] = "";
            }
            if($jsonive){
                unset($dt["idDatosParienteAsociadoPep"]);
            }
        }
        return $arrParienteAsociadoPep;
    }
    public function queryDatosPersonales($idDatosPersonales, $jsonive)
    {
        $datosPersonales = DatosPersonales::where('idDatosPersonales', '=', $idDatosPersonales)->get()[0];
        $datosPersonales["fechaNacimiento"] = $this->formatoFechaJson($datosPersonales["fechaNacimiento"]);
        $datosPersonales["nacionalidades"] = $this->arrayNacionalidades($datosPersonales["idDatosPersonales"]);
        $datosPersonales["nacimiento"] = $this->querylugar($datosPersonales["nacimiento"], $jsonive);
        $datosPersonales["nit"] = $this->formatoNit($datosPersonales["nit"]);
        $datosPersonales["numeroDocumentoIdentificacion"] = $this->formatoDPI($datosPersonales["numeroDocumentoIdentificacion"]);
        if ($datosPersonales["tipoDocumentoIdentificacion"] == 'P') {
            $datosPersonales["emisionPasaporte"] =  $this->obtenerCodigoPais($datosPersonales["emisionPasaporte"]);
        } else {
            $datosPersonales["emisionPasaporte"] = "";
        }
        $datosPersonales["residencia"] = $this->querylugar($datosPersonales["residencia"], $jsonive);
        $datosPersonales["telefonos"] = $this->arrayTelefonos($datosPersonales["idDatosPersonales"]);
        if ($datosPersonales["pep"] == 'S') {
            $datosPersonales["datosPep"] = DatosPep::where('idDatosPep', '=', $datosPersonales["datosPep"])->get()[0];
            $datosPersonales["datosPep"]["paisEntidad"] =  $this->obtenerCodigoPais($datosPersonales["datosPep"]["paisEntidad"]);
            if ($jsonive) {
                unset($datosPersonales["datosPep"]["idDatosPep"]);
            }
        } else {
            $datosPersonales["datosPep"] = "";
        }
        if ($datosPersonales["parienteAsociadoPep"] == 'S') {
            $datosPersonales["datosParienteAsociadoPep"] = $this->queryDatosParienteAsociadoPep($datosPersonales["idDatosPersonales"],$jsonive);
        } else {
            $datosPersonales["datosParienteAsociadoPep"] = "";
        }
        if ($datosPersonales["apellidoCasada"] == null) {
            $datosPersonales["apellidoCasada"] = "";
        }
        if ($datosPersonales["otrosNombres"] == null) {
            $datosPersonales["otrosNombres"] = "";
        }
        if ($datosPersonales["condicionMigratoria"] == null) {
            $datosPersonales["condicionMigratoria"] = "";
        }
        if ($datosPersonales["otraCondicionMigratoria"] == null) {
            $datosPersonales["otraCondicionMigratoria"] = "";
        }
        if ($datosPersonales["email"] == null) {
            $datosPersonales["email"] = "";
        }
        if ($datosPersonales["nit"] == null) {
            $datosPersonales["nit"] = "";
        }
        if ($jsonive) {
            unset($datosPersonales["idDatosPersonales"]);
        }
        return $datosPersonales;
    }
    public function queryArrayFuenteIngresos($idInfoEco, $tipo)
    {
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
        $queryFuenteIngresos = FuenteIngresos::select($campo)->where('tipo', '=', $tipo)->where('idInformacionEconomicaInicial', '=', $idInfoEco)->get();
        foreach ($queryFuenteIngresos as $fi) {
            $ob[$campo] = $fi[$campo];
            $arrFuentIngresos[] = $ob;
        }
        return $arrFuentIngresos;
    }
    public function queryInfoEconommicaInicial($infoEconomicaCamposMinimos, $jsonive)
    {
        $obInfoEco = InformacionEconomicaInicial::where('idInformacionEconomicaInicial', '=', $infoEconomicaCamposMinimos)->first();
        $obInfoEco["negocioPropio"] = $this->queryArrayFuenteIngresos($obInfoEco->idInformacionEconomicaInicial, 'NP');
        $obInfoEco["relacionDependencia"] = $this->queryArrayFuenteIngresos($obInfoEco->idInformacionEconomicaInicial, 'RD');
        $obInfoEco["otrosIngresos"] = $this->queryArrayFuenteIngresos($obInfoEco->idInformacionEconomicaInicial, 'OI');
        if($jsonive){
            unset($obInfoEco["idInformacionEconomicaInicial"]);
        }
        return $obInfoEco;
    }
    public function queryCamposMinimos($id, $jsonive)
    {
        $ObCamposMinimos = CamposMinimos::where('idCamposMinimos', '=', $id)->first();
        if ($ObCamposMinimos['tipoActuacion'] == 'R') {
            $ObCamposMinimos["representante"] = $this->queryDatosPersonales($ObCamposMinimos["representante"], $jsonive);
        } else {
            $ObCamposMinimos["calidadActua"] = "";
            $ObCamposMinimos["representante"] = "";
        }

        $ObCamposMinimos["lugar"] = $this->queryLugar($ObCamposMinimos["lugar"], $jsonive);
        $ObCamposMinimos["fecha"] = $this->formatoFechaJson($ObCamposMinimos["fecha"]);
        $ObCamposMinimos["cliente"] = $this->queryDatosPersonales($ObCamposMinimos["cliente"], $jsonive);
        $ObCamposMinimos["infoEconomica"] = $this->queryInfoEconommicaInicial($ObCamposMinimos["infoEconomica"], $jsonive);

        if ($jsonive) {
            unset($ObCamposMinimos["idCamposMinimos"]);
        }
        return  $ObCamposMinimos;
    }
    public function queryCamposMinimosOtrosFirmantes($id, $jsonive)
    {
        $ObCamposMinimosOtrosFirmantes = CamposMinimosOtrosFirmantes::where('idCamposMinimosFirmante', '=', $id)->first();
        if ($ObCamposMinimosOtrosFirmantes['tipoActuacion'] == 'R') {
            $ObCamposMinimosOtrosFirmantes["representante"] = $this->queryDatosPersonales($ObCamposMinimosOtrosFirmantes["representante"], $jsonive);
        } else {
            $ObCamposMinimosOtrosFirmantes["calidadActua"] = "";
            $ObCamposMinimosOtrosFirmantes["representante"] = "";
        }

        $ObCamposMinimosOtrosFirmantes["lugar"] = $this->queryLugar($ObCamposMinimosOtrosFirmantes["lugar"], $jsonive);
        $ObCamposMinimosOtrosFirmantes["fecha"] = $this->formatoFechaJson($ObCamposMinimosOtrosFirmantes["fecha"]);
        $ObCamposMinimosOtrosFirmantes["firmante"] = $this->queryDatosPersonales($ObCamposMinimosOtrosFirmantes["firmante"], $jsonive);
        if($jsonive){
            unset($ObCamposMinimosOtrosFirmantes["idCamposMinimosFirmante"]);
        }
        return  $ObCamposMinimosOtrosFirmantes;
    }
    public function queryPerfilEconomicoNegocioPropio($idPerfilEconomicoTransaccional,$jsonive){
        $arrNgp = [];
        $listaObNegoP = PerfilEconomicoNegocioPropio::where('idPerfilEconomicoTransaccional',$idPerfilEconomicoTransaccional)->get();
        foreach ($listaObNegoP as $obngp) {
            $obngp["lugar"] = $this->querylugar($obngp["lugar"],$jsonive);
            $obngp["fechaInscripcionNegocio"] = $this->formatoFechaJson($obngp["fechaInscripcionNegocio"]);
            if($jsonive){
                $obngp['ingresos'] = [
                    'tipoMoneda'=>$obngp['tipoMoneda'] = Moneda::select('codigoMoneda')->where('idMoneda', '=', $obngp['tipoMoneda'])->first()["codigoMoneda"],
                    'montoAproximado'=>$obngp['montoAproximado']
                ];
                $obngp["numeroRegistro"] = empty($obngp["numeroRegistro"]) ? "" : $obngp["numeroRegistro"] ; 
                $obngp["folio"] = empty($obngp["folio"]) ? "" : $obngp["folio"] ; 
                $obngp["libro"] = empty($obngp["libro"]) ? "" : $obngp["libro"] ; 
                unset($obngp['tipoMoneda']);
                unset($obngp['montoAproximado']);
                unset($obngp['idDiccionarioPerfilEconomicoNegocioPropio']);
                unset($obngp['idPerfilEconomicoTransaccional']);
            }
            $arrNgp[] = $obngp;
        }
        return $arrNgp;
    }

    public function queryPerfilEconomicoRelacionDependencia($idPerfilEconomicoTransaccional,$jsonive){
        $arraRd = [];
        $listaPerRd = PerfilEconomicoRelacionDependencia::where('idPerfilEconomicoTransaccional',$idPerfilEconomicoTransaccional)->get();
        foreach ($listaPerRd as $rd) {
            $rd["lugar"] = $this->querylugar($rd["lugar"],$jsonive);
            if($jsonive){
                $rd['ingresos'] = [
                    'tipoMoneda'=>$rd['tipoMoneda'] = Moneda::select('codigoMoneda')->where('idMoneda', '=', $rd['tipoMoneda'])->first()["codigoMoneda"],
                    'montoAproximado'=>$rd['montoAproximado']
                ];
                unset($rd['tipoMoneda']);
                unset($rd['montoAproximado']);
                unset($rd["idPerfilEconommicoRelacionDependencia"]);
                unset($rd["idPerfilEconomicoTransaccional"]);
            }
            $arraRd[] = $rd;
        }
        return $arraRd;
    }
    public function queryPerfilEconomicoTransacional($idDiccionarioFormulario, $jsonive){
          $obtransac = PerfilEconomicoTransaccional::where('idDiccionarioFormulario', '=', $idDiccionarioFormulario)->first();
          if(!empty($obtransac)){
              $obtransac["fecha"] = $this->formatoFechaJson($obtransac["fecha"]);
              $obtransac["negocioPropio"] = $this->queryPerfilEconomicoNegocioPropio($obtransac->idPerfilEconomicoTransaccional,$jsonive); 
              $obtransac["relacionDependencia"] = $this->queryPerfilEconomicoRelacionDependencia($obtransac->idPerfilEconomicoTransaccional,$jsonive);
              $obtransac["otrosIngresos"] = [];
              $obtransac["perfilTransaccional"] = [];
              if($jsonive){
                unset($obtransac["idPerfilEconomicoTransaccional"]);
                unset($obtransac["idDiccionarioFormulario"]);
              }
          } else {
              $obtransac = ""; 
          }

          return $obtransac;
    }
    public function queryDicionarioFormulario($id, $jsonive)
    {
        $ObDicFormulario = DiccionarioFormulario::where('idDiccionarioFormulario', '=', $id)->first();

        $ObTitulares = Titular::where('idDiccionarioFormulario', '=', $ObDicFormulario->idDiccionarioFormulario)->get();
        $listaTitulares = [];
        foreach ($ObTitulares as $t) {
            $listaTitulares[] = $this->queryCamposMinimos($t["idCamposMinimos"], $jsonive);
        }

        $obDiccionarioFormulario = DiccionarioProductoServicio::where('idDiccionarioFormulario', '=', $ObDicFormulario->idDiccionarioFormulario)->get();
        $listaProductosServicios = [];
        foreach ($obDiccionarioFormulario as $dc) {
            $obPS = ProductoServicio::where('idProductoServicio', '=', $dc["idProductoServicio"])->first();
            $obPS["lugar"] = $this->querylugar($obPS["lugar"], $jsonive);
            $obPS["fecha"] = $this->formatoFechaJson($obPS["fecha"]);
            $obPS["moneda"] = Moneda::select('codigoMoneda')->where('idMoneda', '=', $obPS["moneda"])->first()["codigoMoneda"];
            $listaBeneficiarios = [];
            $listaOtrosFirmantes = [];
            $obListaBenefifiarios = Beneficiario::where('idProductoServicio', '=', $obPS["idProductoServicio"])->get();
            foreach ($obListaBenefifiarios as $beneficiario) {
                $listaBeneficiarios[] = $this->queryCamposMinimos($beneficiario["idCamposMinimos"], $jsonive);
            }
            $obListaOtrosFirmantes = OtrosFirmantes::where('idProductoServicio', '=', $obPS["idProductoServicio"])->get();
            foreach ($obListaOtrosFirmantes as $otroFirmante) {
                $listaOtrosFirmantes[] = $this->queryCamposMinimosOtrosFirmantes($otroFirmante["idCamposMinimosFirmante"], $jsonive);
            }
            $obPS["beneficiarios"] = $listaBeneficiarios;
            $obPS["otrosFirmantes"] = $listaOtrosFirmantes;
            if($jsonive){
                unset($obPS["idProductoServicio"]);
            }
            $listaProductosServicios[] = $obPS;
        }
        $dicFormuario = [
            'idDiccionarioFormulario' => $ObDicFormulario['idDiccionarioFormulario'],
            'estado' => $ObDicFormulario['estado'],
            'titulares' => $listaTitulares,
            'productos' => $listaProductosServicios,
            'perfilEconomico' => $this->queryPerfilEconomicoTransacional($ObDicFormulario->idDiccionarioFormulario, $jsonive)
        ];
        if ($jsonive) {
            unset($dicFormuario["idDiccionarioFormulario"]);
            unset($dicFormuario["estado"]);
        }
        return $dicFormuario;
    }


    public function diccionarioFormularioJson($id)
    {
        $respuesta = $this->queryDicionarioFormulario($id, true);
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
        $dicFormulario = DB::table('listaDiccionarioFormulario')->select('*')->where('idUser', '=', Auth::id())->orderBy('idDiccionarioFormulario', 'desc')->simplePaginate(7);
        return view('contenido.oficioive7122020', compact('dicFormulario'));
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


    public function guardarCamposMinimos($requesCamposMinimos)
    {
        $camposMinimos = [
            'tipoActuacion' => $requesCamposMinimos["tipoActuacion"],
            'lugar' => $this->guardarLugar($requesCamposMinimos["lugar"]),
            'fecha' => $this->formatoFechaDB($requesCamposMinimos["fecha"]),
            'cliente' => $this->guardarDatosPersonales($requesCamposMinimos["cliente"]),
            'infoEconomica' => $this->guardarInformacionEconomica($requesCamposMinimos["infoEconomicaInical"]),
        ];
        if ($camposMinimos["tipoActuacion"] == "R") {
            $camposMinimos["calidadActua"] = $requesCamposMinimos["calidadActua"];
            $camposMinimos["representante"] =  $this->guardarDatosPersonales($requesCamposMinimos["representante"]);
        }else{
            $camposMinimos["representante"] = null;
            $camposMinimos["calidadActua"] = null;
        }
        $obcm = CamposMinimos::updateOrCreate(
            [
                'idCamposMinimos' => $requesCamposMinimos["idCamposMinimos"]
            ],
            $camposMinimos
        );
        return $obcm->idCamposMinimos;
    }
    public function guardarCamposMinimosFirmante($requesCamposMinimosFirmante)
    {
        $camposMinimosFirmante = [
            'tipoActuacion' => $requesCamposMinimosFirmante["tipoActuacion"],
            'lugar' => $this->guardarLugar($requesCamposMinimosFirmante["lugar"]),
            'fecha' => $this->formatoFechaDB($requesCamposMinimosFirmante["fecha"]),
            'firmante' => $this->guardarDatosPersonales($requesCamposMinimosFirmante["cliente"]),
        ];
        if ($camposMinimosFirmante["tipoActuacion"] == "R") {
            $camposMinimosFirmante["calidadActua"] = $requesCamposMinimosFirmante["calidadActua"];
            $camposMinimosFirmante["representante"] =  $this->guardarDatosPersonales($requesCamposMinimosFirmante["representante"]);
        }else {
            $camposMinimosFirmante["calidadActua"] = null;
            $camposMinimosFirmante["representante"] = null;
        }
        $obcm = CamposMinimosOtrosFirmantes::updateOrCreate(
            [
                'idCamposMinimosFirmante' => $requesCamposMinimosFirmante["idCamposMinimos"]
            ],
            $camposMinimosFirmante
        );
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
                ['idDiccionarioFormulario' => $request->iddiccionarioFormulario],
                [
                    "estado" => "A",
                    "idUser" =>  Auth::id(),
                ]
            );
            $idDiccionarioFormulario = $obdFormulario->idDiccionarioFormulario;
            $listaTitular = Titular::where('idDiccionarioFormulario', '=', $idDiccionarioFormulario)->get()->pluck('idTitular', 'idTitular')->toArray();
            for ($i = 0; $i < count($request->titulares); $i++) {
                $idCamposMinimos = $this->guardarCamposMinimos($request->titulares[$i]);
                $obT = Titular::updateOrCreate([
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
                'Status' => 'Success',
                'DiccionarioFormulario' => $this->queryDicionarioFormulario($idDiccionarioFormulario, false)
            ];
            $this->guardarProductosServicios($request->productos, $idDiccionarioFormulario);
            $this->guardarPerfilEconomicoTransaccional($request->perfilEconomico,$idDiccionarioFormulario);

            DB::commit();
            // all good
        } catch (\Exception $e) {
            $respuesta = [
                'Status' => 'Error',
                'mensaje' => $e->getMessage(),
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
        $monedas = Moneda::all();
        $listaCondicionMigratoria = DB::table('listaCondicionMigratoria');
        $listaCondicionMigratoria = $listaCondicionMigratoria->get();
        $dc = $this->queryDicionarioFormulario($id, false);

        return view('contenido.diccionarioFormularioedit', [
            'paises' => $paises,
            'departamentos' => $departamentos,
            'municipios' => $municipios,
            'monedas' => $monedas,
            'listaCondicionMigratoria' => $listaCondicionMigratoria,
            "dc" => $dc
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
