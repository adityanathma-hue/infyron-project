import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import WaterBubbles from './components/WaterBubbles'
import FlagBubbles from './components/FlagBubbles'
import ChatBot from './components/ChatBot'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <WaterBubbles />
      <FlagBubbles />
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
