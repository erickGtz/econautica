$(document).ready(function () {
    let edit = false;
    limpiarForm();
    listarActividades();  // Cargar actividades al inicio

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
        const estadosCosteros = [
            "Baja California", "Sonora", "Sinaloa", "Nayarit", "Jalisco", "Colima", 
            "Michoacán", "Guerrero", "Oaxaca", "Veracruz", "Tamaulipas", "Yucatán", 
            "Quintana Roo", "Campeche", "Chiapas", "Tabasco"
        ];
    
        const isValid = estadosCosteros.includes(location);
        const message = !location
            ? 'Ubicación requerida'
            : !isValid
                ? 'Selecciona un estado costero válido'
                : '';
    
        updateFieldState($(this), isValid, message);
    });
    
    $('#activity-description').blur(function () {
        const description = $(this).val();
        const isValid = description.length <= 250;
        const message = isValid
            ? ''
            : 'La descripción debe ser menor o igual a 250 caracteres';
    
        updateFieldState($(this), isValid, message);
    });

    function updateFieldState(field, isValid, message) {
        if (isValid) {
            field.addClass('valid').removeClass('invalid');
        } else {
            field.addClass('invalid').removeClass('valid');
        }
    
        let statusElement = field.siblings('.validation-status');
        if (!statusElement.length) {
            statusElement = $('<div class="validation-status"></div>');
            field.after(statusElement);
        }
    
        statusElement.text(message).toggle(!isValid).toggleClass('invalid', !isValid);
    }

    $('#activity-form').submit((e) => {
        e.preventDefault();
    
        // Crear un objeto FormData
        let formData = new FormData();
        formData.append('titulo', $('#activity-name').val());
        formData.append('costo', $('#activity-costo').val());
        formData.append('duracion', $('#activity-duration').val());
        formData.append('ubicacion', $('#activity-location').val());
        formData.append('descripcion', $('#activity-description').val());
    
        // Agregar la imagen si se seleccionó una
        const imgFile = $('#activity-img')[0].files[0];
        if (imgFile) {
            formData.append('img', imgFile);
        }
    
        // Si estamos editando, agregamos el ID
        if (edit) {
            formData.append('id', $('#activityId').val());
        }
    
        if (validarEntradas(formData)) {
            const url = edit === false
                ? '../../backend/activity-add.php'
                : '../../backend/activity-edit.php';
    
            $.ajax({
                url: url,
                type: 'POST',
                data: formData,
                processData: false, // No procesar los datos
                contentType: false, // No establecer tipo de contenido
                success: function (response) {
                    const respuesta = JSON.parse(response);
                    let template = `
                        <li>Status: ${respuesta.status}</li>
                        <li>Message: ${respuesta.message}</li>
                    `;
                    $('#activity-result').show();
                    $('#activity-container').html(template);
                    listarActividades();
                    limpiarForm();
                    edit = false;
                }
            });
        }
    });
    

    function validarEntradas(activityData) {
        if (!activityData.titulo || activityData.titulo.trim() === '') {
            alert('El campo nombre no puede estar vacío.');
            return false;
        }
        if (!activityData.costo) {
            alert('El campo costo es requerido.');
            return false;
        }
        if (!activityData.duracion) {
            alert('El campo duración es requerido.');
            return false;
        }
        if (!activityData.ubicacion || activityData.ubicacion.trim() === '') {
            alert('El campo ubicación no puede estar vacío.');
            return false;
        }

        if (!activityData.img) {
            activityData.img = 'default.png';
        }
        return true;
    }

    function limpiarForm() {
        $('#activity-name').val('');
        $('#activity-costo').val('');
        $('#activity-duration').val('');
        $('#activity-location').val('');
        $('#activity-description').val('');
        $('#activity-img').val('');
        $('#activityId').val('');
    }

    // Función para listar actividades
    function listarActividades() {
        $.ajax({
            url: '../../backend/activity-list.php',
            type: 'GET',
            success: function (response) {
                console.log(response);
                const actividades = JSON.parse(response);
                
                if (Object.keys(actividades).length > 0) {
                    let template = '';

                    actividades.forEach((actividad) => {
                        let descripcion = '';
                        descripcion += '<li>Costo: ' + actividad.costo + '</li>';
                        descripcion += '<li>Duración: ' + actividad.duracion + '</li>';
                        descripcion += '<li>Descripción: ' + actividad.descripcion + '</li>';
                        descripcion += '<li>Ubicación: ' + actividad.ubicacion + '</li>';

                        template += `
                            <tr activityId="${actividad.ID}">
                                <td>${actividad.ID}</td>
                                <td><a href="#" class="activity-item">${actividad.titulo}</a></td>
                                <td><ul>${descripcion}</ul></td>
                                <td>
                                    <button class="activity-delete btn btn-danger">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    $('#activities').html(template);
                }
            },
        });
    }

    // Función para eliminar actividad
    $(document).on('click', '.activity-delete', (e) => {
        if (confirm('¿Realmente deseas eliminar esta actividad?')) {
            const element = $(e.target)[0].parentElement.parentElement;
            const id = $(element).attr('activityId');

            $.post('../../backend/activity-delete.php', { id }, (response) => {
                let respuesta = JSON.parse(response);
                let template = `
                    <li>Status: ${respuesta.status}</li>
                    <li>Message: ${respuesta.message}</li>
                `;
                $('#activity-result').show();
                $('#activity-container').html(template);
                listarActividades();
            });
        }
    });

    // Cargar datos de la actividad para editar
    $(document).on('click', '.activity-item', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr('activityId');
    
        $.post('../../backend/activity-single.php', { id }, (response) => {
            let actividad = JSON.parse(response);

            $('#activity-name').val(actividad.titulo);
            $('#activity-costo').val(actividad.costo);
            $('#activity-duration').val(actividad.duracion);
            $('#activity-location').val(actividad.ubicacion);
            $('#activity-description').val(actividad.descripcion);
            $('#activity-img').val(actividad.img);
            $('#activityId').val(actividad.ID);
            edit = true;
        });
    });
});
