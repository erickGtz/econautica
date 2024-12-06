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
            // Consulta para obtener las actividades por estado
            $sql = "
        SELECT ubicacion AS estado, COUNT(*) AS total
        FROM actividades
        WHERE eliminado = 0
        GROUP BY ubicacion
        ORDER BY total DESC
        ";
        } elseif ($chartType === 'reservations_by_state') {
            // Consulta para obtener las reservas por estado
            $sql = "
        SELECT a.ubicacion AS estado, COUNT(r.id) AS total
        FROM reservas r
        JOIN actividades a ON r.id_actividad = a.id
        WHERE r.eliminado = 0
        GROUP BY a.ubicacion
        ORDER BY total DESC
        ";
        } elseif ($chartType === 'conciencia_vida_submarina') {
            // Consulta para obtener las respuestas de las tres preguntas específicas
            $sql = "
        SELECT q3, q4, q5 FROM encuestas
        ";
        } else {
            return []; // Si no se reconoce el tipo de gráfico, devuelve un array vacío
        }

        // Ejecutar la consulta
        if ($result = $this->conexion->query($sql)) {
            // Si es el tipo de gráfico de 'conciencia_vida_submarina', procesamos los datos
            if ($chartType === 'conciencia_vida_submarina') {
                // Inicializamos los contadores de puntajes
                $puntaje_informados = 0;
                $puntaje_no_informados = 0;

                // Procesar cada fila de resultados
                while ($row = $result->fetch_assoc()) {

                    // Procesar las respuestas de la pregunta q3
                    if ($row['q3'] == 1) { // "Sí"
                        $puntaje_informados += 1;
                    } elseif ($row['q3'] == 2) { // "No"
                        $puntaje_no_informados += 1;
                    }
                    // 'No estoy seguro' (3) no suma ni resta

                    // Procesar las respuestas de la pregunta q4
                    if ($row['q4'] == 1) { // "Muy importante"
                        $puntaje_informados += 2;
                    } elseif ($row['q4'] == 2) { // "Moderadamente importante"
                        $puntaje_informados += 1;
                    } elseif ($row['q4'] == 3) { // "Poco importante"
                        $puntaje_no_informados += 1;
                    } elseif ($row['q4'] == 4) { // "Nada importante"
                        $puntaje_no_informados += 2;
                    }

                    // Procesar las respuestas de la pregunta q5
                    if ($row['q5'] == 1) { // "Muy informado"
                        $puntaje_informados += 2;
                    } elseif ($row['q5'] == 2) { // "Algo informado"
                        $puntaje_informados += 1;
                    } elseif ($row['q5'] == 3) { // "Poco informado"
                        $puntaje_no_informados += 1;
                    } elseif ($row['q5'] == 4) { // "Nada informado"
                        $puntaje_no_informados += 2;
                    }
                }

                // Retornar los datos en formato JSON, con los puntajes totales
                $this->data = [
                    'puntaje_informados' => $puntaje_informados,
                    'puntaje_no_informados' => $puntaje_no_informados
                ];
            } else {
                // Procesamiento de otros tipos de gráficos (activities_by_state, reservations_by_state)
                $rows = $result->fetch_all(MYSQLI_ASSOC);
                $this->data = $rows;
            }

            $result->free();
            return $this->data;
        } else {
            die('Query Error: ' . mysqli_error($this->conexion));
        }
    }

    public function get_data_for_propietario_charts(){

         session_start(); // Asegúrate de iniciar la sesión
        if (!isset($_SESSION['usuario_id'])) {
            die('Error: No se encontró la sesión del usuario.');
        }

        $idPropietario = $_SESSION['usuario_id'];

        $data = [];

        // Consulta para "Actividades con más reservas"
        $sqlActivities = "
        SELECT 
            a.titulo AS actividad, 
            COUNT(r.id) AS total_reservas
        FROM reservas r
        JOIN actividades a ON r.id_actividad = a.id
        WHERE r.eliminado = 0 AND a.id_propietario = {$idPropietario}
        GROUP BY a.id
        ORDER BY total_reservas DESC
        LIMIT 10
    ";

        // Ejecutar la consulta para actividades
        if ($result = $this->conexion->query($sqlActivities)) {
            $data['top_activities'] = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        } else {
            die('Query Error (Actividades): ' . mysqli_error($this->conexion));
        }

        // Consulta para "Ingresos por mes"
        $sqlIncome = "
        SELECT 
            DATE_FORMAT(r.fecha, '%Y-%m') AS mes,
            SUM(r.total) AS ingresos_totales
        FROM reservas r
        JOIN actividades a ON r.id_actividad = a.id
        WHERE r.eliminado = 0 AND a.id_propietario = {$idPropietario}
        GROUP BY mes
        ORDER BY mes ASC
    ";

        // Ejecutar la consulta para ingresos
        if ($result = $this->conexion->query($sqlIncome)) {
            $data['monthly_income'] = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        } else {
            die('Query Error (Ingresos): ' . mysqli_error($this->conexion));
        }

        $this->conexion->close();

        // Guardar los datos en la propiedad $data para acceso posterior
        $this->data = $data;
        return $this->data;
    }


}
