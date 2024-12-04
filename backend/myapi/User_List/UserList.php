<?php
namespace ECONAUTICA\MYAPI\USER_LIST;

require_once __DIR__ . '/../vendor/autoload.php';
use ECONAUTICA\MYAPI\conexion;

class UserList extends conexion
{
    public function list()
    {
        $sql = "SELECT * FROM usuarios";
        $result = $this->conexion->query($sql);

        $usuarios = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }
        }

        return json_encode($usuarios);
    }
}
?>