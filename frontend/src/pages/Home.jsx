import React from 'react'
import axios from 'axios'
import Technologies from '../components/Technologies'
import Training from '../components/Training'
import Security from '../components/Security'
import EMarketing from '../components/EMarketing'
import About from '../components/About'
import WhyChoose from '../components/WhyChoose'
import PromoBanner from '../components/PromoBanner'
import PromoPopup from '../components/PromoPopup'
import ShareableBanner from '../components/ShareableBanner'

function Hero(){
  const [showShareMenu, setShowShareMenu] = React.useState(false)

  const shareToWhatsApp = () => {
    const text = encodeURIComponent('🎓 LIMITED TIME OFFER at Infyron Technology!\n\nGet Internship + Special Discount\nEnroll now and grab your dream job! 🔥\n\nVisit: ' + window.location.origin + '/courses')
    window.open(`https://wa.me/?text=${text}`, '_blank')
    setShowShareMenu(false)
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.origin + '/courses')
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    setShowShareMenu(false)
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin + '/courses')
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    setShowShareMenu(false)
  }

  const shareToInstagram = () => {
    // Instagram doesn't have direct share URL, so copy to clipboard
    const text = '🎓 LIMITED TIME OFFER at Infyron Technology!\n\nGet Internship + Special Discount\nEnroll now! 🔥\n\n' + window.location.origin + '/courses'
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ Text copied! Open Instagram and paste it in your story or post.')
      setShowShareMenu(false)
    })
  }

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
          href="https://www.linkedin.com/company/infyron-technology"
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

        {/* Share button with menu */}
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg backdrop-blur flex items-center justify-center hover:scale-110 transition animate-pulse"
            aria-label="Share"
          >
            {/* Share icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {/* Share menu */}
          {showShareMenu && (
            <div className="absolute left-16 top-0 bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-3 w-56 z-30">
              <p className="text-sm font-bold text-gray-800 mb-2 px-2">📢 Share on:</p>
              
              <button
                onClick={shareToWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>

              <button
                onClick={shareToFacebook}
                className="w-full flex items-center gap-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="w-full flex items-center gap-3 px-3 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition mb-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.05-8.805 0-9.719h3.554v1.375c.427-.659 1.191-1.592 2.897-1.592 2.117 0 3.704 1.385 3.704 4.362v5.574zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.955.769-1.71 1.958-1.71 1.187 0 1.915.755 1.94 1.71 0 .952-.753 1.71-1.983 1.71zm1.581 11.597H3.714V9.633h3.204v10.819zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
                <span className="text-sm font-medium">LinkedIn</span>
              </button>

              <button
                onClick={shareToInstagram}
                className="w-full flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm font-medium">Instagram</span>
              </button>

              <button
                onClick={() => setShowShareMenu(false)}
                className="w-full mt-2 px-3 py-2 text-gray-600 text-xs hover:bg-gray-100 rounded-lg transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
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

function IndustryExpert(){
  return (
    <section id="expert" className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Learn from Industry Expert</h2>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Image Section */}
            <div className="w-full md:w-1/3 p-8">
              <img 
                src="/assets/aditya.jpg" 
                alt="Aditya Nath - SAP Industry Expert"
                className="w-64 h-64 rounded-full mx-auto object-cover shadow-2xl border-4 border-indigo-600"
                loading="lazy"
              />
            </div>
            
            {/* Content Section */}
            <div className="w-full md:w-2/3 p-8">
              <div className="mb-4">
                <h3 className="text-3xl font-bold text-gray-800">Aditya Nath</h3>
                <p className="text-xl text-indigo-600 font-semibold mt-2">Senior SAP Industry Expert</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                    SAP Certified Professional
                  </span>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    10+ Years Experience
                  </span>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    TEDx Speaker
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Our industry expert <strong>Aditya Nath</strong> brings over <strong>10 years of extensive work experience</strong> in SAP technologies including <strong>SAP ABAP, SAP Fiori, SAP UI5, SAP BTP (Business Technology Platform), SAP CPI (Cloud Platform Integration), and SAP BPA (Business Process Automation)</strong>.
                </p>
                
                <p className="text-lg">
                  As a <strong>SAP Certified Professional</strong> and <strong>TEDx Speaker</strong>, Aditya has worked with the world's largest multinational companies including <strong>Capgemini, Wipro, Tech Mahindra</strong>, and many more organizations across various industries worldwide.
                </p>
                
                <p className="text-lg">
                  Want to gain <strong>real-world industry knowledge</strong> and hands-on expertise from someone who has implemented enterprise solutions at global scale? Learn directly from Aditya and transform your SAP career with practical insights, proven methodologies, and industry best practices.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-indigo-600">✓</span>
                    <span>SAP ABAP</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-indigo-600">✓</span>
                    <span>SAP Fiori</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-indigo-600">✓</span>
                    <span>SAP UI5</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-indigo-600">✓</span>
                    <span>SAP BTP</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-indigo-600">✓</span>
                    <span>SAP CPI</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-indigo-600">✓</span>
                    <span>SAP BPA</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-indigo-600">✓</span>
                    <span>Enterprise Solutions</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a href="#contact" className="btn-primary inline-block">
                  Get in Touch for Training
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Santosh Kumar Padhi - Embedded Systems Expert */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mt-8">
          <div className="flex flex-col md:flex-row-reverse items-center">
            {/* Image Section */}
            <div className="w-full md:w-1/3 p-8">
              <img 
                src="/assets/santosh.jpg" 
                alt="Santosh Kumar Padhi - Embedded Systems Expert"
                className="w-64 h-64 rounded-full mx-auto object-cover shadow-2xl border-4 border-purple-600"
                loading="lazy"
              />
            </div>
            
            {/* Content Section */}
            <div className="w-full md:w-2/3 p-8">
              <div className="mb-4">
                <h3 className="text-3xl font-bold text-gray-800">Santosh Kumar Padhi</h3>
                <p className="text-xl text-purple-600 font-semibold mt-2">Senior Embedded Systems Expert</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    IoT Specialist
                  </span>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    8+ Years Experience
                  </span>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Industry Veteran
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Santosh Kumar Padhi</strong> brings over <strong>8 years of specialized expertise</strong> in embedded systems, IoT solutions, and hardware-software integration. He has successfully designed and deployed mission-critical embedded systems for automotive, industrial automation, and consumer electronics sectors.
                </p>
                
                <p className="text-lg">
                  With extensive experience in <strong>ARM Cortex microcontrollers, RTOS, firmware development, and IoT platforms</strong>, Santosh has worked with leading technology companies to create innovative embedded solutions. His expertise spans from low-level device drivers to complex IoT ecosystems.
                </p>
                
                <p className="text-lg">
                  Learn from a seasoned professional who has hands-on experience in real-world embedded projects, including automotive ECUs, industrial control systems, and smart devices. Get practical knowledge in <strong>C/C++, embedded Linux, sensor integration, wireless communication protocols</strong>, and modern IoT architectures.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-600">✓</span>
                    <span>Embedded C/C++</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-600">✓</span>
                    <span>ARM Cortex-M</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-600">✓</span>
                    <span>RTOS (FreeRTOS)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-600">✓</span>
                    <span>IoT Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-600">✓</span>
                    <span>Embedded Linux</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-600">✓</span>
                    <span>Protocol (I2C/SPI/UART)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a href="#contact" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition inline-block font-semibold">
                  Enroll in Embedded Systems Training
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <PromoPopup />
      <PromoBanner />
      <Hero />
      <Services />
      <IndustryExpert />
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
