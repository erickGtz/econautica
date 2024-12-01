<?php
namespace ECONAUTICA\MYAPI;

abstract class Database
{
    protected $conexion;
    protected $data;

    public function __construct($db, $user, $pass)
    {
        $this->conexion = @mysqli_connect(
            'localhost',
            $user,
            $pass,
            $db
        );

        if (!$this->conexion) {
            die('¡Base de datos NO conextada!');
        }
    }

    public function getData()
    {
        return json_encode($this->data, JSON_PRETTY_PRINT);
    }
}
?>