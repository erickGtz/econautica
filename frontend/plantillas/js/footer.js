// Cargar el footer
fetch('/econautica/frontend/plantillas/php/footer.php')
    .then(response => response.text())
    .then(data => document.getElementById('footer-placeholder').innerHTML = data);
