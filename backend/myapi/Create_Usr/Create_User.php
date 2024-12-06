<?php
namespace ECONAUTICA\MYAPI\CREATE_USR;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Create_User extends DataBase
{
  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }

  public function add($usuario){

    $this->data = array(
        'status' => 'error',
        'message' => 'Error: No se creo el usuario.'
      );

    $this->conexion->set_charset("utf8");
    $sql = "INSERT INTO usuarios (nombre, apellido_pat, apellido_mat, telefono, correo, contrasena, tipo) 
            VALUES ('{$usuario['nombre']}', '{$usuario['apellidoPaterno']}', '{$usuario['apellidoMaterno']}', '{$usuario['telefono']}', '{$usuario['correo']}', '{$usuario['contrasena']}', '{$usuario['tipoUsuario']}')";

    if ($this->conexion->query($sql)) {
      $this->data['status'] = "success";
      $this->data['message'] = "Usuario creado con exito.";
    } else {
      $this->data['message'] = "ERROR: No se ejecutó la consulta. " . mysqli_error($this->conexion);
    }

    $this->conexion->close();
  }

}
?>