// Imports model building tools
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// This file creates the ingredient model

class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ingredient_name: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ingredient',
  }
);

// Exports ingredient model
module.exports = Ingredient;