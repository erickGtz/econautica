$(document).ready(function () {
  verificarSesion();

  let edit = false;
  limpiarForm();
  listarActividades();
  recuperarDatos();

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
    const isValid = !isNaN(costo) && costo > 99; // Asegúrate de que sea un número válido
    const message = isValid ? '' : 'El costo debe ser un número mayor a 99';

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
      'Baja California',
      'Sonora',
      'Sinaloa',
      'Nayarit',
      'Jalisco',
      'Colima',
      'Michoacán',
      'Guerrero',
      'Oaxaca',
      'Veracruz',
      'Tamaulipas',
      'Yucatán',
      'Quintana Roo',
      'Campeche',
      'Chiapas',
      'Tabasco',
    ];

    const isValid = estadosCosteros.includes(location);
    const message = !location
      ? 'Ubicación requerida'
      : !isValid
      ? 'Selecciona un estado costero válido'
      : '';

    updateFieldState($(this), isValid, message);
  });

  $('#activity-category').blur(function () {
    const category = $(this).val();
    const categorias = [
      'snorkel',
      'buceo',
      'viaje por barco',
      'liberacion',
      'fotografia marina',
    ];

    const isValid = categorias.includes(category);
    const message = !category
      ? 'Categoría requerida'
      : !isValid
      ? 'Seleccione una categoría válida'
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

    statusElement
      .text(message)
      .toggle(!isValid)
      .toggleClass('invalid', !isValid);
  }

  $('#activity-form').submit((e) => {
    e.preventDefault();

    let activityData = {
      titulo: $('#activity-name').val(),
      costo: $('#activity-costo').val(),
      duracion: $('#activity-duration').val(),
      ubicacion: $('#activity-location').val(),
      categoria: $('#activity-category').val(),
      descripcion: $('#activity-description').val(),
      img: $('#activity-img').val(),
    };

    if (edit) {
      activityData.id = $('#activityId').val(); // Agregar el ID si estamos editando
    }

    if (validarEntradas(activityData)) {
      const url =
        edit === false
          ? '../../backend/activity-add.php'
          : '../../backend/activity-edit.php';

      $.post(url, activityData, (response) => {
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

    if (!activityData.categoria || activityData.categoria.trim() === '') {
      alert('El campo categoria no puede estar vacío.');
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
    $('#activity-category').val('');
    $('#activity-img').val('');
    $('#activityId').val('');
  }

  // Función para listar actividades
  function listarActividades() {
    $.ajax({
      url: '../../backend/activity-list.php',
      type: 'GET',
      success: function (response) {
        const actividades = JSON.parse(response);

        if (Object.keys(actividades).length > 0) {
          let template = '';

          actividades.forEach((actividad) => {
            let descripcion = '';
            descripcion += '<li>Costo: ' + actividad.costo + '</li>';
            descripcion += '<li>Duración: ' + actividad.duracion + '</li>';
            descripcion +=
              '<li>Descripción: ' + actividad.descripcion + '</li>';
            descripcion += '<li>Categoria: ' + actividad.categoria + '</li>';
            descripcion += '<li>Ubicación: ' + actividad.ubicacion + '</li>';

            template += `
                            <tr activityId="${actividad.id}">
                                <td>${actividad.id}</td>
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
      $('#activity-category').val(actividad.categoria);
      $('#activity-description').val(actividad.descripcion);
      $('#activity-img').val(actividad.img);
      $('#activityId').val(actividad.id);
      edit = true;
    });
  });

  function recuperarDatos() {
    $.ajax({
      url: '../../backend/graficas-getData-propietario.php',
      type: 'GET',
      success: function (response) {
        const data = JSON.parse(response); // Convierte la respuesta JSON a un objeto JavaScript

        // Llama a las funciones de graficación con los datos obtenidos
        renderTopActivitiesChart(data.top_activities);
        renderMonthlyIncomeChart(data.monthly_income);
      },
      error: function (error) {
        console.error('Error al recuperar datos:', error);
      },
    });
  }

  function renderTopActivitiesChart(activities) {
    const labels = activities.map((a) => a.actividad); // Nombres de las actividades
    const values = activities.map((a) => parseInt(a.total_reservas, 10)); // Total de reservas como números

    const ctx = document.getElementById('topActivitiesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar', // Gráfico de barras
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Reservas',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Top 10 Actividades con Más Reservas',
            font: {
              size: 18,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Llamadas AJAX para obtener datos del backend

  function renderMonthlyIncomeChart(monthlyIncome) {
    const labels = monthlyIncome.map((m) => m.mes); // Meses
    const values = monthlyIncome.map((m) => parseFloat(m.ingresos_totales)); // Ingresos totales como números

    const ctx = document.getElementById('monthlyIncomeChart').getContext('2d');
    new Chart(ctx, {
      type: 'line', // Gráfico de línea
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ingresos ($)',
            data: values,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ingresos Totales por Mes',
            font: {
              size: 18,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});

function verificarSesion() {
  $.ajax({
    url: '../../backend/login.php',  // Ruta a tu archivo de verificación
    method: 'GET',
    success: function(data) {
      console.log(data);
      if(data.logueado) {
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
    error: function() {
      console.error('Error verificando la sesión.');
    }
  });
}