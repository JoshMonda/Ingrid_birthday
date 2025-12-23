import { useState } from 'react'

const teamMembers = [
  {
    name: 'Amb Dennis',
    email: 'jmonda2020@gmail.com',
    whatsapp: '+254707191544',
    christmasMessage: [
      "🎄 Dear Amb Dennis,",
      "",
      "As we celebrate this wonderful Christmas season, I want to take a moment to recognize your incredible contributions to Global South Incubator. Your dedication, expertise, and commitment to excellence have been truly inspiring.",
      "",
      "Your leadership and diplomatic skills have opened doors and created opportunities that have shaped our success in 2025. The way you navigate challenges with grace and wisdom sets an example for all of us.",
      "",
      "This Christmas, I hope you find time to rest, rejuvenate, and enjoy precious moments with your loved ones. You've given so much to our team, and your efforts have not gone unnoticed.",
      "",
      "May this festive season bring you peace, joy, and the warmth of meaningful connections.",
      "",
      "With warmest regards and deep appreciation,",
      "Joash",
      "🎄✨"
    ],
    newYearMessage: [
      "🌟 Happy New Year, Amb Dennis! 🌟",
      "",
      "As we welcome 2026, I'm filled with gratitude for having you as part of our team. Your vision, strategic thinking, and unwavering commitment to our shared goals continue to drive us forward.",
      "",
      "The coming year holds immense promise, and with your guidance, I'm confident we'll achieve even greater heights. Your ability to see the bigger picture while managing the details is a gift to our entire organization.",
      "",
      "I look forward to another year of collaboration, growth, and success alongside you. May 2026 bring you continued achievements, fulfillment, and all the recognition you deserve.",
      "",
      "Here's to a year of new possibilities and continued excellence!",
      "",
      "With great respect and anticipation,",
      "Joash",
      "🌟🎉"
    ]
  },
  {
    name: 'Polyne Nafula',
    email: 'jmonda2020@gmail.com',
    whatsapp: '+254707191544',
    christmasMessage: [
      "🎄 Dear Polyne Nafula,",
      "",
      "This Christmas, I want to express my heartfelt appreciation for your outstanding work and positive energy at Global South Incubator. Your passion, creativity, and attention to detail make a significant difference every single day.",
      "",
      "Your contributions have been instrumental in our achievements this year. The dedication you bring to your work, combined with your warm personality, creates an environment where everyone feels valued and motivated.",
      "",
      "As we celebrate this special season, I hope you're surrounded by love, laughter, and the joy that you so generously share with others. Take time to recharge and enjoy the magic of Christmas.",
      "",
      "Thank you for being such an integral part of our success story.",
      "",
      "Wishing you a Christmas filled with happiness and cherished memories,",
      "Joash",
      "🎄✨"
    ],
    newYearMessage: [
      "🌟 Happy New Year, Polyne! 🌟",
      "",
      "As we step into 2026, I'm excited about the possibilities that lie ahead, especially knowing that you're part of our team. Your innovative spirit and unwavering commitment to excellence inspire everyone around you.",
      "",
      "The new year presents fresh opportunities for growth, learning, and achievement. With your talents and dedication, I know you'll continue to shine and contribute meaningfully to our collective success.",
      "",
      "I'm grateful for your hard work and the positive impact you have on our team. May 2026 bring you new challenges to conquer, goals to achieve, and moments of great satisfaction.",
      "",
      "Here's to a year filled with success, happiness, and continued growth!",
      "",
      "With appreciation and best wishes,",
      "Joash",
      "🌟🎉"
    ]
  },
  {
    name: 'Jenkins',
    email: 'jmonda2020@gmail.com',
    whatsapp: '+254707191544',
    christmasMessage: [
      "🎄 Dear Jenkins,",
      "",
      "This Christmas season, I want to acknowledge your exceptional contributions to Global South Incubator. Your technical expertise, problem-solving skills, and collaborative approach have been invaluable to our success.",
      "",
      "Your dedication to excellence and your ability to tackle complex challenges with calm and precision make you an essential part of our team. The quality of your work consistently exceeds expectations.",
      "",
      "As we celebrate this festive time, I hope you find moments of peace and joy with those you hold dear. You've worked tirelessly throughout the year, and you deserve this time to relax and recharge.",
      "",
      "Thank you for being such a reliable and talented team member.",
      "",
      "Wishing you a wonderful Christmas and a well-deserved break,",
      "Joash",
      "🎄✨"
    ],
    newYearMessage: [
      "🌟 Happy New Year, Jenkins! 🌟",
      "",
      "As we begin 2026, I'm grateful for your continued commitment to excellence. Your technical skills, attention to detail, and innovative thinking position us well for another successful year.",
      "",
      "The new year brings fresh challenges and opportunities, and I'm confident that with your expertise and dedication, we'll navigate them successfully. Your contributions continue to drive our progress forward.",
      "",
      "I look forward to another year of working together and witnessing the amazing solutions you'll create. May 2026 bring you continued professional growth and personal fulfillment.",
      "",
      "Here's to new achievements and continued excellence!",
      "",
      "With respect and best wishes,",
      "Joash",
      "🌟🎉"
    ]
  },
  {
    name: 'Pastor Chizoba',
    email: 'jmonda2020@gmail.com',
    whatsapp: '+254707191544',
    christmasMessage: [
      "🎄 Dear Pastor Chizoba,",
      "",
      "This Christmas, I want to express my deep gratitude for your spiritual leadership and wisdom at Global South Incubator. Your guidance, compassion, and faith-based perspective bring a unique and valuable dimension to our team.",
      "",
      "Your ability to inspire, counsel, and lead with grace has touched many lives, including mine. The values you embody and the principles you share create a positive foundation for all we do together.",
      "",
      "As we celebrate the birth of Christ, I'm reminded of the hope, love, and peace that you bring to our workplace every day. Your presence is a blessing to our entire organization.",
      "",
      "May this Christmas be a time of spiritual renewal, joy, and reflection on the true meaning of the season.",
      "",
      "With deep respect and warmest Christmas blessings,",
      "Joash",
      "🎄✨"
    ],
    newYearMessage: [
      "🌟 Happy New Year, Pastor Chizoba! 🌟",
      "",
      "As we enter 2026, I'm grateful for your continued spiritual leadership and guidance. Your wisdom, compassion, and unwavering faith inspire us all to reach higher and be better.",
      "",
      "The new year offers fresh opportunities to grow, serve, and make a positive impact. With your leadership, I know we'll continue to build something meaningful and transformative.",
      "",
      "Your commitment to our mission and your ability to unite people through shared values are gifts to our entire team. I look forward to another year of learning from your example.",
      "",
      "May 2026 be a year of continued spiritual growth, fulfillment, and divine blessings in all your endeavors.",
      "",
      "With great respect and prayers for a blessed year,",
      "Joash",
      "🌟🎉"
    ]
  },
  {
    name: 'Gayflor Korboi',
    email: 'jmonda2020@gmail.com',
    whatsapp: '+254707191544',
    christmasMessage: [
      "🎄 Dear Gayflor Korboi,",
      "",
      "This Christmas, I want to celebrate your incredible contributions to Global South Incubator. Your hard work, dedication, and positive attitude have made a significant impact on our team's success.",
      "",
      "Your commitment to excellence and your willingness to go above and beyond have not gone unnoticed. You bring energy and enthusiasm to everything you do, and it's truly appreciated.",
      "",
      "As we gather with loved ones this holiday season, I hope you find time to rest, celebrate your achievements, and enjoy the company of those who matter most. You've earned this time of joy and relaxation.",
      "",
      "Thank you for being such a valuable and reliable team member.",
      "",
      "Wishing you a Christmas filled with happiness, peace, and wonderful memories,",
      "Joash",
      "🎄✨"
    ],
    newYearMessage: [
      "🌟 Happy New Year, Gayflor! 🌟",
      "",
      "As we welcome 2026, I'm excited about the opportunities ahead, especially with dedicated team members like you. Your work ethic, positive spirit, and commitment to our goals are exactly what we need for continued success.",
      "",
      "The new year is a canvas of possibilities, and I'm confident you'll paint it with achievements and growth. Your dedication to excellence and your collaborative approach make you an asset to our team.",
      "",
      "I'm grateful for your contributions and look forward to another year of working together. May 2026 bring you new opportunities, continued success, and personal fulfillment.",
      "",
      "Here's to a year of new beginnings and great achievements!",
      "",
      "With appreciation and best wishes,",
      "Joash",
      "🌟🎉"
    ]
  },
  {
    name: 'Frederick',
    email: 'jmonda2020@gmail.com',
    whatsapp: '+254707191544',
    christmasMessage: [
      "🎄 Dear Frederick,",
      "",
      "This Christmas season, I want to express my sincere appreciation for your outstanding work at Global South Incubator. Your dedication, skills, and collaborative spirit have been instrumental in our achievements this year.",
      "",
      "Your ability to approach challenges with creativity and determination inspires everyone around you. The quality of your contributions and your commitment to our shared vision make a real difference.",
      "",
      "As we celebrate this special time of year, I hope you're able to step away from work and enjoy moments of peace, joy, and connection with family and friends. You deserve this time to recharge.",
      "",
      "Thank you for being such an essential part of our success.",
      "",
      "Wishing you a wonderful Christmas filled with love and laughter,",
      "Joash",
      "🎄✨"
    ],
    newYearMessage: [
      "🌟 Happy New Year, Frederick! 🌟",
      "",
      "As we step into 2026, I'm grateful for your continued partnership and dedication. Your innovative thinking, strong work ethic, and team-oriented approach position us well for another successful year.",
      "",
      "The new year brings fresh challenges and exciting opportunities. With your talents and commitment, I'm confident we'll continue to grow, innovate, and achieve great things together.",
      "",
      "Your contributions have been invaluable, and I look forward to seeing what we'll accomplish in the year ahead. May 2026 bring you continued professional success and personal happiness.",
      "",
      "Here's to new horizons and continued excellence!",
      "",
      "With respect and best wishes,",
      "Joash",
      "🌟🎉"
    ]
  }
]

