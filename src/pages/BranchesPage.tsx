import { useState, useEffect } from 'react'
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Scale,
  Lock,
  PhoneCall,
  MapPin,
  Loader2,
  Video,
  Image as ImageIcon,
  X,
  Phone,
  ZoomIn,
  ChevronLeft
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'
import { useSiteSettings } from '../hooks/useSiteSettings'

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

// Real branch media for Sivakasi
export interface BranchMediaItem {
  id: string
  type: 'image' | 'video'
  title: string
  subtitle: string
  url: string
}

const SIVAKASI_MEDIA: BranchMediaItem[] = [
  {
    id: 'vid-1',
    type: 'video',
    title: 'Sivakasi Branch Facility Tour',
    subtitle: 'Official Branch Video Walkthrough',
    url: '/branches/sivakasi/sivakasi_vid_3.mp4',
  },
  {
    id: 'vid-2',
    type: 'video',
    title: 'Counter & Customer Appraisal Desk',
    subtitle: 'Inside Valuation & Gold Desk',
    url: '/branches/sivakasi/sivakasi_vid_2.mp4',
  },
  {
    id: 'vid-3',
    type: 'video',
    title: 'Branch Front Walkthrough',
    subtitle: 'Street Entrance Walk-in View',
    url: '/branches/sivakasi/sivakasi_vid_1.mp4',
  },
  {
    id: 'img-1',
    type: 'image',
    title: 'Mahes Bankers Sivakasi Entrance & Board',
    subtitle: 'No. 2005/1, P.K.N. Road, Sivakasi - 626 189',
    url: '/branches/sivakasi/sivakasi_img_1.jpg',
  },
  {
    id: 'img-2',
    type: 'image',
    title: 'Sivakasi Front Customer Desk',
    subtitle: 'Ground-Floor Service Counter & Customer Lounge',
    url: '/branches/sivakasi/sivakasi_img_2.jpg',
  }
]

export const SIVAKASI_PHOTOS = SIVAKASI_MEDIA.filter((m) => m.type === 'image')

