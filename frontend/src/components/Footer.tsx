import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <ChefHat className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Sierra Leone Recipes</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover authentic Sierra Leonean cuisine and share your own recipes with our community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-green-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-300 hover:text-white">Recipes</Link>
              </li>
              <li>
                <Link to="/submit" className="text-gray-300 hover:text-white">Submit Recipe</Link>
              </li>
              <li>
                <Link to="/voting" className="text-gray-300 hover:text-white">Vote on Recipes</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recipes?category=Main Course" className="text-gray-300 hover:text-white">Main Course</Link>
              </li>
              <li>
                <Link to="/recipes?category=Soup" className="text-gray-300 hover:text-white">Soups</Link>
              </li>
              <li>
                <Link to="/recipes?category=Snack" className="text-gray-300 hover:text-white">Snacks</Link>
              </li>
              <li>
                <Link to="/recipes?category=Beverage" className="text-gray-300 hover:text-white">Beverages</Link>
              </li>
              <li>
                <Link to="/recipes?category=Dessert" className="text-gray-300 hover:text-white">Desserts</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">Have questions or suggestions?</p>
            <p className="text-gray-300 mb-2">Email: info@sierraleonerecipes.com</p>
            <p className="text-gray-300">Phone: +232 76 427304</p>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-6">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Sierra Leone Recipes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;