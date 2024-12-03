<?php
namespace ECONAUTICA\MYAPI\EDIT_USER;

require_once __DIR__ . '/../vendor/autoload.php';
use ECONAUTICA\MYAPI\conexion;


class UserEdit extends conexion
{
    public function edit($data)
    {
        $id = $data['id'];
        $nombre = $data['name'];
        $correo = $data['email'];
        $sql = "UPDATE usuarios SET nombre = '$nombre', correo = '$correo' WHERE id = '$id'";

        if ($this->conexion->query($sql) === TRUE) {
            return json_encode(['success' => true]);
        } else {
            return json_encode(['success' => false, 'message' => $this->conexion->error]);
        }
    }
}
?>