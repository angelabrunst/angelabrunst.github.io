//Event banner for Fridays
let eventDay = 5;
let day = new Date;
let currentDay = day.getDay();
if (currentDay == eventDay) {
    document.getElementById("eventBanner").innerHTML = "Pancake Breakfast in Preston Community Park - Saturday morning @ 9:00am!"
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
    var temp = 25
    var windSpeed = 5

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

//weather API
const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=5604473&appid=242f1fb78f229667592c2503b963e887";
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        let ptemp = Math.round((jsObject.main.temp - 273.15) * (9 / 5) + 32)
        document.getElementById('current-temp').textContent = ptemp;

        const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png'; // note the concatenation
        const desc = jsObject.weather[0].description; // note how we reference the weather array
        document.getElementById('imagesrc').textContent = imagesrc; // informational specification only
        document.getElementById('icon').setAttribute('src', imagesrc); // focus on the setAttribute() method
        document.getElementById('icon').setAttribute('alt', desc);
    });