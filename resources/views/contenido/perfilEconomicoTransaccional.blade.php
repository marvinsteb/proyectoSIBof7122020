<div class="row">
  <div class="col-sm">
    <div class="form-group">
      <label for="actualizacionPet">Tipo ingreso</label>
      <select name="actualizacionPet" id="actualizacionPet" class="form-control custom-select actualizacionPet select2" style="width: 100%" required>
        <option value="" disabled="" selected="">Selecciona</option>
        <option value="I" {{$perfil->actualizacion == 'I' ? 'selected' : ''}}>Perfil inicial</option>
        <option value="A" {{$perfil->actualizacion == 'A' ? 'selected' : ''}}>Actualización de perfil</option>
      </select>
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label>Fecha</label>
      <div class="input-group date" id="fechaPet_" data-target-input="nearest">
        <input name="fechaPet" id="fechaPet" type="text" class="form-control Pet datetimepicker-input" data-target="#fechaPet_" required value="{{\Carbon\Carbon::parse($perfil->fecha)->format('d/m/Y')}}">
        <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
        <div class="input-group-append" data-target="#fechaPet_" data-toggle="datetimepicker">
          <div class="input-group-text">
            <i class="fa fa-calendar"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="datosNegocioPropio col-sm-12" id="datosNegocioPropio" cantidad="1">
    <div class="card card-info mt-3" id="negocioPropio_1">
      <div class="card-header">
        <h3 class="card-title">Negocio propio 1</h3>
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
        <div class="row">
          <div class="col-sm">
            <div class="form-group">
              <label>Nombre comercial</label>
              <input name="nombreComercial1" id="nombreComercial1" type="text" class="form-control nombreComercial" placeholder="Nombre comercial ..." maxlength="400" required=""></div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="form-group">
              <label>Principal actividad económica</label>
              <input name="principalActividadEconomica1" id="principalActividadEconomica1" type="text" class="form-control principalActividadEconomica" placeholder="Principal actividad económica ..." maxlength="200" required=""></div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Fecha Fecha de inscripción del negocio</label>
              <div class="input-group date" id="fechaInscripcionNegocio_1" data-target-input="nearest">
                <input name="fechaInscripcionNegocio1" id="fechaInscripcionNegocio1" type="text" class="form-control InscripcionNegocio datetimepicker-input" data-target="#fechaInscripcionNegocio_1">
                <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                <div class="input-group-append" data-target="#fechaInscripcionNegocio_1" data-toggle="datetimepicker">
                  <div class="input-group-text">
                    <i class="fa fa-calendar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group">
              <h2>Patente de comercio de empresa</h2>
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Número de registro</label>
              <input name="numeroRegistro1" id="numeroRegistro1" type="number" class="form-control numeroRegistro" placeholder="Número de registro ..." maxlength="15"></div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Folio</label>
              <input name="folio1" id="folio1" type="number" class="form-control folio" placeholder="Folio ..." maxlength="15"></div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Libro</label>
              <input name="libro1" id="libro1" type="number" class="form-control libro" placeholder="Libro ..." maxlength="15"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <label>Dirección negocio</label>
            <input name="direccionNegocio1" id="direccionNegocio1" type="text" class="form-control direccion" placeholder="Dirección..." maxlength="400" required="">
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="form-group">
              <label for="paisPet1">País</label>
              <select name="paisPet1" id="paisPet1" class="form-control custom-select pais deshabilitaDepartamentoMunicipio setPais select2 select2-hidden-accessible" style="width: 100%" required="" data-select2-id="paisPet1" tabindex="-1" aria-hidden="true">
                <option value="" disabled="" selected="" data-select2-id="224">Selecciona</option>
                <option value="1" data-select2-id="232"> Guatemala </option>
                <option value="2" data-select2-id="233"> Afganistán </option>
                <option value="3" data-select2-id="234"> Åland </option>
                <option value="4" data-select2-id="235"> Albania </option>
                <option value="5" data-select2-id="236"> Alemania </option>
                <option value="6" data-select2-id="237"> Andorra </option>
                <option value="7" data-select2-id="238"> Angola </option>
                <option value="8" data-select2-id="239"> Anguila </option>
                <option value="9" data-select2-id="240"> Antártida </option>
                <option value="10" data-select2-id="241"> Antigua y Barbuda </option>
                <option value="11" data-select2-id="242"> Arabia Saudita </option>
                <option value="12" data-select2-id="243"> Argelia </option>
                <option value="13" data-select2-id="244"> Argentina </option>
                <option value="14" data-select2-id="245"> Armenia </option>
                <option value="15" data-select2-id="246"> Aruba </option>
                <option value="16" data-select2-id="247"> Australia </option>
                <option value="17" data-select2-id="248"> Austria </option>
                <option value="18" data-select2-id="249"> Azerbaiyán </option>
                <option value="19" data-select2-id="250"> Bahamas </option>
                <option value="20" data-select2-id="251"> Bangladés </option>
                <option value="21" data-select2-id="252"> Barbados </option>
                <option value="22" data-select2-id="253"> Baréin </option>
                <option value="23" data-select2-id="254"> Bélgica </option>
                <option value="24" data-select2-id="255"> Belice </option>
                <option value="25" data-select2-id="256"> Benín </option>
                <option value="26" data-select2-id="257"> Bermudas </option>
                <option value="27" data-select2-id="258"> Bielorrusia </option>
                <option value="28" data-select2-id="259"> Birmania </option>
                <option value="29" data-select2-id="260"> Bolivia </option>
                <option value="30" data-select2-id="261"> Bonaire </option>
                <option value="31" data-select2-id="262"> Bosnia y Herzegovina </option>
                <option value="32" data-select2-id="263"> Botsuana </option>
                <option value="33" data-select2-id="264"> Brasil </option>
                <option value="34" data-select2-id="265"> Brunéi </option>
                <option value="35" data-select2-id="266"> Bulgaria </option>
                <option value="36" data-select2-id="267"> Burkina Faso </option>
                <option value="37" data-select2-id="268"> Burundi </option>
                <option value="38" data-select2-id="269"> Bután </option>
                <option value="39" data-select2-id="270"> Cabo Verde </option>
                <option value="40" data-select2-id="271"> Camboya </option>
                <option value="41" data-select2-id="272"> Camerún </option>
                <option value="42" data-select2-id="273"> Canadá </option>
                <option value="43" data-select2-id="274"> Catar </option>
                <option value="44" data-select2-id="275"> Chad </option>
                <option value="45" data-select2-id="276"> Chile </option>
                <option value="46" data-select2-id="277"> China </option>
                <option value="47" data-select2-id="278"> Chipre </option>
                <option value="48" data-select2-id="279"> Ciudad del Vaticano </option>
                <option value="49" data-select2-id="280"> Colombia </option>
                <option value="50" data-select2-id="281"> Comoras </option>
                <option value="51" data-select2-id="282"> Corea del Norte </option>
                <option value="52" data-select2-id="283"> Corea del Sur </option>
                <option value="53" data-select2-id="284"> Costa de Marfil </option>
                <option value="54" data-select2-id="285"> Costa Rica </option>
                <option value="55" data-select2-id="286"> Croacia </option>
                <option value="56" data-select2-id="287"> Cuba </option>
                <option value="57" data-select2-id="288"> Curazao </option>
                <option value="58" data-select2-id="289"> Dinamarca </option>
                <option value="59" data-select2-id="290"> Dominica </option>
                <option value="60" data-select2-id="291"> Ecuador </option>
                <option value="61" data-select2-id="292"> Egipto </option>
                <option value="62" data-select2-id="293"> El Salvador </option>
                <option value="63" data-select2-id="294"> Emiratos Árabes Unidos </option>
                <option value="64" data-select2-id="295"> Eritrea </option>
                <option value="65" data-select2-id="296"> Eslovaquia </option>
                <option value="66" data-select2-id="297"> Eslovenia </option>
                <option value="67" data-select2-id="298"> España </option>
                <option value="68" data-select2-id="299"> Estados Unidos </option>
                <option value="69" data-select2-id="300"> Estonia </option>
                <option value="70" data-select2-id="301"> Etiopía </option>
                <option value="71" data-select2-id="302"> Filipinas </option>
                <option value="72" data-select2-id="303"> Finlandia </option>
                <option value="73" data-select2-id="304"> Fiyi </option>
                <option value="74" data-select2-id="305"> Francia </option>
                <option value="75" data-select2-id="306"> Gabón </option>
                <option value="76" data-select2-id="307"> Gambia </option>
                <option value="77" data-select2-id="308"> Georgia </option>
                <option value="78" data-select2-id="309"> Ghana </option>
                <option value="79" data-select2-id="310"> Gibraltar </option>
                <option value="80" data-select2-id="311"> Granada </option>
                <option value="81" data-select2-id="312"> Grecia </option>
                <option value="82" data-select2-id="313"> Groenlandia </option>
                <option value="83" data-select2-id="314"> Guadalupe </option>
                <option value="84" data-select2-id="315"> Guam </option>
                <option value="85" data-select2-id="316"> Guayana Francesa </option>
                <option value="86" data-select2-id="317"> Guernsey </option>
                <option value="87" data-select2-id="318"> Guinea </option>
                <option value="88" data-select2-id="319"> Guinea Ecuatorial </option>
                <option value="89" data-select2-id="320"> Guinea-Bisáu </option>
                <option value="90" data-select2-id="321"> Guyana </option>
                <option value="91" data-select2-id="322"> Haití </option>
                <option value="92" data-select2-id="323"> Honduras </option>
                <option value="93" data-select2-id="324"> Hong Kong </option>
                <option value="94" data-select2-id="325"> Hungría </option>
                <option value="95" data-select2-id="326"> India </option>
                <option value="96" data-select2-id="327"> Indonesia </option>
                <option value="97" data-select2-id="328"> Irak </option>
                <option value="98" data-select2-id="329"> Irán </option>
                <option value="99" data-select2-id="330"> Irlanda </option>
                <option value="100" data-select2-id="331"> Isla Bouvet </option>
                <option value="101" data-select2-id="332"> Isla de Man </option>
                <option value="102" data-select2-id="333"> Isla de Navidad </option>
                <option value="103" data-select2-id="334"> Isla Norfolk </option>
                <option value="104" data-select2-id="335"> Islandia </option>
                <option value="105" data-select2-id="336"> Islas Caimán </option>
                <option value="106" data-select2-id="337"> Islas Cocos </option>
                <option value="107" data-select2-id="338"> Islas Cook </option>
                <option value="108" data-select2-id="339"> Islas Feroe </option>
                <option value="109" data-select2-id="340"> Islas Georgias del Sur y Sandwich del Sur </option>
                <option value="110" data-select2-id="341"> Islas Heard y McDonald </option>
                <option value="111" data-select2-id="342"> Islas Malvinas </option>
                <option value="112" data-select2-id="343"> Islas Marianas del Norte </option>
                <option value="113" data-select2-id="344"> Islas Marshall </option>
                <option value="114" data-select2-id="345"> Islas Pitcairn </option>
                <option value="115" data-select2-id="346"> Islas Salomón </option>
                <option value="116" data-select2-id="347"> Islas Turcas y Caicos </option>
                <option value="117" data-select2-id="348"> Islas Ultramarinas Menores de los Estados Unidos </option>
                <option value="118" data-select2-id="349"> Islas Vírgenes Americanas </option>
                <option value="119" data-select2-id="350"> Islas Vírgenes Británicas </option>
                <option value="120" data-select2-id="351"> Israel </option>
                <option value="121" data-select2-id="352"> Italia </option>
                <option value="122" data-select2-id="353"> Jamaica </option>
                <option value="123" data-select2-id="354"> Japón </option>
                <option value="124" data-select2-id="355"> Jersey </option>
                <option value="125" data-select2-id="356"> Jordania </option>
                <option value="126" data-select2-id="357"> Kazajistán </option>
                <option value="127" data-select2-id="358"> Kenia </option>
                <option value="128" data-select2-id="359"> Kirguistán </option>
                <option value="129" data-select2-id="360"> Kiribati </option>
                <option value="130" data-select2-id="361"> Kuwait </option>
                <option value="131" data-select2-id="362"> Laos </option>
                <option value="132" data-select2-id="363"> Lesoto </option>
                <option value="133" data-select2-id="364"> Letonia </option>
                <option value="134" data-select2-id="365"> Líbano </option>
                <option value="135" data-select2-id="366"> Liberia </option>
                <option value="136" data-select2-id="367"> Libia </option>
                <option value="137" data-select2-id="368"> Liechtenstein </option>
                <option value="138" data-select2-id="369"> Lituania </option>
                <option value="139" data-select2-id="370"> Luxemburgo </option>
                <option value="140" data-select2-id="371"> Macao </option>
                <option value="141" data-select2-id="372"> Macedonia del Norte </option>
                <option value="142" data-select2-id="373"> Madagascar </option>
                <option value="143" data-select2-id="374"> Malasia </option>
                <option value="144" data-select2-id="375"> Malaui </option>
                <option value="145" data-select2-id="376"> Maldivas </option>
                <option value="146" data-select2-id="377"> Malí </option>
                <option value="147" data-select2-id="378"> Malta </option>
                <option value="148" data-select2-id="379"> Marruecos </option>
                <option value="149" data-select2-id="380"> Martinica </option>
                <option value="150" data-select2-id="381"> Mauricio </option>
                <option value="151" data-select2-id="382"> Mauritania </option>
                <option value="152" data-select2-id="383"> Mayotte </option>
                <option value="153" data-select2-id="384"> México </option>
                <option value="154" data-select2-id="385"> Micronesia </option>
                <option value="155" data-select2-id="386"> Moldavia </option>
                <option value="156" data-select2-id="387"> Mónaco </option>
                <option value="157" data-select2-id="388"> Mongolia </option>
                <option value="158" data-select2-id="389"> Montenegro </option>
                <option value="159" data-select2-id="390"> Montserrat </option>
                <option value="160" data-select2-id="391"> Mozambique </option>
                <option value="161" data-select2-id="392"> Namibia </option>
                <option value="162" data-select2-id="393"> Nauru </option>
                <option value="163" data-select2-id="394"> Nepal </option>
                <option value="164" data-select2-id="395"> Nicaragua </option>
                <option value="165" data-select2-id="396"> Níger </option>
                <option value="166" data-select2-id="397"> Nigeria </option>
                <option value="167" data-select2-id="398"> Niue </option>
                <option value="168" data-select2-id="399"> Noruega </option>
                <option value="169" data-select2-id="400"> Nueva Caledonia </option>
                <option value="170" data-select2-id="401"> Nueva Zelanda </option>
                <option value="171" data-select2-id="402"> Omán </option>
                <option value="172" data-select2-id="403"> Países Bajos </option>
                <option value="173" data-select2-id="404"> Pakistán </option>
                <option value="174" data-select2-id="405"> Palaos </option>
                <option value="175" data-select2-id="406"> Palestina </option>
                <option value="176" data-select2-id="407"> Panamá </option>
                <option value="177" data-select2-id="408"> Papúa Nueva Guinea </option>
                <option value="178" data-select2-id="409"> Paraguay </option>
                <option value="179" data-select2-id="410"> Perú </option>
                <option value="180" data-select2-id="411"> Polinesia Francesa </option>
                <option value="181" data-select2-id="412"> Polonia </option>
                <option value="182" data-select2-id="413"> Portugal </option>
                <option value="183" data-select2-id="414"> Puerto Rico </option>
                <option value="184" data-select2-id="415"> Reino Unido </option>
                <option value="185" data-select2-id="416"> República Árabe Saharaui Democrática </option>
                <option value="186" data-select2-id="417"> República Centroafricana </option>
                <option value="187" data-select2-id="418"> República Checa </option>
                <option value="188" data-select2-id="419"> República del Congo </option>
                <option value="189" data-select2-id="420"> República Democrática del Congo </option>
                <option value="190" data-select2-id="421"> República Dominicana </option>
                <option value="191" data-select2-id="422"> Reunión </option>
                <option value="192" data-select2-id="423"> Ruanda </option>
                <option value="193" data-select2-id="424"> Rumania </option>
                <option value="194" data-select2-id="425"> Rusia </option>
                <option value="195" data-select2-id="426"> Samoa </option>
                <option value="196" data-select2-id="427"> Samoa Americana </option>
                <option value="197" data-select2-id="428"> San Bartolomé </option>
                <option value="198" data-select2-id="429"> San Cristóbal y Nieves </option>
                <option value="199" data-select2-id="430"> San Marino </option>
                <option value="200" data-select2-id="431"> San Martín </option>
                <option value="201" data-select2-id="432"> San Martín </option>
                <option value="202" data-select2-id="433"> San Pedro y Miquelón </option>
                <option value="203" data-select2-id="434"> San Vicente y las Granadinas </option>
                <option value="204" data-select2-id="435"> Santa Elena </option>
                <option value="205" data-select2-id="436"> Santa Lucía </option>
                <option value="206" data-select2-id="437"> Santo Tomé y Príncipe </option>
                <option value="207" data-select2-id="438"> Senegal </option>
                <option value="208" data-select2-id="439"> Serbia </option>
                <option value="209" data-select2-id="440"> Seychelles </option>
                <option value="210" data-select2-id="441"> Sierra Leona </option>
                <option value="211" data-select2-id="442"> Singapur </option>
                <option value="212" data-select2-id="443"> Siria </option>
                <option value="213" data-select2-id="444"> Somalia </option>
                <option value="214" data-select2-id="445"> Sri Lanka </option>
                <option value="215" data-select2-id="446"> Suazilandia </option>
                <option value="216" data-select2-id="447"> Sudáfrica </option>
                <option value="217" data-select2-id="448"> Sudán </option>
                <option value="218" data-select2-id="449"> Sudán del Sur </option>
                <option value="219" data-select2-id="450"> Suecia </option>
                <option value="220" data-select2-id="451"> Suiza </option>
                <option value="221" data-select2-id="452"> Surinam </option>
                <option value="222" data-select2-id="453"> Svalbard y Jan Mayen </option>
                <option value="223" data-select2-id="454"> Tailandia </option>
                <option value="224" data-select2-id="455"> Taiwán (República de China) </option>
                <option value="225" data-select2-id="456"> Tanzania </option>
                <option value="226" data-select2-id="457"> Tayikistán </option>
                <option value="227" data-select2-id="458"> Territorio Británico del Océano Índico </option>
                <option value="228" data-select2-id="459"> Tierras Australes y Antárticas Francesas </option>
                <option value="229" data-select2-id="460"> Timor Oriental </option>
                <option value="230" data-select2-id="461"> Togo </option>
                <option value="231" data-select2-id="462"> Tokelau </option>
                <option value="232" data-select2-id="463"> Tonga </option>
                <option value="233" data-select2-id="464"> Trinidad y Tobago </option>
                <option value="234" data-select2-id="465"> Túnez </option>
                <option value="235" data-select2-id="466"> Turkmenistán </option>
                <option value="236" data-select2-id="467"> Turquía </option>
                <option value="237" data-select2-id="468"> Tuvalu </option>
                <option value="238" data-select2-id="469"> Ucrania </option>
                <option value="239" data-select2-id="470"> Uganda </option>
                <option value="240" data-select2-id="471"> Uruguay </option>
                <option value="241" data-select2-id="472"> Uzbekistán </option>
                <option value="242" data-select2-id="473"> Vanuatu </option>
                <option value="243" data-select2-id="474"> Venezuela </option>
                <option value="244" data-select2-id="475"> Vietnam </option>
                <option value="245" data-select2-id="476"> Wallis y Futuna </option>
                <option value="246" data-select2-id="477"> Yemen </option>
                <option value="247" data-select2-id="478"> Yibuti </option>
                <option value="248" data-select2-id="479"> Zambia </option>
                <option value="249" data-select2-id="480"> Zimbabue </option>
              </select><span class="select2 select2-container select2-container--default select2-container--below" dir="ltr" data-select2-id="223" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-paisPet1-container"><span class="select2-selection__rendered" id="select2-paisPet1-container" role="textbox" aria-readonly="true" title=" Guatemala "> Guatemala </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Departamento</label>
              <select name="deptoPet1" id="deptoPet1" class="form-control custom-select depto getMunicipio setDepartamento select2 select2-hidden-accessible" style="width: 100%" required="" data-select2-id="deptoPet1" tabindex="-1" aria-hidden="true">
                <option value="" disabled="" selected="" data-select2-id="226">Selecciona</option>
                <option value="01" data-select2-id="483"> GUATEMALA </option>
                <option value="02" data-select2-id="484"> SACATEPÉQUEZ </option>
                <option value="03" data-select2-id="485"> CHIMALTENANGO </option>
                <option value="04" data-select2-id="486"> EL PROGRESO </option>
                <option value="05" data-select2-id="487"> ESCUINTLA </option>
                <option value="06" data-select2-id="488"> SANTA ROSA </option>
                <option value="07" data-select2-id="489"> SOLOLÁ </option>
                <option value="08" data-select2-id="490"> TOTONICAPÁN </option>
                <option value="09" data-select2-id="491"> QUETZALTENANGO </option>
                <option value="10" data-select2-id="492"> SUCHITEPÉQUEZ </option>
                <option value="11" data-select2-id="493"> RETALHULEU </option>
                <option value="12" data-select2-id="494"> SAN MARCOS </option>
                <option value="13" data-select2-id="495"> HUEHUETENANGO </option>
                <option value="14" data-select2-id="496"> EL QUICHÉ </option>
                <option value="15" data-select2-id="497"> BAJA VERAPAZ </option>
                <option value="16" data-select2-id="498"> ALTA VERAPAZ </option>
                <option value="17" data-select2-id="499"> PETÉN </option>
                <option value="18" data-select2-id="500"> IZABAL </option>
                <option value="19" data-select2-id="501"> ZACAPA </option>
                <option value="20" data-select2-id="502"> CHIQUIMULA </option>
                <option value="21" data-select2-id="503"> JALAPA </option>
                <option value="22" data-select2-id="504"> JUTIAPA </option>
              </select><span class="select2 select2-container select2-container--default select2-container--below" dir="ltr" data-select2-id="225" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-deptoPet1-container"><span class="select2-selection__rendered" id="select2-deptoPet1-container" role="textbox" aria-readonly="true" title=" GUATEMALA "> GUATEMALA </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <label>Municipio</label>
              <select name="muniPet1" id="muniPet1" class="form-control custom-select muni setMunicipio select2 select2-hidden-accessible" style="width: 100%" required="" data-select2-id="muniPet1" tabindex="-1" aria-hidden="true">
                <option value="" disabled="" selected="" data-select2-id="506">Selecciona</option>
                <option value="1" data-select2-id="508"> GUATEMALA </option>
                <option value="2" data-select2-id="509"> SANTA CATARINA PINULA </option>
                <option value="3" data-select2-id="510"> SAN JOSÉ PINULA </option>
                <option value="4" data-select2-id="511"> SAN JOSÉ DEL GOLFO </option>
                <option value="5" data-select2-id="512"> PALENCIA </option>
                <option value="6" data-select2-id="513"> CHINAUTLA </option>
                <option value="7" data-select2-id="514"> SAN PEDRO AYAMPUC </option>
                <option value="8" data-select2-id="515"> MIXCO </option>
                <option value="9" data-select2-id="516"> SAN PEDRO SACATEPÉQUEZ </option>
                <option value="10" data-select2-id="517"> SAN JUAN SACATEPÉQUEZ </option>
                <option value="11" data-select2-id="518"> SAN RAYMUNDO </option>
                <option value="12" data-select2-id="519"> CHUARRANCHO </option>
                <option value="13" data-select2-id="520"> FRAIJANES </option>
                <option value="14" data-select2-id="521"> AMATITLÁN </option>
                <option value="15" data-select2-id="522"> VILLA NUEVA </option>
                <option value="16" data-select2-id="523"> VILLA CANALES </option>
                <option value="17" data-select2-id="524"> SAN MIGUEL PETAPA </option>
              </select><span class="select2 select2-container select2-container--default select2-container--below" dir="ltr" data-select2-id="227" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-muniPet1-container"><span class="select2-selection__rendered" id="select2-muniPet1-container" role="textbox" aria-readonly="true" title=" SANTA CATARINA PINULA "> SANTA CATARINA PINULA </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <div class="form-group">
              <label for="moneda1">Moneda</label>
              <select name="moneda" id="moneda1" class="form-control custom-select moneda select2 select2-hidden-accessible" style="width: 100%" required="" data-select2-id="moneda1" tabindex="-1" aria-hidden="true">
                <option value="" disabled="" selected="" data-select2-id="230">Selecciona</option>
                <option value="1" data-select2-id="527">GTQ-QUETZAL</option>
                <option value="2" data-select2-id="528">AED-DÍRHAM DE LOS EMIRATOS ÁRABES UNIDOS</option>
                <option value="3" data-select2-id="529">AFN-AFGANI</option>
                <option value="4" data-select2-id="530">ALL-LEK</option>
                <option value="5" data-select2-id="531">AMD-DRAM ARMENIO</option>
                <option value="6" data-select2-id="532">ANG-FLORÍN ANTILLANO NEERLANDÉS</option>
                <option value="7" data-select2-id="533">AOA-KWANZA</option>
                <option value="8" data-select2-id="534">ARS-PESO ARGENTINO</option>
                <option value="9" data-select2-id="535">AUD-DÓLAR AUSTRALIANO</option>
                <option value="10" data-select2-id="536">AWG-FLORÍN ARUBEÑO</option>
                <option value="11" data-select2-id="537">AZN-MANAT AZERBAIYANO</option>
                <option value="12" data-select2-id="538">BAM-MARCO CONVERTIBLE</option>
                <option value="13" data-select2-id="539">BBD-DÓLAR BARBADENSE</option>
                <option value="14" data-select2-id="540">BDT-TAKA</option>
                <option value="15" data-select2-id="541">BGN-LEV BÚLGARO</option>
                <option value="16" data-select2-id="542">BHD-DINAR BAREINÍ</option>
                <option value="17" data-select2-id="543">BIF-FRANCO DE BURUNDI</option>
                <option value="18" data-select2-id="544">BMD-DÓLAR BERMUDEÑO</option>
                <option value="19" data-select2-id="545">BND-DÓLAR DE BRUNÉI</option>
                <option value="20" data-select2-id="546">BOB-BOLIVIANO</option>
                <option value="21" data-select2-id="547">BOV-MVDOL</option>
                <option value="22" data-select2-id="548">BRL-REAL BRASILEÑO</option>
                <option value="23" data-select2-id="549">BSD-DÓLAR BAHAMEÑO</option>
                <option value="24" data-select2-id="550">BTN-NGULTRUM</option>
                <option value="25" data-select2-id="551">BWP-PULA</option>
                <option value="26" data-select2-id="552">BYN-RUBLO BIELORRUSO</option>
                <option value="27" data-select2-id="553">BZD-DÓLAR BELICEÑO</option>
                <option value="28" data-select2-id="554">CAD-DÓLAR CANADIENSE</option>
                <option value="29" data-select2-id="555">CDF-FRANCO CONGOLEÑO</option>
                <option value="30" data-select2-id="556">CHE-EURO&nbsp;WIR</option>
                <option value="31" data-select2-id="557">CHF-FRANCO SUIZO</option>
                <option value="32" data-select2-id="558">CHW-FRANCO&nbsp;WIR</option>
                <option value="33" data-select2-id="559">CLF-UNIDAD DE FOMENTO</option>
                <option value="34" data-select2-id="560">CLP-PESO CHILENO</option>
                <option value="35" data-select2-id="561">CNY-YUAN CHINO</option>
                <option value="36" data-select2-id="562">COP-PESO COLOMBIANO</option>
                <option value="37" data-select2-id="563">COU-UNIDAD DE VALOR REAL</option>
                <option value="38" data-select2-id="564">CRC-COLÓN COSTARRICENSE</option>
                <option value="39" data-select2-id="565">CUC-PESO CONVERTIBLE</option>
                <option value="40" data-select2-id="566">CUP-PESO CUBANO</option>
                <option value="41" data-select2-id="567">CVE-ESCUDO CABOVERDIANO</option>
                <option value="42" data-select2-id="568">CZK-CORONA CHECA</option>
                <option value="43" data-select2-id="569">DJF-FRANCO YIBUTIANO</option>
                <option value="44" data-select2-id="570">DKK-CORONA DANESA</option>
                <option value="45" data-select2-id="571">DOP-PESO DOMINICANO</option>
                <option value="46" data-select2-id="572">DZD-DINAR ARGELINO</option>
                <option value="47" data-select2-id="573">EGP-LIBRA EGIPCIA</option>
                <option value="48" data-select2-id="574">ERN-NAKFA</option>
                <option value="49" data-select2-id="575">ETB-BIRR ETÍOPE</option>
                <option value="50" data-select2-id="576">EUR-EURO</option>
                <option value="51" data-select2-id="577">FJD-DÓLAR FIYIANO</option>
                <option value="52" data-select2-id="578">FKP-LIBRA MALVINENSE</option>
                <option value="53" data-select2-id="579">GBP-LIBRA ESTERLINA</option>
                <option value="54" data-select2-id="580">GEL-LARI</option>
                <option value="55" data-select2-id="581">GHS-CEDI GHANÉS</option>
                <option value="56" data-select2-id="582">GIP-LIBRA DE GIBRALTAR</option>
                <option value="57" data-select2-id="583">GMD-DALASI</option>
                <option value="58" data-select2-id="584">GNF-FRANCO GUINEANO</option>
                <option value="59" data-select2-id="585">GYD-DÓLAR GUYANÉS</option>
                <option value="60" data-select2-id="586">HKD-DÓLAR DE HONG KONG</option>
                <option value="61" data-select2-id="587">HNL-LEMPIRA</option>
                <option value="62" data-select2-id="588">HRK-KUNA</option>
                <option value="63" data-select2-id="589">HTG-GOURDE</option>
                <option value="64" data-select2-id="590">HUF-FORINTO</option>
                <option value="65" data-select2-id="591">IDR-RUPIA INDONESIA</option>
                <option value="66" data-select2-id="592">ILS-NUEVO SÉQUEL ISRAELÍ</option>
                <option value="67" data-select2-id="593">INR-RUPIA INDIA</option>
                <option value="68" data-select2-id="594">IQD-DINAR IRAQUÍ</option>
                <option value="69" data-select2-id="595">IRR-RIAL IRANÍ</option>
                <option value="70" data-select2-id="596">ISK-CORONA ISLANDESA</option>
                <option value="71" data-select2-id="597">JMD-DÓLAR JAMAIQUINO</option>
                <option value="72" data-select2-id="598">JOD-DINAR JORDANO</option>
                <option value="73" data-select2-id="599">JPY-YEN</option>
                <option value="74" data-select2-id="600">KES-CHELÍN KENIANO</option>
                <option value="75" data-select2-id="601">KGS-SOM</option>
                <option value="76" data-select2-id="602">KHR-RIEL</option>
                <option value="77" data-select2-id="603">KMF-FRANCO COMORENSE</option>
                <option value="78" data-select2-id="604">KPW-WON NORCOREANO</option>
                <option value="79" data-select2-id="605">KRW-WON</option>
                <option value="80" data-select2-id="606">KWD-DINAR KUWAITÍ</option>
                <option value="81" data-select2-id="607">KYD-DÓLAR DE LAS ISLAS CAIMÁN</option>
                <option value="82" data-select2-id="608">KZT-TENGE</option>
                <option value="83" data-select2-id="609">LAK-KIP</option>
                <option value="84" data-select2-id="610">LBP-LIBRA LIBANESA</option>
                <option value="85" data-select2-id="611">LKR-RUPIA DE SRI LANKA</option>
                <option value="86" data-select2-id="612">LRD-DÓLAR LIBERIANO</option>
                <option value="87" data-select2-id="613">LSL-LOTI</option>
                <option value="88" data-select2-id="614">LYD-DINAR LIBIO</option>
                <option value="89" data-select2-id="615">MAD-DÍRHAM MARROQUÍ</option>
                <option value="90" data-select2-id="616">MDL-LEU MOLDAVO</option>
                <option value="91" data-select2-id="617">MGA-ARIARY MALGACHE</option>
                <option value="92" data-select2-id="618">MKD-DENAR</option>
                <option value="93" data-select2-id="619">MMK-KYAT</option>
                <option value="94" data-select2-id="620">MNT-TUGRIK</option>
                <option value="95" data-select2-id="621">MOP-PATACA</option>
                <option value="96" data-select2-id="622">MRU-UGUIYA</option>
                <option value="97" data-select2-id="623">MUR-RUPIA DE MAURICIO</option>
                <option value="98" data-select2-id="624">MVR-RUFIYAA</option>
                <option value="99" data-select2-id="625">MWK-KWACHA</option>
                <option value="100" data-select2-id="626">MXN-PESO MEXICANO</option>
                <option value="101" data-select2-id="627">MXV-UNIDAD DE INVERSIÓN (UDI) MEXICANA</option>
                <option value="102" data-select2-id="628">MYR-RINGGIT MALAYO</option>
                <option value="103" data-select2-id="629">MZN-METICAL MOZAMBIQUEÑO</option>
                <option value="104" data-select2-id="630">NAD-DÓLAR NAMIBIO</option>
                <option value="105" data-select2-id="631">NGN-NAIRA</option>
                <option value="106" data-select2-id="632">NIO-CÓRDOBA</option>
                <option value="107" data-select2-id="633">NOK-CORONA NORUEGA</option>
                <option value="108" data-select2-id="634">NPR-RUPIA NEPALÍ</option>
                <option value="109" data-select2-id="635">NZD-DÓLAR NEOZELANDÉS</option>
                <option value="110" data-select2-id="636">OMR-RIAL OMANÍ</option>
                <option value="111" data-select2-id="637">PAB-BALBOA</option>
                <option value="112" data-select2-id="638">PEN-SOL</option>
                <option value="113" data-select2-id="639">PGK-KINA</option>
                <option value="114" data-select2-id="640">PHP-PESO FILIPINO</option>
                <option value="115" data-select2-id="641">PKR-RUPIA PAKISTANÍ</option>
                <option value="116" data-select2-id="642">PLN-ZŁOTY</option>
                <option value="117" data-select2-id="643">PYG-GUARANÍ</option>
                <option value="118" data-select2-id="644">QAR-RIAL CATARÍ</option>
                <option value="119" data-select2-id="645">RON-LEU RUMANO</option>
                <option value="120" data-select2-id="646">RSD-DINAR SERBIO</option>
                <option value="121" data-select2-id="647">RUB-RUBLO RUSO</option>
                <option value="122" data-select2-id="648">RWF-FRANCO RUANDÉS</option>
                <option value="123" data-select2-id="649">SAR-RIAL SAUDÍ</option>
                <option value="124" data-select2-id="650">SBD-DÓLAR DE LAS ISLAS SALOMÓN</option>
                <option value="125" data-select2-id="651">SCR-RUPIA SEYCHELENSE</option>
                <option value="126" data-select2-id="652">SDG-LIBRA SUDANESA</option>
                <option value="127" data-select2-id="653">SEK-CORONA SUECA</option>
                <option value="128" data-select2-id="654">SGD-DÓLAR DE SINGAPUR</option>
                <option value="129" data-select2-id="655">SHP-LIBRA DE SANTA ELENA</option>
                <option value="130" data-select2-id="656">SLL-LEONE</option>
                <option value="131" data-select2-id="657">SOS-CHELÍN SOMALÍ</option>
                <option value="132" data-select2-id="658">SRD-DÓLAR SURINAMÉS</option>
                <option value="133" data-select2-id="659">SSP-LIBRA SURSUDANESA</option>
                <option value="134" data-select2-id="660">STN-DOBRA</option>
                <option value="135" data-select2-id="661">SVC-COLÓN SALVADOREÑO</option>
                <option value="136" data-select2-id="662">SYP-LIBRA SIRIA</option>
                <option value="137" data-select2-id="663">SZL-LILANGENI</option>
                <option value="138" data-select2-id="664">THB-BAHT</option>
                <option value="139" data-select2-id="665">TJS-SOMONI TAYIKO</option>
                <option value="140" data-select2-id="666">TMT-MANAT TURCOMANO</option>
                <option value="141" data-select2-id="667">TND-DINAR TUNECINO</option>
                <option value="142" data-select2-id="668">TOP-PAʻANGA</option>
                <option value="143" data-select2-id="669">TRY-LIRA TURCA</option>
                <option value="144" data-select2-id="670">TTD-DÓLAR DE TRINIDAD Y TOBAGO</option>
                <option value="145" data-select2-id="671">TWD-NUEVO DÓLAR TAIWANÉS</option>
                <option value="146" data-select2-id="672">TZS-CHELÍN TANZANO</option>
                <option value="147" data-select2-id="673">UAH-GRIVNA</option>
                <option value="148" data-select2-id="674">UGX-CHELÍN UGANDÉS</option>
                <option value="149" data-select2-id="675">USD-DÓLAR ESTADOUNIDENSE</option>
                <option value="150" data-select2-id="676">USN-DÓLAR ESTADOUNIDENSE (SIGUIENTE DÍA)</option>
                <option value="151" data-select2-id="677">UYI-PESO EN UNIDADES INDEXADAS (URUGUAY)</option>
                <option value="152" data-select2-id="678">UYU-PESO URUGUAYO</option>
                <option value="153" data-select2-id="679">UYW-UNIDAD PREVISIONAL</option>
                <option value="154" data-select2-id="680">UZS-SOM UZBEKO</option>
                <option value="155" data-select2-id="681">VEF-BOLIBAR VENEZOLANO FUERTE</option>
                <option value="156" data-select2-id="682">VND-DONG VIETNAMITA</option>
                <option value="157" data-select2-id="683">VUV-VATU</option>
                <option value="158" data-select2-id="684">WST-TALA</option>
                <option value="159" data-select2-id="685">XAF-FRANCO CFA DE ÁFRICA CENTRAL</option>
                <option value="160" data-select2-id="686">XAG-PLATA&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
                <option value="161" data-select2-id="687">XAU-ORO&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
                <option value="162" data-select2-id="688">XCD-DÓLAR DEL CARIBE ORIENTAL</option>
                <option value="163" data-select2-id="689">XDR-DERECHOS ESPECIALES DE GIRO</option>
                <option value="164" data-select2-id="690">XOF-FRANCO CFA DE ÁFRICA OCCIDENTAL</option>
                <option value="165" data-select2-id="691">XPD-PALADIO&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
                <option value="166" data-select2-id="692">XPF-FRANCO CFP</option>
                <option value="167" data-select2-id="693">XPT-PLATINO&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
                <option value="168" data-select2-id="694">XSU-SUCRE</option>
                <option value="169" data-select2-id="695">XTS-RESERVADO PARA PRUEBAS</option>
                <option value="170" data-select2-id="696">XUA-UNIDAD DE CUENTA BAD</option>
                <option value="171" data-select2-id="697">YER-RIAL YEMENÍ</option>
                <option value="172" data-select2-id="698">ZAR-RAND</option>
                <option value="173" data-select2-id="699">ZMW-KWACHA ZAMBIANO</option>
                <option value="174" data-select2-id="700">ZWD-DÓLAR ZIMBABUENSE</option>
              </select><span class="select2 select2-container select2-container--default select2-container--above" dir="ltr" data-select2-id="229" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-moneda1-container"><span class="select2-selection__rendered" id="select2-moneda1-container" role="textbox" aria-readonly="true" title="GTQ-QUETZAL">GTQ-QUETZAL</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Monto aproximado ingresos</label>
              <input type="number" name="montoAproximado" id="montoAproximado1" class="form-control d-inline montoAproximado" placeholder="0.00" min="0" step=".01" style="text-align:right;" required=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <button type="button" id="agregarNegocioPropio" class="btn btn-primary agregarNegocioPropio">Agregar negocio propio</button>
  </div>
</div>