<?php
namespace ECONAUTICA\MYAPI\CREATE_ACT;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Create_Activity extends DataBase
{
  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }

  public function add($actividad)
  {
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

    $idPropietario = $_SESSION['usuario_id']; // Obtiene el ID del propietario desde la sesión

    // Estructura de respuesta inicial
    $this->data = array(
      'status' => 'error',
      'message' => 'Ya existe una actividad con ese título.'
    );

    // Comprueba si el producto tiene un título
    if (isset($actividad['titulo'])) {
      // Realiza la consulta para verificar si el producto ya existe
      $sql = "SELECT * FROM actividades WHERE titulo = '{$actividad['titulo']}' AND eliminado = 0";
      $result = $this->conexion->query($sql);

      if ($result->num_rows == 0) {
        // Inserta el nuevo producto si no existe
        $this->conexion->set_charset("utf8");
        $sql = "INSERT INTO actividades (titulo, categoria, descripcion, ubicacion, duracion, costo, img, eliminado, id_propietario) VALUES 
            ('{$actividad['titulo']}', '{$actividad['categoria']}', '{$actividad['descripcion']}', '{$actividad['ubicacion']}', 
            '{$actividad['duracion']}', {$actividad['costo']}, '{$actividad['img']}', 0, $idPropietario)";

        if ($this->conexion->query($sql)) {
          $this->data['status'] = "success";
          $this->data['message'] = "Actividad agregada.";
        } else {
          $this->data['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
        }
      }
      $result->free();
      $this->conexion->close();
    }
  }
}
?>
