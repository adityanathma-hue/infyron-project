import React from 'react'

export default function EMarketing(){
  const items = [
    {title: 'SEO', desc: 'Improve organic visibility.'},
    {title: 'Social Media', desc: 'Engagement & campaigns.'}
  ]
  return (
    <section id="emarketing" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">e-Marketing</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(i => (
            <div key={i.title} className="card-hover">
              <h3 className="font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
