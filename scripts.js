const apiKey = "f411e3237f76c236cb54f1107fe62216";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); 
const unfavbtn = document.querySelector(".unfavorited"); 
const favbtn = document.querySelector(".favorited"); 
const favCitiesList = document.querySelector(".favorite-cities");


//this get the broweser to store any local files known as fav citys if not created it creates an array, hewnce it can have past data
let favCities = JSON.parse(localStorage.getItem("favCities")) || [];
renderFavorites();

async function checkWeather(city){
    
    //getting the data
    const response = await fetch(apiUrl +city + `&appid=${apiKey}`); 

    //if there is an error we want to show an error message 
    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        //await means there is a promised return from the json file, the respose.json converts the http response into a JS array 
        let data = await response.json();

        //i fhte city is in favs aready we want the star to show
        if (favCities.includes(city)) {
            updateStar(true, city); 
        } else {
            updateStar(false, city); 
        }

        renderFavorites();
        console.log(data);
        //target the html classes to change the values by the server
        document.querySelector(".city").innerHTML = data.name; 
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "ºc";
        document.querySelector(".huminity").innerHTML = data.main.humidity + "%";  
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"; 

        //convert the data into a valid date
        let sunriseData = new Date(data.sys.sunrise * 1000);
        let sunsetData = new Date(data.sys.sunset * 1000);
        
       //update the sunset and sun rise time 
        document.querySelector(".sunrise").innerHTML = sunriseData.getHours() + ":"+ sunriseData.getMinutes().toString().padStart(2, '0');
        document.querySelector(".sunset").innerHTML = sunsetData.getHours() + ":"+ sunriseData.getMinutes().toString().padStart(2, '0');


        //change the imgae on the weather screen 
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
        //make sure that the proprer messages are showing 
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

   
}

//EVENT LISTERNS 

//when the earch bar is clicked you search the weather fo that city
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    
    document.querySelector(".favorited").style.display = "none";
    document.querySelector(".unfavorited").style.display = "block";
    
   
});

//when enter is clicked you can search 
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
       
       
        document.querySelector(".favorited").style.display = "none";
        document.querySelector(".unfavorited").style.display = "block";

        
    }
});

//when you click the blank star it will favorite that city and change the star icon to a star
unfavbtn.addEventListener("click", ()=>{
   
    
        let currentCity = searchBox.value; 
       
        addToFavorites(currentCity)
        updateStar(true);
        
    
   
    
}); 

//when you click the fav button then the star will turn back to blank and the city will be removec from favorites 
favbtn.addEventListener("click", ()=>{
    let currentCity = searchBox.value; 
   
    removeFromFavorites(currentCity);
    updateStar(false);
   
   
    
}); 

favCitiesList.addEventListener("click", (event) =>{
    if(event.target.tagName === "LI"){
        
        const city = event.target.textContent; 
        
        searchBox.value = city;
        
        checkWeather(city);
    }
}); 


//displays favorites 
function renderFavorites() {
    favCitiesList.innerHTML = "";
    favCities.forEach(city => {
      const cityItem = document.createElement("li");
      cityItem.textContent = city;
      favCitiesList.appendChild(cityItem);
    });
  }
//add the city to the vaorites array 
  function addToFavorites(city) {
    if (!favCities.includes(city)) {
      favCities.push(city);
      localStorage.setItem("favCities", JSON.stringify(favCities));
      renderFavorites();
    }
  }

  //removes the city form the favorites array
  function removeFromFavorites(city) {
    favCities = favCities.filter(favCity => favCity !== city);
    localStorage.setItem("favCities", JSON.stringify(favCities));
    renderFavorites();
  }

  //updates the star
function updateStar(isFave,){

    if(isFave){
        document.querySelector(".unfavorited").style.display = "none";
        document.querySelector(".favorited").style.display = "block";

    }
    else{
        document.querySelector(".unfavorited").style.display = "block";
        document.querySelector(".favorited").style.display = "none";
    

    }
}

function checkIfInFavorites(city){
    return favCities.includes(city);

}

