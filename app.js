// Espera a que la ventana se cargue completamente
window.addEventListener('load', () => {

    let lon; // Variable para almacenar la longitud
    let lat; // Variable para almacenar la latitud

    // Obtención de elementos del DOM donde se mostrarán los datos del clima
    let temperaturaValor = document.getElementById('temperatura-valor'); // Valor de la temperatura
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion'); // Descripción de la temperatura
    let ubicacion = document.getElementById('ubicacion'); // Ubicación
    let iconoAnimado = document.getElementById('icono-animado'); // Icono animado del clima
    let vientoVelocidad = document.getElementById('viento-velocidad'); // Velocidad del viento

    // Verifica si el navegador soporta geolocalización
    if (navigator.geolocation) {
        // Obtiene la posición del usuario
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude; // Asigna la longitud
            lat = posicion.coords.latitude; // Asigna la latitud

            // Construye la URL de la API utilizando latitud y longitud
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=49d8e0d9374fad36fa1e8ab46c47157b&units=metric`;

            // Realiza la solicitud a la API
            fetch(url)
                .then(response => response.json()) // Convierte la respuesta a JSON
                .then(data => {
                    let temp = Math.round(data.main.temp); // Redondea la temperatura
                    temperaturaValor.textContent = `${temp} °C`; // Muestra la temperatura

                    let desc = data.weather[0].description; // Obtiene la descripción del clima
                    temperaturaDescripcion.textContent = desc.toUpperCase(); // Muestra la descripción en mayúsculas

                    ubicacion.textContent = data.name; // Muestra la ubicación

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`; // Muestra la velocidad del viento

                    // Determina el icono a mostrar según el tipo de clima
                    switch (data.weather[0].main) {
                        case 'Thunderstrom':
                            iconoAnimado.src = './icons/animated/thunder.svg'; // Icono de tormenta
                            break;
                        
                        case 'Drizzle':
                            iconoAnimado.src = './icons/animated/rainy-2.svg'; // Icono de llovizna
                            break;

                        case 'Rain':
                            iconoAnimado.src = './icons/animated/rainy-7.svg'; // Icono de lluvia
                            break;

                        case 'Snow':
                            iconoAnimado.src = './icons/animated/snowy-6.svg'; // Icono de nieve
                            break;

                        case 'Clear':
                            iconoAnimado.src = './icons/animated/day.svg'; // Icono de clima despejado
                            break;

                        case 'Atmosphere':
                            iconoAnimado.src = './icons/animated/weather.svg'; // Icono de atmósfera
                            break;

                        case 'Clouds':
                            iconoAnimado.src = './icons/animated/cloudy-day-1.svg'; // Icono de nubes
                            break;

                        default:
                            iconoAnimado.src = './icons/animated/cloudy-day-1.svg'; // Icono por defecto
                            break;
                    }
                })
                .catch(error => {
                    console.log(error); // Muestra el error en la consola si la solicitud falla
                });
        });
    }
});