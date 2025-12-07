import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} Infyron Technology - Bhubaneswar</div>
          <div>
            <div>Head Office: Marutivilla Phase-2, Lane-3, 2nd Floor, Patia, Bhubaneswar, PIN-751017, Odisha, India</div>
            <div>Call: +91 8637271743</div>
            <div>Email: info@infyrontechnology.co.in</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
