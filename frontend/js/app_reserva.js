$(document).ready(function () {
      verificarSesion();
  let activityCosto = 0; // Inicializa el costo de la actividad

  if (window.location.pathname.includes('view_reserva.php')) {
    cargarActividadEnFormulario();
    deshabilitarFechasAnteriores(); // Llamamos a la función para deshabilitar las fechas anteriores
  }

  // Función para cargar datos de la actividad
  function cargarActividadEnFormulario() {
    const urlParams = new URLSearchParams(window.location.search);
    const activityId = urlParams.get('activity_id');
    activityCosto = parseFloat(urlParams.get('activity_costo')) || 0; // Obtiene el costo o 0 si no existe

    if (activityId) {
      $.post(
        '../../backend/activity-single.php',
        { id: activityId },
        function (response) {
          const actividad = JSON.parse(response);
          if (actividad.error) {
            alert('Error: ' + actividad.error);
            return;
          }

          // Rellena los campos de la actividad
          $('#reserva-actividad-nombre').text(actividad.titulo);
          $('#reserva-actividad-ubicacion').text(actividad.ubicacion);
          $('#reserva-actividad').val(actividad.id); // Campo oculto para el ID
        }
      );
    } else {
      alert('No se encontró el ID de la actividad. Redirigiendo al inicio...');
      window.location.href = '../../index.php';
    }
  }

  // Función para deshabilitar las fechas anteriores a hoy
  function deshabilitarFechasAnteriores() {
    const today = new Date();
    const day = ("0" + today.getDate()).slice(-2); // Día con 2 dígitos
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // Mes con 2 dígitos
    const year = today.getFullYear(); // Año

    const minDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD
    $('#reserva-fecha').attr('min', minDate); // Establece la fecha mínima en el campo
  }

  // Escucha cambios en el número de personas
  $('#reserva-personas').on('input', function () {
    const personas = parseInt($(this).val()) || 0; // Obtiene el número de personas (o 0 si vacío)
    const total = personas * activityCosto; // Calcula el total
    $('#reserva-total').text(`$${total.toFixed(2)}`); // Actualiza el total
  });

  // Maneja el envío del formulario
  $('#reserva-form').submit(function (e) {
    e.preventDefault();
    const personas = parseInt($('#reserva-personas').val()) || 0;
    const total = personas * activityCosto;

    const postData = {
      fecha: $('#reserva-fecha').val(),
      personas: personas,
      actividad_id: $('#reserva-actividad').val(),
      total: total,
    };

    $.post('../../backend/reserva-add.php', postData, function (response) {
      const resultado = JSON.parse(response);

      if (resultado.status === 'success') {
        alert('Reserva creada con éxito');
        window.location.href = '../../index.php';
      } else {
        alert('Error: ' + resultado.message);
      }
    });
  });
});

function verificarSesion() {
  $.ajax({
    url: '../../backend/login.php',  // Ruta a tu archivo de verificación
    method: 'GET',
    success: function(data) {
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