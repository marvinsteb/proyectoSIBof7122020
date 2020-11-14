// templates

function templateInvalidTooltip(mensaje) {
    return `<div class="invalid-tooltip">${mensaje}</div>`;
}
function templateFormGroup(temFormGroup) {
    let tm = $(`<div class="col-sm">
                    <div class="form-group">
                    </div>
                </div>`);
    $(tm).find("div.form-group").append(temFormGroup);
    return tm;
}
function templateNombre(id, tipo, tamanio, textolabel, requerido) {
    let tmNom = $(`<label>${textolabel}</label>
                   <input name="${tipo}${id}" id="${tipo}${id}" type="text" class="form-control ${tipo}" placeholder="${textolabel} ..." maxlength="${tamanio}"/>`);
    tmNom = templateFormGroup(tmNom);
    if (requerido === true) {
        $(tmNom).find(`input#${tipo}${id}`).prop("required", true);
    }
    return tmNom;
}
function templateCamposNommbres(id) {
    const priApe = templateNombre(
        id,
        "primerApellido",
        15,
        "Primer Apellido",
        true
    );
    const segApe = templateNombre(
        id,
        "segundoApellido",
        15,
        "Segundo Apellido"
    );

    let apeCa = templateNombre(id, "apellidoCasada", 15, "Apellido Casada");
    let tmInToltp = templateInvalidTooltip(
        "No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido."
    );
    $(apeCa).find("div.form-group").append(tmInToltp);
    validarApellidoCasada($(apeCa).find(`input#apellidoCasada${id}`));

    const priNom = templateNombre(
        id,
        "primerNombre",
        15,
        "Primer Nombre",
        true
    );
    const segNom = templateNombre(id, "segundoNombre", 15, "Segundo Nombre");
    const otNom = templateNombre(id, "otrosNombres", 30, "Otros Nombres");
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
    const templatesexo = $(`<label for="sexo${id}">Sexo</label>
                          <select name="sexo${id}" id="sexo${id}" class="form-control custom-select sexo select2" style="width: 100%" required>
                              <option value="" disabled selected>Selecciona</option>
                              <option value="M">Masculino</option>
                              <option value="F">Femenino</option>
                          </select>`);
    return templateFormGroup(templatesexo);
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
    return templateFormGroup(temEs);
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
function templateFecha(id, nombre) {
    let nombrefecha = "";
    if (nombre != "DocCaMi") {
        nombrefecha = nombre.toLowerCase();
    }
    let temCampoFecha = $(`<label>Fecha ${nombrefecha}</label>
                        <div class="input-group date" id="fecha${nombre}_${id}" data-target-input="nearest">
                            <input name="fecha${nombre}${id}" id="fecha${nombre}${id}" type="text" class="form-control datetimepicker-input" data-target="#fecha${nombre}_${id}" required />
                            <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                            <div class="input-group-append" data-target="#fecha${nombre}_${id}" data-toggle="datetimepicker">
                                <div class="input-group-text">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                        </div>`);
    let cm = templateFormGroup(temCampoFecha);
    setFormatoFecha($(cm).find("div.date"));
    return cm;
}
function templateNacionalidad(id) {
    let temNacionalidad = `
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
function templateDireccion(id) {
    let temDirec = $(`
        <div class="row">
            <div class="col-sm">
                <label>Dirección de residencia completa (calle o avenida, número de casa, colonia, sector, lote, manzana, otros)</label>
                <input name="direccionRecidencia${id}" id="direccionRecidencia${id}" type="text" class="form-control direccionRecidencia" placeholder="Dirección de residencia completa ..." maxlength="400" required />
            </div>
        </div>`);
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
             <div class="info" cantidad="0">
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
function templateMontoIngresos(id) {
    let tmMontoIngresos = ` <div class="row">
                                <div class="col-sm-9">
                                    <div class="form-group">
                                        <label for="montoIngresos${id}" class = "d-inline">Monto mensual aproximado de los ingresos considerando todas las actividades económicas a las que se dedica (monto en quetzales)</label>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <input type="number" name = "montoIngresos" id="montoIngresos${id}" class="form-control d-inline" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>
                                    </div>
                                </div>
                            </div>`;
    return tmMontoIngresos;
}
function templatePropositoRc(id) {
    let tempPropositoRc = `<div class="row">
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label for="propositoRC${id}">Propósito de la relación de negocios</label>
                                        <input name="propositoRC" id="propositoRC${id}" type="text" class="form-control" placeholder="Propósito de la relación de negocios..." maxlength="400" required />
                                    </div>
                                </div>
                            </div>`;
    return tempPropositoRc;
}
function templateInformacionEconomicaInicial(id) {
    const comMonto = templateMontoIngresos(id);
    const cmRc = templatePropositoRc(id);
    let tmInfoEcoInicial = `<div class="card card-info mt-3">
                                <div class="card-header">
                                    <h3 class="card-title">Información económica del cliente</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    ${comMonto}
                                    ${cmRc}
                                    <div id="datosfuenteingresos${id}">
                                        <div class="row">
                                            <div class="col-sm">
                                                <div class="form-group">
                                                    <label for="">Fuente de ingresos</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="fuenteingresos${id}" cantidad = "0" idinput= "">
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <div class="form-group">
                                                        <select name="selectfuenteingresos" id="selectfuenteingresos${id}_0" class="form-control custom-select select2 fuenteIngresos" style="width: 100%" required>
                                                            <option value="" disabled selected>Selecciona</option>
                                                            <option value="NP">Negocio propio</option>
                                                            <option value="RD">Relación de dependencia</option>
                                                            <option value="OI">Otras fuentes de ingreso</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col sm">
                                                    <div class="form-group row">
                                                            <div class="col-sm-2">
                                                                <label for="inputfuenteingresos${id}_0" class="ml-4" id="labelfuenteingresos${id}_0"></label>
                                                            </div>
                                                            <div class="col-sm ml-2">
                                                                <input name="inputfuenteingresos" id="inputfuenteingresos${id}_0" type="text" class="form-control" required />
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group">
                                                <button type="button" id="agregarFuenteIngresos${id}" class="btn btn-primary agregarFuenteIngresos">Agregar fuente de ingresos</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            `;
    return tmInfoEcoInicial;
}
function templateDatosPersonales(id, tipo) {
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
function templateCamposFuenteIngreo(id, posicion) {
    let temFeIg = `
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
        <div class="col sm">
            <div class="form-group row">
                    <div class="col-sm-2">
                        <label for="input${id}_${posicion}" class="ml-4" id="label${id}_${posicion}"></label>
                    </div>
                    <div class="col-sm ml-2">
                        <input name="input" id="input${id}_${posicion}" type="text" class="form-control" required />
                    </div>
            </div>
        </div>
    </div>`;
    return temFeIg;
}
function templateFilaUnoProdictoServicio(id) {
    const cmFechaProducto = templateFecha(id, "Producto");
    let tm = $(`<div class="row"></div>`);
    $(tm).append(cmFechaProducto);
    return tm;
}
function templateProductoServicio(id) {
    const rowUno = templateFilaUnoProdictoServicio(id);
    let tm = $(`
            <div class="card card-info mt-3" id="productoServicio${id}">
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
                                <select name="paisEntidad${id}" id="paisEntidad${id}" class="form-control custom-select select2" style="width: 100%;" required>
                                    <option value="" disabled selected>Selecciona</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-group">
                                <label for= "origenRiqueza${id}">Origen o procedencia de su riqueza</label>
                                <select name="origenRiqueza${id}" id="origenRiqueza${id}" class="form-control custom-select select2" style="width: 100%;" required>
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
                                    <select name="${idPadre}" id="${idSelect}" class="form-control custom-select nacionalidad select2" style="width: 100%" required>
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
            $(".select2").select2();
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
                                                <select name="parentesco${id}" id="parentesco${id}" class="form-control custom-select parentesco select2" style="width: 100%" required>
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
                                                <select name="motivoAsociacion${id}" id="motivoAsociacion${id}" class="form-control custom-select motivoAsociacion select2" style="width: 100%" required>
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
                                                <select name="condicion${id}" id="condicion${id}" class="form-control custom-select select2" style="width: 100%" required>
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
    $(".select2").select2();

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
        let posicionActual = $(this).parent().parent().parent().index();
        let divRowFntIng = $(this).parent().parent().parent().parent();
        let divIngresosActual = $(divRowFntIng).attr("id");
        let label = `#label${divIngresosActual}_${posicionActual}`;
        let input = $(`input#input${divIngresosActual}_${posicionActual}`);

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
    $(btnFuenteIngreso).click(function () {
        const divPadre = $(this).parent().parent().parent().attr("id");
        const divContenedor = $(`div#${divPadre} >div:nth-child(2)`);
        const id = $(divContenedor).attr("id");
        let posicion = $(divContenedor).attr("cantidad");
        posicion++;
        let cFuIn = templateCamposFuenteIngreo(id, posicion);
        $(divContenedor).append(cFuIn);
        $(divContenedor).attr("cantidad", posicion);
        $(`select#select${id}_${posicion}`).select2();
        validarTipoFuenteIngreso($(`select#select${id}_${posicion}`));
    });
}
function templateCalidadActua(id) {
    let cmCA = $(`
                    <div class="row mb-3"><h4>I. TIPO DE ACTUACIÓN DEL CLIENTE</h4></div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-check">
                                <div>
                                    <label>El cliente actúa en nombre propio</label>
                                </div>
                                <div class="icheck-primary d-inline">
                                    <input type="radio" id="siActua${id}" class="actuaNombrePropio" name="tipoActuacion${id}" value="C" required/>
                                    <label for="siActua${id}">Sí</label>
                                </div>
                                <div class="icheck-primary d-inline">
                                    <input type="radio" id="noActua${id}" class="actuaNombrePropio" name="tipoActuacion${id}" value="R" required />
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

    let cmFechaDoc = templateFecha(id, "DocCaMi");
    $(camposLugar).append(cmFechaDoc);

    return camposLugar;
}
function templateCamposMinimos(id, indice) {
    let cm = $(`
                <div class="card card-primary" id="${id}">
                    <div class="card-header">
                        <h3 class="card-title">Titular ${indice}</h3>
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
    let dCardBody = $(cm).find("div.card-body");
    $(dCardBody).append(templateCalidadActua(id));
    $(dCardBody).append(templateLugarCM(id));

    let cmCM = $(`<div id="camposMinimos${id}"></div>`);
    let cmClie = templateDatosPersonales(id, "cliente");
    $(cmCM).append(cmClie);
    $(dCardBody).append(cmCM);

    let cmIE = $(`<div id="informacionEconomicaIncial${id}"></div>`);
    $(dCardBody).append(cmIE);
    let cmRe = $(`<div id="representante${id}"></div>`);
    $(dCardBody).append(cmRe);
    return cm;
}
function AgregarTitular() {
    $("#btnAgregarTitular").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        let tipo = "Cliente";
        let id = $("div#titulares").attr("cantidad");
        id++;
        let idTitular = `${tipo}_${id}`;
        let templateTitular = templateCamposMinimos(idTitular, id);
        $("#titulares").append(templateTitular);
        $("div#titulares").attr("cantidad", id);
    });
}
function agregarProductoServicio(poservicio) {
    $(poservicio).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("agregando producto");
        let indexProducto = $("div#datosProductoServicio").attr("cantidad");
        indexProducto++;
        let cmProductoServicio = templateProductoServicio(indexProducto);
        $("div#datosProductoServicio").append(cmProductoServicio);
        $("div#datosProductoServicio").attr("cantidad", indexProducto);
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
    constructor() {
        this.tipoActuacion = null;
        this.calidadActua = null;
        this.lugar = new dicLugar();
        this.fecha = null;
        this.cliente = new dicDatosPersonales();
        this.representante = new dicDatosPersonales();
        this.infoEconomicaInical = new informacionEconomicaInicial();
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
                enviarDatos();
                if (form.checkValidity() === false) {
                    form.classList.add("was-validated");
                } else {
                    console.log("enviando formulario");
                    mostrarModal();
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
function eliminarCard(card) {
    for (let i = 0; i < card.length; i++) {
        $(card[i]).on("removed.lte.cardwidget", function (event) {
            let cardActual = $(event.target).parent().parent().parent();
            $(cardActual).remove();
        });
    }
}
function obtenerDatosPersonales(divPadre, id) {
    console.log(divPadre);
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
function obtenerDatosInfoEconomica(infoEconomica, id) {
    let infoEc = new informacionEconomicaInicial();
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
            console.log($(this).find(`input`).val());
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
        if (titular.lugar.pais === "1") {
            titular.lugar.departamento = $(divTitularActual)
                .find(`select[id=deptoCaMi${id}] option:selected`)
                .val();
            titular.lugar.municipio = $(divTitularActual)
                .find(`select[id=muniCaMi${id}] option:selected`)
                .val();
        }
        titular.fecha = $(divTitularActual)
            .find(`input:text[id=fechaDocCaMi${id}]`)
            .val();
        let daPeCliente = $(divTitularActual).find(`div#camposMinimos${id}`);
        titular.cliente = obtenerDatosPersonales(daPeCliente, id);
        if (titular.tipoActuacion === "R") {
            titular.calidadActua = $(divTitularActual)
                .find(`input:text[id=calidadActua${id}]`)
                .val();
            let daPeRepre = $(divTitularActual).find(`div#representante${id}`);
            titular.representante = obtenerDatosPersonales(
                daPeRepre,
                `Representante${id}`
            );
        }
        const divInfoEconomica = $(divTitularActual).find(
            `div#informacionEconomicaIncial${id}`
        );
        titular.infoEconomicaInical = obtenerDatosInfoEconomica(
            divInfoEconomica,
            id
        );
        df.agregarTitular(titular);
    }
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
    noEnviarFormularioConEnter();
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
    validarTipoFuenteIngreso($("select.fuenteIngresos"));
    agregarTemplateFuenteIngresos($("button.agregarFuenteIngresos"));
    AgregarTitular();
    eliminarCard($("#titulares>div"));
    agregarProductoServicio($("button.agregarProductoServicio"));
    validarFormulario();
});
