import React, { useEffect, useState } from 'react'

// Simple tricolor bubble generator (saffron/white/green) with Ashoka Chakra accent
export default function FlagBubbles({ count = 12 }) {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const colors = [
      'radial-gradient(circle, rgba(255,153,51,0.7), rgba(255,153,51,0.25))', // saffron
      'radial-gradient(circle, rgba(255,255,255,0.7), rgba(255,255,255,0.2))', // white
      'radial-gradient(circle, rgba(19,136,8,0.7), rgba(19,136,8,0.25))',       // green
      'radial-gradient(circle, rgba(0,51,160,0.65), rgba(0,51,160,0.25))'       // chakra blue accent
    ]
    const next = []
    for (let i = 0; i < count; i++) {
      next.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 40 + 25,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 6,
        drift: (Math.random() - 0.5) * 120,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    setBubbles(next)
  }, [count])

  return (
    <div className="bubble-container" style={{ zIndex: 1 }}>
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            background: b.color,
            boxShadow: '0 0 12px rgba(0,0,0,0.08)',
            '--drift': `${b.drift}px`
          }}
        />
      ))}
    </div>
  )
}
