import { useState, useRef, useEffect } from 'react'

const conversationFlow = [
  {
    message: "🎄 Welcome to Global South Incubator's Christmas Celebration 2025! 🎄 A special gift from Joash to our amazing team! How are you doing today?",
    placeholder: "Type your response here...",
    processInput: (input) => input.toLowerCase().trim()
  },
  {
    message: "That's wonderful to hear! What's your name? (So we can personalize your celebration cake)",
    placeholder: "My name is...",
    processInput: (input) => {
      const nameMatch = input.match(/(?:my name is|i'm|i am|name is)\s+([a-zA-Z\s]+)/i)
      return nameMatch ? nameMatch[1].trim() : input.trim()
    }
  },
  {
    message: (name) => `Great to have you here, ${name}! 🎉 We're celebrating our amazing year together at Global South Incubator. This platform was created by Joash as a gift to celebrate our team. Would you like to create your Christmas celebration cake?`,
    placeholder: "Yes, let's celebrate!",
    processInput: (input) => {
      const response = input.toLowerCase().trim()
      return response.includes('yes') || response.includes('sure') || response.includes('love') || response.includes('please') || response.includes('celebrate')
    }
  }
]

export default function ConversationInterface({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [message, setMessage] = useState(conversationFlow[0].message)
  const [placeholder, setPlaceholder] = useState(conversationFlow[0].placeholder)
  const [inputValue, setInputValue] = useState('')
  const [tempMessage, setTempMessage] = useState(null)
  const inputRef = useRef(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [currentStep])

  const handleSubmit = () => {
    const input = inputValue.trim()
    if (!input) return

    const step = conversationFlow[currentStep]
    const result = step.processInput(input)

    if (currentStep === 0) {
      // First response - move to next step
      setTimeout(() => {
        setCurrentStep(1)
        setMessage(conversationFlow[1].message)
        setPlaceholder(conversationFlow[1].placeholder)
        setInputValue('')
      }, 1000)
    } else if (currentStep === 1) {
      // Name input
      if (result && result.length > 0) {
        const name = result
        setUserName(name)
        setTimeout(() => {
          const step2 = conversationFlow[2]
          setMessage(typeof step2.message === 'function' ? step2.message(name) : step2.message)
          setPlaceholder(step2.placeholder)
          setCurrentStep(2)
          setInputValue('')
        }, 1000)
      } else {
        setTempMessage("Please tell me your name!")
        setTimeout(() => setTempMessage(null), 2000)
      }
    } else if (currentStep === 2) {
      // Gift offer
      const step2 = conversationFlow[2]
      const accepted = step2.processInput(input)
      if (accepted) {
        onComplete(userName)
      } else {
        setTempMessage("Come on, join the celebration! 🎄 It's going to be wonderful!")
        setTimeout(() => setTempMessage(null), 2000)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const displayMessage = tempMessage || message

  return (
    <div className="relative z-10 max-w-2xl w-full mx-auto px-3 sm:px-5 animate-[fadeInUp_1s_ease-out]">
      <div className="bg-white/95 rounded-[20px] sm:rounded-[25px] p-4 sm:p-8 shadow-2xl backdrop-blur-md border border-white/20">
        <div className="text-base sm:text-xl text-gray-800 mb-4 sm:mb-5 text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center px-2">
          {displayMessage}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-[20px] sm:rounded-[25px] text-sm sm:text-base outline-none transition-all duration-300 bg-white/90 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
            autoComplete="off"
          />
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-red-600 text-white border-none rounded-[20px] sm:rounded-[25px] text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 sm:min-w-[80px] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30 active:translate-y-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

