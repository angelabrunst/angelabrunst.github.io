const todaysDate = new Date();
const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};
document.getElementById("currentDate").textContent = todaysDate.toLocaleDateString('en-us', options);