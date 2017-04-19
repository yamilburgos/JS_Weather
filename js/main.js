console.log("main.js has been connected!");

$(function() {
    let cityName = document.querySelector("#cityName");
    let currentTemp = document.querySelector("#currentTemp");
    let description = document.querySelector("#description");
    let minTemp = document.querySelector("#minTemp");
    let maxTemp = document.querySelector("#maxTemp");
    
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
        
        let comboString = urlPart1 + textValue.value + urlPart2;
        let appendedString = ("https://accesscontrolalloworiginall.herokuapp.com/") + comboString;
        
        $.getJSON(appendedString, function(result) {
            cityName.textContent = "City Name: " + result.name;
            description.textContent = "Current Weather: " + result.weather[0].description;
            
            tempCheck(result.main.temp, result.main.temp_min, result.main.temp_max);
        });
    }
    
    function tempCheck(currentValue, minValue, maxValue) {        
        currentTemp.style.color = tempComparison(currentValue);
        minTemp.style.color = tempComparison(minValue);
        maxTemp.style.color = tempComparison(maxValue);

        currentTemp.textContent = "Current Temp: " + currentValue;
        minTemp.textContent = "Min Temp: " + minValue;
        maxTemp.textContent = "Max Temp: " + maxValue;
    }

    function tempComparison(value) {
        return value < 40 ? "blue" : value > 90 ? "red" : "black";
    }
});