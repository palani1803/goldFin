import heroBg from '../assets/gold_hero_bg.png'

interface GoldBackgroundProps {
  /**
   * Optional opacity for the gold hero texture overlay (default: 0.03 for a soft ambient light look)
   */
  textureOpacity?: number
  /**
   * Whether to include the ambient animated floating solar orange aura spotlights (default: true)
   */
  showGlows?: boolean
}

export default function GoldBackground({
  textureOpacity = 0.03,
  showGlows = true,
}: GoldBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Crisp Clean White & Warm Slate Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFF7ED]/30" />

      {/* 2. Micro-Fintech Warm Orange Dot Grid Layer */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(249, 115, 22, 0.12) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 85%)',
        }}
      />

      {/* 3. Subtle Warm Hero Texture Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: textureOpacity,
          mixBlendMode: 'multiply',
        }}
      />

      {/* 4. Solar Orange & Warm Amber Aura Spotlights */}
      {showGlows && (
        <>
          {/* Main Top Center Solar Orange Aura Halo */}
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1150px] h-[620px] bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.11)_0%,rgba(249,115,22,0.04)_40%,transparent_72%)] blur-[70px] animate-float-glow-top" />

          {/* Central Warm Orange Ambient Glow */}
          <div className="absolute top-[340px] left-1/2 -translate-x-1/2 w-[920px] h-[720px] bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,rgba(251,146,60,0.04)_45%,transparent_75%)] blur-[90px] animate-aura-pulse" />

          {/* Floating Right Orange Light Flare */}
          <div className="absolute top-[650px] -right-[150px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,107,0,0.08)_0%,rgba(254,215,170,0.15)_45%,transparent_70%)] blur-[85px] animate-float-glow-mid" />

          {/* Floating Bottom Left Amber Orb */}
          <div className="absolute bottom-[120px] -left-[160px] w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,rgba(251,146,60,0.06)_45%,transparent_70%)] blur-[80px] animate-float-glow-bottom" />
        </>
      )}

      {/* 5. Soft Light Edge Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(241, 245, 249, 0.5) 100%)',
        }}
      />
    </div>
  )
}
