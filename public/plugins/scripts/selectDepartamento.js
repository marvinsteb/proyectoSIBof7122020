(function () {
    "use strict";
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Esperando a que la pagina cargue completamente ");
      var selectPais = document.getElementsByClassName("pais");

      var elementoActuaNomprePropio = document.getElementsByClassName('actuaNombrePropio');
      console.log(elementoActuaNomprePropio);
      for (var i = 0; i < elementoActuaNomprePropio.length -1 ; i++){
        elementoActuaNomprePropio[i].addEventListener('change',function(){
            if(this.value === 'C'){
                elementoActuaNomprePropio[2].disabled = true;
                elementoActuaNomprePropio[2].value = "";
            } else if(this.value === 'R') {
                elementoActuaNomprePropio[2].disabled = false;
                console.log('mostrar el form del representante');
              /* implementa el formulario para datos del representante */
            }
        }); 
      }
      for (var i = 0; i < selectPais.length; i++) {
        selectPais[i].addEventListener('change', function () {
            if(this.value === 'GT'){
                console.log('habilitar departamento y municipio');
                this.id
            }else{
                console.log('deshabilidar departamento y municipio'),
            }
        });
      }

      
    }); // dom content loaded
  })();