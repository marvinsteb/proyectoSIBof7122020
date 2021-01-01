<div class="card card-info mt-3" id="otrosIngresos_1" idOI="{{$doi->idPerfilEconomicoOtrosIngresos}}">
  <div class="card-header">
    <h3 class="card-title">Otros ingreso {{$indiceoi +1}}</h3>
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
          <label for="tipoOtrosIngresosPet">Tipo de ingreso <span>*</span></label>
          <select name="tipoOtrosIngresosPet" id="tipoOtrosIngresosPet1" class="form-control custom-select tipoOtrosIngresos select2 select2-hidden-accessible" style="width: 100%" required>
            <option value="" disabled="" selected="" data-select2-id="36">Selecciona</option>
            <option value="1" {{$doi->tipoOtrosIngresos == '1' ? 'selected' : ''}}>Actividades profecionales</option>
            <option value="2" {{$doi->tipoOtrosIngresos == '2' ? 'selected' : ''}}>Manutención</option>
            <option value="3" {{$doi->tipoOtrosIngresos == '3' ? 'selected' : ''}}>Rentas</option>
            <option value="4" {{$doi->tipoOtrosIngresos == '4' ? 'selected' : ''}}>Jubilación</option>
            <option value="5" {{$doi->tipoOtrosIngresos == '5' ? 'selected' : ''}}>Otra</option>
          </select>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Especificar otra fuente de ingresos <span>*</span></label>
          <input name="DetalleOtrosIngresos1" id="DetalleOtrosIngresos1" type="text" class="form-control DetalleOtrosIngresos" placeholder="Especificar otra fuente de ingresos ..." maxlength="400" required value="{{$doi->detalleOtrosIngresos}}"> 
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div class="form-group">
          <label for="moneda1">Moneda <span>*</span></label>
          <select name="moneda" class="form-control custom-select moneda select2" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
              @foreach($monedas as $moneda)
                  @if($moneda->codigoMoneda == $doi->tipoMoneda)
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
          <label>Monto aproximado ingresos <span>*</span></label>
          <input type="number" name="montoAproximado" class="form-control d-inline montoAproximado" placeholder="0.00" min="0" step=".01" style="text-align:right;" required value="{{$doi->montoAproximado}}">
        </div>
      </div>
    </div>
  </div>
</div>