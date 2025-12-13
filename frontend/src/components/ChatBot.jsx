import React, { useState, useRef, useEffect } from 'react'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey Infyron! Thank you for connecting. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [selectedService, setSelectedService] = useState(null)
  const [showServiceSelection, setShowServiceSelection] = useState(true)
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false)
  const messagesEndRef = useRef(null)

  const services = [
    { id: 1, name: 'Web Development', emoji: '💻' },
    { id: 2, name: 'SAP Services', emoji: '⚙️' },
    { id: 3, name: 'Java Development', emoji: '☕' },
    { id: 4, name: 'Training & Support', emoji: '📚' },
    { id: 5, name: 'ERP Solutions', emoji: '📊' },
    { id: 6, name: 'Other', emoji: '❓' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-play greeting on component mount
  useEffect(() => {
    if (!hasPlayedGreeting) {
      const timer = setTimeout(() => {
        playGreeting()
        setHasPlayedGreeting(true)
      }, 1000) // Delay 1 second for better UX
      return () => clearTimeout(timer)
    }
  }, [hasPlayedGreeting])

  const speakMessage = (text) => {
    // Cancel any ongoing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      // Small delay before speaking new message
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.95
        utterance.pitch = 1.2
        utterance.volume = 1
        utterance.lang = 'en-US'
        
        // Select a female voice
        const voices = window.speechSynthesis.getVoices()
        const femaleVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Samantha') || 
          voice.name.includes('Victoria') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Google US English Female') ||
          voice.name.includes('Microsoft Zira') ||
          (voice.lang === 'en-US' && voice.name.includes('Female'))
        )
        
        if (femaleVoice) {
          utterance.voice = femaleVoice
        }
        
        window.speechSynthesis.speak(utterance)
      }, 100)
    }
  }

  const playGreeting = () => {
    speakMessage("Hey Infyron! Thank you for connecting. How can I help you today?")
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setShowServiceSelection(false)
    
    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: `I'm interested in ${service.name}`,
      sender: 'user',
      timestamp: new Date()
    }
    
    // Add bot response
    const botMsg = {
      id: messages.length + 2,
      text: `Great! I'd love to help you with ${service.name}. To better assist you, could you please share your contact information or tell me more about your requirements?`,
      sender: 'bot',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMsg, botMsg])
    speakMessage(`Great! I'd love to help you with ${service.name}. To better assist you, could you please share your contact information or tell me more about your requirements?`)
  }

  const handleContactForm = () => {
    const userMsg = {
      id: messages.length + 1,
      text: "I'd like to provide my contact information",
      sender: 'user',
      timestamp: new Date()
    }
    
    const botMsg = {
      id: messages.length + 2,
      text: "Perfect! Please scroll down to our Contact section and fill out the form. Our team will get back to you shortly!",
      sender: 'bot',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMsg, botMsg])
    speakMessage("Perfect! Please scroll down to our Contact section and fill out the form. Our team will get back to you shortly!")
    
    // Auto scroll to contact section
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 1000)
  }

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        text: "Hey Infyron! Thank you for connecting. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ])
    setSelectedService(null)
    setShowServiceSelection(true)
    playGreeting()
  }

  const handleWhatsAppClick = () => {
    const whatsappMessage = 'Hi, I would like to know more about Infyron Technologies courses and services.'
    const whatsappUrl = `https://wa.me/918637271743?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-24 w-14 h-14 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-2xl z-40"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-2xl z-40 group animate-pulse-glow"
      >
        <span className="group-hover:hidden">💬</span>
        <span className="hidden group-hover:block">✕</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-40 animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Infyron Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Service Selection */}
          {showServiceSelection && (
            <div className="border-t p-4 space-y-2 max-h-48 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-600 mb-2">Select a service:</p>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="w-full text-left p-2 rounded hover:bg-indigo-50 transition text-sm border border-gray-200 hover:border-indigo-600"
                >
                  <span className="mr-2">{service.emoji}</span>
                  {service.name}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {!showServiceSelection && (
            <div className="border-t p-4 space-y-2">
              <button
                onClick={handleContactForm}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition text-sm font-medium"
              >
                Share Contact Info
              </button>
              <button
                onClick={handleReset}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition text-sm font-medium"
              >
                Start Over
              </button>
              <button
                onClick={() => speakMessage("How can I help you today?")}
                className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition text-sm font-medium"
              >
                🔊 Repeat
              </button>
            </div>
          )}

          {/* Input Area */}
          {showServiceSelection && (
            <div className="border-t p-3 bg-white rounded-b-lg">
              <button
                onClick={playGreeting}
                className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium py-1"
              >
                🔊 Play Greeting
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </>
  )
}
