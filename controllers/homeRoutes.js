const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

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
  const recipes = recipeData.map((recipe)=> recipe.get({ plain: true}));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      recipes, 
      // logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login',  async (req, res) => {
  
    
    res.render('login')
    

});

router.get('/signup',  async (req, res) => {
  
    
  res.render('signup')
  

});




module.exports = router;
