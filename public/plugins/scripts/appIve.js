// templates

function templateInvalidTooltip(mensaje) {
    return `<div class="invalid-tooltip">${mensaje}</div>`;
}
function templateFormGroup(temFormGroup, tamanio) {
    let tm = $(`<div class="col-sm">
                    <div class="form-group">
                    </div>
                </div>`);
    if (tamanio != undefined) {
        $(tm).addClass(tamanio);
        $(tm).removeClass("col-sm");
    }
    $(tm).find("div.form-group").append(temFormGroup);
    return tm;
}
function templateInputText(
    id,
    tipo,
    tamanio,
    textolabel,
    requerido,
    deshabilitado
) {
    let tmNom = $(`<label>${textolabel}</label>
                   <input name="${tipo}${id}" id="${tipo}${id}" type="text" class="form-control ${tipo}" placeholder="${textolabel} ..." maxlength="${tamanio}"/>`);
    tmNom = templateFormGroup(tmNom);
    if (requerido === true) {
        $(tmNom).find(`input#${tipo}${id}`).prop("required", true);
    }
    if (deshabilitado === true) {
        $(tmNom).find(`input#${tipo}${id}`).prop("disabled", true);
    }
    return tmNom;
}
function templateCamposNommbres(id) {
    const priApe = templateInputText(
        id,
        "primerApellido",
        15,
        "Primer Apellido",
        true
    );
    const segApe = templateInputText(
        id,
        "segundoApellido",
        15,
        "Segundo Apellido"
    );

    let apeCa = templateInputText(id, "apellidoCasada", 15, "Apellido Casada");
    let tmInToltp = templateInvalidTooltip(
        "No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido."
    );
    $(apeCa).find("div.form-group").append(tmInToltp);
    validarApellidoCasada($(apeCa).find(`input#apellidoCasada${id}`));

    const priNom = templateInputText(
        id,
        "primerNombre",
        15,
        "Primer Nombre",
        true
    );
    const segNom = templateInputText(id, "segundoNombre", 15, "Segundo Nombre");
    const otNom = templateInputText(id, "otrosNombres", 30, "Otros Nombres");
    let rowNombres = $(` <div class="row"></div>`);
    $(rowNombres).append(priApe);
    $(rowNombres).append(segApe);
    $(rowNombres).append(apeCa);
    $(rowNombres).append(priNom);
    $(rowNombres).append(segNom);
    $(rowNombres).append(otNom);
    return rowNombres;
}
function templateSexo(id) {
    let templatesexo = $(`<label for="sexo${id}">Sexo</label>
                          <select name="sexo${id}" id="sexo${id}" class="form-control custom-select sexo select2" style="width: 100%" required>
                              <option value="" disabled selected>Selecciona</option>
                              <option value="M">Masculino</option>
                              <option value="F">Femenino</option>
                          </select>`);
    templatesexo = templateFormGroup(templatesexo);
    $(templatesexo).find("select").select2();
    return templatesexo;
}
function templateNit(id) {
    let temNit = $(`<label>Nit</label>
                    <input name="nit${id}" id="nit${id}" type="text" class="form-control nit" placeholder="Nit ..." maxlength="20" />`);
    temNit = templateFormGroup(temNit);
    validarNit($(temNit).find(`input#nit${id}`));
    return temNit;
}
function templateDoctoIdentificacion(id) {
    let temDoctoIdent = $(`<label for="tipoDoctoIdentificacion${id}">Docto. identificación</label>
                           <select name="tipoDoctoIdentificacion${id}" id="tipoDoctoIdentificacion${id}" class="form-control custom-select tipoDoctoIdentificacion validaPaisPasaporte select2" style="width: 100%" required>
                               <option value="" disabled selected>Selecciona</option>
                               <option value="D">DPI</option>
                               <option value="P">Pasaporte</option>
                           </select>`);
    temDoctoIdent = templateFormGroup(temDoctoIdent);
    $(temDoctoIdent).find(`select#tipoDoctoIdentificacion${id}`).select2();
    habilitaPaisPasaporte(
        $(temDoctoIdent).find(`select#tipoDoctoIdentificacion${id}`)
    );
    return temDoctoIdent;
}
function templateNumDocumento(id) {
    let temNumDoc = $(`<label>Número identificación</label>
                       <input name="noDocIdentificacion${id}" id="noDocIdentificacion${id}" type="text" class="form-control noDocIdentificacion" placeholder="Número identificación..." maxlength="20" required disabled/>`);
    temNumDoc = templateFormGroup(temNumDoc);
    return templateFormGroup(temNumDoc);
}
function templateProfecionOficio(id) {
    const temProfOfici = `<label>Profesión u oficio</label>
                          <input name="profecionOficio${id}" id="profecionOficio${id}" type="text" class="form-control profecionOficio" placeholder="Profesión u oficio ..." maxlength="100" required />`;
    return templateFormGroup(temProfOfici);
}
function templateEmail(id) {
    let temcorreo = `<label>Correo electrónico</label>
                     <input name="email${id}" id="email${id}" type="email" class="form-control email" placeholder="Correo electrónico ..." maxlength="100" />`;
    return templateFormGroup(temcorreo);
}
function templateEstadoCivil(id) {
    let temEs = $(`<label>Estado civil</label>
                 <select name="estadoCivil${id}" id="estadoCivil${id}" class="form-control custom-select estadoCivil select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="S">Soltero</option>
                    <option value="C">Casado</option>
                 </select>`);
    temEs = templateFormGroup(temEs);
    $(temEs).find("select").select2();
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
    let templatepais = $(`<label for="${id}">${textolabel}</label>
                        <select name="${id}" id="${id}" class="form-control custom-select pais ${claseDeptoMuni} setPais ${clasesAdicionales} select2" style="width: 100%" required ${selectDesabilitado}>
                        <option value="" disabled selected>Selecciona</option>
                        </select>`);

    templatepais = templateFormGroup(templatepais);
    const selectPais = $(templatepais).find(`select#${id}`);
    cargarPais(selectPais);
    $(selectPais).select2();
    if (desabilitadeptomuni == true) {
        habilitaDepartamentoMunicipio(selectPais);
    }

    return templatepais;
}
function templateDepartamento(id, textolabel) {
    let cmDpto = $(` <label>${textolabel}</label>
                            <select name="depto${id}" id="depto${id}" class="form-control custom-select depto getMunicipio setDepartamento select2" style="width: 100%" required disabled>
                                <option value="" disabled selected>Selecciona</option>
                            </select>`);
    cmDpto = templateFormGroup(cmDpto);
    const dpto = $(cmDpto).find(`select#depto${id}`);
    cargarDepartamentos(dpto);
    $(cmDpto).find(`select#depto${id}`).select2();
    return cmDpto;
}
function templateMunicipio(id, textolabel) {
    let cmMuni = $(`<label>${textolabel}</label>
                        <select name="muni${id}" id="muni${id}" class="form-control custom-select muni setMunicipio select2" style="width: 100%" required disabled>
                            <option value="" disabled selected>Selecciona</option>
                        </select>`);
    cmMuni = templateFormGroup(cmMuni);
    $(cmMuni).find(`select#muni${id}`).select2();
    return cmMuni;
}
function templateCondicionMigratoria(id) {
    let cmCond = $(`<label>Condición migratoria</label>
                    <select name="condicionMigratoria${id}" id="condicionMigratoria${id}" class="form-control custom-select condicionMigratoria select2" style="width: 100%" disabled required>
                    <option value="" disabled selected>Selecciona</option>
                    </select>`);
    cmCond = templateFormGroup(cmCond);
    return cmCond;
}
function templateOtraCondicionMigratoria(id) {
    let cmOtraCM = templateFormGroup(`
                     <label>Especifique</label>
                     <input name="otraCoMi${id}" id="otraCoMi${id}" type="text" class="form-control otraCoMi" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />`);
    return cmOtraCM;
}
function templateFecha(id, nombre, textolabel, tamanio, requerido) {
    let temCampoFecha = $(`<label>Fecha ${textolabel}</label>
                        <div class="input-group date" id="fecha${nombre}_${id}" data-target-input="nearest">
                            <input name="fecha${nombre}${id}" id="fecha${nombre}${id}" type="text" class="form-control ${nombre} datetimepicker-input" data-target="#fecha${nombre}_${id}" required />
                            <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                            <div class="input-group-append" data-target="#fecha${nombre}_${id}" data-toggle="datetimepicker">
                                <div class="input-group-text">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                        </div>`);
    let cm = templateFormGroup(temCampoFecha, tamanio);
    if (requerido === false) {
        let input = $(cm)
            .find(`input#fecha${nombre}${id}`)
            .prop("required", false);
    }
    setFormatoFecha($(cm).find("div.date"));
    return cm;
}
function templateNacionalidad(id) {
    let temNacionalidad = $(`
        <div class="col-sm" id="nacionalidad${id}" cantidad="1">
            <div class="form-group">
                <div class="row">
                    <div class="col-sm">
                        <label>Nacionalidad</label>
                        <select name="nacionalidad${id}" id="nacionalidad${id}_1" class="form-control custom-select nacionalidad select2" style="width: 100%" required>
                            <option value="" disabled selected>Selecciona</option>
                        </select>
                    </div>
                    <div class="col-sm my-auto pt-2"></div>
                </div>
            </div>
            <div class="form-group">
                <button type="button" id="agregarNacionalidad${id}" class="btn btn-primary agregarNacionalidad">Agregar Nacionalidad</button>
            </div>
        </div>`);
    const btnAgregar = $(temNacionalidad).find(
        `button#agregarNacionalidad${id}`
    );
    let selectNacionalidadpais = $(temNacionalidad).find(
        `select#nacionalidad${id}_1`
    );
    $(selectNacionalidadpais).select2();
    cargarPais(selectNacionalidadpais);
    agregarTemplateNacionalidad(btnAgregar);
    return temNacionalidad;
}
function templateTelefono(id, agregarBtnBorrar) {
    let btnBorrar = "";
    if (agregarBtnBorrar) {
        btnBorrar = `<button type="button" class="btn btn-danger">Borrar</button>`;
    }
    let tmTelefono = $(`
        <div class="form-group">
            <div class="row">
                <div class="col-sm">
                    <input name="${id}" id="${id}" type="text" class="form-control telefono" placeholder="telefono ..." maxlength="30" required />
                </div>
                <div class="col-sm">${btnBorrar}</div>
            </div>
        </div>`);
    return tmTelefono;
}
function templateContenedorTelefonos(id) {
    let cmTel = templateTelefono(`telefono${id}_1`, false);
    let temTelefono = $(`
    <div class="col-sm" id="telefono${id}" cantidad="1">
        <label>Teléfonos</label>
        <div class="form-group">
            <button type="button" id="agregarTelefono${id}" class="btn btn-primary agregarTelefono">Agregar teléfono</button>
        </div>
    </div>`);
    $(temTelefono).children().last().before(cmTel);
    let btnTelefono = $(temTelefono).find(`button#agregarTelefono${id}`);
    agregarTemplateTelefono(btnTelefono);
    return temTelefono;
}
// div row
function templateCamposNacimiento(id) {
    //fechaNacimiento
    let cmFechaNacimiento = templateFecha(id, "Nacimiento", "nacimiento");
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
    let cmOtraCondicionM = templateOtraCondicionMigratoria(id);
    let temCampoNac = $(`<div class="row"></div>`);
    $(temCampoNac).append(cmFechaNacimiento);
    $(temCampoNac).append(cmPaisNacimiento);
    $(temCampoNac).append(cmDepartamentoNacimiento);
    $(temCampoNac).append(cmMunicipio);
    $(temCampoNac).append(cmCondicionMigratoria);
    $(temCampoNac).append(cmOtraCondicionM);
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
    let tempCamResidencia = $(`<div class="row"></div>`);
    $(tempCamResidencia).append(comPais);
    $(tempCamResidencia).append(comDepartamento);
    $(tempCamResidencia).append(comMunicipio);
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
    let temCamDoc = $(`<div class="row"></div>`);
    $(temCamDoc).append(comSexo);
    $(temCamDoc).append(comEstadoCivil);
    $(temCamDoc).append(comNit);
    $(temCamDoc).append(comDocIdentificacion);
    $(temCamDoc).append(comNumDoctoIdentifica);
    $(temCamDoc).append(paisPasaporte);
    return temCamDoc;
}
function templateCamposProfecion(id) {
    let comProfOficio = templateProfecionOficio(id);
    let comEmail = templateEmail(id);
    let temCamposProf = $(`<div class="row"></div>`);
    $(temCamposProf).append(comProfOficio);
    $(temCamposProf).append(comEmail);
    return temCamposProf;
}
function templateDireccion(id, textolabel, tipo) {
    let temDirec = $(`
        <div class="row">
            <div class="col-sm">
                <label>${textolabel}</label>
                <input name="direccion${tipo}${id}" id="direccion${tipo}${id}" type="text" class="form-control direccion" placeholder="Dirección..." maxlength="400" required />
            </div>
        </div>`);
    return temDirec;
}
function templateCamposNacionalidadTelefono(id) {
    let cmNacionalidad = templateNacionalidad(id);
    let cmTelefono = templateContenedorTelefonos(id);
    let temCNT = $(`<div class="row"></div>`);
    $(temCNT).append(cmNacionalidad);
    $(temCNT).append(cmTelefono);
    return temCNT;
}
function templateCpe(id) {
    let temCpe = $(`
        <div class="row">
            <div class="col-sm-6">
                <div class="form-check">
                    <div><label>¿El cliente es Contratista y Proveedor del Estado (CPE)?</label></div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="cpeSi${id}" class="cpe form-check-input" name="cpe${id}" value="S" required />
                        <label for="cpeSi${id}">Sí</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="cpeNo${id}" class="cpe form-check-input" name="cpe${id}" value="N" required />
                        <label for="cpeNo${id}">No</label>
                        <div class="invalid-tooltip">Indica si el cliente es CPE.</div>
                    </div>
                </div>
            </div>
        </div>`);
    return temCpe;
}
function templateAsoPep(id) {
    let temAsoPep = $(`
        <div class="row">
            <div class="col-sm">
                <div class="form-check">
                    <div>
                        <label>¿El cliente tiene parentesco o es asociado cercano a una Persona Expuesta Políticamente (PEP)?</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="primaryAsoPepSi${id}" class="asoPep form-check-input" name="asoPep${id}" value="S" required />
                        <label for="primaryAsoPepSi${id}">Sí</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="primaryAsoPepNo${id}" class="asoPep form-check-input" name="asoPep${id}" value="N" required />
                        <label for="primaryAsoPepNo${id}">No</label>
                        <div class="invalid-tooltip">Indica si el cliente tine un tiene parentesco o es asociadoa una Persona PEP.</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="datosasoPep${id}">
             <div class="info" cantidad="0">
            </div>
            <div class="btnadd">
            </div>
        </div>
    `);
    verificarAsoPep($(temAsoPep).find(`input.asoPep`));
    return temAsoPep;
}
function templatePersonaPep(id) {
    let temPersonaPep = $(`
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-check">
                        <div><label>¿El cliente es una Persona Expuesta Políticamente (PEP)?</label></div>
                        <div class="icheck-primary d-inline">
                            <input type="radio" id="pepSi${id}" class="pep form-check-input" name="pep${id}" value="S" required />
                            <label for="pepSi${id}">Sí</label>
                        </div>
                        <div class="icheck-primary d-inline">
                            <input type="radio" id="pepNo${id}" class="pep form-check-input" name="pep${id}" value="N" required />
                            <label for="pepNo${id}">No</label>
                            <div class="invalid-tooltip">Indica si el cliente es PEP.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datospep${id}"></div>`);
    verificarPersonaPep($(temPersonaPep).find(`input.pep`));
    return temPersonaPep;
}
function templateMontoIngresos(id) {
    let tmMontoIngresos = $(` <div class="row"></div>`);
    let labelMontoIngresos = $(
        `<label for="montoIngresos${id}" class = "d-inline">Monto mensual aproximado de los ingresos considerando todas las actividades económicas a las que se dedica (monto en quetzales)</label>`
    );
    labelMontoIngresos = templateFormGroup(labelMontoIngresos, "col-sm-9");
    let inputMontoIngresos = $(
        `<input type="number" name = "montoIngresos" id="montoIngresos${id}" class="form-control d-inline" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>`
    );
    inputMontoIngresos = templateFormGroup(inputMontoIngresos, "col-sm-3");
    $(tmMontoIngresos).append(labelMontoIngresos);
    $(tmMontoIngresos).append(inputMontoIngresos);
    return tmMontoIngresos;
}
function templatePropositoRc(id) {
    let tempPropositoRc = $(`<div class="row"></div>`);
    const tmPrc = `<label for="propositoRC${id}">Propósito de la relación de negocios</label>
                   <input name="propositoRC" id="propositoRC${id}" type="text" class="form-control" placeholder="Propósito de la relación de negocios..." maxlength="400" required />`;
    $(tempPropositoRc).append(templateFormGroup(tmPrc));
    return tempPropositoRc;
}
function templateDatosIngresos(id) {
    let btn = $(` <div class="row">
                        <div class="form-group">
                            <button type="button" id="agregarFuenteIngresos${id}" class="btn btn-primary agregarFuenteIngresos">Agregar fuente de ingresos</button>
                        </div>
                    </div>`);
    const btnfing = $(btn).find(`button#agregarFuenteIngresos${id}`);
    agregarTemplateFuenteIngresos(btnfing);
    let tmIng = $(`
                    <div id="datosfuenteingresos${id}">
                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label for="">Fuente de ingresos</label>
                                </div>
                            </div>
                        </div>
                        <div id="fuenteingresos${id}" cantidad = "0" idinput= ""></div>
                    </div>`);
    $(tmIng).append(btn);

    const tmCFi = templateCamposFuenteIngreso(`fuenteingresos${id}`, 0);
    $(tmIng).find(`div#fuenteingresos${id}`).append(tmCFi);
    return tmIng;
}
function templateInformacionEconomicaInicial(id) {
    const coMonto = templateMontoIngresos(id);
    const cmRc = templatePropositoRc(id);
    let cmDatosFuenteingreso = templateDatosIngresos(id);
    let tmInfoEcoInicial = $(`<div class="card card-info mt-3">
                                <div class="card-header">
                                    <h3 class="card-title">Información económica del cliente</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                </div>
                            </div>`);
    $(tmInfoEcoInicial).find("div.card-body").append(coMonto);
    $(tmInfoEcoInicial).find("div.card-body").append(cmRc);
    $(tmInfoEcoInicial).find("div.card-body").append(cmDatosFuenteingreso);
    return tmInfoEcoInicial;
}
function templateDatosPersonales(id, tipo) {
    let tcamposNombres = templateCamposNommbres(id);
    let tcamposNacimiento = templateCamposNacimiento(id);
    let tCamposDoc = templateCamposDocumentos(id);
    let tCamposProf = templateCamposProfecion(id);
    let tCampoDireccion = templateDireccion(
        id,
        "Dirección de residencia completa (calle o avenida, número de casa, colonia, sector, lote, manzana, otros)",
        "Recidencia"
    );
    let tCamposResidencia = templateCamposResidencia(id);
    let tCamposNumTel = templateCamposNacionalidadTelefono(id);
    let tCpe = templateCpe(id);
    let tPep = templatePersonaPep(id);
    let tAsoPep = templateAsoPep(id);
    let tcamposMinimos = $(`
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
        </div>
     </div>`);
    let divCardBody = $(tcamposMinimos).find("div.card-body");
    $(divCardBody).append(tcamposNombres);
    $(divCardBody).append(tcamposNacimiento);
    $(divCardBody).append(tCamposDoc);
    $(divCardBody).append(tCamposProf);
    $(divCardBody).append(tCampoDireccion);
    $(divCardBody).append(tCamposResidencia);
    $(divCardBody).append(tCamposNumTel);
    $(divCardBody).append(tCpe);
    $(divCardBody).append(tPep);
    $(divCardBody).append(tAsoPep);
    return tcamposMinimos;
}
function borrarTemplateFuenteIngresos(temFeIg) {
    $(temFeIg)
        .find("button")
        .click(function () {
            console.log("eliminando fuente de ingresos");
            console.log($(this).parent().parent().parent().parent().remove());
        });
}
function templateCamposFuenteIngreso(id, posicion) {
    let temFeIg = $(`
    <div class="row">
        <div class="col-sm-2">
            <div class="form-group">
                <select name="select" id="select${id}_${posicion}" class="form-control custom-select select2 fuenteIngresos" style="width: 100%" required>
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
                        <label for="input${id}_${posicion}" class="ml-4" id="label${id}_${posicion}"></label>
                    </div>
                    <div class="col-sm ml-2">
                        <input name="input" id="input${id}_${posicion}" type="text" class="form-control" required disabled />
                    </div>
                    <div class="col-sm-1 borrarFuenteIngreso" >
                        <button type="button" class="btn btn-danger">Borrar</button>
                    </div>
            </div>
        </div>
    </div>`);
    $(temFeIg).find(`select#select${id}_${posicion}`).select2();
    const selectFuenteIngresos = $(temFeIg).find(
        `select#select${id}_${posicion}`
    );
    validarTipoFuenteIngreso(selectFuenteIngresos);
    if (posicion === 0) {
        $(temFeIg).find("button").remove();
    } else {
        let divborrar = $(temFeIg).find(`div.borrarFuenteIngreso`);
        borrarTemplateFuenteIngresos(divborrar);
    }
    return temFeIg;
}
function templateFilaUnoProductoServicio(id) {
    const cmFechaProducto = templateFecha(`_${id}`, "ProductoServicio", "");
    const pais = templatePais(
        `paisProductoServicio_${id}`,
        "País en donde se contrata el producto o servicio",
        true,
        "",
        false
    );
    const departamento = templateDepartamento(
        `ProductoServicio_${id}`,
        "Departamento"
    );
    const municipio = templateMunicipio(`ProductoServicio_${id}`, "Municipio");
    let tm = $(`<div class="row"></div>`);
    $(tm).append(cmFechaProducto);
    $(tm).append(pais);
    $(tm).append(departamento);
    $(tm).append(municipio);
    return tm;
}
function templateFilaDosProductoServicio(id) {
    const cmIdentificador = templateInputText(
        id,
        "identificadorProductoServicio_",
        50,
        "Identificador producto y/o servicio",
        false
    );
    const cmtipoPS = templateInputText(
        id,
        "tipoProductoServicio_",
        100,
        "Tipo producto y/o servicio",
        true
    );
    const cmNombrePs = templateInputText(
        id,
        "nombreProductoServicio_",
        300,
        "Nombre producto y/o servicio",
        false
    );
    let tm = $(`<div class="row"></div>`);
    $(tm).append(cmIdentificador);
    $(tm).append(cmtipoPS);
    $(tm).append(cmNombrePs);
    return tm;
}
function templateFilaTresProductoServicio(id) {
    const descripcion = templateInputText(
        id,
        "descripcionProductoServicio_",
        600,
        "Descripción producto y/o servicio",
        true
    );
    let tm = $(`<div class="row"></div>`);
    tm = $(tm).append(descripcion);
    return tm;
}
function templateFilaCuatroProductoServicio(id) {
    const nombreContrata = templateInputText(
        id,
        "nombreContrataProductoServicio_",
        400,
        "A nombre de quién se contrata el producto y/o servicio",
        true
    );
    let tm = $(`<div class="row"></div>`);
    tm = $(tm).append(nombreContrata);
    return tm;
}
function templateMoneda(id) {
    let moneda = $(`<label for="moneda${id}">Moneda</label>
                    <select name="moneda" class="form-control custom-select moneda select2" style="width: 100%" required></select>`);
    moneda = templateFormGroup(moneda, "col-sm-3");
    let selectMoneda = $(moneda).find("select.moneda");
    $(selectMoneda).select2();
    cargarMoneda(selectMoneda);
    return moneda;
}
function templateValor(id) {
    const valor = $(`<label for="valor${id}">Valor producto y/o servicio</label>
                     <input type="number" name = "valor" id="valor${id}" class="form-control valor" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>`);
    return templateFormGroup(valor, "col-sm-3");
}
function templateFilaCincoProductoServicio(id) {
    const moneda = templateMoneda(`ProductoServicio_${id}`);
    const valor = templateValor(`ProductoServicio_${id}`);
    let tm = $(`<div class="row"></div>`);
    tm = $(tm).append(moneda);
    tm = $(tm).append(valor);
    return tm;
}
function btnAgregarBeneficiario(btn) {
    $(btn).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("agregando beneficiario");
        const id = $(this).parent().parent().parent().parent().attr("id");
        agregarCamposMinimos("Beneficiario", `div#datosBeneficiario${id}`);
    });
}
function templateBeneficiario(id) {
    let tmB = $(
        `<div class="row"><H2>Beneficiarios </h2><div id="datosBeneficiarioProductoServicio_${id}"  class="col-sm-12" cantidad="0" ></div></div>`
    );
    let divBtn = $(`<div class="col-sm form-group">
                           <button type="button" id="agregarBeneficiario${id}" class="btn btn-primary agregarBeneficiario">Agregar Beneficiario</button>
                       </div>`);
    const btn = $(divBtn).find(`button#agregarBeneficiario${id}`);
    btnAgregarBeneficiario(btn);
    $(tmB).append(divBtn);
    return tmB;
}
function btnAgregarOtroFirmantes(btn) {
    $(btn).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const id = $(this).parent().parent().parent().parent().attr("id");
        agregarCamposMinimos("OtrosFirmantes", `div#datosOtrosFirmantes${id}`);
    });
}
function templateOtrosFirmantes(id) {
    let tmB = $(
        `<div class="row"><H2>Otros Firmantes </h2><div id="datosOtrosFirmantesProductoServicio_${id}"  class="col-sm-12" cantidad="0" ></div></div>`
    );
    let divBtn = $(`<div class="col-sm form-group">
                           <button type="button" id="agregarOtrosFirmantes${id}" class="btn btn-primary agregarOtrosFirmantes">Agregar Otros Firmantes</button>
                       </div>`);
    const btn = $(divBtn).find(`button#agregarOtrosFirmantes${id}`);
    btnAgregarOtroFirmantes(btn);
    $(tmB).append(divBtn);
    return tmB;
}

