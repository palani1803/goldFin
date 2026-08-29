import { useState, useEffect, useCallback } from 'react'
import {
  LineChart,
  X,
  Sparkles,
  ShieldCheck,
  Coins,
  CoinsIcon,
  Scale,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Building2,
  CheckCircle2,
  Lightbulb,
  Landmark,
  BarChart3,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  RefreshCw,
  Newspaper,
  MapPin,
  Phone,
  Clock
} from 'lucide-react'
import goldHeroJewel from '../assets/gold_hero_jewel.jpg'
import { Navbar, Footer, TrustBanner, GoldBackground, GoldCoin3D, GoldShower } from '../components'
import { useSiteSettings } from '../hooks/useSiteSettings'

interface MarketNewsItem {
  id: string
  title: string
  source: string
  link: string
  pubDate: string
  timeAgo: string
  readTime: string
  category: string
  snippet: string
}

// Purity rate type from API
interface PurityRate {
  purityId: string
  name: string
  karat: string
  pricePerGram: number
  previousPrice: number
  unit: string
  changePercent: number
  isUp: boolean
  lastUpdated: string
}

// Branch Information for Home Page Text Directory
interface HomeBranchItem {
  id: string
  name: string
  tag: string
  city: string
  district: string
  address: string
  landmark: string
  phone: string
  rawPhone: string
  hours: string
  features: string
}

const HOME_BRANCHES: HomeBranchItem[] = [
  {
    id: 'sivakasi',
    name: 'Sivakasi Main Branch',
    tag: 'HQ & Vault',
    city: 'Sivakasi',
    district: 'Virudhunagar',
    address: 'No. 42/B, Kamarajar Road, Near Old Bus Stand',
    landmark: 'Opposite Town Hall',
    phone: '+91 90925 48347',
    rawPhone: '9092548347',
    hours: 'Mon–Sat: 9:00 AM – 6:30 PM',
    features: 'Central Vault & German XRF Lab'
  },
  {
    id: 'srivilliputhur',
    name: 'Srivilliputhur Branch',
    tag: 'Regional Hub',
    city: 'Srivilliputhur',
    district: 'Virudhunagar',
    address: 'No. 18, Madurai Main Road, Near Andal Temple Arch',
    landmark: 'Opposite Car Street Junction',
    phone: '+91 90925 48348',
    rawPhone: '9092548348',
    hours: 'Mon–Sat: 9:30 AM – 6:30 PM',
    features: 'Instant 15-Min Loan Sanctions'
  },
  {
    id: 'puthupatti',
    name: 'M.Puthupatti Branch',
    tag: 'Service Hub',
    city: 'M.Puthupatti',
    district: 'Virudhunagar',
    address: 'Main Road Junction, Near Bus Stand, M.Puthupatti',
    landmark: 'Opp. Primary Agricultural Bank',
    phone: '+91 90925 48346',
    rawPhone: '9092548346',
    hours: 'Mon–Sat: 9:30 AM – 6:00 PM',
    features: 'Doorstep Valuation & Spot Cash'
  },
  {
    id: 'rajapalayam',
    name: 'Rajapalayam Branch',
    tag: 'Commercial Desk',
    city: 'Rajapalayam',
    district: 'Virudhunagar',
    address: 'No. 85, Tenkasi Main Road, PACR Hospital Junction',
    landmark: 'Near Railway Feeder Road',
    phone: '+91 90925 48349',
    rawPhone: '9092548349',
    hours: 'Mon–Sat: 9:30 AM – 6:30 PM',
    features: 'High-Value SME Gold Loans'
  }
]

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How is the Gold Value and Loan Eligibility calculated?',
    answer: 'It is calculated directly using today’s live 24K pure gold market benchmark (IBJA / MCX). Jewellery Karats (22K, 20K, 18K) are derived via precise metallurgical purity ratios, offering up to 75% RBI-compliant loan-to-value.'
  },
  {
    id: 2,
    question: 'What is the GST on gold in India?',
    answer: 'In India, a standard 3% Goods and Services Tax (GST) applies to the base gold metal value, along with a 5% GST on jewellery making charges. Pledging existing jewellery for gold loans does not attract metal GST.'
  },
  {
    id: 3,
    question: 'What is the difference between 24K and 22K Gold?',
    answer: '24K Gold is 99.9% pure bullion, ideal for investment bars and coins. 22K Gold (916 BIS Hallmark) contains 91.6% pure gold alloyed with durable metals, making it the industry benchmark for durable jewellery.'
  },
  {
    id: 4,
    question: 'How often are the live gold rates updated?',
    answer: 'Live gold rates are synchronized with official Indian market indices (IBJA / MCX) continuously throughout the trading day, with primary benchmark updates at 10:00 AM and real-time feeds.'
  }
]

interface HomePageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateContact?: (city?: string) => void
}

