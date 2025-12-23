import { useEffect, useRef } from 'react'

export default function BackgroundEffects() {
  const particlesRef = useRef(null)

  useEffect(() => {
    // Create floating particles
    const interval = setInterval(() => {
      if (particlesRef.current) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-white/60 rounded-full pointer-events-none'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = '100%'
        particlesRef.current.appendChild(particle)

        particle.animate([
          { transform: 'translateY(0)', opacity: 0 },
          { transform: 'translateY(-100vh)', opacity: 1 }
        ], {
          duration: 8000 + Math.random() * 4000,
          easing: 'linear'
        }).onfinish = () => {
          particle.remove()
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Stars background */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #fff, transparent),
            radial-gradient(2px 2px at 40px 70px, #fff, transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, #fff, transparent),
            radial-gradient(2px 2px at 160px 30px, #fff, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'twinkle 4s ease-in-out infinite alternate'
        }}
      />
      
      {/* Floating particles container */}
      <div 
        ref={particlesRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[2]"
      />
    </>
  )
}

