const apiKey = '6aa2835193b8c7a44bc01a26bbd96ffa';
const searchBtn = document.querySelector("#search-btn");
const weatherContainer = document.querySelector("#weather-container");
const weatherForecastKey = 'weather';
const weatherForecasts = [];
const emptyData = {
    main: {
        temp: '',
        'feels_like': '',
        'temp_min': '',
        'temp_max': '',
        pressure: '',
        humidity: ''
    }
}

searchBtn.addEventListener('click', () => {
    const citySearchBar = document.querySelector('#search-bar');
    if (citySearchBar === null || citySearchBar === '') return;
    weatherContainer.replaceChildren();
    let cityName;

    //clear data
    fillData(emptyData);

    axios({
        method: 'GET',
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchBar.value}&limit=1&appid=${apiKey}`,
        responseType: 'json'
    }).then(resp => {
        cityName = resp.data[0].name;
        axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${resp.data[0].lat}&lon=${resp.data[0].lon}&units=metric&lang=pl&appid=${apiKey}`,
            responseType: 'json'
        }).then( resp => {

            if ( resp.length === 0){
                citySearchBar.value = '';
                return alert("Nie znaleziono miasta");
            }

            if (resp.status === 200){
                createWeatherCard(cityName);
                fillData(resp.data)
                weatherForecasts.push(resp.data);
                window.localStorage.clear();
                window.localStorage.setItem(weatherForecastKey, JSON.stringify(weatherForecasts))
            }
        }).catch(e => console.log(e))
    }).catch(e => {
        if (e.response.status === 400) {
            citySearchBar.value = '';
            return alert("Nie znaleziono miasta");
        }
    })
});

const createWeatherCard = (cityName) => {
    const cityHeader = document.querySelector(".forecast__city");
    cityHeader.replaceChildren();
    cityHeader.innerText = cityName
}

const fillData = (data) => {
    const temp = document.querySelector("#temp");
    const feelsTemp = document.querySelector("#feels_like");
    const minTemp = document.querySelector("#temp_min");
    const maxTemp = document.querySelector("#temp_max");
    const pressure = document.querySelector("#pressure");
    const humidity = document.querySelector("#humidity");

    temp.innerText = data.main.temp;
    feelsTemp.innerText = data.main['feels_like'];
    minTemp.innerText = data.main['temp_min'];
    maxTemp.innerText = data.main['temp_max'];
    pressure.innerText = data.main.pressure;
    humidity.innerText = data.main.humidity;
}

(() => {
    weatherForecasts.push(...JSON.parse(window.localStorage.getItem(weatherForecastKey)));
})()