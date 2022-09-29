// Imports connection and models
const sequelize = require('../config/connection');
const { Ingredient, Recipe, User, RecipeTag } = require('../models');

// Imports files that are needed to see the database
const userData = require('./userData.json');
const ingredientData = require('./ingredientsData.json');
const recipeData = require('./recipesData.json');
const recipeTagData = require('./recipeTagData.json');

// This function seeds the database
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Creates users
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Creates ingredients
    for (const ingredient of ingredientData) {
        await Ingredient.create({
            ...ingredient,
        });
    }

    // Creates recipes
    for (const recipe of recipeData) {
        await Recipe.create({
            ...recipe,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    // Creates recipe tags
    for (const recipeTag of recipeTagData) {
        await RecipeTag.create({
            ...recipeTag,
        });
    }

    process.exit(0);
};

// Runs the function to seed the database
seedDatabase();
