import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import WaterBubbles from './components/WaterBubbles'
import FlagBubbles from './components/FlagBubbles'
import ChatBot from './components/ChatBot'

function AppContent() {
  const location = useLocation()
  const isCoursesPage = location.pathname === '/courses'

  return (
    <div className="min-h-screen flex flex-col">
      {!isCoursesPage && <WaterBubbles />}
      {!isCoursesPage && <FlagBubbles />}
      {!isCoursesPage && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </main>
      {!isCoursesPage && <Footer />}
      {!isCoursesPage && <ChatBot />}
    </div>
  )
}

export default function App(){
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
