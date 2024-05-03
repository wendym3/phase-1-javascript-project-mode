// Define the base URL for API

const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

// Function to search and display meal information

const searchMeal = async (e) => {
  e.preventDefault();

  // Selecting DOM elements


  const input = document.querySelector('.input');
  const title = document.querySelector('.title');
  const info = document.querySelector('.info');
  const img = document.querySelector('.img');
  const ingredientsOutput = document.querySelector('.ingredients');


  // Function to display the meal details

  const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;

    // Displaying meal title and image

    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;

    // Displaying meal instructions

    const instructionsArray = strInstructions.split('\n');
    const instructionsHTML = instructionsArray.map(step => `<p>${step}</p>`).join('');
    info.innerHTML = instructionsHTML;

    // Gathering and display ingredients

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      } else {
        break;
      }
    }

    // Displaying ingredients in a list

    const ingredientsHTML = `
      <h3>Ingredients:</h3>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>`;
    ingredientsOutput.innerHTML = ingredientsHTML;
  };

  // Show alert if meal is not found
  
  const showAlert = () => {
    alert('Meal not available :(');
  };

  // Fetch meal data from API

  const fetchMealData = async (val) => {
    try {
      const res = await fetch(`${baseUrl}/search.php?s=${val}`);
      const { meals } = await res.json();
      return meals;
    } catch (error) {
      console.error('Error fetching meal data:', error);
      return null;
    }
  };

  // Retrieve search query value

  const val = input.value.trim();

  // Check if input is not empty
  if (val) {
    try {
      const meals = await fetchMealData(val);

      if (!meals) {
        showAlert();
        return;
      }

      // Display each meal found


      meals.forEach(showMealInfo);
    } catch (error) {
      console.error('Error searching for meals:', error);
      showAlert();
    }
  } else {
    alert('Please try searching for a meal :)');
  }
};

//  addina an Event listener for form submission


const form = document.querySelector('form');
form.addEventListener('submit', searchMeal);

// adding an Event listener for search button click

const magnifier = document.querySelector('.magnifier');
magnifier.addEventListener('click', searchMeal);