export default function HomePage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: HomePageProps = {}) {
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahes Bankers'
  const bankName = settings.bankPartnerName || '100% Insured Bank Vault'

  // Modals
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [activeModalTitle, setActiveModalTitle] = useState<string | null>(null)
  const [selectedNewsItem, setSelectedNewsItem] = useState<MarketNewsItem | null>(null)

  // Live Market News State
  const [marketNews, setMarketNews] = useState<MarketNewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState<boolean>(true)

  // Accordion state
  const [openFaqId, setOpenFaqId] = useState<number | null>(1)

  // --- Live Gold Rates State ---
  const [liveRates, setLiveRates] = useState<PurityRate[]>([])
  const [ratesLoading, setRatesLoading] = useState<boolean>(true)
  const [ratesError, setRatesError] = useState<string | null>(null)
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string | null>(null)

  // --- GoldFin Finance Company Shop Rates State ---
  const [shopRates, setShopRates] = useState<{
    _id: string
    purityId: string
    name: string
    karat: string
    pricePerGram: number
    unit: string
    updatedAt?: string
  }[]>([])
  const [shopRatesLoading, setShopRatesLoading] = useState<boolean>(true)

  // Fetch live rates from backend API
  const fetchLiveRates = useCallback(async () => {
    try {
      const res = await fetch('/api/gold-rates')
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        setLiveRates(json.data)
        setRatesError(null)
        // Find the most recent lastUpdated timestamp
        const latestUpdate = json.data.reduce((latest: string, rate: PurityRate) => {
          return rate.lastUpdated > latest ? rate.lastUpdated : latest
        }, json.data[0].lastUpdated || '')
        if (latestUpdate) {
          setLastUpdatedTime(new Date(latestUpdate).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }))
        }
      }
    } catch {
      setRatesError('Unable to fetch live rates. Using cached data.')
    } finally {
      setRatesLoading(false)
    }
  }, [])

  // Fetch GoldFin Finance company rates from backend API
  const fetchShopRates = useCallback(async () => {
    try {
      const res = await fetch('/api/shop-rates')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setShopRates(json.data)
      }
    } catch (err) {
      console.error('Error fetching shop rates:', err)
    } finally {
      setShopRatesLoading(false)
    }
  }, [])

  // Fetch live market news from backend
  const fetchMarketNews = useCallback(async () => {
    setNewsLoading(true)
    try {
      const res = await fetch('/api/news')
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        setMarketNews(json.data)
      }
    } catch (err) {
      console.error('Error fetching market news:', err)
    } finally {
      setNewsLoading(false)
    }
  }, [])

  // --- Branches State (Dynamic from MongoDB) ---
  const [homeBranches, setHomeBranches] = useState<HomeBranchItem[]>(HOME_BRANCHES)

  // Fetch branches from backend
  const fetchBranches = useCallback(async () => {
    try {
      const res = await fetch('/api/branches')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        const active = json.data
          .filter((b: any) => b.isActive !== false)
          .map((b: any) => {
            const cityKey = (b.city || '').toLowerCase()
            const nameKey = (b.name || '').toLowerCase()
            let tag = 'Service Hub'
            let district = b.district || (cityKey.includes('chennai') || nameKey.includes('chennai') ? 'Chennai' : 'Virudhunagar')
            let landmark = b.landmark || 'Near Main Bazaar'
            let features = b.features || 'Instant 15-Min Loan Sanctions'

            if (cityKey.includes('sivakasi') || nameKey.includes('sivakasi')) {
              tag = 'HQ & Vault'
              district = 'Virudhunagar'
              landmark = 'Opposite Town Hall'
              features = 'Central Vault & German XRF Lab'
            } else if (cityKey.includes('srivilliputhur') || nameKey.includes('srivilliputhur')) {
              tag = 'Regional Hub'
              district = 'Virudhunagar'
              landmark = 'Near Andal Temple Arch'
              features = 'Instant 15-Min Loan Sanctions'
            } else if (cityKey.includes('puthupatti') || nameKey.includes('puthupatti')) {
              tag = 'Service Hub'
              district = 'Virudhunagar'
              landmark = 'Opp. Primary Agricultural Bank'
              features = 'Doorstep Valuation & Spot Cash'
            } else if (cityKey.includes('rajapalayam') || nameKey.includes('rajapalayam')) {
              tag = 'Commercial Desk'
              district = 'Virudhunagar'
              landmark = 'Near PACR Hospital Junction'
              features = 'High-Value SME Gold Loans'
            } else if (cityKey.includes('chennai') || nameKey.includes('chennai')) {
              tag = 'Service Hub'
              district = 'Chennai'
              landmark = 'Metro City Center'
              features = 'Instant 15-Min Loan Sanctions'
            }

            return {
              id: b._id || cityKey,
              name: b.name,
              tag,
              city: b.city,
              district,
              address: b.address,
              landmark,
              phone: b.phone || settings.contactPhone || '+91 90925 48347',
              rawPhone: (b.phone || settings.whatsappNumber || '9092548347').replace(/[^0-9]/g, ''),
              hours: b.operatingHours || 'Mon–Sat: 9:00 AM – 6:30 PM',
              features,
            }
          })
        setHomeBranches(active)
      }
    } catch (err) {
      console.error('Error fetching branches:', err)
    }
  }, [])

  // Fetch on mount + auto-refresh every 10 seconds + instant sync on window focus, tab visibility, and admin update events
  useEffect(() => {
    const fetchAllData = () => {
      fetchLiveRates()
      fetchShopRates()
      fetchMarketNews()
      fetchBranches()
    }

    fetchAllData()

    // 1. Polling interval: Auto-updates company & live rates every 10 seconds
    const interval = setInterval(fetchAllData, 10 * 1000)

    // 2. Instant sync when user focuses the tab or opens browser
    const handleFocusOrVisible = () => {
      if (document.visibilityState === 'visible') {
        fetchAllData()
      }
    }

    // 3. Instant sync when Admin updates shop rates or branches in another tab / component
    const handleRatesUpdate = () => {
      fetchShopRates()
      fetchLiveRates()
    }

    const handleBranchesUpdate = () => {
      fetchBranches()
    }

    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === 'goldFin_shop_rates_updated') {
        fetchShopRates()
        fetchLiveRates()
      } else if (e.key === 'goldFin_branches_updated') {
        fetchBranches()
      }
    }

    window.addEventListener('focus', handleFocusOrVisible)
    document.addEventListener('visibilitychange', handleFocusOrVisible)
    window.addEventListener('goldRatesUpdated', handleRatesUpdate)
    window.addEventListener('branchesUpdated', handleBranchesUpdate)
    window.addEventListener('storage', handleStorageUpdate)

    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', handleFocusOrVisible)
      document.removeEventListener('visibilitychange', handleFocusOrVisible)
      window.removeEventListener('goldRatesUpdated', handleRatesUpdate)
      window.removeEventListener('branchesUpdated', handleBranchesUpdate)
      window.removeEventListener('storage', handleStorageUpdate)
    }
  }, [fetchLiveRates, fetchShopRates, fetchMarketNews, fetchBranches])

  // Computed values for Railway Moving Ticker & Hero display (Company Gold Price from Admin side)
  const shop24k = shopRates.find((r) => r.purityId === '24k')?.pricePerGram || 0
  const shop22k = shopRates.find((r) => r.purityId === '22k')?.pricePerGram || 0
  const shop20k = shopRates.find((r) => r.purityId === '20k')?.pricePerGram || 0
  const shop18k = shopRates.find((r) => r.purityId === '18k')?.pricePerGram || 0
  const shopSilver = shopRates.find((r) => r.purityId === 'silver')?.pricePerGram || 0

  const live24k = liveRates.find((r) => r.purityId === '24k')?.pricePerGram || 0
  const live22k = liveRates.find((r) => r.purityId === '22k')?.pricePerGram || 0
  const live20k = liveRates.find((r) => r.purityId === '20k')?.pricePerGram || 0
  const live18k = liveRates.find((r) => r.purityId === '18k')?.pricePerGram || 0
  const liveSilver = liveRates.find((r) => r.purityId === 'silver')?.pricePerGram || 0

  // Priority: 1. Admin configured Company Gold Price -> 2. Live market benchmark -> 3. Standard calibrated fallback
  const display24K = shop24k > 0 ? shop24k : (live24k || 8245)
  const display22K = shop22k > 0 ? shop22k : (live22k || Math.round((display24K * 22) / 24) || 7558)
  const display20K = shop20k > 0 ? shop20k : (live20k || Math.round((display24K * 20) / 24) || 6871)
  const display18K = shop18k > 0 ? shop18k : (live18k || Math.round((display24K * 18) / 24) || 6184)
  const displaySilver = shopSilver > 0 ? shopSilver : (liveSilver || 98)

  const pavun24K = display24K * 8
  const pavun22K = display22K * 8
  const pavun20K = display20K * 8
  const pavun18K = display18K * 8
  const silver100g = displaySilver * 100

  // --- Reference Gold Calculator State ---
  const [calcMode, setCalcMode] = useState<'amount' | 'gold'>('amount')
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedCarat, setSelectedCarat] = useState<number>(22)
  const [isCalculated, setIsCalculated] = useState<boolean>(false)

  // Spot Rate for selected carat based on company prices
  const spotRate24K = display24K
  const rateForCarat =
    selectedCarat === 24 ? display24K :
    selectedCarat === 22 ? display22K :
    selectedCarat === 20 ? display20K :
    selectedCarat === 18 ? display18K :
    Math.round(display24K * (selectedCarat / 24))

  // Calculations
  const parsedVal = parseFloat(inputValue) || 0
  
  // For 'amount' mode: Gold Weight in Grams = Amount / RateForCarat
  const calculatedGoldWeight = parsedVal > 0 ? (parsedVal / rateForCarat).toFixed(2) : '0.00'
  
  // For 'gold' mode: Total Cash Value = WeightGrams * RateForCarat
  const calculatedRupees = parsedVal > 0 ? Math.round(parsedVal * rateForCarat).toLocaleString('en-IN') : '0'

  const handleCalculate = () => {
    if (parsedVal > 0) {
      setIsCalculated(true)
    }
  }

  const handlePresetSelect = (val: string) => {
    setInputValue(val)
    setIsCalculated(true)
  }

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900">
      {/* 10-Second Recurring Luxury Gold Shower Effect */}
      <GoldShower intervalMs={10000} particleCount={65} />

      {/* Reusable White & Orange Ambient Background */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="home"
        onNavigateHome={onNavigateHome || (() => scrollToSection('overview'))}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onNavigateBranches={onNavigateBranches}
        onNavigateContact={onNavigateContact}
        onScrollToSection={scrollToSection}
        spotRate24K={spotRate24K}
      />

      {/* Railway Moving Tag — Live Company Gold Price Ticker (Carat Gram & Pavun Rates from Admin) */}
      <div className="w-full bg-[#0B1120] text-slate-100 border-y border-orange-500/30 relative overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.18)] z-30 select-none">
        <div className="w-full flex items-stretch relative">
          {/* Fixed Left Badge: Railway Station LED Live Indicator */}
          <div className="relative z-20 flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 via-orange-600 to-[#EA580C] text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shrink-0 shadow-md">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white"></span>
            </span>
            <span className="font-mono tracking-tight font-black whitespace-nowrap flex items-center gap-1.5">
              <span>TODAY'S COMPANY GOLD RATE</span>
              <span className="hidden lg:inline text-orange-100 font-sans font-bold">• நிறுவன நேரடி விலை</span>
            </span>
            {/* Angled decorative edge */}
            <div className="hidden sm:block absolute top-0 -right-2 h-full w-2 bg-[#EA580C] [clip-path:polygon(0_0,100%_0,0_100%)]" />
          </div>

          {/* Scrolling Ticker Track with Side Gradient Fades */}
          <div className="relative flex-1 overflow-hidden flex items-center py-2 sm:py-2.5">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#0B1120] to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#0B1120] to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Marquee Track */}
            <div className="animate-railway-ticker flex items-center cursor-pointer">
              {[0, 1].map((loopIdx) => (
                <div key={loopIdx} className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
                  {/* 1. 24K Pure Gold: 1g & 1 Pavun */}
                  <div
                    className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                    onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                  >
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono font-black text-[10px] sm:text-[11px] tracking-wider">
                      24K GOLD
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                      <span className="text-slate-400 text-xs font-sans">1g:</span>
                      <span className="font-black text-amber-400">₹{display24K.toLocaleString('en-IN')}</span>
                      <span className="text-slate-600 font-sans mx-0.5">|</span>
                      <span className="text-slate-400 text-xs font-sans">1 Pavun (8g):</span>
                      <span className="font-black text-amber-300">₹{pavun24K.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-amber-400/80 font-sans hidden sm:inline">(1 பவுன்)</span>
                    </div>
                  </div>

                  <span className="text-orange-500/60 font-black text-xs select-none">◆</span>

                  {/* 2. 22K (916 Hallmark) Gold: 1g & 1 Pavun */}
                  <div
                    className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                    onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                  >
                    <span className="px-2.5 py-0.5 rounded-md bg-orange-500/20 border border-orange-400/50 text-orange-300 font-mono font-black text-[10px] sm:text-[11px] tracking-wider">
                      22K 916 GOLD
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                      <span className="text-slate-400 text-xs font-sans">1g:</span>
                      <span className="font-black text-orange-400">₹{display22K.toLocaleString('en-IN')}</span>
                      <span className="text-slate-600 font-sans mx-0.5">|</span>
                      <span className="text-slate-400 text-xs font-sans">1 Pavun (8g):</span>
                      <span className="font-black text-orange-300">₹{pavun22K.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-orange-400/80 font-sans hidden sm:inline">(1 பவுன்)</span>
                    </div>
                  </div>

                  <span className="text-orange-500/60 font-black text-xs select-none">◆</span>

                  {/* 3. 20K Gold: 1g & 1 Pavun */}
                  <div
                    className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                    onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                  >
                    <span className="px-2.5 py-0.5 rounded-md bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 font-mono font-black text-[10px] sm:text-[11px] tracking-wider">
                      20K GOLD
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                      <span className="text-slate-400 text-xs font-sans">1g:</span>
                      <span className="font-black text-yellow-400">₹{display20K.toLocaleString('en-IN')}</span>
                      <span className="text-slate-600 font-sans mx-0.5">|</span>
                      <span className="text-slate-400 text-xs font-sans">1 Pavun (8g):</span>
                      <span className="font-black text-yellow-300">₹{pavun20K.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-yellow-400/80 font-sans hidden sm:inline">(1 பவுன்)</span>
                    </div>
                  </div>

                  <span className="text-orange-500/60 font-black text-xs select-none">◆</span>

                  {/* 4. 18K Gold: 1g & 1 Pavun */}
                  <div
                    className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                    onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                  >
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono font-black text-[10px] sm:text-[11px] tracking-wider">
                      18K GOLD
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                      <span className="text-slate-400 text-xs font-sans">1g:</span>
                      <span className="font-black text-slate-200">₹{display18K.toLocaleString('en-IN')}</span>
                      <span className="text-slate-600 font-sans mx-0.5">|</span>
                      <span className="text-slate-400 text-xs font-sans">1 Pavun (8g):</span>
                      <span className="font-black text-slate-100">₹{pavun18K.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">(1 பவுன்)</span>
                    </div>
                  </div>

                  <span className="text-orange-500/60 font-black text-xs select-none">◆</span>

                  {/* 5. 999 Fine Silver: 1g & 100g */}
                  <div
                    className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                    onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                  >
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-200/20 border border-slate-300/50 text-slate-200 font-mono font-black text-[10px] sm:text-[11px] tracking-wider">
                      SILVER 999
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                      <span className="text-slate-400 text-xs font-sans">1g:</span>
                      <span className="font-black text-slate-100">₹{displaySilver.toLocaleString('en-IN')}</span>
                      <span className="text-slate-600 font-sans mx-0.5">|</span>
                      <span className="text-slate-400 text-xs font-sans">100g:</span>
                      <span className="font-black text-slate-200">₹{silver100g.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-slate-300 font-sans hidden sm:inline">(100 கிராம்)</span>
                    </div>
                  </div>

                  <span className="text-orange-500/60 font-black text-xs select-none">◆</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section — Clean White Background & Vibrant Gold Theme */}
      <section id="overview" className="relative pt-4 md:pt-6 pb-10 md:pb-14 overflow-hidden bg-white border-b border-slate-200/80">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-amber-50/40 to-transparent pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Content — Top Left Aligned Spacing */}
            <div className="lg:col-span-6 flex flex-col gap-5 text-left py-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit">
                <Sparkles size={14} />
                <span>OFFICIAL LIVE BENCHMARK • GOLD RATES & INSTANT LOANS</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] font-serif font-bold text-slate-800 tracking-tight leading-[1.18]">
                Live Gold Rates <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent font-serif italic font-bold">
                  & Instant 15-Minute Gold Loan
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 max-w-lg leading-relaxed font-normal">
                Track live market gold rates and get instant gold loans in just 15 minutes with maximum valuation, minimal documentation, and 100% transparent service.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full">
                <button
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0 flex items-center justify-center gap-2 text-center"
                  onClick={() => onNavigateGoldLoan ? onNavigateGoldLoan() : scrollToSection('calculator')}
                >
                  <span>Get Instant Gold Loan</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50 hover:border-orange-500/40 hover:text-[#FF6B00] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm text-center"
                  onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                >
                  <LineChart size={16} />
                  <span>View Live Rates</span>
                </button>
              </div>
            </div>

            {/* Right Image Visual with 3D Floating Gold Coin */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] lg:max-w-[520px]">
                <img
                  src={goldHeroJewel}
                  alt="Gold Jewellery on Marble Pedestal"
                  className="w-full h-auto object-cover rounded-3xl shadow-[0_20px_45px_rgba(249,115,22,0.12)] border border-slate-100 transition-transform duration-700 hover:scale-[1.01]"
                />

                {/* 3D Floating Spinning Gold Coin inside Image Right Corner */}
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 animate-coin-float-3d">
                  <GoldCoin3D caratLabel="24K 999" autoSpin={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Trust Stats Card */}
          <div className="mt-8 md:mt-10 rounded-2xl md:rounded-3xl bg-white/95 border border-slate-200/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-2 md:p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="flex items-center gap-3.5 py-3 px-4 md:px-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-black text-slate-900">Highest Loan Value</span>
                  <span className="text-[10px] text-slate-500 font-medium">Up to 75% Gold Value</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 py-3 px-4 md:px-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600 shrink-0">
                  <TrendingDown size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-black text-slate-900">Lowest Interest Rate</span>
                  <span className="text-[10px] text-slate-500 font-medium">From 0.75% per month</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 py-3 px-4 md:px-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600 shrink-0">
                  <Sparkles size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-black text-slate-900">15-Min Fast Sanction</span>
                  <span className="text-[10px] text-slate-500 font-medium">15-Min Quick Disbursal</span>
                </div>
              </div>
              <div className="flex items-center gap-3.5 py-3 px-4 md:px-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600 shrink-0">
                  <Coins size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-black text-slate-900">100% Insured Security</span>
                  <span className="text-[10px] text-slate-500 font-medium">{bankName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections Container */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 flex flex-col gap-20 relative z-10 w-full">
        {/* Dedicated Gold Calculator Section */}
        <section id="calculator">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                INSTANT GOLD CALCULATOR
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Gold Rate & Value Calculator
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  தங்க விலை மற்றும் மதிப்பு கணக்கீடு
                </span>
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/80 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <CoinsIcon size={14} />
              <span>TODAY'S 24K RATE: ₹{spotRate24K > 0 ? spotRate24K.toLocaleString('en-IN') : '...'}/g</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-white via-orange-50/25 to-white border border-orange-200/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(249,115,22,0.06)] flex flex-col gap-6">
              {/* Dual Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-orange-100/60 rounded-2xl border border-orange-200/70">
                <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border-0 ${calcMode === 'amount' ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white shadow-md' : 'text-slate-700 hover:text-orange-600 bg-transparent'}`}
                  onClick={() => {
                    setCalcMode('amount')
                    setInputValue('')
                    setIsCalculated(false)
                  }}
                >
                  <Coins size={18} />
                  <span>By Amount (₹)</span>
                </button>
                <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border-0 ${calcMode === 'gold' ? 'bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white shadow-md' : 'text-slate-700 hover:text-orange-600 bg-transparent'}`}
                  onClick={() => {
                    setCalcMode('gold')
                    setInputValue('')
                    setIsCalculated(false)
                  }}
                >
                  <Scale size={18} />
                  <span>By Weight (g)</span>
                </button>
              </div>

              {/* Input Field */}
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-600 font-extrabold text-lg">
                  {calcMode === 'amount' ? '₹' : 'g'}
                </span>
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-4 bg-orange-50/30 hover:bg-orange-50/50 border border-orange-200/80 rounded-2xl text-slate-900 font-bold text-base sm:text-lg focus:outline-none focus:border-[#FF6B00] transition-colors"
                  placeholder={calcMode === 'amount' ? 'Enter amount in Rupees (e.g. 50000)' : 'Enter weight in Grams (e.g. 10)'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setIsCalculated(false)
                  }}
                />
              </div>

              {/* Quick Presets Row */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-semibold text-slate-500 w-full sm:w-auto">Quick Presets:</span>
                {calcMode === 'amount' ? (
                  <>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('25000')}>₹25,000</button>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('50000')}>₹50,000</button>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('100000')}>₹1,00,000</button>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('500000')}>₹5,00,000</button>
                  </>
                ) : (
                  <>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('5')}>5 Grams (5g)</button>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('8')}>8g (1 Pavan)</button>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('10')}>10 Grams (10g)</button>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('11.66')}>1 Tola (11.66g)</button>
                    <button className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl bg-white hover:bg-orange-50 border border-orange-200/70 hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer shadow-2xs" onClick={() => handlePresetSelect('50')}>50 Grams (50g)</button>
                  </>
                )}
              </div>

              {/* Karat Value Selector */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Select Gold Purity</div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[18, 19, 20, 21, 22, 24].map((carat) => (
                    <button
                      key={carat}
                      className={`py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer text-center ${selectedCarat === carat ? 'bg-orange-100/80 border-orange-400 text-orange-700 shadow-sm' : 'bg-white border-orange-100 text-slate-700 hover:bg-orange-50 hover:border-orange-300 hover:text-slate-900'}`}
                      onClick={() => {
                        setSelectedCarat(carat)
                        setIsCalculated(false)
                      }}
                    >
                      {carat}K
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Banner Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-100/70 via-white to-orange-100/60 border border-orange-300/80 text-center flex flex-col gap-1 shadow-xs">
                {calcMode === 'amount' ? (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimated Gold Weight:</div>
                      <div className="text-2xl md:text-3xl font-black text-orange-600 tracking-tight">
                        {calculatedGoldWeight} Grams ({selectedCarat}K Gold)
                      </div>
                      <div className="text-xs font-medium text-slate-500 mt-1">
                        Based on live {selectedCarat}K benchmark rate: ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-500">
                      Enter your budget amount and select karat to calculate estimated gold weight.
                    </div>
                  )
                ) : (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Estimated Gold Value:</div>
                      <div className="text-2xl md:text-3xl font-black text-orange-600 tracking-tight">
                        ₹{calculatedRupees}
                      </div>
                      <div className="text-xs font-medium text-slate-500 mt-1">
                        {parsedVal} Grams ({selectedCarat}K Gold) @ ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-500">
                      Enter gold weight and select karat to instantly calculate total market value.
                    </div>
                  )
                )}
              </div>

              {/* Calculate Action Button */}
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-base hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0" onClick={handleCalculate}>
                Calculate Gold Value
              </button>

              {/* Note Footer */}
              <div className="text-xs text-slate-500 text-center leading-relaxed">
                <strong className="text-slate-700">Note:</strong> Calculated in real-time according to official Indian market benchmarks. Jeweller making charges and 3% GST are applicable separately.
              </div>
            </div>
          </div>
        </section>

        {/* Purity Rates Section (Market Rates + Finance Company Rates) */}
        <section id="rates" className="space-y-6 sm:space-y-8">
          {/* 1. Indian Gold Market Live Rates */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                  LIVE INDIAN BENCHMARK
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                  Indian Gold Market Benchmark Rates
                  <span className="block text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 font-sans">
                    இந்திய தங்கச் சந்தை நேரடி விலை நிலவரம்
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>MARKET OPEN</span>
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Updated: <span className="font-bold text-slate-700">{lastUpdatedTime || 'Live'}</span>
                </div>
              </div>
            </div>
            {ratesError && (
              <div className="mb-3 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                {ratesError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {ratesLoading ? (
                // Loading skeleton cards
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-white to-orange-50/30 border border-orange-200/60 backdrop-blur-xl flex flex-col gap-2.5 animate-pulse">
                    <div className="h-4 bg-orange-100/60 rounded-lg w-3/4" />
                    <div className="h-7 bg-orange-100/60 rounded-lg w-1/2" />
                    <div className="h-3 bg-orange-50 rounded-lg w-full mt-1" />
                  </div>
                ))
              ) : (
                ['18k', '20k', '22k', '24k'].map((purityKey) => {
                  const item = liveRates.find((r) => r.purityId === purityKey)
                  if (!item) return null
                  const displayName =
                    purityKey === '24k' ? '24K Pure Gold' :
                    purityKey === '22k' ? '22K Jewellery Gold (916)' :
                    purityKey === '20k' ? '20K Gold' : '18K Gold'
                  const displayKarat =
                    purityKey === '24k' ? '99.9% Pure • 1g (999 Pure)' :
                    purityKey === '22k' ? '91.6% Pure • 1g (BIS 916)' :
                    purityKey === '20k' ? '83.3% Pure • 1g' : '75.0% Pure • 1g'

                  return (
                    <div
                      key={item.purityId}
                      className={`p-4 sm:p-4.5 rounded-2xl backdrop-blur-xl flex flex-col justify-between gap-2.5 group transition-all duration-300 ${item.purityId === '24k' ? 'bg-gradient-to-br from-orange-50/80 via-white to-amber-50/60 border-2 border-orange-400/90 shadow-[0_8px_25px_rgba(249,115,22,0.14)] ring-2 ring-orange-400/20' : 'bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-400/70 shadow-xs hover:shadow-[0_8px_20px_rgba(249,115,22,0.08)]'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-[13px] font-extrabold tracking-wide text-orange-600">{displayName}</span>
                        {item.purityId === '24k' && (
                          <span className="text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1">
                            <Sparkles size={9} />
                            100% PURE
                          </span>
                        )}
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-tight">
                        ₹{item.pricePerGram.toLocaleString('en-IN')}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-orange-100/80">
                        <span className="text-[11px] font-medium text-slate-500">{displayKarat}</span>
                        <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${item.isUp ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'}`}>
                          {item.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          <span>{item.isUp ? `+${item.changePercent}%` : `-${item.changePercent}%`}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* 2. GoldFin Finance Company Offered Rates */}
          <div className="pt-6 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                  {companyName.toUpperCase()} BRANCH RATES
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                  {companyName} Official Loan & Branch Rates
                  <span className="block text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 font-sans">
                    அதிகாரப்பூர்வ கிளை மற்றும் கொள்முதல் விலை
                  </span>
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full backdrop-blur-md w-fit">
                <Coins size={13} className="text-orange-500" />
                <span>BRANCH OFFER</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
              {shopRatesLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl flex flex-col gap-2.5 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
                    <div className="h-7 bg-slate-200 rounded-lg w-1/2" />
                    <div className="h-3 bg-slate-100 rounded-lg w-full mt-1" />
                  </div>
                ))
              ) : (
                ['18k', '20k', '22k', '24k'].map((purityKey) => {
                  const shopRate = shopRates.find((s) => s.purityId === purityKey)
                  const marketRate = liveRates.find((m) => m.purityId === purityKey)

                  const rate24k = shopRates.find((s) => s.purityId === '24k')?.pricePerGram || 0
                  const rate22k = shopRates.find((s) => s.purityId === '22k')?.pricePerGram || 0
                  const baseShop = rate22k > 0 ? rate22k : rate24k
                  const baseKarat = rate22k > 0 ? 22 : 24
                  const derived20k = baseShop > 0 ? Math.round((baseShop / baseKarat) * 20) : 0
                  const derived18k = baseShop > 0 ? Math.round((baseShop / baseKarat) * 18) : 0

                  const displayName =
                    purityKey === '24k' ? '24K Pure Gold' :
                    purityKey === '22k' ? '22K Gold (916)' :
                    purityKey === '20k' ? '20K Gold' : '18K Gold'
                  const displayKarat =
                    purityKey === '24k' ? '99.9% Pure • 1g' :
                    purityKey === '22k' ? '91.6% Pure • 1g' :
                    purityKey === '20k' ? '83.3% Pure • 1g' : '75.0% Pure • 1g'

                  let price = 0
                  if (shopRate && shopRate.pricePerGram > 0) {
                    price = shopRate.pricePerGram
                  } else if (purityKey === '20k' && derived20k > 0) {
                    price = derived20k
                  } else if (purityKey === '18k' && derived18k > 0) {
                    price = derived18k
                  } else if (marketRate && marketRate.pricePerGram > 0) {
                    price = marketRate.pricePerGram
                  }

                  return (
                    <div
                      key={purityKey}
                      className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 border border-orange-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-2.5 group"
                    >
                      <div className="flex items-center justify-between gap-2 min-h-[22px]">
                        <span className="text-xs sm:text-[13px] font-extrabold tracking-wide text-slate-900 whitespace-nowrap">{displayName}</span>
                        <span className="text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-300 shrink-0">
                          {companyName.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-orange-600 group-hover:text-orange-700 transition-colors leading-tight">
                        ₹{price > 0 ? price.toLocaleString('en-IN') : '...'}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-orange-100 text-xs">
                        <span className="text-[11px] font-semibold text-slate-600">{displayKarat}</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md text-[10px] whitespace-nowrap">
                          Instant Loan • 15 Min
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </section>

        {/* Regional Branches Section */}
        <section id="branches" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#FF6B00]" />
                <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                  REGIONAL BRANCH NETWORK
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Our Regional Branches
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  நமது கிளைகள் மற்றும் தொடர்பு விவரங்கள்
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateBranches ? onNavigateBranches() : (onNavigateContact && onNavigateContact())}
                className="px-4 py-2 rounded-xl bg-white border border-orange-200 hover:border-orange-400 text-xs font-bold text-slate-700 hover:text-[#FF6B00] transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs hover:shadow-xs"
              >
                <Building2 size={14} className="text-[#FF6B00]" />
                <span>View All Branches</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Responsive Branch Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${homeBranches.length <= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3 xl:grid-cols-5'} gap-4 md:gap-5`}>
            {homeBranches.map((branch) => {
              const c = (branch.city || '').toLowerCase()
              const n = (branch.name || '').toLowerCase()
              const localizedName =
                c.includes('sivakasi') || n.includes('sivakasi') ? 'Sivakasi Main Branch' :
                c.includes('srivilliputhur') || n.includes('srivilliputhur') ? 'Srivilliputhur Branch' :
                c.includes('puthupatti') || n.includes('puthupatti') ? 'M.Puthupatti Branch' :
                c.includes('rajapalayam') || n.includes('rajapalayam') ? 'Rajapalayam Branch' :
                c.includes('chennai') || n.includes('chennai') ? 'Chennai Metro Desk' :
                branch.name.includes('(') ? branch.name : `${branch.name} (${branch.city || 'Branch'})`

              return (
                <div
                  key={branch.id}
                  className="rounded-3xl bg-gradient-to-b from-white via-white to-orange-50/35 border border-orange-200/70 hover:border-orange-400/80 p-5 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-[0_10px_25px_rgba(249,115,22,0.08)] hover:-translate-y-0.5 group h-full"
                >
                  {/* Top Header & Badges */}
                  <div className="flex flex-col">
                    {/* Tag & District Row: Fixed Single-line Height */}
                    <div className="flex items-center justify-between gap-1.5 h-7 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-orange-100/70 border border-orange-200 text-orange-700 text-[9.5px] font-black uppercase tracking-wider whitespace-nowrap shrink-0">
                        {branch.tag}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap truncate text-right">
                        {branch.district}
                      </span>
                    </div>

                    {/* Branch Title: Fixed Equal Height with 2-Line Alignment */}
                    <div className="min-h-[52px] flex items-center mb-2.5">
                      <h3 className="text-[15px] sm:text-base font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-[1.25] line-clamp-2">
                        {localizedName}
                      </h3>
                    </div>

                    {/* Feature Badge: Fixed Full-Width Equal Height Container */}
                    <div className="flex items-center gap-1.5 text-[10.5px] leading-tight font-bold text-amber-900 bg-amber-100/70 border border-amber-200/80 px-2.5 py-1.5 rounded-xl w-full min-h-[40px]">
                      <Sparkles size={12} className="text-amber-600 shrink-0" />
                      <span className="line-clamp-2">{branch.features}</span>
                    </div>
                  </div>

                  {/* Text Information Body */}
                  <div className="flex flex-col gap-2.5 pt-3.5 mt-3 border-t border-orange-100 text-xs">
                    {/* Address & Landmark: Fixed Min Height */}
                    <div className="flex items-start gap-2 text-slate-600 leading-snug min-h-[48px]">
                      <MapPin size={15} className="text-orange-500 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <p className="font-medium text-slate-700 leading-tight line-clamp-2">{branch.address}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">({branch.landmark})</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-slate-700 h-5">
                      <Phone size={14} className="text-emerald-600 shrink-0" />
                      <a
                        href={`tel:${branch.rawPhone}`}
                        className="font-bold text-slate-800 hover:text-orange-600 transition-colors text-xs truncate"
                      >
                        {branch.phone}
                      </a>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] h-5">
                      <Clock size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">Mon–Sat: 9:00 AM – 6:30 PM</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Network Trust Highlights Strip */}
          <div className="mt-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-orange-100/70 via-white to-amber-100/70 border border-orange-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 shadow-xs">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 border border-orange-100 shadow-2xs hover:border-orange-300 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-800 leading-tight truncate">15-Min Fast Valuation</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">15-Min Loan Valuation</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 border border-orange-100 shadow-2xs hover:border-orange-300 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-800 leading-tight truncate">Advanced XRF Testing</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">Advanced XRF Laser Lab</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 border border-orange-100 shadow-2xs hover:border-orange-300 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-800 leading-tight truncate">100% Insured Vaults</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">{bankName}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 border border-orange-100 shadow-2xs hover:border-orange-300 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-800 leading-tight truncate">No Hidden Charges</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">100% Transparent Terms</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Market News & Updates Section */}
        <section id="news">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Newspaper size={16} className="text-[#FF6B00]" />
                <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                  DAILY MARKET INSIGHTS
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Gold & Commodity Market News
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  தங்கம் மற்றும் நிதி சந்தை தினசரி செய்திகள்
                </span>
              </h2>
            </div>

            <button
              onClick={fetchMarketNews}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200/80 text-orange-600 text-xs font-bold w-fit cursor-pointer transition-colors"
              title="Refresh live news"
            >
              <RefreshCw size={13} className={newsLoading ? 'animate-spin text-[#FF6B00]' : 'text-[#FF6B00]'} />
              <span>{newsLoading ? 'FETCHING...' : 'LIVE FEED • UPDATED TODAY'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Featured Big News Card */}
            {marketNews.length > 0 ? (
              <div 
                className="lg:col-span-7 relative min-h-[360px] rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-end border border-orange-200/70 group cursor-pointer shadow-md hover:border-orange-400 transition-all"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80')` }}
                onClick={() => setSelectedNewsItem(marketNews[0])}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-orange-500/30 border border-orange-400 text-orange-200 text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].source}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/20 text-white text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].timeAgo}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug group-hover:text-orange-300 transition-colors">
                    {marketNews[0].title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    {marketNews[0].snippet}
                  </p>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-7 h-[360px] rounded-3xl bg-gradient-to-br from-white to-orange-50/30 border border-orange-200 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#FF6B00] border-t-transparent animate-spin" />
              </div>
            )}

            {/* Right Side Live Articles List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {marketNews.slice(1, 4).map((art) => (
                <div 
                  key={art.id} 
                  className="p-5 rounded-2xl bg-gradient-to-r from-white via-white to-orange-50/40 border border-orange-200/70 hover:border-orange-400/60 hover:bg-orange-50/50 transition-all duration-300 backdrop-blur-xl flex flex-col gap-2.5 cursor-pointer group shadow-2xs hover:shadow-xs" 
                  onClick={() => setSelectedNewsItem(art)}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-orange-100/70 border border-orange-200 text-orange-700 font-black text-[9px] uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="text-slate-500 font-semibold text-[11px]">
                        {art.source}
                      </span>
                    </div>
                    <span className="text-slate-400 font-medium text-[11px]">{art.timeAgo}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#FF6B00] font-bold mt-0.5 group-hover:underline">
                    <span>Read Summary</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Who We Are</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                About {companyName}
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  உங்கள் தங்கத்தின் நம்பிக்கையான துணை
                </span>
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/80 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <Building2 size={14} />
              <span>EST. 2024 • TRUSTED GOLD PLATFORM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Mission Card */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 backdrop-blur-xl flex flex-col gap-4 shadow-[0_10px_35px_rgba(249,115,22,0.05)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center shadow-xs">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">100% Honest Market Information</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {companyName} was created with a single purpose: to give Indian households complete clarity on gold rates, purity calculation, and gold loans without hidden jeweller commissions or misleading terms.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you are buying gold jewellery for a family wedding, investing in coins, or looking for urgent cash through a gold loan, we make sure you know the exact value of your gold.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigateAbout && onNavigateAbout()}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:underline bg-transparent border-0 cursor-pointer p-0"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Why Choose Us Stats */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 backdrop-blur-xl flex flex-col gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.05)]">
              <h4 className="text-lg font-bold text-slate-900">Why Families Trust {companyName}</h4>
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-white/90 border border-orange-200/70 flex flex-col gap-1 shadow-2xs">
                  <span className="text-xs text-slate-500 font-semibold">Gold Purity Standard</span>
                  <span className="text-base font-bold text-slate-900">100% BIS Hallmarked (916 & 999)</span>
                </div>
                
                <div className="p-4 rounded-2xl bg-white/90 border border-orange-200/70 flex flex-col gap-1 shadow-2xs">
                  <span className="text-xs text-slate-500 font-semibold">Gold Loan Interest</span>
                  <span className="text-base font-bold text-orange-600">Starting from 0.75% per month</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/90 border border-orange-200/70 flex flex-col gap-1 shadow-2xs">
                  <span className="text-xs text-slate-500 font-semibold">Hidden Charges</span>
                  <span className="text-base font-bold text-emerald-600">Zero Valuation Fees</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Tips & Market Insights Section */}
        <section id="tips">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Expert Knowledge</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Investment Tips & Market Insights
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  தங்க முதலீட்டு ஆலோசனைகள் மற்றும் சந்தை நுண்ணறிவு
                </span>
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/80 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <Lightbulb size={14} />
              <span>CURATED BY EXPERTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gold Investment Tips Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-400/60 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group shadow-xs hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">Gold Investment Tips</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Smart Buying Strategy</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Always buy BIS Hallmarked gold — verify the 6-digit HUID number for authenticity and purity assurance.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Diversify between physical gold (coins/bars), Sovereign Gold Bonds (SGBs), and Gold ETFs for balanced risk.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Invest in gold during market dips rather than peaks — track historical patterns using our live rate charts.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Limit gold to 10-15% of your total portfolio to maintain healthy asset allocation.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Complete Gold Investment Guide')}>
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Gold Loan Tips Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-400/60 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group shadow-xs hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                  <Landmark size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">Gold Loan Insights</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Borrow Against Gold</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Gold loans offer lower interest rates (7-9% p.a.) compared to personal loans (12-18%) — ideal for short-term needs.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Banks typically lend 75% of your gold's current market value (LTV ratio) — check live rates before applying.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Compare gold loan schemes from SBI, HDFC, Muthoot, and Manappuram before committing to one lender.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Always repay on time — defaulting on a gold loan means permanent loss of your pledged gold assets.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Gold Loan Complete Guide')}>
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Market Outlook Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-400/60 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group shadow-xs hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">Market Outlook 2026</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Macro Trends & Forecast</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Reserve Bank of India (RBI) continues buying gold regularly to strengthen national currency reserves.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Strong wedding season demand and household savings keep gold prices resilient across Indian cities.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>During the Indian wedding season (October to February), gold jewellery demand peaks across the country.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>Experts expect steady long-term growth in gold value driven by household savings and jewellery purchases.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Full Market Outlook Report')}>
                <span>Read Full Report</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Consumer FAQ Section */}
        <section id="faq">
          <div className="flex flex-col items-center text-center gap-1 mb-8">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Frequently Asked Questions
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                அடிக்கடி கேட்கப்படும் பொதுவான கேள்விகள் மற்றும் விளக்கங்கள்
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4 w-full">
            {FAQ_ITEMS.map((faq) => (
              <div 
                key={faq.id} 
                className={`p-6 rounded-2xl border transition-all backdrop-blur-xl cursor-pointer flex flex-col gap-3 shadow-2xs hover:shadow-xs ${openFaqId === faq.id ? 'bg-orange-50/70 border-orange-300 shadow-xs' : 'bg-gradient-to-r from-white via-white to-orange-50/30 border-orange-200/70 hover:border-orange-400/60'}`}
                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-[#FF6B00] shrink-0" />
                    <span className="text-base font-bold text-slate-900">{faq.question}</span>
                  </div>
                  {openFaqId === faq.id ? <ChevronUp size={20} className="text-[#FF6B00] shrink-0" /> : <ChevronDown size={20} className="text-slate-400 shrink-0" />}
                </div>

                {openFaqId === faq.id && (
                  <p className="text-sm text-slate-700 leading-relaxed pt-3 border-t border-orange-200/60">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Institutional Trust Banner via Reusable Component */}
        <TrustBanner />
      </main>

      {/* Website Footer via Reusable Component */}
      <Footer
        onNavigateHome={onNavigateHome || (() => scrollToSection('overview'))}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onNavigateBranches={onNavigateBranches}
        onNavigateContact={onNavigateContact}
        onScrollToSection={scrollToSection}
      />

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowWalletModal(false)}>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col gap-6 shadow-2xl relative text-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">My Gold Holdings</h3>
              <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border-0 cursor-pointer" onClick={() => setShowWalletModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200/80">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">TOTAL GOLD VALUE</span>
              <h2 className="text-3xl font-black text-orange-600 my-2">
                ₹96,797
              </h2>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Holdings: 15.50 Grams 24K</span>
                <span className="text-emerald-600 font-bold">+12.4% Gain</span>
              </div>
            </div>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0" onClick={() => setShowWalletModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Generic Tool / Insight Modal */}
      {activeModalTitle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveModalTitle(null)}>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col gap-6 shadow-2xl relative text-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">{activeModalTitle}</h3>
              <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border-0 cursor-pointer" onClick={() => setActiveModalTitle(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {activeModalTitle.includes('Indices') 
                ? 'SENSEX and NIFTY 50 reflect the overall Indian stock market. Historically, gold acts as a safe haven: when stock markets fluctuate, gold demand goes up.'
                : `${activeModalTitle} provides real-time market updates, purity guides, and accurate calculations to help you make smart decisions with your gold.`}
            </p>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0" onClick={() => setActiveModalTitle(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Live Market Article Detail Modal - Always in Tamil */}
      {selectedNewsItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedNewsItem(null)}>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col gap-5 shadow-2xl relative text-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Newspaper size={20} className="text-[#FF6B00]" />
                <h3 className="text-lg font-extrabold text-slate-900">Live Market News</h3>
              </div>
              <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border-0 cursor-pointer" onClick={() => setSelectedNewsItem(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-extrabold tracking-wider">
                  {selectedNewsItem.category}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-600 text-[10px] font-extrabold tracking-wider">
                  {selectedNewsItem.source}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedNewsItem.timeAgo}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {selectedNewsItem.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedNewsItem.snippet}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              {selectedNewsItem.link && selectedNewsItem.link !== '#' && (
                <a
                  href={selectedNewsItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer text-center no-underline flex items-center justify-center gap-2"
                >
                  <span>Read Full Article</span>
                  <ExternalLink size={16} />
                </a>
              )}
              <button 
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all cursor-pointer"
                onClick={() => setSelectedNewsItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legacy Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowArticleModal(false)}>
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col gap-6 shadow-2xl relative text-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">Market Update</h3>
              <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border-0 cursor-pointer" onClick={() => setShowArticleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-extrabold tracking-wider w-fit">GOLD NEWS</span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Why Central Banks are increasing their Gold reserves.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Central banks across the world and the Reserve Bank of India (RBI) have been buying record amounts of pure gold to protect national wealth against inflation and market risks.
              </p>
            </div>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0" onClick={() => setShowArticleModal(false)}>
              Close Article
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
