import React, { useState } from 'react'

export default function LeadershipModal({ isOpen, onClose }) {
  const [selectedMember, setSelectedMember] = useState(null)
  
  if (!isOpen) return null

  const teamMembers = [
    {
      id: 1,
      name: 'Mr. Rabindra Nath',
      role: 'Founder & CEO',
      img: '/assets/Gemini_Generated_Image_qovcidqovcidqovc.png',
      details: 'Over 20 years of industry experience in ERP and SAP solutions. Leads Infyron Technology with deep technical knowledge, global expertise, and commitment to excellence. His leadership combines technical mastery with strategic business vision.'
    },
    {
      id: 2,
      name: 'Prakash Kumar Sahoo',
      role: 'Business Unit Head',
      img: '/assets/prakash.jpg',
      details: 'Strategic business leader managing operations, client relationships, and delivery of enterprise solutions. Expertise in ERP implementation and enterprise transformation. Drives business growth and operational excellence.'
    },
    {
      id: 3,
      name: 'Manasipriya Sahoo',
      role: 'HR Manager',
      img: '/assets/manasipriya.jpg',
      details: 'Oversees talent acquisition, employee development, and organizational culture. Ensures team excellence and professional growth across all departments. Creates a positive work environment focused on growth.'
    },
    {
      id: 5,
      name: 'Smrutiranjan Sethi',
      role: 'Java Development Expert',
      img: '/assets/smrutiranjan.jpg',
      details: 'Specialist in enterprise Java development and web technologies. Leads Java-based enterprise software solutions with extensive industry expertise and best practices. Focuses on modern Java frameworks and scalable architectures.'
    },
    {
      id: 6,
      name: 'Pankaj Kumar',
      role: 'Admin Manager',
      img: '/assets/pankaj.jpg',
      details: 'Manages administrative operations, office coordination, and support functions. Ensures smooth day-to-day operations and efficient resource management across the organization. Handles logistics and operational workflows.'
    },
    {
      id: 7,
      name: 'Gouranga Jena',
      role: 'Sales Manager',
      img: '/assets/raju.jpg',
      details: 'Drives sales strategy and client acquisition. Manages customer relationships, business development, and market expansion. Expert in understanding client needs and delivering tailored technology solutions.'
    }
  ]


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-h-screen overflow-y-auto my-4 sm:my-8">
        
        {/* Header */}
        <div className="sticky top-0 bg-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold">Leadership Team</h2>
          <button 
            onClick={onClose}
            className="text-white text-2xl font-bold hover:bg-indigo-700 px-3 py-1 rounded"
          >
            ✕
          </button>
        </div>

        {/* Organization Structure Grid */}
        <div className="p-4 sm:p-6">
          
          {/* If member is selected, show their details */}
          {selectedMember ? (
            <div className="space-y-4 sm:space-y-6">
              <button 
                onClick={() => setSelectedMember(null)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 text-sm sm:text-base"
              >
                ← Back to Team
              </button>
              
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
                <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src={selectedMember.img} 
                    alt={selectedMember.name}
                    className="w-full h-full rounded-lg shadow-xl object-cover"
                    loading="lazy"
                    onError={(e) => { 
                      e.currentTarget.onerror = null
                      e.currentTarget.src = 'https://source.unsplash.com/400x400/?portrait'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedMember.name}</h3>
                  <p className="text-base sm:text-lg text-indigo-600 font-semibold mt-1">{selectedMember.role}</p>
                  <div className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {selectedMember.details}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Photo Grid */
            <div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">Click on any team member to view their details</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                {teamMembers.map((member) => (
                  <div 
                    key={member.id} 
                    onClick={() => setSelectedMember(member)}
                    className="cursor-pointer group"
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-square">
                      <img 
                        src={member.img} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => { 
                          e.currentTarget.onerror = null
                          e.currentTarget.src = 'https://source.unsplash.com/300x300/?portrait'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <p className="text-xs font-semibold">Click to view</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <h5 className="font-semibold text-gray-800 text-xs sm:text-sm break-words">{member.name}</h5>
                      <p className="text-xs text-indigo-600 break-words line-clamp-2">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
