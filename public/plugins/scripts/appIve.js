function setFormatoFecha() {
    var divInputFecha = $(".date");
    for (let i = 0; i < divInputFecha.length; i++) {
        $(divInputFecha[i]).datetimepicker({
            format: "DD/MM/YYYY",
        });
    }
}
function configurarAjax() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
}

function verificaActuaNombrePropio(elementoActuaNomprePropio) {
    for (let i = 0; i < elementoActuaNomprePropio.length; i++) {
        $(elementoActuaNomprePropio[i]).change(function () {
            let inputCalidadActua = $(this)
                .parent()
                .parent()
                .parent()
                .parent()
                .find("input.calidadActuaCliente");
            if (this.value === "C") {
                inputCalidadActua[0].disabled = true;
            } else if (this.value === "R") {
                inputCalidadActua[0].disabled = false;
            }
        });
    }
}

function habilitaDepartamentoMunicipio(selectPais) {
    for (let i = 0; i < selectPais.length; i++) {
        $(selectPais[i]).change(function () {
            let municipioDepartamento = $(this)
                .parent()
                .parent()
                .parent()
                .find("select");
            if (this.value == 1) {
                console.log(municipioDepartamento);
            } else {
                console.log(municipioDepartamento);
            }
        });
    }
}

function cargarMunicipio() {
    $(".departamento").change((event) => {
        $.get(`/departamentos/municipios/${event.target.value}`, function (
            res,
            sta
        ) {
            var selectHijos = $(event.target).attr("class").split(" ")[0];
            var selectActual = $(`.${selectHijos}`);
            $(selectActual[1]).empty();
            $(selectActual[1]).append(
                '<option value="" disabled selected>Selecciona</option>'
            );
            res.forEach((element) => {
                $(selectActual[1]).append(
                    `<option value=${element.idMunicipio}> ${element.nombreMunicipio} </option>`
                );
            });
        });
    });
}
function getPaises(callbak) {
    // implementa cargar pais
    $.get(`/pais/obtenerpaises`, function (res, sta) {
        callbak(res);
    });
}

function verificarClientePep() {
    var radioClientePep = $(".pepCliente");
    for (let i = 0; i < radioClientePep.length; i++) {
        $(radioClientePep[i]).change(function () {
            if (this.value != "N") {
                var filasDatosPepCliente = `<div class="row">
                                                    <div class="col-sm">
                                                    <div class="form-group">
                                                        <label>Entidad</label>
                                                        <input name="entidadClientePep" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required>
                                                    </div>
                                                    </div>
                                                    <div class="col-sm">
                                                    <div class="form-group">
                                                        <label for="">Puesto que desempeña</label>
                                                        <input name="puestoDesepenia" type="text" class="form-control" placeholder="Puesto que desempeña ..." maxlength="200" required>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm">
                                                    <div class="form-group">
                                                        <label>País entidad</label>
                                                        <select name="paisEntidadPepCliente" id="paisEntidadPepCliente" class="form-control" style="width: 100%;">
                                                            <option value="" disabled selected>Selecciona</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                    <div class="col-sm">
                                                    <div class="form-group">
                                                        <label>Origen o procedencia de su riqueza</label>
                                                        <select name="origenRiquezaPepCliente" id="origenRiquezaPepCliente" class="form-control" style="width: 100%;">
                                                            <option value="" disabled selected>Selecciona</option>
                                                            <option value="1"> Bienes muebles e inmuebles por herencia</option>
                                                            <option value="2"> Bienes muebles e inmuebles</option>
                                                            <option value="3"> Negocio propio</option>
                                                            <option value="4"> Servicios profesionales</option>
                                                            <option value="5"> Préstamos bancarios</option>
                                                            <option value="6"> Trabajos anteriores</option>
                                                            <option value="7"> Trabajo actual</option>
                                                            <option value="8"> otro</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                    <div class="col-sm">
                                                    <div class="form-group">
                                                        <label>Especifique</label>
                                                        <input name="otroOrigenRiquezaPepCliente" type="text" class="form-control" placeholder="Origen o procedencia de su riqueza ..." maxlength="100" required>
                                                    </div>
                                                    </div>
                                                </div>`;
                $(".datosPepCliente").append(filasDatosPepCliente);
                getPaises(function (element) {
                    element.forEach(function (pais) {
                        $("#paisEntidadPepCliente").append(
                            `<option value=${pais.idPais}> ${pais.nombrePais} </option>`
                        );
                    });
                });
            } else {
                $(".datosPepCliente div").remove();
            }
        });
    }
}

