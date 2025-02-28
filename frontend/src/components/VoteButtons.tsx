import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface VoteButtonsProps {
  recipeId: string;
  upvotes: number;
  downvotes: number;
  onVote: (vote: 'up' | 'down') => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ recipeId, upvotes, downvotes, onVote }) => {
  const { isLoggedIn, hasVotedOnRecipe } = useUser();
  const userVote = hasVotedOnRecipe(recipeId);
  
  const totalVotes = upvotes + downvotes;
  const approvalPercentage = totalVotes > 0 ? Math.round((upvotes / totalVotes) * 100) : 0;
  
  const getProgressColor = () => {
    if (approvalPercentage >= 70) return 'bg-green-500';
    if (approvalPercentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3">Community Approval</h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Approval Rating</span>
          <span className="font-medium">{approvalPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor()}`} 
            style={{ width: `${approvalPercentage}%` }}
          ></div>
        </div>
        <div className="mt-1 text-xs text-gray-500 text-right">
          {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={() => onVote('up')}
          disabled={!isLoggedIn}
          className={`flex items-center px-4 py-2 rounded-md ${
            userVote === 'up'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <ThumbsUp className="w-5 h-5 mr-1" />
          <span>Authentic ({upvotes})</span>
        </button>
        
        <button
          onClick={() => onVote('down')}
          disabled={!isLoggedIn}
          className={`flex items-center px-4 py-2 rounded-md ${
            userVote === 'down'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <ThumbsDown className="w-5 h-5 mr-1" />
          <span>Not Authentic ({downvotes})</span>
        </button>
      </div>
      
      {!isLoggedIn && (
        <p className="mt-3 text-sm text-gray-500 text-center">
          Please log in to vote on this recipe.
        </p>
      )}
      
      {approvalPercentage >= 70 && totalVotes >= 5 ? (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-sm text-center">
          This recipe has been approved by the community!
        </div>
      ) : (
        <div className="mt-4 text-xs text-gray-500 text-center">
          Recipes need at least 70% approval and 5 votes to be added to the main directory.
        </div>
      )}
    </div>
  );
};

export default VoteButtons;