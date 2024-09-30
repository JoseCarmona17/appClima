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