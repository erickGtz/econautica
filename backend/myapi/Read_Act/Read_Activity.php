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
        session_start(); // Asegúrate de iniciar la sesión
        if (!isset($_SESSION['usuario_id'])) {
            die('Error: No se encontró la sesión del usuario.');
        }

        $idPropietario = $_SESSION['usuario_id']; // Obtén el ID del propietario desde la sesión

        // Modifica la consulta para filtrar por `id_propietario`
        $sql = "SELECT * FROM actividades WHERE eliminado = 0 AND id_propietario = $idPropietario";

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
            if ($result = $this->conexion->query("SELECT * FROM actividades WHERE id = {$id}")) {
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

public function get_data_for_charts($chartType)
    {
        if ($chartType === 'activities_by_state') {
            $sql = "
                SELECT ubicacion AS estado, COUNT(*) AS total
                FROM actividades
                WHERE eliminado = 0
                GROUP BY ubicacion
                ORDER BY total DESC
            ";
        } elseif ($chartType === 'reservations_by_state') {
            $sql = "
                SELECT a.ubicacion AS estado, COUNT(r.id) AS total
                FROM reservas r
                JOIN actividades a ON r.id_actividad = a.id
                WHERE r.eliminado = 0
                GROUP BY a.ubicacion
                ORDER BY total DESC
            ";
        } else {
            return []; // Si no se reconoce el tipo de gráfico, devuelve un array vacío
        }

        if ($result = $this->conexion->query($sql)) {
            $this->data = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
            return $this->data;
        } else {
            die('Query Error: ' . mysqli_error($this->conexion));
        }
    }

}
