<?php
	/*header('Content-Type: text/html; charset=utf-8');*/
	$usuario = 'postgres';
	$contrasenya = 'postgres';
	$bbdd = 'datos';
	$puerto = '5432';
	$host = '192.168.1.37';
	
	$conn = pg_connect("dbname=".$bbdd." user=".$usuario." host=".$host." password=".$contrasenya." port=".$puerto) or die ("Fallo en la conexión");
?>
