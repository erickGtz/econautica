<?php
namespace ECONAUTICA\MYAPI\CREATE_REV;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Create_Reserva extends DataBase
{
  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }

  public function add($reserva){
    // Inicia la sesión
    session_start();

    // Verifica que la sesión tenga un ID de usuario
    if (!isset($_SESSION['usuario_id'])) {
      $this->data = array(
        'status' => 'error',
        'message' => 'Error: No se encontró la sesión del usuario.'
      );
      return;
    }

    $idUsuario = $_SESSION['usuario_id']; // Obtiene el ID del propietario desde la sesión
    // Calcula el total
    // Estructura de la consulta SQL para insertar la nueva reserva
    $this->conexion->set_charset("utf8");
    $sql = "INSERT INTO reservas (id_usuario, id_actividad, personas, total, fecha, eliminado) 
            VALUES ($idUsuario, '{$reserva['actividad_id']}', '{$reserva['personas']}', {$reserva['total']}, '{$reserva['fecha']}', 0)";

    if ($this->conexion->query($sql)) {
      $this->data['status'] = "success";
      $this->data['message'] = "Reserva creada con exito.";
    } else {
      $this->data['message'] = "ERROR: No se ejecutó la consulta. " . mysqli_error($this->conexion);
    }

    $this->conexion->close();
  }

}
?>