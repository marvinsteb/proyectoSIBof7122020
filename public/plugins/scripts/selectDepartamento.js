function verificaActuaNombrePropio() {
    var elementoActuaNomprePropio = $(".actuaNombrePropio");
    console.log(elementoActuaNomprePropio);
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

function cargarMunicipio() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
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

function habilitaCamposPaisDepartamento() {
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
    console.log(radioClientePep);
    for (let i = 0; i < radioClientePep.length; i++) {
        $(radioClientePep[i]).change(function () {
            if (this.value != "N") {
                $(".datosPepCLiente").append("<p>Test</p>");
            } else {
                $(".datosPepCLiente p").remove();
            }
        });
    }
}

$(document).ready(function () {
    console.log("Esperando a que la pagina cargue completamente ");
    verificaActuaNombrePropio();
    habilitaCamposPaisDepartamento();
    cargarMunicipio();
    verificarClientePep();
});
