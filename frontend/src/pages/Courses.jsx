import React from 'react'

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: 'SAP ABAP Development',
      description: 'Master SAP ABAP programming, data dictionary, ALV reports, and custom development.',
      duration: '3 months',
      price: '₹45,000',
      internshipPrice: '₹55,000',
      features: ['Core ABAP', 'Data Dictionary', 'ALV Reports', 'BAPIs & RFCs', 'Smart Forms']
    },
    {
      id: 2,
      title: 'SAP Fiori/UI5 Development',
      description: 'Learn modern SAP UI development with Fiori apps, UI5 framework, and responsive design.',
      duration: '2.5 months',
      price: '₹50,000',
      internshipPrice: '₹60,000',
      features: ['Fiori Elements', 'SAPUI5 Framework', 'OData Services', 'Custom Fiori Apps', 'Launchpad']
    },
    {
      id: 3,
      title: 'SAP Business Technology Platform (BTP)',
      description: 'Build cloud-native applications using SAP BTP, extension suite, and integration tools.',
      duration: '3 months',
      price: '₹55,000',
      internshipPrice: '₹65,000',
      features: ['Cloud Foundry', 'Extension Suite', 'Integration Suite', 'BTP Services', 'Workflow']
    },
    {
      id: 4,
      title: 'SAP Cloud Platform Integration (CPI)',
      description: 'Master integration patterns, middleware concepts, and SAP CPI development.',
      duration: '2 months',
      price: '₹40,000',
      internshipPrice: '₹50,000',
      features: ['Integration Flows', 'Adapters', 'Mapping', 'Security', 'Monitoring']
    },
    {
      id: 5,
      title: 'Full Stack Development (MERN)',
      description: 'Complete web development with MongoDB, Express, React, and Node.js.',
      duration: '4 months',
      price: '₹60,000',
      internshipPrice: '₹70,000',
      features: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'Deployment']
    },
    {
      id: 6,
      title: 'Data Analytics & Visualization',
      description: 'Learn data analysis, SQL, Python, and visualization tools for business insights.',
      duration: '3 months',
      price: '₹45,000',
      internshipPrice: '₹55,000',
      features: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel Analytics', 'Statistics']
    },
    {
      id: 7,
      title: 'DevOps & Cloud Engineering',
      description: 'Master CI/CD, containerization, orchestration, and cloud platforms.',
      duration: '3 months',
      price: '₹50,000',
      internshipPrice: '₹60,000',
      features: ['Docker', 'Kubernetes', 'Jenkins', 'AWS/Azure', 'Git', 'Terraform']
    },
    {
      id: 8,
      title: 'AI & Machine Learning Fundamentals',
      description: 'Introduction to AI, ML algorithms, deep learning, and practical applications.',
      duration: '4 months',
      price: '₹65,000',
      internshipPrice: '₹75,000',
      features: ['Python', 'ML Algorithms', 'TensorFlow', 'Neural Networks', 'NLP', 'Projects']
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
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
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
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Training Only</p>
                      <p className="text-2xl font-bold text-indigo-600">{course.price}</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                      Enroll Now
                    </button>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 border border-indigo-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-purple-700 font-semibold flex items-center">
                          <span className="text-lg mr-1">🎓</span>
                          With Internship
                        </p>
                        <p className="text-xl font-bold text-purple-700">{course.internshipPrice}</p>
                      </div>
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition text-sm font-medium shadow-md">
                        Join Program
                      </button>
                    </div>
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
    </div>
  )
}
