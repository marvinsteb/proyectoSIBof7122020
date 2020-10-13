function setFormatoFecha(divInputFecha) {
    for (let i = 0; i < divInputFecha.length; i++) {
        $(divInputFecha[i]).datetimepicker({ format: "DD/MM/YYYY" });
    }
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
                $(inputCalidadActua[0]).prop("required", false);
            } else if (this.value === "R") {
                inputCalidadActua[0].disabled = false;
                $(inputCalidadActua[0]).prop("required", true);
            }
        });
    }
}
function habilitaDepartamentoMunicipio(selectPais) {
    for (let i = 0; i < selectPais.length; i++) {
        $(selectPais[i]).change(function () {
            let divPadre = $(this).parent().parent().parent();
            let condicionMigratoria = $(divPadre).find(
                "select.condicionMigratoriaCliente"
            );
            let otraCondicionMigratoria = $(divPadre).find(
                "input.otraCoMiCliente"
            );
            let departamento = $(divPadre).find("select.getMunicipio");
            let municipio = $(divPadre).find("select.setMunicipio");
            if (this.value == 1) {
                departamento[0].disabled = false;
                municipio[0].disabled = false;
                if (condicionMigratoria.length) {
                    condicionMigratoria[0].disabled = true;
                    $(otraCondicionMigratoria[0]).val(null);
                    otraCondicionMigratoria[0].disabled = true;
                    $(condicionMigratoria[0]).empty();
                    $(condicionMigratoria[0]).append(
                        '<option value="" disabled selected>Selecciona</option>'
                    );
                    cargarLiCondicionMigratoria($(condicionMigratoria[0]));
                }
            } else {
                departamento[0].disabled = true;
                municipio[0].disabled = true;
                $(municipio[0]).empty();
                $(municipio[0]).append(
                    '<option value="" disabled selected>Selecciona</option>'
                );
                cargarDepartamentos(departamento);
                if (condicionMigratoria.length) {
                    condicionMigratoria[0].disabled = false;
                }
            }
        });
    }
}
function cargarMunicipios(selectDeptos) {
    for (let i = 0; i < selectDeptos.length; i++) {
        $(selectDeptos[i]).change(function (event) {
            let selectMuniActual = $(this)
                .parent()
                .parent()
                .parent()
                .find("select.setMunicipio");
            $(selectMuniActual[0]).empty();
            $(selectMuniActual[0]).append(
                '<option value="" disabled selected>Selecciona</option>'
            );
            getMunicipios(function (municipios) {
                municipios.forEach(function (muni) {
                    $(selectMuniActual[0]).append(
                        `<option value=${muni.idMunicipio}> ${muni.nombreMunicipio} </option>`
                    );
                });
            }, event.target.value);
        });
    }
}

function cargarDepartamentos(selectDepartamentos) {
    for (let i = 0; i < selectDepartamentos.length; i++) {
        $(selectDepartamentos[i]).empty();
        $(selectDepartamentos[i]).append(
            '<option value="" disabled selected>Selecciona</option>'
        );
        getDepartamentos(function (departamentos) {
            departamentos.forEach(function (depto) {
                $(selectDepartamentos[i]).append(
                    `<option value=${depto.codigoDepartamento}> ${depto.nombreDepartamento} </option>`
                );
            });
        });
    }
}

function cargarPais(selectPais) {
    for (let i = 0; i < selectPais.length; i++) {
        $(selectPais[i]).empty();
        $(selectPais[i]).append(
            '<option value="" disabled selected>Selecciona</option>'
        );
        getPaises(function (paises) {
            paises.forEach(function (pais) {
                $(selectPais[i]).append(
                    `<option value=${pais.idPais}> ${pais.nombrePais} </option>`
                );
            });
        });
    }
}