function agregaNacionalidadCLiente() {
    $("#agregarNacionalidaCliente").click(function () {
        var idPare = $(this).parent().parent().attr("id");
        $(`#${idPare}>div:nth-last-child(2)`).after(
            `<div class='form-group'>
                <div class="row">
                    <div class="col-sm">
                        <select name="nacionalidadCliente" class="form-control setPais" style="width: 100%" required>
                            <option value="" disabled selected>Selecciona</option>
                        </select>
                    </div>
                    <div class="col-sm my-auto">
                        <button type="button" class="btn btn-danger">borrar</button>
                    </div>
                </div>
            </div>`
        );
        $(`#${idPare}>div.form-group>div.row`)
            .find("button")
            .click(function () {
                $(this).parent().parent().parent().remove();
            });
        getPaises(function (reqPais) {
            reqPais.forEach(function (pais) {
                $(".setPais").append(
                    `<option value=${pais.idPais}> ${pais.nombrePais} </option>`
                );
            });
            $(".setPais").removeClass("setPais");
        });
    });
}

function agregarNumeroCliente() {
    $("#agregarTelefonoCliente").click(function () {
        var idDivPare = $(this).parent().parent().attr("id");
        $(`#${idDivPare}>div:nth-last-child(2)`).after(`
         <div class="form-group">
            <div class="row">
                <div class="col-sm">
                    <input
                    name="telefonoCliente"
                    type="text"
                    class="form-control"
                    placeholder="telefono ..."
                    maxlength="30"
                    required
                    />
                </div>
                <div class="col-sm my-auto">
                    <button
                    type="button"
                    class="btn btn-danger"
                    >
                    borrar
                    </button>
                </div>
            </div>
         </div
        `);
        $(`#${idDivPare}>div.form-group>div.row`)
            .find("button")
            .click(function () {
                console.log($(this).parent().parent().parent().remove());
            });
    });
}
function verificarAsoPep() {
    var asoPepCliente = $(".asoPepCliente");

    for (let i = 0; i < asoPepCliente.length; i++) {
        $(asoPepCliente[i]).change(function () {
            let divActual = $(asoPepCliente[i]);
            console.log(divActual);
            var camposAsocPep = `
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Familiar Asociado 1</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="parentescoPaAsPepCliente"
                                    >Parentesco</label
                                >
                                <select
                                    name="parentescoPaAsPepCliente"
                                    id="parentescoPaAsPepCliente"
                                    class="setPaAsPep form-control"
                                    style="width: 100%"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Selecciona
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="otroParentescoPaAsPepCliente"
                                    >Especifique</label
                                >
                                <input
                                    name="otroParentescoPaAsPepCliente"
                                    id="otroParentescoPaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Especifique ..."
                                    maxlength="100"
                                    required
                                />
                            </div>
                        </div>

                        <div class="col-sm">
                            <div class="form-group">
                                <label for="motivoAsociacion"
                                    >Motivo asociación</label
                                >
                                <select
                                    name="motivoAsociacionPaAsPepCliente"
                                    id="motivoAsociacionPaPepCliente"
                                    class="setPaAsPep form-control"
                                    style="width: 100%"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Selecciona
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="sexoPaAsPepCliente">Sexo</label>
                                <select
                                    name="sexoPaAsPepCliente"
                                    id="sexoPaAsPepCliente"
                                    class="form-control"
                                    style="width: 100%"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Selecciona
                                    </option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>
                        </div>

                        <div class="col sm-2">
                            <div class="form-group">
                                <label for="condicionPaAsPepCliente"
                                    >Condición</label
                                >
                                <select
                                    name="condicionPaAsPepCliente"
                                    id="condicionPaAsPepCliente"
                                    class="form-control"
                                    style="width: 100%"
                                    required
                                >
                                    <option value="">Selecciona</option>
                                    <option value="N">Nacional</option>
                                    <option value="E">Extranjero</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-group">
                                <label>Primer Apellido</label>
                                <input
                                    name="primerApellidoPaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Primer Apellido ..."
                                    maxlength="15"
                                    required
                                />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label>Segundo apellido</label>
                                <!-- la llave es obligatoria, pero consignar SOA si no aplica -->
                                <input
                                    name="segundoApellidoPaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Segundo apellido ..."
                                    maxlength="15"
                                />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label>Apellido casada</label>
                                <!-- no anteponer de al apellido -->
                                <input
                                    name="apellidoCasadaPaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Apellido casada ..."
                                    maxlength="15"
                                />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label>Primer nombre</label>
                                <input
                                    name="primerNombrePaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Primer nombre ..."
                                    maxlength="15"
                                    required
                                />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label>Segundo nombre</label>
                                <!-- la llave es obligatoria, si no aplica consignar SON -->
                                <input
                                    name="segundoNombrePaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Segundo nombre ..."
                                    maxlength="15"
                                />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label>Otros nombre</label>
                                <input
                                    name="otrosNombresPaAsPepCliente "
                                    type="text"
                                    class="form-control"
                                    placeholder="Otros nombres ..."
                                    maxlength="30"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-group">
                                <label for="">Entidad</label>
                                <input
                                    name="entidadPaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Entidad ..."
                                    maxlength="400"
                                    required
                                />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label for="">Puesto que desempeña</label>
                                <input
                                    name="puestoDesempeniaPaAsPepCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Puesto que desempeña ..."
                                    maxlength="200"
                                    required
                                />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label for="paisEntidadPaAsPepCliente"
                                    >País de la institución o entidad</label
                                >
                                <select
                                    name="paisEntidadPaAsPepCliente"
                                    id="paisEntidadPaAsPepCliente"
                                    class="form-control"
                                    style="width: 100%"
                                >
                                    <option value="">Selecciona</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            var buttonAgregarParienteAsociado = `
                            <div class="row">
                                <div class="col-sm">
                                    <div class="form-group">
                                        <button
                                            type="button"
                                            class="btn btn-primary agregarFamiliarAsociado"
                                            id="agregarFamiliarAsociadoPepCliente"
                                        >
                                            Agregar Familiar/Asociado PEP
                                        </button>
                                    </div>
                                </div>
                            </div>`;

            if (this.value != "N") {
                $(".datosAsoPep").append(buttonAgregarParienteAsociado);
                $(".datosAsoPep>div.row")
                    .find("button.agregarFamiliarAsociado")
                    .click(function () {
                        console.log("agregar nuevo");
                    });
            } else {
                $(".datosAsoPep>div").remove();
            }
        });
    }
}
function AgregarTitular() {
    $("#btnAgregarTitular").click(function (event) {
        event.preventDefault();
        let cantActualTitulares = $("#titulares").children().length;
        let id = cantActualTitulares + 1;
        let templateTitular = `
                <div class="card card-primary" id="titular_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Titular ${id}</h3>
                        <div class="card-tools">
                            <button
                                type="button"
                                class="btn btn-tool"
                                data-card-widget="collapse"
                            >
                                <i class="fas fa-minus"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-tool"
                                data-card-widget="remove"
                            >
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->

                    <div class="card-body">
                        <div class="row mb-3">
                            <h4>I. TIPO DE ACTUACIÓN DEL CLIENTE ${id}</h4>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label
                                            >El cliente actúa en nombre
                                            propio</label
                                        >
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="siActuaCliente_${id}"
                                            class="actuaNombrePropio"
                                            name="tipoActuacionCliente_${id}"
                                            value="C"
                                            required
                                            checked
                                        />
                                        <label for="siActuaCliente_${id}">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="noActuaCliente_${id}"
                                            class="actuaNombrePropio"
                                            name="tipoActuacionCliente_${id}"
                                            value="R"
                                            required
                                        />
                                        <label for="noActuaCliente_${id}">No</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label>Calidad con que actúa</label>
                                    <input
                                        name="calidadActuaCliente_${id}"
                                        type="text"
                                        class="form-control calidadActuaCliente"
                                        placeholder="Calidad con que actúa ..."
                                        maxlength="100"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <!-- II. LUGAR Y FECHA -->
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>II. LUGAR Y FECHA</h4>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- row -->

                        <div class="row">
                            <!-- select pais -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País</label>
                                    <select
                                        name="paisCaMiCliente_2"
                                        id="paisCaMiCliente_2"
                                        class="deshabilitaDepartamentoMunicipio form-control paisCaMiCliente"
                                        style="width: 100%"
                                        required
                                    >
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
                                    <label>Departamento</label>
                                    <select
                                        name="departamentoCaMiCliente_2"
                                        id="departamentoCaMiCliente_2"
                                        class="form-control"
                                        style="width: 100%"
                                        required
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option
                                            value="{{$departamento->codigoDepartamento}}"
                                        >
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select municipio -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio</label>
                                    <select
                                        name="municipioCaMiCliente"
                                        id="municipioCaMiCliente"
                                        class="paisCaMiCliente form-control"
                                        style="width: 100%"
                                        required
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <!-- fecha -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Fecha</label>
                                    <div
                                        class="input-group date"
                                        id="fechaDoc"
                                        data-target-input="nearest"
                                    >
                                        <input
                                            name="fechaCaMiCliente"
                                            type="text"
                                            class="form-control datetimepicker-input"
                                            data-target="#fechaDoc"
                                            required
                                        />
                                        <div
                                            class="input-group-append"
                                            data-target="#fechaDoc"
                                            data-toggle="datetimepicker"
                                        >
                                            <div class="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm-12">
                                <h4>III. DATOS PERSONALES</h4>
                            </div>
                            <div class="col-sm-12">
                                <h5>Información del cliente</h5>
                            </div>
                            <br />
                            <br />
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Primer Apellido</label>
                                    <input
                                        name="primerApellidoCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Primer Apellido ..."
                                        maxlength="15"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Segundo apellido</label>
                                    <!-- la llave es obligatoria, pero consignar SOA si no aplica -->
                                    <input
                                        name="segundoApellidoCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Segundo apellido ..."
                                        maxlength="15"
                                    />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Apellido casada</label>
                                    <!-- no anteponer de al apellido -->
                                    <input
                                        name="apellidoCasadaCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Apellido casada ..."
                                        maxlength="15"
                                    />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Primer nombre</label>
                                    <input
                                        name="primerNombreCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Primer nombre ..."
                                        maxlength="15"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Segundo nombre</label>
                                    <!-- la llave es obligatoria, si no aplica consignar SON -->
                                    <input
                                        name="segundoNombreCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Segundo nombre ..."
                                        maxlength="15"
                                    />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Otros nombre</label>
                                    <input
                                        name="otrosNombresCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Otros nombres ..."
                                        maxlength="30"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Fecha nacimiento</label>
                                    <div
                                        class="input-group date"
                                        id="fechaNacimiento"
                                        data-target-input="nearest"
                                    >
                                        <input
                                            name="fechaNacimientoCliente"
                                            type="text"
                                            class="form-control datetimepicker-input"
                                            data-target="#fechaNacimiento"
                                            required
                                        />
                                        <div
                                            class="input-group-append"
                                            data-target="#fechaNacimiento"
                                            data-toggle="datetimepicker"
                                        >
                                            <div class="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- select pais nacimiento Cliente -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País nacimiento</label>
                                    <select
                                        name="paisNacimientoCliente"
                                        id="paisNacimientoCliente"
                                        class="pais form-control"
                                        style="width: 100%"
                                    >
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
                                    <label>Departamento nacimiento</label>
                                    <select
                                        name="departamentoNacimientoCliente"
                                        id="departamentoNacimientoCliente"
                                        class="paisNacimientoCliente departamento form-control"
                                        style="width: 100%"
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option
                                            value="{{$departamento->codigoDepartamento}}"
                                        >
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select municipio -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio nacimiento</label>
                                    <select
                                        name="municipioNaciminentoCliente"
                                        id="municipioNaciminentoCliente"
                                        class="paisNacimientoCliente form-control"
                                        style="width: 100%"
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <!-- select condicion Migratoria -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Condición migratoria</label>
                                    <select
                                        name="condicionMigratoriaCliente"
                                        id="condicionMigratoriaCliente"
                                        class="paisNacimientoCliente form-control"
                                        style="width: 100%"
                                        disabled
                                        required
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($listaCondicionMigratoria as
                                        $condicionMigratoria)
                                        <option
                                            value="{{$condicionMigratoria->idListaCondicionMigratoria}}"
                                        >
                                            {{$condicionMigratoria->descripcion}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Especifique</label>
                                    <input
                                        name="otraCondicionMigratoriacliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Otra condición migratoria ..."
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <!-- sexo cliente -->
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label>Sexo</label>
                                    <select
                                        name="sexoCliente"
                                        id="sexoCliente"
                                        class="form-control"
                                        style="width: 100%"
                                        required
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </select>
                                </div>
                            </div>
                            <!-- .col-sm -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Estado civil</label>
                                    <select
                                        name="estadoCivilCliente"
                                        id="estadoCivilCliente"
                                        class="form-control"
                                        style="width: 100%"
                                        required
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        <option value="S">Soltero</option>
                                        <option value="C">Casado</option>
                                    </select>
                                </div>
                            </div>
                            <!-- .col-sm -->

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Nit</label>
                                    <input
                                        name="nitCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Nit ..."
                                        maxlength="20"
                                    />
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Docto. identificación</label>
                                    <select
                                        name="tipoDoctoIdentificacionCliente"
                                        id="tipoDoctoIdentificacionCliente"
                                        class="form-control"
                                        style="width: 100%"
                                        required
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        <option value="D">DPI</option>
                                        <option value="P">Pasaporte</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Número identificación</label>
                                    <input
                                        name="numeroDocumentoIdentificacionCliente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Número identificación..."
                                        maxlength="20"
                                    />
                                </div>
                            </div>

                            <!-- select emicion pasaporte, se envia el codigo del pais, en la tabla solo recibe el codigo de dos letras -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País (Pasaporte)</label>
                                    <select
                                        name="emicionPasaporteCliente"
                                        id="emicionPasaporteCliente"
                                        class="pais form-control"
                                        style="width: 100%"
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($paises as $pais)
                                        <option value="{{$pais->codigoPais}}">
                                            {{$pais->nombrePais}}
                                        </option>
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
                                    <input
                                        name="profecionOficioCLiente"
                                        type="text"
                                        class="form-control"
                                        placeholder="Profesión u oficio ..."
                                        maxlength="100"
                                    />
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Correo electrónico</label>
                                    <input
                                        name="emailCliente"
                                        type="email"
                                        class="form-control"
                                        placeholder="Correo electrónico ..."
                                        maxlength="100"
                                    />
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
                                <label
                                    >Dirección de residencia completa (calle o
                                    avenida, número de casa, colonia, sector,
                                    lote, manzana, otros)</label
                                >
                                <input
                                    name="direccionRecidenciaCliente"
                                    type="text"
                                    class="form-control"
                                    placeholder="Dirección de residencia completa ..."
                                    maxlength="400"
                                />
                            </div>
                        </div>
                        <!-- .row -->

                        <div class="row">
                            <!-- select pais nacimiento Cliente -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>País residencia</label>
                                    <select
                                        name="paisRecidenciaCliente"
                                        id="paisRecidenciaCliente"
                                        class="pais form-control"
                                        style="width: 100%"
                                        required
                                    >
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
                                    <label>Departamento residencia</label>
                                    <select
                                        name="departamentoRecidenciaCliente"
                                        id="departamentoRecidenciaCliente"
                                        class="paisRecidenciaCliente departamento form-control"
                                        style="width: 100%"
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                        @foreach($departamentos as
                                        $departamento)
                                        <option
                                            value="{{$departamento->codigoDepartamento}}"
                                        >
                                            {{$departamento->nombreDepartamento}}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- select municipio -->
                            <div class="col-sm">
                                <div class="form-group">
                                    <label>Municipio residencia</label>
                                    <select
                                        name="municipioRecidenciaCliente"
                                        id="municipioRecidenciaCliente"
                                        class="paisRecidenciaCliente form-control"
                                        style="width: 100%"
                                    >
                                        <option value="" disabled selected>
                                            Selecciona
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm" id="nacionalidadCliente">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm">
                                            <label>Nacionalidad</label>
                                            <select
                                                name="nacionalidadCliente"
                                                id="nacionalida1Cliente"
                                                class="form-control"
                                                style="width: 100%"
                                                required
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Selecciona
                                                </option>
                                                @foreach($paises as $pais)
                                                <option
                                                    value="{{$pais->codigoPais}}"
                                                >
                                                    {{$pais->nombrePais}}
                                                </option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="col-sm my-auto pt-2"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        id="agregarNacionalidaCliente"
                                    >
                                        Agregar Nacionalidad
                                    </button>
                                </div>
                            </div>
                            <!-- .nacionalidad -->
                            <div class="col-sm" id="telefonosCliente">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm">
                                            <label>Telefonos:</label>
                                            <input
                                                name="telefonoCliente"
                                                type="text"
                                                class="form-control"
                                                placeholder="telefono ..."
                                                maxlength="30"
                                                required
                                            />
                                        </div>
                                        <div class="col-sm"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        id="agregarTelefonoCliente"
                                    >
                                        Agregar teléfono
                                    </button>
                                </div>
                            </div>
                            <!-- .telefono -->
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label for=""
                                            >¿El cliente es Contratista y
                                            Proveedor del Estado (CPE)?</label
                                        >
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="primaryCpeCliente1"
                                            class="cpeCliente"
                                            name="cpeCliente"
                                            value="S"
                                            required
                                        />
                                        <label for="primaryCpeCliente1"
                                            >Sí</label
                                        >
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="primaryCpeCliente2"
                                            class="cpeCliente"
                                            name="cpeCliente"
                                            value="N"
                                            required
                                        />
                                        <label for="primaryCpeCliente2"
                                            >No</label
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label
                                            >¿El cliente es una Persona Expuesta
                                            Políticamente (PEP)?</label
                                        >
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="primaryPep1"
                                            class="pepCliente"
                                            name="pepCliente"
                                            value="S"
                                            required
                                        />
                                        <label for="primaryPep1">Sí</label>
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="primaryPep2"
                                            class="pepCliente"
                                            name="pepCliente"
                                            value="N"
                                            required
                                        />
                                        <label for="primaryPep2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="datosPepCliente"></div>

                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <div class="icheck-primary d-inline">
                                        <label
                                            >¿El cliente tiene parentesco o es
                                            asociado cercano a una Persona
                                            Expuesta Políticamente (PEP)?</label
                                        >
                                    </div>

                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="primaryAsoPepCliente1"
                                            class="asoPepCliente"
                                            name="asoPepCliente"
                                            value="S"
                                            required
                                        />
                                        <label for="primaryAsoPepCliente1"
                                            >Sí</label
                                        >
                                    </div>
                                    <div class="icheck-primary d-inline">
                                        <input
                                            type="radio"
                                            id="primaryAsoPepCliente2"
                                            class="asoPepCliente"
                                            name="asoPepCliente"
                                            value="N"
                                            required
                                        />
                                        <label for="primaryAsoPepCliente2"
                                            >No</label
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="datosAsoPep" id="datosAsoCliente1"></div>
                        <!-- .datosPaAsPep -->
                    </div>
                    <!-- /.card-body -->
                </div>
        `;
        let divTitulares = $("#titulares").append(templateTitular);
        /*agregado validadciones para el nuevo titular*/
        verificaActuaNombrePropio(
            $(`#titulares>div#titular_${id}`).find("input.actuaNombrePropio")
        );
    });
}
function guardar() {
    $("#btnGuardar").click(function (event) {
        event.preventDefault();
        console.log("Guardando");
    });
}
$(document).ready(function () {
    console.log("Esperando a que la pagina cargue completamente ");
    verificaActuaNombrePropio($(".actuaNombrePropio"));
    habilitaDepartamentoMunicipio($(".deshabilitaDepartamentoMunicipio"));
    setFormatoFecha();
    configurarAjax();
    cargarMunicipio();

    agregaNacionalidadCLiente();
    agregarNumeroCliente();
    verificarClientePep();
    verificarAsoPep();
    AgregarTitular();
});
