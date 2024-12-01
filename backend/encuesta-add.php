<?php
    use ECONAUTICA\MYAPI\CREATE_ENC\Create_Encuesta;
    require_once __DIR__.'/vendor/autoload.php';

    $encuesta = new Create_Encuesta('econautica');
    $encuesta->add( $_POST );
    echo $encuesta->getData();
?>