function templateProductoServicio(id) {
    const rowUno = templateFilaUnoProductoServicio(id);
    const rowDos = templateFilaDosProductoServicio(id);
    const rowTres = templateFilaTresProductoServicio(id);
    const rowCuatro = templateFilaCuatroProductoServicio(id);
    const rowCinco = templateFilaCincoProductoServicio(id);
    const rowSeis = templateBeneficiario(id);
    let rowSiete = templateOtrosFirmantes(id);
    let tm = $(`
                <div class="card card-info mt-3" id="ProductoServicio_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Producto o servicio ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
    $(tm).find("div.card-body").append(rowUno);
    $(tm).find("div.card-body").append(rowDos);
    $(tm).find("div.card-body").append(rowTres);
    $(tm).find("div.card-body").append(rowCuatro);
    $(tm).find("div.card-body").append(rowCinco);
    $(tm).find("div.card-body").append(rowSeis);
    $(tm).find("div.card-body").append(rowSiete);
    eliminarCard($(tm));
    return tm;
}
// agrega template campos minimos con los eventos, y verificaciones
function agregarDatosPersonales(divDatos, idCamposMinimos, tipo) {
    console.log(`agregado informacion del  ${idCamposMinimos}`);
    let templateRepresentante = templateDatosPersonales(idCamposMinimos, tipo);
    $(divDatos).append(templateRepresentante);
}

// funciones para configuracion del formulario
function setFormatoFecha(divInputFecha) {
    for (let i = 0; i < divInputFecha.length; i++) {
        $(divInputFecha[i]).datetimepicker({ format: "DD/MM/YYYY" });
        let inputFecha = $(divInputFecha[i]).find("input");
        $(inputFecha).on("focusout", function (event) {
            event.preventDefault();
            event.stopPropagation();
            let hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            let fechaString = $(this).val();

            let dateMomentObject = moment(fechaString, "DD/MM/YYYY");
            let fechaActual = dateMomentObject.toDate();
            if (fechaActual <= hoy) {
                $(this).removeClass("is-invalid");
            } else {
                $(this).val(null);
                $(this).addClass("is-invalid");
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
                agregarDatosPersonales(
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
function cargarMoneda(selectMoneda) {
    for (let i = 0; i < selectMoneda.length; i++) {
        $(selectMoneda[i]).empty();
        $(selectMoneda[i]).append(
            '<option value="" disabled selected>Selecciona</option>'
        );
        getMoneda(function (monedas) {
            monedas.forEach(function (moneda) {
                $(selectMoneda[i]).append(
                    `<option value=${moneda.idMoneda}>${moneda.codigoMoneda}-${moneda.nombreMoneda}</option>`
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
                $(this).focus();
                $(this).select();
                $(this).addClass("is-invalid");
            } else {
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
function getMoneda(callback) {
    $.get(`/moneda/listamonedas`, function (res, sta) {
        callback(res);
    });
}

function getPaises(callback) {
    $.get(`/pais/obtenerpaises`, function (res, sta) {
        callback(res);
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

function habilitaOtroCampoDesdeSelect(inputSelect, opcionSelect) {
    // la funcion recibe uno o varios objetos select select.nombreclase  o select#id
    // opcionSelect, es la opcion que habilita el campo otroCondicionmigratoria, otroParentesco, etc. recibe el value otro del select
    // input habilitar puede recibir input.nommbreClase o input#id
    for (let a = 0; a < inputSelect.length; a++) {
        $(inputSelect[a]).change(function (event) {
            // la variable inputActual se utiliza, cuando se envia una input.nombreClase
            const inputOtro = $(this).attr("targetOtro");
            let inputActual = $(this)
                .parent()
                .parent()
                .parent()
                .find(`input.${inputOtro}`);
            if (inputActual.length != 0) {
                if (event.target.value == opcionSelect) {
                    $(inputActual).prop("disabled", false);
                } else {
                    $(inputActual).prop("disabled", true);
                    $(inputActual).val(null);
                }
            } else {
                console.log("no se encotro el input");
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

function templateEntidad(id) {
    const tme = $(`<label for="entidad${id}">Entidad</label>
                   <input name="entidad${id}" id="entidad${id}" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required>`);
    return templateFormGroup(tme);
}
function templatePuestoDesempenia(id) {
    const tpd = $(`<label for="puestoDesepenia${id}">Puesto que desempeña</label>
                   <input name="puestoDesepenia${id}" id="puestoDesepenia${id}" type="text" class="form-control" placeholder="Puesto que desempeña ..." maxlength="200" required>`);
    return templateFormGroup(tpd);
}
function templateOrigenRiqueza(id) {
    let tor = $(`
                    <label for= "origenRiqueza${id}">Origen o procedencia de su riqueza</label>
                    <select name="origenRiqueza${id}" id="origenRiqueza${id}" class="form-control custom-select select2 origenRiqueza" style="width: 100%;" required>
                        <option value="" disabled selected>Selecciona</option>
                        <option value="1">Bienes muebles e inmuebles por herencia</option>
                        <option value="2">Bienes muebles e inmuebles</option>
                        <option value="3">Negocio propio</option>
                        <option value="4">Servicios profesionales</option>
                        <option value="5">Préstamos bancarios</option>
                        <option value="6">Trabajos anteriores</option>
                        <option value="7">Trabajo actual</option>
                        <option value="8">otro</option>
                    </select>`);

    tor = templateFormGroup(tor);
    let selectTor = $(tor).find(`select#origenRiqueza${id}`);
    $(selectTor).select2();
    habilitaOtroOrigenriqueza(selectTor);
    return tor;
}
function templateOtroOrigenRiqueza(id) {
    const toor = $(`
                    <label id="otroOrigenRiqueza${id}">Especifique</label>
                    <input name="otroOrigenRiqueza${id}" id="otroOrigenRiqueza${id}" type="text" class="form-control otroOrigenRiqueza" placeholder="Origen o procedencia de su riqueza ..." maxlength="100" required disabled>`);
    return templateFormGroup(toor);
}
function verificarPersonaPep(radioClientePep) {
    for (let i = 0; i < radioClientePep.length; i++) {
        $(radioClientePep[i]).change(function () {
            /**
             * utilizo el atributo name, del input radio pepCliente para establecer el id unicao para cada campo id
             * cuando el titular el id sera entidadpepCliente_1 entidad${id}
             */
            let id = $(this).attr("name");
            const entidad = templateEntidad(id);
            const puestoDesempenia = templatePuestoDesempenia(id);
            const paisEntidad = templatePais(
                `paisEntidad${id}`,
                "País entidad",
                false,
                "otroOrigenRiqueza",
                false
            );
            const origenRiqueza = templateOrigenRiqueza(id);
            const otroOrigenRiqueza = templateOtroOrigenRiqueza(id);
            if ($(this).val() != "N") {
                var rowUno = $(`<div class="row"></div>`);
                $(rowUno).append(entidad);
                $(rowUno).append(puestoDesempenia);
                $(`.datos${id}`).append(rowUno);

                var rowDos = $(`<div class="row"></div>`);
                $(rowDos).append(paisEntidad);
                $(rowDos).append(origenRiqueza);
                $(rowDos).append(otroOrigenRiqueza);
                $(`.datos${id}`).append(rowDos);
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
function eliminarTemplateNacionalidad(divButton) {
    $(divButton)
        .find("button")
        .click(function () {
            $(this).parent().parent().parent().remove();
        });
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
                                    <select name="${idPadre}" id="${idSelect}" class="form-control custom-select nacionalidad select2" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                    </select>
                                </div>
                                <div class="col-sm my-auto">
                                    <button type="button" class="btn btn-danger">Borrar</button>
                                </div>
                            </div>
                        </div>`
            );
            $(divPadre).attr("cantidad", id);
            eliminarTemplateNacionalidad(`#${idPadre}>div.form-group>div.row`);

            let selectPaisActual = $(`#${idPadre}>div.form-group>div.row`).find(
                `select#${idSelect}`
            );
            $(selectPaisActual).select2();
            cargarPais(selectPaisActual);
        });
    }
}
function eliminarTemplateTelefono(divBorrar) {
    $(divBorrar)
        .find("button")
        .click(function () {
            $(this).parent().parent().parent().remove();
        });
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
            $(cmTelefono).find(`input`).focus();
            $(divPadre).attr("cantidad", idSelect);
            eliminarTemplateTelefono(
                $(`#${idDivPadre}>div.form-group>div.row`)
            );
        });
    }
}

