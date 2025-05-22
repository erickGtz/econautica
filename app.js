$(document).ready(function () {

  verificarSesion();

  function buscarActividades() {
    const location = $('#search-location').val();
    const category = $('#search-category').val();

    $.post(
      'backend/activity-search.php',
      { location, category },
      function (response) {
        const activities = JSON.parse(response);
        let resultsHTML = '';

        if (activities.length > 0) {
          activities.forEach((activity) => {
            resultsHTML += `
                        <div class="col-12 col-md-6 mb-4"> <!-- Dos tarjetas por fila en pantallas medianas -->
                            <div class="card">
                                <div class="card-header">
                                    <h3>${activity.titulo}</h3>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6 pt-3">
                                            <img src="./backend/img/${activity.img}" alt="${activity.titulo}" class="img-fluid rounded">
                                        </div>
                                        <div class="col-6 details">
                                            <p>${activity.descripcion}</p>
                                            <p><strong>Ubicación:</strong> ${activity.ubicacion}</p>
                                            <p><strong>Categoría:</strong> ${activity.categoria}</p>
                                            <p><strong>Duración:</strong> ${activity.duracion}</p>
                                            <p><strong>Costo:</strong> $${activity.costo}</p>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-12 text-center">
                                            <button class="btn btn-primary activity-rev" data-activity-id="${activity.id}" data-activity-costo="${activity.costo}">Inscribirme</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
          });
        } else {
          resultsHTML =
            '<p>No se encontraron actividades para los criterios seleccionados.</p>';
        }

        $('#results').html(resultsHTML);
      }
    );
  }

  $(document).on('click', '.activity-rev', function (e) {
    // Verificamos si el usuario está logueado antes de permitir la acción
    const activityId = $(this).data('activity-id');
    const activityCosto = $(this).data('activity-costo');
    $.ajax({
      url: './backend/login.php', // Verifica si hay sesión activa
      method: 'GET',
      success: function (data) {
        if (data.logueado) {
          // Si el usuario está logueado, redirige a la página de reserva

          window.location.href = `./frontend/views/view_reserva.php?activity_id=${activityId}&activity_costo=${activityCosto}`;
        } else {
          // Si el usuario no está logueado, muestra un mensaje de advertencia
          alert('Necesitas iniciar sesión para inscribirte en una actividad.');
        }
      },
      error: function () {
        alert('Necesitas iniciar sesión para inscribirte en una actividad.');
      }
    });
  });


  $('#search-location, #search-category').change(function () {
    buscarActividades();
  });

  $('#banner-encuesta').click(function () {
    $.ajax({
      url: './backend/login.php', // verifica si hay sesión
      method: 'GET',
      success: function (data) {
        if (data.logueado) {
          // Si está logueado, verificamos si ya contestó la encuesta
          $.post('./backend/user-encuesta.php', { id: data.usuario_id }, function (response) {
            const res = JSON.parse(response);

            if (res.status === 'exists') {
              alert('Ya haz contestado la encuesta. Muchas gracias por tu participación.');
            } else if (res.status === 'ok') {
              window.location.href = 'frontend/views/view_encuesta.php';
            } else {
              alert('Error: ' + res.message);
            }
          });
        } else {
          alert('Necesitas iniciar sesión para contestar la encuesta.');
        }
      },
      error: function () {
        alert('Error verificando sesión. Intenta de nuevo.');
      }
    });
  });


  // Crear gráfica 2: Participación en turismo sostenible
  function crearGraficaReservas(data) {
    const ctx = document.getElementById('chartReservas').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((item) => item.estado), // Extrae los nombres de los estados
        datasets: [
          {
            label: 'Número de reservas',
            data: data.map((item) => parseInt(item.total)), // Convierte 'total' a número
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Participación en turismo sostenible',
          },
        },
      },
    });
  }

  // Llamadas AJAX para obtener datos del backend

  function crearGraficaActividadesPorEstado(data) {
    const ctx = document.getElementById('chartActividades').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((item) => item.estado), // Extrae los nombres de los estados
        datasets: [
          {
            label: 'Número de actividades',
            data: data.map((item) => item.total), // Extrae los totales de actividades
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Actividades sostenibles por estado',
          },
        },
      },
    });
  }

  // Crear gráfica 3: Conciencia sobre la vida submarina
  function crearGraficaConcienciaVidaSubmarina(data) {
    const ctx = document.getElementById('chartConciencia').getContext('2d');

    // Calculamos los porcentajes con base en los puntajes totales
    const totalPuntaje = data.puntaje_informados + data.puntaje_no_informados;
    const porcentajeInformados = (data.puntaje_informados / totalPuntaje) * 100;
    const porcentajeNoInformados = (data.puntaje_no_informados / totalPuntaje) * 100;

    new Chart(ctx, {
      type: 'pie', // Usamos un gráfico de pastel (pie) en vez de barras
      data: {
        labels: [
          '% Usuarios informados',
          '% Usuarios no informados',
        ],
        datasets: [
          {
            label: 'Conciencia sobre la vida submarina',
            data: [porcentajeInformados, porcentajeNoInformados], // Calculamos los porcentajes
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)', // Color para informados
              'rgba(255, 99, 132, 0.6)', // Color para no informados
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)', // Borde para informados
              'rgba(255, 99, 132, 1)', // Borde para no informados
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Conciencia sobre la vida submarina',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`; // Mostrar porcentaje con 2 decimales
              },
            },
          },
        },
      },
    });
  }


  // Realizar la llamada AJAX para obtener los datos
  $.ajax({
    url: './backend/graficas-getData.php',
    type: 'GET',
    data: { chartType: 'conciencia_vida_submarina' },
    success: function (response) {
      const respuesta = JSON.parse(response);
      crearGraficaConcienciaVidaSubmarina(respuesta); // Asegúrate de que los datos estén en formato JSON
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    },
  });

  // Llamada AJAX
  $.ajax({
    url: './backend/graficas-getData.php',
    type: 'GET',
    data: { chartType: 'activities_by_state' },
    success: function (response) {
      const respuesta = JSON.parse(response);
      crearGraficaActividadesPorEstado(respuesta); // Asegúrate de que los datos estén en formato JSON
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    },
  });

  $.ajax({
    url: './backend/graficas-getData.php',
    type: 'GET',
    data: { chartType: 'reservations_by_state' },
    success: function (response) {
      const respuesta = JSON.parse(response);
      crearGraficaReservas(respuesta); // Asegúrate de que los datos estén en formato JSON
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    },
  });

  // Llamada AJAX para obtener datos de la gráfica de conciencia sobre la vida submarina

  /*
    $.get('./backend/data-reservas.php', function (response) {
        const data = JSON.parse(response);
        crearGraficaReservas(data);
    });*/
});

