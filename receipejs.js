document.getElementById('searchBtn').addEventListener('click', fetchRecipes);

function fetchRecipes() {
  const query = document.getElementById('searchInput').value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const recipesDiv = document.getElementById('recipes');
      recipesDiv.innerHTML = '';

      if (data.meals) {
        data.meals.forEach(meal => {
          const recipeHTML = `
            <div class="recipe">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <h3>${meal.strMeal}</h3>
              <p><strong>Category:</strong> ${meal.strCategory}</p>
              <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
            </div>
          `;
          recipesDiv.innerHTML += recipeHTML;
        });
      } else {
        recipesDiv.innerHTML = '<p class="noreceipe">No recipes found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}

