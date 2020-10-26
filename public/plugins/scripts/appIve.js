// templates
function templateInvalidTooltip(mensaje) {
    return `<div class="invalid-tooltip">${mensaje}</div>`;
}
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
function templateNit(id) {
    let temNit = `
    <div class="col-sm">
        <div class="form-group">
            <label>Nit</label>
            <input name="nit${id}" id="nit${id}" type="text" class="form-control nit" placeholder="Nit ..." maxlength="20" />
        </div>
    </div>
    `;
    return temNit;
}
function templateDoctoIdentificacion(id) {
    let temDoctoIdent = `
<div class="col-sm">
    <div class="form-group">
        <label>Docto. identificación</label>
        <select name="tipoDoctoIdentificacion${id}" id="tipoDoctoIdentificacion${id}" class="form-control custom-select tipoDoctoIdentificacion validaPaisPasaporte" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
            <option value="D">DPI</option>
            <option value="P">Pasaporte</option>
        </select>
    </div>
</div>
    `;
    return temDoctoIdent;
}
function templateNumDocumento(id) {
    let temNumDoc = `
    <div class="col-sm">
        <div class="form-group">
            <label>Número identificación</label>
            <input name="noDocIdentificacion${id}" id="noDocIdentificacion${id}" type="text" class="form-control noDocIdentificacion" placeholder="Número identificación..." maxlength="20" required disabled/>
        </div>
    </div>`;
    return temNumDoc;
}
function templateEstadoCivil(id) {
    let temEs = `
    <div class="col-sm">
        <div class="form-group">
            <label>Estado civil</label>
            <select name="estadoCivil${id}" id="estadoCivil${id}" class="form-control custom-select estadoCivil" style="width: 100%" required>
                <option value="" disabled selected>Selecciona</option>
                <option value="S">Soltero</option>
                <option value="C">Casado</option>
            </select>
        </div>
    </div>
    `;
    return temEs;
}
function templatePais(id, textolabel, desabilitadeptomuni) {
    let claseDeptoMuni = "";
    if (desabilitadeptomuni == true) {
        claseDeptoMuni = "deshabilitaDepartamentoMunicipio";
    }
    let templatepais = `
    <div class="col-sm">
        <div class="form-group">
            <label for="${id}">${textolabel}</label>
            <select name="${id}" id="${id}" class="form-control custom-select pais ${claseDeptoMuni} setPais" style="width: 100%" required>
            <option value="" disabled selected>Selecciona</option>
            </select>
        </div>
    </div>
    `;
    return templatepais;
}
function templateDepartamento(id, textolabel) {
    let temDepartamento = `
    <div class="col-sm">
        <div class="form-group">
            <label>${textolabel}</label>
            <select name="depto${id}" id="depto${id}" class="form-control custom-select depto getMunicipio setDepartamento" style="width: 100%" required disabled>
                <option value="" disabled selected>Selecciona</option>
            </select>
        </div>
    </div>
    `;
    return temDepartamento;
}
function templateMunicipio(id, textolabel) {
    let temMunicipio = `
    <div class="col-sm">
        <div class="form-group">
            <label>${textolabel}</label>
            <select name="muni${id}" id="muni${id}" class="form-control custom-select muni setMunicipio" style="width: 100%" required disabled>
                <option value="" disabled selected>Selecciona</option>
            </select>
        </div>
    </div>
    `;
    return temMunicipio;
}
function templateCondicionMigratoria(id) {
    let temCondicionMigratoria = `
        <div class="col-sm">
            <div class="form-group">
                <label>Condición migratoria</label>
                <select name="condicionMigratoria${id}" id="condicionMigratoria${id}" class="form-control custom-select condicionMigratoria" style="width: 100%" disabled required>
                <option value="" disabled selected>Selecciona</option>
                </select>
            </div>
        </div>
        <div class="col-sm">
            <div class="form-group">
                <label>Especifique</label>
                <input name="otraCoMi${id}" id="otraCoMi${id}" type="text" class="form-control otraCoMi" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />
            </div>
        </div>
        `;
    return temCondicionMigratoria;
}
function templateFecha(id, nombre) {
    let temCampoFecha = `
    <div class="col-sm">
        <div class="form-group">
            <label>Fecha nacimiento</label>
            <div class="input-group date" id="fecha${nombre}_${id}" data-target-input="nearest">
                <input name="fecha${nombre}${id}" id="fecha${nombre}${id}" type="text" class="form-control datetimepicker-input" data-target="#fecha${nombre}_${id}" required />
                <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                <div class="input-group-append" data-target="#fecha${nombre}_${id}" data-toggle="datetimepicker">
                    <div class="input-group-text">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return temCampoFecha;
}
function templateCamposNacimiento(id) {
    //fechaNacimiento
    let cmFechaNacimiento = templateFecha(id, "nacimiento");
    let cmPaisNacimiento = templatePais(
        `paisNacimiento${id}`,
        "País nacimiento",
        true
    );
    let cmDepartamentoNacimiento = templateDepartamento(
        `Nacimiento${id}`,
        "Departamento nacimiento"
    );
    let cmMunicipio = templateMunicipio(
        `Nacimiento${id}`,
        "Municipio nacimiento"
    );
    let cmCondicionMigratoria = templateCondicionMigratoria(id);
    let temCampoNac = `
    <div class="row">
        ${cmFechaNacimiento}
        ${cmPaisNacimiento}
        ${cmDepartamentoNacimiento}
        ${cmMunicipio}
        ${cmCondicionMigratoria}
    </div>
`;
    return temCampoNac;
}
function templateCamposDocumentos(id) {
    let comSexo = templateSexo(id);
    let comEstadoCivil = templateEstadoCivil(id);
    let comNit = templateNit(id);
    let comDocIdentificacion = templateDoctoIdentificacion(id);
    let comNumDoctoIdentifica = templateNumDocumento(id);
    let paisPasaporte = templatePais(
        `emicionPasaporte${id}`,
        "País (Pasaporte)",
        false
    );
    let temCamDoc = `
    <div class="row">
    ${comSexo}
    ${comEstadoCivil}
    ${comNit}
    ${comDocIdentificacion}
    ${comNumDoctoIdentifica}
    ${paisPasaporte}
    </div>
    `;
    return temCamDoc;
}
function templateCamposMinimos(id, titulo) {
    let tcamposNombres = templateCamposNommbres(id);
    let tcamposNacimiento = templateCamposNacimiento(id);
    let tCamposDoc = templateCamposDocumentos(id);
    let tcamposMinimos = `
    <div class="card card-info mt-3" id=${id}>
        <div class="card-header">
            <h3 class="card-title">${titulo}</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            ${tcamposNombres}
            ${tcamposNacimiento}
            ${tCamposDoc}
        </div>

     </div>`;
    return tcamposMinimos;
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
function agregarRepresentante(divDatosRepresentante, idTitular) {
    console.log(`agregado informacion del representante ${idTitular}`);
    let templateRepresentante = templateCamposMinimos(
        `Representante${idTitular}`,
        "Información del representante"
    );
    $(divDatosRepresentante).append(templateRepresentante);
    validarApellidoCasada($(`input#apellidoCasadaRepresentante${idTitular}`));
    setFormatoFecha($(`div.date`));
    habilitaDepartamentoMunicipio(
        $(`select#paisNacimientoRepresentante${idTitular}`)
    );
    cargarPais($(`select#paisNacimientoRepresentante${idTitular}`));
    cargarDepartamentos($(`select#deptoNacimientoRepresentante${idTitular}`));
    cargarMunicipios($(`select#deptoNacimientoRepresentante${idTitular}`));
    validarNit($(`input#nitRepresentante${idTitular}`));
}
function verificaActuaNombrePropio(elementoActuaNomprePropio) {
    for (let i = 0; i < elementoActuaNomprePropio.length; i++) {
        $(elementoActuaNomprePropio[i]).change(function () {
            let divDatosRepresentante = `#representanteCliente_1`;
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
                $(divDatosRepresentante).children().remove();
            } else if (this.value === "R") {
                inputCalidadActua[0].disabled = false;
                $(inputCalidadActua[0]).prop("required", true);
                agregarRepresentante(divDatosRepresentante, "Cliente_1");
            }
        });
    }
}
function habilitaDepartamentoMunicipio(selectPais) {
    for (let i = 0; i < selectPais.length; i++) {
        $(selectPais[i]).change(function () {
            let divPadre = $(this).parent().parent().parent();
            let selectCondicionMig = $(divPadre).find(
                "select.condicionMigratoria"
            );
            let otraCondicionMigratoria = $(divPadre).find("input.otraCoMi");
            let departamento = $(divPadre).find("select.getMunicipio");
            let municipio = $(divPadre).find("select.setMunicipio");
            if (this.value == 1) {
                departamento[0].disabled = false;
                // verifica si existe el campo CondicionMigratoria
                if (selectCondicionMig.length) {
                    selectCondicionMig[0].disabled = true;
                    $(selectCondicionMig[0]).empty();
                    $(selectCondicionMig[0]).append(
                        '<option value="" disabled selected>Selecciona</option>'
                    );
                    $(otraCondicionMigratoria[0]).val(null);
                    otraCondicionMigratoria[0].disabled = true;
                }
            } else {
                departamento[0].disabled = true;
                municipio[0].disabled = true;
                $(municipio[0]).empty();
                $(municipio[0]).append(
                    '<option value="" disabled selected>Selecciona</option>'
                );
                cargarDepartamentos(departamento);
                if (selectCondicionMig.length) {
                    selectCondicionMig[0].disabled = false;
                    cargarCondicionMigratoria($(selectCondicionMig[0]));
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
                .find("input.otraCoMi");
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
        `pais${id}`,
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
                                                <label for="entidad${id}">Entidad</label>
                                                <input name="entidad${id}" id="entidad${id}" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required />
                                            </div>
                                        </div>
                                        <div class="col-sm">
                                            <div class="form-group">
                                                <label for="puestoDesempenia${id}">Puesto que desempeña</label>
                                                <input name="puestoDesempenia${id}" id="puestoDesempenia${id}" type="text" class="form-control" placeholder="Puesto que desempeña ..." maxlength="200" required />
                                            </div>
                                        </div>
                                        ${componentePais}
                                    </div>
                                </div>
                                </div>`;
    $(`#datos${idAsoPep}>div.info`).append(templateAsocPep);

    validarApellidoCasada($(`input#apellidoCasada${id}`));
    cargarPais($(`select#pais${id}`));
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

        let idTitular = `${tipo}_${id}`;
        let camposNombresTitulares = templateCamposNommbres(idTitular);
        let componenteSexoCamposMinimos = templateSexo(idTitular);

        let templateTitular = `
                                <div class="card card-primary" id="${idTitular}">
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
                                                        <input type="radio" id="siActua${idTitular}" class="actuaNombrePropio" name="tipoActuacion${idTitular}" value="C" required/>
                                                        <label for="siActua${idTitular}">Sí</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="noActua${idTitular}" class="actuaNombrePropio" name="tipoActuacion${idTitular}" value="R" required />
                                                        <label for="noActua${idTitular}">No</label>
                                                        <div class="invalid-tooltip">Indica el tipo de actuación</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <label for ="calidadActua${idTitular}" >Calidad con que actúa</label>
                                                    <input name="calidadActua${idTitular}" id="calidadActua${idTitular}" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
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
                                                    <select name="paisCaMi${idTitular}" id="paisCaMi${idTitular}" class="form-control custom-select paisCaMiCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select departamento -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Departamento</label>
                                                    <select name="deptoCaMi${idTitular}" id="deptoCaMi${idTitular}" class="form-control custom-select deptoCaMiCliente getMunicipio setDepartamento" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select muni -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Municipio</label>
                                                    <select name="muniCaMi${idTitular}" id="muniCaMi${idTitular}" class="form-control custom-select muniCaMiCliente setMunicipio" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- fecha -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Fecha</label>
                                                    <div class="input-group date" id="fechaDoc_${idTitular}" data-target-input="nearest">
                                                        <input name="fechaDocCaMi${idTitular}" id="fechaDocCaMi${idTitular}" type="text" class="form-control datetimepicker-input fechaCaMiCliente" data-target="#fechaDoc_${idTitular}" required />
                                                        <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                                                        <div class="input-group-append" data-target="#fechaDoc_${idTitular}" data-toggle="datetimepicker">
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
                                        ${camposNombresTitulares}
                                        <div class="row">
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Fecha nacimiento</label>
                                                    <div class="input-group date" id="fechaNacimiento_${idTitular}" data-target-input="nearest">
                                                        <input name="fechaNacimiento${idTitular}" id="fechaNacimiento${idTitular}" type="text" class="form-control datetimepicker-input" data-target="#fechaNacimiento_${idTitular}" required />
                                                        <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                                                        <div class="input-group-append" data-target="#fechaNacimiento_${idTitular}" data-toggle="datetimepicker">
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
                                                    <select name="paisNacimiento${idTitular}" id="paisNacimiento${idTitular}" class="form-control custom-select paisNacimientoCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                                    </select>
                                                </div>
                                            </div>

                                            <!-- select departamento -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Departamento nacimiento</label>
                                                    <select name="deptoNacimiento${idTitular}" id="deptoNacimiento${idTitular}" class="form-control custom-select deptoNacimientoCliente getMunicipio setDepartamento" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select muni -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Municipio nacimiento</label>
                                                    <select name="muniNaciminento${idTitular}" id="muniNaciminento${idTitular}" class="form-control custom-select muniNaciminentoCliente setMunicipio" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Condición migratoria</label>
                                                    <select name="condicionMigratoria${idTitular}" id="condicionMigratoria${idTitular}" class="form-control custom-select condicionMigratoria" style="width: 100%" disabled required>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Especifique</label>
                                                    <input name="otraCoMi${idTitular}" id="otraCoMi${idTitular}" type="text" class="form-control otraCoMi" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />
                                                </div>
                                            </div>
                                        </div>
                                        <!-- .row -->

                                        <div class="row">
                                            <!-- sexo cliente -->
                                         ${componenteSexoCamposMinimos}
                                            <!-- .col-sm -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Estado civil</label>
                                                    <select name="estadoCivil${idTitular}" id="estadoCivil${idTitular}" class="form-control custom-select estadoCivilCliente" style="width: 100%" required>
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
                                                    <select name="tipoDoctoIdentificacion${idTitular}" id="tipoDoctoIdentificacion${idTitular}" class="form-control custom-select tipoDoctoIdentificacionCliente validaPaisPasaporte" style="width: 100%" required>
                                                        <option value="" disabled selected>Selecciona</option>
                                                        <option value="D">DPI</option>
                                                        <option value="P">Pasaporte</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Número identificación</label>
                                                    <input name="noDocIdentificacion${idTitular}" id="noDocIdentificacion${idTitular}" type="text" class="form-control noDocIdentificacionCliente" placeholder="Número identificación..." maxlength="20" required disabled/>
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>País (Pasaporte)</label>
                                                    <select name="emicionPasaporte${idTitular}" id="emicionPasaporte${idTitular}" class="form-control custom-select emicionPasaporteCliente" style="width: 100%" disabled required>
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
                                                    <input name="profecionOficio${idTitular}" id="profecionOficio${idTitular}" type="text" class="form-control profecionOficioCliente" placeholder="Profesión u oficio ..." maxlength="100" required />
                                                </div>
                                            </div>
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Correo electrónico</label>
                                                    <input name="email${idTitular}" id="email${idTitular}" type="email" class="form-control emailCliente" placeholder="Correo electrónico ..." maxlength="100" />
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
                                                <input name="direccionRecidencia${idTitular}" id="direccionRecidencia${idTitular}" type="text" class="form-control direccionRecidenciaCliente" placeholder="Dirección de residencia completa ..." maxlength="400" required />
                                            </div>
                                        </div>
                                        <!-- .row -->

                                        <div class="row">
                                            <!-- select pais nacimiento Cliente -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>País residencia</label>
                                                    <select name="paisRecidencia${idTitular}" id="paisRecidencia${idTitular}" class="form-control custom-select paisRecidenciaCliente deshabilitaDepartamentoMunicipio setPais" style="width: 100%" required>
                                                    </select>
                                                </div>
                                            </div>

                                            <!-- select departamento -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Departamento residencia</label>
                                                    <select name="deptoRecidencia${idTitular}" id="deptoRecidencia${idTitular}" class="form-control custom-select deptoRecidenciaCliente getMunicipio setDepartamento" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- select muni -->
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label>Municipio residencia</label>
                                                    <select name="muniRecidencia${idTitular}" id="muniRecidencia${idTitular}" class="form-control custom-select muniRecidenciaCliente setMunicipio" style="width: 100%" required disabled>
                                                        <option value="" disabled selected>Selecciona</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm" id="nacionalidad${idTitular}">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm">
                                                            <label>Nacionalidad</label>
                                                            <select name="nacionalidad${idTitular}" id="nacionalidad${idTitular}_1" class="form-control custom-select nacionalidadCliente" style="width: 100%" required>
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
                                                        <input type="radio" id="primaryCpeClienteSi_${idTitular}" class="cpeCliente" name="cpe${idTitular}" value="S" required />
                                                        <label for="primaryCpeClienteSi_${idTitular}">Sí</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryCpeClienteNo_${idTitular}" class="cpeCliente" name="cpe${idTitular}" value="N" required />
                                                        <label for="primaryCpeClienteNo_${idTitular}">No</label>
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
                                                        <input type="radio" id="primaryPepSi_${idTitular}" class="pepCliente" name="pep${idTitular}" value="S" required />
                                                        <label for="primaryPepSi_${idTitular}">Sí</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryPepNo_${idTitular}" class="pepCliente" name="pep${idTitular}" value="N" required />
                                                        <label for="primaryPepNo_${idTitular}">No</label>
                                                        <div class="invalid-tooltip">Indica si el cliente es PEP.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="datospep${idTitular}"></div>

                                        <div class="row">
                                            <div class="col-sm">
                                                <div class="form-check">
                                                    <div>
                                                        <label>¿El cliente tiene parentesco o es asociado cercano a una Persona Expuesta Políticamente (PEP)?</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryAsoPepSi${idTitular}" class="asoPep" name="asoPep${idTitular}" value="S" required />
                                                        <label for="primaryAsoPepSi${idTitular}">Sí</label>
                                                    </div>
                                                    <div class="icheck-primary d-inline">
                                                        <input type="radio" id="primaryAsoPepNo${idTitular}" class="asoPep" name="asoPep${idTitular}" value="N" required />
                                                        <label for="primaryAsoPepNo${idTitular}">No</label>
                                                        <div class="invalid-tooltip">Indica si el cliente tine un tiene parentesco o es asociadoa una Persona PEP.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="datosasoPep${idTitular}">
                                            <div class="info">
                                            </div>
                                            <div class="btnadd">
                                            </div>
                                        </div>
                                        <!-- .datosPaAsPep -->
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                `;
        $("#titulares").append(templateTitular);
        /*agregado validadciones para el nuevo titular*/
        let divTitularActual = $(`#titulares>div#${idTitular}`);

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

        //cuando se usa template, se puede utilizar un id exacto para localizar el elemento
        validarApellidoCasada($(`input#apellidoCasada${idTitular}`));

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
        let radioEsAsoPep = $(divTitularActual).find(
            `input:radio[name=asoPep${idTitular}]`
        );
        console.log(radioEsAsoPep);
        verificarAsoPep(radioEsAsoPep);

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
        this.datosParienteAsociadoPep = new Array();
        this.cpe = null;
    }
    agregarTelefono(telefono) {
        this.telefonos.push(telefono);
    }
    agregarNacionalidad(nacionalidad) {
        this.nacionalidades.push(nacionalidad);
    }
    agregarParienteAsociadoPep(asociado) {
        this.datosParienteAsociadoPep.push(asociado);
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
        console.log(divTitularActual);
        let titular = new dicCamposMinimos();
        titular.tipoActuacion = $(divTitularActual)
            .find(`input:radio[name=tipoActuacion${id}]:checked`)
            .val();
        titular.calidadActua = $(divTitularActual)
            .find(`input:text[id=calidadActua${id}]`)
            .val();
        titular.lugar.pais = $(divTitularActual)
            .find(`select[id=paisCaMi${id}] option:selected`)
            .val();
        titular.lugar.departamento = $(divTitularActual)
            .find(`select[id=deptoCaMi${id}] option:selected`)
            .val();
        titular.lugar.municipio = $(divTitularActual)
            .find(`select[id=muniCaMi${id}] option:selected`)
            .val();
        titular.fecha = $(divTitularActual)
            .find(`input:text[id=fechaDocCaMi${id}]`)
            .val();
        titular.cliente.primerApellido = $(divTitularActual)
            .find(`input:text[id=primerApellido${id}]`)
            .val();
        titular.cliente.segundoApellido = $(divTitularActual)
            .find(`input:text[id=segundoApellido${id}]`)
            .val();
        titular.cliente.apellidoCasada = $(divTitularActual)
            .find(`input:text[id=apellidoCasada${id}]`)
            .val();
        titular.cliente.primerNombre = $(divTitularActual)
            .find(`input:text[id=primerNombre${id}]`)
            .val();
        titular.cliente.segundoNombre = $(divTitularActual)
            .find(`input:text[id=segundoNombre${id}]`)
            .val();
        titular.cliente.otrosNombres = $(divTitularActual)
            .find(`input:text[id=otrosNombres${id}]`)
            .val();
        titular.cliente.fechaNacimiento = $(divTitularActual)
            .find(`input:text[id=fechaNacimiento${id}]`)
            .val();
        titular.cliente.nacimiento.pais = $(divTitularActual)
            //
            .find(`select[id=paisNacimiento${id}] option:selected`)
            .val();
        titular.cliente.nacimiento.departamento = $(divTitularActual)
            .find(`select[id=deptoNacimiento${id}] option:selected`)
            .val();
        titular.cliente.nacimiento.municipio = $(divTitularActual)
            .find(`select[id=muniNaciminento${id}] option:selected`)
            .val();
        titular.cliente.condicionMigratoria = $(divTitularActual)
            .find(`select[id=condicionMigratoria${id}] option:selected`)
            .val();
        titular.cliente.otraCondicionMigratoria = $(divTitularActual)
            .find(`input:text[id=otraCoMi${id}]`)
            .val();
        titular.cliente.sexo = $(divTitularActual)
            .find(`select[id=sexo${id}] option:selected`)
            .val();
        titular.cliente.estadoCivil = $(divTitularActual)
            .find(`select[id=estadoCivil${id}] option:selected`)
            .val();
        titular.cliente.nit = $(divTitularActual)
            .find(`input:text[id=nit${id}]`)
            .val();
        titular.cliente.tipoDocumentoIdentificacion = $(divTitularActual)
            .find(`select[id=tipoDoctoIdentificacion${id}] option:selected`)
            .val();
        titular.cliente.numeroDocumentoIdentificacion = $(divTitularActual)
            .find(`input:text[id=noDocIdentificacion${id}]`)
            .val();
        titular.cliente.emisionPasaporte = $(divTitularActual)
            .find(`select[id=emicionPasaporte${id}] option:selected`)
            .val();
        titular.cliente.profesionOficio = $(divTitularActual)
            .find(`input:text[id=profecionOficio${id}]`)
            .val();
        titular.cliente.email = $(divTitularActual)
            .find(`input[id=email${id}]`)
            .val();
        titular.cliente.direccionResidencia = $(divTitularActual)
            .find(`input:text[id=direccionRecidencia${id}]`)
            .val();
        titular.cliente.residencia.pais = $(divTitularActual)
            .find(`select[id=paisRecidencia${id}] option:selected`)
            .val();
        titular.cliente.residencia.departamento = $(divTitularActual)
            .find(`select[id=deptoRecidencia${id}] option:selected`)
            .val();
        titular.cliente.residencia.municipio = $(divTitularActual)
            .find(`select[id=muniRecidencia${id}] option:selected`)
            .val();
        let telefonos = $(divTitularActual).find(`input.telefonoCliente`);
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
            .find(`input:radio[name=cpe${id}]:checked`)
            .val();
        let esPep = (titular.cliente.pep = $(divTitularActual)
            .find(`input:radio[name=pep${id}]:checked`)
            .val());
        if (esPep === "S") {
            titular.cliente.datospep.entidad = $(divTitularActual)
                .find(`input[id=entidadpep${id}]`)
                .val();
            titular.cliente.datospep.puestoDesempenia = $(divTitularActual)
                .find(`input[id=puestoDesepeniapep${id}]`)
                .val();
            titular.cliente.datospep.paisEntidad = $(divTitularActual)
                .find(`select[id=paisEntidadpep${id}] option:selected`)
                .val();
            let esOtroRiqueza = (titular.cliente.datospep.origenRiqueza = $(
                divTitularActual
            )
                .find(`select[id=origenRiquezapep${id}] option:selected`)
                .val());
            if (esOtroRiqueza == 8) {
                titular.cliente.datospep.otroOrigenRiqueza = $(divTitularActual)
                    .find(`input[id=otroOrigenRiquezapep${id}]`)
                    .val();
            }
        } else {
            titular.cliente.datospep = null;
        }

        let esAsoPep = (titular.cliente.parienteAsociadoPep = $(
            divTitularActual
        )
            .find(`input:radio[name=asoPep${id}]:checked`)
            .val());

        if (esAsoPep == "S") {
            let asociados = $(`#datosasoPep${id}>div.info`).children();
            for (let a = 0; a < asociados.length; a++) {
                let id = $(asociados[a]).attr("id");
                let datosAsoPep = new dicParienteAsociadoPep();
                let divactual = `div#${id}`;
                datosAsoPep.parentesco = $(divactual)
                    .find(`select#parentesco${id}`)
                    .val();
                datosAsoPep.otroParentesco = $(divactual)
                    .find(`input#otroParentesco${id}`)
                    .val();
                datosAsoPep.motivoAsociacion = $(divactual)
                    .find(`select#motivoAsociacion${id}`)
                    .val();
                datosAsoPep.otroMotivoAsociacion = $(divactual)
                    .find(`input#otroMotivoAsociacion${id}`)
                    .val();
                datosAsoPep.sexo = $(divactual).find(`select#sexo${id}`).val();
                datosAsoPep.condicion = $(divactual)
                    .find(`select#condicion${id}`)
                    .val();
                datosAsoPep.primerApellido = $(divactual)
                    .find(`input#primerApellido${id}`)
                    .val();
                datosAsoPep.segundoApellido = $(divactual)
                    .find(`input#segundoApellido${id}`)
                    .val();
                datosAsoPep.apellidoCasada = $(divactual)
                    .find(`input#apellidoCasada${id}`)
                    .val();
                datosAsoPep.primerNombre = $(divactual)
                    .find(`input#primerNombre${id}`)
                    .val();
                datosAsoPep.segundoNombre = $(divactual)
                    .find(`input#segundoNombre${id}`)
                    .val();
                datosAsoPep.otrosNombres = $(divactual)
                    .find(`input#otrosNombres${id}`)
                    .val();
                datosAsoPep.entidad = $(divactual)
                    .find(`input#entidad${id}`)
                    .val();
                datosAsoPep.puestoDesempenia = $(divTitularActual)
                    .find(`input#puestoDesempenia${id}`)
                    .val();
                datosAsoPep.paisEntidad = $(divTitularActual)
                    .find(`select#pais${id}`)
                    .val();
                titular.cliente.agregarParienteAsociadoPep(datosAsoPep);
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
