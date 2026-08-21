import { useState, useRef } from 'react'
import {
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Coins,
  ArrowRight,
  Scale,
  Zap,
  Lock,
  PhoneCall,
  Search
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'

export interface BranchesPageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateContact?: () => void
}

interface Branch {
  id: string
  name: string
  tag: string
  distance: string
  address: string
  landmark: string
  pincode: string
  city: string
  phone: string
  altPhone: string
  email: string
  hours: string
  sundayHours: string
  mapQuery: string
  mapEmbedUrl: string
  features: string[]
  manager: string
}

const BRANCHES_DATA: Branch[] = [
  {
    id: 'sivakasi',
    name: 'Sivakasi Main Branch & Vault',
    tag: 'HEADQUARTERS & CENTRAL VAULT',
    distance: 'Main Hub',
    address: 'No. 42/B, Kamarajar Road, Near Old Bus Stand',
    landmark: 'Opposite Town Hall, Commercial Street',
    pincode: '626123',
    city: 'Sivakasi',
    phone: '+91 90925 48347',
    altPhone: '04562 - 224834',
    email: 'sivakasi@goldfin.in',
    hours: 'Mon – Sat: 9:00 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    mapQuery: 'Kamarajar+Road+Sivakasi+Tamil+Nadu',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Sivakasi,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    features: [
      'Central High-Security Vault',
      'German XRF Purity Karatmeter',
      'Instant Cash & NEFT Payouts',
      'Pledged Gold Loan Release Desk',
      'Free Gold Valuation Desk'
    ],
    manager: 'R. Senthil Kumar (Branch Head)'
  },
  {
    id: 'srivilliputhur',
    name: 'Srivilliputhur Branch',
    tag: 'REGIONAL SERVICE HUB',
    distance: '19 km from Sivakasi',
    address: 'No. 18, Madurai Main Road, Near Andal Temple Arch',
    landmark: 'Opposite Car Street Junction, Madurai Road',
    pincode: '626125',
    city: 'Srivilliputhur',
    phone: '+91 90925 48348',
    altPhone: '04563 - 261848',
    email: 'srivilliputhur@goldfin.in',
    hours: 'Mon – Sat: 9:30 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    mapQuery: 'Srivilliputhur+Tamil+Nadu',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Srivilliputhur,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    features: [
      'Instant 15-Minute Gold Loans',
      'Pledged Gold Release Support',
      'Direct Bullion Purchasing Desk',
      'Safe Custody Lockers',
      'Doorstep Gold Pick-up Assistance'
    ],
    manager: 'M. Anandha Krishnan (Branch Manager)'
  },
  {
    id: 'rajapalayam',
    name: 'Rajapalayam Branch',
    tag: 'COMMERCIAL BULLION DESK',
    distance: '25 km from Sivakasi',
    address: 'No. 85, Tenkasi Main Road, PACR Hospital Junction',
    landmark: 'Near Railway Feeder Road & PACR Hospital',
    pincode: '626117',
    city: 'Rajapalayam',
    phone: '+91 90925 48349',
    altPhone: '04563 - 225349',
    email: 'rajapalayam@goldfin.in',
    hours: 'Mon – Sat: 9:30 AM – 6:30 PM',
    sundayHours: 'Sunday: Closed (Digital Desk 24/7)',
    mapQuery: 'Tenkasi+Main+Road+Rajapalayam+Tamil+Nadu',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Rajapalayam,+Tamil+Nadu,+India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    features: [
      'High-Value Gold Loan Sanction',
      'Spot Gold Buying with Instant Settlement',
      'Advanced Non-Destructive Purity Test',
      'Dedicated SME & Business Desk',
      'Pre-closure & Renewal Support'
    ],
    manager: 'K. Vigneshwaran (Branch Manager)'
  }
]

