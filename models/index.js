// Imports models
const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const RecipeTag = require('./recipeTag');

// This file establishes the relationships between the models 

User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

Recipe.belongsToMany(Ingredient, { 
  through: RecipeTag,
  foreignKey: 'recipe_id',
})

Ingredient.belongsToMany(Recipe, { 
  through: RecipeTag, 
  foreignKey: 'ingredient_id',
})

// Exports models
module.exports = { User, Recipe, Ingredient, RecipeTag };