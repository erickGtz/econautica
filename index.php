<?php
session_start(); // Inicia la sesión

// Verifica si el usuario ha iniciado sesión
$usuario_logueado = isset($_SESSION['usuario_id']);
?>

<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Econautica</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="frontend/css/index-style.css">
        <link rel="stylesheet" href="frontend/css/navbar-style.css">
        <link rel="stylesheet" href="frontend/css/canva-style.css">
    </head>

    <body>
        <!-- Barra de búsqueda superior -->
<nav class="navbar navbar-light bg-light px-3">
    <form class="d-flex w-100" role="search" method="GET" action="buscar.php">
        <input class="form-control me-2" type="search" name="q" placeholder="Buscar actividades..." aria-label="Buscar">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
    </form>
</nav>


        <div id="header-placeholder"></div> <!-- Aquí se insertará el header -->

        <!-- Primer mensaje banner (vacaciones) -->
        <div class="vacation-banner text-center mb-0 mt-3">
            <p class="message-text">~ Encuentra la actividad para tus próximas vacaciones ~</p>
        </div>

        <!-- Main content -->
        <div class="container mt-0 pt-3 text-center">
            <form id="search-form" class="forms">
                <!-- Fila para el formulario de búsqueda -->
                <div class="row mb-3">
                    <div class="col-6 col-md-6 mb-2 mt-3">
                        <label for="search-location" class="form-label">Ubicación</label>
                        <select id="search-location" name="location" class="form-select">
                            <option value="" selected>Seleccione un estado costero</option>
                            <option value="Baja California">Baja California</option>
                            <option value="Sonora">Sonora</option>
                            <option value="Sinaloa">Sinaloa</option>
                            <option value="Nayarit">Nayarit</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="Colima">Colima</option>
                            <option value="Michoacán">Michoacán</option>
                            <option value="Guerrero">Guerrero</option>
                            <option value="Oaxaca">Oaxaca</option>
                            <option value="Veracruz">Veracruz</option>
                            <option value="Tamaulipas">Tamaulipas</option>
                            <option value="Yucatán">Yucatán</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                            <option value="Campeche">Campeche</option>
                            <option value="Chiapas">Chiapas</option>
                            <option value="Tabasco">Tabasco</option>
                        </select>
                    </div>

                    <div class="col-6 col-md-6 mb-2 mt-3">
                        <label for="search-category" class="form-label">Categoría</label>
                        <select id="search-category" name="category" class="form-select">
                            <option value="" selected>Seleccione una categoría</option>
                            <option value="snorkel">Snorkel</option>
                            <option value="buceo">Buceo</option>
                            <option value="viaje en embarcacion">Viaje en embarcación</option>
                            <option value="liberacion">Liberación</option>
                            <option value="fotografia marina">Fotografía marina</option>
                        </select>
                    </div>
                </div>

                <!-- Botón de búsqueda -->
            </form>

            <!-- Título de resultados -->
            <h2 class="mt-4">Resultados de la búsqueda</h2>

            <!-- Div de los resultados -->
            <div id="results" class="row">
                <!-- Las tarjetas de actividades aparecerán aquí -->
            </div>
        </div>

        <!-- Tercer mensaje banner -->
        <div class="message-banner2 text-center mb-1">
            <span id="banner-encuesta" class="message-link" style="cursor:pointer;">Contesta nuestra encuesta para un
                20% de descuento</span>
        </div>


        <!-- Título de resultados -->
        <h2 class="mt-4 mb-1">Graficas de la conciencia marina</h2>

        <!-- Div con borde para el Dashboard -->
        <div class="dashboard-placeholder text-center ">
            <div class="container mb-5">
                <div class="row">
                    <div class="col-md-4 mt-1">
                        <canvas id="chartActividades" height="150"></canvas>
                    </div>

                    <div class="col-md-4">
                        <canvas id="chartConciencia" class="pastel"></canvas>
                    </div>
                    <div class="col-md-4 mt-1">
                        <canvas id="chartReservas" height="150"></canvas>
                    </div>
                </div>

            </div>

        </div>

        <!-- Segundo mensaje banner -->
        <div class="message-banner text-center mb-3">
            <a href="frontend/views/view_info.php" class="message-link">Da clic aquí para conocer más sobre el ODS vida
                submarina :)</a>

        </div>

        <div id="footer-placeholder"></div> <!-- Aquí se insertará el footer -->

        <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="app.js"></script>

        <!-- Enlazar los archivos JS para cargar el header y footer -->
        <script src="frontend/plantillas/js/header.js"></script>
        <script src="frontend/plantillas/js/footer.js"></script>
    </body>

    <body>

    <!-- Barra de búsqueda superior -->
    <nav class="navbar navbar-light bg-light px-3">
        <form class="d-flex w-100" role="search" method="GET" action="buscar.php">
            <input class="form-control me-2" type="search" name="q" placeholder="Buscar actividades..." aria-label="Buscar">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>
    </nav>

    <div id="header-placeholder"></div>


</html>