export default function BranchesPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: BranchesPageProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('sivakasi')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null)
  const mapSectionRef = useRef<HTMLDivElement | null>(null)

  const activeBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0]

  const handleSelectBranchAndScroll = (branchId: string) => {
    setSelectedBranchId(branchId)
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard?.writeText(phone.replace(/\s+/g, ''))
    setCopiedPhoneId(id)
    setTimeout(() => setCopiedPhoneId(null), 2000)
  }

  const filteredBranches = BRANCHES_DATA.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pincode.includes(searchQuery)
  )

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Ambient background decoration */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar */}
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
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-10 md:py-14 relative z-10 w-full flex flex-col gap-12 md:gap-16">
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">Our Branches</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase shadow-sm">
                <Sparkles size={14} />
                <span>AUTHORIZED BRANCH NETWORK • SIVAKASI & NEARBY</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                Our Regional{' '}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  Branches
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Visit any of our 3 specialized gold service centers located across the Sivakasi region. Experience
                transparent live gold rates, instant 15-minute gold loan sanction, pledged gold release, and certified
                German XRF purity appraisals.
              </p>
            </div>

            {/* Quick Branch Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Sivakasi, Srivilliputhur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Quick Stats Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Building2 size={20} />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900">3 Branches</div>
                <div className="text-[11px] text-slate-500 font-medium">Sivakasi Region</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900">15 Mins</div>
                <div className="text-[11px] text-slate-500 font-medium">Spot Loan Sanction</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900">100% Insured</div>
                <div className="text-[11px] text-slate-500 font-medium">Bank-Grade Vaults</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Scale size={20} />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900">German XRF</div>
                <div className="text-[11px] text-slate-500 font-medium">0% Damage Purity Test</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: 3 BRANCH CARDS AROUND SIVAKASI */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Branches in Sivakasi & Surrounding Hubs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select any branch below to view its precise location on the interactive map, contact details, and directions.
              </p>
            </div>
            <div className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full w-fit">
              Showing {filteredBranches.length} of 3 Locations
            </div>
          </div>

          {/* Cards Grid (3 Columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredBranches.map((branch) => {
              const isSelected = selectedBranchId === branch.id
              return (
                <div
                  key={branch.id}
                  className={`relative rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-md hover:shadow-xl ${
                    isSelected
                      ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-[0_10px_35px_rgba(249,115,22,0.12)]'
                      : 'border-slate-200 hover:border-orange-300'
                  }`}
                >
                  {/* Top Status Header */}
                  <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex flex-col gap-3 relative">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200/80 px-2.5 py-1 rounded-full">
                        {branch.tag}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Open Now</span>
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-tight">
                        {branch.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                        <MapPin size={13} className="text-orange-500 shrink-0" />
                        <span>{branch.distance}</span>
                        <span>•</span>
                        <span className="text-slate-700 font-semibold">{branch.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body: Address, Timings, Features */}
                  <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
                    {/* Address block */}
                    <div className="flex items-start gap-3 text-xs text-slate-600">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 size={15} />
                      </div>
                      <div className="flex flex-col leading-relaxed">
                        <span className="font-bold text-slate-900">{branch.address}</span>
                        <span className="text-slate-500">{branch.landmark}</span>
                        <span className="text-slate-600 font-medium">{branch.city} – {branch.pincode}, Tamil Nadu</span>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-3 text-xs text-slate-600">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock size={15} />
                      </div>
                      <div className="flex flex-col leading-relaxed">
                        <span className="font-semibold text-slate-800">{branch.hours}</span>
                        <span className="text-slate-500 text-[11px]">{branch.sundayHours}</span>
                      </div>
                    </div>

                    {/* Key Services List */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Branch Key Facilities
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {branch.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direct Contact strip */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Direct Line:</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                            className="font-black text-slate-900 hover:text-orange-600 transition-colors no-underline"
                          >
                            {branch.phone}
                          </a>
                          <button
                            onClick={() => handleCopyPhone(branch.id, branch.phone)}
                            className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200 cursor-pointer hover:bg-orange-100 transition-colors"
                          >
                            {copiedPhoneId === branch.id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Email Desk:</span>
                        <a
                          href={`mailto:${branch.email}`}
                          className="font-bold text-slate-700 hover:text-orange-600 transition-colors no-underline"
                        >
                          {branch.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 sm:p-5 pt-0 flex flex-col gap-2.5">
                    <button
                      onClick={() => handleSelectBranchAndScroll(branch.id)}
                      className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:brightness-105'
                          : 'bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-[#FF6B00] border border-slate-200'
                      }`}
                    >
                      <MapPin size={15} />
                      <span>{isSelected ? 'Viewing on Map Below' : 'View on Map Below'}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          `${branch.name}, ${branch.address}, ${branch.city}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 no-underline cursor-pointer shadow-sm"
                      >
                        <Navigation size={13} className="text-orange-500" />
                        <span>Directions</span>
                      </a>

                      <a
                        href={`https://wa.me/${branch.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hi GoldFin ${branch.city} Branch, I would like to inquire about gold services / instant loan.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white hover:brightness-105 font-bold text-xs transition-all flex items-center justify-center gap-1.5 no-underline cursor-pointer shadow-sm"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE MAP SECTION DIRECTLY BELOW BRANCHES */}
        <section ref={mapSectionRef} className="flex flex-col gap-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-600 mb-1">
                <MapPin size={14} />
                <span>INTERACTIVE REGIONAL LOCATION MAP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Find <span className="text-[#FF6B00]">{activeBranch.name}</span> on Map
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Toggle between branch locations to view live routes, landmarks, and street navigation.
              </p>
            </div>

            {/* Branch Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-x-auto">
              {BRANCHES_DATA.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border-0 ${
                    selectedBranchId === b.id
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white shadow-md'
                      : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {b.city}
                </button>
              ))}
            </div>
          </div>

          {/* Map & Live Branch Detail Card Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Detail Panel for Active Branch */}
            <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                    SELECTED BRANCH
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Virudhunagar Dist.</span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">{activeBranch.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{activeBranch.landmark}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Complete Address:</span>
                      <span className="text-slate-600 leading-relaxed">
                        {activeBranch.address}, {activeBranch.city} – {activeBranch.pincode}, Tamil Nadu
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Timings:</span>
                      <span className="text-slate-600">{activeBranch.hours}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <PhoneCall size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Branch Hotline:</span>
                      <a
                        href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`}
                        className="text-orange-600 font-extrabold hover:underline"
                      >
                        {activeBranch.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Branch Head / Officer Info */}
                <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/70 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#EA580C] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                    {activeBranch.city.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-orange-700">
                      OFFICER IN CHARGE
                    </span>
                    <span className="text-xs font-bold text-slate-900">{activeBranch.manager}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${activeBranch.name}, ${activeBranch.address}, ${activeBranch.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_6px_20px_rgba(249,115,22,0.35)] no-underline flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation size={15} />
                  <span>Start Navigation to {activeBranch.city}</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`}
                    className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:text-[#FF6B00] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 no-underline shadow-sm"
                  >
                    <Phone size={13} className="text-orange-500" />
                    <span>Call Desk</span>
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${activeBranch.name} ${activeBranch.city} Tamil Nadu`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:text-[#FF6B00] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 no-underline shadow-sm"
                  >
                    <span>Full Map</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Map Canvas with Floating Badge */}
            <div className="lg:col-span-8 relative min-h-[420px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col">
              {/* Map Iframe */}
              <iframe
                key={activeBranch.id}
                title={`${activeBranch.name} Map`}
                src={activeBranch.mapEmbedUrl}
                className="w-full h-full min-h-[420px] sm:min-h-[480px] border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Active Branch Pin Badge */}
              <div className="absolute top-4 left-4 z-10 px-4 py-2.5 rounded-2xl bg-white/95 border border-orange-300 backdrop-blur-md shadow-xl flex items-center gap-3 pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
                  <div className="absolute w-5 h-5 rounded-full bg-orange-400 animate-ping opacity-75" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-wider">
                    GOLDFIN {activeBranch.city.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-slate-800 font-extrabold">
                    {activeBranch.name}
                  </span>
                </div>
              </div>

              {/* Map Bottom Features Strip */}
              <div className="absolute bottom-4 left-4 right-4 z-10 hidden sm:flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-md shadow-lg text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Insured Vault Facility</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Zap size={16} className="text-orange-500" />
                  <span>Instant Loan in 15 Minutes</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Scale size={16} className="text-blue-600" />
                  <span>Free Hallmark Karatmeter Check</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES AVAILABLE ACROSS ALL 3 BRANCHES */}
        <section className="flex flex-col gap-6 pt-4">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              COMPLETE SUITE OF SERVICES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What You Can Do at Any GoldFin Branch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Every authorized GoldFin branch around Sivakasi is equipped with high-tech purity appraisal labs, immediate
              disbursement desks, and secure locker facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Coins size={24} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  Instant Gold Loan
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Pledge your 22K/24K gold ornaments at maximum per-gram valuation with lowest interest rates starting at 0.75% per month.
                </p>
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-orange-600">
                <span>Sanctioned in 15 mins</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Release Pledged Gold
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  We clear pending pawnshop and NBFC loans on your behalf, retrieve your jewellery, and hand over the surplus cash value immediately.
                </p>
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <span>Same-day release</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Scale size={24} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Sell Old Gold Jewellery
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Sell your old, broken, or unused gold jewellery at live benchmark rates with 100% transparent zero-melting purity testing.
                </p>
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-600">
                <span>Direct bank credit</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Service 4 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Safe Insured Storage
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  All gold assets are sealed in tamper-proof barcoded pouches and stored inside multi-tier bank vaults insured by national underwriters.
                </p>
              </div>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <span>100% Risk-Free</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION BANNER */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wider w-fit mx-auto lg:mx-0">
                <Sparkles size={13} />
                <span>BOOK A PRIORITY BRANCH VISIT</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Plan Your Visit to Sivakasi, Srivilliputhur, or Rajapalayam
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with our branch managers for express appraisals or call our centralized advisory desk for immediate guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
              <a
                href="tel:+919092548347"
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 no-underline cursor-pointer"
              >
                <PhoneCall size={16} />
                <span>Call Central Desk (+91 90925 48347)</span>
              </a>

              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <span>Online Inquiry Desk</span>
                <ArrowRight size={15} />
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
