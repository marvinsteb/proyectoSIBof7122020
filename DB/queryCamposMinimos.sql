select 
df.iddiccionarioFormulario,
cm.tipoActuacion,
cm.calidadActua,
lg.pais,
(select nombrePais from pais where idPais = lg.pais) as cmPais,
(select nombreDepartamento from departamento where idDepartamento = lg.departamento) as cmDepartamento,
(select nombreMunicipio from municipio where idMunicipio = lg.municipio) as cmMunicipio,
cm.fecha
from camposMinimos  cm
inner join  diccionarioFormulario df on cm.diccionarioFormulario = df.iddiccionarioFormulario
inner join lugar lg on lg.idLugar = cm.lugar
 