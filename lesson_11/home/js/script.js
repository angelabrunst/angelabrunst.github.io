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

//town data
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);
        const towns = jsonObject['towns'];
        const townsA = [5, 1, 6]
        for (let i = 0; i < townsA.length; i++) {
            let card = document.createElement('section');
            let h2 = document.createElement('h2');
            let h4 = document.createElement('h4');
            let h3_1 = document.createElement('p');
            let h3_2 = document.createElement('p');
            let h3_3 = document.createElement('p');
            let img = document.createElement('img');

            h2.textContent = towns[townsA[i]].name;
            h4.textContent = '"' + towns[townsA[i]].motto + '"';
            h3_1.textContent = 'Year Founded: ' + towns[townsA[i]].yearFounded;
            h3_2.textContent = 'Population: ' + towns[townsA[i]].currentPopulation;
            h3_3.textContent = 'Annual Rainfall: ' + towns[townsA[i]].averageRainfall + '"';
            img.setAttribute('src', 'images/' + towns[townsA[i]].photo);
            img.setAttribute('alt', towns[townsA[i]].name + 'photo');

            card.appendChild(h2);
            card.appendChild(img);
            card.appendChild(h4);
            card.appendChild(h3_1);
            card.appendChild(h3_2);
            card.appendChild(h3_3);

            document.querySelector('div.towns').appendChild(card);



        }
    });