$(document).ready(function () {

    function inscribirse(activityId) {
        alert(`Te has inscrito a la actividad con ID: ${activityId}`);
    }

    $('#search-form').submit(function (e) {
        e.preventDefault();

        const location = $('#search-location').val();
        const category = $('#search-category').val();

        // Realizar la solicitud AJAX al `actividad-list.php`
        $.post('backend/activity-search.php', { location, category }, function (response) {
            console.log(response);
            const activities = JSON.parse(response);
            let resultsHTML = '';

            if (activities.length > 0) {
                activities.forEach(activity => {
                    resultsHTML += `
                        <div class="card">
                            <h3>${activity.titulo}</h3>
                            <p>${activity.descripcion}</p>
                            <p><strong>Ubicación:</strong> ${activity.ubicacion}</p>
                            <p><strong>Categoría:</strong> ${activity.categoria}</p>
                            <p><strong>Duración:</strong> ${activity.duracion}</p>
                            <p><strong>Costo:</strong> $${activity.costo}</p>
                            <button onclick="inscribirse(${activity.id})">Inscribirme</button>
                        </div>
                    `;
                });
            } else {
                resultsHTML = '<p>No se encontraron actividades para los criterios seleccionados.</p>';
            }

            $('#results').html(resultsHTML);
        });
    });
});

