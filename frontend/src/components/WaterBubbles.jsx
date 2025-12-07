import React, { useEffect, useState } from 'react'

export default function WaterBubbles() {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    // Generate random bubbles
    const generateBubbles = () => {
      const newBubbles = []
      const bubbleCount = 20 // Number of bubbles

      for (let i = 0; i < bubbleCount; i++) {
        newBubbles.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position (%)
          size: Math.random() * 40 + 20, // Random size between 20-60px
          duration: Math.random() * 10 + 8, // Random duration 8-18s
          delay: Math.random() * 5, // Random delay 0-5s
          drift: (Math.random() - 0.5) * 100 // Random drift -50 to +50px
        })
      }

      setBubbles(newBubbles)
    }

    generateBubbles()
  }, [])

  return (
    <div className="bubble-container" style={{ zIndex: 0 }}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            '--drift': `${bubble.drift}px`
          }}
        />
      ))}
    </div>
  )
}
