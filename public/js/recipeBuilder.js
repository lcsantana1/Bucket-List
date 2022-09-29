// This file contains the recipe creating functionality of the webpage

const saveBtn = document.getElementById('saveBtn');

// This function gathers information from the user input fields and executes helper functions for creating recipes and ingredients
function recipeBuilder(event) {
    event.preventDefault();

    const name = document.getElementById('exampleRecipe').value;
    const description = document.getElementById('exampleDescription').value;
    const ingredients = document.getElementById('ingredientList').value.split(', ');
    
    createRecipe(name, description);
    makeIngredients(ingredients);
}

document.addEventListener('submit', recipeBuilder);

// Helpers

// Creates recipes
async function createRecipe(name, description) {
    // Checks that parameters are passed in
    if (!name && !description) {
        return
    };
    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, description })
    });
}

// Creates ingredients
async function makeIngredients(ingredients) {
    // Checks that parameter is passed in 
    if (!ingredients) {
        return
    };
    // Loops over ingredient list and creates a different ingredient for each
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const response = await fetch(`/api/ingredients`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ingredient })
        });
    };
};