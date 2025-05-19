<?php
session_start();

$response = [
    'logueado' => false,
    'usuario_id' => null,
    'usuario_tipo' => null
];

if (isset($_SESSION['usuario_id'])) {
    $response['logueado'] = true;
    $response['usuario_id'] = $_SESSION['usuario_id'];
    $response['usuario_tipo'] = $_SESSION['usuario_tipo'];
}

header('Content-Type: application/json');
echo json_encode($response);
