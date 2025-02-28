import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe, Comment } from '../types';
import { recipes as initialRecipes, pendingRecipes as initialPendingRecipes } from '../data/recipes';

interface RecipeContextType {
  recipes: Recipe[];
  pendingRecipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'dateSubmitted' | 'approved' | 'approvalVotes' | 'ratings' | 'comments'>) => void;
  voteRecipe: (recipeId: string, vote: 'up' | 'down') => void;
  addComment: (recipeId: string, comment: Omit<Comment, 'id' | 'date'>) => void;
  rateRecipe: (recipeId: string, rating: number) => void;
  getRecipeById: (id: string) => Recipe | undefined;
  getPendingRecipeById: (id: string) => Recipe | undefined;
  searchRecipes: (query: string, filters: RecipeFilters) => Recipe[];
}

export interface RecipeFilters {
  category?: string;
  difficulty?: string;
  prepTime?: number;
  ingredients?: string[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [pendingRecipes, setPendingRecipes] = useState<Recipe[]>(initialPendingRecipes);

  const addRecipe = (newRecipe: Omit<Recipe, 'id' | 'dateSubmitted' | 'approved' | 'approvalVotes' | 'ratings' | 'comments'>) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: `p${pendingRecipes.length + 1}`,
      dateSubmitted: new Date().toISOString().split('T')[0],
      approved: false,
      approvalVotes: {
        upvotes: 0,
        downvotes: 0
      },
      ratings: {
        average: 0,
        count: 0
      },
      comments: []
    };

    setPendingRecipes([...pendingRecipes, recipe]);
  };

  const voteRecipe = (recipeId: string, vote: 'up' | 'down') => {
    setPendingRecipes(
      pendingRecipes.map(recipe => {
        if (recipe.id === recipeId) {
          const updatedVotes = {
            upvotes: vote === 'up' ? recipe.approvalVotes.upvotes + 1 : recipe.approvalVotes.upvotes,
            downvotes: vote === 'down' ? recipe.approvalVotes.downvotes + 1 : recipe.approvalVotes.downvotes
          };
          
          const totalVotes = updatedVotes.upvotes + updatedVotes.downvotes;
          const approvalPercentage = (updatedVotes.upvotes / totalVotes) * 100;
          
          // If approval is 70% or higher and there are at least 5 votes, move to approved recipes
          if (approvalPercentage >= 70 && totalVotes >= 5) {
            setRecipes([...recipes, { ...recipe, approved: true, approvalVotes: updatedVotes }]);
            return recipe; // This will be filtered out below
          }
          
          return { ...recipe, approvalVotes: updatedVotes };
        }
        return recipe;
      }).filter(recipe => {
        const totalVotes = recipe.approvalVotes.upvotes + recipe.approvalVotes.downvotes;
        const approvalPercentage = (recipe.approvalVotes.upvotes / totalVotes) * 100;
        return !(approvalPercentage >= 70 && totalVotes >= 5);
      })
    );
  };

  const addComment = (recipeId: string, comment: Omit<Comment, 'id' | 'date'>) => {
    const newComment: Comment = {
      ...comment,
      id: `c${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setRecipes(
      recipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, comments: [...recipe.comments, newComment] } 
          : recipe
      )
    );
  };

  const rateRecipe = (recipeId: string, rating: number) => {
    setRecipes(
      recipes.map(recipe => {
        if (recipe.id === recipeId) {
          const newCount = recipe.ratings.count + 1;
          const newAverage = ((recipe.ratings.average * recipe.ratings.count) + rating) / newCount;
          return {
            ...recipe,
            ratings: {
              average: parseFloat(newAverage.toFixed(1)),
              count: newCount
            }
          };
        }
        return recipe;
      })
    );
  };

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const getPendingRecipeById = (id: string) => {
    return pendingRecipes.find(recipe => recipe.id === id);
  };

  const searchRecipes = (query: string, filters: RecipeFilters) => {
    return recipes.filter(recipe => {
      // Search by name or ingredients
      const matchesQuery = query === '' || 
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(query.toLowerCase())
        );

      // Apply category filter
      const matchesCategory = !filters.category || 
        recipe.category === filters.category;

      // Apply difficulty filter
      const matchesDifficulty = !filters.difficulty || 
        recipe.difficulty === filters.difficulty;

      // Apply prep time filter (less than or equal to)
      const matchesPrepTime = !filters.prepTime || 
        recipe.prepTime <= filters.prepTime;

      // Apply ingredients filter (must contain all specified ingredients)
      const matchesIngredients = !filters.ingredients || 
        filters.ingredients.length === 0 ||
        filters.ingredients.every(filterIngredient => 
          recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.toLowerCase().includes(filterIngredient.toLowerCase())
          )
        );

      return matchesQuery && matchesCategory && matchesDifficulty && 
        matchesPrepTime && matchesIngredients;
    });
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      pendingRecipes,
      addRecipe,
      voteRecipe,
      addComment,
      rateRecipe,
      getRecipeById,
      getPendingRecipeById,
      searchRecipes
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};