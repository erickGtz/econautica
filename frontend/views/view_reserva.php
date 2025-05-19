<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoNautica - Inscripción</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/navbar-style.css">
    <link rel="stylesheet" href="../css/reserva-style.css">
  </head>

  <body>

    <?php
      $mostrarNavbar = true;
      include '../plantillas/php/header.php';
    ?>

    <!-- Header -->
    <div id="header-placeholder"></div> <!-- Aquí se insertará el header -->

    <!-- Contenido principal -->
    <div class="container mt-1">
      <h2 class="text-center mb-4">Inscripción</h2>
      <div class="card mx-auto" style="max-width: 500px;">
        <div class="card-body">
          <form id="reserva-form">
            <!-- Actividad -->
            <div class="row mb-2">
              <label class="col-sm-3 col-form-label">Actividad:</label>
              <div class="col-sm-9">
                <span id="reserva-actividad-nombre" class="form-control-plaintext">Cargando...</span>
              </div>
            </div>

            <div class="row mb-2">
              <label class="col-sm-3 col-form-label">Ubicación:</label>
              <div class="col-sm-9">
                <span id="reserva-actividad-ubicacion" class="form-control-plaintext">Cargando...</span>
              </div>
            </div>

            <!-- Campo oculto para ID de actividad -->
            <input type="hidden" id="reserva-actividad" name="actividad_id">

            <!-- Fecha -->
            <div class="form-group mt-2 pb-2">
              <label for="reserva-fecha">¿Qué día nos visitarás?</label>
              <input type="date" id="reserva-fecha" name="fecha" class="form-control" required>
            </div>

            <!-- Número de personas -->
            <div class="form-group mt-2">
              <label for="reserva-personas">¿Cuántas personas son?</label>
              <input type="number" id="reserva-personas" name="personas" class="form-control" placeholder="0" required>
            </div>

            <!-- Total calculado -->
            <div class="row mt-2">
              <label class="col-sm-3 col-form-label">Total:</label>
              <div class="col-sm-9">
                <span id="reserva-total" class="form-control-plaintext">$0.00</span>
              </div>
            </div>

            <!-- Botón continuar -->
            <div class="d-flex justify-content-center mt-2">
              <button type="submit" class="btn btn-primary">Reservar</button>
            </div>

          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div id="footer-placeholder"></div> <!-- Aquí se insertará el footer -->

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="../js/app_reserva.js"></script>

    <!-- Enlazar los archivos JS para cargar el header y footer -->
    <script src="../plantillas/js/footer.js"></script>
  </body>

</html>