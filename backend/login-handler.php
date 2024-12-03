<?php
use ECONAUTICA\MYAPI\INI_SES\Login;
require_once __DIR__ . '/vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $login = new Login('econautica');
    $login->autenticar($correo, $contrasena);
}
?>