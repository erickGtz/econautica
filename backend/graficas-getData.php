<?php
use ECONAUTICA\MYAPI\READ_ACT\Read_Activity;
require_once __DIR__ . '/vendor/autoload.php';

// Validar que el parámetro 'chartType' está presente
    $chartType = $_GET['chartType'];

    // Crear instancia de Read_Activity
    $dataReader = new Read_Activity('econautica');

    // Obtener los datos para el gráfico según el tipo
    $dataReader->get_data_for_charts($chartType);

    echo $dataReader->getData();

