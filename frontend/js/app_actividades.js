$(document).ready(function () {
  listarActividades();
  verificarSesion();

  function listarActividades() {
    $.ajax({
      url: '../../backend/reserva-list.php',
      type: 'GET',
      success: function (response) {
        const reservas = JSON.parse(response);

        if (reservas.length > 0) {
          $('#actividadesContainer').html(''); // Limpiar antes de agregar

          reservas.forEach((reserva) => {
            if (reserva.eliminado === "0") {
              $.post('../../backend/activity-single.php', { id: reserva.id_actividad }, function (activityResponse) {
                const actividad = JSON.parse(activityResponse);

                const tarjetaHTML = `
                  <div class="card">
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
                    </div>
                    <div class="card-footer">
                      <button class="btn btn-danger btn-sm eliminar-actividad" data-id="${reserva.id}">
                        Eliminar
                      </button>
                    </div>
                  </div>
                `;

                $('#actividadesContainer').append(tarjetaHTML);
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

  // Manejo del botón "Eliminar"
  $(document).on('click', '.eliminar-actividad', function () {
    const reservaId = $(this).data('id');
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      $.ajax({
        url: '../../backend/reserva-delete.php',
        type: 'POST',
        data: { id: reservaId },
        success: function (response) {
          const resultado = JSON.parse(response);
          if (resultado.status === 'success') {
            alert('Reserva eliminada con éxito.');
            listarActividades();
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

function verificarSesion() {
  $.ajax({
    url: '../../backend/login.php',
    method: 'GET',
    success: function(data) {
      if (data.logueado) {
        $('#menu-login').hide();
        $('#menu-registro').hide();
        $('#menu-logout').show();
        $('#menu-perfil').show();

        if (data.usuario_tipo == 0) {
          $('#menu-reservas').show();
          $('#menu-actividades').hide();
        } else if (data.usuario_tipo == 1) {
          $('#menu-actividades').show();
          $('#menu-reservas').hide();
        }
      } else {
        $('#menu-login').show();
        $('#menu-registro').show();
        $('#menu-logout').hide();
        $('#menu-perfil').hide();
        $('#menu-reservas').hide();
        $('#menu-actividades').hide();
      }
    },
    error: function() {
      console.error('Error verificando la sesión.');
    }
  });
}
