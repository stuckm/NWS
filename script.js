
/*Global Variables */

const root = document.querySelector("#root");
const mapCont = document.querySelector("#map-container");
const submit = document.querySelector("#sub");
const city = document.querySelector("#icon_prefix2");
let state = { city: "Phoenix", lat: 33.4484, lon: -112.074 };

/*Load Inital data */
 
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=33.4484&lon=-112.0740&exclude=minutley&units=imperial&appid=eca311ff23cf5f22c22f3a925f51bd5f"
    )
      .then((response) => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error('something went wrong');
        }
      })
      
      .then((data) => {
        createCurrent(data);
        createHourly(data);
        createDaily(data);
        createMap();
      })
  
  .catch((error) => {
    console.error(error);
    let j = document.createElement("h1");
    j.innerText = "Sorry We ran into a Problem";
    root.appendChild(j);


  });

/*Materialize initalizer */
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems);
});




/*add precipitation map */
function createMap() {

  let j = document.createElement("h4");
  j.innerText = "Precipitation Map";
  j.classList.add("center-align");
  let divider = document.createElement("div");
  divider.classList.add("divider");
  root.appendChild(j);
  root.appendChild(divider);


  var map = L.map("mapid").setView([state.lat, state.lon], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  Precipitation = L.tileLayer(
    "http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=eca311ff23cf5f22c22f3a925f51bd5f",
    {
      maxZoom: 18,
      
    }
  ).addTo(map);

  L.marker([state.lat, state.lon])
    .addTo(map)

    .openPopup();
}

/*Fetch new weather data based on city name & clear screen */
submit.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city.value +
      "&units=imperial&appid=eca311ff23cf5f22c22f3a925f51bd5f"
  )
  .then((response) => {
    if(response.ok){
      return response.json();
    } else {
      throw new Error('Something went wrong, please refresh the page.');
    }
  })
    .then((data) => {
      console.log(data);
      clearScreen();
      updateCast(data);
    })
    .catch((error) => {
      clearScreen();
      console.error(error);
      let j = document.createElement("h2");
      j.innerText = "We could'nt find that forecast, please try again";
      root.appendChild(j);
  
  
    });
});

/*update weather based on coordiantes */
function updateCast(data) {
  state = {
    city: data.city.name,
    lat: data.city.coord.lat,
    lon: data.city.coord.lon,
  };
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      data.city.coord.lat +
      "&lon=" +
      data.city.coord.lon +
      "&exclude=minutley&units=imperial&appid=eca311ff23cf5f22c22f3a925f51bd5f"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createCurrent(data);
      createHourly(data);
      createDaily(data);
      createMap();
    });
}

