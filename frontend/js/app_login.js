$(document).ready(function () {
  verificarSesion();
  // Manejador del formulario de inicio de sesión
  $('#formulario').submit(function (e) {
    e.preventDefault(); // Prevenir envío tradicional del formulario

    // Capturar datos del formulario
    const postData = {
      correo: $('#correo').val(),
      contrasena: $('#contrasena').val()
    };


    // Realizar una solicitud POST a usuario-login.php
    $.post('../../backend/user-login.php', postData, (response) => {
      const respuesta = JSON.parse(response);
      if (respuesta.status === "success") {
        if (respuesta.tipo == 0) {
          window.location.href = "../../index.php";


        } else if (respuesta.tipo == 1) {
          // Redirigir a view_propietario si es propietario
          window.location.href = "../views/view_propietario.php";
        }
        /*
        // Redirigir según el tipo de usuario
        */
      } else {
        console.log(respuesta.message); // En caso de error
      }
    });
  });
});

function verificarSesion() {
  $.ajax({
    url: '../../backend/login.php',  // Ruta a tu archivo de verificación
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