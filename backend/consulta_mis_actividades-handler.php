<?php
use ECONAUTICA\MYAPI\CONS_ACT\ConsultaMisActividades;
require_once __DIR__ . '/vendor/autoload.php';

$consulta = new ConsultaMisActividades('econautica');
echo $consulta->getActividades(1);
?>