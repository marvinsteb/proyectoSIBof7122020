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

   
                </form>
              </div><!-- /.card-body -->




          </div> <!-- /.card -->
        <!-- . datos titular -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
@stop