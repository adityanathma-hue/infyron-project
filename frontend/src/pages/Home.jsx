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
      <div className="relative max-w-6xl mx-auto px-6 py-24 min-h-[70vh] flex items-center">
        <div className="w-full">
          <div className="mx-auto max-w-3xl text-center bg-black/50 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-3xl md:text-5xl font-bold">Expand your business with Infyron Technology</h1>
            <p className="mt-4 text-lg md:text-2xl">Get A-Z service and support with Advance ERP solution</p>
            <div className="mt-6">
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

function Projects(){
  const projects = [
    {
      title: 'ERP for Manufacturing',
      desc: 'ERP implementation for small manufacturing and utility companies, inventory & production workflows.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=360&fit=crop',
      localImage: '/assets/project-erp.jpg'
    },
    {
      title: 'Startup Insurance Platform',
      desc: 'Claims automation, policy management and streamlined underwriting for insurance startups.',
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=360&fit=crop',
      localImage: '/assets/project-insurance.jpg'
    },
    {
      title: 'E‑commerce Platforms',
      desc: 'Multiple e-commerce marketplaces and B2B portals with payment and catalogue integrations.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=360&fit=crop',
      localImage: '/assets/project-ecom.jpg'
    },
  ]

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">Selected Projects</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <div key={p.title} className="card-hover p-4 bg-white rounded-lg shadow-sm">
              <div className="w-full h-40 overflow-hidden rounded-md mb-4">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e)=>{ e.currentTarget.onerror = null; e.currentTarget.src = p.localImage }}
                />
              </div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">Thank You!</h3>
            <p className="text-gray-700 mb-4">Thank you for contacting us. We'll get back to you soon!</p>
            <p className="text-sm text-gray-500">This message will close automatically in 20 seconds</p>
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
      <Projects />
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