export default function TeamMembers({ onClose }) {
  const [selectedMember, setSelectedMember] = useState(null)
  const [showNewYear, setShowNewYear] = useState(false)

  const handleMemberClick = (member) => {
    setSelectedMember(member)
    setShowNewYear(false)
  }

  const handleEmailResponse = (member) => {
    const subject = encodeURIComponent(`Response to Joash's Christmas/New Year Message`)
    const body = encodeURIComponent(`Dear Joash,\n\nThank you for your thoughtful message! I wanted to respond...\n\nBest regards,\n${member.name}`)
    const emailLink = `mailto:${member.email}?subject=${subject}&body=${body}`
    window.location.href = emailLink
  }

  const handleWhatsAppResponse = (member) => {
    const message = encodeURIComponent(`Hi Joash, thank you for your Christmas/New Year message! I wanted to respond...`)
    const whatsappLink = `https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`
    window.open(whatsappLink, '_blank')
  }

  if (selectedMember) {
    const message = showNewYear ? selectedMember.newYearMessage : selectedMember.christmasMessage

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-2xl w-full shadow-2xl border-2 sm:border-4 border-green-600 my-4 sm:my-8 relative">
          {/* Close button */}
          <button
            onClick={() => {
              setSelectedMember(null)
              setShowNewYear(false)
            }}
            className="absolute top-3 sm:top-5 right-3 sm:right-5 bg-black/10 border-none text-2xl sm:text-3xl text-gray-600 cursor-pointer p-1.5 sm:p-2 rounded-full transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/20 hover:text-gray-800 hover:scale-110 z-10"
          >
            ×
          </button>

          {/* Back button */}
          <button
            onClick={() => {
              setSelectedMember(null)
              setShowNewYear(false)
            }}
            className="mb-4 text-green-700 hover:text-green-800 font-medium text-sm sm:text-base flex items-center gap-2"
          >
            ← Back to Team Members
          </button>

          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-3xl sm:text-5xl mb-2">{showNewYear ? '🌟' : '🎄'}</div>
            <h2 className="font-dancing text-2xl sm:text-4xl text-green-700 mb-2">
              {showNewYear ? 'Happy New Year Message' : 'Christmas Message'}
            </h2>
            <h3 className="font-poppins text-lg sm:text-2xl text-red-600 font-bold">{selectedMember.name}</h3>
          </div>

          {/* Message */}
          <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 max-h-[50vh] overflow-y-auto">
            <div className="font-poppins text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line">
              {message.map((line, index) => (
                <p key={index} className={line === '' ? 'mb-2' : 'mb-1'}>
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
          </div>

          {/* Toggle between Christmas and New Year */}
          <div className="flex gap-3 mb-4 sm:mb-6 justify-center">
            <button
              onClick={() => setShowNewYear(false)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 ${
                !showNewYear
                  ? 'bg-gradient-to-r from-green-600 to-red-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              🎄 Christmas
            </button>
            <button
              onClick={() => setShowNewYear(true)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 ${
                showNewYear
                  ? 'bg-gradient-to-r from-green-600 to-red-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              🌟 New Year
            </button>
          </div>

          {/* Response Options */}
          <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h4 className="font-dancing text-xl sm:text-2xl text-green-700 mb-3 sm:mb-4 text-center">
              💌 Would you like to respond?
            </h4>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => handleEmailResponse(selectedMember)}
                className="flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span>📧</span>
                <span>Email Joash</span>
              </button>
              <button
                onClick={() => handleWhatsAppResponse(selectedMember)}
                className="flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span>💬</span>
                <span>WhatsApp Joash</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">
              Joash's Email: {selectedMember.email}<br />
              WhatsApp: {selectedMember.whatsapp}
            </p>
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
          className="absolute top-3 sm:top-5 right-3 sm:right-5 bg-black/10 border-none text-2xl sm:text-3xl text-gray-600 cursor-pointer p-1.5 sm:p-2 rounded-full transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/20 hover:text-gray-800 hover:scale-110 z-10"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">👥</div>
          <h2 className="font-dancing text-3xl sm:text-5xl text-green-700 mb-2">
            Our Amazing Team
          </h2>
          <p className="font-poppins text-base sm:text-xl text-gray-700">
            Click on your name to receive your personalized message from Joash
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {teamMembers.map((member, index) => (
            <button
              key={index}
              onClick={() => handleMemberClick(member)}
              className="bg-white/90 hover:bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-green-200 hover:border-green-500 group"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                {index % 6 === 0 ? '🎄' : index % 6 === 1 ? '⭐' : index % 6 === 2 ? '🎁' : index % 6 === 3 ? '🌟' : index % 6 === 4 ? '✨' : '🎉'}
              </div>
              <h3 className="font-poppins text-base sm:text-xl font-bold text-green-700 group-hover:text-green-800 mb-2">
                {member.name}
              </h3>
              <p className="font-poppins text-xs sm:text-sm text-gray-600">
                Click to view message →
              </p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="font-poppins text-xs sm:text-sm text-gray-600">
            A special recognition from Joash to each team member ✨
          </p>
        </div>
      </div>
    </div>
  )
}

