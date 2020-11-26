<div class="row">
    <div class="col-sm-2">
        <div class="form-group">
            <select name="selectfuenteingresos" class="form-control custom-select select2 fuenteIngresos" style="width: 100%" required>
                <option value="" disabled selected>Selecciona</option>
                //$negocio
                <option value="NP" {{ $tipoFN == 'NP' ? 'selected' : ''}}>Negocio propio</option>
                <option value="RD" {{ $tipoFN == 'RD' ? 'selected' : ''}}>Relación de dependencia</option>
                <option value="OI" {{ $tipoFN == 'OI' ? 'selected' : ''}}>Otras fuentes de ingreso</option>
            </select>
        </div>
    </div>
    <div class="col-sm">
        <div class="form-group row">
                <div class="col-sm-2">
                    <label for="inputfuenteingresos{{$tipo}}_1_0" class="ml-4" id="labelfuenteingresos{{$tipo}}_1_0">{{$textoFN}}</label>
                </div>
                <div class="col-sm ml-2">
                    <input name="{{$nameFN}}" type="text" class="form-control" required value="{{$valueFN}}"/>
                </div>
                <div class="col-sm-1 borrarFuenteIngreso">
                    @if($indice != 0)
                        <button type="button" class="btn btn-danger">Borrar</button>
                    @endif
                </div>
        </div>
    </div>
</div>