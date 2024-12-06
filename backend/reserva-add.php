<?php
    use ECONAUTICA\MYAPI\CREATE_REV\Create_Reserva;
    require_once __DIR__.'/vendor/autoload.php';

    $reserva = new Create_Reserva('econautica');
    $reserva->add( $_POST );
    echo $reserva->getData();
?>