function verificarSesion() {
  $.ajax({
    url: './backend/login.php',  // Ruta a tu archivo de verificación
    method: 'GET',
    success: function (data) {
      if (data.logueado) {
        // Si el usuario está logueado, mostramos las opciones correspondientes
        $('#menu-login').hide();
        $('#menu-registro').hide();
        $('#menu-logout').show();
        $('#menu-perfil').show();  // Mostrar siempre "Mi Perfil"

        // Mostrar el enlace dependiendo del tipo de usuario
        if (data.usuario_tipo == 0) {
          $('#menu-reservas').show();  // Mostrar "Mis Reservas" si es turista
          $('#menu-actividades').hide();  // Ocultar "Mis Actividades" si es turista
        } else if (data.usuario_tipo == 1) {
          $('#menu-actividades').show();  // Mostrar "Mis Actividades" si es administrador
          $('#menu-reservas').hide();  // Ocultar "Mis Reservas" si es administrador
        }
      } else {
        // Si el usuario no está logueado, mostramos las opciones de login y registro
        $('#menu-login').show();
        $('#menu-registro').show();
        $('#menu-logout').hide();
        $('#menu-perfil').hide();
        $('#menu-reservas').hide();
        $('#menu-actividades').hide();
      }
    },
    error: function () {
      console.error('Error verificando la sesión.');
    }
  });
}