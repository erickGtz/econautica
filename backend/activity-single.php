<?php
    use ECONAUTICA\MYAPI\READ_ACT\Read_Activity;
    require_once __DIR__.'/vendor/autoload.php';

    $actividad = new Read_Activity('econautica');
    $actividad->single( $_POST['id'] );
    echo $actividad->getData();
?>