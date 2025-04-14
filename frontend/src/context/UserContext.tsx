import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  isLoggedIn: boolean;
  saveRecipe: (recipeId: string) => void;
  unsaveRecipe: (recipeId: string) => void;
  hasVotedOnRecipe: (recipeId: string) => 'up' | 'down' | null;
  addVotedRecipe: (recipeId: string, vote: 'up' | 'down') => void;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'admin',
    email: 'admin@example.com',
    submittedRecipes: [],
    votedRecipes: [],
    savedRecipes: []
  },
  {
    id: 'u2',
    username: 'MariamJ',
    email: 'mariam@example.com',
    submittedRecipes: [],
    votedRecipes: [],
    savedRecipes: ['1', '3']
  }
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (username: string) => {
    // In a real app, you would validate the password
    const user = users.find(u => u.username === username);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string) => {
    // Check if username or email already exists
    if (users.some(u => u.username === username || u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: `u${users.length + 1}`,
      username,
      email,
      submittedRecipes: [],
      votedRecipes: [],
      savedRecipes: []
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const saveRecipe = (recipeId: string) => {
    if (!currentUser) return;

    setCurrentUser({
      ...currentUser,
      savedRecipes: [...currentUser.savedRecipes, recipeId]
    });

    setUsers(users.map(user => 
      user.id === currentUser.id 
        ? { ...user, savedRecipes: [...user.savedRecipes, recipeId] } 
        : user
    ));
  };

  const unsaveRecipe = (recipeId: string) => {
    if (!currentUser) return;

    setCurrentUser({
      ...currentUser,
      savedRecipes: currentUser.savedRecipes.filter(id => id !== recipeId)
    });

    setUsers(users.map(user => 
      user.id === currentUser.id 
        ? { ...user, savedRecipes: user.savedRecipes.filter(id => id !== recipeId) } 
        : user
    ));
  };

  const hasVotedOnRecipe = (recipeId: string) => {
    if (!currentUser) return null;

    const vote = currentUser.votedRecipes.find(v => v.recipeId === recipeId);
    return vote ? vote.vote : null;
  };

  const addVotedRecipe = (recipeId: string, vote: 'up' | 'down') => {
    if (!currentUser) return;

    // Check if user has already voted on this recipe
    const hasVoted = currentUser.votedRecipes.some(v => v.recipeId === recipeId);
    
    if (hasVoted) {
      // Update existing vote
      setCurrentUser({
        ...currentUser,
        votedRecipes: currentUser.votedRecipes.map(v => 
          v.recipeId === recipeId ? { ...v, vote } : v
        )
      });

      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { 
              ...user, 
              votedRecipes: user.votedRecipes.map(v => 
                v.recipeId === recipeId ? { ...v, vote } : v
              ) 
            } 
          : user
      ));
    } else {
      // Add new vote
      setCurrentUser({
        ...currentUser,
        votedRecipes: [...currentUser.votedRecipes, { recipeId, vote }]
      });

      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { 
              ...user, 
              votedRecipes: [...user.votedRecipes, { recipeId, vote }] 
            } 
          : user
      ));
    }
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      isLoggedIn,
      saveRecipe,
      unsaveRecipe,
      hasVotedOnRecipe,
      addVotedRecipe
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};