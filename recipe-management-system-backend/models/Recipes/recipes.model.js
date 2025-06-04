const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Title is required'],
  },
  description: {
    type: String,
    require: [true, 'Description is required'],
  },
  category: {
    type: String,
    require: [true, 'Category is required'],
  },
  difficulty: {
    type: String,
    require: [true, 'Difficulty is required'],
  },
  cookTime: {
    type: Number,
    require: [true, 'Cook Time is required'],
  },
  servings: {
    type: Number,
    require: [true, 'Serving is required'],
  },
  image: String,
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
  },
  instructions: {
    type: [String],
    required: [true, 'Instructions are required'],
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
