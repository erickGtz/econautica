<?php
namespace ECONAUTICA\MYAPI\DELETE_REV;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Delete_Reserva extends Database
{
  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }

  public function delete($id)
  {
    // SE CREA EL ARREGLO QUE SE VA A DEVOLVER EN FORMA DE JSON
    $this->data = array(
      'status' => 'error',
      'message' => 'La consulta falló'
    );
    // SE VERIFICA HABER RECIBIDO EL ID
    if (isset($id)) {
      // SE REALIZA LA QUERY DE BÚSQUEDA Y AL MISMO TIEMPO SE VALIDA SI HUBO RESULTADOS
      $sql = "UPDATE reservas SET eliminado=1 WHERE ID = {$id}";
      if ($this->conexion->query($sql)) {
        $this->data['status'] = "success";
        $this->data['message'] = "Producto eliminado";
      } else {
        $this->data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($this->conexion);
      }
      $this->conexion->close();
    }
  }
}
?>