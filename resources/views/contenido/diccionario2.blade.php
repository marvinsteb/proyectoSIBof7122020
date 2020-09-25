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
                            <input type="radio" id="radioPrimary1" class ="actuaNombrePropio" name="camposMinimos[tipoActuacion]" value = 'C' required checked>
                            <label for="radioPrimary1">Sí</label>
                          </div>
                          <div class="icheck-primary d-inline">
                            <input type="radio" id="radioPrimary2" class = "actuaNombrePropio" name="camposMinimos[tipoActuacion]" value = 'R' required>
                            <label for="radioPrimary2">No</label>
                          </div>

                        </div>
                      </div>

                      <div class="col-sm-8">
                          <div class="form-group">
                            <label>Calidad con que actúa</label>
                            <input name = "camposMinimos[calidadActua]" type="text" class="form-control actuaNombrePropio" placeholder="Calidad con que actúa ..."  maxlength="100" disabled>
                          </div>
                      </div>
                    </div>
                    <!-- .row -->

                      <!-- .nacionalidad -->
                      <div class="col-sm-6 telefono">
                      <label>Telefonos:</label>
                        <input name = "camposMinimos[telefono] [telefonoCliente]" type="text" class="form-control" placeholder="telefono ..." maxlength = "30">
                        <input name = "camposMinimos[telefono] [telefonoCliente]" type="text" class="form-control" placeholder="telefono ..." maxlength = "30">
                      </div>
                      <!-- .telefono -->
                    </div>



                  <button type="submit" class = "btn btn-primary form-control">Guardar Titular</button>
                </form>
              </div><!-- /.card-body -->

          </div> <!-- /.card card-primary -->
              <button class ='btn btn-success'>Agregar Titular</button>
      </div><!--/.container-fluid -->
    </section>
    <!-- /.content -->

@endsection
