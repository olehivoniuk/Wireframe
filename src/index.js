let now = new Date();
console.log(now.getDate())
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes<10){
    minutes = `0${minutes}`;
};
if ( hours<10 ){
    hours = `0${hours}`;
}; 


let days = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]
let day = days[now.getDay()];
let lineDate = document.querySelector("#currentTime")
lineDate.innerHTML = day + " " + hours + ":" + minutes;


let apiKey = "0c82e3d9689abed74d1ce4e8c98ed561";

function searchCity (event){
    event.preventDefault();
    let seacrhInput = document.querySelector("#dataInput");
    
    let h3 = document.querySelector("h3");
    if (seacrhInput.value ){
        h3.innerHTML = seacrhInput.value 
    } else {
        alert("Please type the city")
    }
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${seacrhInput.value}&appid=0c82e3d9689abed74d1ce4e8c98ed561&units=metric`;
    console.log(apiUrl)

    function showTemperature(response){


        celciusTemperature = response.data.main.temp;

        let temp = celciusTemperature;
        let chosenTemp = document.querySelector("#tempSwitcher")
        chosenTemp.innerHTML =  Math.round(temp);

        let weatherDescription = response.data.weather[0].description; 
        let chosenDescriontion = document.querySelector("#description")
        chosenDescriontion.innerHTML = weatherDescription; 
        
    
        let weatherHumidity = response.data.main.humidity;
        let chosenHumidity = document.querySelector("#humidity")
        chosenHumidity.innerHTML = weatherHumidity; 

        let windSpeed = response.data.wind.speed;
        let chosenSpeed = document.querySelector("#speed")
        chosenSpeed.innerHTML = Math.round(windSpeed);

        
        let chosenIcon = document.querySelector("#icon");
        chosenIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 

        


    }
    axios.get(apiUrl).then(showTemperature);
  

}
let form = document.querySelector("#citySearch")
form.addEventListener("submit", searchCity)






function searchLocation (position){
    
    let apiKey = "0c82e3d9689abed74d1ce4e8c98ed561";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
function showTemperatureCurrent(response){
    console.log(response.data)
    let currentCityName = document.querySelector("#currentCity")
    currentCityName.innerHTML = response.data.name ;


    let temp = response.data.main.temp;
        let TempCurrent = document.querySelector("#tempSwitcher")
        TempCurrent.innerHTML =  Math.round(temp);

    let weatherDescriptionCurrent = response.data.weather[0].description;
        let chosenDescriontionCurrent = document.querySelector("#description");
        chosenDescriontionCurrent.innerHTML = weatherDescriptionCurrent; 

        

        let weatherHumidityCurrent = response.data.main.humidity;
        let chosenHumidityCurrent = document.querySelector("#humidity")
        chosenHumidityCurrent.innerHTML = weatherHumidityCurrent; 

        let windSpeedCurrent = response.data.wind.speed;
        console.log(windSpeedCurrent)
        let chosenSpeedCurrent = document.querySelector("#speed")
        chosenSpeedCurrent.innerHTML = Math.round(windSpeedCurrent);
        let chosenIcon = document.querySelector("#icon");
        chosenIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureCurrent);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation) 
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temp = document.querySelector("#tempSwitcher")
    let fahrenheitTemperature = (celciusTemperature * 9)/5 + 32;
    temp.innerHTML = Math.round(fahrenheitTemperature);    
};

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temp = document.querySelector("#tempSwitcher");
    temp.innerHTML = celciusTemperature;
};



let currentLocationButton = document.querySelector("#current-button")
currentLocationButton.addEventListener("click", getCurrentLocation)

let celciusTemperature = null;


let tempFaringates = document.querySelector("#fahrenheit");
tempFaringates.addEventListener("click", displayFahrenheitTemperature);

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", displayCelsiusTemperature);
