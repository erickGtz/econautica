<?php
use ECONAUTICA\MYAPI\READ_ACT\Read_Activity;
require_once __DIR__ . '/vendor/autoload.php';

    $dataReader = new Read_Activity('econautica');
    $dataReader->get_data_for_propietario_charts();
    echo $dataReader->getData();

