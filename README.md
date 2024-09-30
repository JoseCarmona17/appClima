
Documentación de la Aplicación Clima

1. Descripción del Proyecto

La Aplicación Clima es una herramienta web que permite a los usuarios conocer las condiciones climáticas actuales de su ubicación utilizando la API de OpenWeatherMap. La aplicación obtiene datos meteorológicos en tiempo real, como temperatura, descripción del clima, velocidad del viento y ubicación, y la muestra de manera visualmente atractiva.

2. Objetivo del Ejercicio

El objetivo de este ejercicio es aplicar las arquitecturas cliente/servidor vistas en la unidad. En este caso, la aplicación actúa como el cliente que consume la API del servidor (OpenWeatherMap) para obtener información sobre el clima. Esta aplicación permite entender cómo se implementa la arquitectura cliente/servidor y cómo se realiza la comunicación entre ambos.

3. Funcionamiento de la Aplicación

La aplicación funciona de la siguiente manera:

1. Geolocalización: Al cargar la página, se solicita la ubicación del usuario mediante la API de geolocalización del navegador.
2. Llamada a la API: Una vez obtenida la latitud y longitud, se construye la URL de la API de OpenWeatherMap con esos parámetros.
3. Obtención de Datos: Se realiza una solicitud `fetch` a la API, recuperando los datos en formato JSON.
4. Visualización de Datos: Los datos obtenidos se procesan y se muestran en la interfaz de usuario, incluyendo la temperatura, la descripción del clima, la ubicación y la velocidad del viento.
5. Iconos Animados: Dependiendo del estado del clima, se muestra un icono animado que representa las condiciones meteorológicas.

4. Montaje de la Aplicación

Para montar y ejecutar la aplicación, sigue los siguientes pasos:

1. Requisitos Previos:
   - Asegúrate de tener un navegador web moderno que soporte la API de geolocalización.
   - Necesitas una clave de API de OpenWeatherMap. Regístrate en su [sitio web](https://openweathermap.org/api) para obtener una.

2. Estructura de Archivos:
   - index.html: Contiene la estructura HTML de la aplicación.
   - app.js: Contiene el código JavaScript para manejar la lógica de la aplicación.
   - style.css: Contiene los estilos de la aplicación.
   - /icons/: Carpeta que contiene los iconos animados usados para mostrar el clima.

3. Instrucciones:
   - Crea una carpeta para tu proyecto y dentro de ella, crea los archivos mencionados.
   - Copia y pega el código HTML, JavaScript y CSS en los archivos correspondientes.
   - Reemplaza la clave de API en la línea donde se crea la URL en `app.js`:
     javascript
     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=TU_CLAVE_DE_API&units=metric`;
     ```
   - Abre `index.html` en tu navegador.

 ![image](https://github.com/user-attachments/assets/cfda1c27-ead0-4761-bc05-98e7c935b9b2)




5. Herramientas Utilizadas

- HTML: Para la estructura de la página.
- CSS: Para el estilo visual de la aplicación.
- JavaScript: Para la lógica de la aplicación y la interacción con la API.
- API de OpenWeatherMap: Para obtener datos meteorológicos.
- API de Geolocalización: Para obtener la ubicación del usuario.

6. Código

Index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Clima</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <div id="contenedor">
        <div id="caja1">
            <h1 id="temperatura-valor"></h1>
            <h1 id="temperatura-descripcion"></h1>
        </div>
        <div id="caja2">
            <h2 id="ubicacion"></h2>
            <img id="icono-animado" src="" alt="" height="128" width="128">
        </div>
        <div id="caja3">
            <h3>Veloc. del viento</h3>
            <h3 id="viento-velocidad"></h3>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>

app.js
window.addEventListener('load', () =>{

    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion => {
            //console.log(posicion.coords.latitude, posicion.coords.longitude);
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=49d8e0d9374fad36fa1e8ab46c47157b&units=metric`
            //console.log(url);

            fetch(url)
                .then( response => {return response.json() })
                .then( data => {

                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} °C`

                    
                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`
                

                   //iconos

                   console.log(data.weather[0].main);
                   switch (data.weather[0].main){
                        
                        case 'Thunderstrom':
                            iconoAnimado.src = './icons/animated/thunder.svg'
                            console.log('TORMENTA');
                            break
                        
                        case 'Drizzle':
                            iconoAnimado.src = './icons/animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                            break

                        case 'Rain':
                            iconoAnimado.src = './icons/animated/rainy-7.svg'
                            console.log('LLUVIA');
                            break

                        case 'Snow':
                            iconoAnimado.src = './icons/animated/snowy-6.svg'
                            console.log('NIEVE');
                            break

                        case 'Clear':
                            iconoAnimado.src = './icons/animated/day.svg'
                            console.log('LIMPIO');
                            break;

                        case 'Atmosphere':
                            iconoAnimado.src = './icons/animated/weather.svg'
                            console.log('ATMOSFERA');
                            break;

                        case 'Clouds':
                            iconoAnimado.src = './icons/animated/cloudy-day-1.svg'
                            console.log('NUBES');
                            break

                        default:
                            iconoAnimado.src = './icons/animated/cloudy-day-1.svg'
                            console.log('POR DEFECTO');

                   }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
})

style.css
* {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    background-image: url('./icons/Bosques-nublados.jpeg');
    height: 90vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
   /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

#contenedor {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
}

#caja1, #caja2, #caja3 {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    padding-top: 20%;
    width: 200px;
    height: 200px;
    border-radius: 15px;
    -webkit-box-shadow: 7px 9px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 9px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 7px 9px 5px 0px rgba(0,0,0,0.75);
    
}

#caja1{
    background-color: rgba(0,0,0,0.1);
    color: black;
 
}

#caja2{
    background-color: rgba(0,0,0,0.1);
    color: balck;

}

#caja3{
    background-color: rgba(0,0,0,0.1);
    color: balck;
    
}


7. Conclusión

La Aplicación Clima demuestra cómo se puede utilizar la arquitectura cliente/servidor para crear una herramienta útil y visualmente atractiva que consume datos de una API externa. A través de este ejercicio, se refuerza el entendimiento de las interacciones entre el cliente y el servidor, así como el uso de tecnologías web modernas.

