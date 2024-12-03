<?php
$servername = "localhost";
$username = "root"; // Cambia esto si tu usuario de MySQL es diferente
$password = "Kamaleon_2002"; // Cambia esto si tu contraseña de MySQL es diferente
$dbname = "econautica";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>