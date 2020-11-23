            <div class="card card-primary" id="{{$tipo}}_{{$indice}}" idCamposMinimos="{{$titular->idCamposMinimos}}">
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
                                @include('contenido.camposPais',[
                                    'lugar'=>$titular["lugar"],
                                    'tipoCampo'=>'CaMi'
                                ])
                                <!-- fecha -->
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Fecha</label>
                                        <div class="input-group date" id="fechaDoc_{{$indice}}" data-target-input="nearest">
                                            <input name="fechaDocCaMi{{$tipo}}_{{$indice}}" id="fechaDocCaMi{{$tipo}}_{{$indice}}" type="text" class="form-control datetimepicker-input fechaCaMi{{$tipo}}" data-target="#fechaDoc_{{$indice}}" required value="{{\Carbon\Carbon::parse($titular["fecha"])->format('d/m/Y')}}" />
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
                            <div id="camposMinimos{{$tipo}}_{{$indice}}" idatospersonales="{{$titular->cliente->idDatosPersonales}}">
                                @include('contenido.datosPersonales',[
                                    'tipo'=>'Cliente',
                                    'datosPersonales' => $titular["cliente"]
                                    ])
                            </div>
                            <div id="informacionEconomicaIncial{{$tipo}}_{{$indice}}" idinformacioniconomicainicial="{{$titular->infoEconomica->idInformacionEconomicaInicial}}">
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