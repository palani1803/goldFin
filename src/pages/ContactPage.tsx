import { useState, useRef } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Building2,
  CheckCircle2,
  PhoneCall,
  Copy,
  Check
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'
import { useLanguage } from '../i18n'

export interface ContactPageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateContact?: () => void
}

interface BranchInfo {
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

const ALL_BRANCH_CONTACTS: BranchInfo[] = [
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
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=No.+42%2FB,+Kamarajar+Road,+Near+Old+Bus+Stand,+Sivakasi,+Tamil+Nadu+626123',
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
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=No.+18,+Madurai+Main+Road,+Near+Andal+Temple+Arch,+Srivilliputhur,+Tamil+Nadu+626125',
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
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=No.+85,+Tenkasi+Main+Road,+PACR+Hospital+Junction,+Rajapalayam,+Tamil+Nadu+626117',
    fullMapUrl: 'https://www.google.com/maps/search/?api=1&query=Rajapalayam,+Tamil+Nadu',
    features: [
      'High-Value SME Gold Loan Desks',
      'Spot Gold Buying with Instant Settlement',
      'Certified BIS Hallmarking Verification'
    ]
  },
  {
    id: 'alangulam',
    name: 'Alangulam Branch',
    shortName: 'Alangulam Branch',
    tag: 'EXPRESS ADVISORY DESK',
    city: 'Alangulam',
    district: 'Tenkasi District',
    pincode: '627851',
    address: 'Tenkasi Highway Road, Near Market Square, Alangulam',
    landmark: 'Near Bus Stand & Main Bazaar',
    phone: '+91 90925 48345',
    rawPhone: '9092548345',
    altPhone: '04633 - 271345',
    email: 'alangulam@goldfin.in',
    hours: 'Mon–Sat: 9:30 AM – 6:00 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    manager: 'S. Rajesh (Branch Officer)',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Alangulam,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Alangulam,+Tamil+Nadu',
    fullMapUrl: 'https://www.google.com/maps/search/?api=1&query=Alangulam,+Tamil+Nadu',
    features: [
      'Express Gold Appraisal Desk',
      'Low Interest Rate Gold Loans',
      'Quick Pledged Gold Release'
    ]
  }
]

