<?php
    use ECONAUTICA\MYAPI\DELETE_ACT\Delete_Activity;
    require_once __DIR__.'/vendor/autoload.php';

    $actividad = new Delete_Activity('econautica');
    $actividad->delete( $_POST['id'] );
    echo $actividad->getData();
?>