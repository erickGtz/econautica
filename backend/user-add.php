<?php
    use ECONAUTICA\MYAPI\CREATE_USR\Create_User;
    require_once __DIR__.'/vendor/autoload.php';

    $usuario = new Create_User('econautica');
    $usuario->add( $_POST );
    echo $usuario->getData();
?>