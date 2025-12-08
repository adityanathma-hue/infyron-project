import React from 'react'
import axios from 'axios'
import Technologies from '../components/Technologies'
import Training from '../components/Training'
import Security from '../components/Security'
import EMarketing from '../components/EMarketing'
import About from '../components/About'
import WhyChoose from '../components/WhyChoose'

function Hero(){
  return (
    <section id="home" className="relative text-white">
      <div className="absolute inset-0">
        <img src="/assets/hero.jpg" alt="Infyron hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Left floating quick actions (call & email) visible on all screens */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        <a
          href="tel:+918637271743"
          className="w-12 h-12 rounded-full bg-white/90 text-indigo-700 shadow-lg backdrop-blur flex items-center justify-center hover:bg-white"
          aria-label="Call Infyron Technology"
        >
          {/* Phone icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.121 3.365a1 1 0 01-.502 1.21l-1.518.759a11.042 11.042 0 006.105 6.105l.759-1.518a1 1 0 011.21-.502l3.365 1.121a1 1 0 01.684.949V19a2 2 0 01-2 2h-1c-7.18 0-13-5.82-13-13V5z" />
          </svg>
        </a>
        <a
          href="mailto:info@infyrontechnology.co.in"
          className="w-12 h-12 rounded-full bg-white/90 text-indigo-700 shadow-lg backdrop-blur flex items-center justify-center hover:bg-white"
          aria-label="Email Infyron Technology"
        >
          {/* Mail icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/company/infyron-technologies"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-white/90 text-indigo-700 shadow-lg backdrop-blur flex items-center justify-center hover:bg-white"
          aria-label="Infyron Technology LinkedIn"
        >
          {/* LinkedIn icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.05-8.805 0-9.719h3.554v1.375c.427-.659 1.191-1.592 2.897-1.592 2.117 0 3.704 1.385 3.704 4.362v5.574zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.955.769-1.71 1.958-1.71 1.187 0 1.915.755 1.94 1.71 0 .952-.753 1.71-1.983 1.71zm1.581 11.597H3.714V9.633h3.204v10.819zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
          </svg>
        </a>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 min-h-[70vh] flex items-center">
        <div className="w-full">
          <div className="mx-auto max-w-3xl text-center bg-black/50 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-3xl md:text-5xl font-bold">Expand your business with Infyron Technology</h1>
            <p className="mt-4 text-lg md:text-2xl">Get A-Z service and support with Advance ERP solution</p>
            <div className="mt-6 flex items-center justify-center">
              <a href="#contact" className="btn-primary">Contact Infyron</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services(){
  const [selectedService, setSelectedService] = React.useState(null)
  
  const items = [
    {
      title: 'Web Development',
      desc: 'Modern web apps and platforms.',
      details: 'We build responsive, scalable web applications using React, Vue, and modern JavaScript frameworks. Our team specializes in creating user-friendly interfaces with optimal performance and SEO optimization. We provide end-to-end solutions from design to deployment.',
      icon: '💻'
    },
    {
      title: 'SAP Services',
      desc: 'SAP ERP implementation, customization and support.',
      details: 'End-to-end SAP implementation including functional consulting, technical customization, data migration, and ongoing support. We specialize in Finance, HR, MM, and SD modules. Our experts have successfully implemented SAP for 50+ organizations across multiple sectors.',
      icon: '⚙️'
    },
    {
      title: 'Java Development',
      desc: 'Enterprise Java applications and backend services.',
      details: 'Enterprise-grade Java development with Spring Framework, microservices architecture, REST APIs, and cloud-native applications. We follow industry best practices and design patterns for scalable, maintainable code. Integration with databases, message queues, and cloud platforms included.',
      icon: '☕'
    }
  ]
  
  return (
    <>
      <section id="services" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Services</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((i) => (
              <div
                key={i.title}
                onClick={() => setSelectedService(i)}
                className="card-hover cursor-pointer"
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">{i.icon}</span>
                </div>
                <h3 className="font-semibold text-lg">{i.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">{selectedService.title}</h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <p className="mt-2 text-gray-600 font-medium">{selectedService.desc}</p>
              <div className="mt-4 border-t pt-4">
                <p className="text-gray-700 leading-relaxed">{selectedService.details}</p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="mt-6 bg-brand-600 text-white px-6 py-2 rounded hover:bg-brand-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Contact(){
  const [form, setForm] = React.useState({name: '', email: '', service: '', message: ''})
  const [status, setStatus] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [showThankYou, setShowThankYou] = React.useState(false)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try{
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Sending to:', `${apiUrl}/contact`, form);
      const response = await axios.post(`${apiUrl}/contact`, form)
      console.log('Response:', response.data);
      setStatus('✓ Message sent successfully!')
      setForm({name: '', email: '', service: '', message: ''})
      setShowThankYou(true)
      // Auto-hide after 20 seconds
      setTimeout(() => setShowThankYou(false), 20000)
    }catch(err){
      console.error('Contact form error:', err);
      setStatus(`✗ Failed: ${err.response?.data?.error || err.message || 'Network error'}`)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-16">
      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4 animate-bounce">👍</div>
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">Thank You for Reaching Out!</h3>
            <p className="text-gray-700 mb-4">Our team will get back to you shortly.</p>
            <button 
              onClick={() => setShowThankYou(false)}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <input className="p-3 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="p-3 border rounded" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <select 
            className="p-3 border rounded bg-white" 
            value={form.service} 
            onChange={e=>setForm({...form, service:e.target.value})}
            required
          >
            <option value="">Select a service</option>
            <option value="Web Development">Web Development</option>
            <option value="SAP Services">SAP Services</option>
            <option value="Java Development">Java Development</option>
            <option value="Training & Workshops">Training & Workshops</option>
            <option value="SAP ERP Lite Support">SAP ERP Lite Support</option>
            <option value="E-Marketing">E-Marketing</option>
            <option value="Other">Other</option>
          </select>
          <textarea className="p-3 border rounded" placeholder="Tell us about your needs" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
          <div>
            <button 
              className="bg-indigo-600 text-white px-5 py-2 rounded disabled:opacity-50" 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            {status && <span className="ml-4 text-sm">{status}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default function Home(){
  return (
    <div>
      <Hero />
      <Services />
      <WhyChoose />
      <About />
      <Technologies />
      <Training />
      <Security />
      <EMarketing />
      <Contact />
    </div>
  )
}
