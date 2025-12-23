import { useState } from 'react'

export default function CEOMessage({ onClose }) {
  const [showFullMessage, setShowFullMessage] = useState(false)

  const christmasMessages = [
    "🎄 Dear CEO Brian C. Alston,",
    "",
    "As we celebrate this beautiful Christmas season, I want to express my deepest gratitude for your visionary leadership and unwavering commitment to Global South Incubator.",
    "",
    "Your guidance has been the cornerstone of our success throughout 2025. Your passion for innovation, your dedication to our mission, and your belief in our team have inspired each and every one of us to reach greater heights.",
    "",
    "This platform is a small token of appreciation for everything you've done. You've created not just a company, but a family - a place where dreams are nurtured and aspirations become reality.",
    "",
    "May this Christmas bring you peace, joy, and well-deserved rest. You've worked tirelessly to make Global South Incubator a beacon of hope and opportunity.",
    "",
    "With deepest respect and warmest wishes,",
    "Joash",
    "🎄✨"
  ]

  const newYearMessages = [
    "🌟 Happy New Year, CEO Brian C. Alston! 🌟",
    "",
    "As we step into 2026, I am filled with excitement and optimism about what lies ahead for Global South Incubator under your exceptional leadership.",
    "",
    "Your vision for our future inspires confidence. The foundation you've built in 2025 sets us on a path to even greater achievements. Your strategic thinking, innovative approach, and genuine care for our team create an environment where excellence thrives.",
    "",
    "I look forward to continuing this incredible journey with you, learning from your wisdom, and contributing to the growth and success of our company.",
    "",
    "May 2026 bring you continued success, fulfillment, and the realization of all your professional aspirations. The best is yet to come!",
    "",
    "With great anticipation and respect,",
    "Joash",
    "🌟🎉"
  ]

  if (!showFullMessage) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-3 sm:p-5">
        <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-2xl w-full shadow-2xl border-2 sm:border-4 border-green-600">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">👑</div>
            <h2 className="font-dancing text-3xl sm:text-5xl text-green-700 mb-2">A Special Message</h2>
            <h3 className="font-poppins text-xl sm:text-3xl text-red-600 font-bold">For Our CEO</h3>
            <p className="font-poppins text-lg sm:text-2xl text-gray-700 mt-3 sm:mt-4">Brian C. Alston</p>
          </div>
          
          <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
            <p className="font-poppins text-sm sm:text-lg text-gray-700 text-center leading-relaxed">
              This Christmas celebration platform is a gift from Joash to express gratitude for your exceptional leadership throughout 2025.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => setShowFullMessage(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Read Full Messages
            </button>
            <button
              onClick={onClose}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-300 text-gray-800 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-4xl w-full shadow-2xl border-2 sm:border-4 border-green-600 my-4 sm:my-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-5 right-3 sm:right-5 bg-red-500/90 hover:bg-red-600 border-none text-2xl sm:text-3xl text-white cursor-pointer p-2 sm:p-2.5 rounded-full transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:scale-110 shadow-lg z-10"
          title="Close"
        >
          ×
        </button>
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">👑</div>
          <h2 className="font-dancing text-3xl sm:text-5xl text-green-700 mb-2">Messages from Joash</h2>
          <h3 className="font-poppins text-xl sm:text-3xl text-red-600 font-bold">To CEO Brian C. Alston</h3>
        </div>

        {/* Christmas Message */}
        <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6 border-l-4 border-green-600">
          <h4 className="font-dancing text-2xl sm:text-3xl text-green-700 mb-3 sm:mb-4 text-center">🎄 Christmas Message 🎄</h4>
          <div className="space-y-2 font-poppins text-sm sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {christmasMessages.map((line, index) => (
              <p key={index} className={line.startsWith("🎄") || line.includes("Joash") ? "font-bold text-center" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* New Year Message */}
        <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6 border-l-4 border-red-600">
          <h4 className="font-dancing text-2xl sm:text-3xl text-red-600 mb-3 sm:mb-4 text-center">🌟 New Year Message 🌟</h4>
          <div className="space-y-2 font-poppins text-sm sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {newYearMessages.map((line, index) => (
              <p key={index} className={line.startsWith("🌟") || line.includes("Joash") ? "font-bold text-center" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Response Option */}
        <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          <h4 className="font-dancing text-xl sm:text-2xl text-green-700 mb-3 sm:mb-4 text-center">
            💌 Would you like to respond?
          </h4>
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault()
                const subject = encodeURIComponent(`Response to Joash's Christmas/New Year Message`)
                const body = encodeURIComponent(`Dear Joash,\n\nThank you for your thoughtful messages! I wanted to respond...\n\nBest regards,\nBrian C. Alston`)
                const emailLink = `mailto:jmonda2020@gmail.com?subject=${subject}&body=${body}`
                
                // Create a temporary anchor element for better compatibility
                const link = document.createElement('a')
                link.href = emailLink
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <span>📧</span>
              <span>Email Joash</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">
            Joash's Email: jmonda2020@gmail.com
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

