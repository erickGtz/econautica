$(document).ready(function () {
    let edit = false;
    limpiarForm();
    listarUsuarios();

    $('#user-name').keyup(function () {
        const name = $(this).val();
        const isValid = name && name.length <= 100;
        const message = !name
            ? 'Nombre del usuario requerido'
            : 'El nombre debe ser menor o igual a 100 caracteres';

        updateFieldState($(this), isValid, message);
    });

    $('#user-email').blur(function () {
        const email = $(this).val();
        const isValid = email && email.length <= 100;
        const message = !email
            ? 'Correo electrónico requerido'
            : 'El correo debe ser menor o igual a 100 caracteres';

        updateFieldState($(this), isValid, message);
    });

    $('#user-form').submit(function (e) {
        e.preventDefault();
        const postData = {
            name: $('#user-name').val(),
            email: $('#user-email').val(),
            id: $('#user-id').val()
        };

        const url = edit === false ? 'user-add.php' : 'user-edit.php';
        $.post(url, postData, function (response) {
            listarUsuarios();
            limpiarForm();
            edit = false;
        });
    });

    function listarUsuarios() {
        $.ajax({
            url: 'user-list.php',
            type: 'GET',
            success: function (response) {
                const usuarios = JSON.parse(response);
                let template = '';
                usuarios.forEach(usuario => {
                    template += `
                        <tr userId="${usuario.id}">
                            <td>${usuario.name}</td>
                            <td>${usuario.email}</td>
                            <td>
                                <button class="user-edit btn btn-primary">Editar</button>
                                <button class="user-delete btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#users').html(template);
            }
        });
    }

    function limpiarForm() {
        $('#user-form').trigger('reset');
        $('#user-id').val('');
    }

    function updateFieldState($field, isValid, message) {
        const $feedback = $field.siblings('.invalid-feedback');
        if (isValid) {
            $field.removeClass('is-invalid').addClass('is-valid');
            $feedback.text('');
        } else {
            $field.removeClass('is-valid').addClass('is-invalid');
            $feedback.text(message);
        }
    }
});