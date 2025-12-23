import { useEffect, useState } from 'react'
import { downloadCelebrationCard } from '../utils/cardUtils'

export default function CelebrationCard({ userName, onDownload, onShowGallery }) {
  const [showNameOverlay, setShowNameOverlay] = useState(true)

  useEffect(() => {
    if (userName) {
      const timer = setTimeout(() => setShowNameOverlay(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [userName])

  const handleDownload = () => {
    downloadCelebrationCard(userName || 'Team Member')
    onDownload()
  }

  return (
    <div className="relative z-10 animate-[fadeInUp_1s_ease-out] w-full px-4 sm:px-0">
      <div className="relative w-full max-w-[700px] h-[600px] sm:h-[800px] mx-auto perspective-1000">
        <div className="relative w-full h-full rounded-[15px] sm:rounded-[20px] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-br from-green-50 to-red-50 flex items-center justify-center">
          <div className="text-center p-6 sm:p-12">
            <h1 className="font-dancing text-4xl sm:text-6xl text-green-700 mb-2 sm:mb-4">🎄</h1>
            <h2 className="font-dancing text-3xl sm:text-5xl text-green-700 mb-3 sm:mb-6">Merry Christmas 2025</h2>
            <h3 className="font-poppins text-xl sm:text-3xl text-red-600 mb-4 sm:mb-8">Global South Incubator</h3>
            <p className="font-poppins text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">A gift from Joash</p>
            <p className="font-poppins text-base sm:text-xl text-gray-700 mb-3 sm:mb-4">Celebrating an amazing year together!</p>
            <p className="font-poppins text-sm sm:text-lg text-gray-600">Thank you for being part of our team</p>
          </div>
          
          {/* Name Overlay */}
          {showNameOverlay && userName && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
              <div className="bg-white/90 px-6 sm:px-10 py-4 sm:py-5 rounded-[15px] sm:rounded-[20px] shadow-xl backdrop-blur-md border-2 border-green-500/30 animate-[nameSlideIn_1s_ease-out] max-w-[90%]">
                <h2 className="font-dancing text-3xl sm:text-5xl text-green-700 m-0 font-semibold drop-shadow-md">
                  {userName}
                </h2>
                <p className="font-poppins text-sm sm:text-lg text-gray-600 mt-2">Team Member</p>
              </div>
            </div>
          )}
          
          {/* Card Overlay Sparkles */}
          <div className="absolute inset-0 pointer-events-none z-1">
            <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-red-500 rounded-full animate-[sparkle_2s_infinite_ease-in-out] shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <div className="absolute top-[25%] right-[15%] w-2 h-2 bg-green-500 rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-yellow-400 rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-1000 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
            <div className="absolute bottom-[30%] right-[10%] w-2 h-2 bg-red-500 rounded-full animate-[sparkle_2s_infinite_ease-in-out] delay-1500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </div>
        </div>
      </div>
      
      {/* Card Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mt-6 sm:mt-8 px-4">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-red-600 text-white border-none rounded-[20px] sm:rounded-[25px] text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0 w-full sm:w-auto"
        >
          <span className="text-lg sm:text-xl">📥</span>
          Download Card
        </button>
        <button
          onClick={onShowGallery}
          className="flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-red-600 text-white border-none rounded-[20px] sm:rounded-[25px] text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0 w-full sm:w-auto"
        >
          <span className="text-lg sm:text-xl">📸</span>
          Team Memories
        </button>
      </div>
    </div>
  )
}

