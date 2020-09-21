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
                <form role="form">
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
                            <input type="radio" id="radioPrimary1" class ="actuaNombrePropio" name="tipoActuacion" value = 'C' checked>
                            <label for="radioPrimary1">Sí</label>
                          </div>
                          <div class="icheck-primary d-inline"> 
                            <input type="radio" id="radioPrimary2" class = "actuaNombrePropio" name="tipoActuacion" value = 'R'> 
                            <label for="radioPrimary2">No</label>
                          </div>
              
                        </div>
                      </div>

                      <div class="col-sm-8">
                          <div class="form-group">
                            <label>Calidad con que actúa</label>
                            <input type="text" class="form-control actuaNombrePropio" placeholder="Calidad con que actúa ..." disabled>
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
                            <select name ='paisCamposMinimos' id ='paisCamposMinimos' class="pais form-control" style="width: 100%;">
                              @foreach($paises as $pais)
                                <option value="{{$pais->codigoPais}}">{{$pais->nombrePais}}</option>
                              @endforeach
                            </select>
                        </div>
                      </div>
                      <!-- select departamento -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Departamento</label>
                          <select name ='departamentoCamposMinimos' id ='departamentoCamposMinimos' class="paisCamposMinimos form-control select2bs4" style="width: 100%;">
                              <option value="codigoDepartamento">Departamento</option>
                          </select>
                        </div>
                      </div>
                      <!-- select municipio -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Municipio</label>
                          <select name ='codigoMunicipio' id ='codigoMunicipio' class="paisCamposMinimos form-control select2bs4" style="width: 100%;">
                              <option value="codigoMunicipio">Municipio</option>
                          </select>
                        </div>
                      </div>
                        <!-- fecha -->
                      <div class="col-sm">
                        <div class="form-group">
                          <label>Fecha</label>
                          <div class="input-group date" id="fechaDoc" data-target-input="nearest">
                            <input type="text" class="form-control datetimepicker-input" data-target="#fechaDoc"/>
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
                              <input type="text" class="form-control" placeholder="Primer Apellido ...">
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Segundo apellido</label>
                              <input type="text" class="form-control" placeholder="Segundo apellido ...">
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Apellido casada</label>
                              <input type="text" class="form-control" placeholder="Apellido casada ...">
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Primer nombre</label>
                              <input type="text" class="form-control" placeholder="Primer nombre ...">
                            </div>
                        </div>
                      <div class="col-sm">
                            <div class="form-group">
                              <label>Segundo nombre</label>
                              <input type="text" class="form-control" placeholder="Segundo nombre ...">
                            </div>
                        </div>
                      <div class="col-sm">
                          <div class="form-group">
                            <label>Otros nombre</label>
                            <input type="text" class="form-control" placeholder="Otros nombres ...">
                          </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm">
                        <div class="form-group">
                          <label>Fecha nacimiento</label>
                          <div class="input-group date" id="fechaNacimiento" data-target-input="nearest">
                            <input type="text" class="form-control datetimepicker-input" data-target="#fechaNacimiento"/>
                            <div class="input-group-append" data-target="#fechaNacimiento" data-toggle="datetimepicker">
                              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- select pais -->
                      <div class="col-sm">
                          <div class="form-group">
                            <label>País</label>
                            <select name ='paisNacimiento' id ='paisNacimiento' class="pais form-control" style="width: 100%;">
                              @foreach($paises as $pais)
                                <option value="{{$pais->codigoPais}}">{{$pais->nombrePais}}</option>
                              @endforeach
                            </select>
                        </div>
                      </div>

                      <!-- select departamento -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Departamento</label>
                          <select name ='departamentoNacimiento' id ='departamentoNacimiento' class="paisNacimiento form-control select2bs4" style="width: 100%;">
                          </select>
                        </div>
                      </div>
                      <!-- select municipio -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Municipio</label>
                          <select name ='municipioNaciminento' id ='municipioNacimiento' class="paisNacimiento form-control select2bs4" style="width: 100%;">
                          </select>
                        </div>
                      </div> 

                     
                    </div>
                    <!-- .row -->





                </form>
              </div><!-- /.card-body -->
          </div> <!-- /.card card-primary -->
      </div><!--/.container-fluid -->
    </section>
    <!-- /.content -->
 
@endsection

