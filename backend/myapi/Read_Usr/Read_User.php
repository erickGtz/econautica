<?php
namespace ECONAUTICA\MYAPI\READ_USR;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Read_User extends DataBase
{
  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }
  public function single($id)
  {
    if (isset($id)) {
      if ($result = $this->conexion->query("SELECT * FROM usuarios WHERE id = {$id}")) {
        $row = $result->fetch_assoc();

        if (!is_null($row)) {
          foreach ($row as $key => $value) {
            $this->data[$key] = $value;
          }
        }
        $result->free();
      } else {
        die('Query Error: ' . mysqli_error($this->conexion));
      }
      $this->conexion->close();
    }
  }

  public function revisar_encuesta($id_usuario)
  {
    if (isset($id_usuario)) {
      // Consulta para verificar si existe una encuesta respondida por ese usuario
      $sql = "SELECT * FROM encuestas WHERE id_usuario = {$id_usuario} LIMIT 1";

      if ($result = $this->conexion->query($sql)) {
        if ($result->num_rows > 0) {
          // Ya contestó la encuesta
          $this->data = [
            'status' => 'exists',
            'message' => 'El usuario ya contestó la encuesta.'
          ];
        } else {
          // No ha contestado
          $this->data = [
            'status' => 'ok',
            'message' => 'El usuario no ha contestado la encuesta.'
          ];
        }
        $result->free();
      } else {
        die('Query Error: ' . $this->conexion->error);
      }
      $this->conexion->close();
    } else {
      $this->data = [
        'status' => 'error',
        'message' => 'ID de usuario no definido.'
      ];
    }
  }

}
?>