const BRANCH_IMAGES: Record<string, string> = {
  sivakasi: '/branches/sivakasi/sivakasi_img_2.jpg',
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
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahes Bankers'
  const [branches, setBranches] = useState<BranchItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showSivakasiModal, setShowSivakasiModal] = useState(false)
  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'videos' | 'photos'>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const loadBranches = () => {
    fetch('/api/branches')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const activeBranches = json.data
            .filter((b: any) => b.isActive !== false)
            .map((b: any) => ({
              _id: b._id,
              id: b._id,
              name: b.name,
              subtitle: `${companyName} ${b.city}`,
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
  }

  useEffect(() => {
    loadBranches()

    const handleUpdate = () => loadBranches()
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'goldFin_branches_updated') loadBranches()
    }

    window.addEventListener('branchesUpdated', handleUpdate)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('branchesUpdated', handleUpdate)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : SIVAKASI_PHOTOS.length - 1))
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < SIVAKASI_PHOTOS.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  const handleBranchClick = (city?: string) => {
    if (city && city.toLowerCase().includes('sivakasi')) {
      setShowSivakasiModal(true)
      return
    }
    navigateToContact(city)
  }

  const navigateToContact = (city?: string) => {
    if (city) {
      localStorage.setItem('selectedContactBranch', city)
    }
    if (onNavigateContact) {
      onNavigateContact(city)
    } else {
      window.history.pushState(null, '', city ? `/contact?city=${encodeURIComponent(city)}` : '/contact')
      window.dispatchEvent(new PopStateEvent('popstate'))
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
                    className="rounded-3xl bg-gradient-to-b from-white via-white to-orange-50/35 border border-orange-200/80 hover:border-orange-400/80 transition-all duration-300 overflow-hidden flex flex-col justify-between p-6 sm:p-7 shadow-xs hover:shadow-[0_12px_35px_rgba(249,115,22,0.12)] group"
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
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-orange-200/70 bg-slate-100 group/img my-auto"
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
                          {companyName} Point
                        </span>
                        <span className="text-base sm:text-lg font-black text-white drop-shadow-md">
                          {branch.city}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons (Aligned to Bottom Baseline) */}
                    <div className="mt-6 w-full flex justify-center">
                      {branch.city.toLowerCase().includes('sivakasi') ? (
                        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full justify-center">
                          <button
                            type="button"
                            onClick={() => setShowSivakasiModal(true)}
                            className="w-full sm:w-auto py-3 px-5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border-0 shadow-md bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white hover:brightness-110 active:scale-[0.98]"
                          >
                            <Video size={14} />
                            <span>View Photos & Videos (5)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => navigateToContact(branch.city)}
                            className="w-full sm:w-auto py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 bg-white hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] active:scale-[0.98]"
                          >
                            <span>Map & Info</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleBranchClick(branch.city)}
                          className="w-full sm:w-auto py-3 px-8 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer border-0 shadow-md bg-slate-900 hover:bg-[#FF6B00] text-white hover:shadow-orange-500/20 active:scale-[0.98]"
                        >
                          <span>View {branch.city} Branch</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
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
              Every {companyName} branch is equipped with German XRF karatmeters and precision micro-balances for 100% transparent purity evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Machine 1 */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 shadow-xs hover:shadow-[0_10px_25px_rgba(249,115,22,0.1)] transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
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
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 shadow-xs hover:shadow-[0_10px_25px_rgba(249,115,22,0.1)] transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
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
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 shadow-xs hover:shadow-[0_10px_25px_rgba(249,115,22,0.1)] transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                {companyName.toUpperCase()} BULLION & LOAN DESK
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
                href={`tel:${(settings.contactPhone || '+91 90925 48347').replace(/[^0-9+]/g, '')}`}
                className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2.5 no-underline cursor-pointer"
              >
                <PhoneCall size={16} />
                <span>Call Us ({settings.contactPhone || '+91 90925 48347'})</span>
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

      {/* Sivakasi Branch Media Modal (2 Images & 3 Videos) */}
      {showSivakasiModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowSivakasiModal(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-orange-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-500 via-[#FF6B00] to-amber-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
                  <Video size={20} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded-full">
                      HQ & Vault
                    </span>
                    <span className="text-xs font-semibold text-orange-100">
                      Virudhunagar District
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    Sivakasi Main Branch — Store Photos & Video Walkthrough
                  </h3>
                  <p className="text-xs text-orange-100 mt-0.5">
                    No. 2005/1, P.K.N. Road, Sivakasi - 626 189 • Ph: 88385 43387
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSivakasiModal(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors border-0 cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Filter Tabs */}
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMediaFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                    activeMediaFilter === 'all'
                      ? 'bg-[#FF6B00] text-white border-orange-500 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  All Media (5)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaFilter('videos')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    activeMediaFilter === 'videos'
                      ? 'bg-[#FF6B00] text-white border-orange-500 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <Video size={13} />
                  <span>Videos (3)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaFilter('photos')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    activeMediaFilter === 'photos'
                      ? 'bg-[#FF6B00] text-white border-orange-500 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <ImageIcon size={13} />
                  <span>Photos (2)</span>
                </button>
              </div>

              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                Click any video to play or view photos
              </span>
            </div>

            {/* Modal Media Scrollable Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-180px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SIVAKASI_MEDIA
                  .filter((item) =>
                    activeMediaFilter === 'all'
                      ? true
                      : activeMediaFilter === 'videos'
                      ? item.type === 'video'
                      : item.type === 'image'
                  )
                  .map((item) => {
                    if (item.type === 'video') {
                      return (
                        <div key={item.id} className="flex flex-col gap-2 rounded-2xl bg-slate-900 border border-slate-800 p-2.5 shadow-md">
                          <div className="relative aspect-[9/16] sm:aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                            <video
                              src={item.url}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="px-1 py-1">
                            <div className="flex items-center gap-1.5 text-orange-400 text-[11px] font-bold">
                              <Video size={12} />
                              <span>Video Tour</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-black text-white leading-snug mt-0.5">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">{item.subtitle}</p>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          const idx = SIVAKASI_PHOTOS.findIndex((p) => p.id === item.id)
                          setLightboxIndex(idx >= 0 ? idx : 0)
                        }}
                        className="flex flex-col gap-2 rounded-2xl bg-white border border-orange-200/80 hover:border-orange-500/80 p-2.5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 group/img">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <span className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
                              <ZoomIn size={14} className="text-[#FF6B00]" />
                              <span>Click to enlarge</span>
                            </span>
                          </div>
                        </div>
                        <div className="px-1 py-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-orange-600 text-[11px] font-bold">
                              <ImageIcon size={12} />
                              <span>Store Photo</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-orange-600 transition-colors flex items-center gap-0.5">
                              <ZoomIn size={11} />
                              <span>Enlarge</span>
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug mt-0.5">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Phone size={14} className="text-emerald-600 shrink-0" />
                <span>Call Branch: <a href="tel:8838543387" className="font-bold text-slate-900 hover:text-orange-600">88385 43387</a></span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowSivakasiModal(false)
                    navigateToContact('Sivakasi')
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#FF6B00] text-white text-xs font-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-0 shadow-sm"
                >
                  <MapPin size={13} />
                  <span>View Map & Contact Details</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {lightboxIndex !== null && SIVAKASI_PHOTOS[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-fadeIn select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar Floating Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-md">
              {lightboxIndex + 1} / {SIVAKASI_PHOTOS.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg active:scale-95"
              aria-label="Close full screen view"
            >
              <X size={22} />
            </button>
          </div>

          {/* Previous Image Arrow */}
          {SIVAKASI_PHOTOS.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : SIVAKASI_PHOTOS.length - 1))
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-xl active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev !== null && prev < SIVAKASI_PHOTOS.length - 1 ? prev + 1 : 0))
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-xl active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Center Image Container */}
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 bg-black/40 flex items-center justify-center max-h-[78vh]">
              <img
                src={SIVAKASI_PHOTOS[lightboxIndex].url}
                alt={SIVAKASI_PHOTOS[lightboxIndex].title}
                className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-2xl"
              />
            </div>

            {/* Bottom Caption Bar */}
            <div className="mt-3 text-center px-4 max-w-2xl">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                {SIVAKASI_PHOTOS[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 font-medium">
                {SIVAKASI_PHOTOS[lightboxIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

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
