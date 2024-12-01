<?php
    use ECONAUTICA\MYAPI\UPDATE_ACT\Update_Activity;
    require_once __DIR__.'/vendor/autoload.php';

    $actividad = new Update_Activity('econautica');
    $actividad->edit( json_decode( json_encode($_POST) ) );
    echo $actividad->getData();
?>