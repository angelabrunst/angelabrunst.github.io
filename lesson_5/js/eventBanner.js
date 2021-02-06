let eventDay = 5;
let day = new Date;
let currentDay = day.getDay();

if (currentDay == eventDay) {
    document.getElementById("eventBanner").innerHTML = "Pancake Breakfast in Preston Community Park - Saturday morning @ 9:00am!"
}