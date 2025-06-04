const express = require('express');
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
} = require('../../controllers/Recipes/recipes.controller');

router.post('/', createRecipe);
router.get('/', getAllRecipes);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
