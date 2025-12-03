const apiKey = "yor key"
const button = document.getElementById("getWeatherBtn");
const input = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

button.addEventListener("click", () => {
    const city = input.value;
    if (city === "") {
        resultDiv.innerHTML = "Please enter a city name";
        return;
    }

    fetchWeather(city)
        .then(weather => {
            resultDiv.innerHTML = `
                <h3>${weather.name}, ${weather.sys.country}</h3>
                <p>Temperature: ${weather.main.temp}°C</p>
                <p>Weather: ${weather.weather[0].description}</p>
                <p>Humidity: ${weather.main.humidity}%</p>
            `;
        })
        .catch(err => {
            resultDiv.innerHTML = "City not found or API error";
            console.error(err);
        });
});

// Function using Promises
function fetchWeather(city) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    reject("Error fetching data");
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

