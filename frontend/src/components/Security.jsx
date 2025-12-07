import React from 'react'

export default function Security(){
  const items = [
    {title: 'SAP ERP Lite - Core Modules', desc: 'Finance, HR, Inventory & basic Supply Chain.'},
    {title: 'SAP ERP Lite - Implementation', desc: 'Quick deployment for SMEs and startups.'},
    {title: 'SAP ERP Lite - Support', desc: 'Training, customization, and ongoing support.'}
  ]
  return (
    <section id="sap-erp-lite" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">SAP ERP Lite Solutions</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
