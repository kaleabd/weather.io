let weather = {
    apiKey: "307d1a74536daa9ce469bde50f0e4d17",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    document.querySelector(".error-message").innerHTML = `
                        <h1>We can't get a country named like this!</h1>
                        <h2>No weather found!</h2>
                    
                    `
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity, temp_min, temp_max, pressure } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".feelslike").innerText =
            "Feels like " + Math.round(feels_like) + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + Math.round(humidity) + "%";
        document.querySelector(".Windspeed").innerText =
            "Wind speed: " + Math.round(speed) + " km/h";
        document.querySelector(".Pressure").innerText =
            "Pressure: " + Math.round(pressure) + " mb";
        document.querySelector(".HighTemprature").innerText =
            "High Temprature: " + Math.round(temp_max) + " °C";
        document.querySelector(".LowTemprature").innerText =
            "Low Temprature: " + Math.round(temp_min) + " °C";
        document.querySelector(".weatherLoading").classList.remove("loading");
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchBar").value);
    },
    bishoftu: function() {
        this.fetchWeather(document.querySelector("#bishoftu").innerText)
    },
};

document.querySelector("#bishoftu").addEventListener("click", function() {
    weather.bishoftu();
});


document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document
    .querySelector(".searchBar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
weather.fetchWeather("adama");