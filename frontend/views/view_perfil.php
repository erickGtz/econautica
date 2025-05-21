<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoNautica - Mis Actividades</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/navbar-style.css">
    <link rel="stylesheet" href="../css/perfil-style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

  </head>

  <body>

    <div id="header-placeholder"></div> <!-- Aquí se insertará el header -->

    <main class="container my-4">
      <h2 class="mb-4">Mi Perfil</h2>

      <div class="perfil-info p-4 border rounded">
        <p><strong>Nombre:</strong> <span id="nombre">Cargando...</span></p>
        <p><strong>Apellido Paterno:</strong> <span id="apellido_pat">Cargando...</span></p>
        <p><strong>Apellido Materno:</strong> <span id="apellido_mat">Cargando...</span></p>
        <p><strong>Teléfono:</strong> <span id="telefono">Cargando...</span></p>
        <p><strong>Correo:</strong> <span id="correo">Cargando...</span></p>
      </div>
    </main>



    <div id="footer-placeholder"></div> <!-- Aquí se insertará el footer -->

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="../js/app_perfil.js"></script>

    <!-- Enlazar los archivos JS para cargar el header y footer -->
    <script src="../plantillas/js/header.js"></script>
    <script src="../plantillas/js/footer.js"></script>
  </body>

</html>