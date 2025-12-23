export function createSparkleBurst() {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement('div')
    sparkle.className = 'fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[1000]'
    sparkle.style.left = centerX + 'px'
    sparkle.style.top = centerY + 'px'
    
    document.body.appendChild(sparkle)
    
    const angle = (i / 12) * Math.PI * 2
    const distance = 100 + Math.random() * 50
    const endX = centerX + Math.cos(angle) * distance
    const endY = centerY + Math.sin(angle) * distance
    
    sparkle.animate([
      { transform: 'translate(0, 0) scale(0)', opacity: 1 },
      { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out'
    }).onfinish = () => {
      sparkle.remove()
    }
  }
}

export function createConfettiExplosion() {
  const confettiContainer = document.createElement('div')
  confettiContainer.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-[999]'
  document.body.appendChild(confettiContainer)
  
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#ff6b9d']
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'absolute w-2.5 h-2.5'
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.left = Math.random() * 100 + '%'
    confetti.style.animationDelay = Math.random() * 3 + 's'
    confetti.style.animationDuration = (3 + Math.random() * 2) + 's'
    confetti.style.animationName = 'confettiFall'
    confetti.style.animationTimingFunction = 'linear'
    confetti.style.animationFillMode = 'forwards'
    
    confettiContainer.appendChild(confetti)
  }
  
  setTimeout(() => {
    confettiContainer.remove()
  }, 5000)
}

