const apiKey = "f411e3237f76c236cb54f1107fe62216";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); 

async function checkWeather(city){
    const response = await fetch(apiUrl +city + `&appid=${apiKey}`); 

    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        let data = await response.json();

        console.log(data);
        document.querySelector(".city").innerHTML = data.name; 
        
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "ºc";
        document.querySelector(".huminity").innerHTML = data.main.humidity;  
        document.querySelector(".wind").innerHTML = data.wind.speed; 

        let sunriseData = new Date(data.sys.sunrise * 1000);
        let sunsetData = new Date(data.sys.sunset * 1000);
        
        document.querySelector(".sunrise").innerHTML = `${sunriseData.getHours()} ${sunriseData.getMinutes} ${sunriseData.getTimezoneOffset()}`;
        document.querySelector(".sunset").innerHTML = `${sunsetData.getHours()} ${sunsetData.getMinutes} ${sunsetData.getTimezoneOffset()}`;

        if(data.weather[0].main === "Clouds"){
            weatherIcon.src ="images/clouds.png";
        }
        else if (data.weather[0].main === "Clear"){
            weatherIcon.src ="images/clear.png";
        }
            else if (data.weather[0].main === "Rain"){
            weatherIcon.src ="images/rain.png";
        }
        else if (data.weather[0].main === "Snow"){
            weatherIcon.src ="images/snow.png";
        }
        else if (data.weather[0].main === "Drizzle"){
            weatherIcon.src ="images/drizzle.png";
        }
        else if (data.weather[0].main === "Mist"){
            weatherIcon.src ="images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

   
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    searchBox.value ="";
});

