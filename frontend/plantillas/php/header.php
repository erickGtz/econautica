<header>
    <!-- Título fuera de la navbar -->
    <div class="navbar-title">
        <a href="/econautica/index.php">EcoNautica</a>
        <span style="display:none;">EcoNautica</span>
                        <!-- Ícono de flecha para regresar -->
                <div class="me-auto">
                    <a href="#" onclick="history.back(); return false;" class="text-decoration-none">
                        <i class="bi bi-arrow-left fs-5 text-white mx-3"></i>
                    </a>
                </div>
    </div>

    <?php if (!isset($mostrarNavbar) || $mostrarNavbar): ?>
        <!-- Barra de navegación -->
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">


                <div class="navbar-nav">
                    <!-- Enlaces que siempre se mostrarán, ocultados por defecto -->
                    <a id="menu-perfil" class="nav-link" href="/econautica/frontend/views/view_perfil.php" style="display:none;">Mi Perfil</a>
                    <a id="menu-reservas" class="nav-link" href="/econautica/frontend/views/view_actividades.php" style="display:none;">Mis Reservas</a>
                    <a id="menu-actividades" class="nav-link" href="/econautica/frontend/views/view_propietario.php" style="display:none;">Mis Actividades</a>

                    <!-- Enlaces de login y registro -->
                    <a id="menu-login" class="nav-link" href="/econautica/frontend/views/view_login.php">Iniciar Sesión</a>
                    <a id="menu-registro" class="nav-link" href="/econautica/frontend/views/view_registro.php">Registrarse</a>
                    <a id="menu-logout" class="nav-link" href="/econautica/backend/logout.php" style="display:none;">Cerrar sesión</a>
                </div>
            </div>
        </nav>
    <?php endif; ?>
</header>