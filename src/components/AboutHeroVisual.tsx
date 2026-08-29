import { useState, useRef, useEffect } from 'react'
import {
  ShieldCheck,
  Lock,
  Sparkles,
  Award,
  CheckCircle2,
  TrendingUp,
  Scan,
  Coins,
  Building2,
  ArrowUpRight
} from 'lucide-react'

import { useSiteSettings } from '../hooks/useSiteSettings'

interface AboutHeroVisualProps {
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
}

type ActiveTab = 'bullion' | 'jewellery' | 'vault'

export default function AboutHeroVisual({
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches
}: AboutHeroVisualProps) {
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahesh Bankers'
  const brandInitials = companyName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'MB'
  const [activeTab, setActiveTab] = useState<ActiveTab>('bullion')
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Parallax Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0 })
  }

  // Auto-cycle tabs slowly if user doesn't interact (every 6s)
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === 'bullion' ? 'jewellery' : prev === 'jewellery' ? 'vault' : 'bullion'))
    }, 6000)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] rounded-3xl p-1 select-none transition-all duration-300 group"
      style={{
        perspective: 1200,
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute -inset-3 bg-gradient-to-tr from-[#FF6B00]/25 via-amber-400/20 to-orange-600/15 rounded-[36px] blur-2xl -z-10 group-hover:from-[#FF6B00]/35 group-hover:via-amber-400/30 transition-all duration-700"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      />

      {/* Main Glass Card Container */}
      <div
        className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-white/95 via-orange-50/40 to-white/90 border border-orange-200/90 shadow-[0_20px_50px_rgba(249,115,22,0.14)] backdrop-blur-xl transition-transform duration-300 ease-out flex flex-col"
        style={{
          transform: isHovered
            ? `rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg) translateY(-4px)`
            : 'rotateY(0deg) rotateX(0deg) translateY(0px)',
        }}
      >
        {/* Top Header Bar with Live Indicator & Interactive Tabs */}
        <div className="p-4 sm:p-5 border-b border-orange-100 bg-white/70 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div>
              <div className="text-[11px] font-black tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
                <span>{companyName.toUpperCase()} PRECISION VAULT</span>
                <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[9px] font-bold">2026 BENCHMARK</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">BIS HUID • RBI 75% LTV • 100% Insured</p>
            </div>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex items-center gap-1 bg-orange-100/60 p-1 rounded-2xl border border-orange-200/60 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setActiveTab('bullion')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 flex items-center gap-1.5 ${
                activeTab === 'bullion'
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-orange-600 bg-transparent'
              }`}
            >
              <Award size={13} />
              <span>24K Bullion</span>
            </button>

            <button
              onClick={() => setActiveTab('jewellery')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 flex items-center gap-1.5 ${
                activeTab === 'jewellery'
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-orange-600 bg-transparent'
              }`}
            >
              <Coins size={13} />
              <span>22K 916</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 flex items-center gap-1.5 ${
                activeTab === 'vault'
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-orange-600 bg-transparent'
              }`}
            >
              <Lock size={13} />
              <span>Vault Security</span>
            </button>
          </div>
        </div>

        {/* Central Visual Stage */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 overflow-hidden flex items-center justify-center p-6">
          {/* 1. Guilloche Bank Security Geometric Pattern Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
            viewBox="0 0 600 360"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="guillocheGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#EAB308" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Concentric Guilloche Oval Waves */}
            {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((step, idx) => (
              <ellipse
                key={idx}
                cx="300"
                cy="180"
                rx={240 - step * 1.5}
                ry={130 - step * 0.8}
                fill="none"
                stroke="url(#guillocheGold)"
                strokeWidth="0.85"
                transform={`rotate(${idx * 4}, 300, 180)`}
              />
            ))}

            {/* Fine Grid Mesh */}
            <pattern id="fineGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FDBA74" strokeWidth="0.3" opacity="0.3" />
            </pattern>
            <rect width="600" height="360" fill="url(#fineGrid)" />
          </svg>

          {/* 2. Interactive Content per Tab */}
          {activeTab === 'bullion' && (
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full animate-fadeIn">
              {/* 3D Realistic Gold Ingot Render with Metallic Specular Reflections */}
              <div className="relative group/bar cursor-pointer">
                {/* Gold Bar Shadow with Ambient Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/40 via-orange-500/30 to-yellow-300/40 rounded-3xl blur-xl opacity-75 group-hover/bar:opacity-100 transition-opacity" />

                {/* 3D Gold Bar */}
                <div className="relative w-64 sm:w-76 md:w-84 h-32 sm:h-38 rounded-2xl bg-gradient-to-tr from-[#A16207] via-[#FACC15] to-[#FEF08A] p-[2px] shadow-[0_20px_35px_rgba(180,83,9,0.35)] transform group-hover/bar:scale-[1.02] transition-transform duration-500">
                  <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#FEF9C3] via-[#FDE047] to-[#CA8A04] p-3 sm:p-4 flex flex-col justify-between border border-white/60 shadow-inner relative overflow-hidden">
                    {/* Metallic Specular Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-25 translate-x-[-150%] animate-shimmer" />

                    {/* Top Stamp */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-md bg-[#854D0E] text-[#FEF08A] flex items-center justify-center font-black text-xs shadow-xs">
                          {brandInitials}
                        </div>
                        <span className="font-extrabold text-[11px] sm:text-xs tracking-wider text-[#78350F]">
                          {companyName.toUpperCase()} BULLION
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#78350F]/15 text-[#78350F] border border-[#78350F]/20">
                        999.9 FINE
                      </span>
                    </div>

                    {/* Center Hallmark & Weight */}
                    <div className="flex items-center justify-between my-auto">
                      <div className="flex flex-col">
                        <span className="text-2xl sm:text-3xl font-black text-[#713F12] tracking-tight leading-none drop-shadow-xs">
                          100.000g
                        </span>
                        <span className="text-[9px] font-bold text-[#854D0E] uppercase tracking-widest mt-0.5">
                          24 KARAT PURE GOLD
                        </span>
                      </div>

                      {/* BIS Hallmark Badge */}
                      <div className="flex flex-col items-center px-2.5 py-1.5 rounded-lg bg-white/70 border border-[#CA8A04]/40 shadow-xs">
                        <Award size={18} className="text-[#A16207]" />
                        <span className="text-[8px] font-black text-[#78350F] mt-0.5">BIS 999</span>
                      </div>
                    </div>

                    {/* Bottom Micro Stamp & Serial Number */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#B45309]/20 text-[9px] font-mono text-[#78350F]">
                      <span>ASSAYER: NABL CERTIFIED</span>
                      <span className="font-bold tracking-widest">SN: GF-2026-99994</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Laser Purity Scan Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-orange-200 shadow-xs text-xs">
                <Scan size={14} className="text-[#FF6B00] animate-pulse" />
                <span className="font-bold text-slate-700">Laser XRF Spectrometry:</span>
                <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  99.99% Verified Purity
                </span>
              </div>
            </div>
          )}

          {activeTab === 'jewellery' && (
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full animate-fadeIn">
              {/* 22K 916 Hallmarked Jewellery Valuation Card */}
              <div className="w-full max-w-sm rounded-2xl bg-white/95 border border-orange-200/90 p-4 sm:p-5 shadow-lg flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-orange-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-xs">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">22K 916 BIS Hallmark</h4>
                      <p className="text-[10px] text-slate-500">Official Jewellery Purity Standard</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black">
                    91.6% Pure Gold
                  </span>
                </div>

                {/* Calculation Matrix Preview */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
                    <span className="text-[9px] text-slate-500 font-bold block uppercase">Purity Standard</span>
                    <span className="text-xs font-black text-slate-800">22 Karat</span>
                  </div>
                  <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
                    <span className="text-[9px] text-slate-500 font-bold block uppercase">Govt GST</span>
                    <span className="text-xs font-black text-slate-800">Exact 3%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
                    <span className="text-[9px] text-slate-500 font-bold block uppercase">6-Digit HUID</span>
                    <span className="text-xs font-black text-emerald-600">100% Trackable</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#FF6B00]" />
                    <span>Zero Wastage Transparency</span>
                  </span>
                  <span className="font-bold text-slate-800">100% Guaranteed</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full animate-fadeIn">
              {/* High-Security Insured Vault Facility */}
              <div className="w-full max-w-sm rounded-2xl bg-white/95 border border-orange-200/90 p-4 sm:p-5 shadow-lg flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-orange-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xs">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">Class-A Bank Vaults</h4>
                      <p className="text-[10px] text-slate-500">24/7 Biometric & Armed Custody</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    100% Insured
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-slate-700 bg-orange-50/40 p-2 rounded-lg">
                    <span className="text-[11px] font-medium">RBI Approved Loan Value:</span>
                    <span className="font-extrabold text-orange-600">Up to 75% LTV</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700 bg-orange-50/40 p-2 rounded-lg">
                    <span className="text-[11px] font-medium">Vault Storage Fee:</span>
                    <span className="font-extrabold text-emerald-600">₹0 Free Forever</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-700 bg-orange-50/40 p-2 rounded-lg">
                    <span className="text-[11px] font-medium">Insurance Partner:</span>
                    <span className="font-extrabold text-slate-800">National Underwriters</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Pill Badges (Corner Accents) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md border border-orange-200/80 shadow-xs text-[10px] font-extrabold text-slate-700">
            <Building2 size={12} className="text-[#FF6B00]" />
            <span>IBJA / MCX Feeds</span>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white shadow-md text-[10px] font-extrabold">
            <Sparkles size={12} />
            <span>BIS Hallmarked</span>
          </div>
        </div>

        {/* Bottom Interactive Navigation Ribbon */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-orange-50/80 via-white to-amber-50/80 border-t border-orange-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <TrendingUp size={16} className="text-[#FF6B00]" />
            <span className="hidden sm:inline">Explore Verified Features:</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onNavigateLiveRate}
              className="px-3 py-1.5 rounded-xl bg-white border border-orange-200 hover:border-orange-500 text-orange-600 text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Live Rates</span>
              <ArrowUpRight size={13} />
            </button>

            <button
              onClick={onNavigateGoldLoan}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white text-xs font-bold transition-all shadow-xs hover:brightness-110 flex items-center gap-1 cursor-pointer border-0"
            >
              <span>Gold Loan</span>
              <ArrowUpRight size={13} />
            </button>

            <button
              onClick={onNavigateBranches}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold transition-all shadow-xs hover:bg-slate-900 flex items-center gap-1 cursor-pointer border-0"
            >
              <span>Branches</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
