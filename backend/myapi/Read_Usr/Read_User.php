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

}
?>