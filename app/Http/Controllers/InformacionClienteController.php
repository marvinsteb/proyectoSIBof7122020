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
use App\Models\DiccionarioPerfilTransaccional;
use App\Models\DiccionarioProductoServicio;
use App\Models\FuenteIngresos;
use App\Models\InformacionEconomicaInicial;
use App\Models\Moneda;
use App\Models\Municipio;
use App\Models\OtrosFirmantes;
use App\Models\ParienteAsociadoPep;
use App\Models\PerfilEconomicoNegocioPropio;
use App\Models\PerfilEconomicoRelacionDependencia;
use App\Models\PerfilEconomicoOtrosIngresos;
use App\Models\PerfilEconomicoTransaccional;
use App\Models\PrincipalesUbicacionesGeograficas;
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
            'primerApellido' => mb_strtoupper($datosPersonales["primerApellido"]),
            'segundoApellido' => empty($datosPersonales["segundoApellido"]) ? 'SOA' : mb_strtoupper($datosPersonales["segundoApellido"]),
            'apellidoCasada' => mb_strtoupper($datosPersonales["apellidoCasada"]),
            'primerNombre' => mb_strtoupper($datosPersonales["primerNombre"]),
            'segundoNombre' => empty($datosPersonales["segundoNombre"]) ? 'SON' : mb_strtoupper($datosPersonales["segundoNombre"]),
            'otrosNombres' => mb_strtoupper($datosPersonales["otrosNombres"]),
            'fechaNacimiento' => $this->formatoFechaDB(
                $datosPersonales["fechaNacimiento"]
            ),
            'nacimiento' => $this->guardarLugar($datosPersonales["nacimiento"]),
            'condicionMigratoria' => $datosPersonales["condicionMigratoria"],
            'otraCondicionMigratoria' => mb_strtoupper($datosPersonales["otraCondicionMigratoria"]),
            'sexo' => mb_strtoupper($datosPersonales["sexo"]),
            'estadoCivil' => mb_strtoupper($datosPersonales["estadoCivil"]),
            'nit' => mb_strtoupper($datosPersonales["nit"]),
            'profesionOficio' => mb_strtoupper($datosPersonales["profesionOficio"]),
            'tipoDocumentoIdentificacion' => mb_strtoupper($datosPersonales["tipoDocumentoIdentificacion"]),
            'numeroDocumentoIdentificacion' => mb_strtoupper($datosPersonales["numeroDocumentoIdentificacion"]),
            'emisionPasaporte' => $datosPersonales["emisionPasaporte"],
            'email' => mb_strtoupper($datosPersonales["email"]),
            'direccionResidencia' => mb_strtoupper($datosPersonales["direccionResidencia"]),
            'residencia' => $this->guardarLugar($datosPersonales["residencia"]),
            'pep' => mb_strtoupper($datosPersonales["pep"]),
            'parienteAsociadoPep' => mb_strtoupper($datosPersonales["parienteAsociadoPep"]),
            'cpe' => mb_strtoupper($datosPersonales["cpe"])
        ];
        if ($camposMinimos["pep"] == "S") {
            $obpep = DatosPep::updateOrCreate(['idDatosPep' => $datosPersonales["datospep"]["idDatosPep"]], [
                'entidad' => mb_strtoupper($datosPersonales["datospep"]["entidad"]),
                'puestoDesempenia' => mb_strtoupper($datosPersonales["datospep"]["puestoDesempenia"]),
                'paisEntidad' => mb_strtoupper($datosPersonales["datospep"]["paisEntidad"]),
                'origenRiqueza' => mb_strtoupper($datosPersonales["datospep"]["origenRiqueza"]),
                'otroOrigenRiqueza' => mb_strtoupper($datosPersonales["datospep"]["otroOrigenRiqueza"]),
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
                $datos["parentesco"] = mb_strtoupper($datos["parentesco"]);
                $datos["otroParentesco"] = mb_strtoupper($datos["otroParentesco"]);
                $datos["motivoAsociacion"] = mb_strtoupper($datos["motivoAsociacion"]);
                $datos["otroMotivoAsociacion"] = mb_strtoupper($datos["otroMotivoAsociacion"]);
                $datos["primerApellido"] = mb_strtoupper($datos["primerApellido"]);
                $datos["segundoApellido"] = empty($datos["segundoApellido"]) ? 'SOA' : mb_strtoupper($datos["segundoApellido"]);
                $datos["apellidoCasada"] = mb_strtoupper($datos["apellidoCasada"]);
                $datos["primerNombre"] = mb_strtoupper($datos["primerNombre"]);
                $datos["segundoNombre"] = empty($datos["segundoNombre"]) ? 'SON' : mb_strtoupper($datos["segundoNombre"]);
                $datos["otrosNombres"] = mb_strtoupper($datos["otrosNombres"]);
                $datos["sexo"] = mb_strtoupper($datos["sexo"]);
                $datos["condicion"] = mb_strtoupper($datos["condicion"]);
                $datos["entidad"] = mb_strtoupper($datos["entidad"]);
                $datos["puestoDesempenia"] = mb_strtoupper($datos["puestoDesempenia"]);
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
            $obFuenteIngresos["tipo"] = mb_strtoupper($obFuenteIngresos["tipo"]);
            $obFuenteIngresos["nombreComercial"] = mb_strtoupper($obFuenteIngresos["nombreComercial"]);
            $obFuenteIngresos["nombreEmpleador"] = mb_strtoupper($obFuenteIngresos["nombreEmpleador"]);
            $obFuenteIngresos["otrasFuentesIngreso"] = mb_strtoupper($obFuenteIngresos["otrasFuentesIngreso"]);
            FuenteIngresos::updateOrCreate($obFuenteIngresos, $obFuenteIngresos);
        }
    }
    public function guardarInformacionEconomica($infoEconomica)
    {
        $obInfoEcoIni = InformacionEconomicaInicial::updateOrCreate(
            ['idInformacionEconomicaInicial' => $infoEconomica["idInformacionEconomicaInicial"]],
            [
                'montoIngresos' => $infoEconomica["montoIngresos"],
                'propositoRC' => mb_strtoupper($infoEconomica["propositoRC"])
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

    public function guardarPerfilEconomicoTransaccional($perEco, $idDiccionarioFormulario)
    {
        if (!empty($perEco)) {
            $obpet = PerfilEconomicoTransaccional::updateOrCreate(
                ['idPerfilEconomicoTransaccional' => $perEco["idPerfilEconomicoTransaccional"]],
                [
                    'idDiccionarioFormulario' => $idDiccionarioFormulario,
                    'actualizacion' => $perEco["actualizacion"],
                    'fecha' => $this->formatoFechaDB($perEco["fecha"])
                ]
            );
            $idObpet = $obpet->idPerfilEconomicoTransaccional;


            // negocio propio 
            $listapenp = PerfilEconomicoNegocioPropio::where('idPerfilEconomicoTransaccional', '=',  $idObpet)->get()->pluck('idDiccionarioPerfilEconomicoNegocioPropio', 'idDiccionarioPerfilEconomicoNegocioPropio')->toArray();
            if (!empty($perEco["negocioPropio"])) {
                foreach ($perEco["negocioPropio"] as $ngp) {
                    $obpenp = PerfilEconomicoNegocioPropio::updateOrCreate(
                        [
                            'idDiccionarioPerfilEconomicoNegocioPropio' => $ngp['idDiccionarioPerfilEconomicoNegocioPropio']
                        ],
                        [
                            'idPerfilEconomicoTransaccional' => $idObpet,
                            'nombreComercial' => mb_strtoupper($ngp["nombreComercial"]),
                            'principalActividadEconomica' => mb_strtoupper($ngp["principalActividadEconomica"]),
                            'fechaInscripcionNegocio' => empty($ngp["fechaInscripcionNegocio"]) ? null : $this->formatoFechaDB($ngp["fechaInscripcionNegocio"]),
                            'numeroRegistro' => $ngp["numeroRegistro"],
                            'folio' => $ngp["folio"],
                            'libro' => $ngp["libro"],
                            'direccionNegocio' => mb_strtoupper($ngp["direccionNegocio"]),
                            'lugar' => $this->guardarLugar($ngp["lugar"]),
                            'tipoMoneda' => $ngp["tipoMoneda"],
                            'montoAproximado' => $ngp["montoAproximado"]
                        ]
                    );
                    if (!empty($listapenp[$obpenp->idDiccionarioPerfilEconomicoNegocioPropio])) {
                        unset($listapenp[$obpenp->idDiccionarioPerfilEconomicoNegocioPropio]);
                    }
                }
                if (count($listapenp)) {
                    PerfilEconomicoNegocioPropio::whereRaw(sprintf('idDiccionarioPerfilEconomicoNegocioPropio IN (%s)', implode(',', $listapenp)))->delete();
                }
            } else {
                if (count($listapenp)) {
                    PerfilEconomicoNegocioPropio::whereRaw(sprintf('idDiccionarioPerfilEconomicoNegocioPropio IN (%s)', implode(',', $listapenp)))->delete();
                }
            }
            //relacion de dependencia 
            $listaPerfilErd = PerfilEconomicoRelacionDependencia::where('idPerfilEconomicoTransaccional', '=',  $idObpet)->get()->pluck('idPerfilEconommicoRelacionDependencia', 'idPerfilEconommicoRelacionDependencia')->toArray();
            if (!empty($perEco["relacionDependencia"])) {
                foreach ($perEco["relacionDependencia"] as $prd) {
                    $oprd = PerfilEconomicoRelacionDependencia::updateOrCreate(
                        [
                            'idPerfilEconommicoRelacionDependencia' => $prd['idPerd']
                        ],
                        [
                            'idPerfilEconomicoTransaccional' => $idObpet,
                            'sector' => mb_strtoupper($prd["sector"]),
                            'nombreEmpleador' => mb_strtoupper($prd["nombreEmpleador"]),
                            'principalActividadEconomicaEmpleador' => mb_strtoupper($prd["priActEcoE"]),
                            'puestoDesempenia' => mb_strtoupper($prd["puestoDesempenia"]),
                            'direccionEmpleador' => mb_strtoupper($prd["direccionEmpleador"]),
                            'lugar' => $this->guardarLugar($prd["lugar"]),
                            'tipoMoneda' => $prd["tipoMoneda"],
                            'montoAproximado' => $prd["montoAproximado"]
                        ]
                    );
                    if (!empty($listaPerfilErd[$oprd->idPerfilEconommicoRelacionDependencia])) {
                        unset($listaPerfilErd[$oprd->idPerfilEconommicoRelacionDependencia]);
                    }
                }
                if (count($listaPerfilErd)) {
                    PerfilEconomicoRelacionDependencia::whereRaw(sprintf('idPerfilEconommicoRelacionDependencia IN (%s)', implode(',', $listaPerfilErd)))->delete();
                }
            } else {
                if (count($listaPerfilErd)) {
                    PerfilEconomicoRelacionDependencia::whereRaw(sprintf('idPerfilEconommicoRelacionDependencia IN (%s)', implode(',', $listaPerfilErd)))->delete();
                }
            }
            // otros ingresos
            $listapeoi = PerfilEconomicoOtrosIngresos::where('idPerfilEconomicoTransaccional', '=',  $idObpet)->get()->pluck('idPerfilEconomicoOtrosIngresos', 'idPerfilEconomicoOtrosIngresos')->toArray();
            if (!empty($perEco["otrosIngresos"])) {
                foreach ($perEco["otrosIngresos"] as $peoi) {
                    $obpenp = PerfilEconomicoOtrosIngresos::updateOrCreate(
                        [
                            'idPerfilEconomicoOtrosIngresos' => $peoi["idOI"]
                        ],
                        [
                            'idPerfilEconomicoTransaccional' => $idObpet,
                            'tipoOtrosIngresos' => $peoi["tipoOI"],
                            'detalleOtrosIngresos' => mb_strtoupper($peoi["detalleOI"]),
                            'tipoMoneda' => $peoi["tipoMoneda"],
                            'montoAproximado' => $peoi["montoAproximado"]
                        ]
                    );
                    if (!empty($listapeoi[$obpenp->idPerfilEconomicoOtrosIngresos])) {
                        unset($listapeoi[$obpenp->idPerfilEconomicoOtrosIngresos]);
                    }
                }
                if (count($listapeoi)) {
                    PerfilEconomicoOtrosIngresos::whereRaw(sprintf('idPerfilEconomicoOtrosIngresos IN (%s)', implode(',', $listapeoi)))->delete();
                }
            } else {
                if (count($listapeoi)) {
                    PerfilEconomicoOtrosIngresos::whereRaw(sprintf('idPerfilEconomicoOtrosIngresos IN (%s)', implode(',', $listapeoi)))->delete();
                }
            }
            // perfil transaccional 
            $listapt = DiccionarioPerfilTransaccional::where('idPerfilEconomicoTransaccional', '=',  $idObpet)->get()->pluck('idDiccionarioPerfilTransaccional', 'idDiccionarioPerfilTransaccional')->toArray();
            if (!empty($perEco["perfilTransaccional"])) {
                foreach ($perEco["perfilTransaccional"] as $dpt) {
                    $obdpt = DiccionarioPerfilTransaccional::updateOrCreate(
                        [
                            'idDiccionarioPerfilTransaccional' => $dpt["iddpet"]
                        ],
                        [
                            'idPerfilEconomicoTransaccional' => $idObpet,
                            'fecha' => $this->formatoFechaDB($dpt["fecha"]),
                            'productoServicio' => mb_strtoupper($dpt["productoServicio"]),
                            'tipoMoneda' => $dpt["tipoMoneda"],
                            'montoPromedioMensual' => $dpt["montoPromedioMensual"]
                        ]
                    );
                    PrincipalesUbicacionesGeograficas::where('idDiccionarioPerfilTransaccional', $obdpt->idDiccionarioPerfilTransaccional)->delete();
                    foreach ($dpt["pubGeo"] as $lugar) {
                        $idLugar = $this->guardarLugar($lugar);
                        PrincipalesUbicacionesGeograficas::updateOrCreate([
                            'idDiccionarioPerfilTransaccional' => $obdpt->idDiccionarioPerfilTransaccional,
                            'idLugar' => $idLugar
                        ]);
                    }
                    if (!empty($listapt[$obdpt->idDiccionarioPerfilTransaccional])) {
                        unset($listapt[$obdpt->idDiccionarioPerfilTransaccional]);
                    }
                }
                if (count($listapt)) {
                    PrincipalesUbicacionesGeograficas::whereRaw(sprintf('idDiccionarioPerfilTransaccional IN (%s)', implode(',', $listapt)))->delete();
                    DiccionarioPerfilTransaccional::whereRaw(sprintf('idDiccionarioPerfilTransaccional IN (%s)', implode(',', $listapt)))->delete();
                }
            } else {
                if (count($listapt)) {
                    PrincipalesUbicacionesGeograficas::whereRaw(sprintf('idDiccionarioPerfilTransaccional IN (%s)', implode(',', $listapt)))->delete();
                    DiccionarioPerfilTransaccional::whereRaw(sprintf('idDiccionarioPerfilTransaccional IN (%s)', implode(',', $listapt)))->delete();
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
                        'tipo' => mb_strtoupper($productoServicio["tipo"]),
                        'nombre' => mb_strtoupper($productoServicio["nombre"]),
                        'descripcion' => mb_strtoupper($productoServicio["descripcion"]),
                        'identificador' => mb_strtoupper($productoServicio["identificador"]),
                        'nombreContrata' => mb_strtoupper($productoServicio["nombreContrata"]),
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
                } else {
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
                } else {
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
        } else {
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
            $telefonos[] = (int)$telefono["numTelefono"];
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
    public function queryDatosParienteAsociadoPep($idDatosPersonales, $jsonive)
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
            if ($jsonive) {
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
                $datosPersonales["datosPep"]["otroOrigenRiqueza"] = $datosPersonales["datosPep"]["origenRiqueza"] == 8 ? $datosPersonales["datosPep"]["otroOrigenRiqueza"] : "";
                unset($datosPersonales["datosPep"]["idDatosPep"]);
            }
        } else {
            $datosPersonales["datosPep"] = "";
        }
        if ($datosPersonales["parienteAsociadoPep"] == 'S') {
            $datosPersonales["datosParienteAsociadoPep"] = $this->queryDatosParienteAsociadoPep($datosPersonales["idDatosPersonales"], $jsonive);
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
        if ($jsonive) {
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
        if ($jsonive) {
            unset($ObCamposMinimosOtrosFirmantes["idCamposMinimosFirmante"]);
        }
        return  $ObCamposMinimosOtrosFirmantes;
    }
    public function queryPerfilEconomicoNegocioPropio($idPerfilEconomicoTransaccional, $jsonive)
    {
        $arrNgp = [];
        $listaObNegoP = PerfilEconomicoNegocioPropio::where('idPerfilEconomicoTransaccional', $idPerfilEconomicoTransaccional)->get();
        foreach ($listaObNegoP as $obngp) {
            $obngp["lugar"] = $this->querylugar($obngp["lugar"], $jsonive);
            $obngp["fechaInscripcionNegocio"] = empty($obngp["fechaInscripcionNegocio"]) ? '' : $this->formatoFechaJson($obngp["fechaInscripcionNegocio"]);
            if ($jsonive) {
                $obngp['ingresos'] = [
                    'tipoMoneda' => $obngp['tipoMoneda'] = Moneda::select('codigoMoneda')->where('idMoneda', '=', $obngp['tipoMoneda'])->first()["codigoMoneda"],
                    'montoAproximado' => $obngp['montoAproximado']
                ];
                $obngp["numeroRegistro"] = empty($obngp["numeroRegistro"]) ? "" : $obngp["numeroRegistro"];
                $obngp["folio"] = empty($obngp["folio"]) ? "" : $obngp["folio"];
                $obngp["libro"] = empty($obngp["libro"]) ? "" : $obngp["libro"];
                unset($obngp['tipoMoneda']);
                unset($obngp['montoAproximado']);
                unset($obngp['idDiccionarioPerfilEconomicoNegocioPropio']);
                unset($obngp['idPerfilEconomicoTransaccional']);
            }
            $arrNgp[] = $obngp;
        }
        return $arrNgp;
    }

    public function queryPerfilEconomicoRelacionDependencia($idPerfilEconomicoTransaccional, $jsonive)
    {
        $arraRd = [];
        $listaPerRd = PerfilEconomicoRelacionDependencia::where('idPerfilEconomicoTransaccional', $idPerfilEconomicoTransaccional)->get();
        foreach ($listaPerRd as $rd) {
            $rd["lugar"] = $this->querylugar($rd["lugar"], $jsonive);
            if ($jsonive) {
                $rd['ingresos'] = [
                    'tipoMoneda' => $rd['tipoMoneda'] = Moneda::select('codigoMoneda')->where('idMoneda', '=', $rd['tipoMoneda'])->first()["codigoMoneda"],
                    'montoAproximado' => $rd['montoAproximado']
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
    public function queryPerfilEconomicoOtrosIngresos($idPerfilEconomicoTransaccional, $jsonive)
    {
        $arraOi = [];
        $listaPeoi = PerfilEconomicoOtrosIngresos::where('idPerfilEconomicoTransaccional', $idPerfilEconomicoTransaccional)->get();
        foreach ($listaPeoi as $oi) {
            $oi['ingresos'] = [
                'tipoMoneda' => $oi['tipoMoneda'] = Moneda::select('codigoMoneda')->where('idMoneda', '=', $oi['tipoMoneda'])->first()["codigoMoneda"],
                'montoAproximado' => $oi['montoAproximado']
            ];
            if ($jsonive) {
                unset($oi["tipoMoneda"]);
                unset($oi["montoAproximado"]);
                unset($oi["idPerfilEconomicoOtrosIngresos"]);
                unset($oi["idPerfilEconomicoTransaccional"]);
            }
            $arraOi[] = $oi;
        }
        return $arraOi;
    }
    public function queryPrincipalesUbicacionesGeograficas($idDiccionarioPerfilTransaccional, $jsonive)
    {
        $listaLugares = PrincipalesUbicacionesGeograficas::select('idLugar')->where('idDiccionarioPerfilTransaccional', $idDiccionarioPerfilTransaccional)->get();
        $arrayLugares = [];
        foreach ($listaLugares as $idlugar) {
            $arrayLugares[] = $this->querylugar($idlugar["idLugar"], $jsonive);
        }
        return $arrayLugares;
    }
    public function queryDiccionarioPerfilTransaccional($idPerfilEconomicoTransaccional, $jsonive)
    {
        $arraDpt = [];
        $listaDpt = DiccionarioPerfilTransaccional::where('idPerfilEconomicoTransaccional', $idPerfilEconomicoTransaccional)->get();
        foreach ($listaDpt as $dpt) {
            $dpt["tipoMoneda"] = Moneda::select('codigoMoneda')->where('idMoneda', '=', $dpt['tipoMoneda'])->first()["codigoMoneda"];
            $dpt["principalesUbicacionesGeograficas"] = $this->queryPrincipalesUbicacionesGeograficas($dpt["idDiccionarioPerfilTransaccional"], $jsonive);
            if ($jsonive) {
                $dpt["fecha"] = $this->formatoFechaJson($dpt["fecha"]);
                unset($dpt["idDiccionarioPerfilTransaccional"]);
                unset($dpt["idPerfilEconomicoTransaccional"]);
            }
            $arraDpt[] = $dpt;
        }
        return $arraDpt;
    }
    public function queryPerfilEconomicoTransacional($idDiccionarioFormulario, $jsonive)
    {
        $obtransac = PerfilEconomicoTransaccional::where('idDiccionarioFormulario', '=', $idDiccionarioFormulario)->first();
        if (!empty($obtransac)) {
            $obtransac["fecha"] = $this->formatoFechaJson($obtransac["fecha"]);
            $obtransac["negocioPropio"] = $this->queryPerfilEconomicoNegocioPropio($obtransac->idPerfilEconomicoTransaccional, $jsonive);
            $obtransac["relacionDependencia"] = $this->queryPerfilEconomicoRelacionDependencia($obtransac->idPerfilEconomicoTransaccional, $jsonive);
            $obtransac["otrosIngresos"] = $this->queryPerfilEconomicoOtrosIngresos($obtransac->idPerfilEconomicoTransaccional, $jsonive);
            $obtransac["perfilTransaccional"] = $this->queryDiccionarioPerfilTransaccional($obtransac->idPerfilEconomicoTransaccional, $jsonive);
            if ($jsonive) {
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
            if ($jsonive) {
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
    public function index(Request $request)
    {
        $query = trim($request->get('searchText'));
        $dicFormulario = DB::table('listaDiccionarioFormulario')->select('*')
            ->where('idUser', '=', Auth::id())
            ->where('nombre', 'LIKE', '%' . $query . '%')
            ->orderBy('idDiccionarioFormulario', 'desc')
            ->simplePaginate(15);
        return view('contenido.oficioive7122020', ["dicFormulario" => $dicFormulario, "searchText" => $query]);
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
            'tipoActuacion' => mb_strtoupper($requesCamposMinimos["tipoActuacion"]),
            'lugar' => $this->guardarLugar($requesCamposMinimos["lugar"]),
            'fecha' => $this->formatoFechaDB($requesCamposMinimos["fecha"]),
            'cliente' => $this->guardarDatosPersonales($requesCamposMinimos["cliente"]),
            'infoEconomica' => $this->guardarInformacionEconomica($requesCamposMinimos["infoEconomicaInical"]),
        ];
        if ($camposMinimos["tipoActuacion"] == "R") {
            $camposMinimos["calidadActua"] = mb_strtoupper($requesCamposMinimos["calidadActua"]);
            $camposMinimos["representante"] =  $this->guardarDatosPersonales($requesCamposMinimos["representante"]);
        } else {
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
        } else {
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
                'Status' => 'Success'
            ];
            $this->guardarProductosServicios($request->productos, $idDiccionarioFormulario);
            $this->guardarPerfilEconomicoTransaccional($request->perfilEconomico, $idDiccionarioFormulario);

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
