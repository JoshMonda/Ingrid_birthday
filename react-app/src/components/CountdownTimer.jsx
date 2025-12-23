import { useState, useEffect } from 'react'

export default function CountdownTimer({ targetDate, label, emoji }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="bg-gradient-to-br from-green-600 to-red-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl text-center animate-pulse">
        <div className="text-3xl sm:text-4xl mb-2">{emoji}</div>
        <div className="text-lg sm:text-2xl font-bold px-2">{label} is here!</div>
        <div className="text-base sm:text-lg mt-2">🎉 Celebrate! 🎉</div>
      </div>
    )
  }

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-green-500/30">
      <div className="text-center mb-3 sm:mb-4">
        <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{emoji}</div>
        <h3 className="text-lg sm:text-2xl font-dancing text-green-700 font-bold px-2">{label}</h3>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold">{timeLeft.days}</div>
          <div className="text-xs sm:text-sm font-medium mt-1">Days</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs sm:text-sm font-medium mt-1">Hours</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs sm:text-sm font-medium mt-1">Minutes</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs sm:text-sm font-medium mt-1">Seconds</div>
        </div>
      </div>
    </div>
  )
}

