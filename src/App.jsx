import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Features from './components/Features'
import Blogs from './components/Blogs'
import Drive from './components/Drive'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/drive" element={<Drive />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App