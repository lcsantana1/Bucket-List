const sequelize = require('../config/connection');
const { Ingredient, Recipe, User, RecipeTag } = require('../models');

const userData = require('./userData.json');
const ingredientsData = require('./ingredientsData.json');
const recipeData = require('./recipesData.json');
const recipeTagData = require('./recipeTagData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const ingredient of ingredientsData) {
        await Ingredient.create({
            ...ingredient,
        });
    }

    for (const recipe of recipeData) {
        await Recipe.create({
            ...recipe,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const recipe_tag of recipeTagData) {
        await RecipeTag.create({
            ...recipe_tag,
        });
    }

    process.exit(0);
};

seedDatabase();
