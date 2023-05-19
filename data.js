


const API_KEY='c30b9da37413b79f71afc1ba1f4d00e5'
const API_URL='https://api.openweathermap.org/data/2.5/weather?units=metric&'

/* Search  */
const søkeFelt  = document.querySelector('.søk input');
const søkeKnapp = document.querySelector('.søk button');
const værIkon = document.querySelector('.vær__ikon');



const getWeather = async (city) => {
    const response = await fetch( API_URL + `q=${city}` + `&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    /* Feilhåndtering - bad request */
    if (response.status == 404) {
        document.querySelector('.feilmelding').style.display = 'block';
        document.querySelector('.feilmelding').innerHTML = 'Byen finnes ikke, vennligst forsøk på nytt.';
    } else {

    document.querySelector('.vær__by').innerHTML = data.name;
    document.querySelector('.vær__temp').innerHTML = Math.round(data.main.temp + 2) + "°c";
    document.querySelector('.vind').innerHTML = data.wind.speed + " m/s";
    document.querySelector('.luftfuktighet').innerHTML = data.main.humidity + "%";
    document.querySelector('.vær__dato').innerHTML = new Date().toLocaleDateString('no-NO', {weekday: 'long', month: 'long', day: 'numeric'});

    /* Dynamisk værforhold */
    if (data.weather[0].main == 'Clouds') {
        værIkon.src = 'bilder/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
        værIkon.src = 'bilder/clear.png';
    } else if (data.weather[0].main == 'Rains') {
        værIkon.src = 'bilder/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
        værIkon.src = 'bilder/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
        værIkon.src = 'bilder/mist.png';
    } else if (data.weather[0].main == 'Wind')  {
        værIkon.src = 'bilder/wind.png';
    } else if (data.weather[0].main == 'Snow')  {
        værIkon.src = 'bilder/snow.png';
    }

    document.querySelector('.vær').style.display = 'block';
    document.querySelector('.feilmelding').style.display = 'none';
  }
}


søkeKnapp.addEventListener('click', () => {
    getWeather(søkeFelt.value);
})

getWeather()