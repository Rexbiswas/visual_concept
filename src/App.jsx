import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Features from './components/Features'
import Blogs from './components/Blogs'
import CarCustomizer from './components/CarCustomizer' // Updated import
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'

function App() {
  const location = useLocation();
  const showFooter = location.pathname !== '/explore';

  return (
    <>
      <Navbar />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/explore" element={<CarCustomizer />} />

      </Routes>
      {showFooter && <Footer />}
    </>
  )
}

export default App