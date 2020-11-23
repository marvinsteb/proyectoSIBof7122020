<div class="card card-primary" id="{{$tipo}}_{{$indice}}">
                        <div class="card-header">
                            <h3 class="card-title">Titular</h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <!-- /.card-header -->

                        <div class="card-body">
                            <div class="row mb-3"><h4>I. TIPO DE ACTUACIÓN</h4></div>
                            <!-- .row -->
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-check">
                                       <div>
                                            <label>El {{$tipo}} actúa en nombre propio</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="siActua{{$tipo}}_{{$indice}}" class="actuaNombrePropio form-check-input" name="tipoActuacion{{$tipo}}_{{$indice}}" value="C" required {{ $titular->tipoActuacion == 'C' ? 'checked' : ''}}/>
                                            <label for="siActua{{$tipo}}_{{$indice}}">Sí</label>
                                        </div>
                                        <div class="icheck-primary d-inline">
                                            <input type="radio" id="noActua{{$tipo}}_{{$indice}}" class="actuaNombrePropio form-check-input" name="tipoActuacion{{$tipo}}_{{$indice}}" value="R" required {{ $titular->tipoActuacion == 'R' ? 'checked' : ''}}/>
                                            <label for="noActua{{$tipo}}_{{$indice}}">No</label>
                                            <div class="invalid-tooltip">Indica el tipo de actuación</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for ="calidadActua{{$tipo}}_{{$indice}}">Calidad con que actúa</label>
                                        <input name="calidadActua{{$tipo}}_{{$indice}}" id="calidadActua{{$tipo}}_{{$indice}}" type="text" class="form-control calidadActua" placeholder="Calidad con que actúa ..." maxlength="100" {{ $titular->tipoActuacion == 'R' ? '' : 'disabled'}} value="{{$titular->calidadActua}}"/>
                                        <div class="invalid-tooltip">Por Ejemplo: Mandatario, Patria potestad, Tutor, Otros.</div>
                                    </div>
                                </div>
                            </div>
                            <!-- .row -->

                            <!-- II. LUGAR Y FECHA -->
                            <div class="row">
                                <div class="col-sm-12 mb-3">
                                    <h4>II. LUGAR Y FECHA</h4>
                                </div>
                                <!-- select pais -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>País</label>
                                        <select name="paisCaMi{{$tipo}}_{{$indice}}" id="paisCaMi{{$tipo}}_{{$indice}}" class="form-control custom-select paisCaMi{{$tipo}} deshabilitaDepartamentoMunicipio select2" style="width: 100%" required>
                                            <option value="" disabled selected>Selecciona</option>
                                            @foreach($paises as $pais)
                                                @if($pais->nombrePais == $titular["lugar"]["nombrePais"])
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
                                        <label>Departamento</label>
                                        <select name="deptoCaMi{{$tipo}}_{{$indice}}" id="deptoCaMi{{$tipo}}_{{$indice}}" class="form-control custom-select deptoCaMi{{$tipo}} getMunicipio select2" style="width: 100%" required {{$titular["lugar"]["pais"] == 'GT' ? '' : 'disabled'}}>
                                            <option value="" disabled selected>Selecciona</option>
                                            @foreach($departamentos as $departamento)
                                                @if($departamento->nombreDepartamento == $titular["lugar"]["nombreDepartamento"])
                                                    <option value="{{$departamento->idDepartamento}}" selected>{{$departamento->nombreDepartamento}}</option>
                                                @else
                                                    <option value="{{$departamento->idDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <!-- select muni -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Municipio</label>
                                        <select name="muniCaMi{{$tipo}}_{{$indice}}" id="muniCaMi{{$tipo}}_{{$indice}}" class="form-control custom-select muniCaMi{{$tipo}} setMunicipio select2" style="width: 100%" required {{$titular["lugar"]["pais"] == 'GT' ? '' : 'disabled'}}>
                                            
                                        </select>
                                    </div>
                                </div>
                                <!-- fecha -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Fecha</label>
                                        <div class="input-group date" id="fechaDoc_{{$indice}}" data-target-input="nearest">
                                            <input name="fechaDocCaMi{{$tipo}}_{{$indice}}" id="fechaDocCaMi{{$tipo}}_{{$indice}}" type="text" class="form-control datetimepicker-input fechaCaMi{{$tipo}}" data-target="#fechaDoc_{{$indice}}" required value="{{\Carbon\Carbon::parse($titular["fecha"])->format('dd/mm/yyyy')}}" />
                                            <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                                            <div class="input-group-append" data-target="#fechaDoc_{{$indice}}" data-toggle="datetimepicker">
                                                <div class="input-group-text">
                                                    <i class="fa fa-calendar"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- .row -->
                            <div id="camposMinimos{{$tipo}}_{{$indice}}">
                                 <div class="card card-info mt-3">
                                    <div class="card-header">
                                        <h3 class="card-title">Información del {{$tipo}}</h3>
                                        <div class="card-tools">
                                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Primer Apellido</label>
                                                            <input name="primerApellido{{$tipo}}_{{$indice}}" id="primerApellido{{$tipo}}_{{$indice}}" type="text" class="form-control primerApellido{{$tipo}}" placeholder="Primer Apellido ..." maxlength="15" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Segundo apellido</label>
                                                            <input name="segundoApellido{{$tipo}}_{{$indice}}" id="segundoApellido{{$tipo}}_{{$indice}}" type="text" class="form-control segundoApellido{{$tipo}}" placeholder="Segundo apellido ..." maxlength="15" />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label for="apellidoCasada{{$tipo}}_{{$indice}}">Apellido casada</label>
                                                            <input name="apellidoCasada{{$tipo}}_{{$indice}}" id="apellidoCasada{{$tipo}}_{{$indice}}" type="text" class="form-control apellidoCasada{{$tipo}}" placeholder="Apellido casada ..." maxlength="15" />
                                                            <div class="invalid-tooltip">No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido. </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Primer nombre</label>
                                                            <input name="primerNombre{{$tipo}}_{{$indice}}" id="primerNombre{{$tipo}}_{{$indice}}" type="text" class="form-control primerNombre{{$tipo}}" placeholder="Primer nombre ..." maxlength="15" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Segundo nombre</label>
                                                            <input name="segundoNombre{{$tipo}}_{{$indice}}" id="segundoNombre{{$tipo}}_{{$indice}}" type="text" class="form-control segundoNombre{{$tipo}}" placeholder="Segundo nombre ..." maxlength="15" />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Otros nombre</label>
                                                            <input name="otrosNombres{{$tipo}}_{{$indice}}" id="otrosNombres{{$tipo}}_{{$indice}}" type="text" class="form-control otrosNombres{{$tipo}}" placeholder="Otros nombres ..." maxlength="30" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- .row -->

                                                <div class="row">
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Fecha nacimiento</label>
                                                            <div class="input-group date" id="fechaNacimiento" data-target-input="nearest">
                                                                <input name="fechaNacimiento{{$tipo}}_{{$indice}}" id="fechaNacimiento{{$tipo}}_{{$indice}}" type="text" class="form-control datetimepicker-input fechaNacimiento{{$tipo}}" data-target="#fechaNacimiento" required />
                                                                <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                                                                <div class="input-group-append" data-target="#fechaNacimiento" data-toggle="datetimepicker">
                                                                    <div class="input-group-text">
                                                                        <i class="fa fa-calendar"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>País nacimiento</label>
                                                            <select name="paisNacimiento{{$tipo}}_{{$indice}}" id="paisNacimiento{{$tipo}}_{{$indice}}" class="form-control custom-select paisNacimiento{{$tipo}} deshabilitaDepartamentoMunicipio setPais select2" style="width: 100%" required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                @foreach($paises as $pais)
                                                                <option value="{{$pais->idPais}}">
                                                                    {{$pais->nombrePais}}
                                                                </option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <!-- select departamento -->
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Depto. nacimiento</label>
                                                            <select name="deptoNacimiento{{$tipo}}_{{$indice}}" id="deptoNacimiento{{$tipo}}_{{$indice}}" class="form-control custom-select deptoNacimiento{{$tipo}} getMunicipio select2" style="width: 100%" required disabled>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                @foreach($departamentos as $departamento)
                                                                <option value="{{$departamento->idDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!-- select muni -->
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Municipio nacimiento</label>
                                                            <select name="muniNacimiento{{$tipo}}_{{$indice}}" id="muniNacimiento{{$tipo}}_{{$indice}}" class="form-control custom-select muniNacimiento{{$tipo}} setMunicipio select2" style="width: 100%" required disabled>
                                                                <option value="" disabled selected>Selecciona</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Condición migratoria</label>
                                                            <select name="condicionMigratoria{{$tipo}}_{{$indice}}" id="condicionMigratoria{{$tipo}}_{{$indice}}" class="form-control custom-select condicionMigratoria select2" style="width: 100%" disabled required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                @foreach($listaCondicionMigratoria as $condicionMigratoria)
                                                                <option value="{{$condicionMigratoria->idListaCondicionMigratoria}}">{{$condicionMigratoria->descripcion}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Especifique</label>
                                                            <input name="otraCoMi{{$tipo}}_{{$indice}}" id="otraCoMi{{$tipo}}_{{$indice}}" type="text" class="form-control otraCoMi" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- .row -->

                                                <div class="row">
                                                    <!-- sexo {{$tipo}} -->
                                                    <div class="col-sm-2">
                                                        <div class="form-group">
                                                            <label>Sexo</label>
                                                            <select name="sexo{{$tipo}}_{{$indice}}" id="sexo{{$tipo}}_{{$indice}}" class="form-control custom-select sexo{{$tipo}} select2" style="width: 100%" required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                <option value="M">Masculino</option>
                                                                <option value="F">Femenino</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!-- .col-sm -->
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Estado civil</label>
                                                            <select name="estadoCivil{{$tipo}}_{{$indice}}" id="estadoCivil{{$tipo}}_{{$indice}}" class="form-control custom-select estadoCivil select2" style="width: 100%" required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                <option value="S">Soltero</option>
                                                                <option value="C">Casado</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!-- .col-sm -->

                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Nit</label>
                                                            <input name="nit{{$tipo}}_{{$indice}}" id="nit{{$tipo}}_{{$indice}}" type="text" class="form-control validarNit" placeholder="Nit ..." maxlength="20" />
                                                        </div>
                                                    </div>

                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Docto. identificación</label>
                                                            <select name="tipoDoctoIdentificacion{{$tipo}}_{{$indice}}" id="tipoDoctoIdentificacion{{$tipo}}_{{$indice}}" class="form-control custom-select tipoDoctoIdentificacion validaPaisPasaporte select2" style="width: 100%" required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                <option value="D">DPI</option>
                                                                <option value="P">Pasaporte</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Número identificación</label>
                                                            <input name="noDocIdentificacion{{$tipo}}_{{$indice}}" id="noDocIdentificacion{{$tipo}}_{{$indice}}" type="text" class="form-control noDocIdentificacion" placeholder="Número identificación..." maxlength="20" required disabled/>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>País (Pasaporte)</label>
                                                            <select name="emicionPasaporte{{$tipo}}_{{$indice}}" id="emicionPasaporte{{$tipo}}_{{$indice}}" class="form-control custom-select emicionPasaporte select2" style="width: 100%" disabled required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                @foreach($paises as $pais)
                                                                <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- .row -->

                                                <div class="row">
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Profesión u oficio</label>
                                                            <input name="profecionOficio{{$tipo}}_{{$indice}}" id="profecionOficio{{$tipo}}_{{$indice}}" type="text" class="form-control profecionOficio{{$tipo}}" placeholder="Profesión u oficio ..." maxlength="100" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Correo electrónico</label>
                                                            <input name="email{{$tipo}}_{{$indice}}" id="email{{$tipo}}_{{$indice}}" type="email" class="form-control email{{$tipo}}" placeholder="Correo electrónico ..." maxlength="100" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- .row -->

                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <h5>Residencia</h5>
                                                    </div>
                                                    <br />
                                                    <br />
                                                </div>
                                                <!-- .row -->

                                                <div class="row">
                                                    <div class="col-sm">
                                                        <label>Dirección de residencia completa (calle o avenida, número de casa, colonia, sector, lote, manzana, otros)</label>
                                                        <input name="direccionRecidencia{{$tipo}}_{{$indice}}" id="direccionRecidencia{{$tipo}}_{{$indice}}" type="text" class="form-control direccionRecidencia{{$tipo}}" placeholder="Dirección de residencia completa ..." maxlength="400" required />
                                                    </div>
                                                </div>
                                                <!-- .row -->

                                                <div class="row">
                                                    <!-- select pais nacimiento {{$tipo}} -->
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>País residencia</label>
                                                            <select name="paisRecidencia{{$tipo}}_{{$indice}}" id="paisRecidencia{{$tipo}}_{{$indice}}" class="form-control custom-select paisRecidencia{{$tipo}} deshabilitaDepartamentoMunicipio setPais select2" style="width: 100%" required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                @foreach($paises as $pais)
                                                                <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <!-- select departamento -->
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Departamento residencia</label>
                                                            <select name="deptoRecidencia{{$tipo}}_{{$indice}}" id="deptoRecidencia{{$tipo}}_{{$indice}}" class="form-control custom-select deptoRecidencia{{$tipo}} getMunicipio select2" style="width: 100%" required disabled>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                @foreach($departamentos as $departamento)
                                                                <option value="{{$departamento->idDepartamento}}">{{$departamento->nombreDepartamento}}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!-- select muni -->
                                                    <div class="col-sm">
                                                        <div class="form-group">
                                                            <label>Municipio residencia</label>
                                                            <select name="muniRecidencia{{$tipo}}_{{$indice}}" id="muniRecidencia{{$tipo}}_{{$indice}}" class="form-control custom-select muniRecidencia{{$tipo}} setMunicipio select2" style="width: 100%" required disabled>
                                                                <option value="" disabled selected>Selecciona</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm" id="nacionalidad{{$tipo}}_{{$indice}}" cantidad="1">
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <label>Nacionalidad</label>
                                                                    <select name="nacionalidad{{$tipo}}_{{$indice}}" id="nacionalidad{{$tipo}}_1_{{$indice}}" class="form-control custom-select nacionalidad select2" style="width: 100%" required>
                                                                        <option value="" disabled selected>Selecciona</option>
                                                                        @foreach($paises as $pais)
                                                                        <option value="{{$pais->idPais}}">{{$pais->nombrePais}}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                                <div class="col-sm my-auto pt-2"></div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <button type="button" id="agregarNacionalidad{{$tipo}}_{{$indice}}" class="btn btn-primary agregarNacionalidad{{$tipo}}">
                                                                Agregar Nacionalidad
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <!-- .nacionalidad -->
                                                    <div class="col-sm" id="telefono{{$tipo}}_{{$indice}}" cantidad="1">
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                    <label>Teléfonos:</label>
                                                                    <input name="telefono{{$tipo}}_1_{{$indice}}" id="telefono{{$tipo}}_1_{{$indice}}" type="text" class="form-control telefono" placeholder="telefono ..." maxlength="30" required />
                                                                </div>
                                                                <div class="col-sm"></div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <button type="button" id="agregarTelefono{{$tipo}}_{{$indice}}" class="btn btn-primary agregarTelefono{{$tipo}}">
                                                                Agregar teléfono
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <!-- .telefono -->
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-check">
                                                            <div><label>¿El {{$tipo}} es Contratista y Proveedor del Estado (CPE)?</label></div>
                                                            <div class="icheck-primary d-inline">
                                                                <input type="radio" id="cpeSi{{$tipo}}_{{$indice}}" class="cpe form-check-input" name="cpe{{$tipo}}_{{$indice}}" value="S" required />
                                                                <label for="cpeSi{{$tipo}}_{{$indice}}">Sí</label>
                                                            </div>
                                                            <div class="icheck-primary d-inline">
                                                                <input type="radio" id="cpeNo{{$tipo}}_{{$indice}}" class="cpe form-check-input" name="cpe{{$tipo}}_{{$indice}}" value="N" required />
                                                                <label for="cpeNo{{$tipo}}_{{$indice}}">No</label>
                                                                <div class="invalid-tooltip">Indica si el {{$tipo}} es CPE.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-check">
                                                            <div>
                                                                <label>¿El {{$tipo}} es una Persona Expuesta Políticamente (PEP)?</label>
                                                            </div>
                                                            <div class="icheck-primary d-inline">
                                                                <input type="radio" id="primaryPepSi_{{$indice}}" class="pep form-check-input" name="pep{{$tipo}}_{{$indice}}" value="S" required />
                                                                <label for="primaryPepSi_{{$indice}}">Sí</label>
                                                            </div>
                                                            <div class="icheck-primary d-inline">
                                                                <input type="radio" id="primaryPepNo_{{$indice}}" class="pep form-check-input" name="pep{{$tipo}}_{{$indice}}" value="N" required />
                                                                <label for="primaryPepNo_{{$indice}}">No</label>
                                                                <div class="invalid-tooltip">Indica si el {{$tipo}} es PEP.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="datospep{{$tipo}}_{{$indice}}"></div>

                                                <div class="row">
                                                    <div class="col-sm">
                                                        <div class="form-check">
                                                            <div>
                                                                <label>¿El {{$tipo}} tiene parentesco o es asociado cercano a una Persona Expuesta Políticamente (PEP)?</label>
                                                            </div>
                                                            <div class="icheck-primary d-inline">
                                                                <input type="radio" id="primaryAsoPep{{$tipo}}Si_{{$indice}}" class="asoPep{{$tipo}} form-check-input" name="asoPep{{$tipo}}_{{$indice}}" value="S" required />
                                                                <label for="primaryAsoPep{{$tipo}}Si_{{$indice}}">Sí</label>
                                                            </div>
                                                            <div class="icheck-primary d-inline">
                                                                <input type="radio" id="primaryAsoPep{{$tipo}}No_{{$indice}}" class="asoPep{{$tipo}} form-check-input" name="asoPep{{$tipo}}_{{$indice}}" value="N" required />
                                                                <label for="primaryAsoPep{{$tipo}}No_{{$indice}}">No</label>
                                                                <div class="invalid-tooltip">Indica si el {{$tipo}} tine un tiene parentesco o es asociadoa una Persona PEP.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="datosasoPep{{$tipo}}_{{$indice}}">
                                                    <div class="info" cantidad="0">
                                                    </div>
                                                    <div class="btnadd">
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                            </div>
                            <div id="informacionEconomicaIncial{{$tipo}}_{{$indice}}">
                                <div class="card card-info mt-3">
                                    <div class="card-header">
                                        <h3 class="card-title">Información económica del {{$tipo}}</h3>
                                        <div class="card-tools">
                                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-9">
                                                <div class="form-group">
                                                    <label for="montoIngresos{{$tipo}}_{{$indice}}" class = "d-inline">Monto mensual aproximado de los ingresos considerando todas las actividades económicas a las que se dedica (monto en quetzales)</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <div class="form-group">
                                                    <input type="number" name = "montoIngresos" id="montoIngresos{{$tipo}}_{{$indice}}" class="form-control d-inline" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label for="propositoRC{{$tipo}}_{{$indice}}">Propósito de la relación de negocios</label>
                                                    <input name="propositoRC" id="propositoRC{{$tipo}}_{{$indice}}" type="text" class="form-control" placeholder="Propósito de la relación de negocios..." maxlength="400" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="datosfuenteingresos{{$tipo}}_{{$indice}}">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <div class="form-group">
                                                        <label for="">Fuente de ingresos</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="fuenteingresos{{$tipo}}_{{$indice}}" cantidad = "0" idinput= "">
                                                <div class="row">
                                                    <div class="col-sm-2">
                                                        <div class="form-group">
                                                            <select name="selectfuenteingresos" id="selectfuenteingresos{{$tipo}}_1_0" class="form-control custom-select select2 fuenteIngresos" style="width: 100%" required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                                <option value="NP">Negocio propio</option>
                                                                <option value="RD">Relación de dependencia</option>
                                                                <option value="OI">Otras fuentes de ingreso</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm">
                                                        <div class="form-group row">
                                                                <div class="col-sm-2">
                                                                    <label for="inputfuenteingresos{{$tipo}}_1_0" class="ml-4" id="labelfuenteingresos{{$tipo}}_1_0"></label>
                                                                </div>
                                                                <div class="col-sm ml-2">
                                                                    <input name="inputfuenteingresos" id="inputfuenteingresos{{$tipo}}_1_0" type="text" class="form-control" required disabled/>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group">
                                                    <button type="button" id="agregarFuenteIngresos{{$tipo}}_{{$indice}}" class="btn btn-primary agregarFuenteIngresos">Agregar fuente de ingresos</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="representante{{$tipo}}_{{$indice}}">
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>