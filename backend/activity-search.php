<?php
    use ECONAUTICA\MYAPI\READ_ACT\Read_Activity;
    require_once __DIR__.'/vendor/autoload.php';

    $actividades = new Read_Activity('econautica');
    $actividades->search_activity($_POST['location'], $_POST['category']);
    echo $actividades->getData();
?>