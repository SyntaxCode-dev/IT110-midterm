
document.getElementById("checkWeatherBtn")
    .addEventListener("click", loadWeather);

document.getElementById("locationBtn")
    .addEventListener("click", getCurrentLocation);

document.getElementById("clearBtn")
    .addEventListener("click", clearResult);


// Search weather using city name
function loadWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        document.getElementById("result").innerHTML =
            "Please enter a city name.";
        return;
    }

    getWeather(city);
}


// Get weather using the current location
function getCurrentLocation() {
    const result = document.getElementById("result");

    if (!navigator.geolocation) {
        result.innerHTML = "Geolocation is not supported by your browser.";
        return;
    }

    result.innerHTML = "Getting your current location...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            getWeather(`${latitude},${longitude}`, "Current Location");
        },
        function () {
            result.innerHTML =
                "Unable to get your location. Please allow location access.";
        }
    );
}


// Fetch weather information
function getWeather(location, displayName = location) {
    const result = document.getElementById("result");

    result.innerHTML = "Loading weather...";

    fetch(`https://wttr.in/${encodeURIComponent(location)}?format=j1`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Weather request failed");
            }

            return res.json();
        })
        .then(data => {
            if (!data.current_condition || !data.current_condition[0]) {
                throw new Error("Weather data unavailable");
            }

            const weather = data.current_condition[0];

            result.innerHTML = `
                <h3>Weather in ${displayName}</h3>

                <p><strong>Temperature:</strong> ${weather.temp_C}°C</p>

                <p><strong>Feels Like:</strong> ${weather.FeelsLikeC}°C</p>

                <p><strong>Condition:</strong>
                    ${weather.weatherDesc[0].value}
                </p>

                <p><strong>Humidity:</strong> ${weather.humidity}%</p>

                <p><strong>Cloud Cover:</strong> ${weather.cloudcover}%</p>

                <p><strong>Wind Direction:</strong>
                    ${weather.winddir16Point}
                </p>

                <p><strong>Wind Degree:</strong>
                    ${weather.winddirDegree}°
                </p>

                <p><strong>Wind Speed:</strong>
                    ${weather.windspeedKmph} km/h
                </p>

                <p><strong>Wind Speed (Miles):</strong>
                    ${weather.windspeedMiles} mph
                </p>
            `;
        })
        .catch(error => {
            result.innerHTML =
                "Error loading weather. Check your location or internet connection.";
        });
}


// Clear input and results
function clearResult() {
    document.getElementById("city").value = "";
    document.getElementById("result").innerHTML = "";
}
