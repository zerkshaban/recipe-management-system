import RecipeCard from './RecipeCard';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  cookTime: number;
  servings: number;
  image: string;
  ingredients: string[];
  instructions: string[];
  __v?: number;
}

export interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void;
  onDelete: (_id: string) => void;
}

const RecipeList = ({ recipes, onEdit, onDelete }: RecipeListProps) => {
  console.log(recipes);
  if (recipes.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-6xl mb-4'>🍳</div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          No recipes found
        </h3>
        <p className='text-gray-600'>
          Try adjusting your search or add a new recipe to get started!
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={() => onDelete(recipe._id)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
