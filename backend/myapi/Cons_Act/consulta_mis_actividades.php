<?php
namespace ECONAUTICA\MYAPI\CONS_ACT;

require_once __DIR__ . '/../vendor/autoload.php';
use ECONAUTICA\MYAPI\conexion;

class ConsultaMisActividades extends conexion
{
    public function getActividades($usuario_id)
    {
        $sql = "SELECT * FROM actividades WHERE usuario_id = '$usuario_id'";
        $result = $this->conexion->query($sql);

        $actividades = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $actividades[] = $row;
            }
        }

        return json_encode($actividades);
    }
}

$consulta = new ConsultaMisActividades('econautica');
echo $consulta->getActividades(1);
?>