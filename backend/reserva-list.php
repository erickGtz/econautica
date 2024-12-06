<?php
    use ECONAUTICA\MYAPI\READ_REV\Read_Reserva;
    require_once __DIR__.'/vendor/autoload.php';

    $reservas = new Read_Reserva('econautica');
    $reservas->list();
    echo $reservas->getData();
?>