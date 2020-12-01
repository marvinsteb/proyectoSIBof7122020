    <div class="card card-info mt-3" id="negocioPropio_{{$indiceNeg}}" iddiccionarioperfileconomiconegociopropio="{{$negp->idDiccionarioPerfilEconomicoNegocioPropio}}" >
      <div class="card-header">
        <h3 class="card-title">Negocio propio {{$indiceNeg + 1}}</h3>
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
          <div class="col-sm">
            <div class="form-group">
              <label>Nombre comercial</label>
              <input name="nombreComercial{{$indiceNeg}}" id="nombreComercial{{$indiceNeg}}" type="text" class="form-control nombreComercial" placeholder="Nombre comercial ..." maxlength="400" required value="{{$negp->nombreComercial}}">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="form-group">
              <label>Principal actividad económica</label>
              <input name="principalActividadEconomica{{$indiceNeg}}" id="principalActividadEconomica{{$indiceNeg}}" type="text" class="form-control principalActividadEconomica" placeholder="Principal actividad económica ..." maxlength="200" required value="{{$negp->principalActividadEconomica}}">
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Fecha de inscripción del negocio</label>
              <div class="input-group date" id="fechaInscripcionNegocio_{{$indiceNeg}}" data-target-input="nearest">
                <input name="fechaInscripcionNegocio{{$indiceNeg}}" id="fechaInscripcionNegocio{{$indiceNeg}}" type="text" class="form-control InscripcionNegocio datetimepicker-input" data-target="#fechaInscripcionNegocio_{{$indiceNeg}}" value="{{\Carbon\Carbon::parse($negp->fechaInscripcionNegocio)->format('d/m/Y')}}">
                <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                <div class="input-group-append" data-target="#fechaInscripcionNegocio_{{$indiceNeg}}" data-toggle="datetimepicker">
                  <div class="input-group-text">
                    <i class="fa fa-calendar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group">
              <h2>Patente de comercio de empresa</h2>
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Número de registro</label>
              <input name="numeroRegistro{{$indiceNeg}}" id="numeroRegistro{{$indiceNeg}}" type="number" class="form-control numeroRegistro" placeholder="Número de registro ..." maxlength="15" value="{{$negp->numeroRegistro}}">
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Folio</label>
              <input name="folio{{$indiceNeg}}" id="folio{{$indiceNeg}}" type="number" class="form-control folio" placeholder="Folio ..." maxlength="15" value="{{$negp->folio}}">
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Libro</label>
              <input name="libro{{$indiceNeg}}" id="libro{{$indiceNeg}}" type="number" class="form-control libro" placeholder="Libro ..." maxlength="15" value="{{$negp->libro}}">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <label>Dirección negocio</label>
            <input name="direccionNegocio{{$indiceNeg}}" id="direccionNegocio{{$indiceNeg}}" type="text" class="form-control direccion" placeholder="Dirección..." maxlength="400" required value="{{$negp->direccionNegocio}}">
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="form-group">
              <label for="paisPet{{$indiceNeg}}">País</label>
              <select name="paisPet{{$indiceNeg}}" id="paisPet{{$indiceNeg}}" class="form-control custom-select pais deshabilitaDepartamentoMunicipio setPais select2" style="width: 100%" required>
                <option value="" disabled>Selecciona</option>
                    @foreach($paises as $pais)
                    @if($pais->codigoPais == $negp->lugar->pais)
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
              <select name="deptoPet{{$indiceNeg}}" id="deptoPet{{$indiceNeg}}" class="form-control custom-select depto getMunicipio setDepartamento select2 " style="width: 100%" required {{$negp->lugar->pais == 'GT' ? '' : 'disabled'}}>
                <option value="" disabled selected>Selecciona</option>
                  @foreach($departamentos as $departamento)
                      @if($departamento->nombreDepartamento == $negp["lugar"]->nombreDepartamento)
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
              <label>Municipio {{$negp->lugar->nombreMunicipio}}</label>
              <select name="muniPet{{$indiceNeg}}" id="muniPet{{$indiceNeg}}" class="form-control custom-select muni setMunicipio select2" style="width: 100%" required {{$negp->lugar->pais == 'GT' ? '' : 'disabled'}}>
                <option value="" disabled selected>Selecciona</option>
                    @foreach($municipios as $municipio)
                        @if($municipio->nombreMunicipio == $negp["lugar"]->nombreMunicipio)
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
              <label for="moneda{{$indiceNeg}}">Moneda</label>
              <select name="moneda" class="form-control custom-select moneda select2 select2-hidden-accessible" style="width: 100%" required="" data-select2-id="moneda1" tabindex="-1" aria-hidden="true">
                <option value="" disabled>Selecciona</option>
                      @foreach($monedas as $moneda)
                          @if($moneda->codigoMoneda == $negp->tipoMoneda)
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
              <input type="number" name="montoAproximado" class="form-control d-inline montoAproximado" placeholder="0.00" min="0" step=".01" style="text-align:right;" required value="{{$negp->montoAproximado}}">
            </div>
          </div>
        </div>
      </div>
    </div>