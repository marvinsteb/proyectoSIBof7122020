// templates
function templateCamposNommbres(id) {
    let templateNombres = ` <div class="row">
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Primer Apellido</label>
                                                    <input name="primerApellido${id}" id="primerApellido${id}" type="text" class="form-control primerApellido" placeholder="Primer Apellido ..." maxlength="15" required />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Segundo apellido</label>
                                                    <input name="segundoApellido${id}" id="segundoApellido${id}" type="text" class="form-control segundoApellido" placeholder="Segundo apellido ..." maxlength="15" />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label for="apellidoCasada${id}">Apellido casada</label>
                                                    <input name="apellidoCasada${id}" id="apellidoCasada${id}" type="text" class="form-control apellidoCasada" placeholder="Apellido casada ..." maxlength="15" />
                                                    <div class="invalid-tooltip">No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido. </div>
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Primer nombre</label>
                                                    <input name="primerNombre${id}" id="primerNombre${id}" type="text" class="form-control primerNombre" placeholder="Primer nombre ..." maxlength="15" required />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Segundo nombre</label>
                                                    <input name="segundoNombre${id}" id="segundoNombre${id}" type="text" class="form-control segundoNombre" placeholder="Segundo nombre ..." maxlength="15" />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Otros nombre</label>
                                                    <input name="otrosNombres${id}" id="otrosNombres${id}" type="text" class="form-control otrosNombres" placeholder="Otros nombres ..." maxlength="30" />
                                                </div>
                                            </div>
                                        </div>`;
    return templateNombres;
}
function templateSexo(id) {
    let templatesexo = `
    <div class="col-sm">
        <div class="form-group">
           <label for="sexo${id}">Sexo</label>
            <select name="sexo${id}" id="sexo${id}" class="form-control custom-select sexo" style="width: 100%" required>
                <option value="" disabled selected>Selecciona</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>
        </div>
    </div>`;
    return templatesexo;
}
function templatePais(id, textolabel, desabilitadeptomuni) {
    let claseDeptoMuni = "";
    if (desabilitadeptomuni == true) {
        claseDeptoMuni = "deshabilitaDepartamentoMunicipio";
    }
    let templatepais = `
    <div class="col-sm">
        <div class="form-group">
            <label for="pais${id}">${textolabel}</label>
            <select name="pais${id}" id="pais${id}" class="form-control custom-select pais ${claseDeptoMuni} setPais" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
            </select>
        </div>
    </div>
    `;
    return templatepais;
}
// funciones para configuracion del formulario
function setFormatoFecha(divInputFecha) {
    for (let i = 0; i < divInputFecha.length; i++) {
        $(divInputFecha[i]).datetimepicker({ format: "DD/MM/YYYY" });

        $(divInputFecha[i]).on("focusout", function () {
            let fechaString = $(this).find("input").val();
            let hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            let dateMomentObject = moment(fechaString, "DD/MM/YYYY");
            let fechaActual = dateMomentObject.toDate();
            if (fechaActual <= hoy) {
                $(this).find("input").removeClass("is-invalid");
            } else {
                $(this).find("input").val(null);
                $(this).find("input").addClass("is-invalid");
            }
        });
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
                $(inputCalidadActua[0]).val(null);
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
                // verifica si existe el campo CondicionMigratoria
                if (condicionMigratoria.length) {
                    condicionMigratoria[0].disabled = true;
                    $(otraCondicionMigratoria[0]).val(null);
                    otraCondicionMigratoria[0].disabled = true;
                    $(condicionMigratoria[0]).empty();
                    $(condicionMigratoria[0]).append(
                        '<option value="" disabled selected>Selecciona</option>'
                    );
                    cargarCondicionMigratoria($(condicionMigratoria[0]));
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
            selectMuniActual[0].disabled = true;
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
            selectMuniActual[0].disabled = false;
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
function validarApellidoCasada(apeCasada) {
    for (let i = 0; i < apeCasada.length; i++) {
        $(apeCasada[i]).on("focusout", function () {
            let ac = $(this).val().trim();
            if (
                (ac[0] == "D" && ac[1] == "E" && ac[2] === " ") ||
                (ac[0] == "d" && ac[1] == "e" && ac[2] === " ") ||
                (ac[0] == "D" && ac[1] == "e" && ac[2] === " ") ||
                (ac[0] == "d" && ac[1] == "E" && ac[2] === " ")
            ) {
                console.log("empiesacon DE");
                $(this).val(null);
                $(this).addClass("is-invalid");
            } else {
                console.log("apellido permitido ");
                $(this).removeClass("is-invalid");
            }
        });
    }
}
function templateInvalidTooltip(mensaje) {
    return `<div class="invalid-tooltip">${mensaje}</div>`;
}
function validarNit(listaNit) {
    for (let i = 0; i < listaNit.length; i++) {
        $(listaNit[i]).on("focusout", function (event) {
            let nit = $(this).val().trim();
            let divinvalidTooltip = templateInvalidTooltip(
                "Ingresa un NIT valido"
            );
            if (nitIsValid(nit)) {
                // el nit es valido
                $(this).removeClass("is-invalid");
                $(this).parent().find(divinvalidTooltip).remove();
            } else {
                // el nit no es valido
                $(this).addClass("is-invalid");
                $(this).parent().append(divinvalidTooltip);
                $(this).val(null);
            }
        });
    }
}
function nitIsValid(nit) {
    if (!nit) {
        return true;
    }

    let nitRegExp = new RegExp("^[0-9]+(-?[0-9kK])?$");

    if (!nitRegExp.test(nit)) {
        return false;
    }

    nit = nit.replace(/-/, "");
    let lastChar = nit.length - 1;
    let number = nit.substring(0, lastChar);
    let expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

    let factor = number.length + 1;
    let total = 0;

    for (let i = 0; i < number.length; i++) {
        let character = number.substring(i, i + 1);
        let digit = parseInt(character, 10);

        total += digit * factor;
        factor = factor - 1;
    }

    let modulus = (11 - (total % 11)) % 11;
    let computedChecker = modulus == 10 ? "k" : modulus.toString();

    return expectedCheker === computedChecker;
}
function cargarCondicionMigratoria(selectCondicionMigratoria) {
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
        habilitaOtraCondicionMigratoria($(selectCondicionMigratoria[i]));
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

function habilitaOtroCampoDesdeSelect(
    inputSelect,
    opcionSelect,
    inputHabilitar
) {
    // la funcion recibe uno o varios objetos select select.nombreclase  o select#id
    // opcionSelect, es la opcion que habilita el campo otroCondicionmigratoria, otroParentesco, etc. recibe el value otro del select
    // input habilitar puede recibir input.nommbreClase o input#id
    for (let a = 0; a < inputSelect.length; a++) {
        $(inputSelect[a]).change(function (event) {
            // la variable inputActual se utiliza, cuando se envia una input.nombreClase
            let inputActual = $(this)
                .parent()
                .parent()
                .parent()
                .find(inputHabilitar);
            if (event.target.value == opcionSelect) {
                $(inputActual).prop("disabled", false);
            } else {
                $(inputActual).prop("disabled", true);
                $(inputActual).val(null);
            }
        });
    }
}
// remplaza esta funcion por la funcion habilitarotrocampo
function habilitaOtraCondicionMigratoria(condicionMigratoria) {
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
function habilitaPaisPasaporte(pasaportes) {
    for (let i = 0; i < pasaportes.length; i++) {
        $(pasaportes[i]).change(function (event) {
            let divPadre = $(this).parent().parent().parent();
            let selectPaisPasaporte = $(divPadre).find(
                "select.emicionPasaporteCliente"
            );
            let inputDocumento = $(divPadre).find(
                "input.noDocIdentificacionCliente"
            );
            if (event.target.value == "P") {
                selectPaisPasaporte[0].disabled = false;
                inputDocumento[0].disabled = false;
            } else {
                selectPaisPasaporte[0].disabled = true;
                inputDocumento[0].disabled = false;
                cargarPais(selectPaisPasaporte);
            }
        });
    }
}
function verificarClientePep(radioClientePep) {
    for (let i = 0; i < radioClientePep.length; i++) {
        $(radioClientePep[i]).change(function () {
            /**
             * utilizo el atributo name, del input radio pepCliente para establecer el id unicao para cada campo id
             * cuando el titular el id sera entidadpepCliente_1 entidad${id}
             */
            let id = $(this).attr("name");
            if (this.value != "N") {
                var templateDatosPep = `<div class="row">
                    <div class="col-sm">
                        <div class="form-group">
                            <label for="entidad${id}">Entidad</label>
                            <input name="entidad${id}" id="entidad${id}" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <label for="puestoDesepenia${id}">Puesto que desempeña</label>
                            <input name="puestoDesepenia${id}" id="puestoDesepenia${id}" type="text" class="form-control" placeholder="Puesto que desempeña ..." maxlength="200" required>
                        </div>
                    </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-group">
                                <label for ="paisEntidad${id}">País entidad</label>
                                <select name="paisEntidad${id}" id="paisEntidad${id}" class="form-control custom-select" style="width: 100%;" required>
                                    <option value="" disabled selected>Selecciona</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label for= "origenRiqueza${id}">Origen o procedencia de su riqueza</label>
                                <select name="origenRiqueza${id}" id="origenRiqueza${id}" class="form-control custom-select" style="width: 100%;" required>
                                    <option value="" disabled selected>Selecciona</option>
                                    <option value="1">Bienes muebles e inmuebles por herencia</option>
                                    <option value="2">Bienes muebles e inmuebles</option>
                                    <option value="3">Negocio propio</option>
                                    <option value="4">Servicios profesionales</option>
                                    <option value="5">Préstamos bancarios</option>
                                    <option value="6">Trabajos anteriores</option>
                                    <option value="7">Trabajo actual</option>
                                    <option value="8">otro</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label id="otroOrigenRiqueza${id}">Especifique</label>
                                <input name="otroOrigenRiqueza${id}" id="otroOrigenRiqueza${id}" type="text" class="form-control otroOrigenRiqueza" placeholder="Origen o procedencia de su riqueza ..." maxlength="100" required disabled>
                            </div>
                        </div>
                    </div>`;
                $(`.datos${id}`).append(templateDatosPep);
                cargarPais($(`#paisEntidad${id}`));
                habilitaOtroOrigenriqueza($(`#origenRiqueza${id}`));
            } else {
                $(`.datos${id} div`).remove();
            }
        });
    }
}

function habilitaOtroOrigenriqueza(selectOrigenRiqueza) {
    for (let i = 0; i < selectOrigenRiqueza.length; i++) {
        $(selectOrigenRiqueza[i]).change(function (event) {
            let otraselectOrigenRiqueza = $(this)
                .parent()
                .parent()
                .parent()
                .find("input.otroOrigenRiqueza");
            if (event.target.value == 8) {
                otraselectOrigenRiqueza[0].disabled = false;
            } else {
                otraselectOrigenRiqueza[0].disabled = true;
                $(otraselectOrigenRiqueza[0]).val(null);
            }
        });
    }
}
function agregarTemplateNacionalidad(arrBtnsAgregarNacionalidad) {
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
                                    <select name="${idPadre}" id="${idSelect}" class="form-control custom-select nacionalidadCliente" style="width: 100%" required>
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
function agregarTemplateTelefono(arrBtnAgregarTelefono) {
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
                                        <input name="${idDivPadre}" id="${idInput}" type="text" class="form-control telefonoCliente" placeholder="telefono ..." maxlength="30" required />
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
                    $(this).parent().parent().parent().remove();
                });
        });
    }
}

function agregaAsoPep(idAsoPep) {
    let indiceAsociadosAgregados =
        $(`#datos${idAsoPep}>div.info`).children().length + 1;
    // para el id unico del pariente asociado pep se utiliza el paramento idAsopep, obtenido del atributo name del radio button
    // eje: asoPepCliente_1 concatenado con el numero de asocado obtenido en la variable indiceAsociadosAgregados
    // al concatenar queda asoPepCliente_1_1 en el siguiente asoPepCliente_1_2 susesivamente se asignara a la variable id
    let id = `${idAsoPep}_${indiceAsociadosAgregados}`;
    // recuerda implementar las validaciones en los campos, ya  que los templates solo debuelven la estructura de html
    let rowCamposNombresAsoPep = templateCamposNommbres(id);
    let componenteSexoAsoPep = templateSexo(id);
    let componentePais = templatePais(
        id,
        "País de la institución o entidad",
        false
    );
    let templateAsocPep = ` 
                            <div class="card card-primary" id=${id}>
                                <div class="card-header">
                                    <h3 class="card-title">Familiar Asociado ${indiceAsociadosAgregados}</h3>
                                    <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="remove">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <div class="form-group">
                                                <label for="parentesco${id}">Parentesco</label>
                                                <select name="parentesco${id}" id="parentesco${id}" class="form-control custom-select parentesco" style="width: 100%" required>
                                                    <option value="" disabled selected>Selecciona</option>
                                                    <option value="1">Padre</option>
                                                    <option value="2">Madre</option>
                                                    <option value="3">Hijo</option>
                                                    <option value="4">Hermano</option>
                                                    <option value="5">Cónyuge</option>
                                                    <option value="6">Otro</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-sm">
                                            <div class="form-group">
                                                <label for="otroParentesco${id}">Especifique</label>
                                                <input name="otroParentesco${id}" id="otroParentesco${id}" type="text" class="form-control otroParentesco" placeholder="Especifique ..." maxlength="100" required disabled />
                                            </div>
                                        </div>

                                        <div class="col-sm">
                                            <div class="form-group">
                                                <label for="motivoAsociacion${id}">Motivo asociación</label>
                                                <select name="motivoAsociacion${id}" id="motivoAsociacion${id}" class="form-control custom-select motivoAsociacion" style="width: 100%" required>
                                                    <option value="" disabled selected>Selecciona</option>
                                                    <option value="1">Profesionales</option>
                                                    <option value="2">Políticos</option>
                                                    <option value="3">Comerciales</option>
                                                    <option value="4">Negocios</option>
                                                    <option value="5">Otros</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm">
                                            <div class="form-group">
                                                <label for="otroMotivoAsociacion${id}">Especifique</label>
                                                <input name="otroMotivoAsociacion${id}" id="otroMotivoAsociacion${id}" type="text" class="form-control otroMotivoAsociacion" placeholder="Especifique ..." maxlength="100" required disabled />
                                            </div>
                                        </div>
                                        ${componenteSexoAsoPep}
                                        <div class="col-sm-2">
                                            <div class="form-group">
                                                <label for="condicion${id}">Condición</label>
                                                <select name="condicion${id}" id="condicion${id}" class="form-control custom-select" style="width: 100%" required>
                                                    <option value="">Selecciona</option>
                                                    <option value="N">Nacional</option>
                                                    <option value="E">Extranjero</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    ${rowCamposNombresAsoPep}
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
                                        ${componentePais}
                                    </div>
                                </div>
                                </div>`;
    $(`#datos${idAsoPep}>div.info`).append(templateAsocPep);

    validarApellidoCasada($(`input#apellidoCasada${id}`));
    habilitaOtroCampoDesdeSelect(
        $(`select#parentesco${id}`),
        6,
        `input#otroParentesco${id}`
    );
    habilitaOtroCampoDesdeSelect(
        $(`select#motivoAsociacion${id}`),
        5,
        `input#otroMotivoAsociacion${id}`
    );

    //establecemos el foco en el primer campo, para no perderse en el formulario
    $(`#datos${idAsoPep}>div.info`).find(`select#parentesco${id}`).focus();
}
function verificarAsoPep(asoPepCliente) {
    for (let i = 0; i < asoPepCliente.length; i++) {
        $(asoPepCliente[i]).change(function () {
            let idAsoPep = $(this).attr("name");
            if (this.value != "N") {
                let buttonAgregarParienteAsociado = `
                                <div class="row">
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <button type="button" class="btn btn-primary agregarFamiliarAsociado" id="agregarFamiliarAsociadoPepCliente">
                                                Agregar Familiar/Asociado PEP
                                            </button>
                                        </div>
                                    </div>
                                </div>`;
                $(`#datos${idAsoPep}>div.btnadd`).append(
                    buttonAgregarParienteAsociado
                );
                agregaAsoPep(idAsoPep);
                $(`#datos${idAsoPep}`)
                    .find("button.agregarFamiliarAsociado")
                    .click(function () {
                        agregaAsoPep(idAsoPep);
                    });
            } else {
                $(`#datos${idAsoPep}>div.btnadd`).children().remove();
                $(`#datos${idAsoPep}>div.info`).children().remove();
            }
        });
    }
}
function AgregarTitular() {
    $("#btnAgregarTitular").click(function (event) {
        event.preventDefault();

        let cantActualTitulares = $("#titulares>div").length;
        let tipo = "Cliente";
        let id = cantActualTitulares + 1;

        /*
         * variables para los id de los campos
         * se utiliza el tipo y el id para crear un id unico para cada campo
         */
        let idNit = `nit${tipo}_${id}`;
        console.log(idNit);

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
                                                <div class="form-check">
                                                    <div>
                                                        <label>El cliente actúa en nombre propio</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="siActuaCliente_${id}" class="actuaNombrePropio" name="tipoActuacionCliente_${id}" value="C" required/>
                                                        <label for="siActuaCliente_${id}">Sí</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="noActuaCliente_${id}" class="actuaNombrePropio" name="tipoActuacionCliente_${id}" value="R" required />
                                                        <label for="noActuaCliente_${id}">No</label>
                                                        <div class="invalid-tooltip">Indica el tipo de actuación</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <label for ="calidadActuaCliente_${id}" >Calidad con que actúa</label>
                                                    <input name="calidadActuaCliente_${id}" id="calidadActuaCliente_${id}" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
                                                    <div class="invalid-tooltip">Por Ejemplo: Mandatario, Patria potestad, Tutor, Otros.</div>
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
                                                    <select name="paisCaMiCliente_${id}" id="paisCaMiCliente_${id}" class="form-control custom-select paisCaMiCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select departamento -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Departamento</label>
                                                    <select name="deptoCaMiCliente_${id}" id="deptoCaMiCliente_${id}" class="form-control custom-select deptoCaMiCliente getMunicipio setDepartamento" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select muni -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Municipio</label>
                                                    <select name="muniCaMiCliente_${id}" id="muniCaMiCliente_${id}" class="form-control custom-select muniCaMiCliente setMunicipio" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- fecha -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Fecha</label>
                                                    <div class="input-group date" id="fechaDoc_${id}" data-target-input="nearest">
                                                        <input name="fechaDocCaMiCliente_${id}" id="fechaDocCaMiCliente_${id}" type="text" class="form-control datetimepicker-input fechaCaMiCliente" data-target="#fechaDoc_${id}" required />
                                                        <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
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
// agregar aqui campos nombres
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
                                                    <label for="apellidoCasadaCliente_1">Apellido casada</label>
                                                    <input name="apellidoCasadaCliente_${id}" id="apellidoCasadaCliente_${id}" type="text" class="form-control apellidoCasadaCliente" placeholder="Apellido casada ..." maxlength="15" />
                                                    <div class="invalid-tooltip">No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido. </div>
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
                                                        <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
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
                                                    <select name="paisNacimientoCliente_${id}" id="paisNacimientoCliente_${id}" class="form-control custom-select paisNacimientoCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                                    </select>
                                                </div>
                                            </div>

                                            <!-- select departamento -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Departamento nacimiento</label>
                                                    <select name="deptoNacimientoCliente_${id}" id="deptoNacimientoCliente_${id}" class="form-control custom-select deptoNacimientoCliente getMunicipio setDepartamento" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select muni -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Municipio nacimiento</label>
                                                    <select name="muniNaciminentoCliente_${id}" id="muniNaciminentoCliente_${id}" class="form-control custom-select muniNaciminentoCliente setMunicipio" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Condición migratoria</label>
                                                    <select name="condicionMigratoriaCliente_${id}" id="condicionMigratoriaCliente_${id}" class="form-control custom-select condicionMigratoriaCliente" style="width: 100%" disabled required>
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
                                                    <select name="sexoCliente_${id}" id="sexoCliente_${id}" class="form-control custom-select sexoCliente" style="width: 100%" required>
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
                                                    <select name="estadoCivilCliente_${id}" id="estadoCivilCliente_${id}" class="form-control custom-select estadoCivilCliente" style="width: 100%" required>
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
                                                    <input name="${idNit}" id="${idNit}" type="text" class="form-control nitCliente" placeholder="Nit ..." maxlength="20" />
                                                </div>
                                            </div>

                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Docto. identificación</label>
                                                    <select name="tipoDoctoIdentificacionCliente_${id}" id="tipoDoctoIdentificacionCliente_${id}" class="form-control custom-select tipoDoctoIdentificacionCliente validaPaisPasaporte" style="width: 100%" required>
                                                        <option value="" disabled selected>Selecciona</option>
                                                        <option value="D">DPI</option>
                                                        <option value="P">Pasaporte</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Número identificación</label>
                                                    <input name="noDocIdentificacionCliente_${id}" id="noDocIdentificacionCliente_${id}" type="text" class="form-control noDocIdentificacionCliente" placeholder="Número identificación..." maxlength="20" required disabled/>
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>País (Pasaporte)</label>
                                                    <select name="emicionPasaporteCliente_${id}" id="emicionPasaporteCliente_${id}" class="form-control custom-select emicionPasaporteCliente" style="width: 100%" disabled required>
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
                                                    <select name="paisRecidenciaCliente_${id}" id="paisRecidenciaCliente_${id}" class="form-control custom-select paisRecidenciaCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                                    </select>
                                                </div>
                                            </div>

                                            <!-- select departamento -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Departamento residencia</label>
                                                    <select name="deptoRecidenciaCliente_${id}" id="deptoRecidenciaCliente_${id}" class="form-control custom-select deptoRecidenciaCliente getMunicipio setDepartamento" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select muni -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Municipio residencia</label>
                                                    <select name="muniRecidenciaCliente_${id}" id="muniRecidenciaCliente_${id}" class="form-control custom-select muniRecidenciaCliente setMunicipio" style="width: 100%" required disabled>
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
                                                            <select name="nacionalidadCliente_${id}" id="nacionalidadCliente_${id}_1" class="form-control custom-select nacionalidadCliente" style="width: 100%" required>
                                                                <option value="" disabled selected>Selecciona</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-sm my-auto pt-2"></div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <button type="button" class="btn btn-primary agregarNacionalidaCliente">
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
                                                            <input name="telefonoCliente" type="text" class="form-control telefonoCliente" placeholder="telefono ..." maxlength="30" required />
                                                        </div>
                                                        <div class="col-sm"></div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <button type="button" class="btn btn-primary agregarTelefono">
                                                        Agregar teléfono
                                                    </button>
                                                </div>
                                            </div>
                                            <!-- .telefono -->
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-check">
                                                    <div>
                                                        <label>¿El cliente es Contratista y Proveedor del Estado (CPE)?</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryCpeClienteSi_${id}" class="cpeCliente" name="cpeCliente_${id}" value="S" required />
                                                        <label for="primaryCpeClienteSi_${id}">Sí</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryCpeClienteNo_${id}" class="cpeCliente" name="cpeCliente_${id}" value="N" required />
                                                        <label for="primaryCpeClienteNo_${id}">No</label>
                                                        <div class="invalid-tooltip">Indica si el cliente es CPE.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-check">
                                                    <div>
                                                        <label>¿El cliente es una Persona Expuesta Políticamente (PEP)?</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryPepSi_${id}" class="pepCliente" name="pepCliente_${id}" value="S" required />
                                                        <label for="primaryPepSi_${id}">Sí</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryPepNo_${id}" class="pepCliente" name="pepCliente_${id}" value="N" required />
                                                        <label for="primaryPepNo_${id}">No</label>
                                                        <div class="invalid-tooltip">Indica si el cliente es PEP.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="datospepCliente_${id}"></div>

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

        let inputActuaNombrePropio = $(divTitularActual).find(
            "input.actuaNombrePropio"
        );
        inputActuaNombrePropio.focus();
        verificaActuaNombrePropio(inputActuaNombrePropio);

        let selectPaisActual = $(divTitularActual).find("select.setPais");
        habilitaDepartamentoMunicipio(selectPaisActual);
        cargarPais(selectPaisActual);
        let selectDepartamentoActual = $(divTitularActual).find(
            "select.setDepartamento"
        );
        cargarDepartamentos(selectDepartamentoActual);

        let selectChangeMunicpio = $(divTitularActual).find(
            "select.getMunicipio"
        );
        cargarMunicipios(selectChangeMunicpio);

        let fechas = $(divTitularActual).find("div.date");
        setFormatoFecha(fechas);

        let apesCasada = $(divTitularActual).find(
            "input.apellidoCasadaCliente"
        );
        validarApellidoCasada(apesCasada);

        let liConMigratoria = $(divTitularActual).find(
            "select.condicionMigratoriaCliente"
        );
        cargarCondicionMigratoria(liConMigratoria);
        let nit = $(divTitularActual).find(`input:text[id=${idNit}]`);
        validarNit($(nit));

        let selectValidaPaisPasaporte = $(divTitularActual).find(
            "select.validaPaisPasaporte"
        );
        habilitaPaisPasaporte(selectValidaPaisPasaporte);
        // se carga el pais, no se necestia verificar departamentos,
        // los demas paises se cargan con la clase set Pais
        let paisPasaporte = $(divTitularActual).find(
            "select.emicionPasaporteCliente"
        );
        cargarPais(paisPasaporte);

        let paisNacionalidad = $(divTitularActual).find(
            "select.nacionalidadCliente"
        );
        cargarPais(paisNacionalidad);
        let btnsAddNacionalidad = $(divTitularActual).find(
            "button.agregarNacionalidaCliente"
        );
        agregarTemplateNacionalidad(btnsAddNacionalidad);

        let btnAddTelefono = $(divTitularActual).find("button.agregarTelefono");
        agregarTemplateTelefono(btnAddTelefono);

        let radioButtonClientePep = $(divTitularActual).find(
            "input.pepCliente"
        );
        verificarClientePep(radioButtonClientePep);

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
        this.residencia = new dicLugar();
        this.pep = null;
        this.datospep = new datosPep();
        this.parienteAsociadoPep = null;
        this.datosParienteAsociadoPep = new dicParienteAsociadoPep();
        this.cpe = null;
    }
    agregarTelefono(telefono) {
        this.telefonos.push(telefono);
    }
    agregarNacionalidad(nacionalidad) {
        this.nacionalidades.push(nacionalidad);
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
    let titulares = $("#titulares>div");
    for (let i = 0; i < titulares.length; i++) {
        $(titulares[i]).CardWidget("expand");
    }
}
function validarFormulario() {
    var forms = document.getElementsByClassName("needs-validation");
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                expandirCard();
                obtenerDatos();
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add("was-validated");
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("enviando formulario");
                    enviarDatos();
                }
            },
            false
        );
    });
}
function enviarDatos() {
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
}
function eliminarTemplateTitular(titulares) {
    for (let i = 0; i < titulares.length; i++) {
        $(titulares[i]).on("removed.lte.cardwidget", function (event) {
            let cardActual = $(event.target).parent().parent().parent();
            if ($(cardActual).index() > 0) {
                $(cardActual).remove();
            }
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
            .find(`input:text[id=otrosNombresCliente_${id}]`)
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
        titular.cliente.sexo = $(divTitularActual)
            .find(`select[id=sexoCliente_${id}] option:selected`)
            .val();
        titular.cliente.estadoCivil = $(divTitularActual)
            .find(`select[id=estadoCivilCliente_${id}] option:selected`)
            .val();
        titular.cliente.nit = $(divTitularActual)
            .find(`input:text[id=nitCliente_${id}]`)
            .val();
        titular.cliente.tipoDocumentoIdentificacion = $(divTitularActual)
            .find(
                `select[id=tipoDoctoIdentificacionCliente_${id}] option:selected`
            )
            .val();
        titular.cliente.numeroDocumentoIdentificacion = $(divTitularActual)
            .find(`input:text[id=noDocIdentificacionCliente_${id}]`)
            .val();
        titular.cliente.emisionPasaporte = $(divTitularActual)
            .find(`select[id=emicionPasaporteCliente_${id}] option:selected`)
            .val();
        titular.cliente.profesionOficio = $(divTitularActual)
            .find(`input:text[id=profecionOficioCliente_${id}]`)
            .val();
        titular.cliente.email = $(divTitularActual)
            .find(`input[id=emailCliente_${id}]`)
            .val();
        titular.cliente.direccionResidencia = $(divTitularActual)
            .find(`input:text[id=direccionRecidenciaCliente_${id}]`)
            .val();
        titular.cliente.residencia.pais = $(divTitularActual)
            .find(`select[id=paisRecidenciaCliente_${id}] option:selected`)
            .val();
        titular.cliente.residencia.departamento = $(divTitularActual)
            .find(`select[id=deptoRecidenciaCliente_${id}] option:selected`)
            .val();
        titular.cliente.residencia.municipio = $(divTitularActual)
            .find(`select[id=muniRecidenciaCliente_${id}] option:selected`)
            .val();
        let telefonos = $(divTitularActual).find(`input.telefonoCliente`);
        console.log(telefonos);
        for (let i = 0; i < telefonos.length; i++) {
            titular.cliente.agregarTelefono($(telefonos[i]).val());
        }

        let nacionalidades = $(divTitularActual).find(
            `select.nacionalidadCliente`
        );
        for (let a = 0; a < nacionalidades.length; a++) {
            titular.cliente.agregarNacionalidad($(nacionalidades[a]).val());
        }
        titular.cliente.cpe = $(divTitularActual)
            .find(`input:radio[name=cpeCliente_${id}]:checked`)
            .val();
        let esPep = (titular.cliente.pep = $(divTitularActual)
            .find(`input:radio[name=pepCliente_${id}]:checked`)
            .val());
        if (esPep === "S") {
            titular.cliente.datospep.entidad = $(divTitularActual)
                .find(`input[id=entidadpepCliente_${id}]`)
                .val();
            titular.cliente.datospep.puestoDesempenia = $(divTitularActual)
                .find(`input[id=puestoDesepeniapepCliente_${id}]`)
                .val();
            titular.cliente.datospep.paisEntidad = $(divTitularActual)
                .find(`select[id=paisEntidadpepCliente_${id}] option:selected`)
                .val();
            let esOtroRiqueza = (titular.cliente.datospep.origenRiqueza = $(
                divTitularActual
            )
                .find(
                    `select[id=origenRiquezapepCliente_${id}] option:selected`
                )
                .val());
            if (esOtroRiqueza == 8) {
                titular.cliente.datospep.otroOrigenRiqueza = $(divTitularActual)
                    .find(`input[id=otroOrigenRiquezapepCliente_${id}]`)
                    .val();
            }
        } else {
            titular.cliente.datospep = null;
        }

        let esAsoPep = (titular.cliente.parienteAsociadoPep = $(
            divTitularActual
        )
            .find(`input:radio[name=asoPepCliente_${id}]:checked`)
            .val());

        if (esAsoPep == "S") {
            let asociados = $(`#datosasoPepCliente_${id}>div.info`).children();
            for (let a = 0; a < asociados.length; a++) {
                let id = $(asociados[a]).attr("id");
                console.log(id);
            }
        } else {
            titular.cliente.datosParienteAsociadoPep = null;
        }

        df.agregarTitular(titular);
    }
    console.log(df);
    return df;
}
$(document).ready(function () {
    console.log("Esperando a que la pagina cargue completamente ");
    setFormatoFecha($(".date"));
    verificaActuaNombrePropio($(".actuaNombrePropio"));
    habilitaDepartamentoMunicipio($(".deshabilitaDepartamentoMunicipio"));
    cargarMunicipios($(".getMunicipio"));
    validarApellidoCasada($(".apellidoCasadaCliente"));
    habilitaOtraCondicionMigratoria($(".condicionMigratoriaCliente"));
    validarNit($(".validarNit"));
    habilitaPaisPasaporte($(".validaPaisPasaporte"));
    agregarTemplateNacionalidad($(".agregarNacionalidaCliente"));
    agregarTemplateTelefono($(".agregarTelefonoCliente"));
    verificarClientePep($(".pepCliente"));
    verificarAsoPep($(".asoPepCliente"));
    AgregarTitular();
    eliminarTemplateTitular($("#titulares>div"));
    validarFormulario();
});
