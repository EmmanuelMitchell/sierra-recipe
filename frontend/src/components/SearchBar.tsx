import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { RecipeFilters } from '../context/RecipeContext';

interface SearchBarProps {
  onSearch: (query: string, filters: RecipeFilters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RecipeFilters>({
    category: '',
    difficulty: '',
    prepTime: 0,
    ingredients: []
  });
  const [ingredient, setIngredient] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() && !filters.ingredients?.includes(ingredient.trim())) {
      setFilters({
        ...filters,
        ingredients: [...(filters.ingredients || []), ingredient.trim()]
      });
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (ing: string) => {
    setFilters({
      ...filters,
      ingredients: filters.ingredients?.filter(i => i !== ing)
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'prepTime' ? parseInt(value) || 0 : value
    });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      difficulty: '',
      prepTime: 0,
      ingredients: []
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearch}>
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Search recipes, ingredients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="ml-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Categories</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Soup">Soup</option>
                  <option value="Snack">Snack</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={filters.difficulty}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Any Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Prep Time (minutes)
                </label>
                <input
                  type="number"
                  name="prepTime"
                  value={filters.prepTime || ''}
                  onChange={handleFilterChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Any time"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
              <div className="flex">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Add ingredient..."
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add
                </button>
              </div>
              {filters.ingredients && filters.ingredients.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filters.ingredients.map((ing, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {ing}
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(ing)}
                        className="ml-1 text-green-600 hover:text-green-800 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;