import React from 'react'

export default function AnimatedSlogan() {
  const slogans = [
    'Join Infyron',
    'Be an Infyron',
    'Join Our Team',
    'Be a Part of Infyron',
    'Join Infyron Family'
  ]

  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slogans.length)
    }, 4000) // Change every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-w-max">
      {slogans.map((slogan, idx) => (
        <div
          key={idx}
          className={`transition-all duration-500 ease-in-out ${
            idx === currentIndex
              ? 'opacity-100 visible'
              : 'opacity-0 hidden'
          }`}
        >
          <span className="text-sm md:text-base font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent whitespace-nowrap">
            {slogan}
          </span>
        </div>
      ))}
    </div>
  )
}
