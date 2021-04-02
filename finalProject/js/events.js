const apiEventsURL = 'json/events.json';

fetch(apiEventsURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);
        const towns = jsonObject['towns'];
        const townsA = [0]
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