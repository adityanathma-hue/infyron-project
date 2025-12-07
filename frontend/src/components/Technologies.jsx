import React from 'react'

export default function Technologies(){
  const items = [
    { title: 'Web Design', watermark: 'UI/UX', icon: '🎨' },
    { title: 'Web Development', watermark: 'Frontend', icon: '💻' },
    { title: 'Java', watermark: 'Enterprise', icon: '☕' },
    { title: 'SAP', watermark: 'ERP', icon: '⚙️' }
  ]
  return (
    <section id="technologies" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">Technologies</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map(i => (
            <div 
              key={i.title} 
              className="card-hover text-center relative overflow-hidden h-32 flex items-center justify-center"
            >
              {/* Watermark background text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <span className="text-6xl font-bold text-gray-800 transform -rotate-45">{i.watermark}</span>
              </div>
              
              {/* Main content */}
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-2">{i.icon}</div>
                <h3 className="font-semibold text-lg">{i.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
