<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoNautica - Registro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/navbar-style.css">
    <link rel="stylesheet" href="../css/registro-style.css">
  </head>

  <body>

    <?php
      $mostrarNavbar = false;
      include '../plantillas/php/header.php';
    ?>
    <!-- Header -->
    <div id="header-placeholder"></div> <!-- Aquí se insertará el header -->

    <!-- Contenido principal -->
    <div class="container my-1 mt-3">
      <h2 class="mb-4 text-center">Registro</h2>
      <div class="card shadow">
        <div class="card-body">
          <form id="formularioRegistro">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required>
                <div class="validation-status"></div>
              </div>
              <div class="col-md-6">
                <label for="apellidoPaterno" class="form-label">Apellido Paterno:</label>
                <input type="text" class="form-control" id="apellidoPaterno" name="apellidoPaterno"
                       placeholder="Apellido Paterno" required>
                <div class="validation-status"></div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="apellidoMaterno" class="form-label">Apellido Materno:</label>
                <input type="text" class="form-control" id="apellidoMaterno" name="apellidoMaterno"
                       placeholder="Apellido Materno" required>
                <div class="validation-status"></div>
              </div>
              <div class="col-md-6">
                <label for="telefono" class="form-label">Teléfono:</label>
                <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Teléfono" required>
                <div class="validation-status"></div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="correo" class="form-label">Correo:</label>
                <input type="email" class="form-control" id="correo" name="correo" placeholder="Correo" required>
                <div class="validation-status"></div>
              </div>
              <div class="col-md-6">
                <label for="contrasena" class="form-label">Contraseña:</label>
                <input type="password" class="form-control" id="contrasena" name="contrasena" placeholder="Contraseña"
                       required>
                <div class="validation-status"></div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="confirmarContrasena" class="form-label">Confirmar Contraseña:</label>
                <input type="password" class="form-control" id="confirmarContrasena" name="confirmarContrasena"
                       placeholder="Confirmar Contraseña" required>
                <div class="validation-status"></div>
              </div>
              <div class="col-md-6">
                <label for="tipoUsuario" class="form-label">Tipo de usuario:</label>
                <select class="form-select" id="tipoUsuario" name="tipoUsuario" required>
                  <option value="" disabled selected>Selecciona una opción</option>
                  <option value="0">Turista</option>
                  <option value="1">Propietario</option>
                </select>
                <div class="validation-status"></div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Registrarse</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div id="footer-placeholder"></div> <!-- Aquí se insertará el footer -->

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="../js/app_registro.js"></script>

    <script src="../plantillas/js/footer.js"></script>
  </body>

</html>