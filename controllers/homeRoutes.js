const router = require('express').Router();
const { Recipe, User, Ingredient } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', async (req, res) => {


  res.render('login')


});

router.get('/signup', async (req, res) => {


  res.render('signup')


});

router.get('/builder', async (req, res) => {

  res.render('recipeBuilder')


});


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



module.exports = router;
