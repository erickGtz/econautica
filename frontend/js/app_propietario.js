$(document).ready(function () {
    let edit = false;
    limpiarForm();

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
    
        // Lista de estados costeros válidos
        const estadosCosteros = [
            "Baja California", "Sonora", "Sinaloa", "Nayarit", "Jalisco", "Colima", 
            "Michoacán", "Guerrero", "Oaxaca", "Veracruz", "Tamaulipas", "Yucatán", 
            "Quintana Roo", "Campeche", "Chiapas", "Tabasco"
        ];
    
        // Validación: Verifica si la ubicación está en la lista de estados costeros
        const isValid = estadosCosteros.includes(location);
    
        // Mensaje de validación
        const message = !location
            ? 'Ubicación requerida'
            : !isValid
                ? 'Selecciona un estado costero válido'
                : '';
    
        // Actualiza el estado del campo
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

        let activityData = {
            titulo: $('#activity-name').val(),
            costo: $('#activity-costo').val(),
            duracion: $('#activity-duration').val(),
            ubicacion: $('#activity-location').val(),
            descripcion: $('#activity-description').val(),
            img: $('#activity-img').val(),
        };


        if (validarEntradas(activityData)) {
            const url =
                edit === false
                    ? '../../backend/activity-add.php'
                    : './backend/activity-edit.php';

            $.post(url, activityData, (response) => {
                console.log(response);
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
    }
});
