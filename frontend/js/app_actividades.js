$(document).ready(function () {
  listarActividades();

  function listarActividades() {
    $.ajax({
      url: '../../backend/reserva-list.php', // Obtener las reservas del usuario
      type: 'GET',
      success: function (response) {
        const reservas = JSON.parse(response); // Parsear la respuesta JSON
        console.log(reservas);

        if (reservas.length > 0) {
          let template = '';

          reservas.forEach((reserva) => {
            if (reserva.eliminado === "0") { // Filtrar solo reservas activas
              // Llamar al backend para obtener los detalles de la actividad
              $.post('../../backend/activity-single.php', { id: reserva.id_actividad }, function (activityResponse) {
                const actividad = JSON.parse(activityResponse);

                // Construir la tarjeta con información de la actividad y reserva
                template += `
                  <div class="col-md-4">
                    <div class="card mb-3">
                      <img src="../../backend/img/${actividad.img}" class="card-img-top" alt="${actividad.titulo}">
                      <div class="card-title">
                        <h4>${actividad.titulo}</h4>
                      </div>
                      <div class="card-body">
                        <p class="card-text">
                          <strong>Fecha:</strong> ${reserva.fecha} <br>
                          <strong>Personas:</strong> ${reserva.personas} <br>
                          <strong>Total:</strong> $${parseFloat(reserva.total).toFixed(2)} <br>
                          <strong>Ubicación:</strong> ${actividad.ubicacion} <br>
                          <strong>Categoría:</strong> ${actividad.categoria} <br>
                          <strong>Descripción:</strong> ${actividad.descripcion}
                        </p>
                        <button class="btn btn-danger btn-sm eliminar-actividad" data-id="${reserva.id}">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                `;

                // Actualizar el contenedor después de cada llamada
                $('#actividadesContainer').html(template);
              });
            }
          });
        } else {
          $('#actividadesContainer').html('<p>No tienes actividades reservadas.</p>');
        }
      },
      error: function (xhr, status, error) {
        console.error('Error al cargar las actividades:', error);
        $('#actividadesContainer').html('<p>Error al cargar las actividades.</p>');
      },
    });
  }

  // Manejar el clic en el botón "Eliminar"
  $(document).on('click', '.eliminar-actividad', function () {
    const reservaId = $(this).data('id');
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      $.ajax({
        url: '../../backend/reserva-delete.php', // Ruta al script de eliminación
        type: 'POST',
        data: { id: reservaId },
        success: function (response) {
          const resultado = JSON.parse(response);
          if (resultado.status === 'success') {
            alert('Reserva eliminada con éxito.');
            listarActividades(); // Refrescar la lista de actividades
          } else {
            alert('Error al eliminar la reserva: ' + resultado.message);
          }
        },
        error: function (xhr, status, error) {
          console.error('Error al eliminar la reserva:', error);
        },
      });
    }
  });
});