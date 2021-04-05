const requestURL = "json/businessInfo.json";

fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        const business = jsonObject['businesses'];
        for (let i = 0; i < business.length; i++) {
            let card = document.createElement('section');
            let img = document.createElement('img');
            let h3 = document.createElement('h3');
            let p = document.createElement('p');
            let p2 = document.createElement('p');
            let p3 = document.createElement('p');

            h3.textContent = business[i].company;
            p.textContent = business[i].address;
            p2.textContent = business[i].phone;
            p2.textContent = business[i].website;
            img.setAttribute('src', business[i].imageurl);
            img.setAttribute('alt', business[i].company + 'logo')

            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(p);
            card.appendChild(p2);
            card.appendChild(p3);


            document.querySelector('div#businessCards').appendChild(card);
        }
    });