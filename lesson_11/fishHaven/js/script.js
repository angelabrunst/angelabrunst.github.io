//Event banner for Fridays
let eventDay = 5;
let day = new Date;
let currentDay = day.getDay();
if (currentDay == eventDay) {
    document.getElementById("eventBanner").innerHTML = "Boat parade on Bear Lake - Saturday morning @ 9:00am!"
}

//toggle menu for small media
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

//current date
function currentDate() {
    const todaysDate = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    document.getElementById("currentDate").textContent = todaysDate.toLocaleDateString('en-us', options);
}

//windchill calculator
function windChill() {
    var temp = document.getElementById('current-temp').innerHTML
    var windSpeed = document.getElementById('wind-speed').innerHTML

    if (temp > 50 && windSpeed < 3) {
        windChill = "N/A";
    } else {
        var chill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temp * Math.pow(windSpeed, 0.16));
        chill = Math.round(chill * 1) / 1;
    }
    document.getElementById('windChill').innerHTML = chill;
}

//Progressive Loading for Images
const imagesToLoad = document.querySelectorAll("img[data-src]");
const loadImages = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {
        image.removeAttribute("data-src");
    };
};
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}

//weather summary API
const apiCurrentURL = "https://api.openweathermap.org/data/2.5/weather?lat=42.3124&lon=-111.3135&units=imperial&appid=242f1fb78f229667592c2503b963e887";
fetch(apiCurrentURL)
    .then((response) => response.json())
    .then((jsObject) => {
        document.getElementById('current-temp').textContent = jsObject.main.temp.toFixed(0);
        document.getElementById('humidity').textContent = jsObject.main.humidity;
        document.getElementById('wind-speed').textContent = jsObject.wind.speed;
    });

//five day forecast API
function fiveDayForecast() {
    var d = new Date();
    var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    for (let i = 1; i < 6; i++) {
        let day = "fiveDay" + i;
        let weekday = d.getDay() + i;

        if (weekday > 6) {
            weekday = weekday - 7;
            document.getElementById(day).innerHTML = dayOfWeek[weekday];
        } else {
            document.getElementById(day).innerHTML = dayOfWeek[weekday];
        }
    }
}
const apiForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=42.3124&lon=-111.3135&units=imperial&appid=242f1fb78f229667592c2503b963e887";
fetch(apiForecastURL)
    .then((response) => response.json())
    .then((jsForecast) => {
        console.log(jsForecast);

        var i = 1;
        for (var x = 0; x < jsForecast.list.length; x++) {
            if (jsForecast.list[x].dt_txt.includes("18:00:00")) {
                let card = document.createElement('section');
                let temp = document.createElement('p');
                let img = document.createElement('img');

                temp.textContent = jsForecast.list[x].main.temp.toFixed(0) + "\xB0 F";

                const imagesrc = 'https://openweathermap.org/img/w/' + jsForecast.list[x].weather[0].icon + '.png';
                const desc = jsForecast.list[x].weather[0].description;
                img.setAttribute('src', imagesrc);
                img.setAttribute('alt', desc);

                card.appendChild(img);
                card.appendChild(temp);


                document.querySelector('div.fiveDay' + i).appendChild(card);

                i++;
            }
        }
    });

//Town Events API
const apiEventsURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(apiEventsURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);
        const towns = jsonObject['towns'];
        const townsA = [2]
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let p_1 = document.createElement('p');
        let p_2 = document.createElement('p');
        let p_3 = document.createElement('p');

        h2.textContent = towns[townsA].name + " Upcoming Events";
        p_1.textContent = towns[townsA].events[0];
        p_2.textContent = towns[townsA].events[1];
        p_3.textContent = towns[townsA].events[2];

        card.appendChild(h2);
        card.appendChild(p_1);
        card.appendChild(p_2);
        card.appendChild(p_3);

        document.querySelector('div.events').appendChild(card);
    });