//Inicializo el array de palabras, el contador de puntos, y el carousel.
let dotCount = 0;
const MAX_DOTS = 3;
const DOT_INTERVAL = 666;
const dropdownMenu = document.getElementById('dropdownMenu').querySelector('.dropdown-menu');
let carousel = document.getElementById("carousel");
let textArray = [];
let refreshIntervalId;

// Obtengo el texto de cada palabra, y lo guardo en el array.
for (let i = 1; i <= 8; i++) {
    let textInHtml = document.getElementById(`texto${i}`).textContent.split(' ')[0];
    textArray.push(textInHtml);
}

// Función para obtener una palabra aleatoria del array.
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Añade puntos durante 2 segundos, hasta llegar a 3 puntos, y genera una nueva frase.
function addDotsAndGenerateSentence() {
    if (dotCount < MAX_DOTS) {
        carousel.innerHTML += ".";
        dotCount++;
    } else {
        let newSentence = `${getRandomElement(textArray)} ${getRandomElement(textArray)} ${getRandomElement(textArray)}`;
        carousel.innerHTML = newSentence;
        dotCount = 0;
    }
}

//Defino el tamaño mínimo, para generar palabras nuevas, para detectar pantallas de tamaño lg o superior
const mediaQuery = window.matchMedia('(min-width: 992px)');

//Función para detener, o inicializar, el generador de frases. 
function handleMediaChange(e) {
    if (e.matches) {
        dropdownMenu.classList.remove('show'); // Oculta el menú opción de pantalla mediana cuando se cambia la resolución a lg.

        refreshIntervalId = setInterval(addDotsAndGenerateSentence, DOT_INTERVAL); // Inicializa el generador de puntos si se está en pantalla lg.
    } else {
        clearInterval(refreshIntervalId);

    }
}


document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.getElementById('dropdownMenuButton');

    //Muestra el menú luego de presionar opciones
    dropdownButton.addEventListener('click', function (event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show'); //Muestra el menú
    });

    // Oculta el menú cuando se hace clic fuera del menú
    window.addEventListener('click', function (event) {
        if (!dropdownMenu.contains(event.target) && !dropdownButton.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    //Llamada inicial a la función para generar palabras
    handleMediaChange(mediaQuery);
})


//Llamada de la función para comenzar/detener el conteo, cuando cambia el tamaño de la pantalla
mediaQuery.addEventListener('change', handleMediaChange);