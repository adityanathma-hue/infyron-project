import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const handleShare = async () => {
    const shareData = {
      title: 'Infyron Technology - Limited Time Offer!',
      text: '🎓 Get Internship + Special Discount! Enroll now at Infyron Technology and grab your dream job! Hurry, seats filling fast! 🔥',
      url: window.location.origin + '/courses'
    }

    try {
      if (navigator.share) {
        // Use native share on mobile
        await navigator.share(shareData)
      } else {
        // Fallback: Copy to clipboard
        const shareText = `${shareData.text}\n\n${shareData.url}`
        await navigator.clipboard.writeText(shareText)
        alert('✅ Banner text copied! Paste it in your status/WhatsApp.')
      }
    } catch (err) {
      console.error('Share failed:', err)
    }
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-3 px-4 relative overflow-hidden animate-gradient-x">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-0 right-0 md:relative text-white hover:bg-white/20 rounded-full p-1 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm md:text-base">
            <span className="animate-pulse text-yellow-300 text-xl">🎓</span>
            <span className="font-bold">LIMITED TIME OFFER!</span>
            <span className="hidden md:inline">|</span>
            <span className="font-semibold">Get Internship + Special Discount</span>
            <span className="animate-bounce text-yellow-300 text-xl">🔥</span>
          </div>
          <p className="text-xs md:text-sm mt-1 opacity-90">
            Enroll now and grab your dream job! Hurry, seats filling fast!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="bg-yellow-300 text-purple-700 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg whitespace-nowrap flex items-center gap-2"
            title="Share this offer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          
          <Link
            to="/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 hover:text-purple-700 transition transform hover:scale-105 shadow-lg whitespace-nowrap"
          >
            Enroll Now →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
