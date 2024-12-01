<?php
namespace ECONAUTICA\MYAPI\UPDATE_ACT;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Update_Activity extends Database
{

  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }


  public function edit($jsonOBJ)
  {
    // SE CREA EL ARREGLO QUE SE VA A DEVOLVER EN FORMA DE JSON
    $this->data = array(
      'status' => 'error',
      'message' => 'La consulta falló'
    );
    // SE VERIFICA HABER RECIBIDO EL ID
    if (isset($jsonOBJ->id)) {
      // SE REALIZA LA QUERY DE BÚSQUEDA Y AL MISMO TIEMPO SE VALIDA SI HUBO RESULTADOS
      $sql = "UPDATE actividades SET titulo='{$jsonOBJ->titulo}', categoria='{$jsonOBJ->categoria}', descripcion='{$jsonOBJ->descripcion}',";
      $sql .="ubicacion='{$jsonOBJ->ubicacion}', costo={$jsonOBJ->costo}, duracion='{$jsonOBJ->duracion}',";
      $sql .="img='{$jsonOBJ->img}' WHERE ID={$jsonOBJ->id}";
      $this->conexion->set_charset("utf8");
      if ($this->conexion->query($sql)) {
        $this->data['status'] = "success";
        $this->data['message'] = "Producto actualizado";
      } else {
        $this->data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($this->conexion);
      }
      $this->conexion->close();
    }
  }

}

?>