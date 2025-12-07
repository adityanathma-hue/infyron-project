import React from 'react'

export default function WhyChoose() {
  const stats = [
    {
      icon: '🎓',
      count: '10+',
      label: 'Java Students Trained',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: '☕',
      count: '30+',
      label: 'SAP Developers Certified',
      color: 'from-amber-400 to-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: '🚀',
      count: '5+',
      label: 'Enterprise Projects',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: '🏆',
      count: '20+',
      label: 'Happy Clients',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: '💼',
      count: '5+',
      label: 'Years Experience',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: '⭐',
      count: '99%',
      label: 'Client Satisfaction',
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50'
    }
  ]

  const reasons = [
    {
      title: 'Expert Team',
      desc: 'Certified SAP consultants and Java architects with multinational experience',
      icon: '👥'
    },
    {
      title: 'Proven Track Record',
      desc: 'Successfully delivered 50+ ERP solutions across manufacturing, finance, and e-commerce',
      icon: '✅'
    },
    {
      title: 'Custom Solutions',
      desc: 'Tailored implementations aligned with your business processes and goals',
      icon: '🎯'
    },
    {
      title: 'Ongoing Support',
      desc: '24/7 technical support and maintenance for all deployed solutions',
      icon: '🔧'
    },
    {
      title: 'Training & Enablement',
      desc: 'Comprehensive training programs to upskill your team on SAP and Java',
      icon: '📚'
    },
    {
      title: 'Cost Effective',
      desc: 'Transparent pricing with no hidden costs. ROI-focused implementations',
      icon: '💰'
    }
  ]

  return (
    <section id="why-choose" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Infyron Technology</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to transform your business through cutting-edge ERP and enterprise solutions.
          </p>
        </div>

        {/* Achievement Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className={`${stat.bgColor} rounded-lg p-6 border-2 border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              style={{ borderColor: stat.color.split(' ')[1] }}
            >
              <div className={`bg-gradient-to-r ${stat.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className="text-center">
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.count}
                </h3>
                <p className="text-gray-700 font-semibold mt-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Reasons */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {reasons.map((reason, idx) => (
              <div 
                key={idx}
                className={`p-6 flex gap-4 ${idx % 2 === 0 ? 'bg-gradient-to-br from-indigo-50 to-blue-50 border-r border-b border-indigo-100' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-100'}`}
              >
                <div className="text-4xl flex-shrink-0">{reason.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800">{reason.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4">Ready to transform your business?</p>
          <a href="#contact" className="btn-primary">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
}
