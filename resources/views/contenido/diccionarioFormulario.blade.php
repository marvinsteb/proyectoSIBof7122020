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

        <form action="guardarActualizar" class="needs-validation" method="post" novalidate>
            <div class="diccionarioFormulario" idDiccionario="20">
                @csrf
                <!-- datos titular -->
                <div class="titulares" id="titulares">
                    <div class="card card-primary" id="Cliente_1">
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
                                    <div class="form-check">
                                        <div>
                                            <label>El cliente actúa en nombre propio</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="siActuaCliente_1" class="actuaNombrePropio" name="tipoActuacionCliente_1" value="C" required/>
                                            <label for="siActuaCliente_1">Sí</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="noActuaCliente_1" class="actuaNombrePropio" name="tipoActuacionCliente_1" value="R" required />
                                            <label for="noActuaCliente_1">No</label>
                                            <div class="invalid-tooltip">Indica el tipo de actuación</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for ="calidadActuaCliente_1">Calidad con que actúa</label>
                                        <input name="calidadActuaCliente_1" id="calidadActuaCliente_1" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
                                        <div class="invalid-tooltip">Por Ejemplo: Mandatario, Patria potestad, Tutor, Otros.</div>
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
                                        <select name="paisCaMiCliente_1" id="paisCaMiCliente_1" class="form-control custom-select paisCaMiCliente deshabilitaDepartamentoMunicipio" style="width: 100%" required>
                                            <option value="" disabled selected>Selecciona</option>
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
                                        <select name="deptoCaMiCliente_1" id="deptoCaMiCliente_1" class="form-control custom-select deptoCaMiCliente getMunicipio" style="width: 100%" required disabled>
                                            <option value="" disabled selected>Selecciona</option>
                                            @foreach($departamentos as $departamento)
                                            <option value="{{$departamento->idDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <!-- select muni -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Municipio</label>
                                        <select name="muniCaMiCliente_1" id="muniCaMiCliente_1" class="form-control custom-select muniCaMiCliente setMunicipio" style="width: 100%" required disabled>
                                            <option value="" disabled selected>Selecciona</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- fecha -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Fecha</label>
                                        <div class="input-group date" id="fechaDoc_1" data-target-input="nearest">
                                            <input name="fechaDocCaMiCliente_1" id="fechaDocCaMiCliente_1" type="text" class="form-control datetimepicker-input fechaCaMiCliente" data-target="#fechaDoc_1" required />
                                            <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
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
                                        <label for="apellidoCasadaCliente_1">Apellido casada</label>
                                        <input name="apellidoCasadaCliente_1" id="apellidoCasadaCliente_1" type="text" class="form-control apellidoCasadaCliente" placeholder="Apellido casada ..." maxlength="15" />
                                        <div class="invalid-tooltip">No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido. </div>
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
                            <!-- .row -->

                            <div class="row">
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Fecha nacimiento</label>
                                        <div class="input-group date" id="fechaNacimiento" data-target-input="nearest">
                                            <input name="fechaNacimientoCliente_1" id="fechaNacimientoCliente_1" type="text" class="form-control datetimepicker-input fechaNacimientoCliente" data-target="#fechaNacimiento" required />
                                            <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
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
                                        <select name="paisNacimientoCliente_1" id="paisNacimientoCliente_1" class="form-control custom-select paisNacimientoCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                            <option value="" disabled selected>Selecciona</option>
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
                                        <select name="deptoNacimientoCliente_1" id="deptoNacimientoCliente_1" class="form-control custom-select deptoNacimientoCliente getMunicipio" style="width: 100%" required disabled>
                                            <option value="" disabled selected>Selecciona</option>
                                            @foreach($departamentos as $departamento)
                                            <option value="{{$departamento->idDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <!-- select muni -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Municipio nacimiento</label>
                                        <select name="muniNaciminentoCliente_1" id="muniNaciminentoCliente_1" class="form-control custom-select muniNaciminentoCliente setMunicipio" style="width: 100%" required disabled>
                                            <option value="" disabled selected>Selecciona</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Condición migratoria</label>
                                        <select name="condicionMigratoriaCliente_1" id="condicionMigratoriaCliente_1" class="form-control custom-select condicionMigratoria" style="width: 100%" disabled required>
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
                                        <input name="otraCoMiCliente_1" id="otraCoMiCliente_1" type="text" class="form-control otraCoMi" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />
                                    </div>
                                </div>
                            </div>
                            <!-- .row -->

                            <div class="row">
                                <!-- sexo cliente -->
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label>Sexo</label>
                                        <select name="sexoCliente_1" id="sexoCliente_1" class="form-control custom-select sexoCliente" style="width: 100%" required>
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
                                        <select name="estadoCivilCliente_1" id="estadoCivilCliente_1" class="form-control custom-select estadoCivilCliente" style="width: 100%" required>
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
                                        <select name="tipoDoctoIdentificacionCliente_1" id="tipoDoctoIdentificacionCliente_1" class="form-control custom-select tipoDoctoIdentificacionCliente validaPaisPasaporte" style="width: 100%" required>
                                            <option value="" disabled selected>Selecciona</option>
                                            <option value="D">DPI</option>
                                            <option value="P">Pasaporte</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Número identificación</label>
                                        <input name="noDocIdentificacionCliente_1" id="noDocIdentificacionCliente_1" type="text" class="form-control noDocIdentificacionCliente" placeholder="Número identificación..." maxlength="20" required disabled/>
                                    </div>
                                </div>

                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>País (Pasaporte)</label>
                                        <select name="emicionPasaporteCliente_1" id="emicionPasaporteCliente_1" class="form-control custom-select emicionPasaporteCliente" style="width: 100%" disabled required>
                                            <option value="" disabled selected>Selecciona</option>
                                            @foreach($paises as $pais)
                                            <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
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
                                        <select name="paisRecidenciaCliente_1" id="paisRecidenciaCliente_1" class="form-control custom-select paisRecidenciaCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                            <option value="" disabled selected>Selecciona</option>
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
                                        <select name="deptoRecidenciaCliente_1" id="deptoRecidenciaCliente_1" class="form-control custom-select deptoRecidenciaCliente getMunicipio" style="width: 100%" required disabled>
                                            <option value="" disabled selected>Selecciona</option>
                                            @foreach($departamentos as $departamento)
                                            <option value="{{$departamento->idDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <!-- select muni -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Municipio residencia</label>
                                        <select name="muniRecidenciaCliente_1" id="muniRecidenciaCliente_1" class="form-control custom-select muniRecidenciaCliente setMunicipio" style="width: 100%" required disabled>
                                            <option value="" disabled selected>Selecciona</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm" id="nacionalidadCliente_1" cantidad="1">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm">
                                                <label>Nacionalidad</label>
                                                <select name="nacionalidadCliente_1" id="nacionalidadCliente_1_1" class="form-control custom-select nacionalidadCliente" style="width: 100%" required>
                                                    <option value="" disabled selected>Selecciona</option>
                                                    @foreach($paises as $pais)
                                                    <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="col-sm my-auto pt-2"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" id="agregarNacionalidaCliente_1" class="btn btn-primary agregarNacionalidaCliente">
                                            Agregar Nacionalidad
                                        </button>
                                    </div>
                                </div>
                                <!-- .nacionalidad -->
                                <div class="col-sm" id="telefonoCliente_1">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm">
                                                <label>Telefonos:</label>
                                                <input name="telefonoCliente_1" id="telefonoCliente_1_1" type="text" class="form-control telefonoCliente" placeholder="telefono ..." maxlength="30" required />
                                            </div>
                                            <div class="col-sm"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" id="agregarTelefonoCliente_1" class="btn btn-primary agregarTelefonoCliente">
                                            Agregar teléfono
                                        </button>
                                    </div>
                                </div>
                                <!-- .telefono -->
                            </div>

                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-check">
                                        <div>
                                            <label>¿El cliente es Contratista y Proveedor del Estado (CPE)?</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="primaryCpeClienteSi_1" class="cpeCliente" name="cpeCliente_1" value="S" required />
                                            <label for="primaryCpeClienteSi_1">Sí</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="primaryCpeClienteNo_1" class="cpeCliente" name="cpeCliente_1" value="N" required />
                                            <label for="primaryCpeClienteNo_1">No</label>
                                            <div class="invalid-tooltip">Indica si el cliente es CPE.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-check">
                                        <div>
                                            <label>¿El cliente es una Persona Expuesta Políticamente (PEP)?</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="primaryPepSi_1" class="pepCliente" name="pepCliente_1" value="S" required />
                                            <label for="primaryPepSi_1">Sí</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="primaryPepNo_1" class="pepCliente" name="pepCliente_1" value="N" required />
                                            <label for="primaryPepNo_1">No</label>
                                            <div class="invalid-tooltip">Indica si el cliente es PEP.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="datospepCliente_1"></div>

                            <div class="row">
                                <div class="col-sm">
                                    <div class="form-check">
                                        <div>
                                            <label>¿El cliente tiene parentesco o es asociado cercano a una Persona Expuesta Políticamente (PEP)?</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="primaryAsoPepClienteSi_1" class="asoPepCliente" name="asoPepCliente_1" value="S" required />
                                            <label for="primaryAsoPepClienteSi_1">Sí</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="primaryAsoPepClienteNo_1" class="asoPepCliente" name="asoPepCliente_1" value="N" required />
                                            <label for="primaryAsoPepClienteNo_1">No</label>
                                            <div class="invalid-tooltip">Indica si el cliente tine un tiene parentesco o es asociadoa una Persona PEP.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="datosasoPepCliente_1">
                                <div class="info">
                                </div>
                                <div class="btnadd">
                                </div>
                            </div>
                            <div id="representanteCliente_1">
                            </div>
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
                <button type="submit" class="btn btn-primary mt-5" id="btnGuardar">
                    Guardar formulario
                </button>
            </div>
        </form>
    </div>
    <!--/.container-fluid -->
</section>
<!-- /.content -->


@endsection