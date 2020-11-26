<div class="card card-info mt-3" id="ProductoServicio_{{ $indicePro }}" idProductoServicio="{{$producto->idProductoServicio}}">
  <div class="card-header">
    <h3 class="card-title">Producto o servicio {{ $indicePro + 1 }}</h3>
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
          <label>Fecha </label>
          <div class="input-group date" id="fechaProductoServicio__{{ $indicePro }}" data-target-input="nearest">
            <input name="fechaProductoServicio_{{ $indicePro }}" id="fechaProductoServicio_{{ $indicePro }}" type="text" class="form-control ProductoServicio datetimepicker-input" data-target="#fechaProductoServicio__{{$indicePro}}" required value="{{\Carbon\Carbon::parse($producto->fecha)->format('d/m/Y')}}" />
            <div class="invalid-tooltip">
              Ingresa una fecha correcta, no se permite una fecha
              mayor a la fecha actual
            </div>
            <div class="input-group-append" data-target="#fechaProductoServicio__{{$indicePro}}" data-toggle="datetimepicker">
              <div class="input-group-text">
                <i class="fa fa-calendar"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="paisProductoServicio_{{ $indicePro }}">País en donde se contrata el producto o servicio</label>
          <select name="paisProductoServicio_{{ $indicePro }}" id="paisProductoServicio_{{ $indicePro }}" class="form-control custom-select pais deshabilitaDepartamentoMunicipio setPais select2" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
              @foreach($paises as $pais)
              @if($pais->codigoPais == $producto->lugar->pais)
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
          <select name="deptoProductoServicio_{{ $indicePro }}" id="deptoProductoServicio_{{ $indicePro }}" class="form-control custom-select depto getMunicipio setDepartamento select2" style="width: 100%" required {{$producto->lugar->pais == 'GT' ? '' : 'disabled'}}>
            <option value="" disabled="" selected>Selecciona</option>
              @foreach($departamentos as $departamento)
                  @if($departamento->nombreDepartamento == $producto->lugar->nombreDepartamento)
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
          <select name="muniProductoServicio_{{ $indicePro }}" id="muniProductoServicio_{{ $indicePro }}" class="form-control custom-select muni setMunicipio select2" style="width: 100%" required {{$producto->lugar->pais == 'GT' ? '' : 'disabled'}}>
            <option value="" disabled="" selected>Selecciona</option>
              @foreach($municipios as $municipio)
                  @if($municipio->nombreMunicipio == $producto->lugar->nombreMunicipio)
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
      <div class="col-sm">
        <div class="form-group">
          <label>Identificador producto y/o servicio</label>
          <input name="identificadorProductoServicio_{{ $indicePro }}" id="identificadorProductoServicio_{{ $indicePro }}" type="text" class="form-control identificadorProductoServicio_" placeholder="Identificador producto y/o servicio ..." maxlength="50" value="{{$producto->identificador}}" />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Tipo producto y/o servicio</label>
          <input name="tipoProductoServicio_{{ $indicePro }}" id="tipoProductoServicio_{{ $indicePro }}" type="text" class="form-control tipoProductoServicio_" placeholder="Tipo producto y/o servicio ..." maxlength="100" required value="{{$producto->tipo}}" />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Nombre producto y/o servicio</label>
          <input name="nombreProductoServicio_{{ $indicePro }}" id="nombreProductoServicio_{{ $indicePro }}" type="text" class="form-control nombreProductoServicio_" placeholder="Nombre producto y/o servicio ..." maxlength="300" value="{{$producto->nombre}}"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <label>Descripción producto y/o servicio</label>
          <input name="descripcionProductoServicio_{{ $indicePro }}" id="descripcionProductoServicio_{{ $indicePro }}" type="text" class="form-control descripcionProductoServicio_" placeholder="Descripción producto y/o servicio ..." maxlength="600" required value="{{$producto->descripcion}}" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <label>A nombre de quién se contrata el producto y/o
            servicio</label>
          <input name="nombreContrataProductoServicio_{{ $indicePro }}" id="nombreContrataProductoServicio_{{ $indicePro }}" type="text" class="form-control nombreContrataProductoServicio_" placeholder="A nombre de quién se contrata el producto y/o servicio ..." maxlength="400" required value="{{$producto->nombreContrata}}" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div class="form-group">
          <label for="monedaProductoServicio_{{ $indicePro }}">Moneda</label>
          <select name="moneda" id="monedaProductoServicio_{{ $indicePro }}" class="form-control custom-select moneda select2" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
              @foreach($monedas as $moneda)
                  @if($moneda->codigoMoneda == $producto->moneda)
                      <option value="{{$moneda->idMoneda}}" selected>{{$moneda->nombreMoneda}}</option>
                  @else
                      <option value="{{$moneda->idMoneda}}">{{$moneda->nombreMoneda}}</option>
                  @endif
              @endforeach
          </select>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="valorProductoServicio_{{ $indicePro }}">Valor producto y/o servicio</label>
          <input type="number" name="valor" id="valorProductoServicio_{{ $indicePro }}" class="form-control valor" placeholder="0.00" min="0" step=".01" style="text-align: right" required value="{{$producto->valor}}" />
        </div>
      </div>
    </div>
    <div class="row">
      <h2>Beneficiarios</h2>
      <div id="datosBeneficiarioProductoServicio_{{ $indicePro }}" class="col-sm-12" cantidad="{{count($producto->beneficiarios)}}">
        @if(!empty($producto->beneficiarios))
          @foreach($producto->beneficiarios as $benefi)
           @include('contenido.camposMinimos', ['titular' => $benefi,
                                                'indice' => $loop->index,
                                                'tipo'=>'Beneficiario',
                                                'tipolabel'=>'Beneficiario'
                                                ])
          @endforeach
        @endif
      </div>
      <div class="col-sm form-group">
        <button type="button" id="agregarBeneficiario{{ $indicePro }}" class="btn btn-primary agregarBeneficiario">
          Agregar Beneficiario
        </button>
      </div>
    </div>
    <div class="row">
      <h2>Otros Firmantes</h2>
      <div id="datosOtrosFirmantesProductoServicio_{{ $indicePro }}" class="col-sm-12" cantidad="0"></div>
      <div class="col-sm form-group">
        <button type="button" id="agregarOtrosFirmantes1" class="btn btn-primary">
          Agregar Otros Firmantes
        </button>
      </div>
    </div>
  </div>
</div>