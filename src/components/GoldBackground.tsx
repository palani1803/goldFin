import heroBg from '../assets/gold_hero_bg.png'

interface GoldBackgroundProps {
  /**
   * Optional opacity for the gold hero texture overlay (default: 0.08 for a mild, soft ambient look)
   */
  textureOpacity?: number
  /**
   * Whether to include the ambient animated floating gold orbs (default: true)
   */
  showGlows?: boolean
}

export default function GoldBackground({
  textureOpacity = 0.08,
  showGlows = true,
}: GoldBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Subtle, Mild Golden Hero Atmospheric Texture Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: textureOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* 2. Soft Gradient Mask for Ultra Crisp Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/80 via-[#0d111a]/92 to-[#0b0f19]" />

      {/* 3. Mild, Gentle Ambient Floating Golden Glow Orbs */}
      {showGlows && (
        <>
          {/* Top Center Mild Golden Flare */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(circle,rgba(234,179,8,0.07)_0%,rgba(202,138,4,0.02)_50%,transparent_75%)] blur-[75px] animate-float-glow-top" />

          {/* Right Mid Mild Ambient Glow */}
          <div className="absolute top-[600px] -right-[200px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(234,179,8,0.05)_0%,rgba(30,58,138,0.03)_50%,transparent_75%)] blur-[80px] animate-float-glow-mid" />

          {/* Bottom Left Mild Golden Spotlight */}
          <div className="absolute bottom-[200px] -left-[200px] w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(234,179,8,0.04)_0%,transparent_70%)] blur-[80px] animate-float-glow-bottom" />
        </>
      )}
    </div>
  )
}
