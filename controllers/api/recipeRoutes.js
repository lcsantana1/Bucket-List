const router = require('express').Router();
const { Recipe, User, Ingredient } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  Recipe.findAll({
    include: [
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
    .then(recipeData => res.json(recipeData))
    .catch(err => {
      res.status(500).json(err);
    })
})

router.get('/:name', withAuth, async (req, res) => {
  Recipe.findOne({
    where: {
      name: req.params.name
    },
    include: [
      {
        model: Ingredient,
        attributes: ['id', 'ingredient_name']
      }
    ]
  })
    .then(recipeData => res.json(recipeData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Ingredient,
          attributes: ['id', 'ingredient_name']
        }
      ]
    });
      const recipe = recipeData.get({ plain: true });

      res.render("homepage", {
        recipe, 
        logged_in: req.session.logged_in
      });
  }
  catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  Recipe.update(req.body, {
    where: {
      id: req.params.id
    },
  })
    .then((recipe) => {
      return recipe.findAll({
        where:
        {
          recipe_id: req.params.id,
          user_id: req.session.user_id
        }
      })
    })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch((err) => {
      res.status(400).json(err);
    })
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;