@extends('layouts.admin')
@section('contenido')
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col">
              <h1>FORMULARIO ELECTRÓNICO DE INFORMACIÓN DEL CLIENTE</h1>
            </div>
          </div>
        </div><!-- /.container-fluid -->
      </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- datos titular -->
          <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Titular 1</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>
                </div>
              </div><!-- /.card-header -->


              <div class="card-body">
                <form action="guardarActualizar"  method="post">
                @csrf
                    <!-- I. TIPO DE ACTUACIÓN DEL CLIENTE -->
                    <div class="row">
                        <h4>I. TIPO DE ACTUACIÓN DEL CLIENTE</h4>
                        <br>
                        <br>
                    </div>
                    <!-- .row -->

                    <div class="row">
                      <div class="col-sm-4">
                        <div class="form-group">
                          <div class="icheck-primary d-inline">
                            <label for="radioPrimary3">El cliente actúa en nombre propio</label>
                          </div>

                          <div class="icheck-primary d-inline">
                            <input type="radio" id="radioPrimary1" class ="actuaNombrePropio" name="tipoActuacion" value = 'C' required checked>
                            <label for="radioPrimary1">Sí</label>
                          </div>
                          <div class="icheck-primary d-inline">
                            <input type="radio" id="radioPrimary2" class = "actuaNombrePropio" name="tipoActuacion" value = 'R' required>
                            <label for="radioPrimary2">No</label>
                          </div>

                        </div>
                      </div>

                      <div class="col-sm-8">
                          <div class="form-group">
                            <label>Calidad con que actúa</label>
                            <input name = "calidadActua" type="text" class="form-control actuaNombrePropio" placeholder="Calidad con que actúa ..."  maxlength="100" disabled>
                          </div>
                      </div>
                    </div>
                    <!-- .row -->

                    <!-- II. LUGAR Y FECHA -->
                    <div class="row">
                      <div class="col-sm-12">
                        <h4>II. LUGAR Y FECHA</h4>
                      </div>
                        <br>
                        <br>
                    </div>
                    <!-- row -->

                    <div class="row">
                      <!-- select pais -->
                      <div class="col-sm">
                          <div class="form-group">
                            <label>País</label>
                            <select name ='paisCamposMinimos' id ='paisCamposMinimos' class="pais form-control" style="width: 100%;" required>
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
                          <select name ='departamentoCamposMinimos' id ='departamentoCamposMinimos' class="paisCamposMinimos departamento form-control" style="width: 100%;" required>
                            <option value="" disabled selected>Selecciona</option>
                            @foreach($departamentos as $departamento)
                              <option value="{{$departamento->codigoDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                            @endforeach
                          </select>
                        </div>
                      </div>
                      <!-- select municipio -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Municipio</label>
                          <select name ='municipioCamposMinimos' id ='municipioCamposMinimos' class="paisCamposMinimos form-control" style="width: 100%;" required>
                          <option value="" disabled selected>Selecciona</option>
                          </select>
                        </div>
                      </div>
                        <!-- fecha -->
                      <div class="col-sm">
                        <div class="form-group">
                          <label>Fecha</label>
                          <div class="input-group date" id="fechaDoc" data-target-input="nearest">
                            <input name = "fechaCamposMinimos"type="text" class="form-control datetimepicker-input" data-target="#fechaDoc" required/>
                            <div class="input-group-append" data-target="#fechaDoc" data-toggle="datetimepicker">
                              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
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
                        <h5>Información del cliente</h5>
                      </div>
                      <br>
                      <br>
                    </div>

                    <div class="row">
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Primer Apellido</label>
                              <input name = "primerApellidoCliente" type="text" class="form-control" placeholder="Primer Apellido ..." maxlength = "15" required>
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Segundo apellido</label>
                              <!-- la llave es obligatoria, pero consignar SOA si no aplica -->
                              <input name = "segundoApellidoCliente" type="text" class="form-control" placeholder="Segundo apellido ..." maxlength = "15">
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Apellido casada</label>
                              <!-- no anteponer de al apellido -->
                              <input name = "apellidoCasadaCliente" type="text" class="form-control" placeholder="Apellido casada ..." maxlength = "15">
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Primer nombre</label>
                              <input name = "primerNombreCliente" type="text" class="form-control" placeholder="Primer nombre ..." maxlength = "15" required>
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Segundo nombre</label>
                              <!-- la llave es obligatoria, si no aplica consignar SON -->
                              <input name = "segundoNombreCliente" type="text" class="form-control" placeholder="Segundo nombre ..." maxlength = "15">
                            </div>
                        </div>
                      <div class="col-sm">
                          <div class="form-group">
                            <label>Otros nombre</label>
                            <input name = "otrosNombresCliente "type="text" class="form-control" placeholder="Otros nombres ..." maxlength = "30">
                          </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm">
                        <div class="form-group">
                          <label>Fecha nacimiento</label>
                          <div class="input-group date" id="fechaNacimiento" data-target-input="nearest">
                            <input name = 'fechaNacimientoCliente'type="text" class="form-control datetimepicker-input" data-target="#fechaNacimiento" required/>
                            <div class="input-group-append" data-target="#fechaNacimiento" data-toggle="datetimepicker">
                              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- select pais nacimiento Cliente -->
                      <div class="col-sm">
                          <div class="form-group">
                            <label>País nacimiento</label>
                            <select name ='paisNacimientoCliente' id ='paisNacimientoCliente' class="pais form-control" style="width: 100%;">
                              @foreach($paises as $pais)
                                <option value="{{$pais->codigoPais}}">{{$pais->nombrePais}}</option>
                              @endforeach
                            </select>
                        </div>
                      </div>

                      <!-- select departamento -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Departamento nacimiento</label>
                          <select name ='departamentoNacimientoCliente' id ='departamentoNacimientoCliente' class="paisNacimientoCliente departamento form-control" style="width: 100%;">
                           <option value="" disabled selected>Selecciona</option>
                           @foreach($departamentos as $departamento)
                            <option value="{{$departamento->codigoDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                           @endforeach
                          </select>
                        </div>
                      </div>
                      <!-- select municipio -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Municipio nacimiento</label>
                          <select name ='municipioNaciminentoCliente' id ='municipioNaciminentoCliente' class="paisNacimientoCliente form-control" style="width: 100%;">
                          <option value="" disabled selected>Selecciona</option>
                          </select>
                        </div>
                      </div>
                      <!-- select municipio -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Condición migratoria</label>
                          <select name ='condicionMigratoriaCliente' id ='condicionMigratoriaCliente' class=" paisNacimientoCliente form-control" style="width: 100%;" disabled required>
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
                              <input type="text" class="paisNacimientoCliente form-control" placeholder="Otra condición migratoria ...">
                            </div>
                        </div>
                    </div>
                    <!-- .row -->

                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                              <label>Sexo</label>
                              <select name ='sexoCliente' id ='sexoCliente' class="form-control" style="width: 100%;" required>
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
                              <select name ='estadoCivilCliente' id ='estadoCivilCliente' class="form-control" style="width: 100%;" required>
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
                            <input name = "nitCliente"type="text" class="form-control" placeholder="Nit ..." maxlength = "20">
                          </div>
                        </div>

                        <div class="col-sm">
                            <div class="form-group">
                              <label>Docto. identificación</label>
                              <select name ='tipoDoctoIdentificacionCliente' id ='tipoDoctoIdentificacionCliente' class="form-control" style="width: 100%;" required>
                              <option value="" disabled selected>Selecciona</option>
                              <option value="D">DPI</option>
                              <option value="P">Pasaporte</option>
                              </select>
                            </div>
                        </div>

                        <div class="col-sm">
                          <div class="form-group">
                          <label>Número identificación</label>
                            <input name = "numeroDocumentoIdentificacionCliente"type="text" class="form-control" placeholder="Número identificación..." maxlength = "20">                          
                          </div>
                        </div>

                                      <!-- select pais -->
                      <div class="col-sm">
                          <div class="form-group">
                            <label>País (Pasaporte)</label>
                            <select name ='emicionPasaporteCliente' id ='emicionPasaporteCliente' class="pais form-control" style="width: 100%;">
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
                            <input name = "profecionOficioCLiente" type="text" class="form-control" placeholder="Profesión u oficio ..." maxlength = "100">
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label>Correo electrónico</label>
                            <input name = "emailCliente" type="text" class="form-control" placeholder="Correo electrónico ..." maxlength = "100">
                          </div>
                        </div>
                    </div>




                    <button type="submit" class = "btn btn-primary">Guardar Titular</button>
                </form>
              </div><!-- /.card-body -->

          </div> <!-- /.card card-primary -->
              <button class ='btn btn-success'>Agregar Titular</button>
      </div><!--/.container-fluid -->
    </section>
    <!-- /.content -->

@endsection

