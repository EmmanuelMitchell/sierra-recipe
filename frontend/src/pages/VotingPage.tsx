import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, AlertCircle } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { useUser } from '../context/UserContext';
import VoteButtons from '../components/VoteButtons';

const VotingPage: React.FC = () => {
  const { pendingRecipes, voteRecipe } = useRecipes();
  const { isLoggedIn, addVotedRecipe } = useUser();

  const handleVote = (recipeId: string, vote: 'up' | 'down') => {
    if (isLoggedIn) {
      voteRecipe(recipeId, vote);
      addVotedRecipe(recipeId, vote);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Voting</h1>
        <p className="text-gray-600">
          Help maintain the authenticity of our recipe collection by voting on submitted recipes
        </p>
      </div>

      {!isLoggedIn && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You need to be logged in to vote on recipes.{' '}
                <Link
                  to="/login"
                  className="font-medium underline text-yellow-700 hover:text-yellow-600"
                >
                  Log in now
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How Voting Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <ThumbsUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-2">Vote on Authenticity</h3>
            <p className="text-sm text-gray-600">
              Review submitted recipes and vote on whether they are authentic Sierra Leonean dishes.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <div className="text-green-600 font-bold">70%</div>
            </div>
            <h3 className="font-medium mb-2">Approval Threshold</h3>
            <p className="text-sm text-gray-600">
              Recipes need at least 70% approval votes and a minimum of 5 total votes to be approved.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium mb-2">Automatic Addition</h3>
            <p className="text-sm text-gray-600">
              Approved recipes are automatically added to the main recipe directory.
            </p>
          </div>
        </div>
      </div>

      {pendingRecipes.length > 0 ? (
        <div className="space-y-8">
          {pendingRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h2>
                      <p className="text-sm text-gray-600 mb-4">
                        Submitted by {recipe.submittedBy} on {new Date(recipe.dateSubmitted).toLocaleDateString()}
                      </p>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h3>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                          {recipe.ingredients.length > 5 && (
                            <li className="text-green-600">
                              +{recipe.ingredients.length - 5} more ingredients
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <Link 
                        to={`/recipe/${recipe.id}`} 
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        View Full Recipe →
                      </Link>
                    </div>
                    
                    <div className="mt-6 md:mt-0 md:ml-6 md:w-64">
                      <VoteButtons 
                        recipeId={recipe.id}
                        upvotes={recipe.approvalVotes.upvotes}
                        downvotes={recipe.approvalVotes.downvotes}
                        onVote={(vote) => handleVote(recipe.id, vote)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Pending Recipes</h3>
          <p className="text-gray-600 mb-6">
            There are currently no recipes waiting for community approval.
          </p>
          <Link 
            to="/submit" 
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
          >
            Submit a Recipe
          </Link>
        </div>
      )}
    </div>
  );
};

export default VotingPage;