function cargarLiCondicionMigratoria(selectCondicionMigratoria) {
    for (let i = 0; i < selectCondicionMigratoria.length; i++) {
        $(selectCondicionMigratoria[i]).empty();
        $(selectCondicionMigratoria[i]).append(
            '<option value="" disabled selected>Selecciona</option>'
        );
        getCondicionMigratoria(function (listaCoMi) {
            listaCoMi.forEach(function (CoMi) {
                $(selectCondicionMigratoria[i]).append(
                    `<option value=${CoMi.idListaCondicionMigratoria}> ${CoMi.descripcion} </option>`
                );
            });
        });
        verificaOtraCondicionMigratoria($(selectCondicionMigratoria[i]));
    }
}

function getMunicipios(callback, idDepto) {
    $.get(`/departamentos/municipios/${idDepto}`, function (res, sta) {
        callback(res);
    });
}

function getPaises(callbak) {
    $.get(`/pais/obtenerpaises`, function (res, sta) {
        callbak(res);
    });
}

function getCondicionMigratoria(callback) {
    $.get(`/listacondicionmigratoria`, function (res, sta) {
        callback(res);
    });
}

function getDepartamentos(callback) {
    $.get(`/departamento/obtenerdepartamento`, function (res, sta) {
        callback(res);
    });
}

