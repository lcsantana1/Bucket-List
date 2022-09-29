// Imports model building tools
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// This file creates the recipe tag model
// This model exists to connect recipes to their ingredients

class RecipeTag extends Model {}

RecipeTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipe',
        key: 'id',
      },
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ingredient',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe_tag',
  }
);

// Exports recipe tag model
module.exports = RecipeTag;
