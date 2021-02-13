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