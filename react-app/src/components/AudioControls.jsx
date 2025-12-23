export default function AudioControls({ isEnabled, onToggle }) {
  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[100]">
      <button
        onClick={() => onToggle(!isEnabled)}
        className="bg-white/90 hover:bg-white border-none rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg backdrop-blur-md hover:scale-110"
      >
        <span className="text-xl sm:text-2xl">{isEnabled ? '🔊' : '🔇'}</span>
      </button>
    </div>
  )
}

