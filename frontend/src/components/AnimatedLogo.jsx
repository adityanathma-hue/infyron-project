import React from 'react'

export default function AnimatedLogo({ className = 'h-14 w-14' }) {
  return (
    <div className={`animated-logo-wrap ${className}`} aria-label="Infyron Technologies" role="img">
      <img src="/assets/logo.svg" alt="Infyron Technologies" className="animated-logo-img" />
      <div className="animated-logo-shine" aria-hidden="true" />
    </div>
  )
}
