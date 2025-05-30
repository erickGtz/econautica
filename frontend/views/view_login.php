<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoNautica</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/navbar-style.css">
    <link rel="stylesheet" href="../css/login-style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
  </head>

  <body>
    <?php
      $mostrarNavbar = false;
      include '../plantillas/php/header.php';
    ?>

    <!-- Header -->
    <div id="header-placeholder"></div> <!-- Aquí se insertará el header -->

    <!-- Contenedor principal -->
    <div class="container-fluid completo vh-100">
      <div class="row ">
        <!-- Primera columna con el carrusel -->
        <div class="col-6 col-md-6 imagen d-none d-md-block">
          <div class="carousel">
            <div class="carousel-inner">
              <img src="../../backend/img/fondo-peces.jpg" alt="Imagen 1">
            </div>
          </div>
        </div>
        <!-- Segunda columna con el formulario -->
        <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div class="card">
            <h3>Inicia Sesión</h3>
            <form id="formulario">
              <!-- Campo de correo -->
              <div class="form-group mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <input type="email" class="form-control" id="correo" name="correo" placeholder="Correo electrónico"
                         required>
                </div>
              </div>
              <br>
              <!-- Campo de contraseña -->
              <div class="form-group mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-lock"></i>
                  </span>
                  <input type="password" class="form-control" id="contrasena" name="contrasena" placeholder="Contraseña"
                         required>
                </div>
              </div>
              <div class="link">
                <a href="./view_registro.php">No tienes cuenta aún? ...</a>
              </div>
              <!-- Botón -->
              <button type="submit" class="btn btn-primary">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>



    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="../js/app_login.js"></script>

  </body>

</html>