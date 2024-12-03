$(document).ready(function () {
    // Manejador del formulario de inicio de sesión
    $('#formulario').submit(function (e) {
        e.preventDefault(); // Prevenir envío tradicional del formulario

        // Capturar datos del formulario
        const postData = {
            correo: $('#correo').val(),
            contrasena: $('#contrasena').val()
        };

        console.log(postData);

        // Realizar una solicitud POST a login-handler.php
        $.post('../../backend/usuario-login.php', postData, function (response) {
            // Procesar la respuesta del servidor
            let respuesta = JSON.parse(response);
            console.log(respuesta);

            if (response.success) {
                // Redirigir a la página principal de usuario
                //window.location.href = 'mis_actividades.html';
            } else {
                // Mostrar mensaje de error si falla la autenticación
                const errorTemplate = `
                    <div id="login-error" class="alert alert-danger mt-3">
                        ${response.message || "Error en el inicio de sesión. Verifica tus credenciales."}
                    </div>`;
                $('#login-error').remove(); // Eliminar mensajes previos si los hay
                $('.card').append(errorTemplate); // Añadir mensaje de error
            }
        }, 'json');
    });
});
