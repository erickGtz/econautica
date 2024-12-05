<?php
    use ECONAUTICA\MYAPI\DELETE_REV\Delete_Reserva;
    require_once __DIR__.'/vendor/autoload.php';

    $reserva = new Delete_Reserva('econautica');
    $reserva->delete( $_POST['id'] );
    echo $reserva->getData();
?>