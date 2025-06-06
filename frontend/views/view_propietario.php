<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Econautica</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="../css/navbar-style.css">
        <link rel="stylesheet" href="../css/propietario-style.css">
    </head>

    <body>
        <!-- Header -->
        <div id="header-placeholder"></div> <!-- Aquí se insertará el header -->

        <div class="container">
            <h1>Perfil del propietario</h1>

            <div class="row">
                <div class="col-md-6 mt-3 mb-3">
                    <canvas id="topActivitiesChart" height="150"></canvas>
                </div>
                <div class="col-md-6 mt-3 mb-3">
                    <canvas id="monthlyIncomeChart" height="150"></canvas>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <form id="activity-form">
                        <h3>Agregar Actividad</h3>

                        <div>
                            <label for="activity-name">Nombre de la actividad</label>
                            <input type="text" id="activity-name" name="name" />
                            <div class="validation-status"></div>
                        </div>

                        <div>
                            <label for="activity-costo">Costo</label>
                            <input type="number" id="activity-costo" name="costo" step="0.01" />
                            <div class="validation-status"></div>
                        </div>

                        <div>
                            <label for="activity-duration">Duración</label>
                            <input type="text" id="activity-duration" name="duration" placeholder="Ej. 1 hora 33 min" />
                            <div class="validation-status"></div>
                        </div>

                        <div>
                            <label for="activity-location">Ubicación (Estado costero)</label>
                            <select id="activity-location" name="location">
                                <option value="" disabled selected>Seleccione un estado costero</option>
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
                            <div class="validation-status"></div>
                        </div>

                        <div>
                            <label for="activity-category">Categoría</label>
                            <select id="activity-category" name="category">
                                <option value="" disabled selected>Seleccione una categoría</option>
                                <option value="snorkel">Snorkel</option>
                                <option value="buceo">Buceo</option>
                                <option value="viaje por barco">Viaje por barco</option>
                                <option value="liberacion">Liberacion</option>
                                <option value="fotografia marina">Fotografia marina</option>
                            </select>
                            <div class="validation-status"></div>
                        </div>

                        <div>
                            <label for="activity-description">Descripción</label>
                            <textarea id="activity-description" name="description"></textarea>
                            <div class="validation-status"></div>
                        </div>

                        <div>
                            <label for="activity-img">Imagen</label>
                            <input type="text" id="activity-img" name="img" />
                            <div class="validation-status"></div>
                        </div>

                        <input type="hidden" id="activityId" name="id" /> <!-- Campo oculto para editar -->

                        <button type="submit">Guardar Actividad</button>
                    </form>
                </div>
                <div class="col-md-8">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titulo</th>
                                <th>Descripcion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="activities"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="activity-result" style="display: none;">
            <ul id="activity-container"></ul>
        </div>

        <!-- Footer -->
        <div id="footer-placeholder"></div> <!-- Aquí se insertará el footer -->

        <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="../js/app_propietario.js"></script>
        <!-- Enlazar los archivos JS para cargar el header y footer -->
        <script src="../plantillas/js/header.js"></script>
        <script src="../plantillas/js/footer.js"></script>
    </body>
</html>