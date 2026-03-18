import { useState, useEffect, useMemo } from 'react'
import { photos } from '../data/photos'

function CircularGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  const total = photos.length
  const radius = 220 
  const cycleInterval = 150 
  const imageSize = 220

  // 1. Generate varied alternating static rotations (-20deg to +20deg)
  const staticRotations = useMemo(() => 
    photos.map((_, i) => {
      const base = 5 + Math.random() * 10; // 5 to 15 degrees
      return i % 2 === 0 ? -base : base; // Alternate sign
    }),
    [photos]
  )

  useEffect(() => {
    if (isPaused) return; // Freeze animation on hover
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, cycleInterval)
    return () => clearInterval(timer)
  }, [total, isPaused])

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateY(40px)', 
      }}
    >      
      {photos.map((photo, i) => {
        const angleDeg = (i / total) * 360
        const angleRad = (angleDeg * Math.PI) / 180
        const x = Math.cos(angleRad) * radius
        const y = Math.sin(angleRad) * radius

        const isStable = i === activeIndex || i === (activeIndex + 1) % total
        const isEntering = i === (activeIndex + 2) % total
        const isVisible = isStable || isEntering
        const isHovered = hoveredIndex === i
        const anyHovered = hoveredIndex !== null

        // 1. Spotlight Opacity: 
        // - Hovered image: 1
        // - Not hovered (but another is): 0
        // - No hover at all: visible ? 1 : 0
        const opacity = isHovered ? 1 : (anyHovered ? 0 : (isVisible ? 1 : 0))
        
        // 2. Spotlight Scale:
        const scale = isHovered ? 1.1 : (isVisible ? 1 : 0)
        
        // 3. Spotlight Rotation:
        const rotation = isHovered ? 0 : staticRotations[i]
        
        const inOverlapQuadrant = angleDeg >= 0 && angleDeg <= 90
        const baseZ = inOverlapQuadrant ? 20 : 5
        const activeZ = isHovered ? (baseZ + 30) : (isEntering ? baseZ + 2 : (isStable ? baseZ + 1 : 0))

        const transition = `opacity 0.2s ease, transform 0.2s ease`

        return (
          <div
            key={i}
            onMouseEnter={() => { setIsPaused(true); setHoveredIndex(i); }}
            onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null); }}
            style={{
              position: 'absolute',
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              width: `${imageSize}px`,
              height: `${imageSize}px`,
              marginTop: `-${imageSize / 2}px`,
              marginLeft: `-${imageSize / 2}px`,
              opacity: opacity,
              zIndex: activeZ,
              pointerEvents: isVisible ? 'auto' : 'none',
              // Combine dynamic rotation with dynamic scale
              transform: `rotate(${rotation}deg) scale(${scale})`,
              transition: transition,
              willChange: 'transform',
              transformOrigin: 'center',
              cursor: 'pointer',
            }}
          >
            <img
              src={photo}
              alt={`photo-${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CircularGallery