/*create Current forecast */
function createCurrent(data) {
  let section = document.createElement("div");
  section.classList.add("section");

  let card = document.createElement("div");
  card.classList.add("card");

  let row = document.createElement("div");
  row.classList.add("row");

  let column12 = document.createElement("div");
  column12.classList.add("col");
  column12.classList.add("s12");
  column12.classList.add("center-align");

  let tempColumn = document.createElement("div");
  tempColumn.classList.add("col");
  tempColumn.classList.add("l4");
  tempColumn.classList.add("center-align");
  tempColumn.classList.add("s4");

  let deetsColumn = document.createElement("div");
  deetsColumn.classList.add("col");
  deetsColumn.classList.add("l4");
  deetsColumn.classList.add("s4");

  let iconColumn = document.createElement("div");
  iconColumn.classList.add("col");
  iconColumn.classList.add("l4");
  iconColumn.classList.add("center-align");
  iconColumn.classList.add("s4");

  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

let tr1 = document.createElement("tr");
let tr2 = document.createElement("tr");
let tr3 = document.createElement("tr");
let tr4 = document.createElement("tr");




  let feelHead = document.createElement("th");
let humHead = document.createElement("th");
let uvHead = document.createElement("th");
let windHead = document.createElement("th");

feelHead.innerText = "Feels Like";
humHead.innerText = "Humidity";
uvHead.innerText = "UV Index";
windHead.innerText = "Wind Speed";

  let temp = document.createElement("h2");
  temp.innerText =  Math.floor(data.current.temp) + "\xB0";

  let main = document.createElement("h5");
  let mainCap = capitalizeFirst(data.current.weather[0].description)
  main.innerText = mainCap;

  let header = document.createElement("h1");
  header.innerText = state.city;

  let time = document.createElement("p");
  time.innerText = moment().format("dddd, MMMM Do YYYY, h:mm a");

  let feels = document.createElement("td");
  feels.innerText = Math.floor(data.current.feels_like) + "\xB0";

  let hum = document.createElement("td");
  hum.innerText =  Math.floor(data.current.humidity) + " %";

  let uv = document.createElement("td");
  uv.innerText = Math.floor(data.current.uvi);

  let wind = document.createElement("td");
  wind.innerText =
     Math.floor(data.current.wind_speed) + " MPH"

  let img = document.createElement("img");
  img.setAttribute(
    "src",
   `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  );

    let table2 = document.createElement("table");
  let tbody2 = document.createElement("tbody"); 
  let tr5 = document.createElement("tr");
 let tr6 = document.createElement("tr");
  
let riseHead = document.createElement("th");
let setHead = document.createElement("th");

riseHead.innerText = "Sunrise"
setHead.innerText = "Sunset"

   let rise = moment.unix(data.current.sunrise);
let set = moment.unix(data.current.sunset);

  formatRise = rise.format("h:mm a");
 formatSet = set.format("h:mm a");

  let sunrise = document.createElement("td");
  sunrise.innerText = formatRise;

  let sunset = document.createElement("td");
  sunset.innerText = formatSet;



  column12.appendChild(header);
  column12.appendChild(time);
  row.appendChild(column12);

  iconColumn.appendChild(img);
  tr5.appendChild(riseHead);
  tr5.appendChild(sunrise);

  tr6.appendChild(setHead);
 tr6.appendChild(sunset);

  tbody2.appendChild(tr5);
  tbody2.appendChild(tr6);
  table2.appendChild(tbody2);
  iconColumn.appendChild(table2);


  row.appendChild(iconColumn);


  tempColumn.appendChild(temp);
  tempColumn.appendChild(main);
  row.appendChild(tempColumn);


  tr1.appendChild(feelHead);
  tr1.appendChild(feels);

  tr2.appendChild(humHead);
  tr2.appendChild(hum);

  tr3.appendChild(uvHead);
  tr3.appendChild(uv);

  tr4.appendChild(windHead);
  tr4.appendChild(wind);
  
  tbody.appendChild(tr1);
  tbody.appendChild(tr2);
  tbody.appendChild(tr3);
  tbody.appendChild(tr4);
  table.appendChild(tbody);

  deetsColumn.appendChild(table);
  row.appendChild(deetsColumn);

  card.appendChild(row);
  section.appendChild(card);
  root.appendChild(section);
}

/*create hourly forecast */
function createHourly(data) {
  /*Divider to seperate from current forecast*/
  let divider = document.createElement("div");
  divider.classList.add("divider");
  root.appendChild(divider);

  /*heading for hourly section*/
  let heading = document.createElement("h4");
  heading.innerText = "Hourly Forecast";
  heading.classList.add("center-align");
  heading.id = "hourly-row";
  root.appendChild(heading);

  //filter hourly periods for every 4 hours REPLACED
  /*  
var arr = [];
var maxVal = 12;
var delta = Math.floor(data.hourly.length / maxVal);
for (i = 0; i < data.hourly.length; i=i+delta){
arr.push(data.hourly[i]);
}
*/
  /*Reduce to 6 hours*/
  const hourlyCast = data.hourly.slice(0, 6);

  /*Create Row */
  let row = document.createElement("div");
  row.classList.add("row");
  

  /*Loop through each hour */
  hourlyCast.forEach((period) => {
    /*Dividers for Forecast data*/
    let divider1 = document.createElement("div");
    divider1.classList.add("divider");
    let divider2 = document.createElement("div");
    divider2.classList.add("divider");
    let divider3 = document.createElement("div");
    divider3.classList.add("divider");
    let divider4 = document.createElement("div");
    divider4.classList.add("divider");

    /*Format Date*/
    let dt = period.dt;

    let day = moment.unix(dt);
    day = day.format("hA");

    /*Create Column */
    let column = document.createElement("div");
    column.classList.add("col");
    column.classList.add("l2");
    column.classList.add("m4");
    column.classList.add("s12");

    /*Create Card */
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("card-content");
    card.classList.add("cast-card");

    /*Create Header*/
    let header = document.createElement("p");
    header.classList.add("card-title");
    header.classList.add("center-align");
    header.innerText = day;

    /*Data Row */
    let row2 = document.createElement("div");
    row2.classList.add("row");
    row2.classList.add("center-align");

    /* Temp Column */
    let tempColumn = document.createElement("div");
    tempColumn.classList.add("col");
    tempColumn.classList.add("l6");
    tempColumn.classList.add("s6");

    /*Data Column */
    let dataColumn = document.createElement("div");
    dataColumn.classList.add("col");
    dataColumn.classList.add("l6");
    dataColumn.classList.add("s6");

    /*Weather Data */
    let temp = document.createElement("p");
    temp.innerText = Math.floor(period.temp) + "\xB0";
    temp.classList.add("temp");

    let feels = document.createElement("p");
    feels.innerText = "Feels like: " + Math.floor(period.feels_like) + " F";

    let hum = document.createElement("p");
    hum.innerText = "Humidity: " + Math.floor(period.humidity) + " %";

    let pop = document.createElement("p");
    pop.innerText = "Chance of Rain: " + Math.floor(period.pop) + " %";

    let wind = document.createElement("p");
    wind.innerText = "Wind Speed: " + Math.floor(period.wind_speed) + " MPH";

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`
    );

    /*Insert Data*/
    card.appendChild(header);
    card.appendChild(divider1);

    tempColumn.appendChild(temp);
    tempColumn.appendChild(img);
    row2.appendChild(tempColumn);

    dataColumn.appendChild(feels);
    dataColumn.appendChild(divider2);
    dataColumn.appendChild(hum);
    dataColumn.appendChild(divider3);
    dataColumn.appendChild(pop);
    dataColumn.appendChild(divider4);
    dataColumn.appendChild(wind);
    row2.appendChild(dataColumn);
    card.appendChild(row2);

    column.appendChild(card);

    row.appendChild(column);

    root.appendChild(row);
  });
}

