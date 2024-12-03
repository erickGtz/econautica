<?php
namespace ECONAUTICA\MYAPI\CREATE_USUARIO;

require_once __DIR__ . '/../vendor/autoload.php';
use ECONAUTICA\MYAPI\conexion;

class RegistroNuevo extends conexion
{
    public function registrar($nombre, $apellidoPaterno, $apellidoMaterno, $telefono, $correo, $contrasena)
    {
        $sql = "INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, telefono, correo, contrasena) VALUES ('$nombre', '$apellidoPaterno', '$apellidoMaterno', '$telefono', '$correo', '$contrasena')";

        if ($this->conexion->query($sql) === TRUE) {
            header('Location: confirmacion.html');
        } else {
            echo "Error: " . $sql . "<br>" . $this->conexion->error;
        }

        $this->conexion->close();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellidoPaterno = $_POST['apellidoPaterno'];
    $apellidoMaterno = $_POST['apellidoMaterno'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);

    $registro = new RegistroNuevo('econautica');
    $registro->registrar($nombre, $apellidoPaterno, $apellidoMaterno, $telefono, $correo, $contrasena);
}
?>