import React from 'react'

export default function About() {

  const team = [
    {
      name: 'Mr. Rabindra Nath',
      role: 'Founder & CEO – Infyron Technology',
      img: '/assets/Gemini_Generated_Image_qovcidqovcidqovc.png',
      desc: [
        "With over 20 years of industry experience, Mr. Rabindra Nath is the driving force behind Infyron Technology's vision and success. He is a seasoned expert in ERP and SAP solutions, contributing to several international government and enterprise-level digital transformation projects.",
        "His leadership combines deep technical knowledge, global experience, and a strong commitment to delivering value-driven solutions. Under his guidance, Infyron Technology has built a reputation for excellence in SAP training, ERP implementation, and enterprise software development.",
        "Mr. Nath's expertise spans across multiple domains including SAP ABAP, SAP Fiori, Java enterprise development, and modern web technologies. He has successfully led teams in delivering complex ERP solutions for manufacturing, insurance, and e-commerce sectors.",
        "He continues to guide Infyron Technology with a focus on innovation, excellence, and customer-centric service delivery. His vision is to empower businesses with cutting-edge technology solutions that drive real business outcomes and sustainable growth.",
        "Mr. Nath is passionate about nurturing talent and has personally mentored numerous professionals who have gone on to successful careers in SAP and enterprise software development. His commitment to quality, integrity, and continuous learning shapes the core values of Infyron Technology."
      ]
    }
  ]

  return (
    <section id="about" className="py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Welcome Section */}
        <h2 className="text-2xl font-semibold">Welcome to Infyron Technology</h2>
        <div className="mt-6 space-y-4 text-gray-700">
          <p>
            At Infyron Technology, we are committed to empowering businesses with smart, reliable, and future-ready ERP and enterprise software solutions.
          </p>
          <p>
            We specialise in SAP training & internships, ERP implementation and support, and Java-based enterprise web development.
          </p>
          <p>
            Our customer-first approach ensures that organisations improve efficiency, streamline processes, and accelerate digital transformation.
          </p>
        </div>

        {/* Mission Section */}
        <h3 className="mt-10 text-lg font-semibold">Mission</h3>
        <p className="mt-2 text-gray-700">
          Our mission is to empower organisations with robust ERP solutions, high-quality SAP capabilities, and modern enterprise software that enhance business performance.
          We aim to deliver technology that is innovative, practical, secure, and aligned with real business needs.
        </p>

        {/* Vision Section */}
        <h3 className="mt-6 text-lg font-semibold">Vision</h3>
        <p className="mt-2 text-gray-700">
          Our vision is to be recognised as a leading technology and SAP solutions provider, known for delivering excellence across ERP services, professional training, and enterprise software development.
        </p>

        {/* Leadership Section */}
        <h3 className="mt-10 text-xl font-semibold">Leadership</h3>

        <div className="mt-6">
          {team.map((leader, index) => (
            <div key={index} className="bg-white rounded shadow p-6">
              
              {/* Leadership Image floated to the right within text */}
              <div className="float-right ml-6 mb-4 w-64 md:w-80">
                <img 
                  src={leader.img} 
                  alt={leader.name} 
                  className="w-full rounded shadow-lg"
                  loading="lazy"
                  onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='https://source.unsplash.com/400x400/?portrait,ceo' }}
                />
                {/* Name & Title Below Photo */}
                <div className="mt-3 text-center">
                  <h4 className="text-base font-semibold">{leader.name}</h4>
                  <div className="text-xs text-gray-600 mt-1">{leader.role}</div>
                </div>
              </div>

              {/* Description text flows around the image */}
              {leader.desc.map((paragraph, i) => (
                <p key={i} className="mt-3 text-gray-700 first:mt-0">
                  {paragraph}
                </p>
              ))}
              
              <div className="clear-both"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
