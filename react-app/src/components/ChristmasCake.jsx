import { useState } from 'react'

export default function ChristmasCake({ onClose }) {
  const [litCandles, setLitCandles] = useState(new Set())

  const handleCandleClick = (index) => {
    setLitCandles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="fixed bottom-3 right-3 left-3 sm:bottom-5 sm:right-5 sm:left-auto z-[1000] animate-[fadeInUp_1s_ease-out] max-w-xs min-w-[200px] sm:min-w-[250px] mx-auto sm:mx-0">
      <div className="bg-white/95 rounded-[15px] sm:rounded-[20px] p-4 sm:p-5 text-center shadow-2xl backdrop-blur-md border-2 border-white/30 w-full">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="font-dancing text-lg sm:text-2xl text-green-700 m-0 pr-2">🎂 Your Celebration Cake</h3>
          <button
            onClick={onClose}
            className="bg-black/10 border-none text-2xl sm:text-3xl text-gray-400 cursor-pointer p-1.5 sm:p-2 rounded-full transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/20 hover:text-gray-800 hover:scale-110 flex-shrink-0"
          >
            ×
          </button>
        </div>
        
        {/* Christmas Cake */}
        <div className="relative w-40 h-28 sm:w-48 sm:h-36 mx-auto mb-3 sm:mb-4">
          {/* Cake Base - Green (Christmas color) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-11 bg-gradient-to-br from-green-600 to-green-700 rounded-b-[65px] shadow-lg" />
          
          {/* Cake Layer - Red */}
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-28 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-b-[55px] shadow-lg" />
          
          {/* Cake Top - White/Ice */}
          <div className="absolute bottom-[65px] left-1/2 -translate-x-1/2 w-22 h-7 bg-gradient-to-br from-white to-gray-100 rounded-b-[45px] shadow-lg border-2 border-green-200" />
          
          {/* Candles - representing months or achievements */}
          <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 flex gap-2">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                onClick={() => handleCandleClick(index)}
                className="w-3 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-md cursor-pointer transition-all duration-300 relative shadow-md border-2 border-white/30 hover:scale-110"
                title="Click to light up!"
              >
                {litCandles.has(index) && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-[0_0_15px_#fbbf24,0_0_25px_#f59e0b] animate-[candleFlicker_1s_ease-in-out_infinite_alternate]" />
                )}
              </div>
            ))}
          </div>
          
          {/* Christmas Decorations */}
          <div className="absolute -top-2 left-[20%] text-2xl">🎄</div>
          <div className="absolute -top-2 right-[20%] text-2xl">⭐</div>
          
          {/* Cake Sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 bg-red-500 rounded-full animate-[sparkle_2s_infinite_ease-in-out]" />
            <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 bg-green-500 rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-700" />
            <div className="absolute bottom-[30%] left-[60%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-1400" />
          </div>
        </div>
        
        <div className="text-green-700 text-sm sm:text-base font-medium animate-pulse">
          Click the candles to light them up! 🕯️
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Each candle represents a milestone we achieved together in 2025
        </p>
      </div>
    </div>
  )
}

