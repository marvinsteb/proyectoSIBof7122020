      <div class="row">
        <div class="col-sm">
          <div class="form-group">
            <label for="paispug{{$indicept.$indiceLgeo}}">País</label>
            <select name="paispug{{$indicept.$indiceLgeo}}" id="paispug{{$indicept.$indiceLgeo}}" class="form-control custom-select pais deshabilitaDepartamentoMunicipio setPais select2" style="width: 100%" required>
              <option value="" disabled selected>Selecciona</option>
              @foreach($paises as $pais)
                  @if($pais->nombrePais == $dlgeo->nombrePais)
                      <option value="{{$pais->idPais}}" selected>{{$pais->nombrePais}}</option>
                  @else
                      <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                  @endif
              @endforeach
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div class="form-group">
            <label>Departamento</label>
            <select name="deptopug{{$indicept.$indiceLgeo}}" id="deptopug{{$indicept.$indiceLgeo}}" class="form-control custom-select depto getMunicipio setDepartamento select2" style="width: 100%" required {{$dlgeo->pais == 'GT' ? '' : 'disabled'}}>
              <option value="" disabled="" selected>Selecciona</option>
              @foreach($departamentos as $departamento)
                  @if($departamento->nombreDepartamento == $dlgeo->nombreDepartamento)
                      <option value="{{$departamento->codigoDepartamento}}" selected>{{$departamento->nombreDepartamento}}</option>
                  @else
                      <option value="{{$departamento->codigoDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                  @endif
              @endforeach
            </select>
            </div>
        </div>
        <div class="col-sm">
          <div class="form-group">
            <label>Municipio</label>
            <select name="munipug{{$indicept.$indiceLgeo}}" id="munipug{{$indicept.$indiceLgeo}}" class="form-control custom-select muni setMunicipio select2" style="width: 100%" required="" {{$dlgeo->pais == 'GT' ? '' : 'disabled'}}>
              <option value="" disabled="" selected>Selecciona</option>
              @foreach($municipios as $municipio)
                  @if($municipio->nombreMunicipio == $dlgeo->nombreMunicipio)
                      <option value="{{$municipio->idMunicipio}}" selected>{{$municipio->nombreMunicipio}}</option>
                  @else
                      <option value="{{$municipio->idMunicipio}}">{{$municipio->nombreMunicipio}}</option>
                  @endif
              @endforeach
            </select>
            </div>
        </div>
        <div class="col-sm-1 my-auto btnborrar">
         @if($indiceLgeo > 0 )
              <button type="button" class="btn btn-danger btnUbicacionGeografica mt-3">Borrar</button>
         @endif
        </div>
      </div>