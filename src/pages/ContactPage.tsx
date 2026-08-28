import { useState, useRef, useEffect } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Navigation,
  Building2,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'

export interface ContactPageProps {
  initialCity?: string | null
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateContact?: (city?: string) => void
}

interface BranchInfo {
  _id?: string
  id: string
  name: string
  shortName: string
  tag: string
  city: string
  district: string
  pincode: string
  address: string
  landmark: string
  phone: string
  rawPhone: string
  altPhone: string
  email: string
  hours: string
  sundayHours: string
  manager: string
  mapEmbedUrl: string
  directionsUrl: string
  fullMapUrl: string
  features: string[]
}

const mapDbBranchToInfo = (b: any): BranchInfo => {
  const cityKey = (b.city || '').toLowerCase()
  const cleanPhone = (b.phone || '+91 90925 48347')
  const rawPhone = cleanPhone.replace(/[^0-9]/g, '')
  
  let tag = 'AUTHORIZED BRANCH'
  let district = 'Virudhunagar District'
  let pincode = '626123'
  let landmark = 'Near Bus Stand & Main Bazaar'
  let features = ['Instant 15-Minute Gold Loan Sanctions', 'German XRF Purity Karatmeter', 'Safe Insured Bank Vault Storage']

  if (cityKey.includes('sivakasi')) {
    tag = 'HEADQUARTERS & CENTRAL VAULT'
    district = 'Virudhunagar District'
    pincode = '626123'
    landmark = 'Opposite Town Hall, Commercial Street'
    features = ['Central High-Security Insured Vault', 'German XRF Non-Destructive Karatmeter', 'Instant 15-Minute Cash & Bank Payouts']
  } else if (cityKey.includes('srivilliputhur')) {
    tag = 'REGIONAL SERVICE HUB'
    district = 'Virudhunagar District'
    pincode = '626125'
    landmark = 'Near Andal Temple Arch'
    features = ['Instant 15-Minute Gold Loan Sanction', 'Pledged Gold Release Support Desk', 'Safe Insured Custody Lockers']
  } else if (cityKey.includes('puthupatti')) {
    tag = 'AUTHORIZED SERVICE HUB'
    district = 'Virudhunagar District'
    pincode = '626130'
    landmark = 'Near Bus Stand, Main Road'
    features = ['Community Gold Loan Desk', 'Doorstep Valuation Support', 'Direct Spot Settlement']
  } else if (cityKey.includes('rajapalayam')) {
    tag = 'COMMERCIAL BULLION DESK'
    district = 'Virudhunagar District'
    pincode = '626117'
    landmark = 'Near PACR Hospital Junction'
    features = ['High-Value SME Gold Loan Desks', 'Spot Gold Buying with Instant Settlement', 'Certified BIS Hallmarking Verification']
  } else if (cityKey.includes('chennai')) {
    tag = 'METROPOLITAN GOLD DESK'
    district = 'Chennai District'
    pincode = '600017'
    landmark = 'Near Panagal Park & Usman Road Commercial Hub'
    features = ['High-Value Spot Gold Sanctions', 'German XRF Optical Karatmeter', 'VIP Dedicated Loan Appraisal Desk']
  }

  const mapQuery = encodeURIComponent(`${b.name || b.city}, ${b.address || ''}, ${b.city}, Tamil Nadu`)

  return {
    _id: b._id,
    id: b._id || cityKey,
    name: b.name,
    shortName: `${b.city} Branch`,
    tag,
    city: b.city,
    district,
    pincode,
    address: b.address,
    landmark,
    phone: cleanPhone,
    rawPhone,
    altPhone: '04562 - 224834',
    email: b.email || `${cityKey}@goldfin.in`,
    hours: b.operatingHours || 'Mon–Sat: 9:00 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    manager: b.managerName || 'Branch Head',
    mapEmbedUrl: `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
    fullMapUrl: b.mapUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    features,
  }
}

const FALLBACK_BRANCHES: BranchInfo[] = [
  {
    id: 'sivakasi',
    name: 'Sivakasi Main Branch & Vault',
    shortName: 'Sivakasi Branch',
    tag: 'HEADQUARTERS & CENTRAL VAULT',
    city: 'Sivakasi',
    district: 'Virudhunagar District',
    pincode: '626123',
    address: 'No. 42/B, Kamarajar Road, Near Old Bus Stand',
    landmark: 'Opposite Town Hall, Commercial Street',
    phone: '+91 90925 48347',
    rawPhone: '9092548347',
    altPhone: '04562 - 224834',
    email: 'sivakasi@goldfin.in',
    hours: 'Mon–Sat: 9:00 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    manager: 'R. Senthil Kumar (Branch Head)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Sivakasi,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sivakasi,+Tamil+Nadu',
    fullMapUrl: 'https://www.google.com/maps/search/?api=1&query=Sivakasi,+Tamil+Nadu',
    features: [
      'Central High-Security Insured Vault',
      'German XRF Non-Destructive Karatmeter',
      'Instant 15-Minute Cash & Bank Payouts'
    ]
  },
  {
    id: 'srivilliputhur',
    name: 'Srivilliputhur Branch',
    shortName: 'Srivilliputhur Branch',
    tag: 'REGIONAL SERVICE HUB',
    city: 'Srivilliputhur',
    district: 'Virudhunagar District',
    pincode: '626125',
    address: 'No. 18, Madurai Main Road, Near Andal Temple Arch',
    landmark: 'Opposite Car Street Junction, Madurai Road',
    phone: '+91 90925 48348',
    rawPhone: '9092548348',
    altPhone: '04563 - 261848',
    email: 'srivilliputhur@goldfin.in',
    hours: 'Mon–Sat: 9:30 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    manager: 'M. Anandha Krishnan (Branch Manager)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Srivilliputhur,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Srivilliputhur,+Tamil+Nadu',
    fullMapUrl: 'https://www.google.com/maps/search/?api=1&query=Srivilliputhur,+Tamil+Nadu',
    features: [
      'Instant 15-Minute Gold Loan Sanction',
      'Pledged Gold Release Support Desk',
      'Safe Insured Custody Lockers'
    ]
  },
  {
    id: 'puthupatti',
    name: 'M.Puthupatti Branch',
    shortName: 'M.Puthupatti Branch',
    tag: 'AUTHORIZED SERVICE HUB',
    city: 'M.Puthupatti',
    district: 'Virudhunagar District',
    pincode: '626130',
    address: 'Main Road Junction, Near Bus Stand, M.Puthupatti',
    landmark: 'Opposite Primary Agricultural Bank',
    phone: '+91 90925 48346',
    rawPhone: '9092548346',
    altPhone: '04562 - 289346',
    email: 'puthupatti@goldfin.in',
    hours: 'Mon–Sat: 9:30 AM – 6:00 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    manager: 'P. Murugan (Branch Officer)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=M.Puthupatti,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=M.Puthupatti,+Tamil+Nadu',
    fullMapUrl: 'https://www.google.com/maps/search/?api=1&query=M.Puthupatti,+Tamil+Nadu',
    features: [
      'Community Gold Loan Desk',
      'Doorstep Valuation Support',
      'Direct Spot Settlement'
    ]
  },
  {
    id: 'rajapalayam',
    name: 'Rajapalayam Branch',
    shortName: 'Rajapalayam Branch',
    tag: 'COMMERCIAL BULLION DESK',
    city: 'Rajapalayam',
    district: 'Virudhunagar District',
    pincode: '626117',
    address: 'No. 85, Tenkasi Main Road, PACR Hospital Junction',
    landmark: 'Near Railway Feeder Road & PACR Hospital',
    phone: '+91 90925 48349',
    rawPhone: '9092548349',
    altPhone: '04563 - 225349',
    email: 'rajapalayam@goldfin.in',
    hours: 'Mon–Sat: 9:30 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    manager: 'K. Vigneshwaran (Branch Manager)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Rajapalayam,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rajapalayam,+Tamil+Nadu',
    fullMapUrl: 'https://www.google.com/maps/search/?api=1&query=Rajapalayam,+Tamil+Nadu',
    features: [
      'High-Value SME Gold Loan Desks',
      'Spot Gold Buying with Instant Settlement',
      'Certified BIS Hallmarking Verification'
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai Metro Central Desk',
    shortName: 'Chennai Branch',
    tag: 'METROPOLITAN GOLD DESK',
    city: 'Chennai',
    district: 'Chennai District',
    pincode: '600017',
    address: 'No. 12, Usman Road, Near Panagal Park, T. Nagar',
    landmark: 'Opposite T. Nagar Bus Terminus & Jewellery Hub',
    phone: '+91 90925 48347',
    rawPhone: '9092548347',
    altPhone: '044 - 2434 5678',
    email: 'chennai@goldfin.in',
    hours: 'Mon–Sat: 9:30 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    manager: 'S. Rajendran (Regional Head)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=T.+Nagar,+Chennai,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=T.+Nagar,+Chennai,+Tamil+Nadu',
    fullMapUrl: 'https://www.google.com/maps/search/?api=1&query=T.+Nagar,+Chennai,+Tamil+Nadu',
    features: [
      'High-Value Spot Gold Sanctions',
      'German XRF Optical Karatmeter',
      'VIP Dedicated Loan Appraisal Desk'
    ]
  }
]

export default function ContactPage({
  initialCity,
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: ContactPageProps) {
  const [branches, setBranches] = useState<BranchInfo[]>(FALLBACK_BRANCHES)
  const [selectedBranchId, setSelectedBranchId] = useState<string>('')
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null)

  const showcaseMapRef = useRef<HTMLDivElement | null>(null)

  const selectBranchByCityOrId = (cityOrId: string, branchList: BranchInfo[]) => {
    if (!cityOrId || branchList.length === 0) return
    const q = cityOrId.toLowerCase().trim()
    const matched = branchList.find(
      (b) =>
        b.id.toLowerCase() === q ||
        (b._id && b._id.toLowerCase() === q) ||
        b.city.toLowerCase() === q ||
        b.city.toLowerCase().includes(q) ||
        q.includes(b.city.toLowerCase()) ||
        b.name.toLowerCase().includes(q)
    )
    if (matched) {
      setSelectedBranchId(matched.id)
    }
  }

  useEffect(() => {
    const hash = window.location.hash
    const queryStr = hash.includes('?') ? hash.split('?')[1] : ''
    const params = new URLSearchParams(queryStr)
    const targetCity = initialCity || params.get('city') || params.get('branch') || localStorage.getItem('selectedContactBranch')

    fetch('/api/branches')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data
            .filter((b: any) => b.isActive !== false)
            .map(mapDbBranchToInfo)
          setBranches(mapped)
          if (targetCity) {
            selectBranchByCityOrId(targetCity, mapped)
          } else if (mapped.length > 0) {
            setSelectedBranchId(mapped[0].id)
          }
        } else {
          if (targetCity) {
            selectBranchByCityOrId(targetCity, FALLBACK_BRANCHES)
          } else {
            setSelectedBranchId(FALLBACK_BRANCHES[0].id)
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load branches for contact page:', err)
        if (targetCity) {
          selectBranchByCityOrId(targetCity, FALLBACK_BRANCHES)
        } else {
          setSelectedBranchId(FALLBACK_BRANCHES[0].id)
        }
      })
  }, [initialCity])

  useEffect(() => {
    if (initialCity && branches.length > 0) {
      selectBranchByCityOrId(initialCity, branches)
    }
  }, [initialCity, branches])

  const activeBranch = branches.find((b) => b.id === selectedBranchId) || branches[0] || FALLBACK_BRANCHES[0]

  const handleSelectBranch = (branchId: string, shouldScrollToMap = false) => {
    setSelectedBranchId(branchId)
    const b = branches.find((item) => item.id === branchId)
    if (b) {
      localStorage.setItem('selectedContactBranch', b.city)
      window.history.replaceState(null, '', `#contact?city=${encodeURIComponent(b.city)}`)
    }
    if (shouldScrollToMap && showcaseMapRef.current) {
      showcaseMapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCopyPhone = (id: string, rawPhone: string) => {
    navigator.clipboard?.writeText(rawPhone)
    setCopiedPhoneId(id)
    setTimeout(() => setCopiedPhoneId(null), 2000)
  }

  const getLocalizedName = (b: BranchInfo) => {
    const c = b.city.toLowerCase()
    if (c.includes('sivakasi')) return 'Sivakasi Main Branch & Vault'
    if (c.includes('srivilliputhur')) return 'Srivilliputhur Branch'
    if (c.includes('puthupatti')) return 'M.Puthupatti Rural Center'
    if (c.includes('rajapalayam')) return 'Rajapalayam Branch'
    if (c.includes('chennai')) return 'Chennai Metro Desk'
    return `${b.name} (${b.city})`
  }

  const getLocalizedAddress = (b: BranchInfo) => {
    return b.address
  }

  const getLocalizedLandmark = (b: BranchInfo) => {
    return b.landmark
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Ambient background decoration */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="contact"
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

      {/* Main Content Container */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-10 md:py-14 relative z-10 w-full flex flex-col gap-12 md:gap-16">
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">Contact & Branch Maps</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase shadow-sm">
                <Sparkles size={14} />
                <span>AUTHORIZED BRANCHES & LIVE MAPS</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
                Get in Touch{' '}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  Directly
                </span>
                <span className="block text-sm sm:text-lg font-semibold text-slate-500 mt-2 font-sans">
                  உங்கள் அருகிலுள்ள மண்டல கிளையை தொடர்புகொள்ளவும்
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* SECTION 1: DYNAMIC BRANCH SELECTION TABS */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              SELECT ACTIVE BRANCH
            </span>
            <span className="text-xs text-orange-600 font-bold">
              {branches.length} Authorized Locations
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
            {branches.map((branch) => {
              const isSelected = branch.id === selectedBranchId

              return (
                <button
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch.id, false)}
                  className={`px-4 sm:px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white border-orange-500 shadow-md shadow-orange-500/20 scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  <Building2 size={16} className={isSelected ? 'text-white' : 'text-orange-500'} />
                  <span>{branch.city}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION 2: ACTIVE BRANCH SHOWCASE (2 COLUMNS: DETAILS + MAP) */}
        <section ref={showcaseMapRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Branch Comprehensive Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Header Badge Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-700 bg-orange-100/70 border border-orange-200 px-2.5 py-0.5 rounded-full">
                  {activeBranch.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Branch Open</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
                {getLocalizedName(activeBranch)}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="font-semibold text-slate-700">{activeBranch.city}</span>
                <span>•</span>
                <span>{activeBranch.district}</span>
                <span>•</span>
                <span>PIN {activeBranch.pincode}</span>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="flex flex-col gap-3">
              {/* 1. Branch Address */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-white via-white to-orange-50/30 border border-orange-200/70 hover:border-orange-500/50 transition-all flex items-start gap-3.5 shadow-2xs group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-2xs">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    BRANCH ADDRESS & LANDMARK
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {getLocalizedAddress(activeBranch)}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    {getLocalizedLandmark(activeBranch)}, {activeBranch.city} – {activeBranch.pincode}
                  </span>
                </div>
              </div>

              {/* 2. Direct Priority Line */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-white via-white to-orange-50/30 border border-orange-200/70 hover:border-orange-500/50 transition-all flex items-start gap-3.5 shadow-2xs group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-2xs">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    DIRECT DESK PHONE
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <a
                      href={`tel:${activeBranch.rawPhone}`}
                      className="text-sm font-black text-slate-900 hover:text-[#FF6B00] transition-colors no-underline"
                    >
                      {activeBranch.phone}
                    </a>
                    <button
                      onClick={() => handleCopyPhone(activeBranch.id, activeBranch.rawPhone)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-50 hover:bg-orange-500 hover:text-white text-slate-700 transition-colors border border-orange-200 cursor-pointer flex items-center gap-1"
                    >
                      {copiedPhoneId === activeBranch.id ? (
                        <>
                          <Check size={10} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={10} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Manager: {activeBranch.manager}
                  </span>
                </div>
              </div>

              {/* 3. Official Email */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-white via-white to-orange-50/30 border border-orange-200/70 hover:border-orange-500/50 transition-all flex items-start gap-3.5 shadow-2xs group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-2xs">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    OFFICIAL EMAIL
                  </span>
                  <a
                    href={`mailto:${activeBranch.email}`}
                    className="text-sm font-bold text-slate-900 hover:text-[#FF6B00] transition-colors no-underline mt-0.5"
                  >
                    {activeBranch.email}
                  </a>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Fast 30-min response
                  </span>
                </div>
              </div>

              {/* 4. Operating Hours */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-white via-white to-orange-50/30 border border-orange-200/70 hover:border-orange-500/50 transition-all flex items-start gap-3.5 shadow-2xs group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-2xs">
                  <Clock size={18} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    OPERATING HOURS
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {activeBranch.hours}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    {activeBranch.sundayHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Button */}
            <a
              href={activeBranch.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 no-underline cursor-pointer"
            >
              <Navigation size={17} />
              <span>Get Directions to {activeBranch.city} Branch</span>
              <ExternalLink size={14} className="opacity-80" />
            </a>
          </div>

          {/* Right Column: Google Maps Interactive Embed (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sticky top-24">
            <div className="relative rounded-3xl bg-gradient-to-b from-white via-orange-50/15 to-white border border-orange-200/80 shadow-md p-4 sm:p-5 flex flex-col gap-4 overflow-hidden">
              {/* Map Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-orange-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100/70 border border-orange-200 text-orange-600 flex items-center justify-center">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {getLocalizedName(activeBranch)}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {activeBranch.city}, Tamil Nadu
                    </span>
                  </div>
                </div>

                <a
                  href={activeBranch.fullMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 transition-colors flex items-center gap-1.5 no-underline"
                >
                  <span>Open Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-orange-200/80 bg-slate-100 shadow-inner">
                <iframe
                  key={activeBranch.id}
                  title={`${activeBranch.name} Map`}
                  src={activeBranch.mapEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Pin Badge */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-white/95 border border-orange-300 backdrop-blur-md shadow-lg flex items-center gap-2.5 pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
                    <div className="absolute w-4 h-4 rounded-full bg-orange-400 animate-ping opacity-75" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-wider">
                      GOLDFIN {activeBranch.city.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-800 font-bold truncate max-w-[200px]">
                      {getLocalizedAddress(activeBranch)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                {activeBranch.features.map((feat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-orange-50/50 border border-orange-200/70 flex items-center gap-2 text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-[11px] font-medium leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ALL BRANCHES SUMMARY GRID */}
        

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
