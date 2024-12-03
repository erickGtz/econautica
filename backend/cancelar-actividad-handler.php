<?php
use ECONAUTICA\MYAPI\CAN_ACT\cancelar_actividad;
require_once __DIR__ . '/vendor/autoload.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $actividadId = $data['actividadId'];

    $cancelar = new cancelar_actividad('econautica');
    echo $cancelar->cancelar($actividadId);
}
?>