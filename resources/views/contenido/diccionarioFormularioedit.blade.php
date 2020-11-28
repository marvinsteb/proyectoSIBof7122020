@extends('layouts.admin') 
@section('contenido')
    @push('css')
    <link rel="stylesheet" href="{{ asset('plugins/css/estilos.css') }}" />    
    @endpush
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
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
        <form action="guardarActualizar" id="diccionarioFormulario" class="needs-validation" method="post" novalidate>
            <div class="diccionarioFormulario" idDiccionario="{{$dc["idDiccionarioFormulario"]}}">
                @csrf
                <!-- datos titular -->
                <div class="titulares" id="titulares" cantidad="{{count($dc["titulares"])}}">
                    @foreach($dc["titulares"] as $titular)
                        @include('contenido.camposMinimos', ['titular' => $titular,
                                                             'indice' => $loop->index,
                                                             'tipo'=>'Cliente',
                                                             'tipolabel'=>'Titular'
                                                             ])
                    @endforeach
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
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div id="datosProductoServicio" cantidad="{{count($dc["productos"])}}">
                                @foreach($dc["productos"] as $producto)
                                     @include('contenido.productoServicio',[
                                        'pro'=>$producto,
                                        'indicePro' => $loop->index
                                     ])
                                @endforeach
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                </div>
                <div class="row">
                    <div class="col clearfix">
                        <button class="btn btn-success float-right mb-4 agregarProductoServicio" id="agregarProductoServicio">Agregar Producto y/o servicio</button>
                    </div>
                </div>
                <div id="perfilEconomicoTransaccional">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">
                                Perfil económico y transaccional
                            </h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body" idperfileconomicotransaccional="{{ !empty($dc["perfilEconomico"]) ? $dc["perfilEconomico"]->idPerfilEconomicoTransaccional : '' }}">
                            @if(!empty($dc["perfilEconomico"]))
                                 @include('contenido.perfilEconomicoTransaccional',[
                                       'perfil'=>$dc["perfilEconomico"]
                                    ])
                            @endif
                        </div>
                        <!-- /.card-body -->
                    </div>
                </div>
                <div class="row">
                    @if(empty($dc["perfilEconomico"]))
                        <div class="col clearfix">
                            <button class="btn btn-success float-right mb-4 agregarPerfilEconomico" id="agregarPerfilEconomico">Agregar Perfil Económico</button>
                        </div>
                    @endif
                </div>
                <button type="submit" class="btn btn-primary mt-5 mb-5" id="btnGuardar">
                    Guardar formulario
                </button>
            </div>
        </form>
    </div>
    <!--/.container-fluid -->
</section>
<!-- /.content -->

    @push('scripts')
        <script src="{{ asset('plugins/scripts/appIve.js') }}"></script>
    @endpush

@endsection