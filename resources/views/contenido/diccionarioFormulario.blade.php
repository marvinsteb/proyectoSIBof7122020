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
                            <input type="radio" id="radioPrimary1" name="tipoActuacion" value = 'C'>
                            <label for="radioPrimary1">Sí</label>
                          </div>
                          <div class="icheck-primary d-inline"> 
                            <input type="radio" id="radioPrimary2" name="tipoActuacion" value = 'R'> 
                            <label for="radioPrimary2">No</label>
                          </div>
              
                        </div>
                      </div>

                      <div class="col-sm-8">
                          <div class="form-group">
                            <label>Calidad con que actúa</label>
                            <input type="text" class="form-control" placeholder="Calidad con que actúa ...">
                          </div>
                      </div> 
                    </div>
                    <!-- .row -->

                    <!-- II. LUGAR Y FECHA -->
                    <div class="row">
                        <h4>II. LUGAR Y FECHA</h4>
                        <br>
                        <br>
                    </div>
                    <!-- row -->

                    <div class="row">
                      <!-- select pais -->
                      <div class="col-sm">
                          <div class="form-group">
                            <label>País</label>
                            <select name ='codigoPais' id ='codigoPais' class="form-control select2bs4" style="width: 100%;">
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
                          <select name ='codigoDepartamento' id ='codigoDepartamento' class="form-control select2bs4" style="width: 100%;">
                              <option value="codigoDepartamento">Departamento</option>
                          </select>
                        </div>
                      </div>
                      <!-- select municipio -->
                      <div class="col-sm">
                          <div class="form-group">
                          <label>Municipio</label>
                          <select name ='codigoMunicipio' id ='codigoMunicipio' class="form-control select2bs4" style="width: 100%;">
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
                </form>
              </div><!-- /.card-body -->
          </div> <!-- /.card card-primary -->
      </div><!--/.container-fluid -->
    </section>
    <!-- /.content -->
@stop