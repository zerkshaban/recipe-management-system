import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RecipeList from '@/components/RecipeList';
import RecipeForm from '@/components/RecipeForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Recipe } from '@/components/RecipeList';

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'All',
    'Appetizers',
    'Main Dishes',
    'Desserts',
    'Salads',
    'Soups',
    'Beverages',
  ];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Standalone fetch function
  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      console.log(data.data);
      if (Array.isArray(data.data)) {
        setRecipes(data.data);
        setError(null);
      } else {
        throw new Error('API did not return an array of recipes');
      }
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  const filteredRecipes = (recipes || []).filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || recipe.category === categoryFilter;
    const matchesDifficulty =
      difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleAddRecipe = async (newRecipe: Omit<Recipe, '_id' | '__v'>) => {
    try {
      const response = await fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      // Refetch recipes after successful addition
      fetchRecipes();
      setIsFormOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditRecipe = async (updatedRecipe: Recipe) => {
    console.log(updatedRecipe);
    try {
      const response = await fetch(
        `http://localhost:3000/api/recipes/${updatedRecipe._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRecipe),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      // Refetch recipes after successful update
      fetchRecipes();
      setEditingRecipe(null);
      setIsFormOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteRecipe = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/recipes/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      // Refetch recipes after successful deletion
      fetchRecipes();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditForm = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingRecipe(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Error Loading Recipes
          </h2>
          <p className='text-gray-600'>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className='mt-4 bg-orange-500 hover:bg-orange-600 text-white'
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b border-orange-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Recipe Manager
              </h1>
              <p className='text-gray-600 mt-1'>
                Organize and manage your favorite recipes
              </p>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openAddForm}
                  className='bg-orange-500 hover:bg-orange-600 text-white'
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Add Recipe
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle>
                    {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
                  </DialogTitle>
                </DialogHeader>
                <RecipeForm
                  recipe={editingRecipe}
                  onSubmit={editingRecipe ? handleEditRecipe : handleAddRecipe}
                  onCancel={() => setIsFormOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search recipes...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-9'
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className='w-40'>
                  <Filter className='h-4 w-4 mr-2' />
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className='w-40'>
                  <SelectValue placeholder='Difficulty' />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Recipe Count */}
        <div className='mb-4'>
          <p className='text-gray-600'>
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </p>
        </div>

        {/* Recipe List */}
        <RecipeList
          recipes={filteredRecipes}
          onEdit={openEditForm}
          onDelete={handleDeleteRecipe}
        />
      </div>
    </div>
  );
};

export default Index;
