<?php  header("Content-type: text/html; charset=UTF-8");
include("php/configuracion.php");
$total=array();
$consulta = pg_query($conn, "SELECT lat,long FROM pizero.localizacion WHERE id = 1 ");
$datos = pg_fetch_row($consulta);
$latutud  = $datos[0];
$longitud = $datos[1];

$total[0]  = $datos[0];
$total[1] = $datos[1];

pg_close($conn);
echo  json_encode($latutud ."_". $longitud);

?>