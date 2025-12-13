import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import WaterBubbles from './components/WaterBubbles'
import FlagBubbles from './components/FlagBubbles'
import ChatBot from './components/ChatBot'

export default function App(){
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <WaterBubbles />
        <FlagBubbles />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  )
}
