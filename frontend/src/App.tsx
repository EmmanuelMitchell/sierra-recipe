
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import VotingPage from './pages/VotingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import SubmitRecipePage from './pages/SubmitRecipePage';


function App() {
  return (
    <UserProvider>
      <RecipeProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                <Route path="/submit" element={<SubmitRecipePage />} />
                <Route path="/voting" element={<VotingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </RecipeProvider>
    </UserProvider>
  );
}

export default App;