import { useState } from 'react'

const galleryItems = [
  {
    id: 'team-moments',
    icon: '📷',
    title: 'Team Moments 2025',
    message: `Dear Team Member,

These photos capture the incredible moments we've shared throughout 2025 at Global South Incubator! Every collaboration, every success, every challenge we overcame together is preserved in these memories.

From project launches to team meetings, from celebrations to brainstorming sessions - these images tell the story of a year filled with dedication, innovation, and teamwork.

Thank you for being an integral part of our journey. Your contributions have made 2025 truly remarkable!

With gratitude and warmest wishes,
Global South Incubator Team 🎄❤️`
  },
  {
    id: 'achievements',
    icon: '🏆',
    title: 'Achievements & Milestones',
    message: `Dear Team Member,

What an incredible year of achievements! Every milestone we reached, every goal we accomplished, every challenge we conquered - it all happened because of our collective effort and dedication.

Your hard work, creativity, and commitment have been the driving force behind our success. Each achievement represents not just our company's growth, but the growth we've experienced together as a team.

Here's to celebrating our wins and looking forward to even greater accomplishments in 2026!

With pride and celebration,
Global South Integra Team 🏆✨`
  },
  {
    id: 'celebration',
    icon: '🎉',
    title: 'Christmas Celebration',
    message: `Dear Team Member,

What a wonderful celebration of our amazing year together! This Christmas, we're not just celebrating the season, but also celebrating the incredible journey we've shared in 2025.

Your laughter, your ideas, your enthusiasm - they all contribute to making Global South Incubator a special place to work. Together, we've created something meaningful.

May this festive season bring you joy, rest, and renewed energy for the year ahead!

Merry Christmas and Happy New Year!
Global South Integra Team 🎉🎄`
  },
  {
    id: 'teamwork',
    icon: '🤝',
    title: 'Teamwork & Collaboration',
    message: `Dear Team Member,

Teamwork makes the dream work! This year, we've witnessed the power of collaboration, where every member's unique skills and perspectives came together to create something extraordinary.

Whether working on challenging projects, supporting each other through busy periods, or celebrating successes together - your spirit of cooperation has been inspiring.

The best teams are built on trust, respect, and shared goals. Thank you for being that kind of teammate.

With appreciation and respect,
Global South Integra Team 🤝❤️`
  },
  {
    id: 'team-spirit',
    icon: '👥',
    title: 'Our Amazing Team',
    message: `Dear Team Member,

Look at this incredible team we've built together! Each person brings something unique to Global South Incubator, and together we form something greater than the sum of our parts.

From our CEO's visionary leadership to every team member's valuable contribution - we are a family. Your presence, your ideas, and your dedication make every day better.

Our team is our greatest asset, and you are an essential part of it. Thank you for being you!

With gratitude and warmth,
Global South Integra Team 👥🎄`
  },
  {
    id: 'future',
    icon: '🌟',
    title: 'Looking Forward to 2026',
    message: `Dear Team Member,

As we celebrate 2025 and look ahead to 2026, we're filled with excitement and optimism! The foundation we've built together this year sets us up for even greater things.

Every challenge we've faced has made us stronger. Every success has taught us something new. And every day working together has shown us what we're capable of achieving.

The future is bright, and it's bright because of people like you who bring passion, dedication, and excellence to everything they do.

Here's to an even more amazing year ahead!

With hope and anticipation,
Global South Integra Team 🌟🎄`
  }
]

export default function PhotoGallery({ onClose }) {
  const [selectedItem, setSelectedItem] = useState(null)

  if (selectedItem) {
    return (
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center"
        onClick={() => setSelectedItem(null)}
      >
      <div 
        className="bg-white rounded-0 p-6 sm:p-[60px] w-full h-screen overflow-y-auto shadow-none flex flex-col justify-center items-center text-center max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 sm:mb-10 pb-3 sm:pb-5 border-b-2 sm:border-b-4 border-gray-100 w-full max-w-3xl px-4">
          <h3 className="font-dancing text-3xl sm:text-6xl text-green-700 m-0 drop-shadow-md">
            {selectedItem.title}
          </h3>
          <button
            onClick={() => setSelectedItem(null)}
            className="bg-black/10 border-none text-3xl sm:text-5xl text-gray-400 cursor-pointer p-2 sm:p-4 rounded-full transition-all duration-300 w-12 h-12 sm:w-15 sm:h-15 flex items-center justify-center hover:bg-black/20 hover:text-gray-800 hover:scale-110 flex-shrink-0"
          >
            ×
          </button>
        </div>
        <div className="w-full max-w-3xl px-4">
          <p className="text-base sm:text-2xl leading-relaxed text-gray-700 m-0 whitespace-pre-line text-center font-normal">
            {selectedItem.message}
          </p>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[15px] sm:rounded-[20px] p-4 sm:p-8 max-w-4xl w-[95%] sm:w-[90%] max-h-[85vh] sm:max-h-[80vh] overflow-y-auto shadow-2xl animate-[modalSlideIn_0.5s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-8 pb-3 sm:pb-5 border-b-2 border-gray-100">
          <h2 className="font-dancing text-2xl sm:text-4xl text-green-700 m-0 pr-2">Team Memories 2025</h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-2xl sm:text-3xl text-gray-400 cursor-pointer p-1.5 sm:p-2.5 rounded-full transition-all duration-300 hover:bg-gray-100 hover:text-gray-800 flex-shrink-0"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 auto-fit">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="aspect-square rounded-[12px] sm:rounded-[15px] overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-pink-100 flex flex-col items-center justify-center text-[#8b4513] text-center p-3 sm:p-4 transition-all duration-300 hover:from-orange-200 hover:to-blue-900 hover:text-white hover:-translate-y-1">
                <span className="text-3xl sm:text-4xl mb-2">{item.icon}</span>
                <h4 className="text-base sm:text-lg font-semibold m-0 mb-2 font-dancing">{item.title}</h4>
                <p className="text-xs sm:text-sm font-normal m-0 leading-snug opacity-90">{item.message.split('\n\n')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

