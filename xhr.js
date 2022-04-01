const getBtn = document.getElementById("get-btn");
const search = document.getElementById("search");
const main = document.querySelector(".weather-info-container");
document.addEventListener("DOMContentLoaded", myFunction);

function myDisplayer() {
  let retrievedArray = JSON.parse(localStorage.getItem("weatherDataArray"));
  // console.log(retrievedArray);

  main.innerHTML = " ";

  for (let i = 0; i < retrievedArray.length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "weather-info");
    document.querySelector(".weather-info-container").appendChild(div);

    let para1 = document.createElement("p");
    para1.setAttribute("class", "name");
    para1.appendChild(
      document.createTextNode("City: " + retrievedArray[i].Name)
    );
    const x = document.getElementsByClassName("weather-info");
    x[i].appendChild(para1);

    let para2 = document.createElement("p");
    para2.setAttribute("class", "country");
    para2.appendChild(
      document.createTextNode("Country: " + retrievedArray[i].Country)
    );
    x[i].appendChild(para2);

    let para3 = document.createElement("p");
    para3.setAttribute("class", "temp_c");
    para3.appendChild(
      document.createTextNode(
        "Temperature_C: " + retrievedArray[i].Temprature_C
      )
    );
    x[i].appendChild(para3);

    let para4 = document.createElement("img");
    para4.setAttribute("class", "icon");
    para4.setAttribute("src", retrievedArray[i].Icon);
    x[i].appendChild(para4);

    let button = document.createElement("button");
    button.setAttribute("class", "button");
    button.type = "button";
    button.appendChild(document.createTextNode("Click me!"));
    x[i].appendChild(button);

    button.addEventListener("click", function () {
      const F = (9 * retrievedArray[i].Temprature_C + 32 * 5) / 5;
      const tempF = "Temperature_F: " + F;
      para3.classList.toggle("temp_f");
      if (para3.classList.contains("temp_f")) {
        para3.textContent = tempF;
      } else {
        para3.textContent = "Temperature_C: " + retrievedArray[i].Temprature_C;
      }
    });
  }
}
const myDataStorage = (some) => {
  let weatherDataArray;
  let weatherDataObject;
  weatherDataObject = {
    Name: some.location.name,
    Country: some.location.country,
    Temprature_C: some.current.temp_c,
    Temprature_F: some.current.temp_f,
    WindKPH: some.current.wind_kph,
    Pressure_IN: some.current.pressure_in,
    Precipitation_MM: some.current.precip_mm,
    Humidity: some.current.humidity,
    FeelsLikeC: some.current.feelslike_c,
    FeelsLikeF: some.current.feelslike_f,
    Cloud: some.current.cloud,
    Icon: some.current.condition.icon,
  };
  if (localStorage.getItem("weatherDataArray") === null) {
    weatherDataArray = [];
  } else {
    weatherDataArray = JSON.parse(localStorage.getItem("weatherDataArray"));
  }
  weatherDataArray.unshift(weatherDataObject);
  localStorage.setItem("weatherDataArray", JSON.stringify(weatherDataArray));

  myDisplayer();
};

const getWeatherByLocation = function (city, myCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `http://api.weatherapi.com/v1/current.json?key=96bbc40fb59d4648a28165733222502&q=${city}&aqi=no`,
    true
  );

  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status == 200) {
      const data = xhr.response;
      // console.log(data);
      myCallback(data);
    } else {
      myCallback("Error: " + xhr.status);
    }
  };

  xhr.send();
};

getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city, myDataStorage);
  }
});

function myFunction() {
  let retrievedArray = JSON.parse(localStorage.getItem("weatherDataArray"));
  main.innerHTML = " ";

  for (let i = 0; i < retrievedArray.length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "weather-info");
    document.querySelector(".weather-info-container").appendChild(div);

    let para1 = document.createElement("p");
    para1.setAttribute("class", "name");
    para1.appendChild(
      document.createTextNode("City: " + retrievedArray[i].Name)
    );
    const x = document.getElementsByClassName("weather-info");
    x[i].appendChild(para1);

    let para2 = document.createElement("p");
    para2.setAttribute("class", "country");
    para2.appendChild(
      document.createTextNode("Country: " + retrievedArray[i].Country)
    );
    x[i].appendChild(para2);

    let para3 = document.createElement("p");
    para3.setAttribute("class", "temp_c");
    para3.appendChild(
      document.createTextNode(
        "Temperature_C: " + retrievedArray[i].Temprature_C
      )
    );
    x[i].appendChild(para3);

    let para4 = document.createElement("img");
    para4.setAttribute("class", "icon");
    para4.setAttribute("src", retrievedArray[i].Icon);
    x[i].appendChild(para4);

    let button = document.createElement("button");
    button.setAttribute("class", "button");
    button.type = "button";
    button.appendChild(document.createTextNode("Click me!"));
    x[i].appendChild(button);

    button.addEventListener("click", function () {
      const F = (9 * retrievedArray[i].Temprature_C + 32 * 5) / 5;
      const tempF = "Temperature_F: " + F;
      para3.classList.toggle("temp_f");
      if (para3.classList.contains("temp_f")) {
        para3.textContent = tempF;
      } else {
        para3.textContent = "Temperature_C: " + retrievedArray[i].Temprature_C;
      }
    });
  }
}
// localStorage.clear();
