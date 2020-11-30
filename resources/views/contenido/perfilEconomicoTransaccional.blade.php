<div class="row">
  <div class="col-sm">
    <div class="form-group">
      <label for="actualizacionPet">Tipo ingreso</label>
      <select name="actualizacionPet" id="actualizacionPet" class="form-control custom-select actualizacionPet select2" style="width: 100%" required>
        <option value="" disabled="" selected="">Selecciona</option>
        <option value="I" {{$perfil->actualizacion == 'I' ? 'selected' : ''}}>Perfil inicial</option>
        <option value="A" {{$perfil->actualizacion == 'A' ? 'selected' : ''}}>Actualización de perfil</option>
      </select>
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label>Fecha</label>
      <div class="input-group date" id="fechaPet_" data-target-input="nearest">
        <input name="fechaPet" id="fechaPet" type="text" class="form-control Pet datetimepicker-input" data-target="#fechaPet_" required value="{{\Carbon\Carbon::parse($perfil->fecha)->format('d/m/Y')}}">
        <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
        <div class="input-group-append" data-target="#fechaPet_" data-toggle="datetimepicker">
          <div class="input-group-text">
            <i class="fa fa-calendar"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="datosNegocioPropio col-sm-12" id="datosNegocioPropio" cantidad="{{!empty($perfil->negocioPropio) ? count($perfil->negocioPropio) : 0   }}">
    @if(!empty($perfil->negocioPropio))
     @foreach($perfil->negocioPropio as $negp)
      @include('contenido.perfilEconomicoTransaccionalNegocioPropio',[
        'negp'=>$negp,
        'indiceNeg' => $loop->index
      ])
     @endforeach
    @endif
  </div>
  <div class="form-group">
    <button type="button" id="agregarNegocioPropio" class="btn btn-primary agregarNegocioPropio">Agregar negocio propio</button>
  </div>
</div>

<div class="row">
  <div class="datosRelacionDependencia col-sm-12" id="datosRelacionDependencia" cantidad="{{!empty($perfil->relacionDependencia) ? count($perfil->relacionDependencia) : 0}}">
         @if(!empty($perfil->relacionDependencia))
              @foreach($perfil->relacionDependencia as $drd)
                @include('contenido.perfilEconomicoTransaccionalRelacionDependencia',[
                  'drd'=>$drd,
                  'indiceRd' => $loop->index
                ])
              @endforeach
         @endif
  </div>
  <div class="form-group">
    <button type="button" id="agregarRelacionDependencia" class="btn btn-primary agregarRelacionDependencia">Agregar Relación de Dependencia</button>
  </div>
</div>

<div class="row">
  <div class="datosOtrosIngresos col-sm-12" id="datosOtrosIngresos" cantidad="1">
         @if(!empty($perfil->otrosIngresos))
              @foreach($perfil->otrosIngresos as $doi)
                @include('contenido.perfilEconomicoTransaccionalOtrosIngresos',[
                  'doi'=>$doi,
                  'indiceoi' => $loop->index
                ])
              @endforeach
         @endif
  </div>
  <div class="form-group">
    <button type="button" id="agregarOtrosIngresos" class="btn btn-primary agregarOtrosIngresos">Agregar Otros Ingresos</button>
  </div>
</div>