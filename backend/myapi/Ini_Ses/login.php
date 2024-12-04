<?php
namespace ECONAUTICA\MYAPI\INI_SES;

use ECONAUTICA\MYAPI\Database;
session_start();  // Inicia la sesión
require_once __DIR__ . '/../Database.php';

class login extends Database
{
    public function __construct($db, $user = 'root', $pass = '')
    {
        $this->data = ['status' => 'error', 'message' => 'Error desconocido.'];
        parent::__construct($db, $user, $pass);
    }

    public function autenticar($usuario)
    {
        $this->data = array(
            'status' => 'error',
            'message' => 'Error en la consulta'
        );

        // Se prepara la consulta para buscar el ID del usuario
        $sql = "SELECT id FROM usuarios WHERE correo = '{$usuario['correo']}' AND contrasena = '{$usuario['contrasena']}' ";
        $this->conexion->set_charset("utf8");
        $result = $this->conexion->query($sql);

        // Si la consulta retorna un resultado
        if ($result && $result->num_rows > 0) {
            // Obtiene el ID del usuario
            $row = $result->fetch_assoc();
            $this->data['status'] = "success";
            $this->data['message'] = "Se encontro al usuario";
            $this->data['id'] = $row['id'];  // Almacena el ID en la respuesta

            // Guardar el ID en la sesión
            $_SESSION['usuario_id'] = $row['id'];
        } else {
            // Si no se encuentra el usuario
            $this->data['message'] = "No se encontró al usuario.";
        }

        $this->conexion->close();
    }

    // Función para obtener el ID desde la sesión (si es necesario)
    public function obtenerIdSesion()
    {
        return isset($_SESSION['usuario_id']) ? $_SESSION['usuario_id'] : null;
    }
}
?>