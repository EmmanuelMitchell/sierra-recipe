export interface Recipe {
    id: string;
    name: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    imageUrl: string;
    submittedBy: string;
    dateSubmitted: string;
    approved: boolean;
    approvalVotes: {
      upvotes: number;
      downvotes: number;
    };
    ratings: {
      average: number;
      count: number;
    };
    comments: Comment[];
  }
  
  export interface Comment {
    id: string;
    userId: string;
    username: string;
    text: string;
    date: string;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    submittedRecipes: string[];
    votedRecipes: {
      recipeId: string;
      vote: 'up' | 'down';
    }[];
    savedRecipes: string[];
  }