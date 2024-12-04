$(document).ready(function () {
    let edit = false;
    limpiarForm();
    listarReservas();

    $('#reserva-form').submit(function (e) {
        e.preventDefault();
        const postData = {
            fecha: $('#reserva-fecha').val(),
            personas: $('#reserva-personas').val(),
            actividad_id: $('#reserva-actividad').val(),
            id: $('#reserva-id').val()
        };

        const url = edit === false ? 'reserva-add.php' : 'reserva-edit.php';
        $.post(url, postData, function (response) {
            listarReservas();
            limpiarForm();
            edit = false;
        });
    });

    function listarReservas() {
        $.ajax({
            url: 'reserva-list.php',
            type: 'GET',
            success: function (response) {
                const reservas = JSON.parse(response);
                let template = '';
                reservas.forEach(reserva => {
                    template += `
                        <tr reservaId="${reserva.id}">
                            <td>${reserva.fecha}</td>
                            <td>${reserva.personas}</td>
                            <td>${reserva.actividad}</td>
                            <td>
                                <button class="reserva-edit btn btn-primary">Editar</button>
                                <button class="reserva-delete btn btn-danger">Cancelar</button>
                            </td>
                        </tr>
                    `;
                });
                $('#reservas').html(template);
            }
        });
    }

    function limpiarForm() {
        $('#reserva-form').trigger('reset');
        $('#reserva-id').val('');
    }
});