document.getElementById("checkWeatherBtn").addEventListener("click", loadWeather);
document.getElementById("clearBtn").addEventListener("click", clearResult);



function loadWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");
    if (!city.trim()) {
    result.innerHTML = "Please enter a city name.";
    return;
    }
    result.innerHTML = "Loading weather...";
    fetch(`https://wttr.in/${city}?format=j1`)
    .then(res => res.json())
    .then(data => {
    const weather = data.current_condition[0];
    result.innerHTML = `
    <h3>Weather in ${city}</h3>
    <img src="${weather.weatherIconUrl[0].field}">
    <p><strong>Temperature:</strong> ${weather.temp_C}°C</p>
    <p><strong>Feels Like:</strong> ${weather.FeelsLikeC}°C</p>
    <p><strong>Condition:</strong> ${weather.weatherDesc[0].value}</p>
    <p><strong>Humidity: </strong> ${weather.humidity}%</p>
    <p><strong>Cloud cover: </strong> ${weather.cloudcover}%</p>
    <p><strong>Wind Point: </strong> ${weather.winddir16Point}</p>
    <p><strong>Wind Degree: </strong> ${weather.winddirDegree}°</p>
    <p><strong>WindspeedKmph: </strong> ${weather.windspeedKmph}Kmph</p>
    <p><strong>Windspeed per miles: </strong> ${weather.windspeedMiles}ws per miles</p>

    `;
    })
    .catch(err => {
    result.innerHTML = "Error loading weather. Check your spelling or internet connection.";
    });
}


function clearResult() {
    document.getElementById("city").value = "";
    document.getElementById("result").innerHTML = "";
}