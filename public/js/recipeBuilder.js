const saveBtn = document.getElementById('saveBtn');

function recipeBuilder(event) {
    event.preventDefault();

    const name = document.getElementById('exampleRecipe').value;
    const description = document.getElementById('exampleDescription').value;
    const ingredients = document.getElementById('ingredientList').value.split(',');
    
    createRecipe(name, description);
    makeIngredients(ingredients);
}

document.addEventListener('submit', recipeBuilder);

// Helpers

async function createRecipe(name, description) {

    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, description })
    });
}

async function makeIngredients(ingredients) {
    if (ingredients) {
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const response = await fetch(`/api/ingredients`, {
                method: 'POST',
                body: JSON.stringify({ ingredient })
            });
        };
    };


};



// if (name && description && ingredients) {
//     const response = await fetch(`/api/recipes`, {
//         method: 'POST',
//         body: JSON.stringify({ name, description, ingredientsAsArray })
//     });

//     if (response.ok) {
//         document.location.replace('/profile');
//     } else {
//         alert('Failed to create project');
//     }
// }