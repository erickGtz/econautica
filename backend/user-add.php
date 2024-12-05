<?php
use ECONAUTICA\MYAPI\CREATE_USUARIO\registro_nuevo;
require_once __DIR__ . '/vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellidoPaterno = $_POST['apellidoPaterno'];
    $apellidoMaterno = $_POST['apellidoMaterno'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);

    $registro = new registro_nuevo('econautica');
    $registro->registrar($nombre, $apellidoPaterno, $apellidoMaterno, $telefono, $correo, $contrasena);
}
?>