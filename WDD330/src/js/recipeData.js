const baseURL = 'https://www.themealdb.com/api/json/v1/1/';

const category = getParam('category');
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
window.addEventListener('load', getCategoryList);
searchBtn.addEventListener('click', getRecipeList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get parameter
function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

// create recipe list for search feature
function getRecipeList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(baseURL + `search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item recipe-card" data-id = "${meal.idMeal}">
                        <img src = "${meal.strMealThumb}" alt = "Image of ${meal.strMeal}"> 
                        <h3 class="recipe-name recipe-type">${meal.strMeal}</h3>
                        <a href = "#" class = "recipe-btn">View Recipe</a>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}



// create recipe list for catergories page
function getCategoryList() {
    fetch(baseURL + `filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            data.meals.forEach(meal => {
                html += `
                <div class = "meal-item recipe-card" data-id = ${meal.idMeal} >
                    <img src = "${meal.strMealThumb}" alt = "Image of ${meal.strMeal}"> 
                    <h3 class="recipe-name recipe-type">${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn">View Recipe</a>
                </div>
            `;
            });
            mealList.innerHTML = html;
        });
}

// get recipe instructions
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement;
        var mealid = mealItem.getAttribute('data-id')
        console.log(mealid);
        fetch(baseURL + `lookup.php?i=${mealid}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "recipe-ingredients">
            <h3>Ingredients:</h3>
            <ul>
                <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
                <li>${meal.strMeasure7} ${meal.strIngredient7}</li>
            </ul>
        </div>
        <div class = "recipe-instruct">
            <h3>Directions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "Image of ${meal.strMeal}">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Recipe Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}