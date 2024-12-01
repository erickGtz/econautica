$(document).ready(function () {
    let allResponses = {}; // Objeto para almacenar todas las respuestas

    // Mostrar el primer bloque de preguntas
    const renderFirstBlock = () => `
        <form id="encuesta-form">
            <div class="question">
                <p>1. ¿Sabías que la actividad que estás realizando tiene un impacto positivo en el medio ambiente marino?</p>
                <label><input type="radio" name="q1" value="1"> Si</label>
                <label><input type="radio" name="q1" value="2"> No</label>
                <label><input type="radio" name="q1" value="3"> No estoy seguro</label>
            </div>
            <div class="question">
                <p>2. ¿Con qué frecuencia participas en actividades que contribuyen a la conservación del medio ambiente?</p>
                <label><input type="radio" name="q2" value="1"> Nunca</label>
                <label><input type="radio" name="q2" value="2"> Rara vez</label>
                <label><input type="radio" name="q2" value="3"> A veces</label>
                <label><input type="radio" name="q2" value="4"> Frecuentemente</label>
                <label><input type="radio" name="q2" value="5"> Siempre</label>
            </div>
            <div class="question">
                <p>3. ¿Crees que el turismo sostenible puede ayudar a mejorar la salud de los ecosistemas marinos?</p>
                <label><input type="radio" name="q3" value="1"> Si</label>
                <label><input type="radio" name="q3" value="2"> No</label>
                <label><input type="radio" name="q3" value="3"> No estoy seguro</label>
            </div>
            <div class="question">
                <p>4. ¿Qué tan importante consideras que es la preservación de los ecosistemas marinos?</p>
                <label><input type="radio" name="q4" value="1"> Muy importante</label>
                <label><input type="radio" name="q4" value="2"> Moderadamente importante</label>
                <label><input type="radio" name="q4" value="3"> Poco importante</label>
                <label><input type="radio" name="q4" value="4"> Nada importante</label>
            </div>
            <div class="question">
                <p>5. ¿Qué tan informado/a te sientes sobre los problemas que enfrentan los océanos y la vida submarina?</p>
                <label><input type="radio" name="q5" value="1"> Muy informado</label>
                <label><input type="radio" name="q5" value="2"> Algo informado</label>
                <label><input type="radio" name="q5" value="3"> Poco informado</label>
                <label><input type="radio" name="q5" value="4"> Nada informado</label>
            </div>
            <button type="button" id="continue">Continuar</button>
        </form>
    `;

    // Mostrar el segundo bloque de preguntas
    const renderSecondBlock = () => `
        <form id="encuesta-form">
            <div class="question">
                <p>6. ¿Estarías dispuesto/a a pagar más por una experiencia turística que promueva la conservación del medio ambiente?</p>
                <label><input type="radio" name="q6" value="1"> Si</label>
                <label><input type="radio" name="q6" value="2"> No</label>
            </div>
            <div class="question">
                <p>7. ¿En qué medida crees que los turistas pueden contribuir a la conservación marina?</p>
                <label><input type="radio" name="q7" value="1"> Mucho</label>
                <label><input type="radio" name="q7" value="2"> Algo</label>
                <label><input type="radio" name="q7" value="3"> Poco</label>
                <label><input type="radio" name="q7" value="4"> Nada</label>
            </div>
            <div class="question">
                <p>8. ¿Te gustaría recibir más información sobre cómo las actividades turísticas que realizas afectan a la vida marina?</p>
                <label><input type="radio" name="q8" value="1"> Si</label>
                <label><input type="radio" name="q8" value="2"> No</label>
            </div>
            <div class="question">
                <p>9. ¿Qué acciones estarías dispuesto/a a tomar para promover la conservación marina en tus actividades turísticas?</p>
                <label><input type="checkbox" name="q9" value="1"> Evitar tocar los corales y vida marina</label>
                <label><input type="checkbox" name="q9" value="2"> Usar protector solar biodegradable</label>
                <label><input type="checkbox" name="q9" value="3"> Participar en actividades de limpieza de playas</label>
                <label><input type="checkbox" name="q9" value="4"> Promover el ecoturismo a través de mis redes sociales</label>
            </div>
            <button type="submit" id="submit">Enviar</button>
        </form>
    `;

    $('#survey-container').html(renderFirstBlock());

    // Cambiar al segundo bloque
    $(document).on('click', '#continue', function () {
        const firstBlockData = $('#encuesta-form').serializeArray();
        firstBlockData.forEach((item) => {
            allResponses[item.name] = item.value;
        });

        $('#survey-container').html(renderSecondBlock());
    });

    // Manejar envío del formulario
    $(document).on('submit', '#encuesta-form', function (e) {
        e.preventDefault();

        const secondBlockData = $(this).serializeArray();

        // No redefinir allResponses, solo agregar las respuestas del segundo bloque
        secondBlockData.forEach((item) => {
            if (item.name === 'q9') {
                // Manejar el campo q9[] como una cadena concatenada
                if (!allResponses[item.name]) {
                    allResponses[item.name] = "";
                }
                // Concatenar los valores seleccionados
                allResponses[item.name] += item.value;
            } else {
                allResponses[item.name] = item.value;
            }
        });

        // Agregar el ID del usuario
        allResponses.id = 1;

        console.log(allResponses);

        const url = '../../backend/encuesta-add.php'; // URL del backend para procesar la encuesta

        // Enviar los datos mediante POST
        $.post(url, allResponses, (response) => {
            // Parsear la respuesta del backend
            console.log(response);

            // Mostrar un mensaje de agradecimiento
            alert('¡Gracias por completar la encuesta!');

            // Opcional: redirigir al usuario o limpiar el formulario
            // window.location.href = '../../index.html';
            // $('#encuesta-form')[0].reset();
        });
    });
});
