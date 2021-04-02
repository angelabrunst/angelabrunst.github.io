const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
}
document.getElementById("lastUpdate").textContent = new Date().toLocaleDateString('en-us', options);