export default function ContactPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: ContactPageProps) {
  const { t, isTamil } = useLanguage()
  const [selectedBranchId, setSelectedBranchId] = useState<string>('sivakasi')
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null)

  const showcaseMapRef = useRef<HTMLDivElement | null>(null)

  const activeBranch = ALL_BRANCH_CONTACTS.find((b) => b.id === selectedBranchId) || ALL_BRANCH_CONTACTS[0]

  const handleSelectBranch = (branchId: string, shouldScrollToMap = false) => {
    setSelectedBranchId(branchId)
    if (shouldScrollToMap && showcaseMapRef.current) {
      showcaseMapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCopyPhone = (id: string, rawPhone: string) => {
    navigator.clipboard?.writeText(rawPhone)
    setCopiedPhoneId(id)
    setTimeout(() => setCopiedPhoneId(null), 2000)
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
              {t('navHome')}
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">{isTamil ? 'தொடர்பு & கிளை வரைபடம்' : 'Contact & Branch Locations'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase shadow-sm">
                <Sparkles size={14} />
                <span>{isTamil ? 'அதிகாரப்பூர்வ கிளைகள் & வரைபட விவரங்கள்' : 'AUTHORIZED BRANCHES & INTERACTIVE LOCATION MAPS'}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                {isTamil ? (
                  <>
                    எங்கள் கிளைகளை <br />
                    <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                      தொடர்பு கொள்ளவும்
                    </span>
                  </>
                ) : (
                  <>
                    Contact Our <br />
                    <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                      Branch Network
                    </span>
                  </>
                )}
              </h1>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed">
                {isTamil
                  ? 'எங்கள் கிளை மேலாளர்களை நேரடியாக தொடர்பு கொள்ளுங்கள் அல்லது கீழே உள்ள ஊடாடும் கூகிள் வரைபடத்தை பயன்படுத்தி நேரில் வாருங்கள்.'
                  : 'Connect directly with our branch managers, visit our bank-grade secure vaults, or view the live interactive Google Map for each branch below.'}
              </p>
            </div>

            {/* Quick Central Help Desk Pill */}
            <div className="p-3.5 px-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3.5 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <PhoneCall size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  {isTamil ? 'தலைமை உதவி மையம்' : 'CENTRAL TOLL-FREE DESK'}
                </span>
                <a
                  href="tel:+919092548347"
                  className="text-sm font-black text-slate-900 hover:text-orange-600 transition-colors no-underline"
                >
                  +91 90925 48347
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE BRANCH MAP & DETAILS SHOWCASE */}
        <div ref={showcaseMapRef} className="flex flex-col gap-6 scroll-mt-24">
          {/* Branch Navigation Tab Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-slate-500">
              <Building2 size={16} className="text-orange-500" />
              <span>{isTamil ? 'வரைபடம் & விவரங்களை காண கிளையைத் தேர்ந்தெடுக்கவும்:' : 'Select Branch for Map & Details:'}</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {ALL_BRANCH_CONTACTS.map((branch) => {
                const isActive = selectedBranchId === branch.id
                return (
                  <button
                    key={branch.id}
                    onClick={() => handleSelectBranch(branch.id)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap border-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white shadow-md shadow-orange-500/20'
                        : 'bg-slate-100/80 hover:bg-orange-50 text-slate-700 hover:text-[#FF6B00]'
                    }`}
                  >
                    <MapPin size={13} className={isActive ? 'text-white' : 'text-orange-500'} />
                    <span>{branch.city}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2-Column Main Showcase Grid (Contact Info on Left, Live Map on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Active Branch Contact Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {/* Branch Header Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                    {activeBranch.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isTamil ? 'கிளை திறந்துள்ளது' : 'Branch Open'}</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isTamil
                    ? (activeBranch.id === 'sivakasi' ? t('branchSivakasiName') : activeBranch.id === 'srivilliputhur' ? t('branchSrivilliputhurName') : activeBranch.id === 'puthupatti' ? t('branchPuthupattiName') : activeBranch.id === 'rajapalayam' ? t('branchRajapalayamName') : t('branchAlangulamName'))
                    : activeBranch.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="font-semibold text-slate-700">{activeBranch.city}</span>
                  <span>•</span>
                  <span>{activeBranch.district}</span>
                  <span>•</span>
                  <span>PIN {activeBranch.pincode}</span>
                </div>
              </div>

              {/* 5 Contact Information Cards */}
              <div className="flex flex-col gap-3">
                {/* 1. Branch Address */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-3.5 shadow-sm group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                      {isTamil ? 'கிளை முகவரி & முக்கிய அடையாளம்' : 'BRANCH ADDRESS & LANDMARK'}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {isTamil
                        ? (activeBranch.id === 'sivakasi' ? t('branchSivakasiAddress') : activeBranch.id === 'srivilliputhur' ? t('branchSrivilliputhurAddress') : activeBranch.id === 'puthupatti' ? t('branchPuthupattiAddress') : activeBranch.id === 'rajapalayam' ? t('branchRajapalayamAddress') : t('branchAlangulamAddress'))
                        : activeBranch.address}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {isTamil
                        ? (activeBranch.id === 'sivakasi' ? t('branchSivakasiLandmark') : activeBranch.id === 'srivilliputhur' ? t('branchSrivilliputhurLandmark') : activeBranch.id === 'puthupatti' ? t('branchPuthupattiLandmark') : activeBranch.id === 'rajapalayam' ? t('branchRajapalayamLandmark') : t('branchAlangulamLandmark'))
                        : activeBranch.landmark}, {activeBranch.city} – {activeBranch.pincode}
                    </span>
                  </div>
                </div>

                {/* 2. Direct Priority Line */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-3.5 shadow-sm group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                      {isTamil ? 'நேரடி தொலைபேசி எண்' : 'DIRECT DESK PHONE'}
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
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 transition-colors border border-slate-200 cursor-pointer flex items-center gap-1"
                      >
                        {copiedPhoneId === activeBranch.id ? (
                          <>
                            <Check size={10} />
                            <span>{isTamil ? 'நகலெடுக்கப்பட்டது' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={10} />
                            <span>{isTamil ? 'நகலெடு' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {isTamil ? 'நிலையான எண் (Landline):' : 'Landline:'} <span className="font-semibold text-slate-700">{activeBranch.altPhone}</span>
                    </span>
                  </div>
                </div>

                {/* 3. Digital Concierge & Email */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-3.5 shadow-sm group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                      {isTamil ? 'மின்னஞ்சல் & டிஜிட்டல் உதவி' : 'BRANCH EMAIL & DIGITAL DESK'}
                    </span>
                    <a
                      href={`mailto:${activeBranch.email}`}
                      className="text-sm font-black text-slate-900 hover:text-[#FF6B00] transition-colors mt-0.5 no-underline"
                    >
                      {activeBranch.email}
                    </a>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {isTamil ? 'தலைமை உதவி மையம்:' : 'Central Helpdesk:'} <span className="text-slate-700 font-medium">support@goldfin.in</span>
                    </span>
                  </div>
                </div>

                {/* 4. WhatsApp Business */}
                <a
                  href={`https://wa.me/91${activeBranch.rawPhone}?text=${encodeURIComponent(
                    `Hi GoldFin ${activeBranch.city} Branch, I would like to inquire about gold services and live rates.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/40 transition-all flex items-start gap-3.5 shadow-sm group no-underline cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#25D366] group-hover:to-[#128C7E] group-hover:text-white transition-all shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">
                      {isTamil ? 'வாட்ஸ்அப் உதவி மையம்' : 'WHATSAPP BRANCH DESK'}
                    </span>
                    <span className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors mt-0.5">
                      {activeBranch.phone}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {isTamil ? `${activeBranch.city} கிளை அலுவலர்களுடன் நேரடியாக தொடர்பு கொள்ளவும்` : `Chat directly with ${activeBranch.city} branch officers`}
                    </span>
                  </div>
                </a>

                {/* 5. Business Hours & Manager */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-3.5 shadow-sm group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                    <Clock size={18} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                      {isTamil ? 'வேலை நேரம் & கிளை அலுவலர்' : 'BUSINESS HOURS & IN-CHARGE'}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {isTamil ? 'திங்கள்–சனி: காலை 9:00 – மாலை 6:30' : activeBranch.hours}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {isTamil ? 'பொறுப்பு அலுவலர்:' : 'Officer:'} <span className="font-semibold text-slate-700">{activeBranch.manager}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <a
                  href={activeBranch.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(249,115,22,0.3)] no-underline flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Navigation size={14} />
                  <span>{isTamil ? 'வழி பார்க்க' : 'Directions'}</span>
                </a>
                <a
                  href={`tel:${activeBranch.rawPhone}`}
                  className="py-3 px-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:border-orange-500/40 hover:text-[#FF6B00] font-bold text-xs transition-all no-underline flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-center"
                >
                  <Phone size={14} className="text-[#FF6B00]" />
                  <span>{isTamil ? 'கிளையை அழைக்க' : 'Call Branch'}</span>
                </a>
                <a
                  href={`https://wa.me/91${activeBranch.rawPhone}?text=${encodeURIComponent(
                    `Hi GoldFin ${activeBranch.city} Branch, I would like to inquire about gold loan.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-[#25D366] text-white hover:brightness-110 font-bold text-xs transition-all no-underline flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(37,211,102,0.25)] text-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Interactive Google Map for Active Branch */}
            <div className="lg:col-span-7 relative flex flex-col h-full min-h-[580px]">
              {/* Ambient Map Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-200/30 via-amber-100/30 to-orange-200/20 blur-xl pointer-events-none" />

              {/* Map Card Wrapper */}
              <div className="relative h-full w-full rounded-3xl bg-white border border-slate-200/80 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden p-4 sm:p-5 gap-4">
                {/* Map Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {isTamil
                          ? (activeBranch.id === 'sivakasi' ? t('branchSivakasiName') : activeBranch.id === 'srivilliputhur' ? t('branchSrivilliputhurName') : activeBranch.id === 'puthupatti' ? t('branchPuthupattiName') : activeBranch.id === 'rajapalayam' ? t('branchRajapalayamName') : t('branchAlangulamName'))
                          : activeBranch.name} {isTamil ? 'வரைபடம்' : 'Map'}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {activeBranch.city}, {activeBranch.district} • PIN {activeBranch.pincode}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{isTamil ? 'நேரடி இருப்பிடம்' : 'Live Location'}</span>
                    </span>
                    <a
                      href={activeBranch.fullMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 transition-colors flex items-center gap-1 no-underline"
                    >
                      <span>{isTamil ? 'முழு வரைபடம்' : 'Full Map'}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Interactive Google Map of Selected Branch */}
                <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                  <iframe
                    key={activeBranch.id}
                    title={`${activeBranch.name} Map`}
                    src={activeBranch.mapEmbedUrl}
                    className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Floating Gold Branch Pin Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-white/95 border border-orange-300 backdrop-blur-md shadow-lg flex items-center gap-2.5 pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
                      <div className="absolute w-4 h-4 rounded-full bg-orange-400 animate-ping opacity-75" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-wider">
                        GOLDFIN {activeBranch.city.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-slate-800 font-bold">
                        {isTamil
                          ? (activeBranch.id === 'sivakasi' ? t('branchSivakasiAddress') : activeBranch.id === 'srivilliputhur' ? t('branchSrivilliputhurAddress') : activeBranch.id === 'puthupatti' ? t('branchPuthupattiAddress') : activeBranch.id === 'rajapalayam' ? t('branchRajapalayamAddress') : t('branchAlangulamAddress'))
                          : activeBranch.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Feature & Navigation Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-slate-700">
                    <ShieldCheck size={16} className="text-[#FF6B00] shrink-0" />
                    <span className="text-[11px] font-medium leading-tight">
                      {isTamil ? '100% காப்பீடு செய்யப்பட்ட வங்கி லாக்கர்' : '100% Insured Bank Vault Storage'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-slate-700">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="text-[11px] font-medium leading-tight">
                      {isTamil ? 'உடனடி 15 நிமிட கடன் அனுமதி' : 'Instant 15-Min Loan Sanctions'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-slate-700">
                    <Sparkles size={16} className="text-orange-500 shrink-0" />
                    <span className="text-[11px] font-medium leading-tight">
                      {isTamil ? 'BIS ஹால்மார்க் நேரடி மதிப்பீடு' : 'BIS Hallmarking Live Appraisals'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ALL REGIONAL BRANCHES DIRECTORY (NEAT ALIGNMENT) */}
        

        {/* Trust Banner Component */}
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
