<div class="col-sm">
    <div class="form-group">
        <label>País</label>
        <select name="paisCaMi{{$tipo}}_{{$indice}}" id="paisCaMi{{$tipo}}_{{$indice}}" class="form-control custom-select paisCaMi{{$tipo}} deshabilitaDepartamentoMunicipio select2" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
            @foreach($paises as $pais)
                @if($pais->nombrePais == $lugar["nombrePais"])
                    <option value="{{$pais->idPais}}" selected>{{$pais->nombrePais}}</option>
                @else
                    <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                @endif
            @endforeach
        </select>
    </div>
</div>
<!-- select departamento -->
<div class="col-sm">
    <div class="form-group">
        <label>Departamento</label>
        <select name="deptoCaMi{{$tipo}}_{{$indice}}" id="deptoCaMi{{$tipo}}_{{$indice}}" class="form-control custom-select deptoCaMi{{$tipo}} getMunicipio select2" style="width: 100%" required {{$lugar["pais"] == 'GT' ? '' : 'disabled'}}>
            <option value="" disabled selected>Selecciona</option>
            @foreach($departamentos as $departamento)
                @if($departamento->nombreDepartamento == $lugar["nombreDepartamento"])
                    <option value="{{$departamento->codigoDepartamento}}" selected>{{$departamento->nombreDepartamento}}</option>
                @else
                    <option value="{{$departamento->codigoDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                @endif
            @endforeach
        </select>
    </div>
</div>
<!-- select muni -->
<div class="col-sm">
    <div class="form-group">
        <label>Municipio</label>
        <select name="muniCaMi{{$tipo}}_{{$indice}}" id="muniCaMi{{$tipo}}_{{$indice}}" class="form-control custom-select muniCaMi{{$tipo}} setMunicipio select2" style="width: 100%" required {{$lugar["pais"] == 'GT' ? '' : 'disabled'}}>
            <option value="" disabled selected>Selecciona</option>
            @foreach($municipios as $municipio)
                @if($municipio->nombreMunicipio == $lugar["nombreMunicipio"])
                    <option value="{{$municipio->idMunicipio}}" selected>{{$municipio->nombreMunicipio}}</option>
                @else
                    <option value="{{$municipio->idMunicipio}}">{{$municipio->nombreMunicipio}}</option>
                @endif
            @endforeach
        </select>
    </div>
</div>