$(document).ready(function () {
  function buscarActividades() {
    const location = $('#search-location').val();
    const category = $('#search-category').val();

    $.post(
      'backend/activity-search.php',
      { location, category },
      function (response) {
        console.log(response);
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
    // Obtén el ID y costo de la actividad desde los atributos data
    const activityId = $(this).data('activity-id');
    const activityCosto = $(this).data('activity-costo');
    
    // Redirige a view_reserva con ID y costo como parámetros en la URL
    window.location.href = `./frontend/views/view_reserva.html?activity_id=${activityId}&activity_costo=${activityCosto}`;
});



  $('#search-location, #search-category').change(function () {
    buscarActividades();
  });
});
