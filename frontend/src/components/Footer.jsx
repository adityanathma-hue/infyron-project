import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>© {new Date().getFullYear()} Infyron Technology - Bhubaneswar</div>
          <div className="space-y-1">
            <div className="break-words">Head Office: Marutivilla Phase-2, Lane-3, 2nd Floor, Patia, Bhubaneswar, PIN-751017, Odisha, India</div>
            <div>Call: +91 8637271743</div>
            <div className="break-all">Email: info@infyrontechnology.co.in</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
