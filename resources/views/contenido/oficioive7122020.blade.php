@extends('layouts.admin')
@section('contenido')
    <h2>Oficio IVe Núm. 712-2020</h2>
    <h3>Lista de clientes</h3>
    @foreach($departamentos as $departamento)
      {{$departamento->nombreDepartamento}}
    @endforeach
@stop