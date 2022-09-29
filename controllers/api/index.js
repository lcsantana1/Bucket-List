// Imports router and api routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const ingredientRoutes = require('./ingredientRoutes');
const tagRoutes = require('./recipeTagRoute');

// Connects api routes to router
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/tags', tagRoutes);

// Exports the router
module.exports = router;
