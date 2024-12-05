<?php
namespace ECONAUTICA\MYAPI\READ_REV;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Read_Reserva extends DataBase
{
  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }

  public function list()
    {
        session_start(); // Asegúrate de iniciar la sesión
        if (!isset($_SESSION['usuario_id'])) {
            die('Error: No se encontró la sesión del usuario.');
        }

        $idTurista = $_SESSION['usuario_id']; // Obtén el ID del propietario desde la sesión

        // Modifica la consulta para filtrar por `id_propietario`
        $sql = "SELECT * FROM reservas WHERE eliminado = 0 AND id_usuario= $idTurista";

        if ($result = $this->conexion->query($sql)) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            if (!is_null($rows)) {
                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $this->data[$num][$key] = $value;
                    }
                }
            }
            $result->free();
        } else {
            die('Query Error: ' . mysqli_error($this->conexion));
        }
        $this->conexion->close();
    }

        public function single($id)
    {
        if (isset($id)) {
            if ($result = $this->conexion->query("SELECT * FROM reservas WHERE id = {$id}")) {
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