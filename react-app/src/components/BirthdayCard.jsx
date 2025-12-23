import { useEffect, useState } from 'react'
import { downloadCard } from '../utils/cardUtils'

export default function BirthdayCard({ userName, onDownload, onShowGallery }) {
  const [showNameOverlay, setShowNameOverlay] = useState(true)

  useEffect(() => {
    if (userName) {
      const timer = setTimeout(() => setShowNameOverlay(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [userName])

  const handleDownload = () => {
    downloadCard(userName || 'Ingrid')
    onDownload()
  }

  return (
    <div className="relative z-10 animate-[fadeInUp_1s_ease-out]">
      <div className="relative w-[700px] max-w-full h-[800px] mx-auto perspective-1000">
        <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
          <iframe
            src="https://www.canva.com/design/DAGyx8nxbEc/GGFJqmK9RUIeV-zlr2KuYA/view?embed"
            allowFullScreen
            allow="fullscreen"
            className="w-full h-full border-none rounded-[20px] bg-white"
          />
          
          {/* Name Overlay */}
          {showNameOverlay && userName && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-white/90 px-10 py-5 rounded-[20px] shadow-xl backdrop-blur-md border-2 border-white/30 animate-[nameSlideIn_1s_ease-out]">
                <h2 className="font-dancing text-5xl text-[#d2691e] m-0 font-semibold drop-shadow-md">
                  {userName}
                </h2>
              </div>
            </div>
          )}
          
          {/* Card Overlay Sparkles */}
          <div className="absolute inset-0 pointer-events-none z-1">
            <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out] shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <div className="absolute top-[25%] right-[15%] w-2 h-2 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-500 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-1000 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <div className="absolute bottom-[30%] right-[10%] w-2 h-2 bg-white rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-1500 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
      </div>
      
      {/* Card Actions */}
      <div className="flex gap-5 justify-center mt-8">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-[25px] text-base font-medium cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
        >
          <span className="text-xl">📥</span>
          Download Card
        </button>
        <button
          onClick={onShowGallery}
          className="flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-[25px] text-base font-medium cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
        >
          <span className="text-xl">📸</span>
          Photo Gallery
        </button>
      </div>
    </div>
  )
}

