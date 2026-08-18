import heroBg from '../assets/gold_hero_bg.png'

interface GoldBackgroundProps {
  /**
   * Optional opacity for the gold hero texture overlay (default: 0.06 for a soft ambient look)
   */
  textureOpacity?: number
  /**
   * Whether to include the ambient animated floating gold & sapphire aura spotlights (default: true)
   */
  showGlows?: boolean
}

export default function GoldBackground({
  textureOpacity = 0.06,
  showGlows = true,
}: GoldBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Royal Midnight Sapphire Navy Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080D1E] via-[#0A1329] to-[#050914]" />

      {/* 2. Micro-Fintech Gold Dot Grid Layer */}
      <div
        className="absolute inset-0 opacity-45 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(218, 174, 77, 0.14) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 25%, transparent 80%)',
        }}
      />

      {/* 3. Subtle Gold Hero Texture Overlay with Sapphire Fusion */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: textureOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* 4. Royal Gold & Sapphire Aura Spotlights */}
      {showGlows && (
        <>
          {/* Main Top Center Gold Aura Halo */}
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1150px] h-[620px] bg-[radial-gradient(ellipse_at_top,rgba(218,174,77,0.18)_0%,rgba(243,197,91,0.07)_40%,transparent_72%)] blur-[60px] animate-float-glow-top" />

          {/* Central Warm Gold & Sapphire Ambient Glow (Behind Calculators and Main Cards) */}
          <div className="absolute top-[340px] left-1/2 -translate-x-1/2 w-[920px] h-[720px] bg-[radial-gradient(circle,rgba(218,174,77,0.08)_0%,rgba(30,64,175,0.08)_45%,transparent_75%)] blur-[85px] animate-aura-pulse" />

          {/* Floating Right Sapphire Blue Light Flare */}
          <div className="absolute top-[650px] -right-[150px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(30,64,175,0.22)_0%,rgba(59,130,246,0.06)_45%,transparent_70%)] blur-[85px] animate-float-glow-mid" />

          {/* Floating Bottom Left Amber-Gold Orb */}
          <div className="absolute bottom-[120px] -left-[160px] w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(218,174,77,0.08)_0%,rgba(30,64,175,0.1)_45%,transparent_70%)] blur-[80px] animate-float-glow-bottom" />
        </>
      )}

      {/* 5. Deep Royal Navy Vignette Shading on Outer Edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(5, 9, 20, 0.65) 100%)',
        }}
      />
    </div>
  )
}
