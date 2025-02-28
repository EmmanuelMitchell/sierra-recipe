import React, { useState } from 'react';
import { useRecipes, RecipeFilters } from '../context/RecipeContext';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

const RecipesPage: React.FC = () => {
  const { recipes, searchRecipes } = useRecipes();
  const [searchResults, setSearchResults] = useState(recipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<RecipeFilters>({});

  const handleSearch = (query: string, filters: RecipeFilters) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    const results = searchRecipes(query, filters);
    setSearchResults(results);
  };

  // Get unique categories for filter display
  const categories = [...new Set(recipes.map(recipe => recipe.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recipe Directory</h1>
        <p className="text-gray-600">
          Explore our collection of authentic Sierra Leonean recipes
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {/* Active filters display */}
      {(searchQuery || Object.values(activeFilters).some(v => v && (Array.isArray(v) ? v.length > 0 : true))) && (
        <div className="mb-6 p-3 bg-gray-50 rounded-md">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: {searchQuery}
              </span>
            )}
            
            {activeFilters.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Category: {activeFilters.category}
              </span>
            )}
            
            {activeFilters.difficulty && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Difficulty: {activeFilters.difficulty}
              </span>
            )}
            
            {activeFilters.prepTime && activeFilters.prepTime > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Prep Time: ≤ {activeFilters.prepTime} min
              </span>
            )}
            
            {activeFilters.ingredients && activeFilters.ingredients.map((ing, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Ingredient: {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {searchResults.length} {searchResults.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>

      {/* Recipe grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={() => handleSearch('', {})}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Category quick links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleSearch('', { category })}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;