function getObjetoJson(callback, urlDc) {
    $.get(`${urlDc}`, function (res, sta) {
        callback(res);
    });
}
function descargarObjetoJson(exportObj, exportName) {
    var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
function btnDescargarJson() {
    $("button.btnDescargarJson").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let urlDc = $(this).parent().attr("href");
        getObjetoJson(function (res) {
            console.log(res);
            let nombre = `${res.titulares[0].cliente.primerNombre}${res.titulares[0].cliente.primerApellido} `;
            descargarObjetoJson(res, nombre);
        }, urlDc);
    });
}
$(document).ready(function () {
    console.log("archivo cargado correctamente desde archivo descargarjson");
    btnDescargarJson();
});
