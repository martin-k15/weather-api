let weather = {
    apiKey: "99cfe9c3995a615c7937a9116a7127d4",
    fetchWeather(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        ).then((response) => {
            if (response.ok) {
                console.log("Response ok")
                document.querySelector(".error").innerHTML = "";
                document.querySelector(".city-load").style.display = "block";
                document.querySelector(".city-load").style.height = "0";
                document.querySelector(".city-load").style.animation = "showCity 0.8s 1";
                document.querySelector(".city-load").style.height = "12em";
                document.querySelector(".delay").style.animation = "delayedShow 1.4s 1"
                return response.json()
            }
        })
            .then((data) => this.displayWeather(data)).catch(error => {
                stop
                document.querySelector(".error").innerHTML = "Please enter an existing city.";
                console.log("City not found.")
            });
    },

    displayWeather(data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        console.log(data)
        console.log("DATA: " + data.sys.country);
        console.log(name, icon, description, temp, humidity);

        document.querySelector(".box__weather--city-name").innerHTML = name + " (" + data.sys.country + ")";
        document.querySelector(".box__weather--city-temp").innerHTML = temp + " &#xb0;C";

        document.querySelector(".box__weather--city-desc").innerHTML = description;
        document.querySelector(".box__weather--city-icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    },


    search() {
        this.fetchWeather(document.querySelector(".search__input").value);
    }
};

document.querySelector(".search__button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search__input").addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        weather.search();
    }
});



/* COUNT API */
function websiteVisits(response) {
    document.querySelector("#visits").textContent = response.value;
}

window.onload = (event) => {
    console.log("Page loaded.")
}