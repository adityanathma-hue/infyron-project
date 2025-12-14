import React, { useState } from 'react'
import EnrollmentModal from '../components/EnrollmentModal'
import PaymentModal from '../components/PaymentModal'

export default function Courses() {
  const [enrollmentModal, setEnrollmentModal] = useState({
    isOpen: false,
    courseTitle: '',
    courseType: '',
    price: ''
  })

  const [paymentModal, setPaymentModal] = useState({
    isOpen: false
  })

  const openEnrollmentModal = (courseTitle, courseType, price) => {
    setEnrollmentModal({
      isOpen: true,
      courseTitle,
      courseType,
      price
    })
  }

  const closeEnrollmentModal = () => {
    setEnrollmentModal({
      isOpen: false,
      courseTitle: '',
      courseType: '',
      price: ''
    })
  }

  const openPaymentModal = () => {
    setPaymentModal({
      isOpen: true
    })
  }

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false
    })
  }

  const courses = [
    {
      id: 1,
      title: 'SAP ABAP Development',
      description: 'Master SAP ABAP programming, data dictionary, ALV reports, and custom development.',
      duration: '3 months',
      price: '₹22,000',
      internshipPrice: '₹30,000',
      features: ['Core ABAP', 'Data Dictionary', 'ALV Reports', 'BAPIs & RFCs', 'Smart Forms']
    },
    {
      id: 2,
      title: 'SAP Fiori/UI5 Development',
      description: 'Learn modern SAP UI development with Fiori apps, UI5 framework, and responsive design.',
      duration: '2.5 months',
      price: '₹25,000',
      internshipPrice: '₹35,000',
      features: ['Fiori Elements', 'SAPUI5 Framework', 'OData Services', 'Custom Fiori Apps', 'Launchpad']
    },
    {
      id: 3,
      title: 'SAP Business Technology Platform (BTP)',
      description: 'Build cloud-native applications using SAP BTP, extension suite, and integration tools.',
      duration: '3 months',
      price: '₹28,000',
      internshipPrice: '₹38,000',
      features: ['Cloud Foundry', 'Extension Suite', 'Integration Suite', 'BTP Services', 'Workflow']
    },
    {
      id: 4,
      title: 'SAP Cloud Platform Integration (CPI)',
      description: 'Master integration patterns, middleware concepts, and SAP CPI development.',
      duration: '2 months',
      price: '₹20,000',
      internshipPrice: '₹28,000',
      features: ['Integration Flows', 'Adapters', 'Mapping', 'Security', 'Monitoring']
    },
    {
      id: 5,
      title: 'Full Stack Development (Java)',
      description: 'Complete enterprise Java development with Spring Boot, Hibernate, and Microservices.',
      duration: '4 months',
      price: '₹60,000',
      internshipPrice: '₹70,000',
      features: ['Core Java', 'Spring Boot', 'Hibernate', 'Microservices', 'REST APIs', 'Deployment']
    },
    {
      id: 6,
      title: 'SAP Material Management (MM)',
      description: 'Learn SAP MM module for procurement, inventory management, and material master data.',
      duration: '2.5 months',
      price: '₹20,000',
      internshipPrice: '₹28,000',
      features: ['Material Master', 'Procurement', 'Inventory Management', 'Vendor Management', 'Purchase Orders']
    },
    {
      id: 7,
      title: 'SAP Sales and Distribution (SD)',
      description: 'Master SAP SD module for sales processes, pricing, delivery, and billing.',
      duration: '3 months',
      price: '₹22,000',
      internshipPrice: '₹30,000',
      features: ['Sales Orders', 'Pricing', 'Delivery Process', 'Billing', 'Customer Master', 'Credit Management']
    },
    {
      id: 8,
      title: 'SAP Environment, Health & Safety Management (EHSM)',
      description: 'Comprehensive training on SAP EHS for managing environmental compliance and safety.',
      duration: '2 months',
      price: '₹18,000',
      internshipPrice: '₹26,000',
      features: ['Incident Management', 'Waste Management', 'Compliance', 'Risk Assessment', 'Safety Reports']
    },
    {
      id: 9,
      title: 'SAP Human Capital Management (HCM)',
      description: 'Learn SAP HCM/SuccessFactors for personnel management, payroll, and talent management.',
      duration: '3 months',
      price: '₹22,000',
      internshipPrice: '₹30,000',
      features: ['Personnel Administration', 'Payroll', 'Time Management', 'Talent Management', 'Organizational Management']
    },
    {
      id: 10,
      title: 'Computer Basics & MS Office (High School)',
      description: 'Foundation course for high school students covering computer fundamentals and MS Office applications.',
      duration: '2 months',
      price: '₹8,000',
      internshipPrice: '₹12,000',
      features: ['Computer Fundamentals', 'MS Word', 'MS Excel', 'MS PowerPoint', 'Internet Basics', 'Typing Skills']
    },
    {
      id: 11,
      title: 'Web Development Basics (High School/Diploma)',
      description: 'Introduction to web development with HTML, CSS, and JavaScript for beginners.',
      duration: '3 months',
      price: '₹15,000',
      internshipPrice: '₹20,000',
      features: ['HTML5', 'CSS3', 'JavaScript Basics', 'Responsive Design', 'Portfolio Project', 'Certificate']
    },
    {
      id: 12,
      title: 'Programming Fundamentals with Python (Diploma)',
      description: 'Learn programming basics with Python - perfect for diploma students entering tech field.',
      duration: '2.5 months',
      price: '₹18,000',
      internshipPrice: '₹25,000',
      features: ['Python Basics', 'Data Structures', 'Problem Solving', 'Mini Projects', 'Coding Practice', 'Certification']
    },
    {
      id: 13,
      title: 'Digital Marketing Basics (High School/Diploma)',
      description: 'Learn social media marketing, SEO basics, and content creation for career in digital marketing.',
      duration: '2 months',
      price: '₹12,000',
      internshipPrice: '₹18,000',
      features: ['Social Media Marketing', 'SEO Basics', 'Content Creation', 'Email Marketing', 'Analytics', 'Live Projects']
    },
    {
      id: 14,
      title: 'Graphic Design with Canva & Photoshop (Diploma)',
      description: 'Creative design course for diploma students covering modern design tools and principles.',
      duration: '2 months',
      price: '₹14,000',
      internshipPrice: '₹20,000',
      features: ['Canva Pro', 'Photoshop Basics', 'Logo Design', 'Social Media Graphics', 'Portfolio Building', 'Certificate']
    },
    {
      id: 15,
      title: 'Embedded Systems & IoT Development',
      description: 'Master embedded systems programming with ARM Cortex, RTOS, IoT protocols, and real-world hardware projects.',
      duration: '4 months',
      price: '₹55,000',
      internshipPrice: '₹65,000',
      features: ['Embedded C/C++', 'ARM Cortex-M Programming', 'FreeRTOS', 'IoT Protocols (MQTT/HTTP)', 'Sensor Integration', 'PCB Design Basics', 'Industry Projects']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <img
          src="/assets/logo-letter.svg"
          alt="Infyron watermark"
          className="w-[80vw] h-[80vh] object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Pay Now Badge - Fixed Top Right Corner */}
        <div className="fixed top-24 right-6 z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <button
              onClick={() => openPaymentModal()}
              className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce"
            >
              💳 PAY NOW
            </button>
          </div>
          <p className="text-center text-xs font-bold text-red-600 mt-2 animate-pulse">
            Don't Miss!
          </p>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Training <span className="text-indigo-600">Courses</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industry-relevant courses designed to accelerate your career. Choose between regular training or training with internship opportunity.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 relative"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-indigo-100 text-sm">{course.duration}</p>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {course.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Topics:</h4>
                  <ul className="space-y-1">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="mb-3">
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-500 mb-1">Training Only</p>
                      <p className="text-2xl font-bold text-indigo-600">{course.price}</p>
                      <button 
                        onClick={() => openEnrollmentModal(course.title, 'training', course.price)}
                        className="w-full mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                      >
                        📝 Enroll Now
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 border border-indigo-200">
                    <p className="text-xs text-purple-700 font-semibold flex items-center mb-1">
                      <span className="text-lg mr-1">🎓</span>
                      With Internship
                    </p>
                    <p className="text-xl font-bold text-purple-700 mb-3">{course.internshipPrice}</p>
                    <button 
                      onClick={() => openEnrollmentModal(course.title, 'internship', course.internshipPrice)}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition text-sm font-medium shadow-md"
                    >
                      📝 Enroll Now
                    </button>
                    <p className="text-xs text-purple-600 mt-2">
                      Includes 3-month internship with real projects & certificate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* Additional Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Why Choose Our Courses?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">👨‍💼</div>
              <h3 className="font-semibold text-gray-800 mb-2">Industry Experts</h3>
              <p className="text-gray-600 text-sm">Learn from professionals with 10+ years of experience</p>
            </div>
            <div>
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold text-gray-800 mb-2">Real Projects</h3>
              <p className="text-gray-600 text-sm">Work on live projects during internship phase</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-gray-800 mb-2">Certification</h3>
              <p className="text-gray-600 text-sm">Industry-recognized certificate upon completion</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            Have questions or need custom training solutions?
          </p>
          <a
            href="/#contact"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-lg hover:shadow-xl"
          >
            Contact Us
          </a>
        </div>
      </div>

      <EnrollmentModal
        isOpen={enrollmentModal.isOpen}
        onClose={closeEnrollmentModal}
        courseTitle={enrollmentModal.courseTitle}
        courseType={enrollmentModal.courseType}
        price={enrollmentModal.price}
      />
      
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        courses={courses}
      />
    </div>
  )
}
