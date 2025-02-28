import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, AlertCircle } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { useUser } from '../context/UserContext';

const SubmitRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const { isLoggedIn, currentUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    imageUrl: '',
    ingredients: [''],
    instructions: ['']
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
    // Clear ingredients error if any
    if (errors.ingredients) {
      setErrors({
        ...errors,
        ingredients: ''
      });
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: updatedInstructions
    });
    // Clear instructions error if any
    if (errors.instructions) {
      setErrors({
        ...errors,
        instructions: ''
      });
    }
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients.splice(index, 1);
      setFormData({
        ...formData,
        ingredients: updatedIngredients
      });
    }
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = [...formData.instructions];
      updatedInstructions.splice(index, 1);
      setFormData({
        ...formData,
        instructions: updatedInstructions
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Recipe name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.prepTime < 0) {
      newErrors.prepTime = 'Prep time cannot be negative';
    }
    
    if (formData.cookTime < 0) {
      newErrors.cookTime = 'Cook time cannot be negative';
    }
    
    if (formData.servings < 1) {
      newErrors.servings = 'Servings must be at least 1';
    }
    
    const hasEmptyIngredient = formData.ingredients.some(item => !item.trim());
    if (hasEmptyIngredient) {
      newErrors.ingredients = 'All ingredient fields must be filled';
    }
    
    const hasEmptyInstruction = formData.instructions.some(item => !item.trim());
    if (hasEmptyInstruction) {
      newErrors.instructions = 'All instruction fields must be filled';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please log in to submit recipes' } });
      return;
    }
    
    if (validateForm()) {
      const newRecipe = {
        ...formData,
        id: Date.now().toString(),
        userId: currentUser?.id || '',
        author: currentUser?.username || 'Anonymous',
        datePosted: new Date().toISOString(),
        ratings: [],
        comments: []
      };
      
      addRecipe(newRecipe);
      navigate('/recipes');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit a New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a category</option>
              <option value="Main Dish">Main Dish</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Dessert">Dessert</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Soup">Soup</option>
              <option value="Salad">Salad</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Drink">Drink</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.category}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium mb-1">
                Prep Time (minutes)
              </label>
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                min="0"
                value={formData.prepTime}
                onChange={handleNumberChange}
                className={`w-full p-2 border rounded ${errors.prepTime ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.prepTime && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.prepTime}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="cookTime" className="block text-sm font-medium mb-1">
                Cook Time (minutes)
              </label>
              <input
                type="number"
                id="cookTime"
                name="cookTime"
                min="0"
                value={formData.cookTime}
                onChange={handleNumberChange}
                className={`w-full p-2 border rounded ${errors.cookTime ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cookTime && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.cookTime}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="servings" className="block text-sm font-medium mb-1">
                Servings
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                min="1"
                value={formData.servings}
                onChange={handleNumberChange}
                className={`w-full p-2 border rounded ${errors.servings ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.servings && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.servings}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        {/* Ingredients */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          {errors.ingredients && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.ingredients}
            </p>
          )}
          
          {formData.ingredients.map((ingredient, index) => (
            <div key={`ingredient-${index}`} className="flex items-center gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="1 cup flour"
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
                disabled={formData.ingredients.length <= 1}
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center gap-1 text-sm text-blue-600"
          >
            <Plus className="w-4 h-4" /> Add Ingredient
          </button>
        </div>
        
        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Instructions</h2>
          {errors.instructions && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.instructions}
            </p>
          )}
          
          {formData.instructions.map((instruction, index) => (
            <div key={`instruction-${index}`} className="flex items-start gap-2">
              <div className="pt-2 min-w-8 text-center font-medium">
                {index + 1}.
              </div>
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder="Describe this step..."
                className="flex-grow p-2 border border-gray-300 rounded h-24"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
                disabled={formData.instructions.length <= 1}
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addInstruction}
            className="flex items-center gap-1 text-sm text-blue-600"
          >
            <Plus className="w-4 h-4" /> Add Instruction
          </button>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitRecipePage;