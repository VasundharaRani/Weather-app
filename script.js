const apiKey = '5a933b7354df7a12467cd8c367c1467c';
const searchButton = document.getElementById('searchButton');
const locationButton = document.getElementById('locationButton');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Please enter a city name.');
    }
});

locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

function getWeatherByCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                cityName.textContent = `${data.name}, ${data.sys.country}`;
                temperature.textContent = `Temperature: ${data.main.temp}°C`;
                description.textContent = `Weather: ${data.weather[0].description}`;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            } else {
                alert('City not found. Please enter a valid city name.');
            }
        })
        .catch(() => {
            alert('Error fetching weather data. Please try again later.');
        });
}
