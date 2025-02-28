import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChefHat, Search, User, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Sierra Leone Recipes</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
              Home
            </Link>
            <Link to="/recipes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
              Recipes
            </Link>
            <Link to="/submit" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
              Submit Recipe
            </Link>
            <Link to="/voting" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
              Vote
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                <User className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/recipes" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>
            <Link 
              to="/submit" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Recipe
            </Link>
            <Link 
              to="/voting" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Vote
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;