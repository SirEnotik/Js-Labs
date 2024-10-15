document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = '1f8c0e4eeaf9f2183708128a5a88731a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
           localStorage.setItem('city', city);

                const weatherInfo = `
          <h3>Weather in ${data.name}</h3>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Feels like:</strong> ${data.main.feels_like}°C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        `;
                document.getElementById('weather-result').innerHTML = weatherInfo;
            } else {
                document.getElementById('weather-result').innerHTML = '<p>City not found!</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-result').innerHTML = '<p>Error fetching data!</p>';
        });
});

function ready() {
    const prevCity = localStorage.getItem('city');
    if (prevCity) {
        document.getElementById('city').value = prevCity;
        document.getElementById('get-weather').click()
    }
}

document.addEventListener("DOMContentLoaded", ready);