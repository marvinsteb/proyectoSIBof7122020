function setFormatoFecha() {
    var divInputFecha = $(".date");
    for (let i = 0; i < divInputFecha.length; i++) {
        $(divInputFecha[i]).datetimepicker({
            format: "DD/MM/YYYY",
        });
    }
}
function verificaActuaNombrePropio() {
    var elementoActuaNomprePropio = $(".actuaNombrePropio");
    for (var i = 0; i < elementoActuaNomprePropio.length - 1; i++) {
        $(elementoActuaNomprePropio[i]).change(function () {
            if (this.value === "C") {
                elementoActuaNomprePropio[2].disabled = true;
                elementoActuaNomprePropio[2].value = "";
                elementoActuaNomprePropio[2].required = false;
            } else if (this.value === "R") {
                elementoActuaNomprePropio[2].disabled = false;
                elementoActuaNomprePropio[2].required = true;
                console.log("mostrar el form del representante");
                /* implementa el formulario para datos del representante */
            }
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
function habilitaCampoDepartamento() {
    var selectPais = $(".pais");
    for (var i = 0; i < selectPais.length; i++) {
        $(selectPais[i]).change(function () {
            //convertir el id a clase antes de obtener los selects departamento y municipio que contengan dicha clase
            var clasePais = `.${this.id.toString()}`;
            var departamentoMunicipio = $(clasePais);
            if (this.value != 1 && this.value != "GT") {
                departamentoMunicipio[0].disabled = true;
                departamentoMunicipio[0].value = 0;
                departamentoMunicipio[1].disabled = true;
                departamentoMunicipio[1].value = 0;
                /* hacer la implementacion de llenado de municipios por departamento*/
            } else {
                departamentoMunicipio[0].disabled = false;
                departamentoMunicipio[1].disabled = false;
                departamentoMunicipio[2].disabled = true;
                departamentoMunicipio[2].value = 0;

                //departamentoMunicipio[2].disabled = false;
            }
        });
    }
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
function verificarAsoPep() {
    var asoPepCliente = $(".asoPepCliente");
    for (let i = 0; i < asoPepCliente.length; i++) {
        $(asoPepCliente[i]).change(function () {
            var camposAsocPep = `<div class="row">
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
                        <!--.row-->
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
                        <!-- .row -->
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
                        </div>`;
            if (this.value != "N") {
                $(".datosAsoPep").append(camposAsocPep);
            } else {
                $(".datosAsoPep div").remove();
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

$(document).ready(function () {
    console.log("Esperando a que la pagina cargue completamente ");
    setFormatoFecha();
    configurarAjax();
    cargarMunicipio();
    verificaActuaNombrePropio();
    habilitaCampoDepartamento();
    verificarClientePep();
    verificarAsoPep();
    agregaNacionalidadCLiente();
    agregarNumeroCliente();
});
