const User = require('./User');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const RecipeTag = require('./recipeTag');

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

module.exports = { User, Recipe, Ingredient, RecipeTag };