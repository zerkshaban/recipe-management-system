import { Clock, Users, ChefHat, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Recipe } from './RecipeList';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
        <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
          <Badge variant="outline">{recipe.category}</Badge>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-orange-50 rounded-lg">
        <div className="text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-orange-600" />
          <div className="text-sm font-medium text-gray-900">{recipe.cookTime} min</div>
          <div className="text-xs text-gray-600">Cook Time</div>
        </div>
        <div className="text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
          <div className="text-sm font-medium text-gray-900">{recipe.servings}</div>
          <div className="text-xs text-gray-600">Servings</div>
        </div>
        <div className="text-center">
          <ChefHat className="h-6 w-6 mx-auto mb-2 text-orange-600" />
          <div className="text-sm font-medium text-gray-900">{recipe.ingredients.length}</div>
          <div className="text-xs text-gray-600">Ingredients</div>
        </div>
      </div>

      <Separator />

      {/* Ingredients */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-orange-500" />
          Ingredients
        </h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* Instructions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-orange-500" />
          Instructions
        </h2>
        <ol className="space-y-3">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <span className="text-gray-700 pt-0.5">{instruction}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
