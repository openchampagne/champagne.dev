import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './components/BlogPost';

const MainContent = ({ setIsContactVisible, setIsWorkVisible }) => {
  const location = useLocation();
  // Remove the basename from the pathname when checking
  const path = location.pathname.replace(process.env.PUBLIC_URL, '') || '/';
  const isHomePage = path === '/';

  return (
    <main className={isHomePage ? 'w-full' : 'container mx-auto px-4 py-8'}>
      <Routes>
        <Route path="/" element={<Home setIsContactVisible={setIsContactVisible}
          setIsWorkVisible={setIsWorkVisible} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </main>
  );
};

function App() {
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isWorkVisible, setIsWorkVisible] = useState(false);
  console.log('Public URL:', process.env.PUBLIC_URL);
  console.log('Current pathname:', window.location.pathname);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-garamond">
        <Header isContactVisible={isContactVisible}
          isWorkVisible={isWorkVisible}
        />
        <MainContent setIsContactVisible={setIsContactVisible}
          setIsWorkVisible={setIsWorkVisible} />
      </div>
    </Router>
  );
}

export default App;