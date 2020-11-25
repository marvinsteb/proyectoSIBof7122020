  <div class="row">
    <div class="col-sm">
      <div class="form-group">
        <label for="entidadpep{{$tipo}}_{{$indice}}">Entidad</label>
        <input name="entidadpep{{$tipo}}_{{$indice}}" id="entidadpep{{$tipo}}_{{$indice}}" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required value="{{$datosPep->entidad}}"/>
      </div>
    </div>
    <div class="col-sm">
      <div class="form-group">
        <label for="puestoDesepeniapep{{$tipo}}_{{$indice}}">Puesto que desempeña</label>
        <input name="puestoDesepeniapep{{$tipo}}_{{$indice}}" id="puestoDesepeniapep{{$tipo}}_{{$indice}}" type="text" class="form-control" placeholder="Puesto que desempeña ..." maxlength="200" required value="{{$datosPep->puestoDesempenia}}"/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm">
      <div class="form-group">
        <label for="paisEntidadpep{{$tipo}}_{{$indice}}">País entidad</label>
        <select name="paisEntidadpep{{$tipo}}_{{$indice}}" id="paisEntidadpep{{$tipo}}_{{$indice}}" class="form-control custom-select pais setPais otroOrigenRiqueza select2" required>
          <option value="" disabled selected>Selecciona</option>
          @foreach($paises as $pais)
              @if($pais->codigoPais == $datosPep->paisEntidad)
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
        <label for="origenRiquezapep{{$tipo}}_{{$indice}}">Origen o procedencia de su riqueza</label>
        <select name="origenRiquezapep{{$tipo}}_{{$indice}}" id="origenRiquezapep{{$tipo}}_{{$indice}}" class="form-control custom-select select2" style="width: 100%" required="">
          <option value="" disabled="" selected="">Selecciona</option>
          <option value="1" {{ $datosPep->origenRiqueza == '1' ? 'selected' : ''}}>Bienes muebles e inmuebles por herencia </option>
          <option value="2" {{ $datosPep->origenRiqueza == '2' ? 'selected' : ''}}>Bienes muebles e inmuebles</option>
          <option value="3" {{ $datosPep->origenRiqueza == '3' ? 'selected' : ''}}>Negocio propio</option>
          <option value="4" {{ $datosPep->origenRiqueza == '4' ? 'selected' : ''}}>Servicios profesionales</option>
          <option value="5" {{ $datosPep->origenRiqueza == '5' ? 'selected' : ''}}>Préstamos bancarios</option>
          <option value="6" {{ $datosPep->origenRiqueza == '6' ? 'selected' : ''}}>Trabajos anteriores</option>
          <option value="7" {{ $datosPep->origenRiqueza == '7' ? 'selected' : ''}}>Trabajo actual</option>
          <option value="8" {{ $datosPep->origenRiqueza == '8' ? 'selected' : ''}}>otro</option>
        </select>
      </div>
    </div>
    <div class="col-sm">
      <div class="form-group">
        <label id="otroOrigenRiquezapep{{$tipo}}_{{$indice}}">Especifique</label>
        <input name="otroOrigenRiquezapep{{$tipo}}_{{$indice}}" id="otroOrigenRiquezapep{{$tipo}}_{{$indice}}" type="text" class="form-control otroOrigenRiqueza" placeholder="Origen o procedencia de su riqueza ..." maxlength="100" required value="{{$datosPep->otroOrigenRiqueza}}" {{ $datosPep->origenRiqueza == '8' ? '' : 'disabled'}}/>
      </div>
    </div>
  </div>