import { useState } from 'react'

export default function WishMaker({ onClose }) {
  const [wish, setWish] = useState('')

  const handleSendWish = () => {
    if (!wish.trim()) return
    
    // Create flying wish animation
    const wishElement = document.createElement('div')
    wishElement.textContent = wish
    wishElement.className = 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 text-2xl font-bold z-[10000] pointer-events-none drop-shadow-lg'
    document.body.appendChild(wishElement)
    
    wishElement.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: 'translate(-50%, -150vh) scale(0.5)', opacity: 0 }
    ], {
      duration: 3000,
      easing: 'ease-out'
    }).onfinish = () => {
      wishElement.remove()
    }
    
    setTimeout(() => {
      setWish('')
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-auto z-[999] animate-[fadeInUp_1s_ease-out] max-w-xs sm:max-w-xs mx-auto sm:mx-0">
      <div className="bg-white/95 rounded-[15px] sm:rounded-[20px] p-3 sm:p-5 text-center shadow-2xl backdrop-blur-md border-2 border-white/30 w-full max-h-[70vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-2 sm:mb-4 gap-2">
          <h3 className="font-dancing text-base sm:text-3xl text-green-700 m-0 pr-2 leading-tight">✨ Make a Christmas Wish ✨</h3>
          <button
            onClick={onClose}
            className="bg-black/10 border-none text-2xl sm:text-3xl text-gray-400 cursor-pointer p-1.5 sm:p-2 rounded-full transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/20 hover:text-gray-800 hover:scale-110 flex-shrink-0"
          >
            ×
          </button>
        </div>
        <div className="mb-3 sm:mb-5">
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Write your Christmas wish or message for the team here..."
            className="w-full h-16 sm:h-20 p-2 sm:p-2.5 border-2 border-gray-200 rounded-[12px] sm:rounded-[15px] text-xs sm:text-sm font-poppins resize-y outline-none transition-colors duration-300 mb-2 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
          />
          <button
            onClick={handleSendWish}
            className="bg-gradient-to-r from-green-600 to-red-600 text-white border-none py-2 sm:py-4 px-3 sm:px-8 rounded-[15px] sm:rounded-[25px] text-xs sm:text-lg font-medium cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 w-full"
          >
            🎄 Send Your Christmas Wish 🎄
          </button>
        </div>
        <div className="text-green-700 italic text-[10px] sm:text-base leading-tight">
          Your wish will fly to the stars and come true! 🌟 May 2026 bring you joy and success!
        </div>
      </div>
    </div>
  )
}

