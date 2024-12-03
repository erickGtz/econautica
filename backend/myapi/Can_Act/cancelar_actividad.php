<?php
namespace ECONAUTICA\MYAPI\CAN_ACT;

require_once __DIR__ . '/../vendor/autoload.php';
use ECONAUTICA\MYAPI\conexion;

header('Content-Type: application/json');

class CancelarActividad extends conexion
{
    public function cancelar($actividadId)
    {
        $sql = "DELETE FROM actividades WHERE id = '$actividadId'";

        if ($this->conexion->query($sql) === TRUE) {
            $response = array('success' => true);
        } else {
            $response = array('success' => false);
        }

        return json_encode($response);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $actividadId = $data['actividadId'];

    $cancelar = new CancelarActividad('econautica');
    echo $cancelar->cancelar($actividadId);
}
?>