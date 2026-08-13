import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './components/BlogPost';

const MainContent = ({ setIsContactVisible, setIsWorkVisible, isContactVisible, isWorkVisible }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <main className={isHomePage ? 'w-full' : 'container mx-auto px-4 py-8'}>
        <Routes>
          <Route path="/" element={<Home setIsContactVisible={setIsContactVisible}
            setIsWorkVisible={setIsWorkVisible}
            isContactVisible={isContactVisible}
            isWorkVisible={isWorkVisible} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </main>
      {!isHomePage && (
        <Footer isContactVisible={isContactVisible}
          isWorkVisible={isWorkVisible}
        />
      )}
    </>
  );
};

function App() {
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isWorkVisible, setIsWorkVisible] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-garamond flex flex-col">
        <Header isContactVisible={isContactVisible}
          isWorkVisible={isWorkVisible}
        />
        <MainContent setIsContactVisible={setIsContactVisible}
          setIsWorkVisible={setIsWorkVisible}
          isContactVisible={isContactVisible}
          isWorkVisible={isWorkVisible} />
      </div>
    </Router>
  );
}

export default App;
