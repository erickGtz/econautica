<?php
session_start();

// Destruir todas las variables de sesión
session_unset(); 

// Destruir la sesión
session_destroy();

// Redirigir al usuario al login
header("Location: ../frontend/views/view_login.html");
exit();
?>
