<?php
namespace ECONAUTICA\MYAPI\READ_ACT;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Read_Activity extends Database
{
    public function __construct($db, $user = 'root', $pass = '')
    {
        $this->data = array();
        parent::__construct($db, $user, $pass);
    }

    public function list()
    {
        if ($result = $this->conexion->query("SELECT * FROM actividades WHERE eliminado = 0")) {
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
            if ($result = $this->conexion->query("SELECT * FROM actividades WHERE ID = {$id}")) {
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

    public function search_activity($location, $category)
{
    // Construye las condiciones dinámicamente
    $conditions = ["eliminado = 0"];
    if (!empty($location)) {
        $conditions[] = "ubicacion = '" . $this->conexion->real_escape_string($location) . "'";
    }
    if (!empty($category)) {
        $conditions[] = "categoria = '" . $this->conexion->real_escape_string($category) . "'";
    }

    // Une las condiciones con "AND"
    $whereClause = implode(' AND ', $conditions);

    // Construye la consulta SQL
    $sql = "SELECT * FROM actividades WHERE $whereClause";

    // Ejecuta la consulta
    if ($result = $this->conexion->query($sql)) {
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        if (!is_null($rows)) {
            $this->data = $rows;
        }
        $result->free();
    } else {
        die('Query Error: ' . mysqli_error($this->conexion));
    }

    $this->conexion->close();
}

}
