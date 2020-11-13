select 
tb1.*
,cm.*
,dp.* 
from (
	select 
	dc.idDiccionarioFormulario
	,dc.estado
	,min(titular.idCamposMinimos) as idCamposMinimos
	from diccionarioFormulario as dc
	inner join titular on titular.idDiccionarioFormulario = dc.idDiccionarioFormulario
    where dc.estado = 'A'
	group by dc.idDiccionarioFormulario,dc.estado
)tb1
inner join camposMinimos cm on tb1.idCamposMinimos = cm.idCamposMinimos
inner join datosPersonales dp on cm.cliente = dp.idDatosPersonales

        /*
        ->join('camposMinimos','titular.idCamposMinimos','=','camposMinimos.idCamposMinimos')
        ->join('datosPersonales','datosPersonales.idDatosPersonales','=','camposMinimos.cliente')
        ->where('estado','A')
        ->orderBy('diccionarioFormulario.idDiccionarioFormulario', 'desc')->simplePaginate(7);*/