function templateParentesco(id) {
    let tmP = ` <label for="parentesco${id}">Parentesco</label>
                <select name="parentesco${id}" id="parentesco${id}" class="form-control custom-select parentesco select2" targetOtro="otroParentesco" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="1">Padre</option>
                    <option value="2">Madre</option>
                    <option value="3">Hijo</option>
                    <option value="4">Hermano</option>
                    <option value="5">Cónyuge</option>
                    <option value="6">Otro</option>
                </select>`;
    tmP = templateFormGroup(tmP);
    const selectParentesco = $(tmP).find(`select#parentesco${id}`);
    $(selectParentesco).select2();
    habilitaOtroCampoDesdeSelect(selectParentesco, 6);
    return tmP;
}
function templateMotivoAsociacion(id) {
    let tM = `  <label for="motivoAsociacion${id}">Motivo asociación</label>
                <select name="motivoAsociacion${id}" id="motivoAsociacion${id}" class="form-control custom-select motivoAsociacion select2" targetOtro="otroMotivoAsociacion" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="1">Profesionales</option>
                    <option value="2">Políticos</option>
                    <option value="3">Comerciales</option>
                    <option value="4">Negocios</option>
                    <option value="5">Otros</option>
                </select>`;
    tM = templateFormGroup(tM);
    const selectMotivo = $(tM).find(`select#motivoAsociacion${id}`);
    $(selectMotivo).select2();
    habilitaOtroCampoDesdeSelect(selectMotivo, 5);
    return tM;
}
function templateCondicion(id) {
    let tC = `<label for="condicion${id}">Condición</label>
                <select name="condicion${id}" id="condicion${id}" class="form-control custom-select select2" style="width: 100%" required>
                    <option value="">Selecciona</option>
                    <option value="N">Nacional</option>
                    <option value="E">Extranjero</option>
                </select>`;
    tC = templateFormGroup(tC);
    $(tC).find("select").select2();
    return tC;
}

