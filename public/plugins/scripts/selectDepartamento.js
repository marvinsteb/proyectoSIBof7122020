function verificaActuaNombrePropio () {
  var elementoActuaNomprePropio = $('.actuaNombrePropio');
  for (var i = 0; i < elementoActuaNomprePropio.length -1 ; i++){
    $(elementoActuaNomprePropio[i]).change(function () {
          if(this.value === 'C'){
            elementoActuaNomprePropio[2].disabled = true;
            elementoActuaNomprePropio[2].value = "";
            elementoActuaNomprePropio[2].required = false;
        } else if(this.value === 'R') {
            elementoActuaNomprePropio[2].disabled = false;
            elementoActuaNomprePropio[2].required = true;
            console.log('mostrar el form del representante');
          /* implementa el formulario para datos del representante */
        }        
    });
  }
}

function cargarMunicipio(){
      $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $(".departamento").change(event => {	    
    $.get(`/departamentos/municipios/${event.target.value}`, function(res, sta){
      console.log(res);
 
      // $(".idmodelo").empty();
      // $("#idmodelo").append('<option value="" disabled selected>Selecciona</option>');
      // res.forEach(element => {
      //   $("#idmodelo").append(`<option value=${element.idmodelo}> ${element.modelo} </option>`);
      // });

    }
    
    );
  });
}

function habilitaCamposPaisDepartamento() {

  var selectPais = $(".pais");
      for (var i = 0; i < selectPais.length; i++) {
        $(selectPais[i]).change(function(){
        //convertir el id a clase antes de obtener los selects departamento y municipio que contengan dicha clase
          var clasePais = `.${this.id.toString()}`
          var departamentoMunicipio = $(clasePais);
             if(this.value === 'GT'){
                 departamentoMunicipio[0].disabled = false;
                 departamentoMunicipio[1].disabled = false;
                 /* hacer la implementacion de llenado de municipios por departamento*/
             }else{
                 departamentoMunicipio[0].disabled = true;
                 departamentoMunicipio[0].value = 0;
                 departamentoMunicipio[1].disabled = true;
                 departamentoMunicipio[1].value = 0;
             } 
        });
      }

} 

  $(document).ready(function(){
    console.log("Esperando a que la pagina cargue completamente ");
    verificaActuaNombrePropio ();
    habilitaCamposPaisDepartamento();
    cargarMunicipio();
  });


  