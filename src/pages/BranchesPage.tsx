import { useState, useEffect } from 'react'
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Scale,
  Lock,
  PhoneCall,
  MapPin,
  Loader2
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'

// Branch images
import branchJewelNecklace from '../assets/branch_jewel_necklace.jpg'
import branchJewelJhumkas from '../assets/branch_jewel_jhumkas.jpg'
import branchJewelBangles from '../assets/branch_jewel_bangles.jpg'
import branchJewelRings from '../assets/branch_jewel_rings.jpg'

export interface BranchesPageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateContact?: (city?: string) => void
}

interface BranchItem {
  _id?: string
  id?: string
  name: string
  subtitle?: string
  city: string
  address?: string
  phone?: string
  image?: string
}

const BRANCH_IMAGES: Record<string, string> = {
  sivakasi: branchJewelNecklace,
  srivilliputhur: branchJewelJhumkas,
  puthupatti: branchJewelBangles,
  'm.puthupatti': branchJewelBangles,
  rajapalayam: branchJewelRings,
  chennai: branchJewelNecklace,
  alangulam: branchJewelBangles,
}

const getImageForCity = (city: string) => {
  const c = city.toLowerCase()
  for (const key of Object.keys(BRANCH_IMAGES)) {
    if (c.includes(key)) return BRANCH_IMAGES[key]
  }
  return branchJewelNecklace
}

