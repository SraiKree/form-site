import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import LoginModal from './components/LoginModal';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageKey, setPageKey] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('mlrit_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.email && parsed.email.endsWith('@mlrit.ac.in')) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading user from storage:', e);
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setPageKey((prev) => prev + 1);
  };

  const handleBeginClick = () => {
    if (user && user.email.endsWith('@mlrit.ac.in')) {
      navigateTo('form');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('mlrit_user', JSON.stringify(userData));
    setIsLoginModalOpen(false);
    navigateTo('form');
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('mlrit_user');
    navigateTo('landing');
  };
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="app">
        <Header user={user} onSignOut={handleSignOut} />
        
        <div className="app__main app__page-enter" key={pageKey}>
          {currentPage === 'landing' && (
            <LandingPage onBegin={handleBeginClick} />
          )}
          {currentPage === 'form' && (
            <FormPage user={user} onBack={() => navigateTo('landing')} />
          )}
        </div>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />

        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