//create daily forecast
function createDaily(data) {
  /*create divider */
  let divider = document.createElement("div");
  divider.classList.add("divider");
  root.appendChild(divider);
  /*create daily heading */
  let heading = document.createElement("h4");
  heading.innerText = "Daily Forecast";
  heading.classList.add("center-align");
  heading.id = "daily-row";
  root.appendChild(heading);

  /*create row*/
  let row = document.createElement("div");
  row.classList.add("row");
  

  const daily = data.daily.slice(0, 6);
  console.log(daily);

  daily.forEach((period) => {
    /*Dividers for Forecast data*/
    let divider1 = document.createElement("div");
    divider1.classList.add("divider");
    let divider2 = document.createElement("div");
    divider2.classList.add("divider");
    let divider3 = document.createElement("div");
    divider3.classList.add("divider");
    let divider4 = document.createElement("div");
    divider4.classList.add("divider");

    /*Format Date*/
    let dt = period.dt;

    let day = moment.unix(dt);
    day = day.format("dddd");

    /*Create Column */
    let column = document.createElement("div");
    column.classList.add("col");
    column.classList.add("l2");
    column.classList.add("m4");
    column.classList.add("s12");

    /*Create Card */
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("card-content");
    card.classList.add("cast-card");

    /*Create Header*/
    let header = document.createElement("p");
    header.classList.add("card-title");
    header.classList.add("center-align");
    header.innerText = day;

    /*Data Row */
    let row2 = document.createElement("div");
    row2.classList.add("row");
    row2.classList.add("center-align");

    /* Temp Column */
    let tempColumn = document.createElement("div");
    tempColumn.classList.add("col");
    tempColumn.classList.add("l6");
    tempColumn.classList.add("s6");

    /*Data Column */
    let dataColumn = document.createElement("div");
    dataColumn.classList.add("col");
    dataColumn.classList.add("l6");
    dataColumn.classList.add("s6");

    /*Weather Data */
    let tempMax = document.createElement("p");
    tempMax.innerText = Math.floor(period.temp.max) + "\xB0";
    tempMax.classList.add("temp-day");

    let hr = document.createElement("hr");

    let tempMin = document.createElement("p");
    tempMin.innerText = Math.floor(period.temp.min) + "\xB0";
    tempMin.classList.add("temp-day");

    let feels = document.createElement("p");
    feels.innerText = period.weather[0].main;

    let hum = document.createElement("p");
    hum.innerText = "Humidity: " + Math.floor(period.humidity) + " %";

    let pop = document.createElement("p");
    pop.innerText = "Chance of Rain: " + Math.floor(period.pop) + " %";

    let wind = document.createElement("p");
    wind.innerText = "Wind Speed: " + Math.floor(period.wind_speed) + " MPH";

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`
    );

    /*Insert Data*/
    card.appendChild(header);
    card.appendChild(divider1);

    tempColumn.appendChild(tempMax);
    tempColumn.appendChild(hr);
    tempColumn.appendChild(tempMin);
    tempColumn.appendChild(img);
    row2.appendChild(tempColumn);

    dataColumn.appendChild(feels);
    dataColumn.appendChild(divider2);
    dataColumn.appendChild(hum);
    dataColumn.appendChild(divider3);
    dataColumn.appendChild(pop);
    dataColumn.appendChild(divider4);
    dataColumn.appendChild(wind);
    row2.appendChild(dataColumn);
    card.appendChild(row2);

    column.appendChild(card);

    row.appendChild(column);

    root.appendChild(row);
  });
}

/*clears weather data before inserting new data */
function clearScreen() {
  console.log("screen clear");
  root.innerHTML = "";
  let map = document.querySelector("#mapid");
  map.remove();
  let nextMap = document.createElement("div");
  nextMap.classList.add("container");
  nextMap.id = "mapid";
  mapCont.appendChild(nextMap);
}

let capitalizeFirst = string => {
  if (string.includes(" ")){
    let newString = string.charAt(0).toUpperCase() +  string.slice(1);
let index = string.indexOf(" ");
    string = newString.slice(0,index + 1) + newString.charAt(index + 1).toUpperCase() + string.slice(index + 2)
    return string
  } else {
      string = string.charAt(0).toUpperCase() + string.slice(1);
  return string
}
  }