export default function BranchesPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: BranchesPageProps) {
  const [branches, setBranches] = useState<BranchItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/branches')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const activeBranches = json.data
            .filter((b: any) => b.isActive !== false)
            .map((b: any) => ({
              _id: b._id,
              id: b._id,
              name: b.name,
              subtitle: `GoldFin ${b.city}`,
              city: b.city,
              address: b.address,
              phone: b.phone,
              image: getImageForCity(b.city),
            }))
          setBranches(activeBranches)
        }
      })
      .catch((err) => console.error('Failed to load branches:', err))
      .finally(() => setLoading(false))
  }, [])

  const handleBranchClick = (city?: string) => {
    if (city) {
      localStorage.setItem('selectedContactBranch', city)
    }
    if (onNavigateContact) {
      onNavigateContact(city)
    } else {
      window.location.hash = city ? `#contact?city=${encodeURIComponent(city)}` : '#contact'
    }
  }

  const getLocalizedName = (branch: BranchItem) => {
    const c = branch.city.toLowerCase()
    if (c.includes('sivakasi')) return 'Sivakasi Main Branch & Vault'
    if (c.includes('srivilliputhur')) return 'Srivilliputhur Branch'
    if (c.includes('puthupatti')) return 'M.Puthupatti Rural Center'
    if (c.includes('rajapalayam')) return 'Rajapalayam Branch'
    if (c.includes('chennai')) return 'Chennai Metro Desk'
    return `${branch.name} (${branch.city})`
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Ambient background decoration */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="branches"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onNavigateBranches={onNavigateBranches}
        onNavigateContact={onNavigateContact}
        onScrollToSection={(sectionId) => {
          if (onNavigateHome) {
            onNavigateHome()
            setTimeout(() => {
              const el = document.getElementById(sectionId)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-10 md:py-14 relative z-10 w-full flex flex-col gap-14 md:gap-20">
        {/* Breadcrumb & Section Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">Regional Branches</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Sparkles size={14} />
            <span>AUTHORIZED REGIONAL HUBS • VAULT SECURITY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
            Our Regional{' '}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
              Branch Network
            </span>
            <span className="block text-sm sm:text-lg font-semibold text-slate-500 mt-2 font-sans">
              நமது மண்டல கிளைகள் மற்றும் வங்கி பெட்டக பாதுகாப்பு
            </span>
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full" />

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Visit any of our authorized branches across Tamil Nadu. Experience transparent live gold rate benchmarks, instant 15-minute loans, and non-destructive German XRF purity appraisals.
          </p>
        </div>

        {/* SECTION 1: BRANCH SHOWCASE CARDS */}
        <section className="flex flex-col gap-10">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
              <Loader2 size={24} className="animate-spin text-[#FF6B00]" />
              <span className="text-sm font-semibold">Loading branch locations...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto w-full">
              {branches.map((branch) => {
                const localizedName = getLocalizedName(branch)

                return (
                  <div
                    key={branch._id || branch.city}
                    className="rounded-3xl bg-white border border-slate-200/90 hover:border-orange-400/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-6 sm:p-7 shadow-sm hover:shadow-xl group"
                  >
                    {/* Branch Title Container (Consistent Height for Perfect Row Alignment) */}
                    <div className="w-full min-h-[54px] sm:min-h-[60px] flex items-center justify-center mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-[#FF6B00] transition-colors leading-snug text-center">
                        {localizedName}
                      </h3>
                    </div>

                    {/* Branch Image Container with Balanced 4:3 Aspect Ratio */}
                    <div
                      onClick={() => handleBranchClick(branch.city)}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200/80 bg-slate-100 group/img my-auto"
                    >
                      <img
                        src={branch.image || branchJewelNecklace}
                        alt={localizedName}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Floating City Caption */}
                      <div className="absolute bottom-3.5 left-0 right-0 px-4 flex flex-col items-center justify-center text-white text-center">
                        <span className="text-[11px] uppercase font-extrabold tracking-widest text-orange-400 drop-shadow-sm">
                          GoldFin Point
                        </span>
                        <span className="text-base sm:text-lg font-black text-white drop-shadow-md">
                          {branch.city}
                        </span>
                      </div>
                    </div>

                    {/* Action Button (Aligned to Bottom Baseline) */}
                    <div className="mt-6 w-full flex justify-center">
                      <button
                        onClick={() => handleBranchClick(branch.city)}
                        className="w-full sm:w-auto py-3 px-8 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer border-0 shadow-md bg-slate-900 hover:bg-[#FF6B00] text-white hover:shadow-orange-500/20 active:scale-[0.98]"
                      >
                        <span>View {branch.city} Branch</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* SECTION 2: LATEST MACHINERY & APPRAISAL LAB */}
        <section className="flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              STATE-OF-THE-ART INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Appraisal Lab & Vault Facilities
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                ஜெர்மன் XRF தரம் பரிசோதனை கூடம் மற்றும் பெட்டக வசதிகள்
              </span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full mx-auto" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Every GoldFin branch is equipped with German XRF karatmeters and precision micro-balances for 100% transparent purity evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Machine 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                  German XRF Karatmeter
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Non-destructive optical testing determining exact purity (18K, 20K, 22K, 24K) without scratching or melting jewellery.
                </p>
              </div>
            </div>

            {/* Machine 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scale size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Precision Micro Balance
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calibrated to 0.001g with government stamping to ensure absolute weight accuracy and zero discrepancies.
                </p>
              </div>
            </div>

            {/* Machine 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  Multi-Tier Insured Bank Vaults
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Biometric access, 24/7 CCTV surveillance, and 100% national insurance coverage for complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CALL TO ACTION BANNER */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                GOLDFIN BULLION & LOAN DESK
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Instant Cash for Your Gold Jewellery
                <span className="block text-sm sm:text-lg font-semibold text-slate-300 mt-1 font-sans">
                  உங்கள் தங்க நகைகளுக்கு உடனடி ரொக்கப் பணம்
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Visit our nearest branch for instant non-destructive appraisal and immediate cash disbursal. Interactive maps and direct phone lines are available on our Contact page.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <a
                href="tel:+919092548347"
                className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2.5 no-underline cursor-pointer"
              >
                <PhoneCall size={16} />
                <span>Call Us (+91 90925 48347)</span>
              </a>

              <button
                onClick={() => handleBranchClick()}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <MapPin size={15} className="text-[#FF6B00]" />
                <span>Maps & Branch Details</span>
              </button>
            </div>
          </div>
        </section>

        {/* Reusable Trust Banner */}
        <TrustBanner />
      </main>

      {/* Footer via Reusable Component */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onNavigateBranches={onNavigateBranches}
        onNavigateContact={onNavigateContact}
        onScrollToSection={(sectionId) => {
          if (onNavigateHome) {
            onNavigateHome()
            setTimeout(() => {
              const el = document.getElementById(sectionId)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }
        }}
      />
    </div>
  )
}
