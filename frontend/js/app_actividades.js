$(document).ready(function () {
    let edit = false;
    limpiarForm();
    listarActividades();

    $('#activity-name').keyup(function () {
        const name = $(this).val();
        const isValid = name && name.length <= 100;
        const message = !name
            ? 'Nombre de la actividad requerido'
            : 'El nombre debe ser menor o igual a 100 caracteres';

        updateFieldState($(this), isValid, message);
    });

    $('#activity-costo').blur(function () {
        const costo = parseFloat($(this).val());
        const isValid = costo > 0;
        const message = isValid ? '' : 'El costo debe ser un número mayor a 0';

        updateFieldState($(this), isValid, message);
    });

    $('#activity-duration').blur(function () {
        const duration = $(this).val();
        const regex = /^(\d+\s*hora(s?)\s*)?(\d+\s*min(s?)\s*)?$/i;
        const isValid = duration && regex.test(duration);
        const message = !duration
            ? 'Duración requerida'
            : 'Formato inválido. Ejemplo: "1 hora 33 min" o "45 min"';

        updateFieldState($(this), isValid, message);
    });

    $('#activity-location').blur(function () {
        const location = $(this).val();
        const isValid = location && location.length <= 100;
        const message = !location
            ? 'Ubicación requerida'
            : 'La ubicación debe ser menor o igual a 100 caracteres';

        updateFieldState($(this), isValid, message);
    });

    $('#activity-form').submit(function (e) {
        e.preventDefault();
        const postData = {
            name: $('#activity-name').val(),
            costo: $('#activity-costo').val(),
            duration: $('#activity-duration').val(),
            location: $('#activity-location').val(),
            description: $('#activity-description').val(),
            id: $('#activity-id').val()
        };

        const url = edit === false ? 'activity-add.php' : 'activity-edit.php';
        $.post(url, postData, function (response) {
            listarActividades();
            limpiarForm();
            edit = false;
        });
    });

    function listarActividades() {
        $.ajax({
            url: 'activity-list.php',
            type: 'GET',
            success: function (response) {
                const actividades = JSON.parse(response);
                let template = '';
                actividades.forEach(actividad => {
                    template += `
                        <tr activityId="${actividad.id}">
                            <td>${actividad.name}</td>
                            <td>${actividad.costo}</td>
                            <td>${actividad.duration}</td>
                            <td>${actividad.location}</td>
                            <td>${actividad.description}</td>
                            <td>
                                <button class="activity-edit btn btn-primary">Editar</button>
                                <button class="activity-delete btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#activities').html(template);
            }
        });
    }

    function limpiarForm() {
        $('#activity-form').trigger('reset');
        $('#activity-id').val('');
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