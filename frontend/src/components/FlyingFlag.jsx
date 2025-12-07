import React from 'react'

export default function FlyingFlag() {
  return (
    <div className="relative flex items-center gap-3">
      {/* Flying Flag */}
      <div className="animate-flag-wave text-4xl">
        🇮🇳
      </div>
      {/* Spacer for alignment */}
      <div className="w-1" />
    </div>
  )
}
