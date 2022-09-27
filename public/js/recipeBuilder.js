const saveBtn = document.getElementById('saveBtn');

const recipeBuilder = async (event) => {
    event.preventDefault();

    const name = document.getElementById('exampleRecipe').value();
    console.log(name);
    const description = document.getElementById('exampleDescription');
    const ingredients = document.getElementById('ingredientList').value().split();
    console.log(ingredients);
    const ingredientsAsArray = ingredients.split(',');
    
    const makeRec = await createRecipe(name, description);
    console.log(makeRec);
    const makeIng = await makeIngredients(ingredientsAsArray);
}


document.addEventListener('submit', recipeBuilder);


// Helpers

async function createRecipe(name, description) {
    if (name && description) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ name, description })
        });
    }
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