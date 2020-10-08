@extends('layouts.admin') @section('contenido')
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col">
                <h1>FORMULARIO ELECTRÓNICO DE INFORMACIÓN DEL CLIENTE</h1>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->
</section>
<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <form action="guardarActualizar" method="post">
            @csrf
            <!-- datos titular -->
            <div class="titulares" id="titulares">
                <div class="card card-primary" id="titular_1">
                    <div class="card-header">
                        <h3 class="card-title">Titular 1</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">
                        <div class="row mb-3">
                            <h4>I. TIPO DE ACTUACIÓN DEL CLIENTE 1</h4>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label>El cliente actúa en nombre
                                            propio</label>
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="siActuaCliente_1" class="actuaNombrePropio" name="tipoActuacionCliente_1" value="C" required checked />
                                        <label for="siActuaCliente_1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="noActuaCliente_1" class="actuaNombrePropio" name="tipoActuacionCliente_1" value="R" required />
                                        <label for="noActuaCliente_1">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label>Calidad con que actúa</label>
                                    <input name="calidadActuaCliente_1" id="calidadActuaCliente_1" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <!-- II. LUGAR Y FECHA -->
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>II. LUGAR Y FECHA</h4>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- row -->

                        <div class="row">
                            <!-- select pais -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País</label>
                                    <select name="paisCaMiCliente_1" id="paisCaMiCliente_1" class="form-control paisCaMiCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select departamento -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Departamento</label>
                                    <select name="deptoCaMiCliente_1" id="deptoCaMiCliente_1" class="form-control deptoCaMiCliente getMunicipio" style="width: 100%" required>
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option value="{{$departamento->codigoDepartamento}}">
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select muni -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio</label>
                                    <select name="muniCaMiCliente_1" id="muniCaMiCliente_1" class="form-control muniCaMiCliente setMunicipio" style="width: 100%" required>
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <!-- fecha -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Fecha</label>
                                    <div class="input-group date" id="fechaDoc_1" data-target-input="nearest">
                                        <input name="fechaDocCaMiCliente_1" id="fechaDocCaMiCliente_1" type="text" class="form-control datetimepicker-input fechaCaMiCliente" data-target="#fechaDoc_1" required />
                                        <div class="input-group-append" data-target="#fechaDoc_1" data-toggle="datetimepicker">
                                            <div class="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-12">
                                <h4>III. DATOS PERSONALES</h4>
                            </div>
                            <div class="col-sm-12">
                                <h5>Información del cliente 1</h5>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Primer Apellido</label>
                                    <input name="primerApellidoCliente_1" id="primerApellidoCliente_1" type="text" class="form-control primerApellidoCliente" placeholder="Primer Apellido ..." maxlength="15" required />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Segundo apellido</label>
                                    <input name="segundoApellidoCliente_1" id="segundoApellidoCliente_1" type="text" class="form-control segundoApellidoCliente" placeholder="Segundo apellido ..." maxlength="15" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Apellido casada</label>
                                    <input name="apellidoCasadaCliente_1" id="apellidoCasadaCliente_1" type="text" class="form-control apellidoCasadaCliente" placeholder="Apellido casada ..." maxlength="15" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Primer nombre</label>
                                    <input name="primerNombreCliente_1" id="primerNombreCliente_1" type="text" class="form-control primerNombreCliente" placeholder="Primer nombre ..." maxlength="15" required />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Segundo nombre</label>
                                    <input name="segundoNombreCliente_1" id="segundoNombreCliente_1" type="text" class="form-control segundoNombreCliente" placeholder="Segundo nombre ..." maxlength="15" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Otros nombre</label>
                                    <input name="otrosNombresCliente_1" id="otrosNombresCliente_1" type="text" class="form-control otrosNombresCliente" placeholder="Otros nombres ..." maxlength="30" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Fecha nacimiento</label>
                                    <div class="input-group date" id="fechaNacimiento" data-target-input="nearest">
                                        <input name="fechaNacimientoCliente_1" id="fechaNacimientoCliente_1" type="text" class="form-control datetimepicker-input fechaNacimientoCliente" data-target="#fechaNacimiento" required />
                                        <div class="input-group-append" data-target="#fechaNacimiento" data-toggle="datetimepicker">
                                            <div class="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País nacimiento</label>
                                    <select name="paisNacimientoCliente_1" id="paisNacimientoCliente_1" class="form-control paisNacimientoCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->idPais}}">
                                            {{$pais->nombrePais}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <!-- select departamento -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Departamento nacimiento</label>
                                    <select name="deptoNacimientoCliente_1" id="deptoNacimientoCliente_1" class="form-control deptoNacimientoCliente getMunicipio" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                        @foreach($departamentos as $departamento)
                                        <option value="{{$departamento->codigoDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select muni -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio nacimiento</label>
                                    <select name="muniNaciminentoCliente_1" id="muniNaciminentoCliente_1" class="form-control muniNaciminentoCliente setMunicipio" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Condición migratoria</label>
                                    <select name="condicionMigratoriaCliente_1" id="condicionMigratoriaCliente_1" class="form-control condicionMigratoriaCliente" style="width: 100%" disabled required>
                                        <option value="" disabled selected>Selecciona</option>
                                        @foreach($listaCondicionMigratoria as $condicionMigratoria)
                                        <option value="{{$condicionMigratoria->idListaCondicionMigratoria}}">{{$condicionMigratoria->descripcion}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Especifique</label>
                                    <input name="otraCoMiCliente_1" id="otraCoMiCliente_1" type="text" class="form-control otraCoMiCliente" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <!-- sexo cliente -->
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label>Sexo</label>
                                    <select name="sexoCliente_1" id="sexoCliente_1" class="form-control sexoCliente" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </select>
                                </div>
                            </div>
                            <!-- .col-sm -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Estado civil</label>
                                    <select name="estadoCivilCliente_1" id="estadoCivilCliente_1" class="form-control estadoCivilCliente" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                        <option value="S">Soltero</option>
                                        <option value="C">Casado</option>
                                    </select>
                                </div>
                            </div>
                            <!-- .col-sm -->

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Nit</label>
                                    <input name="nitCliente_1" id="nitCliente_1" type="text" class="form-control validarNit" placeholder="Nit ..." maxlength="20" />
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Docto. identificación</label>
                                    <select name="tipoDoctoIdentificacionCliente_1" id="tipoDoctoIdentificacionCliente_1" class="form-control tipoDoctoIdentificacionCliente validaPaisPasaporte" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                        <option value="D">DPI</option>
                                        <option value="P">Pasaporte</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Número identificación</label>
                                    <input name="noDocIdentificacionCliente_1" id="noDocIdentificacionCliente_1" type="text" class="form-control noDocIdentificacionCliente" placeholder="Número identificación..." maxlength="20" required />
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País (Pasaporte)</label>
                                    <select name="emicionPasaporteCliente_1" id="emicionPasaporteCliente_1" class="form-control emicionPasaporteCliente" style="width: 100%" disabled required>
                                        <option value="" disabled selected>Selecciona</option>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->codigoPais}}">{{$pais->nombrePais}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Profesión u oficio</label>
                                    <input name="profecionOficioCliente_1" id="profecionOficioCliente_1" type="text" class="form-control profecionOficioCliente" placeholder="Profesión u oficio ..." maxlength="100" required />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Correo electrónico</label>
                                    <input name="emailCliente_1" id="emailCliente_1" type="email" class="form-control emailCliente" placeholder="Correo electrónico ..." maxlength="100" />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-12">
                                <h5>Residencia</h5>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm">
                                <label>Dirección de residencia completa (calle o avenida, número de casa, colonia, sector, lote, manzana, otros)</label>
                                <input name="direccionRecidenciaCliente_1" id="direccionRecidenciaCliente_1" type="text" class="form-control direccionRecidenciaCliente" placeholder="Dirección de residencia completa ..." maxlength="400" required />
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <!-- select pais nacimiento Cliente -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País residencia</label>
                                    <select name="paisRecidenciaCliente_1" id="paisRecidenciaCliente_1" class="form-control paisRecidenciaCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <!-- select departamento -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Departamento residencia</label>
                                    <select name="deptoRecidenciaCliente" id="deptoRecidenciaCliente" class="paisRecidenciaCliente departamento form-control" style="width: 100%">
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option value="{{$departamento->codigoDepartamento}}">
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select muni -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio residencia</label>
                                    <select name="muniRecidenciaCliente" id="muniRecidenciaCliente" class="paisRecidenciaCliente form-control" style="width: 100%">
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm" id="nacionalidadCliente">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm">
                                            <label>Nacionalidad</label>
                                            <select name="nacionalidadCliente" id="nacionalida1Cliente" class="form-control" style="width: 100%" required>
                                                <option value="" disabled selected>
                                                    Selecciona
                                                </option>
                                                @foreach($paises as $pais)
                                                <option value="{{$pais->codigoPais}}">
                                                    {{$pais->nombrePais}}
                                                </option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="col-sm my-auto pt-2"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary" id="agregarNacionalidaCliente">
                                        Agregar Nacionalidad
                                    </button>
                                </div>
                            </div>
                            <!-- .nacionalidad -->
                            <div class="col-sm" id="telefonosCliente">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm">
                                            <label>Telefonos:</label>
                                            <input name="telefonoCliente" type="text" class="form-control" placeholder="telefono ..." maxlength="30" required />
                                        </div>
                                        <div class="col-sm"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary" id="agregarTelefonoCliente">
                                        Agregar teléfono
                                    </button>
                                </div>
                            </div>
                            <!-- .telefono -->
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label for="">¿El cliente es Contratista y
                                            Proveedor del Estado (CPE)?</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryCpeCliente1" class="cpeCliente" name="cpeCliente" value="S" required />
                                        <label for="primaryCpeCliente1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryCpeCliente2" class="cpeCliente" name="cpeCliente" value="N" required />
                                        <label for="primaryCpeCliente2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label>¿El cliente es una Persona Expuesta
                                            Políticamente (PEP)?</label>
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryPep1" class="pepCliente" name="pepCliente" value="S" required />
                                        <label for="primaryPep1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryPep2" class="pepCliente" name="pepCliente" value="N" required />
                                        <label for="primaryPep2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="datosPepCliente"></div>

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label>¿El cliente tiene parentesco o es
                                            asociado cercano a una Persona
                                            Expuesta Políticamente (PEP)?</label>
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryAsoPepCliente1" class="asoPepCliente" name="asoPepCliente" value="S" required />
                                        <label for="primaryAsoPepCliente1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryAsoPepCliente2" class="asoPepCliente" name="asoPepCliente" value="N" required />
                                        <label for="primaryAsoPepCliente2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="datosAsoPep" id="datosAsoCliente1"></div>
                        <!-- .datosPaAsPep -->
                    </div>
                    <!-- /.card-body -->
                </div>

                <div class="card card-primary" id="titular_2">
                    <div class="card-header">
                        <h3 class="card-title">Titular 2</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">
                        <div class="row mb-3">
                            <h4>I. TIPO DE ACTUACIÓN DEL CLIENTE 2</h4>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label>El cliente actúa en nombre
                                            propio</label>
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="siActuaCliente_2" class="actuaNombrePropio" name="tipoActuacionCliente_2" value="C" required checked />
                                        <label for="siActuaCliente_2">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="noActuaCliente_2" class="actuaNombrePropio" name="tipoActuacionCliente_2" value="R" required />
                                        <label for="noActuaCliente_2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label>Calidad con que actúa</label>
                                    <input name="calidadActuaCliente_2" id="calidadActuaCliente_2" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <!-- II. LUGAR Y FECHA -->
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>II. LUGAR Y FECHA</h4>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- row -->

                        <div class="row">
                            <!-- select pais -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País</label>
                                    <select name="paisCaMiCliente_2" id="paisCaMiCliente_2" class="form-control paisCaMiCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->idPais}}">
                                            {{$pais->nombrePais}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select departamento -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Departamento</label>
                                    <select name="deptoCaMiCliente_2" id="deptoCaMiCliente_2" class="form-control deptoCaMiCliente getMunicipio" style="width: 100%" required>
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option value="{{$departamento->codigoDepartamento}}">
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select muni -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio</label>
                                    <select name="muniCaMiCliente_2" id="muniCaMiCliente_2" class="form-control muniCaMiCliente setMunicipio" style="width: 100%" required>
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <!-- fecha -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Fecha</label>
                                    <div class="input-group date" id="fechaDoc_2" data-target-input="nearest">
                                        <input name="fechaDocCaMiCliente_2" id="fechaDocCaMiCliente_2" type="text" class="form-control datetimepicker-input fechaCaMiCliente" data-target="#fechaDoc_2" required />
                                        <div class="input-group-append" data-target="#fechaDoc_2" data-toggle="datetimepicker">
                                            <div class="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-12">
                                <h4>III. DATOS PERSONALES</h4>
                            </div>
                            <div class="col-sm-12">
                                <h5>Información del cliente 2</h5>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Primer Apellido</label>
                                    <input name="primerApellidoCliente_2" id="primerApellidoCliente_2" type="text" class="form-control primerApellidoCliente" placeholder="Primer Apellido ..." maxlength="15" required />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Segundo apellido</label>
                                    <input name="segundoApellidoCliente_2" id="segundoApellidoCliente_2" type="text" class="form-control segundoApellidoCliente" placeholder="Segundo apellido ..." maxlength="15" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Apellido casada</label>
                                    <input name="apellidoCasadaCliente_2" id="apellidoCasadaCliente_2" type="text" class="form-control apellidoCasadaCliente" placeholder="Apellido casada ..." maxlength="15" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Primer nombre</label>
                                    <input name="primerNombreCliente_2" id="primerNombreCliente_2" type="text" class="form-control primerNombreCliente" placeholder="Primer nombre ..." maxlength="15" required />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Segundo nombre</label>
                                    <input name="segundoNombreCliente_2" id="segundoNombreCliente_2" type="text" class="form-control segundoNombreCliente" placeholder="Segundo nombre ..." maxlength="15" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Otros nombre</label>
                                    <input name="otrosNombresCliente_2" id="otrosNombresCliente_2" type="text" class="form-control otrosNombresCliente" placeholder="Otros nombres ..." maxlength="30" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Fecha nacimiento</label>
                                    <div class="input-group date" id="fechaNacimiento" data-target-input="nearest">
                                        <input name="fechaNacimientoCliente_2" id="fechaNacimientoCliente_2" type="text" class="form-control datetimepicker-input fechaNacimientoCliente" data-target="#fechaNacimiento" required />
                                        <div class="input-group-append" data-target="#fechaNacimiento" data-toggle="datetimepicker">
                                            <div class="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País nacimiento</label>
                                    <select name="paisNacimientoCliente_2" id="paisNacimientoCliente_2" class="form-control paisNacimientoCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->idPais}}">
                                            {{$pais->nombrePais}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <!-- select departamento -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Departamento nacimiento</label>
                                    <select name="deptoNacimientoCliente_2" id="deptoNacimientoCliente_2" class="form-control deptoNacimientoCliente getMunicipio" style="width: 100%">
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option value="{{$departamento->codigoDepartamento}}">
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select muni -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio nacimiento</label>
                                    <select name="muniNaciminentoCliente_2" id="muniNaciminentoCliente_2" class="form-control muniNaciminentoCliente setMunicipio" style="width: 100%">
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <!-- select condicion Migratoria -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Condición migratoria</label>
                                    <select name="condicionMigratoriaCliente_2" id="condicionMigratoriaCliente_2" class="form-control condicionMigratoriaCliente" style="width: 100%" disabled required>
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($listaCondicionMigratoria as
                                        $condicionMigratoria)
                                        <option value="{{$condicionMigratoria->idListaCondicionMigratoria}}">
                                            {{$condicionMigratoria->descripcion}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Especifique</label>
                                    <input name="otraCoMiCliente_2" id="otraCoMiCliente_2" type="text" class="form-control otraCoMiCliente" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <!-- sexo cliente -->
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label>Sexo</label>
                                    <select name="sexoCliente_2" id="sexoCliente_2" class="form-control sexoCliente" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </select>
                                </div>
                            </div>
                            <!-- .col-sm -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Estado civil</label>
                                    <select name="estadoCivilCliente_2" id="estadoCivilCliente_2" class="form-control estadoCivilCliente" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                        <option value="S">Soltero</option>
                                        <option value="C">Casado</option>
                                    </select>
                                </div>
                            </div>
                            <!-- .col-sm -->

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Nit</label>
                                    <input name="nitCliente_2" id="nitCliente_2" type="text" class="form-control validarNit" placeholder="Nit ..." maxlength="20" />
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Docto. identificación</label>
                                    <select name="tipoDoctoIdentificacionCliente_2" id="tipoDoctoIdentificacionCliente_2" class="form-control tipoDoctoIdentificacionCliente validaPaisPasaporte" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                        <option value="D">DPI</option>
                                        <option value="P">Pasaporte</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Número identificación</label>
                                    <input name="noDocIdentificacionCliente_2" id="noDocIdentificacionCliente_2" type="text" class="form-control noDocIdentificacionCliente" placeholder="Número identificación..." maxlength="20" />
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País (Pasaporte)</label>
                                    <select name="emicionPasaporteCliente_2" id="emicionPasaporteCliente_2" class="form-control emicionPasaporteCliente" style="width: 100%" disabled required>
                                        <option value="" disabled selected>Selecciona</option>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->codigoPais}}">{{$pais->nombrePais}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Profesión u oficio</label>
                                    <input name="profecionOficioCliente_2" id="profecionOficioCliente_2" type="text" class="form-control" placeholder="Profesión u oficio ..." maxlength="100" />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Correo electrónico</label>
                                    <input name="emailCliente" type="email" class="form-control" placeholder="Correo electrónico ..." maxlength="100" />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-12">
                                <h5>Residencia</h5>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm">
                                <label>Dirección de residencia completa (calle o
                                    avenida, número de casa, colonia, sector,
                                    lote, manzana, otros)</label>
                                <input name="direccionRecidenciaCliente" type="text" class="form-control" placeholder="Dirección de residencia completa ..." maxlength="400" />
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <!-- select pais nacimiento Cliente -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País residencia</label>
                                    <select name="paisRecidenciaCliente" id="paisRecidenciaCliente" class="pais form-control" style="width: 100%" required>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->idPais}}">
                                            {{$pais->nombrePais}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <!-- select departamento -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Departamento residencia</label>
                                    <select name="deptoRecidenciaCliente" id="deptoRecidenciaCliente" class="paisRecidenciaCliente departamento form-control" style="width: 100%">
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option value="{{$departamento->codigoDepartamento}}">
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select muni -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio residencia</label>
                                    <select name="muniRecidenciaCliente" id="muniRecidenciaCliente" class="paisRecidenciaCliente form-control" style="width: 100%">
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm" id="nacionalidadCliente">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm">
                                            <label>Nacionalidad</label>
                                            <select name="nacionalidadCliente" id="nacionalida1Cliente" class="form-control" style="width: 100%" required>
                                                <option value="" disabled selected>
                                                    Selecciona
                                                </option>
                                                @foreach($paises as $pais)
                                                <option value="{{$pais->codigoPais}}">
                                                    {{$pais->nombrePais}}
                                                </option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="col-sm my-auto pt-2"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary" id="agregarNacionalidaCliente">
                                        Agregar Nacionalidad
                                    </button>
                                </div>
                            </div>
                            <!-- .nacionalidad -->
                            <div class="col-sm" id="telefonosCliente">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm">
                                            <label>Telefonos:</label>
                                            <input name="telefonoCliente" type="text" class="form-control" placeholder="telefono ..." maxlength="30" required />
                                        </div>
                                        <div class="col-sm"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary" id="agregarTelefonoCliente">
                                        Agregar teléfono
                                    </button>
                                </div>
                            </div>
                            <!-- .telefono -->
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label for="">¿El cliente es Contratista y
                                            Proveedor del Estado (CPE)?</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryCpeCliente1" class="cpeCliente" name="cpeCliente" value="S" required />
                                        <label for="primaryCpeCliente1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryCpeCliente2" class="cpeCliente" name="cpeCliente" value="N" required />
                                        <label for="primaryCpeCliente2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label>¿El cliente es una Persona Expuesta
                                            Políticamente (PEP)?</label>
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryPep1" class="pepCliente" name="pepCliente" value="S" required />
                                        <label for="primaryPep1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryPep2" class="pepCliente" name="pepCliente" value="N" required />
                                        <label for="primaryPep2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="datosPepCliente"></div>

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label>¿El cliente tiene parentesco o es
                                            asociado cercano a una Persona
                                            Expuesta Políticamente (PEP)?</label>
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryAsoPepCliente1" class="asoPepCliente" name="asoPepCliente" value="S" required />
                                        <label for="primaryAsoPepCliente1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input type="radio" id="primaryAsoPepCliente2" class="asoPepCliente" name="asoPepCliente" value="N" required />
                                        <label for="primaryAsoPepCliente2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="datosAsoPep" id="datosAsoCliente1"></div>
                        <!-- .datosPaAsPep -->
                    </div>
                    <!-- /.card-body -->
                </div>

            </div>
            <div class="row">
                <div class="col clearfix">
                    <button class="btn btn-success float-right mb-4" id="btnAgregarTitular">
                        Agregar Titular
                    </button>
                </div>
            </div>

            <div class="productoServicio">
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Productos y/o servicios</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body"></div>
                    <!-- /.card-body -->
                </div>
            </div>
            <div class="row">
                <div class="col clearfix">
                    <button class="btn btn-success float-right mb-4">
                        Agregar Producto y/o servicio
                    </button>
                </div>
            </div>
            <div class="perfilEconomicoTransaccional">
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">
                            Perfil económico y transaccional
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body"></div>
                    <!-- /.card-body -->
                </div>
            </div>
            <button type="submit" class="btn btn-primary form-control mt-5" id="btnGuardar">
                Guardar formulario
            </button>
        </form>
    </div>
    <!--/.container-fluid -->
</section>
<!-- /.content -->

@endsection