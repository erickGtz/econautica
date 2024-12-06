$(document).ready(function () {
    // Manejador del formulario de inicio de sesión
    $('#formulario').submit(function (e) {
        e.preventDefault(); // Prevenir envío tradicional del formulario

        // Capturar datos del formulario
        const postData = {
            correo: $('#correo').val(),
            contrasena: $('#contrasena').val()
        };

        // Realizar una solicitud POST a usuario-login.php
        $.post('../../backend/user-login.php', postData, (response) => {
            const respuesta = JSON.parse(response);
            if (respuesta.status === "success") {
                console.log("ID del usuario: " + respuesta.id);

                // Redirigir según el tipo de usuario
                if (respuesta.tipo == 0) {
                    // Redirigir a index si es turista
                    window.location.href = "../../index.php";
                } else if (respuesta.tipo == 1) {
                    // Redirigir a view_propietario si es propietario
                    window.location.href = "../views/view_propietario.html";
                }
            } else {
                console.log(respuesta.message); // En caso de error
            }
        });
    });
});
