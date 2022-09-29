// Imports router and models
const router = require('express').Router();
const { Recipe, User, Ingredient } = require('../models');

// This file creates the routes to each part of the webpage

// Takes user to homepage
router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

// Takes user to login page
router.get('/login', async (req, res) => {
  res.render('login')
});

// Takes user to signup page
router.get('/signup', async (req, res) => {
  res.render('signup')
});

// Takes user to recipe builder page
router.get('/builder', async (req, res) => {
  res.render('recipeBuilder')
});

// Takes user to profile page
router.get('/profile',  async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      where: {
        user_id: req.session.user_id 
      },
      include: [
        {
          model: Ingredient,
          attributes: ['id', 'ingredient_name']
        }
      ]
    });
    const recipes = recipeData.map((recipe)=> recipe.get({ plain: true}));
    res.render("profile", {
      recipes,
      logged_in: req.session.logged_in
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err);
  };
});

// Exports router
module.exports = router;
