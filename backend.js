
const apiKey = "c6a2c9d2213e2e27c40c33eaef674179"
var city;

function logWeather(){
  fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + apiKey).then(response => response.json())
  .then(data => {
    console.log(JSON.stringify(data));
    var temp = data.main.temp ;
    console.log(temp);
    document.getElementById("pic").src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    document.getElementById("cityname").innerHTML = data.name;
    document.getElementById("temp").innerHTML = "Current Temp is: "+ temp +"°C";
    document.getElementById("description").innerHTML = "Current Weather:"+ data.weather[0].description; 
  })
}



//5 DAY WEATHER FORECAST FUNCTION

function weatherForecast(){
//Forecast API call
fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=6e8c7471657cebea1c28bab30dc56922")
.then (response => response.json())
.then (forecastAPI =>{
  
  console.log(forecastAPI)

  //take day info
  //Format to month/day
  function daysOutput(daysRaw){
    const fullDay =daysRaw.split(" ");          // ["2023-12-05","09:00:00"]
          fullDay.pop();                        //"2023-12-05"
    const nonYearDay = fullDay[0].split("-");   //["2023","12","05"]
          nonYearDay.shift();                   //["12","05"]
    const dayJoin = nonYearDay.join("/")        //["12/05"]
    return dayJoin;                             //ex day: 12/05 
  }


  const dayArray=[];
  for (let i=0; i<40 ; i+=8){ //i[1]=9h00 i[2]=9h00+3h00

    //take day info
    const daysRaw=forecastAPI["list"][i]["dt_txt"];
    daysOutput(daysRaw)
    dayArray.push(daysOutput(daysRaw)); //[["12-05"],["12-06"]...]

  }
  document.getElementById("day0").innerHTML = dayArray[0];
  document.getElementById("day1").innerHTML = dayArray[1];
  document.getElementById("day2").innerHTML = dayArray[2];
  document.getElementById("day3").innerHTML = dayArray[3];
  document.getElementById("day4").innerHTML = dayArray[4];

  console.log(dayArray);


//take temp info
function celTemp(kelTemp){
    return Math.floor((kelTemp-273.15)+0.5); //conver K to C in int
} 
  const temArray=[];
  for (let i=0; i<40 ; i+=8){
    const kelTemp= forecastAPI["list"][i]["main"]["temp"];
    temArray.push(celTemp(kelTemp))
  }
  document.getElementById("temperature0").innerHTML = temArray[0];
  document.getElementById("temperature1").innerHTML = temArray[1];
  document.getElementById("temperature2").innerHTML = temArray[2];
  document.getElementById("temperature3").innerHTML = temArray[3];
  document.getElementById("temperature4").innerHTML = temArray[4];
  console.log(temArray);


  //take weather image array
  const imgInfoArr =[];
  const imgArr = document.getElementsByClassName("weather-icon");
  for (let i=0; i<40 ; i+=8){
  imgInfoArr.push(forecastAPI["list"][i]["weather"][0]["main"]);
  }
  
  for (let i=0; i<5; i++){
    switch (imgInfoArr[i]){
      case "Clouds":
        imgArr[i]["src"] ="assets\\cloudy.png";
        break;     
      case "Rain":
        imgArr[i]["src"] ="assets\\rainy.png";
        break;     
      case "Clear":
        imgArr[i]["src"] ="assets\\clear.png";
        break;     
      case "Snow":
        imgArr[i]["src"] ="assets\\snow.png";
        break;     

    }
  }
  console.log(imgInfoArr);
})
}


// take cityName By search bar
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("searchCity").addEventListener("keyup", function(event){
    if(event.key === 'Enter'){
      city = document.getElementById("searchCity").value;

      logWeather();
      weatherForecast()
    }
  });
});




