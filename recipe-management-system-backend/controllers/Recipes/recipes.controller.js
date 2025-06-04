const Recipes = require('../../models/Recipes/recipes.model');

const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      cookTime,
      servings,
      ingredients,
    } = req.body;
    if (
      !title ||
      !description ||
      !category ||
      !difficulty ||
      !cookTime ||
      !servings ||
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: title, description, category, difficulty, cookTime, servings, and ingredients are required',
      });
    }
    const recipe = await Recipes.create(req.body);
    return res.status(201).json({ success: true, data: recipe });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Error creating recipe' });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find({});
    if (!recipes) {
      return res
        .status(404)
        .json({ success: false, message: 'No recipes available', data: [] });
    }
    return res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Fetching data not successful' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Task ID is required' });
    }
    const updatedRecipe = await Recipes.findByIdAndUpdate(id, req.body, {
      runValidators: true, // to run the validation while updating, to avoid any issues
      new: true, // get updated document
    });
    if (!updateRecipe) {
      return res
        .status(404)
        .json({ success: false, message: `${id} not found` });
    }
    return res
      .status(200)
      .json({ success: true, updatedRecipe: updatedRecipe });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to update the recipe' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Recipe ID is required' });
    }
    const deletedRecipe = await Recipes.findByIdAndDelete(id);

    if (!deleteRecipe) {
      return res
        .status(404)
        .json({ success: false, message: `${id} not found` });
    }
    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { deletedTaskId: id },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete the recipe' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
};
