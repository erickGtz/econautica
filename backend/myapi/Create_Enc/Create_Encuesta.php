<?php
namespace ECONAUTICA\MYAPI\CREATE_ENC;

use ECONAUTICA\MYAPI\Database;
require_once __DIR__ . '/../Database.php';

class Create_Encuesta extends DataBase
{
  public function __construct($db, $user = 'root', $pass = '')
  {
    $this->data = array();
    parent::__construct($db, $user, $pass);
  }

  public function add($encuestaData)
{
    // Estructura de respuesta inicial
    $this->data = array(
        'status' => 'error',
        'message' => 'Hubo un error al guardar las respuestas'
    );

    // Validar si el usuario ID está presente
    if (!isset($encuestaData['id'])) {
        $this->data['message'] = 'Falta el ID del usuario';
        echo json_encode($this->data);
        return;
    }

    $usuarioId = $encuestaData['id'];  // ID del usuario que responde la encuesta
    
    // Verificar si las preguntas están presentes
    $requiredFields = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'];  // Cambié q9[] a q9
    foreach ($requiredFields as $field) {
        if (!isset($encuestaData[$field])) {
            $this->data['message'] = "Falta el campo $field";
            echo json_encode($this->data);
            return;
        }
    }

    // No necesitamos serializar el campo q9 si ya está como cadena concatenada
    $q9 = isset($encuestaData['q9']) ? $encuestaData['q9'] : '';

    // Insertar los datos en la base de datos
    $this->conexion->set_charset("utf8");

    // Preparar la consulta para insertar las respuestas
    $sql = "INSERT INTO respuestas_encuesta (usuario_ID, q1, q2, q3, q4, q5, q6, q7, q8, q9)
            VALUES ($usuarioId, 
                    '{$encuestaData['q1']}', 
                    '{$encuestaData['q2']}', 
                    '{$encuestaData['q3']}', 
                    '{$encuestaData['q4']}', 
                    '{$encuestaData['q5']}', 
                    '{$encuestaData['q6']}', 
                    '{$encuestaData['q7']}', 
                    '{$encuestaData['q8']}', 
                    '{$q9}')";

    // Ejecutar la consulta
    if ($this->conexion->query($sql)) {
        $this->data['status'] = "success";
        $this->data['message'] = "Respuestas guardadas exitosamente";
    } else {
        $this->data['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
    }

    // Cerrar la conexión
    $this->conexion->close();

    // Devolver la respuesta
    echo json_encode($this->data);
}

}
?>
