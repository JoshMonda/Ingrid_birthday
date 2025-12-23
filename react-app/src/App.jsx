import { useState, useEffect } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import ConversationInterface from './components/ConversationInterface'
import GiftBox from './components/GiftBox'
import CelebrationCard from './components/CelebrationCard'
import PhotoGallery from './components/PhotoGallery'
import WishMaker from './components/WishMaker'
import ChristmasCake from './components/ChristmasCake'
import VoiceRecorder from './components/VoiceRecorder'
import AudioControls from './components/AudioControls'
import CursorTrail from './components/CursorTrail'
import CountdownTimer from './components/CountdownTimer'
import CEOMessage from './components/CEOMessage'
import TeamMembers from './components/TeamMembers'

function App() {
  const [currentView, setCurrentView] = useState('conversation') // conversation, gift, card
  const [userName, setUserName] = useState('')
  const [showGallery, setShowGallery] = useState(false)
  const [showWish, setShowWish] = useState(false)
  const [showCake, setShowCake] = useState(false)
  const [showVoice, setShowVoice] = useState(false)
  const [showCEOMessage, setShowCEOMessage] = useState(false)
  const [showTeamMembers, setShowTeamMembers] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)

  // Calculate target dates for countdowns
  const now = new Date()
  const currentYear = now.getFullYear()
  const thisYearChristmas = new Date(currentYear, 11, 25) // December 25
  
  // Christmas countdown - if past Dec 25 this year, use next year
  const christmasTarget = now > thisYearChristmas
    ? new Date(currentYear + 1, 11, 25).toISOString()
    : thisYearChristmas.toISOString()
  
  // New Year is always January 1 of next year
  const newYearTarget = new Date(currentYear + 1, 0, 1).toISOString()

  const handleConversationComplete = (name) => {
    setUserName(name)
    setCurrentView('gift')
  }

  const handleGiftOpened = () => {
    setCurrentView('card')
    // Show special features after card is revealed - with longer delays to avoid overlap
    setTimeout(() => setShowWish(true), 3000)
    setTimeout(() => setShowCake(true), 5000)
    setTimeout(() => setShowVoice(true), 7000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-red-600 overflow-x-hidden overflow-y-auto relative flex items-center justify-center p-3 sm:p-5 py-5 sm:py-8">
      <BackgroundEffects />
      <CursorTrail />
      <AudioControls isEnabled={isAudioEnabled} onToggle={setIsAudioEnabled} />
      
      {currentView === 'conversation' && (
        <ConversationInterface onComplete={handleConversationComplete} />
      )}
      
      {currentView === 'gift' && (
        <GiftBox onOpen={handleGiftOpened} />
      )}
      
      {currentView === 'card' && (
        <div className="w-full max-w-7xl mx-auto pb-24 sm:pb-8">
          {/* Countdown Timers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8 px-3 sm:px-4 mt-2 sm:mt-0">
            <CountdownTimer 
              targetDate={christmasTarget}
              label="Countdown to Christmas"
              emoji="🎄"
            />
            <CountdownTimer 
              targetDate={newYearTarget}
              label="Countdown to New Year"
              emoji="🎉"
            />
          </div>

          {/* CEO Message Button */}
          <div className="text-center mb-4 sm:mb-6 px-3 sm:px-4">
            <button
              onClick={() => setShowCEOMessage(true)}
              className="px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 animate-pulse w-full sm:w-auto mb-3 sm:mb-0"
            >
              👑 Special Message for CEO Brian C. Alston 👑
            </button>
          </div>

          {/* Team Members Button */}
          <div className="text-center mb-4 sm:mb-8 px-3 sm:px-4">
            <button
              onClick={() => setShowTeamMembers(true)}
              className="px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              👥 Team Member Messages from Joash 👥
            </button>
          </div>

          <CelebrationCard 
            userName={userName}
            onDownload={() => {}}
            onShowGallery={() => setShowGallery(true)}
          />

          {/* Credits */}
          <div className="text-center mt-4 sm:mt-6 text-white/80 text-xs sm:text-sm px-4 pb-4">
            <p>✨ This celebration platform is a gift from Joash ✨</p>
            <p className="mt-1">Created with love for Global South Incubator Team</p>
          </div>
        </div>
      )}
      
      {showGallery && (
        <PhotoGallery onClose={() => setShowGallery(false)} />
      )}
      
      {showWish && (
        <WishMaker onClose={() => setShowWish(false)} />
      )}
      
      {showCake && (
        <ChristmasCake onClose={() => setShowCake(false)} />
      )}
      
      {showVoice && (
        <VoiceRecorder userName={userName} onClose={() => setShowVoice(false)} />
      )}
      
      {showCEOMessage && (
        <CEOMessage onClose={() => setShowCEOMessage(false)} />
      )}
      
      {showTeamMembers && (
        <TeamMembers onClose={() => setShowTeamMembers(false)} />
      )}
    </div>
  )
}

export default App

