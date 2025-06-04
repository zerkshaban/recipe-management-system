import { Clock, Users, Edit, Trash2, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import RecipeDetail from "./RecipeDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Recipe } from '@/components/RecipeList';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (_id: string) => void;
}

const RecipeCard = ({ recipe, onEdit, onDelete }: RecipeCardProps) => {
  const [showDetail, setShowDetail] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      onDelete(recipe._id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(recipe);
  };

  return (
    <>
      <Card 
        className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden"
        onClick={() => setShowDetail(true)}
      >
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 right-2">
            <Badge className={getDifficultyColor(recipe.difficulty)}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                {recipe.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {recipe.description}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="w-fit mt-2">
            {recipe.category}
          </Badge>
        </CardHeader>

        <CardContent className="py-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <RecipeDetail recipe={recipe} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeCard;
