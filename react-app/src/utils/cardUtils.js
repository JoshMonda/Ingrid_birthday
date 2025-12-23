export function downloadCelebrationCard(userName) {
  const displayName = userName || 'Team Member'
  const svgContent = `<svg width="700" height="800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#dcfce7;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fee2e2;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#16a34a;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="700" height="800" fill="url(#bg)" rx="20"/>
    <circle cx="100" cy="100" r="30" fill="#dc2626" opacity="0.3"/>
    <circle cx="600" cy="150" r="25" fill="#16a34a" opacity="0.3"/>
    <circle cx="150" cy="700" r="35" fill="#fbbf24" opacity="0.3"/>
    <circle cx="550" cy="650" r="28" fill="#dc2626" opacity="0.3"/>
    <text x="350" y="150" text-anchor="middle" font-family="Dancing Script, cursive" font-size="80" fill="#16a34a">🎄</text>
    <text x="350" y="250" text-anchor="middle" font-family="Dancing Script, cursive" font-size="60" fill="#16a34a" font-weight="700">Merry Christmas</text>
    <text x="350" y="320" text-anchor="middle" font-family="Poppins, sans-serif" font-size="32" fill="#dc2626" font-weight="600">2025</text>
    <text x="350" y="400" text-anchor="middle" font-family="Dancing Script, cursive" font-size="72" fill="url(#nameGradient)" font-weight="600">${displayName}</text>
    <text x="350" y="480" text-anchor="middle" font-family="Poppins, sans-serif" font-size="24" fill="#374151" font-weight="600">Global South Incubator</text>
    <text x="350" y="540" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#4b5563">Celebrating an amazing year together!</text>
    <text x="350" y="580" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#4b5563">Thank you for being part of our team</text>
    <text x="350" y="650" text-anchor="middle" font-family="Poppins, sans-serif" font-size="22" fill="#16a34a" font-style="italic">Wishing you joy and success in 2026!</text>
    <text x="350" y="720" text-anchor="middle" font-family="Dancing Script, cursive" font-size="36" fill="#dc2626" font-weight="600">A gift from Joash,</text>
    <text x="350" y="760" text-anchor="middle" font-family="Dancing Script, cursive" font-size="32" fill="#16a34a" font-weight="600">With gratitude</text>
  </svg>`
  
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.download = `christmas-celebration-${displayName.toLowerCase().replace(/\s+/g, '-')}.svg`
  link.href = url
  link.click()
  
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

