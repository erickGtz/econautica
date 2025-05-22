$(document).ready(function () {
    verificarSesion();
});

function verificarSesion() {
    $.ajax({
        url: '../../backend/login.php',
        method: 'GET',
        success: function(data) {
            if(data.logueado) {
                $('#menu-login').hide();
                $('#menu-registro').hide();
                $('#menu-logout').show();
                $('#menu-perfil').show();

                if (data.usuario_tipo == 0) {
                    $('#menu-reservas').show();
                    $('#menu-actividades').hide();
                } else if (data.usuario_tipo == 1) {
                    $('#navbar-main-link').attr('href', '/econautica/frontend/views/view_propietario.php');
                    $('#menu-actividades').show();
                    $('#menu-reservas').hide();
                }

                // Aquí llamas a cargarDatosUsuario PASÁNDOLE el id recibido
                cargarDatosUsuario(data.usuario_id);

            } else {
                $('#menu-login').show();
                $('#menu-registro').show();
                $('#menu-logout').hide();
                $('#menu-perfil').hide();
                $('#menu-reservas').hide();
                $('#menu-actividades').hide();
            }
        },
        error: function() {
            console.error('Error verificando la sesión.');
        }
    });
}

function cargarDatosUsuario(id) {
    $.post('../../backend/user-single.php', { id: id }, function(response) {
        let usuario = JSON.parse(response);

        $('#nombre').text(usuario.nombre);
        $('#apellido_pat').text(usuario.apellido_pat);
        $('#apellido_mat').text(usuario.apellido_mat);
        $('#telefono').text(usuario.telefono);
        $('#correo').text(usuario.correo);
    });
}
