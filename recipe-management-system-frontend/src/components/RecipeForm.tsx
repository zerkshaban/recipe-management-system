import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Recipe } from './RecipeList';

interface RecipeFormProps {
  recipe?: import('./RecipeList').Recipe | null;
  onSubmit: (recipe: Recipe | Omit<Recipe, '_id' | '__v'>) => void;
  onCancel: () => void;
}

const RecipeForm = ({ recipe, onSubmit, onCancel }: RecipeFormProps) => {
  const [formData, setFormData] = useState<Partial<Recipe>>({
    title: recipe?.title || "",
    description: recipe?.description || "",
    category: recipe?.category || "",
    difficulty: recipe?.difficulty || "",
    cookTime: recipe?.cookTime || 0,
    servings: recipe?.servings || 0,
    image: recipe?.image || "",
    ingredients: recipe?.ingredients || [""],
    instructions: recipe?.instructions || [""],
    ...(recipe && recipe._id && { _id: recipe._id, __v: recipe.__v })
  });

  const categories = ["Appetizers", "Main Dishes", "Desserts", "Salads", "Soups", "Beverages"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredIngredients = formData.ingredients?.filter(item => item.trim() !== "") || [];
    const filteredInstructions = formData.instructions?.filter(item => item.trim() !== "") || [];

    if (filteredIngredients.length === 0 || filteredInstructions.length === 0) {
      alert("Please add at least one ingredient and one instruction.");
      return;
    }

    let payload: Recipe | Omit<Recipe, '_id' | '__v'>;

    if (recipe) {
      const { __v, ...rest } = formData;
      payload = {
        ...rest,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
        _id: recipe._id,
      } as Recipe;
    } else {
      payload = {
        title: formData.title || "",
        description: formData.description || "",
        category: formData.category || "",
        difficulty: formData.difficulty || "",
        cookTime: formData.cookTime || 0,
        servings: formData.servings || 0,
        image: formData.image || "",
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
      } as Omit<Recipe, '_id' | '__v'>;
    }

    onSubmit(payload);
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...(formData.ingredients || []), ""]
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = (formData.ingredients || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      ingredients: newIngredients.length > 0 ? newIngredients : [""]
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...(formData.ingredients || [])];
    newIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...(formData.instructions || []), ""]
    });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = (formData.instructions || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      instructions: newInstructions.length > 0 ? newInstructions : [""]
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...(formData.instructions || [])];
    newInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: newInstructions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="title">Recipe Title *</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter recipe title"
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the recipe"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category || ""} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="difficulty">Difficulty *</Label>
          <Select value={formData.difficulty || ""} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cookTime">Cook Time (minutes) *</Label>
          <Input
            id="cookTime"
            type="number"
            value={formData.cookTime || ""}
            onChange={(e) => setFormData({ ...formData, cookTime: parseInt(e.target.value) || 0 })}
            placeholder="30"
            min="1"
            required
          />
        </div>

        <div>
          <Label htmlFor="servings">Servings *</Label>
          <Input
            id="servings"
            type="number"
            value={formData.servings || ""}
            onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) || 0 })}
            placeholder="4"
            min="1"
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image || ""}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Ingredients *</Label>
          <Button type="button" onClick={addIngredient} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Ingredient
          </Button>
        </div>
        <div className="space-y-2">
          {(formData.ingredients || []).map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => removeIngredient(index)}
                size="sm"
                variant="outline"
                className="px-3"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label>Instructions *</Label>
          <Button type="button" onClick={addInstruction} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Step
          </Button>
        </div>
        <div className="space-y-2">
          {(formData.instructions || []).map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-shrink-0 w-8 h-10 bg-orange-100 rounded flex items-center justify-center text-sm font-medium text-orange-600">
                {index + 1}
              </div>
              <Textarea
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder={`Step ${index + 1} instructions`}
                className="flex-1"
                rows={2}
              />
              <Button
                type="button"
                onClick={() => removeInstruction(index)}
                size="sm"
                variant="outline"
                className="px-3 self-start mt-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
          {recipe ? "Update Recipe" : "Add Recipe"}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
