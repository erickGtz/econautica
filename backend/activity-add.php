<?php
    use ECONAUTICA\MYAPI\CREATE_ACT\Create_Activity;
    require_once __DIR__.'/vendor/autoload.php';

    $actividad = new Create_Activity('econautica');
    $actividad->add( $_POST );
    echo $actividad->getData();
?>