            <div class="card card-primary" id="{{$tipo}}_{{$indice}}" idCamposMinimos="{{$titular->idCamposMinimosFirmante}}">
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
                            <div class="row mb-3"><h4>I. TIPO DE ACTUACIÓN FIRMANTE</h4></div>
                            <!-- .row -->
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-check">
                                       <div>
                                            <label>El {{$tipolabel}} actúa en nombre propio</label>
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
                            <div id="camposMinimos{{$tipo}}_{{$indice}}" idatospersonales="{{$titular->firmante->idDatosPersonales}}">
                                @include('contenido.datosPersonales',[
                                    'tipo'=>$tipo,
                                    'datosPersonales' => $titular["firmante"],
                                    'tituloLabel'=> 'Otro Firmante'
                                    ])
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