console.log("main.js has been connected!");

$(function() {
    let cityName = document.querySelector("#cityName");
    let currentTemp = document.querySelector("#currentTemp");
    let description = document.querySelector("#description");
    let minTemp = document.querySelector("#minTemp");
    let maxTemp = document.querySelector("#maxTemp");

    let currentValue = 0;
    let minValue = 0;
    let maxValue = 0;

    // "http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=a2eb31bf2309c6b01b45a8021ce76b3e"
    let urlPart1 = "http://api.openweathermap.org/data/2.5/weather?zip=";
    let urlPart2 = ",us&units=imperial&appid=a2eb31bf2309c6b01b45a8021ce76b3e";

    let textValue = document.querySelector("#textValue");    
    document.querySelector("#button").addEventListener("click", function(){
        buttonPressed();
    });

    function buttonPressed() {
        if(isNaN(parseInt(textValue.value)) || textValue.value.length !== 5) {      
            return;
        }

        $.getJSON(urlPart1 + textValue.value + urlPart2, function(result) {
            console.log(result);

            cityName.textContent = "City Name: " + result.name;
            description.textContent = "Current Weather: " + result.weather[0].description;

            currentValue = result.main.temp;
            minValue = result.main.temp_min;
            maxValue = result.main.temp_max;

            tempCheck();
        });
    }

    function tempCheck() {        
        currentTemp.style.color = currentValue < 40 ? "blue" : currentValue > 90 ? "red" : "black";
        currentTemp.textContent = "Current Temp: " + currentValue;

        minTemp.style.color = minValue < 40 ? "blue" : minValue > 90 ? "red" : "black";
        minTemp.textContent = "Min Temp: " + minValue;

        maxTemp.style.color = maxValue < 40 ? "blue" : maxValue > 90 ? "red" : "black";
        maxTemp.textContent = "Max Temp: " + maxValue;
    }
});