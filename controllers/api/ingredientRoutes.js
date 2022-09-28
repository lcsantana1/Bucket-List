const router = require('express').Router();
const { Ingredient, Recipe } = require('../../models');

router.get('/:ingredient_name', (req, res) => {
  Ingredient.findOne({
    where: {
      ingredient_name: req.params.ingredient_name
    },
    include: [
      {
        model: Recipe,
        attributes: ['id', 'name', 'desciption', 'user_id']
      }
    ]
  })
    .then(ingredientData => res.json(ingredientData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/recipes', async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      // user_id: req.session.user_id,
      user_id: 1,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  Ingredient.create({
    ingredient_name: req.body.ingredient_name
  })
    .then(ingredientData => res.json(ingredientData))
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;