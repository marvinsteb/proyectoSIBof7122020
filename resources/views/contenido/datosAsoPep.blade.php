<div class="card card-primary" id="asoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" idDatosParienteAsociadoPep="{{$datosParienteAsociadoPep->idDatosParienteAsociadoPep}}">

  <div class="card-header">
    <h3 class="card-title">Familiar Asociado {{$indicePep + 1 }}</h3>
    <div class="card-tools">
      <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
      </button>
      @if($indicePep != 0)
      <button type="button" class="btn btn-tool" data-card-widget="remove">
        <i class="fas fa-times"></i>
      </button>
      @endif
    </div>
  </div>
  <div class="card-body">
    <div class="row">
      <div></div>
      <div class="col-sm">
        <div class="form-group">
          <label for="parentescoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}">Parentesco <span>*</span></label>
          <select name="parentescoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="parentescoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" class="form-control custom-select parentesco select2" targetOtro="otroParentesco" style="width: 100%" required>
            <option value="" disabled="" selected="">Selecciona</option>
            <option value="1" {{$datosParienteAsociadoPep->parentesco == '1' ? 'selected' : ''}}>Padre</option>
            <option value="2" {{$datosParienteAsociadoPep->parentesco == '2' ? 'selected' : ''}}>Madre</option>
            <option value="3" {{$datosParienteAsociadoPep->parentesco == '3' ? 'selected' : ''}}>Hijo</option>
            <option value="4" {{$datosParienteAsociadoPep->parentesco == '4' ? 'selected' : ''}}>Hermano</option>
            <option value="5" {{$datosParienteAsociadoPep->parentesco == '5' ? 'selected' : ''}}>Cónyuge</option>
            <option value="6" {{$datosParienteAsociadoPep->parentesco == '6' ? 'selected' : ''}}>Otro</option>
          </select></div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Especifique
            <span
            @if($datosParienteAsociadoPep->parentesco != '6') 
              class="oculto"
            @endif
            >*</span>
          </label>
          <input name="otroParentescoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="otroParentescoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control otroParentesco" placeholder="Especifique ..." maxlength="100" required {{$datosParienteAsociadoPep->parentesco == '6' ? '' : 'disabled'}} value="{{$datosParienteAsociadoPep->otroParentesco}}">
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="motivoAsociacionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}">Motivo asociación</label>
          <select name="motivoAsociacionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="motivoAsociacionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" class="form-control custom-select motivoAsociacion select2" targetOtro="otroMotivoAsociacion" style="width: 100%" required>
            <option value="" disabled="" selected="">Selecciona</option>
            <option value="1" {{$datosParienteAsociadoPep->motivoAsociacion == '1' ? 'selected' : ''}}>Profesionales</option>
            <option value="2" {{$datosParienteAsociadoPep->motivoAsociacion == '2' ? 'selected' : ''}}>Políticos</option>
            <option value="3" {{$datosParienteAsociadoPep->motivoAsociacion == '3' ? 'selected' : ''}}>Comerciales</option>
            <option value="4" {{$datosParienteAsociadoPep->motivoAsociacion == '4' ? 'selected' : ''}}>Negocios</option>
            <option value="5" {{$datosParienteAsociadoPep->motivoAsociacion == '5' ? 'selected' : ''}}>Otros</option>
          </select></div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Especifique</label>
          <input name="otroMotivoAsociacionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="otroMotivoAsociacionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control otroMotivoAsociacion" placeholder="Especifique ..." maxlength="100" {{$datosParienteAsociadoPep->motivoAsociacion == '5' ? '' : 'disabled'}} value="{{$datosParienteAsociadoPep->otroMotivoAsociacion}}" required>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="sexoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}">Sexo</label>
          <select name="sexoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="sexoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" class="form-control custom-select sexo select2" style="width: 100%" required="">
            <option value="" disabled="" selected="">Selecciona</option>
            <option value="M" {{$datosParienteAsociadoPep->sexo == 'M' ? 'selected' : ''}}>Masculino</option>
            <option value="F" {{$datosParienteAsociadoPep->sexo == 'F' ? 'selected' : ''}}>Femenino</option>
          </select></div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="condicionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}">Condición</label>
          <select name="condicionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="condicionasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" class="form-control custom-select select2" style="width: 100%" required="">
            <option value="">Selecciona</option>
            <option value="N" {{$datosParienteAsociadoPep->condicion == 'N' ? 'selected' : ''}}>Nacional</option>
            <option value="E" {{$datosParienteAsociadoPep->condicion == 'E' ? 'selected' : ''}}>Extranjero</option>
          </select></div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <label>Primer Apellido</label>
          <input name="primerApellidoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="primerApellidoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control primerApellido" placeholder="Primer Apellido ..." maxlength="15" required value="{{$datosParienteAsociadoPep->primerApellido}}" />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Segundo apellido</label>
          <input name="segundoApellidoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="segundoApellidoasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control segundoApellido" placeholder="Segundo apellido ..." maxlength="15" value="{{$datosParienteAsociadoPep->segundoApellido == 'SOA' ? '' : $datosParienteAsociadoPep->segundoApellido}}" />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="apellidoCasadaasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}">Apellido casada</label>
          <input name="apellidoCasadaasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="apellidoCasadaasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control apellidoCasada" placeholder="Apellido casada ..." maxlength="15" value="{{$datosParienteAsociadoPep->apellidoCasada}}" />
          <div class="invalid-tooltip">No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido. </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Primer nombre</label>
          <input name="primerNombreasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="primerNombreasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control primerNombre" placeholder="Primer nombre ..." maxlength="15" required value="{{$datosParienteAsociadoPep->primerNombre}}" />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Segundo nombre</label>
          <input name="segundoNombreasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="segundoNombreasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control segundoNombre" placeholder="Segundo nombre ..." maxlength="15" value="{{$datosParienteAsociadoPep->segundoNombre == 'SON' ? '' : $datosParienteAsociadoPep->segundoNombre}}" />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Otros nombre</label>
          <input name="otrosNombresasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="otrosNombresasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control otrosNombres" placeholder="Otros nombres ..." maxlength="30" value="{{$datosParienteAsociadoPep->otrosNombres}}" />
        </div>
      </div>
    </div>

    <div class="row">
      <div></div>
      <div class="col-sm">
        <div class="form-group">
          <label for="entidadasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}">Entidad</label>
          <input name="entidadasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="entidadasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required required value="{{$datosParienteAsociadoPep->entidad}}">
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label>Puesto que desempeña</label>
          <input name="puestoDesempeniaasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="puestoDesempeniaasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" type="text" class="form-control puestoDesempenia" placeholder="Puesto que desempeña ..." maxlength="200" required value="{{$datosParienteAsociadoPep->puestoDesempenia}}"></div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="paisasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}">País de la institución o entidad</label>
          <select name="paisasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" id="paisasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" class="form-control custom-select pais setPais select2 select2-hidden-accessible" style="width: 100%" required="" data-select2-id="paisasoPep{{$tipo}}_{{$indice}}_{{$indicePep}}" tabindex="-1" aria-hidden="true">
            <option value="" disabled selected>Selecciona</option>
            @foreach($paises as $pais)
            @if($pais->codigoPais == $datosParienteAsociadoPep->paisEntidad)
            <option value="{{$pais->idPais}}" selected>{{$pais->nombrePais}}</option>
            @else
            <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
            @endif
            @endforeach
          </select>
        </div>
      </div>
    </div>
  </div>
</div>