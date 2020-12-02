<div class="card card-info mt-3" id="otrosIngresos_{{$indicept}}">
  <div class="card-header">
    <h3 class="card-title">Producto del perfil transaccional {{$indicept + 1}}</h3>
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
      <div class="col-sm-3">
        <div class="form-group">
          <label>Fecha de elaboración del perfil</label>
          <div class="input-group date" id="fechaPspt_{{$indicept}}" data-target-input="nearest">
            <input name="fechaPspt{{$indicept}}" id="fechaPspt{{$indicept}}" type="text" class="form-control Pspt datetimepicker-input" data-target="#fechaPspt_{{$indicept}}" required="" value="{{\Carbon\Carbon::parse($dpt->fecha)->format('d/m/Y')}}">
            <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
            <div class="input-group-append" data-target="#fechaPspt_{{$indicept}}" data-toggle="datetimepicker">
              <div class="input-group-text">
                <i class="fa fa-calendar"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Producto y/o servicio</label>
          <input name="productoServicioPspt{{$indicept}}" id="productoServicioPspt{{$indicept}}" type="text" class="form-control productoServicioPspt" placeholder="Producto y/o servicio ..." maxlength="100" required value="{{$dpt->productoServicio}}">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div class="form-group">
          <label>Moneda</label>
          <select name="moneda" class="form-control custom-select moneda select2 " style="width: 100%" required>
            <option value="" disabled="" selected>Selecciona</option>
            @foreach($monedas as $moneda)
            @if($moneda->codigoMoneda == $dpt->tipoMoneda)
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
          <label>Monto promedio mensual (6 meses)</label>
          <input type="number" name="montoAproximado" class="form-control d-inline montoAproximado" placeholder="0.00" min="0" step=".01" style="text-align:right;" required value="{{$dpt->montoPromedioMensual}}">
        </div>
      </div>
    </div>
    <h4>Principales ubicaciones geográficas</h4>
    <div id="ubicacionesGeoraficas" cantidad="{{count($dpt->principalesUbicacionesGeograficas)}}">
    
      @if(!empty($dpt->principalesUbicacionesGeograficas))
        @foreach($dpt->principalesUbicacionesGeograficas as $dlgeo)
        @include('contenido.ubicacionesGeograficas',[
        'dlgeo'=>$dlgeo,
        'indiceLgeo' => $loop->index,
        'indicept' => $indicept
        ])
        @endforeach
      @endif
    </div>
    <div class="col clearfix">
    <button class="btn btn-primary float-right mb-4 agregarUbicacionGeo" id="agregarUbicacionGeo${id}">Agregar ubicación</button>
    </div>
  </div>
</div>