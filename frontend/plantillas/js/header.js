// Cargar el header
fetch('/econautica/frontend/plantillas/php/header.php')
    .then(response => response.text())
    .then(data => document.getElementById('header-placeholder').innerHTML = data);
