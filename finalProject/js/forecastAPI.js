function threeDayForecast() {
    var d = new Date();
    var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    console.log("checkpoint1")
    for (let i = 1; i < 6; i++) {
        let day = "weekDay" + i;
        let weekday = d.getDay() + i;
        console.log("checkpoint2")
        if (weekday > 6) {
            weekday = weekday - 7;
            document.getElementById(day).innerHTML = dayOfWeek[weekday];
            console.log("checkpoint3")
        } else {
            document.getElementById(day).innerHTML = dayOfWeek[weekday];
            console.log("checkpoint4")
        }
    }
}
const currentApiURL = "https://api.openweathermap.org/data/2.5/weather?id=5304391&units=imperial&appid=242f1fb78f229667592c2503b963e887";
fetch(currentApiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);


        let temp = jsObject.main.temp;
        let high = jsObject.main.temp_max;

        let cardF = document.createElement('div');
        let tempF = document.createElement('p');
        let imgF = document.createElement('img');
        let imgDes = document.createElement('p');
        let hum = document.createElement('p');

        tempF.textContent = "Currently: " + jsObject.main.temp.toFixed(0) + "\xB0 F";
        hum.textContent = "Humidity: " + jsObject.main.humidity + "%";

        const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';
        const desc = jsObject.weather[0].description;
        imgF.setAttribute('src', imagesrc);
        imgF.setAttribute('alt', desc);

        imgDes.textContent = desc;

        cardF.appendChild(tempF);
        cardF.appendChild(imgF);
        cardF.appendChild(imgDes);
        cardF.appendChild(hum);

        document.querySelector('div.currentW').appendChild(cardF);
    });

const forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?id=5304391&units=imperial&appid=242f1fb78f229667592c2503b963e887";
fetch(forecastApiURL)
    .then((response) => response.json())
    .then((jsForecast) => {
        console.log(jsForecast);


        var i = 1;
        for (var x = 0;
            (i < 2 || x < jsForecast.list.length); x++) {
            if (jsForecast.list[x].dt_txt.includes("18:00:00")) {
                let cardF = document.createElement('section');
                let tempF = document.createElement('p');
                let imgF = document.createElement('img');

                tempF.textContent = jsForecast.list[x].main.temp.toFixed(0) + "\xB0 F";

                const imagesrc = 'https://openweathermap.org/img/w/' + jsForecast.list[x].weather[0].icon + '.png';
                const desc = jsForecast.list[x].weather[0].description;
                imgF.setAttribute('src', imagesrc);
                imgF.setAttribute('alt', desc);

                cardF.appendChild(imgF);
                cardF.appendChild(tempF);


                document.querySelector('div.threeDay' + i).appendChild(cardF);

                i++;
            }
        }
    });