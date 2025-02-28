import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, ChefHat, ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const ProfilePage: React.FC = () => {
  const { isLoggedIn, currentUser } = useUser();
  const { recipes, pendingRecipes } = useRecipes();
  
  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/login" />;
  }

  // Get user's saved recipes
  const savedRecipes = recipes.filter(recipe => 
    currentUser.savedRecipes.includes(recipe.id)
  );

  // Get user's submitted recipes
  const userSubmittedRecipes = [
    ...recipes.filter(recipe => recipe.submittedBy === currentUser.username),
    ...pendingRecipes.filter(recipe => recipe.submittedBy === currentUser.username)
  ];

  // Get user's voted recipes
  const userVotedRecipes = pendingRecipes.filter(recipe => 
    currentUser.votedRecipes.some(vote => vote.recipeId === recipe.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-green-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{currentUser.username}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <ChefHat className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Submitted Recipes</p>
                <p className="text-xl font-semibold">{userSubmittedRecipes.length}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <div className="flex mr-3">
                <ThumbsUp className="h-6 w-6 text-green-600" />
                <ThumbsDown className="h-6 w-6 text-red-600 -ml-1" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Voted Recipes</p>
                <p className="text-xl font-semibold">{currentUser.votedRecipes.length}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <Bookmark className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Saved Recipes</p>
                <p className="text-xl font-semibold">{currentUser.savedRecipes.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Recipes */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Saved Recipes</h2>
        </div>
        
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">You haven't saved any recipes yet.</p>
            <Link 
              to="/recipes" 
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </div>

      {/* Submitted Recipes */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Submitted Recipes</h2>
          <Link 
            to="/submit" 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit New Recipe
          </Link>
        </div>
        
        {userSubmittedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userSubmittedRecipes.map(recipe => (
              <div key={recipe.id} className="relative">
                <div className="absolute top-2 right-2 z-10">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    recipe.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {recipe.approved ? 'Approved' : 'Pending Approval'}
                  </span>
                </div>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">You haven't submitted any recipes yet.</p>
            <Link 
              to="/submit" 
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit a Recipe
            </Link>
          </div>
        )}
      </div>

      {/* Voted Recipes */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recently Voted Recipes</h2>
        
        {userVotedRecipes.length > 0 ? (
          <div className="space-y-4">
            {userVotedRecipes.slice(0, 3).map(recipe => {
              const userVote = currentUser.votedRecipes.find(v => v.recipeId === recipe.id)?.vote;
              
              return (
                <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.name} 
                    className="h-16 w-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{recipe.name}</h3>
                    <p className="text-sm text-gray-600">
                      Submitted by {recipe.submittedBy}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Your vote:</span>
                    {userVote === 'up' ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Authentic
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        Not Authentic
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            
            {userVotedRecipes.length > 3 && (
              <div className="text-center mt-4">
                <Link 
                  to="/voting" 
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  View all voted recipes →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">You haven't voted on any recipes yet.</p>
            <Link 
              to="/voting" 
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Vote on Recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;