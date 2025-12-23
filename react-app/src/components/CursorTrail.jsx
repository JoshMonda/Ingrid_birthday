import { useEffect } from 'react'

export default function CursorTrail() {
  useEffect(() => {
    const trail = document.getElementById('cursorTrail')
    
    const handleMouseMove = (e) => {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full pointer-events-none z-[9999]'
      particle.style.left = e.clientX + 'px'
      particle.style.top = e.clientY + 'px'
      
      if (trail) trail.appendChild(particle)
      
      particle.animate([
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0)' }
      ], {
        duration: 1000,
        easing: 'ease-out'
      }).onfinish = () => {
        particle.remove()
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div id="cursorTrail" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]" />
}

