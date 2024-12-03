$(document).ready(function () {
    $('#login-form').submit(function (e) {
        e.preventDefault();
        const postData = {
            correo: $('#login-email').val(),
            contrasena: $('#login-password').val()
        };

        $.post('login-handler.php', postData, function (response) {
            if (response.success) {
                window.location.href = 'mis_actividades.html';
            } else {
                $('#login-error').text(response.message).show();
            }
        }, 'json');
    });

    $('#register-form').submit(function (e) {
        e.preventDefault();
        const postData = {
            nombre: $('#register-name').val(),
            apellidoPaterno: $('#register-apellidoPaterno').val(),
            apellidoMaterno: $('#register-apellidoMaterno').val(),
            telefono: $('#register-telefono').val(),
            correo: $('#register-email').val(),
            contrasena: $('#register-password').val()
        };

        $.post('registro_nuevo-handler.php', postData, function (response) {
            if (response.success) {
                window.location.href = 'confirmacion.html';
            } else {
                $('#register-error').text(response.message).show();
            }
        }, 'json');
    });
});