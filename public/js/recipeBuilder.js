
const recipeBuilder = async (event) => {
    event.preventDefault();

    const name = document.getElementById('#exampleName').value.trim();
    const description = document.getElementById('#exampleDescription').value.trim();
    const ingredients = document.getElementById('#ingredientList').value.trim();
    const ingredientsAsArray = ingredients.split(',');

    const makeRec = await createRecipe(name, description);
    const makeIng = await makeIngredients(ingredientsAsArray);
};

document
    .getElementById('#saveBtn')
    .addEventListener('submit', recipeBuilder);

// Helpers

function createRecipe(name, description) {
    if (name && description) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ name, description })
        });
}

function makeIngredients(ingredients) {
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