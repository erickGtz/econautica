<?php
namespace ECONAUTICA\MYAPI\INI_SES;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class login extends Database
{
    public function __construct($db, $user = 'root', $pass = 'fk1322')
    {
        $this->data = ['status' => 'error', 'message' => 'Error desconocido.'];
        parent::__construct($db, $user, $pass);
    }

    public function autenticar($usuario)
    {
        header('Content-Type: application/json'); // Respuesta en JSON

        // Validar que el objeto usuario tenga las claves necesarias
        if (empty($usuario['correo']) || empty($usuario['contrasena'])) {
            echo json_encode([
                'success' => false,
                'message' => 'El correo y la contraseña son obligatorios.'
            ]);
            return;
        }

        // Escapar las variables para evitar inyección SQL
        $correo = $this->conexion->real_escape_string($usuario['correo']);
        $contrasena = $usuario['contrasena'];

        // Consulta para verificar si el usuario existe
        $sql = "SELECT * FROM usuarios WHERE correo = '$correo' LIMIT 1";
        $result = $this->conexion->query($sql);

        if ($result->num_rows > 0) {
            $usuarioBD = $result->fetch_assoc();

            // Verificar la contraseña
            if (password_verify($contrasena, $usuarioBD['contrasena'])) {
                session_start();
                $_SESSION['usuario'] = $usuarioBD;

                echo json_encode([
                    'success' => true,
                    'message' => 'Inicio de sesión exitoso.',
                ]);
                return;
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Correo o contraseña incorrectos.'
                ]);
                return;
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Correo o contraseña incorrectos.'
            ]);
            return;
        }
    }
}
?>