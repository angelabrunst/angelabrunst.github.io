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