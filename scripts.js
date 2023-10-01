const mealContainer = document.getElementById("meal-container");
const categorySelect = document.getElementById("category");

// Function to fetch meals from an API
async function getMeals(category) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to display meals on the page
function displayMeals(meals) {
    mealContainer.innerHTML = "";

    if (meals.length === 0) {
        mealContainer.innerHTML = "<p>No meals found.</p>";
        return;
    }

    meals.forEach((meal) => {
        const mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");
        mealCard.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>Category: ${meal.strCategory}</p>
        `;
        mealContainer.appendChild(mealCard);
    });
}

// Event listener for category select
categorySelect.addEventListener("change", async () => {
    const selectedCategory = categorySelect.value;
    const meals = await getMeals(selectedCategory);
    displayMeals(meals);
});

// Initial load with "All" category
getMeals("all").then((meals) => displayMeals(meals));
