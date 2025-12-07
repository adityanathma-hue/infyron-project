import React from 'react'

export default function Testimonials(){
  const items = [
    {quote: 'Great service and fast delivery.', author: 'Client A'},
    {quote: 'Excellent support and team.', author: 'Client B'}
  ]
  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((t,i) => (
            <blockquote key={i} className="card-hover">
              <p className="text-gray-800">"{t.quote}"</p>
              <footer className="mt-4 text-sm text-gray-600">— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
