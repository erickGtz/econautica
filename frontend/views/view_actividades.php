<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoNautica - Mis Actividades</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/navbar-style.css">
    <link rel="stylesheet" href="../css/mis_actividades.css">
  </head>

  <body>

    <div id="header-placeholder"></div> <!-- Aquí se insertará el header -->

    <!-- Contenido principal -->
    <div class="container my-5">
      <h2 class="mb-4">Mis Actividades</h2>

      <!-- Tarjetas de actividades -->
      <div class="card">
      <h3>Nombre de la actividad</h3>
      <p>Descripción corta...</p>
      <button>Ver más</button>
      </div>



      <div class="d-flex flex-wrap justify-content-center gap-4" id="actividadesContainer">
  <!-- Las actividades se cargarán aquí dinámicamente -->
</div>


    <div id="footer-placeholder"></div> <!-- Aquí se insertará el footer -->

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="../js/app_actividades.js"></script>

    <!-- Enlazar los archivos JS para cargar el header y footer -->
    <script src="../plantillas/js/header.js"></script>
    <script src="../plantillas/js/footer.js"></script>
  </body>

</html>