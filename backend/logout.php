<?php
session_start();

// Destruir todas las variables de sesión
session_unset(); 

// Destruir la sesión
session_destroy();

// Eliminar la cookie de la sesión en el navegador
setcookie(session_name(), '', time() - 3600, '/'); // Borrar la cookie PHPSESSID

// Redirigir al usuario al login
header("Location: ../index.php");
exit();
?>