function templateRowUnoAsoPep(id) {
    let rowUno = $(`<div class="row"><div>`);
    const cmParentesco = templateParentesco(id);
    const cmOtroParentesco = templateInputText(
        id,
        "otroParentesco",
        100,
        "Especifique",
        true,
        true
    );
    const cmMotivoAsociacion = templateMotivoAsociacion(id);
    const cmOtroMotivoAsociacion = templateInputText(
        id,
        "otroMotivoAsociacion",
        100,
        "Especifique",
        true,
        true
    );
    const cmSexo = templateSexo(id);
    const cmCondicion = templateCondicion(id);
    $(rowUno).append(cmParentesco);
    $(rowUno).append(cmOtroParentesco);
    $(rowUno).append(cmMotivoAsociacion);
    $(rowUno).append(cmOtroMotivoAsociacion);
    $(rowUno).append(cmSexo);
    $(rowUno).append(cmCondicion);
    return rowUno;
}

function templateRowTresAsoPep(id) {
    const cmEntidad = templateEntidad(id);
    const cmPuestoDesepenia = templateInputText(
        id,
        "puestoDesempenia",
        200,
        "Puesto que desempeña",
        true,
        false
    );
    const cmPaisEntidad = templatePais(
        `pais${id}`,
        "País de la institución o entidad",
        false
    );
    let rowTres = $(`<div class="row"><div>`);
    $(rowTres).append(cmEntidad);
    $(rowTres).append(cmPuestoDesepenia);
    $(rowTres).append(cmPaisEntidad);
    return rowTres;
}
function agregaAsoPep(idAsoPep) {
    let indiceAsociadosAgregados = $(`#datos${idAsoPep}>div.info`).attr(
        "cantidad"
    );
    indiceAsociadosAgregados++;
    // para el id unico del pariente asociado pep se utiliza el paramento idAsopep, obtenido del atributo name del radio button
    // eje: asoPepCliente_1 concatenado con el numero de asocado obtenido en la variable indiceAsociadosAgregados
    // al concatenar queda asoPepCliente_1_1 en el siguiente asoPepCliente_1_2 susesivamente se asignara a la variable id
    let id = `${idAsoPep}_${indiceAsociadosAgregados}`;
    // recuerda implementar las validaciones en los campos, ya  que los templates solo debuelven la estructura de html
    let rowCamposNombresAsoPep = templateCamposNommbres(id);

    let templateAsocPep = $(` <div class="card card-primary" id=${id}>
                                <div class="card-header">
                                    <h3 class="card-title">Familiar Asociado ${indiceAsociadosAgregados}</h3>
                                    <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="remove">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                                </div>
                                <div class="card-body"></div>
                                </div>`);
    const uno = templateRowUnoAsoPep(id);
    const tres = templateRowTresAsoPep(id);
    $(templateAsocPep).find(`div.card-body`).append(uno);
    $(templateAsocPep).find(`div.card-body`).append(rowCamposNombresAsoPep);
    $(templateAsocPep).find(`div.card-body`).append(tres);
    $(`#datos${idAsoPep}>div.info`).attr("cantidad", indiceAsociadosAgregados);
    $(`#datos${idAsoPep}>div.info`).append(templateAsocPep);
    $(`#datos${idAsoPep}>div.info`).find(`select#parentesco${id}`).focus();
}
function btnaddfamasopep(btn) {
    $(btn).click(function () {
        agregaAsoPep($(this).attr("name"));
    });
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
                                            <button type="button" class="btn btn-primary agregarFamiliarAsociado" id="agregarFamiliarAsociadoPep${idAsoPep}">
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
function validarTipoFuenteIngreso(fuenteIngresos) {
    $(fuenteIngresos).change(function () {
        let divRowFntIng = $(this).parent().parent().parent();
        let label = $(divRowFntIng).find("label");
        let input = $(divRowFntIng).find("input");
        $(input).prop("disabled", false);
        switch ($(this).val()) {
            case "NP":
                $(label).text("Nombre comercial");
                $(input)
                    .attr("placeholder", "Nombre comercial ...")
                    .attr("maxlength", "400")
                    .attr("name", "nombreComercial");
                break;
            case "RD":
                $(label).text("Nombre empleador");
                $(input)
                    .attr("placeholder", "Nombre empleador ...")
                    .attr("maxlength", "200")
                    .attr("name", "nombreEmpleador");
                break;
            case "OI":
                $(label).text("Otras fuentes de ingreso");
                $(input)
                    .attr("placeholder", "Otra fuente ...")
                    .attr("maxlength", "400")
                    .attr("name", "otrasFuentesIngresos");
                break;
        }
    });
}
function agregarTemplateFuenteIngresos(btnFuenteIngreso) {
    console.log("agregando fuente de ingresos");
    $(btnFuenteIngreso).click(function () {
        const divPadre = $(this).parent().parent().parent().attr("id");
        const divContenedor = $(`div#${divPadre} >div:nth-child(2)`);
        const id = $(divContenedor).attr("id");
        let posicion = $(divContenedor).attr("cantidad");
        posicion++;
        let cFuIn = templateCamposFuenteIngreso(id, posicion);
        $(divContenedor).append(cFuIn);
        $(divContenedor).attr("cantidad", posicion);
    });
}
function templateCalidadActua(id, tipo) {
    if (tipo == "OtrosFirmantes") {
        tipo = "otros firmantes";
    }
    let cmCA = $(`
                    <div class="row mb-3"><h4>I. TIPO DE ACTUACIÓN DEL ${tipo.toUpperCase()}</h4></div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-check">
                                <div>
                                    <label>El cliente actúa en nombre propio</label>
                                </div>
                                <div class="icheck-primary d-inline">
                                    <input type="radio" id="siActua${id}" class="actuaNombrePropio form-check-input" name="tipoActuacion${id}" value="C" required/>
                                    <label for="siActua${id}">Sí</label>
                                </div>
                                <div class="icheck-primary d-inline">
                                    <input type="radio" id="noActua${id}" class="actuaNombrePropio form-check-input" name="tipoActuacion${id}" value="R" required />
                                    <label for="noActua${id}">No</label>
                                    <div class="invalid-tooltip">Indica el tipo de actuación</div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-8">
                            <div class="form-group">
                                <label for ="calidadActua${id}" >Calidad con que actúa</label>
                                <input name="calidadActua${id}" id="calidadActua${id}" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
                                <div class="invalid-tooltip">Por Ejemplo: Mandatario, Patria potestad, Tutor, Otros.</div>
                            </div>
                        </div>
                    </div>`);
    const inputAcNomPro = $(cmCA).find("input.actuaNombrePropio");
    verificaActuaNombrePropio(inputAcNomPro);
    return cmCA;
}
function templateLugarCM(id) {
    //DocCaMi cambiar este id
    let camposLugar = $(`   <div class="row lugarFecha">
                                <div class="col-sm-12 mb-3">
                                    <h4>II. LUGAR Y FECHA</h4>
                                </div>
                            </div>`);

    let cmpaisTitular = templatePais(`paisCaMi${id}`, "País", true);
    $(camposLugar).append(cmpaisTitular);

    let cmDepartamentoTitular = templateDepartamento(
        `CaMi${id}`,
        "Departamento"
    );
    $(camposLugar).append(cmDepartamentoTitular);

    let cmMunicipioTitular = templateMunicipio(`CaMi${id}`, "Municipio");
    $(camposLugar).append(cmMunicipioTitular);

    let cmFechaDoc = templateFecha(id, "DocCaMi", "");
    $(camposLugar).append(cmFechaDoc);

    return camposLugar;
}
function templateCamposMinimos(id, indice, tipo) {
    console.log(tipo);
    let cm = $(`
                <div class="card card-primary" id="${id}">
                    <div class="card-header">
                        <h3 class="card-title">${tipo} ${indice}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>
                `);
    eliminarCard($(cm));
    let dCardBody = $(cm).find("div.card-body");
    $(dCardBody).append(templateCalidadActua(id, tipo));
    $(dCardBody).append(templateLugarCM(id));

    let cmCM = $(`<div id="camposMinimos${id}"></div>`);
    let cmClie = templateDatosPersonales(id, "cliente");
    $(cmCM).append(cmClie);
    $(dCardBody).append(cmCM);
    if (tipo != "OtrosFirmantes") {
        let cmIE = $(`<div id="informacionEconomicaIncial${id}"></div>`);
        $(cmIE).append(templateInformacionEconomicaInicial(id));
        $(dCardBody).append(cmIE);
    }
    let cmRe = $(`<div id="representante${id}"></div>`);
    $(dCardBody).append(cmRe);
    return cm;
}
function agregarCamposMinimos(tipo, divContenedor) {
    let id = $(divContenedor).attr("cantidad");
    id++;
    let idTitular = `${tipo}_${id}`;
    let templateTitular = templateCamposMinimos(idTitular, id, tipo);
    $(divContenedor).append(templateTitular);
    $(`#${idTitular}`).find(`input#siActua${idTitular}`).focus();
    $(divContenedor).attr("cantidad", id);
}
function AgregarTitular() {
    $("#btnAgregarTitular").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        agregarCamposMinimos("Titular", "div#titulares");
    });
}
function agregarProductoServicio(poservicio) {
    $(poservicio).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("agregando producto");
        $(`div.productoServicio`)
            .find(`button[data-card-widget=collapse]`)
            .first()
            .CardWidget("expand");
        let indexProducto = $("div#datosProductoServicio").attr("cantidad");
        indexProducto++;
        let cmProductoServicio = templateProductoServicio(indexProducto);
        $("div#datosProductoServicio").append(cmProductoServicio);
        $(cmProductoServicio)
            .find(`input#fechaProductoServicio_${indexProducto}`)
            .focus();
        $("div#datosProductoServicio").attr("cantidad", indexProducto);
    });
}
function templateSelectActualizacion() {
    let sa = $(`<label for="actualizacionPet">Tipo ingreso</label>
                  <select name="actualizacionPet" id="actualizacionPet" class="form-control custom-select actualizacionPet select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="I">Perfil inicial</option>
                    <option value="A">Actualización de perfil</option>
                  </select>`);
    sa = templateFormGroup(sa);
    $(sa).find("select").select2();
    return sa;
}
function templateNombreComercial(id) {
    let row = $(`<div class="row"></div>`);
    const tmNombreComercial = templateInputText(
        id,
        "nombreComercial",
        400,
        "Nombre comercial",
        true,
        false
    );
    $(row).append(tmNombreComercial);
    return row;
}
function templateRowDosNegocioPropioPet(id) {
    let row = $(`<div class="row"></div>`);
    const principalActividadEconomica = templateInputText(
        id,
        "principalActividadEconomica",
        200,
        "Principal actividad económica",
        true,
        false
    );
    const fechaInscripcionNegocio = templateFecha(
        id,
        "InscripcionNegocio",
        "de inscripción del negocio",
        "col-sm-3",
        false
    );
    $(row).append(principalActividadEconomica);
    $(row).append(fechaInscripcionNegocio);
    return row;
}
function templateInputNumber(
    id,
    tipo,
    tamanio,
    textolabel,
    requerido,
    deshabilitado
) {
    let tmNom = $(`<label>${textolabel}</label>
                   <input name="${tipo}${id}" id="${tipo}${id}" type="number" class="form-control ${tipo}" placeholder="${textolabel} ..." min="1" max="999999999999999" maxlength="${tamanio}"/>`);
    tmNom = templateFormGroup(tmNom);
    if (requerido === true) {
        $(tmNom).find(`input#${tipo}${id}`).prop("required", true);
    }
    if (deshabilitado === true) {
        $(tmNom).find(`input#${tipo}${id}`).prop("disabled", true);
    }
    return tmNom;
}
function templatePantenteComercio(id) {
    //Número de registro
    let row = $(`<div class="row"></div>`);
    $(row).append(
        templateFormGroup(
            `<h2>Patente de comercio de empresa</h2>`,
            "col-sm-12"
        )
    );
    const numeroRegistro = templateInputNumber(
        id,
        "numeroRegistro",
        15,
        "Número de registro",
        false,
        false
    );
    const folio = templateInputNumber(id, "folio", 15, "Folio", false, false);
    const libro = templateInputNumber(id, "libro", 15, "Libro", false, false);
    $(row).append(numeroRegistro);
    $(row).append(folio);
    $(row).append(libro);
    return row;
}
function templateCamposLugarPet(id) {
    let comPais = templatePais(`paisPet${id}`, "País", true);
    let comDepartamento = templateDepartamento(`Pet${id}`, "Departamento");
    let comMunicipio = templateMunicipio(`Pet${id}`, "Municipio");
    let tempCamResidencia = $(`<div class="row"></div>`);
    $(tempCamResidencia).append(comPais);
    $(tempCamResidencia).append(comDepartamento);
    $(tempCamResidencia).append(comMunicipio);
    return tempCamResidencia;
}
function templateMontoAproximado(id, textolabel) {
    let tm = $(`<label>${textolabel}</label>
                <input type="number" name = "montoAproximado" class="form-control d-inline montoAproximado" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>`);
    tm = templateFormGroup(tm, "col-sm-3");
    return tm;
}
function templateCamposMonto(id, textolabelMonto) {
    const tipoMoneda = templateMoneda(id);
    const MontoAproximado = templateMontoAproximado(id, textolabelMonto);
    let tm = $(`<div class="row"></div>`);
    $(tm).append(tipoMoneda);
    $(tm).append(MontoAproximado);
    return tm;
}
function templatePerfilnegocioPropio(id) {
    const rowuno = templateNombreComercial(id);
    const rowdos = templateRowDosNegocioPropioPet(id);
    const rowtres = templatePantenteComercio(id);
    const rowCuatro = templateDireccion(id, "Dirección negocio", "Negocio");
    const rowCinco = templateCamposLugarPet(id);
    const rowSeis = templateCamposMonto(id, "Monto aproximado ingresos");
    let tm = $(`
                <div class="card card-info mt-3" id="negocioPropio_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Negocio propio ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
    $(tm).find(`div.card-body`).append(rowuno);
    $(tm).find(`div.card-body`).append(rowdos);
    $(tm).find(`div.card-body`).append(rowtres);
    $(tm).find(`div.card-body`).append(rowCuatro);
    $(tm).find(`div.card-body`).append(rowCinco);
    $(tm).find(`div.card-body`).append(rowSeis);

    return tm;
}
function agregarPerfilEconomicoNegocioPropio(btn) {
    $(btn).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const dnp = $("div#datosNegocioPropio");
        let index = $(dnp).attr("cantidad");
        index++;
        $(dnp).append(templatePerfilnegocioPropio(index));
        $(dnp).find(`input#nombreComercial${index}`).focus();
        $(dnp).attr("cantidad", index);
    });
}
function templateContenedorNegocioPropio() {
    let tpnp = $(`<div class="row">
                    <div class="datosNegocioPropio col-sm-12" id="datosNegocioPropio" cantidad="0"></div>
                    <div class="form-group">
                        <button type="button" id="agregarNegocioPropio" class="btn btn-primary agregarNegocioPropio">Agregar negocio propio</button>
                    </div>
                  </div>`);
    const btnaddng = $(tpnp).find("button#agregarNegocioPropio");
    agregarPerfilEconomicoNegocioPropio(btnaddng);
    return tpnp;
}
function templateSelectSector(id) {
    let sa = $(`<label for="sectorPet">Sector</label>
                  <select name="sectorPet" id="sectorPet${id}" class="form-control custom-select sector select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="PU">Sector Público</option>
                    <option value="PR">Sector Privado</option>
                  </select>`);
    sa = templateFormGroup(sa, "col-sm-2");
    $(sa).find("select").select2();
    return sa;
}
function templateFilaUnord(id) {
    const cmSector = templateSelectSector(id);
    const cmNombreEmpleador = templateInputText(
        id,
        "NombreEmpleador",
        200,
        "Nombre del empleador",
        true
    );
    let tm = $(`<div class="row"></div>`);
    $(tm).append(cmSector);
    $(tm).append(cmNombreEmpleador);
    return tm;
}
function templateFilaDosrd(id) {
    const prinActiEcoEmple = templateInputText(
        id,
        "prinActiEcoEmple",
        200,
        `Principal actividad económica empleador`,
        true,
        false
    );
    const puestoDesempenia = templateInputText(
        id,
        "puestoDesempenia",
        200,
        "Puesto que desempeña",
        true,
        false
    );
    let tm = $(`<div class="row"></div>`);
    $(tm).append(prinActiEcoEmple);
    $(tm).append(puestoDesempenia);
    return tm;
}
function templateCamposLugarRd(id) {
    let comPais = templatePais(`paisRd${id}`, "País", true);
    let comDepartamento = templateDepartamento(`Rd${id}`, "Departamento");
    let comMunicipio = templateMunicipio(`Rd${id}`, "Municipio");
    let tempCamResidencia = $(`<div class="row"></div>`);
    $(tempCamResidencia).append(comPais);
    $(tempCamResidencia).append(comDepartamento);
    $(tempCamResidencia).append(comMunicipio);
    return tempCamResidencia;
}
function templateRelacionDependencia(id) {
    const cmRowUno = templateFilaUnord(id);
    const cmRowDos = templateFilaDosrd(id);
    const rowTres = templateCamposMonto(id, "Monto aproximado ingresos");
    const direccionEmpleador = templateDireccion(
        id,
        "Dirección empleador",
        "Empleador"
    );
    const lugarRd = templateCamposLugarRd(id);
    let tm = $(`
                <div class="card card-info mt-3" id="relacoinDependencia_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Relación de dependencia ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
    $(tm).find(`div.card-body`).append(cmRowUno);
    $(tm).find(`div.card-body`).append(cmRowDos);
    $(tm).find(`div.card-body`).append(direccionEmpleador);
    $(tm).find(`div.card-body`).append(lugarRd);
    $(tm).find(`div.card-body`).append(rowTres);
    return tm;
}
function agregarPerfilEconomicoRelacionDependencia(btn) {
    $(btn).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const drd = $("div#datosRelacionDependencia");
        let index = $(drd).attr("cantidad");
        index++;
        $(drd).append(templateRelacionDependencia(index));
        $(drd).find("select.sector").focus();
        $(drd).attr("cantidad", index);
    });
}
function templateContenedorRelacionDependencia() {
    let trd = $(`<div class="row">
                    <div class="datosRelacionDependencia col-sm-12" id="datosRelacionDependencia" cantidad="0"></div>
                    <div class="form-group">
                        <button type="button" id="agregarRelacionDependencia" class="btn btn-primary agregarRelacionDependencia">Agregar Relación de Dependencia</button>
                    </div>
                  </div>`);
    let drd = $(trd).find(`div#datosRelacionDependencia`);
    const btnaddrd = $(trd).find(`button#agregarRelacionDependencia`);
    agregarPerfilEconomicoRelacionDependencia(btnaddrd);
    return trd;
}
function templateSelectOtrosIngresos(id) {
    let sa = $(`<label for="tipoOtrosIngresosPet">Tipo de ingreso</label>
                  <select name="tipoOtrosIngresosPet" id="tipoOtrosIngresosPet${id}" class="form-control custom-select tipoOtrosIngresos select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="1">Actividades profecionales</option>
                    <option value="2">Manutención</option>
                    <option value="3">Rentas</option>
                    <option value="4">Jubilación</option>
                    <option value="5">Otra</option>
                  </select>`);
    sa = templateFormGroup(sa, "col-sm-2");
    $(sa).find("select").select2();
    return sa;
}
function templateRowUnoOtrosIngresos(id) {
    const cmSelectOtrosIngresos = templateSelectOtrosIngresos(id);
    const cmDeatalleOtrosIngresos = templateInputText(
        id,
        "DetalleOtrosIngresos",
        400,
        "Especificar otra fuente de ingresos",
        true,
        false
    );
    let cmRow = $(`<div class="row"></div>`);
    $(cmRow).append(cmSelectOtrosIngresos);
    $(cmRow).append(cmDeatalleOtrosIngresos);
    return cmRow;
}

function templateOtrosIngresos(id) {
    const cmRowUno = templateRowUnoOtrosIngresos(id);
    const cmMontos = templateCamposMonto(id, "Monto aproximado ingresos");
    let tm = $(`
                <div class="card card-info mt-3" id="otrosIngresos_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Otros ingreso ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
    $(tm).find(`div.card-body`).append(cmRowUno);
    $(tm).find(`div.card-body`).append(cmMontos);
    return tm;
}
function agregarTemplateOtrosIngresos(btnaddoi) {
    $(btnaddoi).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const tmdrd = $("div#datosOtrosIngresos");
        let index = $(tmdrd).attr("cantidad");
        index++;
        $(tmdrd).append(templateOtrosIngresos(index));
        $(tmdrd).find(`select.tipoOtrosIngresos`).focus();
        $(tmdrd).attr("cantidad", index);
    });
}
function templateContenedorOtrosIngresos() {
    let trd = $(`<div class="row">
                    <div class="datosOtrosIngresos col-sm-12" id="datosOtrosIngresos" cantidad="0"></div>
                    <div class="form-group">
                        <button type="button" id="agregarOtrosIngresos" class="btn btn-primary agregarOtrosIngresos">Agregar Otros Ingresos</button>
                    </div>
                  </div>`);
    let drd = $(trd).find(`div#datosOtrosIngresos`);
    const btnaddoi = $(trd).find("button#agregarOtrosIngresos");
    agregarTemplateOtrosIngresos(btnaddoi);
    return trd;
}
function templateFinaUnoPerfilEconomicoTransaccional() {
    const cmSelectActualizacioin = templateSelectActualizacion();
    const cmFecha = templateFecha("", "Pet", "");
    let rowuno = $(`<div class="row"></div>`);
    $(rowuno).append(cmSelectActualizacioin);
    $(rowuno).append(cmFecha);
    return rowuno;
}
function templateRowUnoPSperfilTransaccional(id) {
    const fecha = templateFecha(
        id,
        "Pspt",
        "de elaboración del perfil",
        "col-sm-3",
        true
    );
    const descripcion = templateInputText(
        id,
        "productoServicioPspt",
        100,
        "Producto y/o servicio",
        true,
        false
    );
    let rowuno = $(`<div class="row"></div>`);
    $(rowuno).append(fecha);
    $(rowuno).append(descripcion);
    return rowuno;
}
function borrarUbicacionGeografica(btn) {
    $(btn).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log($(this).parent().parent().remove());
    });
}
function templateCamposLugarUbigeo(id, btnBorrar) {
    let comPais = templatePais(`paispug${id}`, "País", true);
    let comDepartamento = templateDepartamento(`pug${id}`, "Departamento");
    let comMunicipio = templateMunicipio(`pug${id}`, "Municipio");
    let divCborrar = $(`<div class="col-sm-1 my-auto btnborrar"></div>`);
    let temUbiGeo = $(`<div class="row"></div>`);
    $(temUbiGeo).append(comPais);
    $(temUbiGeo).append(comDepartamento);
    $(temUbiGeo).append(comMunicipio);
    if (btnBorrar) {
        const btnBorrar = $(
            `<button type="button" class="btn btn-danger btnUbicacionGeografica mt-3">Borrar</button>`
        );
        borrarUbicacionGeografica(btnBorrar);
        $(divCborrar).append(btnBorrar);
    }
    $(temUbiGeo).append(divCborrar);
    return temUbiGeo;
}
function agregarPUG(btn) {
    $(btn).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const tmdrd = $(this)
            .parent()
            .parent()
            .parent()
            .find("div#ubicacionesGeoraficas");
        let index = $(tmdrd).attr("cantidad");
        let idug = $(tmdrd).attr("idug");
        index++;
        $(tmdrd).append(templateCamposLugarUbigeo(`${idug}${index}`, true));
        $(tmdrd).find(`select.pais`).focus();
        $(tmdrd).attr("cantidad", index);
    });
}
function templateProductoServicioPerfilTransaccional(id) {
    const rowuno = templateRowUnoPSperfilTransaccional(id);
    const rowdos = templateCamposMonto(id, "Monto promedio mensual (6 meses)");
    const clg = templateCamposLugarUbigeo(`${id}1`);
    const rowUbicacionesGeo = $(`<h4>Principales ubicaciones geográficas</h4>
                                 <div id="ubicacionesGeoraficas" idug=${id} cantidad="1"></div>
                                 <div class="row">
                                <div class="col clearfix">
                                <button class="btn btn-primary float-right mb-4 agregarUbicacionGeo" id="agregarUbicacionGeo${id}">Agregar ubicación</button>
                                </div>
                                </div>`);
    let tm = $(`
                <div class="card card-info mt-3" id="otrosIngresos_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Producto del perfil transaccional ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
    $(tm).find(`div.card-body`).append(rowuno);
    $(tm).find(`div.card-body`).append(rowdos);
    $(tm).find(`div.card-body`).append(rowUbicacionesGeo);
    $(tm).find(`div#ubicacionesGeoraficas`).append(clg);
    const btnaddpug = $(tm).find("button.agregarUbicacionGeo");
    agregarPUG(btnaddpug);
    return tm;
}

function agregarTemplatePerfilTransaccional(btnadd) {
    $(btnadd).click(function () {
        let dpt = $(`div#datosPerfilTransaccional`);
        let index = $(dpt).attr("cantidad");
        index++;
        const cmPSPT = templateProductoServicioPerfilTransaccional(index);
        $(dpt).append(cmPSPT);
        $(dpt).find("input.Pspt").focus();
        $(dpt).attr("cantidad", index);
    });
}
function templatePerfiltransaccional() {
    let tm = $(`
                <div class="card card-primary mt-3" id="perfilTransaccional">
                    <div class="card-header">
                        <h3 class="card-title">PERFIL TRANSACCIONAL</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                <div class="row">
                    <div class="datosPerfilTransaccional col-sm-12" id="datosPerfilTransaccional" cantidad="0"></div>
                    <div class="form-group">
                            <button type="button" id="agregarPerfilTransaccional" class="btn btn-primary agregarOtrosIngresos mt-3">Agregar Producto y/o Servicio Perfil Transaccinal</button>
                    </div>
                  </div>
                    </div>
                </div>`);
    const btnadd = $(tm).find("button#agregarPerfilTransaccional");
    agregarTemplatePerfilTransaccional(btnadd);
    return $(tm);
}
function agregarPerfilEconomico(btnAgregarPerfilEconomico) {
    $(btnAgregarPerfilEconomico).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("agregando perfil economico");
        $(`div#perfilEconomicoTransaccional`)
            .find(`button[data-card-widget=collapse]`)
            .first()
            .CardWidget("expand");
        const cmPerfilEconomico = templateFinaUnoPerfilEconomicoTransaccional();
        const cmNegocioPropio = templateContenedorNegocioPropio();
        const cmRD = templateContenedorRelacionDependencia();
        const cmCoi = templateContenedorOtrosIngresos();
        const cmPet = templatePerfiltransaccional();
        let cardBody = $("div#perfilEconomicoTransaccional").find(
            "div.card-body"
        );
        $(cardBody).append(cmPerfilEconomico);
        $(cardBody).append(
            $(`<div class="row"><h2>FUENTE DE INGRESOS</h2></div>`)
        );
        $(cardBody).append(cmNegocioPropio);
        $(cardBody).append(cmRD);
        $(cardBody).append(cmCoi);
        $(cardBody).append(cmPet);
        $(this).remove();
    });
}
class dicLugar {
    constructor() {
        this.pais = null;
        this.departamento = null;
        this.municipio = null;
    }
}
class datosPep {
    constructor(id) {
        this.idDatosPep = id;
        this.entidad = null;
        this.puestoDesempenia = null;
        this.paisEntidad = null;
        this.origenRiqueza = null;
        this.otroOrigenRiqueza = null;
    }
}
class dicParienteAsociadoPep {
    constructor(id) {
        this.idDatosParienteAsociadoPep = id;
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
    constructor(id) {
        this.idDatosPersonales = id;
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

class informacionNegocioPropio {
    constructor(id) {
        this.idNombreComercial = id;
        this.nombreComercial = null;
    }
}
class informacionNombreEmpleador {
    constructor(id) {
        this.idNombreEmpleador = id;
        this.nombreEmpleador = null;
    }
}
class informacionOtrosIngresos {
    constructor(id) {
        this.idOtrasFuentesIngreso = id;
        this.otrasFuentesIngreso = null;
    }
}
class informacionEconomicaInicial {
    constructor(id) {
        this.idInformacionEconomicaInicial = id;
        this.montoIngresos = null;
        this.negocioPropio = new Array();
        this.relacionDependencia = new Array();
        this.otrosIngresos = new Array();
        this.propositoRC = null;
    }
    agregarNegocioPropio(npropio) {
        this.negocioPropio.push(npropio);
    }
    agregarRelacionDependencia(rDependencia) {
        this.relacionDependencia.push(rDependencia);
    }
    agregarotrosIngresos(oIngresos) {
        this.otrosIngresos.push(oIngresos);
    }
}
class dicCamposMinimos {
    constructor(id) {
        this.idCamposMinimos = id;
        this.tipoActuacion = null;
        this.calidadActua = null;
        this.lugar = new dicLugar();
        this.fecha = null;
        this.cliente = new dicDatosPersonales();
        this.representante = new dicDatosPersonales();
        this.infoEconomicaInical = new informacionEconomicaInicial();
    }
}
class dicProductoServicio {
    constructor(id) {
        this.idProductoServicio = id;
        this.lugar = new dicLugar();
        this.fecha = null;
        this.tipo = null;
        this.nombre = null;
        this.descripcion = null;
        this.identificador = null;
        this.nombreContrata = null;
        this.moneda = null;
        this.valor = null;
        this.otrosFirmantes = new Array();
        this.beneficiarios = new Array();
    }
    agregarBeneficiario(beneficiario) {
        this.beneficiarios.push(beneficiario);
    }
}
class dicPerfilEconomicoNegocioPropio {
    constructor(id) {
        this.idDiccionarioPerfilEconomicoNegocioPropio = id;
        this.nombreComercial = null;
        this.principalActividadEconomica = null;
        this.fechaInscripcionNegocio = null;
        this.numeroRegistro = null;
        this.folio = null;
        this.libro = null;
        this.direccionNegocio = null;
        this.lugar = new dicLugar();
        this.tipoMoneda = null;
        this.montoAproximado = null;
    }
}
class dicPerfilEconomicoRelacionDependencia {
    constructor(id) {
        this.idPerd = id;
        this.sector = null;
        this.nombreEmpleador = null;
        this.priActEcoE = null;
        this.puestoDesempenia = null;
        this.direccionEmpleador = null;
        this.lugar = new dicLugar();
        this.tipoMoneda = null;
        this.montoAproximado = null;
    }
}
class dicPerfilEconomicoOtrosIngresos {
    constructor(id) {
        this.idOI = id;
        this.tipoOI = null;
        this.detalleOI = null;
        this.tipoMoneda = null;
        this.montoAproximado = null;
    }
}
class dicPerfilTransaccional {
    constructor(id) {
        this.iddpet = id;
        this.fecha = null;
        this.productoServicio = null;
        this.tipoMoneda = null;
        this.montoPromedioMensual = null;
        this.pubGeo = new Array();
    }
}
class dicPerfilEconomicoTransaccional {
    constructor(id) {
        this.idPerfilEconomicoTransaccional = id;
        this.actualizacion = null;
        this.fecha = null;
        this.negocioPropio = new Array();
        this.relacionDependencia = new Array();
        this.otrosIngresos = new Array();
        this.perfilTransaccional = new Array();
    }
    agregarNegocioPropio(ngp) {
        this.negocioPropio.push(ngp);
    }
    agregarRelacionDependencia(rd) {
        this.relacionDependencia.push(rd);
    }
    agregarotrosIngresos(oi) {
        this.otrosIngresos.push(oi);
    }
    agregarPerfilTransaccional(pt) {
        this.perfilTransaccional.push(pt);
    }
}
class diccionarioFormulario {
    constructor(id) {
        this.iddiccionarioFormulario = id;
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
    $(`div.productoServicio`)
        .find(`button[data-card-widget=collapse]`)
        .each(function () {
            $(this).CardWidget("expand");
        });
    $(`form#diccionarioFormulario>div`)
        .find(`button[data-card-widget=collapse]`)
        .each(function () {
            $(this).CardWidget("expand");
        });
}
function mostrarModal() {
    $("#myModal").modal({
        backdrop: "static",
        keyboard: false,
    });
}
function validarFormulario() {
    var forms = document.getElementsByClassName("needs-validation");
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();
                event.stopPropagation();
                expandirCard();
                if (form.checkValidity() === false) {
                    form.classList.add("was-validated");
                    alert(
                        "No se puede guardar el formulario, verifica los campos"
                    );
                    $(form).find(".form-control:invalid").first().focus();
                    $(form).find(".form-check-input:invalid").first().focus();
                    $(this).find("button#btnGuardar").prop("disabled", false);
                    $(this)
                        .find("button#btnGuardar")
                        .html("Guardar formulario");
                } else {
                    console.log("enviando formulario");
                    //mostrarModal();
                    $(this).find("button#btnGuardar").prop("disabled", true);
                    $(this).find("button#btnGuardar").html("");
                    $(this).find("button#btnGuardar").append(
                        `
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Guardando formulario...
                         `
                    );
                    enviarDatos();
                }
            },
            false
        );
    });
}
function enviarDatos() {
    let nuevoDiccionarioFormulario = obtenerDatos();
    //console.log(JSON.stringify(nuevoDiccionarioFormulario));
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
            if (res.Status == "Success") {
                console.log(res);
                console.log("redireccionando....");
                const url = "/oficios/7122020";
                $(location).attr("href", url);
            } else {
                console.log(res);
                alert(
                    "Ocurrió un error al guardar el formulario, intenta de nuevo"
                );
                $("button#btnGuardar").prop("disabled", false);
                $("button#btnGuardar").html("Guardar formulario");
            }
        },
        error: function (jqXHR, exception) {
            var msg = "";
            if (jqXHR.status === 0) {
                msg = "Not connect.\n Verify Network.";
            } else if (jqXHR.status == 404) {
                msg = "Requested page not found. [404]";
            } else if (jqXHR.status == 500) {
                msg = "Internal Server Error [500].";
            } else if (exception === "parsererror") {
                msg = "Requested JSON parse failed.";
            } else if (exception === "timeout") {
                msg = "Time out error.";
            } else if (exception === "abort") {
                msg = "Ajax request aborted.";
            } else {
                msg = "Uncaught Error.\n" + jqXHR.responseText;
            }
            alert(msg);
        },
    });
}
function eliminarCard(card) {
    for (let i = 0; i < card.length; i++) {
        $(card[i]).on("removed.lte.cardwidget", function (event) {
            let cardActual = $(event.target).parent().parent().parent();
            $(cardActual).remove();
        });
    }
}
function obtenerDiccionarioCamposMinimos(divContenedorCamposMinimos) {
    let diccionarioCamposMinimos = new Array();
    $(divContenedorCamposMinimos).each(function () {
        let id = $(this).attr("id");
        let idCamposMinimos = $(this).attr("idCamposMinimos");
        let camposMinimos = new dicCamposMinimos(idCamposMinimos);
        camposMinimos.tipoActuacion = $(this)
            .find(`input:radio[name=tipoActuacion${id}]:checked`)
            .val();
        if (camposMinimos.tipoActuacion === "R") {
            camposMinimos.calidadActua = $(this)
                .find(`input:text[id=calidadActua${id}]`)
                .val();
            let daPeRepre = $(this).find(`div#representante${id}`);
            //idrepresentante
            const idrepresentante = $(`div#representante${id}`).attr(
                "idrepresentante"
            );
            camposMinimos.representante = obtenerDatosPersonales(
                daPeRepre,
                `Representante${id}`,
                idrepresentante
            );
        } else {
            camposMinimos.representante = null;
        }
        camposMinimos.lugar.pais = $(this)
            .find(`select[id=paisCaMi${id}] option:selected`)
            .val();
        if (camposMinimos.lugar.pais === "1") {
            camposMinimos.lugar.departamento = $(this)
                .find(`select[id=deptoCaMi${id}] option:selected`)
                .val();
            camposMinimos.lugar.municipio = $(this)
                .find(`select[id=muniCaMi${id}] option:selected`)
                .val();
        }
        camposMinimos.fecha = $(this)
            .find(`input:text[id=fechaDocCaMi${id}]`)
            .val();
        let daPeCliente = $(this).find(`div#camposMinimos${id}`);
        const idDatosPersonales = $(`#camposMinimos${id}`).attr(
            "idatospersonales"
        );
        camposMinimos.cliente = obtenerDatosPersonales(
            daPeCliente,
            id,
            idDatosPersonales
        );
        const divInfoEconomica = $(this).find(
            `div#informacionEconomicaIncial${id}`
        );
        const idinformacioniconomicainicial = $(
            `#informacionEconomicaIncial${id}`
        ).attr("idinformacioniconomicainicial");
        camposMinimos.infoEconomicaInical = obtenerDatosInfoEconomica(
            divInfoEconomica,
            id,
            idinformacioniconomicainicial
        );
        diccionarioCamposMinimos.push(camposMinimos);
    });
    return diccionarioCamposMinimos;
}
function obtenerDatosPersonales(divPadre, id, idDatosPersonales) {
    let datosPersonales = new dicDatosPersonales(idDatosPersonales);
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

    let nacionalidades = $(`div#nacionalidad${id}`).find(`select.nacionalidad`);
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
        datosPersonales.datospep.idDatosPep = $(
            `input[id=idDatosPep${id}]`
        ).val();
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
            let idDatosParienteAsociadoPep = $(asociados[a]).attr(
                "idDatosParienteAsociadoPep"
            );

            let datosAsoPep = new dicParienteAsociadoPep(
                idDatosParienteAsociadoPep
            );
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
function obtenerDatosInfoEconomica(
    infoEconomica,
    id,
    idinformacioniconomicainicial
) {
    let infoEc = new informacionEconomicaInicial(idinformacioniconomicainicial);
    infoEc.montoIngresos = $(infoEconomica)
        .find(`input[id=montoIngresos${id}]`)
        .val();
    infoEc.propositoRC = $(infoEconomica)
        .find(`input:text[id=propositoRC${id}]`)
        .val();

    let fuenteIngresos = $(infoEconomica).find(`div#fuenteingresos${id}`);
    $(fuenteIngresos)
        .children()
        .each(function (elemento) {
            switch ($(this).find(`input`).attr("name")) {
                case "nombreComercial":
                    let ngp = new informacionNegocioPropio();
                    ngp.nombreComercial = $(this).find(`input`).val();
                    infoEc.agregarNegocioPropio(ngp);
                    break;
                case "nombreEmpleador":
                    let rdp = new informacionNombreEmpleador();
                    rdp.nombreEmpleador = $(this).find(`input`).val();
                    infoEc.agregarRelacionDependencia(rdp);
                    break;
                case "otrasFuentesIngresos":
                    let ofi = new informacionOtrosIngresos();
                    ofi.otrasFuentesIngreso = $(this).find(`input`).val();
                    infoEc.agregarotrosIngresos(ofi);
                    break;
            }
        });
    return infoEc;
}
function obtenerDatosProductoServicio(ps) {
    console.log("obteniendo datos de productos y servicios");
    const arrProducto = new Array();
    for (let i = 0; i < ps.length; i++) {
        const id = $(ps[i]).attr("id");
        const idProductoServicio = $(ps[i]).attr("idproductoservicio");
        let producto = new dicProductoServicio(idProductoServicio);
        producto.fecha = $(ps[i]).find(`input#fecha${id}`).val();
        producto.lugar.pais = $(ps[i])
            .find(`select[id=pais${id}] option:selected`)
            .val();
        producto.lugar.departamento = $(ps[i])
            .find(`select[id=depto${id}] option:selected`)
            .val();
        producto.lugar.municipio = $(ps[i])
            .find(`select[id=muni${id}] option:selected`)
            .val();
        producto.identificador = $(ps[i])
            .find(`input#identificador${id}`)
            .val();
        producto.tipo = $(ps[i]).find(`input#tipo${id}`).val();
        producto.nombre = $(ps[i]).find(`input#nombre${id}`).val();
        producto.descripcion = $(ps[i]).find(`input#descripcion${id}`).val();
        producto.nombreContrata = $(ps[i])
            .find(`input#nombreContrata${id}`)
            .val();
        producto.moneda = $(ps[i]).find(`select.moneda option:selected`).val();
        producto.valor = $(ps[i]).find(`input#valor${id}`).val();
        const beneficiarios = $(ps[i])
            .find(`div#datosBeneficiario${id}`)
            .children();
        producto.beneficiarios = obtenerDiccionarioCamposMinimos(beneficiarios);
        const otrosFirmantes = $(ps[i])
            .find(`div#datosOtrosFirmantes${id}`)
            .children();
        producto.otrosFirmantes = obtenerDiccionarioCamposMinimos(
            otrosFirmantes
        );

        arrProducto.push(producto);
    }
    return arrProducto;
}
function obtenerDatosOtrosIngresos() {
    let otrosIngresos = new Array();
    $("div#datosOtrosIngresos")
        .children()
        .each(function () {
            let doi = new dicPerfilEconomicoOtrosIngresos($(this).attr("idoi"));
            doi.tipoOI = $(this).find("select.tipoOtrosIngresos").val();
            doi.detalleOI = $(this).find("input.DetalleOtrosIngresos").val();
            doi.tipoMoneda = $(this).find("select.moneda ").val();
            doi.montoAproximado = $(this).find("input.montoAproximado ").val();
            otrosIngresos.push(doi);
        });
    return otrosIngresos;
}
function obtenerUbicacionesGeograficas(ubgeo) {
    let UbicacionesGeograficas = new Array();
    $(ubgeo)
        .children()
        .each(function () {
            let lgubg = new dicLugar();
            lgubg.pais = $(this).find(`select.pais option:selected`).val();
            if (lgubg.pais === "1") {
                lgubg.departamento = $(this)
                    .find(`select.depto option:selected`)
                    .val();
                lgubg.municipio = $(this)
                    .find(`select.muni option:selected`)
                    .val();
            }
            UbicacionesGeograficas.push(lgubg);
        });
    return UbicacionesGeograficas;
}
function obtenerDatosPerfilTransaccional() {
    let dperfilTransaccional = new Array();
    $("div#datosPerfilTransaccional")
        .children()
        .each(function () {
            let dpt = new dicPerfilTransaccional($(this).attr("iddpet"));
            dpt.fecha = $(this).find("div.date>input.Pspt").val();
            dpt.productoServicio = $(this)
                .find("input.productoServicioPspt")
                .val();
            dpt.tipoMoneda = $(this).find("select.moneda ").val();
            dpt.montoPromedioMensual = $(this)
                .find("input.montoAproximado ")
                .val();
            dpt.pubGeo = obtenerUbicacionesGeograficas(
                $(this).find("div#ubicacionesGeoraficas")
            );
            dperfilTransaccional.push(dpt);
        });
    return dperfilTransaccional;
}
function obtenerDatosPerfilEconomicoTransaccional(pet) {
    console.log(`perfil economico transaccinal`);
    let dpet = null;
    if ($(pet).children().length != 0) {
        const idpet = $(pet).attr("idperfileconomicotransaccional");
        dpet = new dicPerfilEconomicoTransaccional(idpet);
        dpet.actualizacion = $(pet).find("select#actualizacionPet").val();
        dpet.fecha = $(pet).find("input#fechaPet").val();
        // obtener Fuentes de ingresos
        $("#datosNegocioPropio")
            .children()
            .each(function () {
                const iddpenp = $(this).attr(
                    "iddiccionarioperfileconomiconegociopropio"
                );
                let ngp = new dicPerfilEconomicoNegocioPropio(iddpenp);
                ngp.nombreComercial = $(this)
                    .find(`input.nombreComercial`)
                    .val();
                ngp.principalActividadEconomica = $(this)
                    .find(`input.principalActividadEconomica`)
                    .val();
                ngp.fechaInscripcionNegocio = $(this)
                    .find(`input.InscripcionNegocio`)
                    .val();
                ngp.numeroRegistro = $(this).find("input.numeroRegistro").val();
                ngp.folio = $(this).find("input.folio").val();
                ngp.libro = $(this).find("input.libro").val();
                ngp.direccionNegocio = $(this).find(`input.direccion`).val();
                ngp.lugar.pais = $(this)
                    .find(`select.pais option:selected`)
                    .val();
                if (ngp.lugar.pais === "1") {
                    ngp.lugar.departamento = $(this)
                        .find(`select.depto option:selected`)
                        .val();
                    ngp.lugar.municipio = $(this)
                        .find(`select.muni option:selected`)
                        .val();
                }
                ngp.tipoMoneda = $(this)
                    .find(`select.moneda option:selected`)
                    .val();
                ngp.montoAproximado = $(this)
                    .find(`input.montoAproximado`)
                    .val();
                dpet.agregarNegocioPropio(ngp);
            });
        // relacion de dependencia
        $("div#datosRelacionDependencia")
            .children()
            .each(function () {
                let drd = new dicPerfilEconomicoRelacionDependencia(
                    $(this).attr("idrd")
                );
                drd.sector = $(this).find("select.sector").val();
                drd.nombreEmpleador = $(this)
                    .find("input.NombreEmpleador")
                    .val();
                drd.priActEcoE = $(this).find("input.prinActiEcoEmple").val();
                drd.puestoDesempenia = $(this)
                    .find("input.puestoDesempenia")
                    .val();
                drd.direccionEmpleador = $(this).find("input.direccion").val();
                drd.lugar.pais = $(this).find("select.pais").val();
                drd.lugar.departamento = $(this).find("select.depto").val();
                drd.lugar.municipio = $(this).find("select.muni").val();
                drd.tipoMoneda = $(this).find("select.moneda ").val();
                drd.montoAproximado = $(this)
                    .find("input.montoAproximado ")
                    .val();
                dpet.agregarRelacionDependencia(drd);
            });
        // otros ingresos
        dpet.otrosIngresos = obtenerDatosOtrosIngresos();
        dpet.perfilTransaccional = obtenerDatosPerfilTransaccional();
    }

    return dpet;
}
function obtenerDatos() {
    let df = new diccionarioFormulario(
        $(".diccionarioFormulario").attr("idDiccionario")
    );
    df.titulares = obtenerDiccionarioCamposMinimos($("#titulares>div"));
    const productoServicio = $(`div#datosProductoServicio`).children();
    df.productos = obtenerDatosProductoServicio(productoServicio);

    const pet = $(`div#perfilEconomicoTransaccional`).find("div.card-body");
    df.perfilEconomico = obtenerDatosPerfilEconomicoTransaccional(pet);
    console.log(df);
    return df;
}
function noEnviarFormularioConEnter() {
    $("#diccionarioFormulario").on("keyup keypress", function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
}
$(document).ready(function () {
    // function askConfirmation(evt) {
    //     var msg =
    //         "Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?";
    //     evt.returnValue = msg;
    //     return msg;
    // }
    // window.addEventListener("beforeunload", askConfirmation);
    console.log("Esperando a que la pagina cargue completamente ");
    $("input[type=text]");
    noEnviarFormularioConEnter();
    setFormatoFecha($(".date"));
    verificaActuaNombrePropio($(".actuaNombrePropio"));
    habilitaDepartamentoMunicipio($(".deshabilitaDepartamentoMunicipio"));
    cargarMunicipios($(".getMunicipio"));
    validarApellidoCasada($(".apellidoCasada"));
    habilitaOtraCondicionMigratoria($(`select.condicionMigratoria`));
    validarNit($(".validarNit"));
    habilitaPaisPasaporte($(".validaPaisPasaporte"));
    agregarTemplateNacionalidad($(".agregarNacionalidad"));
    eliminarTemplateNacionalidad($(`.borrarNacionalidad`));
    agregarTemplateTelefono($(".agregarTelefono"));
    eliminarTemplateTelefono($(`.borrarTelefono`));
    verificarPersonaPep($(".pep"));
    habilitaOtroOrigenriqueza($("select.otroOrigenRiqueza"));
    verificarAsoPep($(".asoPep"));
    habilitaOtroCampoDesdeSelect($("select.parentesco"), 6);
    habilitaOtroCampoDesdeSelect($("select.motivoAsociacion"), 5);
    btnaddfamasopep($(`button.agregarFamiliarAsociado`));
    validarTipoFuenteIngreso($("select.fuenteIngresos"));
    agregarTemplateFuenteIngresos($("button.agregarFuenteIngresos"));
    borrarTemplateFuenteIngresos($(`.borrarFuenteIngreso`));
    AgregarTitular();
    eliminarCard($("#titulares>div"));
    eliminarCard($("#datosProductoServicio>div"));
    eliminarCard($("#perfilEconomicoTransaccional>div"));
    agregarProductoServicio($("button.agregarProductoServicio"));
    btnAgregarBeneficiario($("button.agregarBeneficiario"));
    btnAgregarOtroFirmantes($("button.agregarOtrosFirmantes"));

    agregarPerfilEconomico($("button.agregarPerfilEconomico"));
    agregarPerfilEconomicoNegocioPropio($("button#agregarNegocioPropio"));
    agregarPerfilEconomicoRelacionDependencia(
        $("button#agregarRelacionDependencia")
    );
    agregarTemplateOtrosIngresos("button#agregarOtrosIngresos");
    agregarTemplatePerfilTransaccional("button#agregarPerfilTransaccional");
    agregarPUG($("button.agregarUbicacionGeo"));
    borrarUbicacionGeografica("button.btnUbicacionGeografica");
    validarFormulario();
});
