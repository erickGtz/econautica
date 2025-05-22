$(document).ready(function () {

    verificarSesion();
  // Validar nombre
  $('#nombre').keyup(function () {
    const nombre = $(this).val().trim();
    const isValid = nombre !== '';
    const message = isValid ? '' : 'El nombre es requerido';
    updateFieldState($(this), isValid, message);
  });

  // Validar apellido paterno
  $('#apellidoPaterno').keyup(function () {
    const apellidoPaterno = $(this).val().trim();
    const isValid = apellidoPaterno !== '';
    const message = isValid ? '' : 'El apellido paterno es requerido';
    updateFieldState($(this), isValid, message);
  });

  // Validar apellido materno
  $('#apellidoMaterno').keyup(function () {
    const apellidoMaterno = $(this).val().trim();
    const isValid = apellidoMaterno !== '';
    const message = isValid ? '' : 'El apellido materno es requerido';
    updateFieldState($(this), isValid, message);
  });

  // Validar teléfono
  $('#telefono').keyup(function () {
    const telefono = $(this).val().trim();
    const telefonoRegex = /^[0-9]{10}$/; // Teléfono de 10 dígitos
    const isValid = telefonoRegex.test(telefono);
    const message = isValid ? '' : 'El teléfono debe tener 10 dígitos';
    updateFieldState($(this), isValid, message);
  });

  // Validar correo
  $('#correo').keyup(function () {
    const correo = $(this).val().trim();
    const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = correoRegex.test(correo);
    const message = isValid ? '' : 'El correo debe tener un formato válido';
    updateFieldState($(this), isValid, message);
  });

  // Validar contraseña
  $('#contrasena').keyup(function () {
    const contrasena = $(this).val();
    const isValid = contrasena !== '';
    const message = isValid ? '' : 'La contraseña es requerida';
    updateFieldState($(this), isValid, message);
  });

  // Validar confirmar contraseña
  $('#confirmarContrasena').keyup(function () {
    const confirmarContrasena = $(this).val();
    const contrasena = $('#contrasena').val();
    const isValid = confirmarContrasena === contrasena;
    const message = isValid ? '' : 'Las contraseñas no coinciden';
    updateFieldState($(this), isValid, message);
  });

  // Validar tipo de usuario
  $('#tipoUsuario').change(function () {
    const tipoUsuario = $(this).val();
    const isValid = tipoUsuario !== '';
    const message = isValid ? '' : 'Selecciona un tipo de usuario';
    updateFieldState($(this), isValid, message);
  });

  // Evento para validar el formulario antes de enviarlo
  $('#formularioRegistro').on('submit', function (e) {
    e.preventDefault(); // Prevenir el envío por defecto

      // Si la validación es exitosa, recoger los datos del formulario
      let usuarioData = {
        nombre: $('#nombre').val(),
        apellidoPaterno: $('#apellidoPaterno').val(),
        apellidoMaterno: $('#apellidoMaterno').val(),
        telefono: $('#telefono').val(),
        correo: $('#correo').val(),
        contrasena: $('#contrasena').val(),
        tipoUsuario: $('#tipoUsuario').val()
      };

      // Enviar los datos al backend (puedes modificar esta parte según sea necesario)
      $.post('../../backend/user-add.php', usuarioData, (response) => {
        const respuesta = JSON.parse(response);
        console.log(respuesta);

        // Iniciar sesión inmediatamente después de un registro exitoso
        if (respuesta.status === "success") {
          // Datos para el login
          const postData = {
            correo: $('#correo').val(),
            contrasena: $('#contrasena').val()
          };

          // Realizar el login
          $.post('../../backend/user-login.php', postData, (response) => {
            const respuestaLogin = JSON.parse(response);
            if (respuestaLogin.status === "success") {
              // Redirigir según el tipo de usuario
              if (respuestaLogin.tipo == 0) {
                // Redirigir a view_encuesta si es turista
                window.location.href = "../../index.php";
              } else if (respuestaLogin.tipo == 1) {
                // Redirigir a view_propietario si es propietario
                window.location.href = "../views/view_propietario.php";
              }
            } else {
              console.log(respuestaLogin.message); // En caso de error
            }
          });
        }
        limpiarForm();  // Limpiar el formulario después de la respuesta
      });
  });

  // Función para limpiar el formulario después de un envío exitoso
  function limpiarForm() {
    $('#formularioRegistro')[0].reset();
  }

  // Función para actualizar el estado de los campos
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