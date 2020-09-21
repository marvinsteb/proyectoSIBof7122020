(function () {
    "use strict";
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Esperando a que la pagina cargue completamente ");
     

      var elementoActuaNomprePropio = document.getElementsByClassName('actuaNombrePropio');
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

      var selectPais = document.getElementsByClassName("pais");
      for (var i = 0; i < selectPais.length; i++) {
        selectPais[i].addEventListener('change', function () {
            var departamentoMunicipio = document.getElementsByClassName(this.id);
            if(this.value === 'GT'){
                departamentoMunicipio[0].disabled = false;
                departamentoMunicipio[1].disabled = false;
                /* hacer la implementacion de llenado de municipios por departamento*/
            }else{
                departamentoMunicipio[0].disabled = true;
                departamentoMunicipio[1].disabled = true;
            }
        });
      }
      

      
    }); // dom content loaded
  })();