import { useState } from 'react'
import { useSiteSettings } from '../hooks/useSiteSettings'
import mahesBankersLogo from '../assets/mahesbankers.png'

export interface GoldCoin3DProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive'
  customSize?: number
  interactive?: boolean
  autoSpin?: boolean
  caratLabel?: string
  variant?: 'medallion' | 'logo'
  className?: string
  onClick?: () => void
}

export default function GoldCoin3D({
  size = 'responsive',
  customSize,
  interactive = true,
  autoSpin = true,
  variant = 'medallion',
  className = '',
  onClick,
}: GoldCoin3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { settings } = useSiteSettings()

  const logoSrc = settings.logoUrl || mahesBankersLogo
  const brandName = settings.siteName || 'Mahes Bankers'

  // Dimensions for round medallion
  const fixedSizePx = customSize || (size === 'sm' ? 56 : size === 'md' ? 76 : size === 'lg' ? 96 : size === 'xl' ? 128 : undefined)

  if (variant === 'logo') {
    return (
      <div
        className={`relative select-none inline-flex items-center justify-center [perspective:1000px] cursor-pointer group ${
          !customSize && size === 'responsive' ? 'w-[54px] h-[67px] sm:w-[76px] sm:h-[94px]' : ''
        } ${className}`}
        style={{
          ...(fixedSizePx ? { width: `${fixedSizePx * 0.82}px`, height: `${fixedSizePx}px` } : {}),
          transform: 'translate3d(0,0,0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Ambient Grounding Shadow */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-2.5 bg-amber-950/25 rounded-full blur-[3px] transition-all duration-300 pointer-events-none group-hover:w-full group-hover:opacity-40"
          style={{
            transform: isHovered ? 'scale(1.1) translateY(2px)' : 'scale(1)',
          }}
        />

        {/* 3D Rotating Container */}
        <div
          className={`relative w-full h-full [transform-style:preserve-3d] ${
            autoSpin ? 'animate-coin-spin-3d' : ''
          } ${isHovered && interactive ? '[animation-play-state:paused]' : ''}`}
          style={{
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHovered ? 'rotateY(25deg) rotateX(10deg) scale(1.06)' : undefined,
            willChange: 'transform',
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] z-10 flex items-center justify-center p-1"
            style={{ transform: 'translateZ(2px)' }}
          >
            <img
              src={logoSrc}
              alt={brandName}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = mahesBankersLogo
              }}
              className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.95)] drop-shadow-[0_4px_12px_rgba(234,88,12,0.45)] select-none pointer-events-none"
            />
          </div>

          {/* Back Face (facing forward when flipped 180deg) */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] z-10 flex items-center justify-center p-1"
            style={{ transform: 'rotateY(180deg) translateZ(2px)' }}
          >
            <img
              src={logoSrc}
              alt={brandName}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = mahesBankersLogo
              }}
              className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.95)] drop-shadow-[0_4px_12px_rgba(234,88,12,0.45)] select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    )
  }

  // Medallion Coin Variant (Default: Minted Gold Rim with Crisp White Center & Mahes Bankers Logo)
  return (
    <div
      className={`relative select-none inline-flex items-center justify-center [perspective:1000px] cursor-pointer group ${
        !customSize && size === 'responsive' ? 'w-[56px] h-[56px] sm:w-[80px] sm:h-[80px]' : ''
      } ${className}`}
      style={{
        ...(fixedSizePx ? { width: `${fixedSizePx}px`, height: `${fixedSizePx}px` } : {}),
        transform: 'translate3d(0,0,0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Ambient Floor Glow & Soft Grounding Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-amber-950/25 rounded-full blur-[4px] transition-all duration-300 pointer-events-none group-hover:w-full group-hover:opacity-40"
        style={{
          transform: isHovered ? 'scale(1.1) translateY(2px)' : 'scale(1)',
        }}
      />

      {/* 3D Rotating Y-Axis Cylinder Container */}
      <div
        className={`relative w-full h-full [transform-style:preserve-3d] ${
          autoSpin ? 'animate-coin-spin-3d' : ''
        } ${isHovered && interactive ? '[animation-play-state:paused]' : ''}`}
        style={{
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'rotateY(25deg) rotateX(10deg) scale(1.06)' : undefined,
          willChange: 'transform',
        }}
      >
        {/* ================= Front Face (Mahes Bankers Crest) ================= */}
        <div
          className="absolute inset-0 rounded-full [backface-visibility:hidden] z-10 overflow-hidden shadow-[0_6px_20px_rgba(234,88,12,0.45),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(120,53,15,0.6)] flex items-center justify-center p-[3px] sm:p-[3.5px]"
          style={{
            transform: 'translateZ(3px)',
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFD54F 25%, #FFA000 65%, #BF360C 100%)',
          }}
        >
          {/* Inner Clean Porcelain Plate */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-white to-amber-50/70 border border-amber-300/80 shadow-[inset_0_1px_3px_rgba(234,88,12,0.15)] flex items-center justify-center p-1.5 sm:p-2 relative overflow-hidden">
            <img
              src={logoSrc}
              alt={brandName}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = mahesBankersLogo
              }}
              className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(234,88,12,0.25)] select-none pointer-events-none"
            />

            {/* Specular Glint Sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full animate-coin-shimmer pointer-events-none" />
          </div>
        </div>

        {/* 3D Physical Cylinder Thickness Layer */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FFA000] via-[#BF360C] to-[#5D1900]"
          style={{ transform: 'translateZ(0px)' }}
        />

        {/* ================= Back Face (Mahes Bankers Crest, flipped 180deg) ================= */}
        <div
          className="absolute inset-0 rounded-full [backface-visibility:hidden] z-10 overflow-hidden shadow-[0_6px_20px_rgba(234,88,12,0.45),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(120,53,15,0.6)] flex items-center justify-center p-[3px] sm:p-[3.5px]"
          style={{
            transform: 'rotateY(180deg) translateZ(3px)',
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFD54F 25%, #FFA000 65%, #BF360C 100%)',
          }}
        >
          {/* Inner Clean Porcelain Plate */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-white to-amber-50/70 border border-amber-300/80 shadow-[inset_0_1px_3px_rgba(234,88,12,0.15)] flex items-center justify-center p-1.5 sm:p-2 relative overflow-hidden">
            <img
              src={logoSrc}
              alt={brandName}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = mahesBankersLogo
              }}
              className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(234,88,12,0.25)] select-none pointer-events-none"
            />

            {/* Specular Glint Sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full animate-coin-shimmer pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
