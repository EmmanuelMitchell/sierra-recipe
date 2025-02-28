import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, name, imageUrl, prepTime, cookTime, servings, ratings, difficulty } = recipe;

  const totalTime = prepTime + cookTime;
  const formattedTime = totalTime >= 60 
    ? `${Math.floor(totalTime / 60)}h ${totalTime % 60}m` 
    : `${totalTime}m`;

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  }[difficulty];

  return (
    <Link to={`/recipe/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColor}`}>
              {difficulty}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{name}</h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{servings}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
              <span>{ratings.average.toFixed(1)} ({ratings.count})</span>
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-100">
            <span className="text-sm text-green-700 font-medium">View Recipe →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;