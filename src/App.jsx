import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageKey, setPageKey] = useState(0);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setPageKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      <Header />
      <div className="app__main app__page-enter" key={pageKey}>
        {currentPage === 'landing' && (
          <LandingPage onBegin={() => navigateTo('form')} />
        )}
        {currentPage === 'form' && (
          <FormPage onBack={() => navigateTo('landing')} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
