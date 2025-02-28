import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, ChefHat, Calendar, Bookmark, BookmarkCheck } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { useUser } from '../context/UserContext';
import StarRating from '../components/StarRating';
import CommentSection from '../components/CommentSection';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecipeById, addComment, rateRecipe } = useRecipes();
  const { isLoggedIn, currentUser, saveRecipe, unsaveRecipe } = useUser();
  
  const recipe = getRecipeById(id || '');
  
  if (!recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
        <p className="mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/recipes" 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  const {
    name,
    imageUrl,
    category,
    prepTime,
    cookTime,
    servings,
    difficulty,
    ingredients,
    instructions,
    submittedBy,
    dateSubmitted,
    ratings,
    comments
  } = recipe;

  const totalTime = prepTime + cookTime;
  const formattedTime = totalTime >= 60 
    ? `${Math.floor(totalTime / 60)}h ${totalTime % 60}m` 
    : `${totalTime}m`;

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  }[difficulty];

  const isRecipeSaved = currentUser?.savedRecipes.includes(id || '');

  const handleSaveToggle = () => {
    if (isRecipeSaved) {
      unsaveRecipe(id || '');
    } else {
      saveRecipe(id || '');
    }
  };

  const handleAddComment = (text: string) => {
    if (isLoggedIn && currentUser) {
      addComment(id || '', {
        userId: currentUser.id,
        username: currentUser.username,
        text
      });
    }
  };

  const handleRate = (rating: number) => {
    if (isLoggedIn) {
      rateRecipe(id || '', rating);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/recipes" className="text-green-600 hover:text-green-800">
          ← Back to Recipes
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Recipe Header */}
        <div className="relative h-64 md:h-96">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex justify-between items-center">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${difficultyColor} mb-2`}>
                  {difficulty}
                </span>
                <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
                <p className="text-white/80">Category: {category}</p>
              </div>
              {isLoggedIn && (
                <button
                  onClick={handleSaveToggle}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  {isRecipeSaved ? (
                    <BookmarkCheck className="h-6 w-6 text-white fill-current" />
                  ) : (
                    <Bookmark className="h-6 w-6 text-white" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="p-6">
          <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-600" />
              <div>
                <p className="text-sm">Total Time</p>
                <p className="font-medium">{formattedTime}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              <div>
                <p className="text-sm">Servings</p>
                <p className="font-medium">{servings}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ChefHat className="h-5 w-5 mr-2 text-green-600" />
              <div>
                <p className="text-sm">Submitted By</p>
                <p className="font-medium">{submittedBy}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              <div>
                <p className="text-sm">Date</p>
                <p className="font-medium">{formatDate(dateSubmitted)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="text-sm mb-1">Rating</p>
                <div className="flex items-center">
                  <StarRating initialRating={ratings.average} readOnly size="sm" />
                  <span className="ml-2 text-sm font-medium">
                    {ratings.average.toFixed(1)} ({ratings.count})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Ingredients</h2>
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Instructions</h2>
              <ol className="space-y-4">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 font-medium text-sm mr-3 shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Rate this recipe */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold mb-2 sm:mb-0">Rate this recipe</h3>
              <div className="flex items-center">
                <StarRating 
                  onRate={handleRate} 
                  readOnly={!isLoggedIn}
                  size="lg"
                />
                {!isLoggedIn && (
                  <span className="ml-3 text-sm text-gray-500">
                    <Link to="/login" className="text-green-600 hover:underline">Log in</Link> to rate
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <CommentSection 
          comments={comments} 
          onAddComment={handleAddComment} 
        />
      </div>
    </div>
  );
};

export default RecipeDetailPage;