import { useState } from 'react'
import { useSiteSettings } from '../hooks/useSiteSettings'

interface GoldCoin3DProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive'
  customSize?: number
  interactive?: boolean
  autoSpin?: boolean
  caratLabel?: string
  className?: string
  onClick?: () => void
}

export default function GoldCoin3D({
  size = 'responsive',
  customSize,
  interactive = true,
  autoSpin = true,
  caratLabel = '24K 999',
  className = '',
  onClick,
}: GoldCoin3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { settings } = useSiteSettings()
  const coinStampText = settings.siteName ? `★ ${settings.siteName.toUpperCase()} ★` : '★ MAHES BANKERS ★'

  // Optimal crystal-clear dimension for crisp rendering
  const fixedSizePx = customSize || (size === 'sm' ? 56 : size === 'md' ? 76 : size === 'lg' ? 96 : size === 'xl' ? 128 : undefined)

  return (
    <div
      className={`relative select-none inline-flex items-center justify-center [perspective:1000px] cursor-pointer group ${
        !customSize && size === 'responsive' ? 'w-[52px] h-[52px] sm:w-[74px] sm:h-[74px]' : ''
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
        {/* ================= Front Face (24K Pure Gold Crest) ================= */}
        <div
          className="absolute inset-0 rounded-full [backface-visibility:hidden] z-10 overflow-hidden shadow-[0_6px_20px_rgba(234,88,12,0.45),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(120,53,15,0.6)]"
          style={{
            transform: 'translateZ(3px)',
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFD54F 25%, #FFA000 65%, #E65100 100%)',
          }}
        >
          {/* Vector SVG Emblem for Razor-Sharp Display */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full block"
            style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision' }}
          >
            <defs>
              <linearGradient id="goldRimFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="30%" stopColor="#FFD54F" />
                <stop offset="70%" stopColor="#FF8F00" />
                <stop offset="100%" stopColor="#BF360C" />
              </linearGradient>
              <radialGradient id="innerPlateFront" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFF176" />
                <stop offset="45%" stopColor="#FFA000" />
                <stop offset="100%" stopColor="#E65100" />
              </radialGradient>
            </defs>

            {/* Milled Outer Gear Ring */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="url(#goldRimFront)" strokeWidth="3" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FFF59D" strokeWidth="1" opacity="0.9" />

            {/* Concentric Milled Dots Pattern */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#FFE082"
              strokeWidth="1.5"
              strokeDasharray="2.2 2.2"
              opacity="0.8"
            />

            {/* Inner Recessed Bullion Plate */}
            <circle cx="50" cy="50" r="39" fill="url(#innerPlateFront)" stroke="#B34700" strokeWidth="0.8" />

            {/* Top Star Accent */}
            <path
              d="M50 18 L51.5 22 L56 22 L52.5 24.5 L53.8 29 L50 26.5 L46.2 29 L47.5 24.5 L44 22 L48.5 22 Z"
              fill="#FFFFFF"
              stroke="#D97706"
              strokeWidth="0.3"
            />

            {/* Main Bold Carat Stamp */}
            <text
              x="50"
              y="46"
              textAnchor="middle"
              fill="#2E1000"
              fontWeight="900"
              fontFamily="sans-serif"
              fontSize="14.5"
              letterSpacing="0.3"
              style={{ filter: 'drop-shadow(0px 1px 0px rgba(255,245,157,0.85))' }}
            >
              {caratLabel}
            </text>

            {/* Subtitle Badge: 99.9% PURE */}
            <text
              x="50"
              y="58"
              textAnchor="middle"
              fill="#4A1800"
              fontWeight="800"
              fontFamily="sans-serif"
              fontSize="7.5"
              letterSpacing="0.8"
              style={{ filter: 'drop-shadow(0px 0.5px 0px rgba(255,255,255,0.7))' }}
            >
              99.9% PURE
            </text>

            {/* Curved Bottom Brand Stamp */}
            <path id="curveFront" d="M22 68 A 32 32 0 0 0 78 68" fill="none" />
            <text
              fill="#3A1400"
              fontWeight="900"
              fontSize="6"
              letterSpacing="1.2"
              style={{ filter: 'drop-shadow(0px 0.5px 0px rgba(255,245,157,0.9))' }}
            >
              <textPath href="#curveFront" startOffset="50%" textAnchor="middle">
                {coinStampText}
              </textPath>
            </text>
          </svg>

          {/* Shimmer Specular Light Glint Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/45 to-transparent -translate-x-full animate-coin-shimmer pointer-events-none" />
        </div>

        {/* 3D Physical Cylinder Thickness Layer */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FFA000] via-[#BF360C] to-[#5D1900] [backface-visibility:hidden]"
          style={{ transform: 'translateZ(0px)' }}
        />

        {/* ================= Back Face (BIS 916 Hallmark Shield) ================= */}
        <div
          className="absolute inset-0 rounded-full [backface-visibility:hidden] z-10 overflow-hidden shadow-[0_6px_20px_rgba(234,88,12,0.45),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(120,53,15,0.6)]"
          style={{
            transform: 'rotateY(180deg) translateZ(3px)',
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFD54F 25%, #FFA000 65%, #E65100 100%)',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full block"
            style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision' }}
          >
            <defs>
              <radialGradient id="innerPlateBack" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFF59D" />
                <stop offset="50%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#E65100" />
              </radialGradient>
            </defs>

            {/* Outer Milled Gears */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="url(#goldRimFront)" strokeWidth="3" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FFF59D" strokeWidth="1" opacity="0.9" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#FFE082"
              strokeWidth="1.5"
              strokeDasharray="2.2 2.2"
              opacity="0.8"
            />
            <circle cx="50" cy="50" r="39" fill="url(#innerPlateBack)" stroke="#B34700" strokeWidth="0.8" />

            {/* BIS Hallmark Triangle Emblem */}
            <path
              d="M50 20 L61 36 L39 36 Z"
              fill="#FFFFFF"
              stroke="#B34700"
              strokeWidth="1.2"
              style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.15))' }}
            />
            <circle cx="50" cy="29" r="3" fill="#D97706" />

            {/* 916 Hallmark Text */}
            <text
              x="50"
              y="53"
              textAnchor="middle"
              fill="#2E1000"
              fontWeight="900"
              fontFamily="sans-serif"
              fontSize="14.5"
              letterSpacing="0.5"
              style={{ filter: 'drop-shadow(0px 1px 0px rgba(255,245,157,0.85))' }}
            >
              BIS 916
            </text>

            {/* HALLMARK Subtext */}
            <text
              x="50"
              y="64"
              textAnchor="middle"
              fill="#4A1800"
              fontWeight="800"
              fontFamily="sans-serif"
              fontSize="7.5"
              letterSpacing="1"
              style={{ filter: 'drop-shadow(0px 0.5px 0px rgba(255,255,255,0.7))' }}
            >
              HALLMARKED
            </text>

            {/* Bottom Guaranteed Stamp */}
            <path id="curveBack" d="M22 70 A 32 32 0 0 0 78 70" fill="none" />
            <text
              fill="#3A1400"
              fontWeight="900"
              fontSize="6.5"
              letterSpacing="1.2"
              style={{ filter: 'drop-shadow(0px 0.5px 0px rgba(255,245,157,0.9))' }}
            >
              <textPath href="#curveBack" startOffset="50%" textAnchor="middle">
                GOVT APPROVED
              </textPath>
            </text>
          </svg>

          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/45 to-transparent -translate-x-full animate-coin-shimmer pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
