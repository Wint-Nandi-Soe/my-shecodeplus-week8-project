function displayDate(time){
    let date= new Date(time);
    let hour = date.getHours();
    if (hour<10){
        hour = `0${hour}`;
    }
    let minutes =date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday", "Monday","Tueday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];
    return `${day} ${hour}:${minutes}`;
}

function formatday(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
}

function displayForecast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#main-forecast");
    let weatherForecast = response.data.daily;

    let forecast = `<div class="row">`;
    weatherForecast.forEach(function (day, index) {
        if (index < 6) {
            forecast = forecast +
                `<div class="col-2">
                   <div class="weather-forecast-day">${formatday(day.dt)}</div>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-img" width="20px"/>
                    <div class="weather-forecast">
                        <span id="max-temp">${Math.round(day.temp.max)}°</span>
                        <span id="min-temp">${Math.round(day.temp.min)}°</span>
                    </div>
                </div>`;
        }
    });
    forecast = forecast + `</div>`;
    forecastElement.innerHTML = forecast;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "49b631c45785fe73d2a88477803dea22";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
}
function displayTemperature (response){
    let tempElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descElement= document.querySelector("#description");
    let humiElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    cityElement.innerHTML=response.data.name;
    tempElement.innerHTML=Math.round(response.data.main.temp);
    descElement.innerHTML=response.data.weather[0].description;
    humiElement.innerHTML= response.data.main.humidity;
    windElement.innerHTML=response.data.wind.speed;
    dateElement.innerHTML=displayDate(response.data.dt*1000);
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
    celsiusTemp=response.data.main.temp;
    getForecast(response.data.coord);
}
function searchCity(city){
    let apiKey = "f25f47a5f94b046a3902e21ded66f15f";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayTemperature);
}

function displayName(event){
    event.preventDefault();
    let cityName=document.querySelector("#city-input");
    searchCity(cityName.value);
}



function displayCTemperature(event){
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML= Math.round(celsiusTemp);
}
searchCity("New York");


//Form Section
let form = document.querySelector("#class-form");
form.addEventListener("submit", displayName);

let celsiusElement = document.querySelector("#celsius");
let celsiusTemp=null;
celsiusElement.addEventListener("click", displayCTemperature);

