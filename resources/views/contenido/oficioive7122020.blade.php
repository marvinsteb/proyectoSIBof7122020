@extends('layouts.admin')
@section('contenido')
<h2>Oficio IVe Núm. 712-2020 - Listado de clientes</h2>
<div class="container mt-5">
    @include('contenido.buscarEnOficios')
    <table class="table mb-5">
        <thead>
            <tr class="table-success">
                <th scope="col">#</th>
                <th scope="col">Tipo Actuacion</th>
                <th scope="col">Nombre Cliente</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            @foreach($dicFormulario as $dc)
            <tr>
                <td scope="row">{{$dc->idDiccionarioFormulario}}</td>
                <td>{{ $dc->tipoActuacion == 'C' ? 'Cliente' :'Representante' }}</td>
                <td>{{ $dc->primerNombre." ".$dc->segundoNombre}}</td>
                <td>
                    <a href="/oficios/7122020/editar/{{$dc->idDiccionarioFormulario}}">
                        <button class="btn btn-success">Editar</button>
                    </a>
                </td>
                <td>
                    <a href="" data-target="#modal-delete-{{$dc->idDiccionarioFormulario}}" data-toggle="modal">
                        <button class="btn btn-danger">Eliminar</button>
                    </a>

                </td>
                <td>
                    <a href="{{'/descargarjson/'.$dc->idDiccionarioFormulario}}">
                        <button class="btn btn-info btnDescargarJson">Descargar JSON</button>
                    </a>
                </td>
            </tr>
            @include('contenido.modalEliminarDiccionarioFormulario')
            @endforeach
        </tbody>
    </table>
    {{-- Pagination --}}
    <div class="d-flex justify-content-center">
        {!! $dicFormulario->links() !!}
    </div>
</div>
@push('scripts')
<!-- Scripts -->
<script src="{{ asset('plugins/scripts/descargarJson.js')}}"></script>
@endpush
@stop