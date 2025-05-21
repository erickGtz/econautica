<?php
    use ECONAUTICA\MYAPI\READ_USR\Read_User;
    require_once __DIR__.'/vendor/autoload.php';

    $usuario = new Read_User('econautica');
    $usuario->revisar_encuesta($_POST['id']);
    echo $usuario->getData();
?>