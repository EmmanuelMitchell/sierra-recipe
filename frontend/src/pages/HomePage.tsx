import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, ThumbsUp, Star } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const HomePage: React.FC = () => {
  const { recipes } = useRecipes();
  
  // Get top rated recipes
  const topRatedRecipes = [...recipes]
    .sort((a, b) => b.ratings.average - a.ratings.average)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Sierra Leone Cuisine" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Authentic Sierra Leonean Cuisine
            </h1>
            <p className="text-xl mb-8">
              Explore traditional recipes, share your own, and help preserve the rich culinary heritage of Sierra Leone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/recipes" 
                className="px-6 py-3 bg-white text-green-800 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Browse Recipes
              </Link>
              <Link 
                to="/submit" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-green-800 transition-colors"
              >
                Submit a Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Recipes</h3>
              <p className="text-gray-600">
                Browse our collection of authentic Sierra Leonean recipes, from cassava leaf soup to jollof rice.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-4">
                <ChefHat className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Recipes</h3>
              <p className="text-gray-600">
                Submit your own recipes to share with the community and preserve Sierra Leone's culinary traditions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-4">
                <ThumbsUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Vote on Authenticity</h3>
              <p className="text-gray-600">
                Help maintain quality by voting on recipe authenticity. Recipes with 70%+ approval join our directory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Recipes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Rated Recipes</h2>
            <Link 
              to="/recipes" 
              className="text-green-600 hover:text-green-800 font-medium"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Share Your Family Recipes</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Help preserve Sierra Leone's culinary heritage by sharing your family's traditional recipes with our community.
          </p>
          <Link 
            to="/submit" 
            className="inline-block px-6 py-3 bg-white text-green-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Submit a Recipe
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;