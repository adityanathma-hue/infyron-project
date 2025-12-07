import React, { useState } from 'react'
import LeadershipModal from './LeadershipModal'
import AnimatedLogo from './AnimatedLogo'
import AnimatedSlogan from './AnimatedSlogan'
import FlyingFlag from './FlyingFlag'

export default function Header(){
  const [showLeadership, setShowLeadership] = useState(false)

  return (
    <>
      <header className="bg-white shadow relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none text-8xl font-bold text-gray-800 flex items-center justify-center -rotate-12">
          Infyron Technology
        </div>
        <div className="max-w-6xl mx-auto px-6 py-4 relative z-10">
          {/* Top row: Logo + Company Info + Slogan with Flying Flag */}
          <div className="flex items-center justify-between gap-6 mb-3">
            <div className="flex items-center gap-3">
              <AnimatedLogo className="h-14 w-auto" />
              <div>
                <span className="font-semibold text-lg text-gray-800">Infyron Technology</span>
                <p className="text-xs text-gray-500">Bhubaneswar, India</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <FlyingFlag />
              <AnimatedSlogan />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#home" className="hover:text-indigo-600">Home</a>
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#services" className="hover:text-indigo-600">Services</a>
            <a href="#projects" className="hover:text-indigo-600">Projects</a>
            <button 
              onClick={() => setShowLeadership(true)}
              className="hover:text-indigo-600 font-medium"
            >
              Leadership
            </button>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
        </div>
      </header>

      <LeadershipModal 
        isOpen={showLeadership} 
        onClose={() => setShowLeadership(false)} 
      />
    </>
  )
}
