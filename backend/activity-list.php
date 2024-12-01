<?php
    use ECONAUTICA\MYAPI\READ_ACT\Read_Activity;
    require_once __DIR__.'/vendor/autoload.php';

    $actividades = new Read_Activity('econautica');
    $actividades->list();
    echo $actividades->getData();
?>