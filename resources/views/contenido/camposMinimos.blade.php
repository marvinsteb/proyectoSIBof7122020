            <div class="card card-primary" id="{{$tipo}}_{{$indice}}" idCamposMinimos="{{$titular->idCamposMinimos}}">
                        <div class="card-header">
                            <h3 class="card-title">{{$tipolabel}} {{$indice + 1}}</h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                                @if($indice != 0)
                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                    <i class="fas fa-times"></i>
                                </button>
                                @endif
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
                                            <label>El {{$tipo}} actúa en nombre propio <span>*</span></label>
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
                                        <label for ="calidadActua{{$tipo}}_{{$indice}}">Calidad con que actúa <span>*</span></label>
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
                                    'tipo'=>$tipo,
                                    'datosPersonales' => $titular["cliente"],
                                    'tituloLabel'=> $tipo
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
                                                    <input type="number" name = "montoIngresos" id="montoIngresos{{$tipo}}_{{$indice}}" class="form-control d-inline" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required value="{{$titular->infoEconomica->montoIngresos}}"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label for="propositoRC{{$tipo}}_{{$indice}}">Propósito de la relación de negocios</label>
                                                    <input name="propositoRC" id="propositoRC{{$tipo}}_{{$indice}}" type="text" class="form-control" placeholder="Propósito de la relación de negocios..." maxlength="400" required  value="{{$titular->infoEconomica->propositoRC}}"/>
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
                                            <div id="fuenteingresos{{$tipo}}_{{$indice}}" cantidad = "{{count($titular->infoEconomica->negocioPropio) + count($titular->infoEconomica->relacionDependencia) + count($titular->infoEconomica->otrosIngresos)}}" idinput= "">
                                                @foreach($titular->infoEconomica->negocioPropio as $negocio)
                                                    @include('contenido.fuentesIngreso',['valueFN'=>$negocio["nombreComercial"],
                                                                                         'textoFN'=>'Nombre comercial',
                                                                                         'nameFN'=>'nombreComercial',
                                                                                         'tipoFN'=>'NP',
                                                                                         'indice' => $loop->index
                                                                                         ])
                                                @endforeach
                                                @foreach($titular->infoEconomica->relacionDependencia as $rd)
                                                    @include('contenido.fuentesIngreso',['valueFN'=>$rd["nombreEmpleador"],
                                                                                            'textoFN'=>'Nombre empleador',
                                                                                            'nameFN'=>'nombreEmpleador',
                                                                                            'tipoFN'=>'RD',
                                                                                            'indice' => 2

                                                                                            ])
                                                @endforeach
                                                @foreach($titular->infoEconomica->otrosIngresos as $rd)
                                                    @include('contenido.fuentesIngreso',['valueFN'=>$rd["otrasFuentesIngreso"],
                                                                                            'textoFN'=>'Otras fuentes de ingreso',
                                                                                            'nameFN'=>'otrasFuentesIngresos',
                                                                                            'tipoFN'=>'OI',
                                                                                            'indice' => 2

                                                                                            ])
                                                @endforeach
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
                            <div id="representante{{$tipo}}_{{$indice}}" idrepresentante="{{$titular->tipoActuacion == 'R' ? $titular->representante->idDatosPersonales : ''}}">
                                @if($titular->tipoActuacion == 'R')
                                 @include('contenido.datosPersonales',[
                                    'tipo'=>'Representante'.$tipo,
                                    'datosPersonales' => $titular["representante"],
                                    'tituloLabel'=>'representante'
                                    ])
                                @endif
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>