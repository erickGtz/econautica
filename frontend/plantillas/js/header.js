// Cargar el header
fetch('/econautica/frontend/plantillas/html/header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header-placeholder').innerHTML = data);
