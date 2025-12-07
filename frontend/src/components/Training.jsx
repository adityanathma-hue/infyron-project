import React from 'react'

export default function Training(){
  const courses = [
    {title: 'SAP Functional Training', desc: 'SAP Finance, HR, MM & SD modules for professionals.'},
    {title: 'SAP Technical Training', desc: 'ABAP, Fiori, BW & integration with real-world scenarios.'},
    {title: 'SAP Internships & Mentorship', desc: 'Hands-on SAP projects with industry experts.'},
    {title: 'Java Development', desc: 'Core Java, Enterprise Java, microservices & design patterns.'},
    {title: 'Web Development', desc: 'React, Angular, Node.js & full-stack web technologies.'}
  ]
  return (
    <section id="training" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">Training & Workshops</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(c => (
            <div key={c.title} className="card-hover">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
