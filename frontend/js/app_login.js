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
        $.post('../../backend/usuario-login.php', postData, (response) => {
                console.log(response);
            });
    });
});
