import { useState } from 'react'
import { createSparkleBurst, createConfettiExplosion } from '../utils/effects'

export default function GiftBox({ onOpen }) {
  const [isOpened, setIsOpened] = useState(false)

  const handleClick = () => {
    if (isOpened) return
    
    setIsOpened(true)
    createSparkleBurst()
    createConfettiExplosion()
    
    setTimeout(() => {
      onOpen()
    }, 1000)
  }

  return (
    <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out] px-4">
      <div
        onClick={handleClick}
        className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8 cursor-pointer transition-all duration-300 hover:scale-105"
      >
        {/* Gift Body - Red */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-red-600 to-red-700 rounded-lg relative mx-auto shadow-xl" />
        
        {/* Gift Lid - Green (Christmas colors) */}
        <div
          className={`w-32 h-8 sm:w-36 sm:h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-t-lg absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-10 transition-all duration-[800ms] origin-bottom ${isOpened ? '[transform:rotateX(-90deg)]' : ''}`}
        />
        
        {/* Gift Bow - Gold */}
        <div className="absolute top-[-16px] sm:top-[-20px] left-1/2 -translate-x-1/2 w-8 h-4 sm:w-10 sm:h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" />
        
        {/* Gift Ribbon - Gold */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 sm:h-36 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded" />
        
        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out]" />
          <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-500" />
          <div className="absolute bottom-[30%] left-[20%] w-1.5 h-1.5 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-1000" />
          <div className="absolute bottom-[20%] right-[20%] w-1.5 h-1.5 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-1500" />
        </div>
      </div>
      <div className="text-white text-base sm:text-xl text-shadow-lg animate-pulse px-4">
        🎁 Click on the gift box to reveal your celebration! 🎄
      </div>
    </div>
  )
}