function verificaOtraCondicionMigratoria(condicionMigratoria) {
    for (let i = 0; i < condicionMigratoria.length; i++) {
        $(condicionMigratoria[i]).change(function (event) {
            let otraCondicionMigratoria = $(this)
                .parent()
                .parent()
                .parent()
                .find("input.otraCoMiCliente");
            if (event.target.value == 8) {
                otraCondicionMigratoria[0].disabled = false;
            } else {
                otraCondicionMigratoria[0].disabled = true;
                $(otraCondicionMigratoria[0]).val(null);
            }
        });
    }
}
function validarPaisPasaporte(pasaportes) {
    for (let i = 0; i < pasaportes.length; i++) {
        $(pasaportes[i]).change(function (event) {
            let selectPaisPasaporte = $(this)
                .parent()
                .parent()
                .parent()
                .find("select.emicionPasaporteCliente");
            if (event.target.value == "P") {
                selectPaisPasaporte[0].disabled = false;
            } else {
                selectPaisPasaporte[0].disabled = true;
                cargarPais(selectPaisPasaporte);
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

function agregaNacionalidadCliente(arrBtnsAgregarNacionalidad) {
    for (let i = 0; i < arrBtnsAgregarNacionalidad.length; i++) {
        $(arrBtnsAgregarNacionalidad[i]).click(function () {
            let divPadre = $(this).parent().parent();
            let idPadre = $(divPadre).attr("id");
            let id = $(divPadre).children().length;
            let idSelect = `${idPadre}_${id}`;
            $(`#${idPadre}>div:nth-last-child(2)`).after(
                `<div class='form-group'>
                        <div class="row">
                            <div class="col-sm">
                                <select name="${idPadre}" id="${idSelect}" class="form-control nacionalidadCliente" style="width: 100%" required>
                                    <option value="" disabled selected>Selecciona</option>
                                </select>
                            </div>
                            <div class="col-sm my-auto">
                                <button type="button" class="btn btn-danger">borrar</button>
                            </div>
                        </div>
                    </div>`
            );

            $(`#${idPadre}>div.form-group>div.row`)
                .find("button")
                .click(function () {
                    $(this).parent().parent().parent().remove();
                });

            let selectPaisActual = $(`#${idPadre}>div.form-group>div.row`).find(
                `select#${idSelect}`
            );
            cargarPais(selectPaisActual);
        });
    }
}

function agregarNumeroCliente(arrBtnAgregarTelefono) {
    for (let i = 0; i < arrBtnAgregarTelefono.length; i++) {
        $(arrBtnAgregarTelefono[i]).click(function () {
            let divPadre = $(this).parent().parent();
            let idDivPadre = $(divPadre).attr("id");
            let idSelect = $(divPadre).children().length;
            let idInput = `${idDivPadre}_${idSelect}`;
            $(`#${idDivPadre}>div:nth-last-child(2)`).after(`
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm">
                                <input name="${idDivPadre}" id="${idInput}" type="text" class="form-control" placeholder="telefono ..." maxlength="30" required />
                            </div>
                            <div class="col-sm my-auto">
                                <button type="button" class="btn btn-danger">
                                    borrar
                                </button>
                            </div>
                        </div>
                    </div `);
            $(`#${idDivPadre}>div.form-group>div.row`)
                .find("button")
                .click(function () {
                    console.log($(this).parent().parent().parent().remove());
                });
        });
    }
}

function verificarAsoPep() {
    var asoPepCliente = $(".asoPepCliente");

    for (let i = 0; i < asoPepCliente.length; i++) {
        $(asoPepCliente[i]).change(function () {
            let divActual = $(asoPepCliente[i]);
            var camposAsocPep = ` <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Familiar Asociado 1</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label for="parentescoPaAsPepCliente">Parentesco</label>
                                        <select name="parentescoPaAsPepCliente" id="parentescoPaAsPepCliente" class="setPaAsPep form-control" style="width: 100%" required>
                                            <option value="" disabled selected>
                                                Selecciona
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="otroParentescoPaAsPepCliente">Especifique</label>
                                        <input name="otroParentescoPaAsPepCliente" id="otroParentescoPaAsPepCliente" type="text" class="form-control" placeholder="Especifique ..." maxlength="100" required />
                                    </div>
                                </div>

                                <div class="col-sm">
                                    <div class="form-group">
                                        <label for="motivoAsociacion">Motivo asociación</label>
                                        <select name="motivoAsociacionPaAsPepCliente" id="motivoAsociacionPaPepCliente" class="setPaAsPep form-control" style="width: 100%" required>
                                            <option value="" disabled selected>
                                                Selecciona
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label for="sexoPaAsPepCliente">Sexo</label>
                                        <select name="sexoPaAsPepCliente" id="sexoPaAsPepCliente" class="form-control" style="width: 100%" required>
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
                                        <label for="condicionPaAsPepCliente">Condición</label>
                                        <select name="condicionPaAsPepCliente" id="condicionPaAsPepCliente" class="form-control" style="width: 100%" required>
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
                                        <input name="primerApellidoPaAsPepCliente" type="text" class="form-control" placeholder="Primer Apellido ..." maxlength="15" required />
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Segundo apellido</label>
                                        <!-- la llave es obligatoria, pero consignar SOA si no aplica -->
                                        <input name="segundoApellidoPaAsPepCliente" type="text" class="form-control" placeholder="Segundo apellido ..." maxlength="15" />
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Apellido casada</label>
                                        <!-- no anteponer de al apellido -->
                                        <input name="apellidoCasadaPaAsPepCliente" type="text" class="form-control" placeholder="Apellido casada ..." maxlength="15" />
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Primer nombre</label>
                                        <input name="primerNombrePaAsPepCliente" type="text" class="form-control" placeholder="Primer nombre ..." maxlength="15" required />
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Segundo nombre</label>
                                        <!-- la llave es obligatoria, si no aplica consignar SON -->
                                        <input name="segundoNombrePaAsPepCliente" type="text" class="form-control" placeholder="Segundo nombre ..." maxlength="15" />
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label>Otros nombre</label>
                                        <input name="otrosNombresPaAsPepCliente " type="text" class="form-control" placeholder="Otros nombres ..." maxlength="30" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label for="">Entidad</label>
                                        <input name="entidadPaAsPepCliente" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required />
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label for="">Puesto que desempeña</label>
                                        <input name="puestoDesempeniaPaAsPepCliente" type="text" class="form-control" placeholder="Puesto que desempeña ..." maxlength="200" required />
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label for="paisEntidadPaAsPepCliente">País de la institución o entidad</label>
                                        <select name="paisEntidadPaAsPepCliente" id="paisEntidadPaAsPepCliente" class="form-control" style="width: 100%">
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
                                    <button type="button" class="btn btn-primary agregarFamiliarAsociado" id="agregarFamiliarAsociadoPepCliente">
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
        let cantActualTitulares = $("#titulares>div").length;
        let id = cantActualTitulares + 1;
        let templateTitular = `
                        <div class="card card-primary" id="${id}">
                            <div class="card-header">
                                <h3 class="card-title">Titular ${id}</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <button type="button" class="btn btn-tool" data-card-widget="remove">
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
                                                <label>El cliente actúa en nombre
                                                    propio</label>
                                            </div>

                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="siActuaCliente_${id}" class="actuaNombrePropio" name="tipoActuacionCliente_${id}" value="C" required checked />
                                                <label for="siActuaCliente_${id}">Sí</label>
                                            </div>
                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="noActuaCliente_${id}" class="actuaNombrePropio" name="tipoActuacionCliente_${id}" value="R" required />
                                                <label for="noActuaCliente_${id}">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <label>Calidad con que actúa</label>
                                            <input name="calidadActuaCliente_${id}" id="calidadActuaCliente_${id}" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
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
                                            <select name="paisCaMiCliente_${id}" id="paisCaMiCliente_${id}" class="form-control paisCaMiCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- select departamento -->
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Departamento</label>
                                            <select name="deptoCaMiCliente_${id}" id="deptoCaMiCliente_${id}" class="form-control deptoCaMiCliente getMunicipio setDepartamento" style="width: 100%" required>
                                                <option value="" disabled selected>Selecciona</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- select muni -->
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Municipio</label>
                                            <select name="muniCaMiCliente_${id}" id="muniCaMiCliente_${id}" class="form-control muniCaMiCliente setMunicipio" style="width: 100%" required>
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
                                            <div class="input-group date" id="fechaDoc_${id}" data-target-input="nearest">
                                                <input name="fechaDocCaMiCliente_${id}" id="fechaDocCaMiCliente_${id}" type="text" class="form-control datetimepicker-input fechaCaMiCliente" data-target="#fechaDoc_${id}" required />
                                                <div class="input-group-append" data-target="#fechaDoc_${id}" data-toggle="datetimepicker">
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
                                        <h5>Información del cliente ${id}</h5>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                                <!-- .row -->

                                <div class="row">
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Primer Apellido</label>
                                            <input name="primerApellidoCliente_${id}" id="primerApellidoCliente_${id}" type="text" class="form-control primerApellidoCliente" placeholder="Primer Apellido ..." maxlength="15" required />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Segundo apellido</label>
                                            <input name="segundoApellidoCliente_${id}" id="segundoApellidoCliente_${id}" type="text" class="form-control segundoApellidoCliente" placeholder="Segundo apellido ..." maxlength="15" />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Apellido casada</label>
                                            <input name="apellidoCasadaCliente_${id}" id="apellidoCasadaCliente_${id}" type="text" class="form-control apellidoCasadaCliente" placeholder="Apellido casada ..." maxlength="15" />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Primer nombre</label>
                                            <input name="primerNombreCliente_${id}" id="primerNombreCliente_${id}" type="text" class="form-control primerNombreCliente" placeholder="Primer nombre ..." maxlength="15" required />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Segundo nombre</label>
                                            <input name="segundoNombreCliente_${id}" id="segundoNombreCliente_${id}" type="text" class="form-control segundoNombreCliente" placeholder="Segundo nombre ..." maxlength="15" />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Otros nombre</label>
                                            <input name="otrosNombresCliente_${id}" id="otrosNombresCliente_${id}" type="text" class="form-control otrosNombresCliente" placeholder="Otros nombres ..." maxlength="30" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Fecha nacimiento</label>
                                            <div class="input-group date" id="fechaNacimiento_${id}" data-target-input="nearest">
                                                <input name="fechaNacimientoCliente_${id}" id="fechaNacimientoCliente_${id}" type="text" class="form-control datetimepicker-input" data-target="#fechaNacimiento_${id}" required />
                                                <div class="input-group-append" data-target="#fechaNacimiento_${id}" data-toggle="datetimepicker">
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
                                            <select name="paisNacimientoCliente_${id}" id="paisNacimientoCliente_${id}" class="pais form-control paisNacimientoCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- select departamento -->
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Departamento nacimiento</label>
                                            <select name="deptoNacimientoCliente_${id}" id="deptoNacimientoCliente_${id}" class="form-control deptoNacimientoCliente getMunicipio setDepartamento" style="width: 100%" required>
                                                <option value="" disabled selected>Selecciona</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- select muni -->
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Municipio nacimiento</label>
                                            <select name="muniNaciminentoCliente_${id}" id="muniNaciminentoCliente_${id}" class="form-control muniNaciminentoCliente setMunicipio" style="width: 100%" required>
                                                <option value="" disabled selected>Selecciona</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Condición migratoria</label>
                                            <select name="condicionMigratoriaCliente_${id}" id="condicionMigratoriaCliente_${id}" class="form-control condicionMigratoriaCliente" style="width: 100%" disabled required>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Especifique</label>
                                            <input name="otraCoMiCliente_${id}" id="otraCoMiCliente_${id}" type="text" class="form-control otraCoMiCliente" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />
                                        </div>
                                    </div>
                                </div>
                                <!-- .row -->

                                <div class="row">
                                    <!-- sexo cliente -->
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label>Sexo</label>
                                            <select name="sexoCliente_${id}" id="sexoCliente_${id}" class="form-control sexoCliente" style="width: 100%" required>
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
                                            <select name="estadoCivilCliente_${id}" id="estadoCivilCliente_${id}" class="form-control estadoCivilCliente" style="width: 100%" required>
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
                                            <input name="nitCliente_${id}" id="nitCliente_${id}" type="text" class="form-control nitCliente" placeholder="Nit ..." maxlength="20" />
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Docto. identificación</label>
                                            <select name="tipoDoctoIdentificacionCliente_${id}" id="tipoDoctoIdentificacionCliente_${id}" class="form-control tipoDoctoIdentificacionCliente validaPaisPasaporte" style="width: 100%" required>
                                                <option value="" disabled selected>Selecciona</option>
                                                <option value="D">DPI</option>
                                                <option value="P">Pasaporte</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Número identificación</label>
                                            <input name="noDocIdentificacionCliente_${id}" id="noDocIdentificacionCliente_${id}" type="text" class="form-control noDocIdentificacionCliente" placeholder="Número identificación..." maxlength="20" required />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>País (Pasaporte)</label>
                                            <select name="emicionPasaporteCliente_${id}" id="emicionPasaporteCliente_${id}" class="form-control emicionPasaporteCliente" style="width: 100%" disabled required>
                                                <option value="" disabled selected>Selecciona</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- .row -->

                                <div class="row">
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Profesión u oficio</label>
                                            <input name="profecionOficioCliente_${id}" id="profecionOficioCliente_${id}" type="text" class="form-control profecionOficioCliente" placeholder="Profesión u oficio ..." maxlength="100" required />
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Correo electrónico</label>
                                            <input name="emailCliente_${id}" id="emailCliente_${id}" type="email" class="form-control emailCliente" placeholder="Correo electrónico ..." maxlength="100" />
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
                                        <input name="direccionRecidenciaCliente_${id}" id="direccionRecidenciaCliente_${id}" type="text" class="form-control direccionRecidenciaCliente" placeholder="Dirección de residencia completa ..." maxlength="400" required />
                                    </div>
                                </div>
                                <!-- .row -->

                                <div class="row">
                                    <!-- select pais nacimiento Cliente -->
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>País residencia</label>
                                            <select name="paisRecidenciaCliente_${id}" id="paisRecidenciaCliente_${id}" class="form-control paisRecidenciaCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- select departamento -->
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Departamento residencia</label>
                                            <select name="deptoRecidenciaCliente_${id}" id="deptoRecidenciaCliente_${id}" class="form-control deptoRecidenciaCliente getMunicipio" style="width: 100%" requied>
                                                <option value="" disabled selected>Selecciona</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- select muni -->
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label>Municipio residencia</label>
                                            <select name="muniRecidenciaCliente_${id}" id="muniRecidenciaCliente_${id}" class="form-control muniRecidenciaCliente setMunicipio" style="width: 100%" required>
                                                <option value="" disabled selected>Selecciona</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm" id="nacionalidadCliente_${id}">
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm">
                                                    <label>Nacionalidad</label>
                                                    <select name="nacionalidadCliente_${id}" id="nacionalidadCliente_${id}_1" class="form-control nacionalidadCliente" style="width: 100%" required>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm my-auto pt-2"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="button" class="btn btn-primary agregarNacionalidaCliente" >
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
                                                    <input name="telefonoCliente" type="text" class="form-control" placeholder="telefono ..." maxlength="30" required />
                                                </div>
                                                <div class="col-sm"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="button" class="btn btn-primary" id="agregarTelefonoCliente">
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
                                                <label for="">¿El cliente es Contratista y
                                                    Proveedor del Estado (CPE)?</label>
                                            </div>
                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="primaryCpeCliente1" class="cpeCliente" name="cpeCliente" value="S" required />
                                                <label for="primaryCpeCliente1">Sí</label>
                                            </div>
                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="primaryCpeCliente2" class="cpeCliente" name="cpeCliente" value="N" required />
                                                <label for="primaryCpeCliente2">No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <div class="icheck-primary d-inline">
                                                <label>¿El cliente es una Persona Expuesta
                                                    Políticamente (PEP)?</label>
                                            </div>

                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="primaryPep1" class="pepCliente" name="pepCliente" value="S" required />
                                                <label for="primaryPep1">Sí</label>
                                            </div>
                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="primaryPep2" class="pepCliente" name="pepCliente" value="N" required />
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
                                                <label>¿El cliente tiene parentesco o es
                                                    asociado cercano a una Persona
                                                    Expuesta Políticamente (PEP)?</label>
                                            </div>

                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="primaryAsoPepCliente1" class="asoPepCliente" name="asoPepCliente" value="S" required />
                                                <label for="primaryAsoPepCliente1">Sí</label>
                                            </div>
                                            <div class="icheck-primary d-inline">
                                                <input type="radio" id="primaryAsoPepCliente2" class="asoPepCliente" name="asoPepCliente" value="N" required />
                                                <label for="primaryAsoPepCliente2">No</label>
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
        $("#titulares").append(templateTitular);
        /*agregado validadciones para el nuevo titular*/
        let divTitularActual = $(`#titulares>div#${id}`);

        let inputActuaNombrePropio = divTitularActual.find(
            "input.actuaNombrePropio"
        );
        inputActuaNombrePropio.focus();
        verificaActuaNombrePropio(inputActuaNombrePropio);

        let selectPaisActual = divTitularActual.find("select.setPais");
        habilitaDepartamentoMunicipio(selectPaisActual);
        getPaises(function (paises) {
            paises.forEach(function (pais) {
                for (let i = 0; i < selectPaisActual.length; i++) {
                    $(selectPaisActual[i]).append(
                        `<option value=${pais.idPais}> ${pais.nombrePais} </option>`
                    );
                }
            });
        });

        let selectDepartamentoActual = divTitularActual.find(
            "select.setDepartamento"
        );
        cargarDepartamentos(selectDepartamentoActual);

        let selectChangeMunicpio = divTitularActual.find("select.getMunicipio");
        cargarMunicipios(selectChangeMunicpio);

        let fechas = divTitularActual.find("div.date");
        setFormatoFecha(fechas);

        let liConMigratoria = divTitularActual.find(
            "select.condicionMigratoriaCliente"
        );
        cargarLiCondicionMigratoria(liConMigratoria);

        let selectValidaPaisPasaporte = divTitularActual.find(
            "select.validaPaisPasaporte"
        );
        validarPaisPasaporte(selectValidaPaisPasaporte);

        let paisPasaporte = divTitularActual.find(
            "select.emicionPasaporteCliente"
        );
        cargarPais(paisPasaporte);

        let paisNacionalidad = divTitularActual.find(
            "select.nacionalidadCliente"
        );
        cargarPais(paisNacionalidad);
        let btnsAddNacionalidad = divTitularActual.find(
            "button.agregarNacionalidaCliente"
        );
        agregaNacionalidadCliente(btnsAddNacionalidad);

        eliminarTemplateTitular($("#titulares>div"));
    });
}

class dicLugar {
    constructor(pais, departamento, municipio) {
        this.pais = pais;
        this.departamento = departamento;
        this.municipio = municipio;
    }
}

class datosPep {
    constructor() {
        this.entidad = null;
        this.puestoDesempenia = null;
        this.paisEntidad = null;
        this.origenRiqueza = null;
        this.otroOrigenRiqueza = null;
    }
}

class dicParienteAsociadoPep {
    constructor() {
        this.parentesco = null;
        this.otroParentesco = null;
        this.motivoAsociacion = null;
        this.otroMotivoAsociacion = null;
        this.primerApellido = null;
        this.segundoApellido = null;
        this.apellidoCasada = null;
        this.primerNombre = null;
        this.segundoNombre = null;
        this.otrosNombres = null;
        this.sexo = null;
        this.condicion = null;
        this.entidad = null;
        this.puestoDesempenia = null;
        this.paisEntidad = null;
    }
}

class dicDatosPersonales {
    constructor() {
        this.primerApellido = null;
        this.segundoApellido = null;
        this.apellidoCasada = null;
        this.primerNombre = null;
        this.segundoNombre = null;
        this.otrosNombres = null;
        this.fechaNacimiento = null;
        this.nacionalidades = new Array();
        this.nacimiento = new dicLugar();
        this.condicionMigratoria = null;
        this.otraCondicionMigratoria = null;
        this.sexo = null;
        this.estadoCivil = null;
        this.profesionOficio = null;
        this.tipoDocumentoIdentificacion = null;
        this.numeroDocumentoIdentificacion = null;
        this.emisionPasaporte = null;
        this.nit = null;
        this.telefonos = new Array();
        this.email = null;
        this.direccionResidencia = null;
        this.pep = null;
        this.datospep = new datosPep();
        this.parienteAsociadoPep = null;
        this.datosParienteAsociadoPep = new dicParienteAsociadoPep();
    }
}

class dicCamposMinimos {
    constructor() {
        this.tipoActuacion = null;
        this.calidadActua = null;
        this.lugar = new dicLugar();
        this.fecha = null;
        this.cliente = new dicDatosPersonales();
        this.representante = null;
        this.infoEconomicaInical = null;
    }
}

class diccionarioFormulario {
    constructor(id) {
        this.id = id;
        this.titulares = new Array();
        this.productos = new Array();
        this.perfilEconomico = new Object();
    }
    agregarTitular(titular) {
        this.titulares.push(titular);
    }
    agregarPoductoServicio(servicio) {
        this.productos.push(servicio);
    }
    agregarPerfilEconomico(pEconomico) {
        this.perfilEconomico = pEconomico;
    }
}

function expandirCard() {
    /*
                    se expanden todos los cards, antes de validar cada input
                    */
    let titulares = $("#titulares>div");
    for (let i = 0; i < titulares.length; i++) {
        $(titulares[i]).CardWidget("expand");
    }
}
function guardarFormulario() {
    $("#btnGuardar").click(function (event) {
        event.preventDefault();
        expandirCard();
        let nuevoDiccionarioFormulario = obtenerDatos();

        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            type: "POST",
            url: "/oficios/7122020/guardarActualizar",
            data: nuevoDiccionarioFormulario,
            dataType: "json",
            success: function (res) {
                console.log("respuesta del servidor");
                console.log(res);
            },
        });
    });
}
function eliminarTemplateTitular(titulares) {
    for (let i = 0; i < titulares.length; i++) {
        $(titulares[i]).on("removed.lte.cardwidget", function () {
            $(this).remove();
        });
    }
}
function obtenerDatos() {
    let df = new diccionarioFormulario(
        $(".diccionarioFormulario").attr("idDiccionario")
    );
    let titulares = $("#titulares>div");
    for (let i = 0; i < titulares.length; i++) {
        let id = $(titulares[i]).attr("id");
        let divTitularActual = $(`#titulares>div#${id}`);
        let titular = new dicCamposMinimos();

        titular.tipoActuacion = $(divTitularActual)
            .find(`input:radio[name=tipoActuacionCliente_${id}]:checked`)
            .val();

        titular.calidadActua = $(divTitularActual)
            .find(`input:text[id=calidadActuaCliente_${id}]`)
            .val();
        titular.lugar.pais = $(divTitularActual)
            .find(`select[id=paisCaMiCliente_${id}] option:selected`)
            .val();
        titular.lugar.departamento = $(divTitularActual)
            .find(`select[id=deptoCaMiCliente_${id}] option:selected`)
            .val();
        titular.lugar.municipio = $(divTitularActual)
            .find(`select[id=muniCaMiCliente_${id}] option:selected`)
            .val();
        titular.fecha = $(divTitularActual)
            .find(`input:text[id=fechaDocCaMiCliente_${id}]`)
            .val();
        titular.cliente.primerApellido = $(divTitularActual)
            .find(`input:text[id=primerApellidoCliente_${id}]`)
            .val();
        titular.cliente.segundoApellido = $(divTitularActual)
            .find(`input:text[id=segundoApellidoCliente_${id}]`)
            .val();
        titular.cliente.apellidoCasada = $(divTitularActual)
            .find(`input:text[id=apellidoCasadaCliente_${id}]`)
            .val();
        titular.cliente.primerNombre = $(divTitularActual)
            .find(`input:text[id=primerNombreCliente_${id}]`)
            .val();
        titular.cliente.segundoNombre = $(divTitularActual)
            .find(`input:text[id=segundoNombreCliente_${id}]`)
            .val();
        titular.cliente.otrosNombres = $(divTitularActual)
            .find(`input:text[id=segundoNombreCliente_${id}]`)
            .val();
        titular.cliente.fechaNacimiento = $(divTitularActual)
            .find(`input:text[id=fechaNacimientoCliente_${id}]`)
            .val();
        titular.cliente.nacimiento.pais = $(divTitularActual)
            //
            .find(`select[id=paisNacimientoCliente_${id}] option:selected`)
            .val();
        titular.cliente.nacimiento.departamento = $(divTitularActual)
            .find(`select[id=deptoNacimientoCliente_${id}] option:selected`)
            .val();
        titular.cliente.nacimiento.municipio = $(divTitularActual)
            .find(`select[id=muniNaciminentoCliente_${id}] option:selected`)
            .val();
        titular.cliente.condicionMigratoria = $(divTitularActual)
            .find(`select[id=condicionMigratoriaCliente_${id}] option:selected`)
            .val();
        titular.cliente.otraCondicionMigratoria = $(divTitularActual)
            .find(`input:text[id=otraCoMiCliente_${id}]`)
            .val();
        df.agregarTitular(titular);
    }

    console.log(df);
    return df;
}
$(document).ready(function () {
    console.log("Esperando a que la pagina cargue completamente ");
    setFormatoFecha($(" .date"));
    verificaActuaNombrePropio($(".actuaNombrePropio"));
    habilitaDepartamentoMunicipio($(".deshabilitaDepartamentoMunicipio"));
    cargarMunicipios($(".getMunicipio"));
    verificaOtraCondicionMigratoria($(".condicionMigratoriaCliente"));
    validarPaisPasaporte($(".validaPaisPasaporte"));
    agregaNacionalidadCliente($(".agregarNacionalidaCliente"));
    agregarNumeroCliente($(".agregarTelefonoCliente"));
    verificarClientePep();
    verificarAsoPep();
    AgregarTitular();
    guardarFormulario();
    eliminarTemplateTitular($("#titulares>div"));
});
