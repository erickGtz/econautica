// Cargar el footer
fetch('/econautica/frontend/plantillas/html/footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer-placeholder').innerHTML = data);
