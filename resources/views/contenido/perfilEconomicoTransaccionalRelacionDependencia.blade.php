<div class="card card-info mt-3" id="relacoinDependencia_{{$indiceRd}}" idrd="{{$drd->idPerfilEconommicoRelacionDependencia}}">
  <div class="card-header">
    <h3 class="card-title">Relación de dependencia {{$indiceRd+1}}</h3>
    <div class="card-tools">
      <button type="button" class="btn btn-tool" data-card-widget="collapse">
        <i class="fas fa-minus"></i>
      </button>
      <button type="button" class="btn btn-tool" data-card-widget="remove">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-2">
        <div class="form-group">
          <label for="sectorPet">Sector</label>
          <select name="sectorPet" id="sectorPet{{$indiceRd}}" class="form-control custom-select sector select2" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
            <option value="PU" {{$drd->sector == 'PU' ? 'selected' : ''}}>Sector Público</option>
            <option value="PR" {{$drd->sector == 'PR' ? 'selected' : ''}}>Sector Privado</option>
          </select>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Nombre del empleador</label>
          <input name="NombreEmpleador{{$indiceRd}}" id="NombreEmpleador{{$indiceRd}}" type="text" class="form-control NombreEmpleador" placeholder="Nombre del empleador ..." maxlength="200" required value="{{$drd->nombreEmpleador}}">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <label>Principal actividad económica empleador</label>
          <input name="prinActiEcoEmple{{$indiceRd}}" id="prinActiEcoEmple{{$indiceRd}}" type="text" class="form-control prinActiEcoEmple" placeholder="Principal actividad económica empleador ..." maxlength="200" required value="{{$drd->principalActividadEconomicaEmpleador}}"> 
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Puesto que desempeña</label>
          <input name="puestoDesempenia{{$indiceRd}}" id="puestoDesempenia{{$indiceRd}}" type="text" class="form-control puestoDesempenia" placeholder="Puesto que desempeña ..." maxlength="200" required value="{{$drd->puestoDesempenia}}">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <label>Dirección empleador</label>
        <input name="direccionEmpleador{{$indiceRd}}" id="direccionEmpleador{{$indiceRd}}" type="text" class="form-control direccion" placeholder="Dirección..." maxlength="400" required value="{{$drd->direccionEmpleador}}">   
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <label for="paisRd{{$indiceRd}}">País</label>
          <select name="paisRd{{$indiceRd}}" id="paisRd{{$indiceRd}}" class="form-control custom-select pais deshabilitaDepartamentoMunicipio setPais select2" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
                @foreach($paises as $pais)
                  @if($pais->codigoPais == $drd->lugar->pais)
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
          <select name="deptoRd{{$indiceRd}}" id="deptoRd{{$indiceRd}}" class="form-control custom-select depto getMunicipio setDepartamento select2" style="width: 100%" required {{$drd->lugar->pais == 'GT' ? '' : 'disabled'}}>
            <option value="" disabled selected>Selecciona</option>
                  @foreach($departamentos as $departamento)
                      @if($departamento->nombreDepartamento == $drd["lugar"]->nombreDepartamento)
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
          <select name="muniRd{{$indiceRd}}" id="muniRd{{$indiceRd}}" class="form-control custom-select muni setMunicipio select2 select2-hidden-accessible" style="width: 100%" required {{$drd->lugar->pais == 'GT' ? '' : 'disabled'}}>
            <option value="" disabled selected>Selecciona</option>
              @foreach($municipios as $municipio)
                  @if($municipio->nombreMunicipio == $drd["lugar"]->nombreMunicipio)
                      <option value="{{$municipio->idMunicipio}}" selected>{{$municipio->nombreMunicipio}}</option>
                  @else
                      <option value="{{$municipio->idMunicipio}}">{{$municipio->nombreMunicipio}}</option>
                  @endif
              @endforeach
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div class="form-group">
          <label for="moneda{{$indiceRd}}">Moneda</label>
          <select name="moneda" id="moneda{{$indiceRd}}" class="form-control custom-select moneda select2 select2-hidden-accessible" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
                      @foreach($monedas as $moneda)
                          @if($moneda->codigoMoneda == $drd->tipoMoneda)
                              <option value="{{$moneda->idMoneda}}" selected>{{$moneda->codigoMoneda."-".$moneda->nombreMoneda}}</option>
                          @else
                              <option value="{{$moneda->idMoneda}}">{{$moneda->codigoMoneda."-".$moneda->nombreMoneda}}</option>
                          @endif
                      @endforeach
          </select>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label>Monto aproximado ingresos</label>
          <input type="number" name="montoAproximado" id="montoAproximado{{$indiceRd}}" class="form-control d-inline montoAproximado" placeholder="0.00" min="0" step=".01" style="text-align:right;" required="" value="{{$drd->montoAproximado}}">
        </div>
      </div>
    </div>
  </div>
</div>