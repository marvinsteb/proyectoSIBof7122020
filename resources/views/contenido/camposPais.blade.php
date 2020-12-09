<div class="col-sm">
    <div class="form-group">
        <label>País <span>*</span></label>
        <select name="pais{{$tipoCampo}}{{$tipo}}_{{$indice}}" id="pais{{$tipoCampo}}{{$tipo}}_{{$indice}}" class="form-control custom-select pais{{$tipoCampo}}{{$tipo}} deshabilitaDepartamentoMunicipio select2" style="width: 100%" required>
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
        <label>Departamento
            @if($lugar["pais"] == 'GT')
                <span>*</span>
            @else
                <span class="oculto">*</span>
            @endif
        </label>
        <select name="depto{{$tipoCampo}}{{$tipo}}_{{$indice}}" id="depto{{$tipoCampo}}{{$tipo}}_{{$indice}}" class="form-control custom-select depto{{$tipoCampo}}{{$tipo}} getMunicipio select2" style="width: 100%" required {{$lugar["pais"] == 'GT' ? '' : 'disabled'}}>
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
        <label>Municipio
            @if($lugar["pais"] == 'GT')
                <span>*</span>
            @else
                <span class="oculto">*</span>
            @endif
        </label>
        <select name="muni{{$tipoCampo}}{{$tipo}}_{{$indice}}" id="muni{{$tipoCampo}}{{$tipo}}_{{$indice}}" class="form-control custom-select muni{{$tipoCampo}}{{$tipo}} setMunicipio select2" style="width: 100%" required {{$lugar["pais"] == 'GT' ? '' : 'disabled'}}>
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