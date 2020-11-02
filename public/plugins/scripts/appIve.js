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
function templateProfecionOficio(id) {
    let temProfOfici = `
        <div class="col-sm">
            <div class="form-group">
                <label>Profesión u oficio</label>
                <input name="profecionOficio${id}" id="profecionOficio${id}" type="text" class="form-control profecionOficio" placeholder="Profesión u oficio ..." maxlength="100" required />
            </div>
        </div>`;
    return temProfOfici;
}
function templateEmail(id) {
    let temcorreo = `
        <div class="col-sm">
            <div class="form-group">
                <label>Correo electrónico</label>
                <input name="email${id}" id="email${id}" type="email" class="form-control email" placeholder="Correo electrónico ..." maxlength="100" />
            </div>
        </div>`;
    return temcorreo;
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
function templatePais(
    id,
    textolabel,
    desabilitadeptomuni,
    clasesAdicionales = "",
    deshabilitado = false
) {
    let claseDeptoMuni = "";
    if (desabilitadeptomuni == true) {
        claseDeptoMuni = "deshabilitaDepartamentoMunicipio";
    }
    selectDesabilitado = "";
    if (deshabilitado == true) {
        selectDesabilitado = "disabled";
    }
    let templatepais = `
    <div class="col-sm">
        <div class="form-group">
            <label for="${id}">${textolabel}</label>
            <select name="${id}" id="${id}" class="form-control custom-select pais ${claseDeptoMuni} setPais ${clasesAdicionales}" style="width: 100%" required ${selectDesabilitado}>
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
function templateNacionalidad(id) {
    let temNacionalidad = `
        <div class="col-sm" id="nacionalidad${id}" cantidad="1">
            <div class="form-group">
                <div class="row">
                    <div class="col-sm">
                        <label>Nacionalidad</label>
                        <select name="nacionalidad${id}" id="nacionalidad${id}_1" class="form-control custom-select nacionalidad" style="width: 100%" required>
                            <option value="" disabled selected>Selecciona</option>
                        </select>
                    </div>
                    <div class="col-sm my-auto pt-2"></div>
                </div>
            </div>
            <div class="form-group">
                <button type="button" id="agregarNacionalidad${id}" class="btn btn-primary agregarNacionalidad">Agregar Nacionalidad</button>
            </div>
        </div>
    `;
    return temNacionalidad;
}
function templateTelefono(id, agregarBtnBorrar) {
    let btnBorrar = "";
    if (agregarBtnBorrar) {
        btnBorrar = `<button type="button" class="btn btn-danger">borrar</button>`;
    }
    let tmTelefono = `
        <div class="form-group">
            <div class="row">
                <div class="col-sm">
                    <input name="${id}" id="${id}" type="text" class="form-control telefono" placeholder="telefono ..." maxlength="30" required />
                </div>
                <div class="col-sm">${btnBorrar}</div>
            </div>
        </div>`;
    return tmTelefono;
}
function templateContenedorTelefonos(id) {
    let cmTel = templateTelefono(`telefono${id}_1`, false);
    let temTelefono = `
    <div class="col-sm" id="telefono${id}" cantidad="1">
        <label>Teléfonos</label>
        ${cmTel}
        <div class="form-group">
            <button type="button" id="agregarTelefono${id}" class="btn btn-primary agregarTelefono">Agregar teléfono</button>
        </div>
    </div>`;
    return temTelefono;
}
// div row
function templateCamposNacimiento(id) {
    //fechaNacimiento
    let cmFechaNacimiento = templateFecha(id, "Nacimiento");
    let cmPaisNacimiento = templatePais(
        `paisNacimiento${id}`,
        "País nacimiento",
        true
    );
    let cmDepartamentoNacimiento = templateDepartamento(
        `Nacimiento${id}`,
        "Depto. nacimiento"
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
function templateCamposResidencia(id) {
    let comPais = templatePais(`paisRecidencia${id}`, "País residencia", true);
    let comDepartamento = templateDepartamento(
        `Recidencia${id}`,
        "Departamento residencia"
    );
    let comMunicipio = templateMunicipio(
        `Recidencia${id}`,
        "Municipio residencia"
    );
    let tempCamResidencia = `
    <div class="row">
        ${comPais}
        ${comDepartamento}
        ${comMunicipio}
    </div>`;
    return tempCamResidencia;
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
        false,
        "emicionPasaporte",
        true
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
function templateCamposProfecion(id) {
    let comProfOficio = templateProfecionOficio(id);
    let comEmail = templateEmail(id);
    let temCamposProf = `
    <div class="row">
        ${comProfOficio}
        ${comEmail}
    </div>`;
    return temCamposProf;
}
function templateDireccion(id) {
    let temDirec = `
        <div class="row">
            <div class="col-sm">
                <label>Dirección de residencia completa (calle o avenida, número de casa, colonia, sector, lote, manzana, otros)</label>
                <input name="direccionRecidencia${id}" id="direccionRecidencia${id}" type="text" class="form-control direccionRecidencia" placeholder="Dirección de residencia completa ..." maxlength="400" required />
            </div>
        </div>`;
    return temDirec;
}
function templateCamposNacionalidadTelefono(id) {
    let cmNacionalidad = templateNacionalidad(id);
    let cmTelefono = templateContenedorTelefonos(id);
    let temCNT = `
    <div class="row">
        ${cmNacionalidad}
        ${cmTelefono}
    </div>
    `;
    return temCNT;
}
function templateCpe(id) {
    let temCpe = `
        <div class="row">
            <div class="col-sm-6">
                <div class="form-check">
                    <div><label>¿El cliente es Contratista y Proveedor del Estado (CPE)?</label></div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="cpeSi${id}" class="cpe" name="cpe${id}" value="S" required />
                        <label for="cpeSi${id}">Sí</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="cpeNo${id}" class="cpe" name="cpe${id}" value="N" required />
                        <label for="cpeNo${id}">No</label>
                        <div class="invalid-tooltip">Indica si el cliente es CPE.</div>
                    </div>
                </div>
            </div>
        </div>`;
    return temCpe;
}
function templateAsoPep(id) {
    let temAsoPep = `
        <div class="row">
            <div class="col-sm">
                <div class="form-check">
                    <div>
                        <label>¿El cliente tiene parentesco o es asociado cercano a una Persona Expuesta Políticamente (PEP)?</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="primaryAsoPepSi${id}" class="asoPep" name="asoPep${id}" value="S" required />
                        <label for="primaryAsoPepSi${id}">Sí</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="primaryAsoPepNo${id}" class="asoPep" name="asoPep${id}" value="N" required />
                        <label for="primaryAsoPepNo${id}">No</label>
                        <div class="invalid-tooltip">Indica si el cliente tine un tiene parentesco o es asociadoa una Persona PEP.</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="datosasoPep${id}">
            <div class="info">
            </div>
            <div class="btnadd">
            </div>
        </div>
    `;
    return temAsoPep;
}
function templatePersonaPep(id) {
    let temPersonaPep = `
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-check">
                        <div><label>¿El cliente es una Persona Expuesta Políticamente (PEP)?</label></div>
                        <div class="icheck-primary d-inline">
                            <input type="radio" id="pepSi${id}" class="pep" name="pep${id}" value="S" required />
                            <label for="pepSi${id}">Sí</label>
                        </div>
                        <div class="icheck-primary d-inline">
                            <input type="radio" id="pepNo${id}" class="pep" name="pep${id}" value="N" required />
                            <label for="pepNo${id}">No</label>
                            <div class="invalid-tooltip">Indica si el cliente es PEP.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datospep${id}"></div>`;
    return temPersonaPep;
}
function templateCamposMinimos(id, tipo) {
    let tcamposNombres = templateCamposNommbres(id);
    let tcamposNacimiento = templateCamposNacimiento(id);
    let tCamposDoc = templateCamposDocumentos(id);
    let tCamposProf = templateCamposProfecion(id);
    let tCampoDireccion = templateDireccion(id);
    let tCamposResidencia = templateCamposResidencia(id);
    let tCamposNumTel = templateCamposNacionalidadTelefono(id);
    let tCpe = templateCpe(id);
    let tPep = templatePersonaPep(id);
    let tAsoPep = templateAsoPep(id);
    let tcamposMinimos = `
    <div class="card card-info mt-3" id="${id}">
        <div class="card-header">
            <h3 class="card-title">Información del ${tipo}</h3>
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
            ${tCamposProf}
            ${tCampoDireccion}
            ${tCamposResidencia}
            ${tCamposNumTel}
            ${tCpe}
            ${tPep}
            ${tAsoPep}
        </div>

     </div>`;
    return tcamposMinimos;
}
// agrega template campos minimos con los eventos, y verificaciones
function agregarCamposMinimos(divDatos, idCamposMinimos, tipo) {
    console.log(`agregado informacion del  ${idCamposMinimos}`);
    let templateRepresentante = templateCamposMinimos(idCamposMinimos, tipo);
    $(divDatos).append(templateRepresentante);
    validarApellidoCasada($(`input#apellidoCasada${idCamposMinimos}`));
    setFormatoFecha($(`div.date`));
    // campos nacimiento
    habilitaDepartamentoMunicipio($(`select#paisNacimiento${idCamposMinimos}`));
    cargarPais($(`select#paisNacimiento${idCamposMinimos}`));
    cargarDepartamentos($(`select#deptoNacimiento${idCamposMinimos}`));

    habilitaPaisPasaporte(
        $(`Select#tipoDoctoIdentificacion${idCamposMinimos}`)
    );
    cargarPais($(`select#emicionPasaporte${idCamposMinimos}`));
    //campos nacimiento
    habilitaDepartamentoMunicipio($(`select#paisRecidencia${idCamposMinimos}`));
    cargarPais($(`select#paisRecidencia${idCamposMinimos}`));
    cargarDepartamentos($(`select#deptoRecidencia${idCamposMinimos}`));

    cargarPais($(`select#nacionalidad${idCamposMinimos}_1`));
    agregarTemplateNacionalidad(
        $(`button#agregarNacionalidad${idCamposMinimos}`)
    );
    agregarTemplateTelefono($(`button#agregarTelefono${idCamposMinimos}`));

    verificarPersonaPep($(`input[name=pep${idCamposMinimos}`));
    verificarAsoPep($(`input[name=asoPep${idCamposMinimos}]`));
    validarNit($(`input#nit${idCamposMinimos}`));
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
            let tipo = $(this)
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .attr("id");
            console.log(tipo);
            let divDatosRepresentante = $(`div#representante${tipo}`);
            let inputCalidadActua = $(`input#calidadActua${tipo}`);
            if (this.value === "C") {
                inputCalidadActua[0].disabled = true;
                $(inputCalidadActua[0]).val(null);
                $(inputCalidadActua[0]).prop("required", false);
                $(divDatosRepresentante).children().remove();
            } else if (this.value === "R") {
                inputCalidadActua[0].disabled = false;
                $(inputCalidadActua[0]).prop("required", true);
                agregarCamposMinimos(
                    divDatosRepresentante,
                    `Representante${tipo}`,
                    "representante"
                );
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
                cargarDepartamentos($(departamento[0]));
                municipio[0].disabled = true;
                $(municipio[0]).empty();
                $(municipio[0]).append(
                    '<option value="" disabled selected>Selecciona</option>'
                );
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
    cargarMunicipios(selectDepartamentos);
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
            console.log("cambiando dpi o pasaporte");
            let divPadre = $(this).parent().parent().parent();
            console.log($(divPadre).index());
            let selectPaisPasaporte = $(divPadre).find(
                "select.emicionPasaporte"
            );
            let inputDocumento = $(divPadre).find("input.noDocIdentificacion");
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
function verificarPersonaPep(radioClientePep) {
    for (let i = 0; i < radioClientePep.length; i++) {
        $(radioClientePep[i]).change(function () {
            /**
             * utilizo el atributo name, del input radio pepCliente para establecer el id unicao para cada campo id
             * cuando el titular el id sera entidadpepCliente_1 entidad${id}
             */
            let id = $(this).attr("name");
            if ($(this).val() != "N") {
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
            let id = $(divPadre).attr("cantidad");
            id++;
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
            $(divPadre).attr("cantidad", id);
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
            let idSelect = $(divPadre).attr("cantidad");
            idSelect++;
            let idInput = `${idDivPadre}_${idSelect}`;
            let cmTelefono = templateTelefono(idInput, true);
            $(`#${idDivPadre}>div:nth-last-child(2)`).after(cmTelefono);
            $(divPadre).attr("cantidad", idSelect);
            $(`#${idDivPadre}>div.form-group>div.row`)
                .find("button")
                .click(function () {
                    $(this).parent().parent().parent().remove();
                });
        });
    }
}

function agregaAsoPep(idAsoPep) {
    let indiceAsociadosAgregados = $(`#datos${idAsoPep}>div.info`).attr(
        "cantidad"
    );
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
    indiceAsociadosAgregados++;
    $(`#datos${idAsoPep}>div.info`).attr("cantidad", indiceAsociadosAgregados);
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
        let idTitular = `${tipo}_${id}`;
        let cmpaisTitular = templatePais(`paisCaMi${idTitular}`, "País", true);
        let cmDepartamentoTitular = templateDepartamento(
            `CaMi${idTitular}`,
            "Departamento"
        );
        let cmMunicipioTitular = templateMunicipio(
            `CaMi${idTitular}`,
            "Municipio"
        );
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
                                        <div class="row mb-3"><h4>I. TIPO DE ACTUACIÓN DEL CLIENTE ${id}</h4></div>
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
                                            ${cmpaisTitular}
                                            ${cmDepartamentoTitular}
                                            ${cmMunicipioTitular}
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
                                         <div id="camposMinimos${idTitular}"></div>
                                         <div id="representante${idTitular}"></div>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                `;
        $("#titulares").append(templateTitular);
        // agregar campos titular
        agregarCamposMinimos(
            $(`#camposMinimos${idTitular}`),
            `${idTitular}`,
            "cliente"
        );
        /*agregado validadciones para el nuevo titular*/
        let divTitularActual = $(`#titulares>div#${idTitular}`);

        let inputActuaNombrePropio = $(divTitularActual).find(
            "input.actuaNombrePropio"
        );
        inputActuaNombrePropio.focus();
        verificaActuaNombrePropio(inputActuaNombrePropio);
        let selectPaisActual = $(`select#paisCaMi${idTitular}`);
        habilitaDepartamentoMunicipio(selectPaisActual);
        cargarPais(selectPaisActual);

        cargarDepartamentos($(`select#deptoCaMi${idTitular}`));
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
        this.representante = new dicDatosPersonales();
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
    let titulares = $("#titulares>div").find(
        `button[data-card-widget=collapse]`
    );
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
                enviarDatos();
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add("was-validated");
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("enviando formulario");
                    //enviarDatos();
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
function obtenerDatosPersonales(divPadre, id) {
    let datosPersonales = new dicDatosPersonales();
    datosPersonales.primerApellido = $(divPadre)
        .find(`input:text[id=primerApellido${id}]`)
        .val();
    datosPersonales.segundoApellido = $(divPadre)
        .find(`input:text[id=segundoApellido${id}]`)
        .val();
    datosPersonales.apellidoCasada = $(divPadre)
        .find(`input:text[id=apellidoCasada${id}]`)
        .val();
    datosPersonales.primerNombre = $(divPadre)
        .find(`input:text[id=primerNombre${id}]`)
        .val();
    datosPersonales.segundoNombre = $(divPadre)
        .find(`input:text[id=segundoNombre${id}]`)
        .val();
    datosPersonales.otrosNombres = $(divPadre)
        .find(`input:text[id=otrosNombres${id}]`)
        .val();
    datosPersonales.fechaNacimiento = $(divPadre)
        .find(`input:text[id=fechaNacimiento${id}]`)
        .val();
    datosPersonales.nacimiento.pais = $(divPadre)
        //
        .find(`select[id=paisNacimiento${id}] option:selected`)
        .val();
    datosPersonales.nacimiento.departamento = $(divPadre)
        .find(`select[id=deptoNacimiento${id}] option:selected`)
        .val();
    datosPersonales.nacimiento.municipio = $(divPadre)
        .find(`select[id=muniNacimiento${id}] option:selected`)
        .val();
    datosPersonales.condicionMigratoria = $(divPadre)
        .find(`select[id=condicionMigratoria${id}] option:selected`)
        .val();
    datosPersonales.otraCondicionMigratoria = $(divPadre)
        .find(`input:text[id=otraCoMi${id}]`)
        .val();
    datosPersonales.sexo = $(divPadre)
        .find(`select[id=sexo${id}] option:selected`)
        .val();
    datosPersonales.estadoCivil = $(divPadre)
        .find(`select[id=estadoCivil${id}] option:selected`)
        .val();
    datosPersonales.nit = $(divPadre).find(`input:text[id=nit${id}]`).val();
    datosPersonales.tipoDocumentoIdentificacion = $(divPadre)
        .find(`select[id=tipoDoctoIdentificacion${id}] option:selected`)
        .val();
    datosPersonales.numeroDocumentoIdentificacion = $(divPadre)
        .find(`input:text[id=noDocIdentificacion${id}]`)
        .val();
    datosPersonales.emisionPasaporte = $(divPadre)
        .find(`select[id=emicionPasaporte${id}] option:selected`)
        .val();
    datosPersonales.profesionOficio = $(divPadre)
        .find(`input:text[id=profecionOficio${id}]`)
        .val();
    datosPersonales.email = $(divPadre).find(`input[id=email${id}]`).val();
    datosPersonales.direccionResidencia = $(divPadre)
        .find(`input:text[id=direccionRecidencia${id}]`)
        .val();
    datosPersonales.residencia.pais = $(divPadre)
        .find(`select[id=paisRecidencia${id}] option:selected`)
        .val();
    datosPersonales.residencia.departamento = $(divPadre)
        .find(`select[id=deptoRecidencia${id}] option:selected`)
        .val();
    datosPersonales.residencia.municipio = $(divPadre)
        .find(`select[id=muniRecidencia${id}] option:selected`)
        .val();
    let telefonos = $(`div#telefono${id}`).find("input.telefono");
    for (let i = 0; i < telefonos.length; i++) {
        datosPersonales.agregarTelefono($(telefonos[i]).val());
    }

    let nacionalidades = $(divPadre).find(`select.nacionalidad`);
    for (let a = 0; a < nacionalidades.length; a++) {
        datosPersonales.agregarNacionalidad($(nacionalidades[a]).val());
    }
    datosPersonales.cpe = $(divPadre)
        .find(`input:radio[name=cpe${id}]:checked`)
        .val();
    let esPep = (datosPersonales.pep = $(divPadre)
        .find(`input:radio[name=pep${id}]:checked`)
        .val());
    if (esPep === "S") {
        datosPersonales.datospep.entidad = $(divPadre)
            .find(`input[id=entidadpep${id}]`)
            .val();
        datosPersonales.datospep.puestoDesempenia = $(divPadre)
            .find(`input[id=puestoDesepeniapep${id}]`)
            .val();
        datosPersonales.datospep.paisEntidad = $(divPadre)
            .find(`select[id=paisEntidadpep${id}] option:selected`)
            .val();
        let esOtroRiqueza = (datosPersonales.datospep.origenRiqueza = $(
            divPadre
        )
            .find(`select[id=origenRiquezapep${id}] option:selected`)
            .val());
        if (esOtroRiqueza == 8) {
            datosPersonales.datospep.otroOrigenRiqueza = $(divPadre)
                .find(`input[id=otroOrigenRiquezapep${id}]`)
                .val();
        }
    } else {
        datosPersonales.datospep = null;
    }

    let esAsoPep = (datosPersonales.parienteAsociadoPep = $(divPadre)
        .find(`input:radio[name=asoPep${id}]:checked`)
        .val());

    if (esAsoPep == "S") {
        let asociados = $(`#datosasoPep${id}>div.info`).children();
        for (let a = 0; a < asociados.length; a++) {
            // obtenemos el id, del div que contiene los datos del asociado actual
            // div#asoPepCliente_1_0 para buscar cada input con
            // $(`div#asoPepCliente_1_0`).find(`select#parentescoasoPepCliente_1_0`).val();

            let idAsociado = $(asociados[a]).attr("id");
            let datosAsoPep = new dicParienteAsociadoPep();
            let divactual = `div#${idAsociado}`;
            datosAsoPep.parentesco = $(divactual)
                .find(`select#parentesco${idAsociado}`)
                .val();
            datosAsoPep.otroParentesco = $(divactual)
                .find(`input#otroParentesco${idAsociado}`)
                .val();
            datosAsoPep.motivoAsociacion = $(divactual)
                .find(`select#motivoAsociacion${idAsociado}`)
                .val();
            datosAsoPep.otroMotivoAsociacion = $(divactual)
                .find(`input#otroMotivoAsociacion${idAsociado}`)
                .val();
            datosAsoPep.sexo = $(divactual)
                .find(`select#sexo${idAsociado}`)
                .val();
            datosAsoPep.condicion = $(divactual)
                .find(`select#condicion${idAsociado}`)
                .val();
            datosAsoPep.primerApellido = $(divactual)
                .find(`input#primerApellido${idAsociado}`)
                .val();
            datosAsoPep.segundoApellido = $(divactual)
                .find(`input#segundoApellido${idAsociado}`)
                .val();
            datosAsoPep.apellidoCasada = $(divactual)
                .find(`input#apellidoCasada${idAsociado}`)
                .val();
            datosAsoPep.primerNombre = $(divactual)
                .find(`input#primerNombre${idAsociado}`)
                .val();
            datosAsoPep.segundoNombre = $(divactual)
                .find(`input#segundoNombre${idAsociado}`)
                .val();
            datosAsoPep.otrosNombres = $(divactual)
                .find(`input#otrosNombres${idAsociado}`)
                .val();
            datosAsoPep.entidad = $(divactual)
                .find(`input#entidad${idAsociado}`)
                .val();
            datosAsoPep.puestoDesempenia = $(divPadre)
                .find(`input#puestoDesempenia${idAsociado}`)
                .val();
            datosAsoPep.paisEntidad = $(divPadre)
                .find(`select#pais${idAsociado}`)
                .val();
            datosPersonales.agregarParienteAsociadoPep(datosAsoPep);
        }
    } else {
        datosPersonales.datosParienteAsociadoPep = null;
    }

    return datosPersonales;
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
            .find(`input:radio[name=tipoActuacion${id}]:checked`)
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
        titular.cliente = obtenerDatosPersonales(divTitularActual, id);
        if (titular.tipoActuacion === "R") {
            titular.calidadActua = $(divTitularActual)
                .find(`input:text[id=calidadActua${id}]`)
                .val();
            titular.representante = obtenerDatosPersonales(
                divTitularActual,
                `Representante${id}`
            );
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
    agregarTemplateNacionalidad($(".agregarNacionalidadCliente"));
    agregarTemplateTelefono($(".agregarTelefonoCliente"));
    verificarPersonaPep($(".pepCliente"));
    verificarAsoPep($(".asoPepCliente"));
    AgregarTitular();
    eliminarTemplateTitular($("#titulares>div"));
    validarFormulario();
});
