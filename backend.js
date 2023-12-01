
const apiKey = "c6a2c9d2213e2e27c40c33eaef674179"
var city;

function logWeather(){
  fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apiKey).then(response => response.json())
  .then(data => {
    console.log(JSON.stringify(data));
    temp = data.main.temp;
    console.log(temp);
    document.getElementById("pic").src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    document.getElementById("cityname").innerHTML = data.name;
    document.getElementById("temp").innerHTML = "Current Temp is: "+ data.main.temp+"°F";
    document.getElementById("description").innerHTML = "Current Weather:"+ data.weather[0].description;
  })
}


document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("searchCity").addEventListener("keyup", function(event){
    if(event.key === 'Enter'){
      city = document.getElementById("searchCity").value;
      console.log(city);
      logWeather();
    }
  });
});

