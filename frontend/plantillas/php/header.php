<header>
    <!-- Título fuera de la navbar -->
    <div class="navbar-title">
        <a>Econautica</a>
    </div>

    <?php if (!isset($mostrarNavbar) || $mostrarNavbar): ?>
        <!-- Barra de navegación -->
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="navbar-nav">
                    <a class="nav-link" href="/econautica/frontend/views/view_actividades.php">Mis Actividades</a>
                    <a class="nav-link" href="/econautica/frontend/views/view_login.php">Iniciar Sesión</a>
                    <a class="nav-link" href="/econautica/frontend/views/view_registro.php">Registrarse</a>
                </div>
            </div>
        </nav>
    <?php endif; ?>
</header>
