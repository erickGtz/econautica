<?php
namespace ECONAUTICA\MYAPI\INI_SES;

require_once __DIR__ . '/../vendor/autoload.php';
use ECONAUTICA\MYAPI\conexion;

class Login extends conexion
{
    public function autenticar($correo, $contrasena)
    {
        $sql = "SELECT * FROM usuarios WHERE correo = '$correo'";
        $result = $this->conexion->query($sql);

        if ($result->num_rows > 0) {
            $usuario = $result->fetch_assoc();
            if (password_verify($contrasena, $usuario['contrasena'])) {
                session_start();
                $_SESSION['usuario'] = $usuario;
                header('Location: mis_actividades.html');
                exit();
            } else {
                echo "Correo o contraseña incorrectos";
            }
        } else {
            echo "Correo o contraseña incorrectos";
        }

        $this->conexion->close();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $login = new Login('econautica');
    $login->autenticar($correo, $contrasena);
}
?>