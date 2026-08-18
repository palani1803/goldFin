import { useState, useEffect, useCallback } from 'react'
import {
  Calculator,
  LineChart,
  X,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Coins,
  CoinsIcon,
  Scale,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Building2,
  Target,
  Users,
  CheckCircle2,
  Lightbulb,
  Landmark,
  BarChart3,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  RefreshCw,
  Newspaper
} from 'lucide-react'
import heroBg from '../assets/gold_hero_bg.png'
import goldBullionImg from '../assets/hero_gold_bullion.png'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'



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

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How is the Gold Calculator price calculated?',
    answer: 'The calculation uses the live 24K spot bullion rate as a baseline fetched from Indian domestic benchmarks (IBJA / MCX). For lower karats (22K, 20K, 18K), the rate is proportionally derived based on pure gold content (e.g. 22K = 24K Rate × 22/24).'
  },
  {
    id: 2,
    question: 'What is the standard GST tax on gold in India?',
    answer: 'A standard 3% GST (Goods and Services Tax) is applicable on the total gold purchase amount, plus 5% GST on making charges.'
  },
  {
    id: 3,
    question: 'What is the difference between 24K and 22K Gold?',
    answer: '24K gold contains 99.9% pure gold, making it soft and ideal for investment coins and bars. 22K gold contains 91.6% pure gold alloyed with zinc or copper for durable jewelry creation.'
  },
  {
    id: 4,
    question: 'Are the live spot rates updated in real-time?',
    answer: 'Yes, GoldFin feeds real-time domestic spot pricing directly from Indian bullion exchange benchmarks (IBJA / MCX). Prices are auto-updated daily at 10:00 AM IST and also refreshed on each server start.'
  }
]

interface HomePageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
}

export default function HomePage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
}: HomePageProps = {}) {
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

  // Fetch on mount + auto-refresh every 5 minutes
  useEffect(() => {
    fetchLiveRates()
    fetchMarketNews()
    const interval = setInterval(() => {
      fetchLiveRates()
      fetchMarketNews()
    }, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchLiveRates, fetchMarketNews])

  // --- Reference Gold Calculator State ---
  const [calcMode, setCalcMode] = useState<'amount' | 'gold'>('amount')
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedCarat, setSelectedCarat] = useState<number>(22)
  const [isCalculated, setIsCalculated] = useState<boolean>(false)

  // 24K Base Spot Rate — from live API (fallback to 0)
  const rate24kData = liveRates.find((r) => r.purityId === '24k')
  const spotRate24K = rate24kData?.pricePerGram || 0
  // Rate per gram for selected carat: (24K Rate * Carat / 24)
  const rateForCarat = Math.round(spotRate24K * (selectedCarat / 24))

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
    <div className="flex flex-col min-h-screen w-full relative bg-[#121212] text-[#E5E5E5] font-sans antialiased selection:bg-[#C89B2A]/30 selection:text-yellow-200">
      {/* Reusable Gold Luxury Background (Texture + Animated Floating Glows) */}
      <GoldBackground textureOpacity={0.08} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="home"
        onNavigateHome={onNavigateHome || (() => scrollToSection('overview'))}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onScrollToSection={scrollToSection}
        spotRate24K={spotRate24K}
      />

      {/* Hero Section */}
      <section id="overview" className="relative pt-10 md:pt-14 pb-16 md:pb-24 bg-cover bg-center overflow-hidden border-b border-white/5" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/92 via-[#121212]/85 to-[#121212]" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit">
                <Sparkles size={14} />
                <span>INSTITUTIONAL BULLION PLATFORM</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Secure Your Future, <br />
                <span className="bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] bg-clip-text text-transparent">Invest in Pure Gold</span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
                Gold is a timeless asset that protects wealth from inflation and market volatility. Calculate exact gold rate with taxes in seconds, track live market prices, and make smart investment decisions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0 flex items-center gap-2"
                  onClick={() => scrollToSection('calculator')}
                >
                  <Calculator size={18} />
                  <span>Open Calculator</span>
                </button>
                <button
                  className="px-7 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white font-bold text-sm hover:bg-white/10 hover:border-[#C89B2A]/40 transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md"
                  onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                >
                  <LineChart size={18} />
                  <span>View Live Rates</span>
                </button>
              </div>


            </div>

            {/* Right Gold Bullion Showcase Image */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center pt-10 pb-6 px-6 md:px-8 rounded-3xl bg-[#222222]/60 border border-white/[0.08] backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] group hover:border-[#C89B2A]/25 transition-all duration-500">
              {/* Radial gold glow behind the image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(234,179,8,0.12)_0%,rgba(234,179,8,0.04)_50%,transparent_70%)] blur-[30px]" />
              </div>

              {/* Top badge */}
              <div className="absolute -top-3.5 z-20 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#DAAE4D] via-[#C89B2A] to-amber-600 text-slate-950 font-extrabold text-[11px] tracking-wider shadow-[0_4px_20px_rgba(234,179,8,0.4)] flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>999.9 FINE GOLD BULLION</span>
              </div>

              {/* Gold bullion image */}
              <img
                src={goldBullionImg}
                alt="Premium Gold Bullion"
                className="relative z-10 w-full max-w-[420px] h-auto object-contain drop-shadow-[0_25px_50px_rgba(234,179,8,0.2)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Bottom info strip */}
              <div className="relative z-10 mt-5 w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-black/40 border border-white/[0.06] backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#DAAE4D]" />
                  <span className="text-[#F3C55B] text-[11px] font-bold tracking-wide">BIS HALLMARK CERTIFIED</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="font-bold text-slate-400">Spot</span>
                  <span className="font-extrabold text-white">₹{spotRate24K > 0 ? spotRate24K.toLocaleString('en-IN') : '...'}</span>
                  {rate24kData && <span className={`font-bold ${rate24kData.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{rate24kData.isUp ? '↑' : '↓'}</span>}
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
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Real-Time Metal Valuation</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Gold Rate Calculator</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DAAE4D] bg-[#C89B2A]/10 border border-[#C89B2A]/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <CoinsIcon size={14} />
              <span>LIVE SPOT RATE: ₹{spotRate24K > 0 ? spotRate24K.toLocaleString('en-IN') : '...'}/g</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <div className="p-6 md:p-8 rounded-3xl bg-[#222222]/80 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6">
              {/* Dual Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-[#1A1A1A] rounded-2xl border border-white/5">
                <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-0 ${calcMode === 'amount' ? 'bg-gradient-to-r from-[#DAAE4D] to-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-transparent'}`}
                  onClick={() => {
                    setCalcMode('amount')
                    setInputValue('')
                    setIsCalculated(false)
                  }}
                >
                  <Coins size={18} />
                  <span>Amount Required</span>
                </button>
                <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-0 ${calcMode === 'gold' ? 'bg-gradient-to-r from-[#DAAE4D] to-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-transparent'}`}
                  onClick={() => {
                    setCalcMode('gold')
                    setInputValue('')
                    setIsCalculated(false)
                  }}
                >
                  <Scale size={18} />
                  <span>Gold in hand</span>
                </button>
              </div>

              {/* Input Field */}
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#DAAE4D] font-extrabold text-lg">
                  {calcMode === 'amount' ? '₹' : 'g'}
                </span>
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-4 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white font-bold text-lg focus:outline-none focus:border-[#DAAE4D] transition-colors"
                  placeholder={calcMode === 'amount' ? 'Enter amount (e.g. 50000)' : 'Enter weight in grams (e.g. 10)'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setIsCalculated(false)
                  }}
                />
              </div>

              {/* Quick Presets Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Quick Presets:</span>
                {calcMode === 'amount' ? (
                  <>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('25000')}>₹25,000</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('50000')}>₹50,000</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('100000')}>₹1,00,000</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('500000')}>₹5,00,000</button>
                  </>
                ) : (
                  <>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('5')}>5 Grams</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('10')}>10 Grams</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('11.66')}>1 Tola (11.66g)</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('50')}>50 Grams</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('100')}>100 Grams</button>
                  </>
                )}
              </div>

              {/* Carat Value Pills Selector */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Choose the carat value of your gold</div>
                <div className="grid grid-cols-6 gap-2">
                  {[18, 19, 20, 21, 22, 24].map((carat) => (
                    <button
                      key={carat}
                      className={`py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer text-center ${selectedCarat === carat ? 'bg-[#C89B2A]/20 border-[#DAAE4D] text-[#F3C55B] shadow-sm' : 'bg-[#1A1A1A] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                      onClick={() => setSelectedCarat(carat)}
                    >
                      {carat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result / Instruction Banner Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#222222] border border-[#C89B2A]/20 text-center flex flex-col gap-1">
                {calcMode === 'amount' ? (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Gold Weight:</div>
                      <div className="text-2xl md:text-3xl font-black text-[#DAAE4D] tracking-tight">
                        {calculatedGoldWeight} Grams of {selectedCarat}K Gold
                      </div>
                      <div className="text-xs font-medium text-slate-400 mt-1">
                        Based on {selectedCarat}K Gold rate: ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-400">
                      Enter the amount and carat value to see how much gold is required.
                    </div>
                  )
                ) : (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Valuation:</div>
                      <div className="text-2xl md:text-3xl font-black text-[#DAAE4D] tracking-tight">
                        ₹{calculatedRupees}
                      </div>
                      <div className="text-xs font-medium text-slate-400 mt-1">
                        For {parsedVal} Grams of {selectedCarat}K Gold @ ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-400">
                      Enter the weight in grams and carat value to calculate your gold valuation.
                    </div>
                  )
                )}
              </div>

              {/* Calculate Action Button */}
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-base hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={handleCalculate}>
                Calculate
              </button>

              {/* Note Footer */}
              <div className="text-xs text-slate-500 text-center leading-relaxed">
                <strong className="text-slate-400">Note:</strong> The displayed amount is an approximate value based on live exchange spot rates. Final value depends on branch appraisal.
              </div>
            </div>
          </div>
        </section>

        {/* Purity Rates Section */}
        <section id="rates">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Real-Time Bullion Prices</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Live Purity Rates</h2>
              {lastUpdatedTime && (
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">Last updated: {lastUpdatedTime}</span>
              )}
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DAAE4D] bg-[#C89B2A]/10 border border-[#C89B2A]/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE EXCHANGE FEED</span>
            </div>
          </div>

          {ratesError && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
              {ratesError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ratesLoading ? (
              // Loading skeleton cards
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded-lg w-3/4" />
                  <div className="h-8 bg-white/10 rounded-lg w-1/2" />
                  <div className="h-3 bg-white/5 rounded-lg w-full mt-2" />
                </div>
              ))
            ) : (
              liveRates
                .filter((item) => item.purityId !== 'silver')
                .map((item) => (
                <div key={item.purityId} className={`p-6 rounded-3xl bg-[#222222]/70 border backdrop-blur-xl flex flex-col gap-4 group transition-all duration-300 ${item.purityId === '24k' ? 'border-[#C89B2A]/40 bg-[#222222]/90 shadow-[0_10px_30px_rgba(234,179,8,0.1)]' : 'border-white/10 hover:border-[#C89B2A]/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold tracking-wider text-slate-300">{item.name}</span>
                    {item.purityId === '24k' && <span className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full bg-[#C89B2A]/20 border border-[#C89B2A]/40 text-[#F3C55B]">MOST POPULAR</span>}
                  </div>
                  <div className="text-3xl font-black text-white group-hover:text-[#DAAE4D] transition-colors">₹{item.pricePerGram.toLocaleString('en-IN')}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs font-medium text-slate-400">{item.karat} • {item.unit}</span>
                    <div className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${item.isUp ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'}`}>
                      {item.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span>{item.isUp ? `+${item.changePercent}%` : `-${item.changePercent}%`}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Market Analysis Grid (Live Market News Feed) */}
        <section id="analysis">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Live Bullion & Macro Feed</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Market Analysis & News</h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchMarketNews}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#DAAE4D]/40 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                title="Refresh live news"
              >
                <RefreshCw size={13} className={newsLoading ? 'animate-spin text-[#DAAE4D]' : 'text-[#DAAE4D]'} />
                <span>{newsLoading ? 'Updating...' : 'Refresh Feed'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Featured Live Article */}
            {marketNews.length > 0 ? (
              <div 
                className="lg:col-span-7 relative min-h-[360px] rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-end border border-white/10 group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#DAAE4D]/40 transition-all"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80')` }}
                onClick={() => setSelectedNewsItem(marketNews[0])}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent" />
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#DAAE4D]/20 border border-[#DAAE4D]/40 text-[#F3C55B] text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].source}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-slate-300 text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].timeAgo}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug group-hover:text-[#F3C55B] transition-colors">
                    {marketNews[0].title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {marketNews[0].snippet}
                  </p>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-7 h-[360px] rounded-3xl bg-[#222222]/70 border border-white/10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#DAAE4D] border-t-transparent animate-spin" />
              </div>
            )}

            {/* Right Side Live Articles List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {marketNews.slice(1, 4).map((art) => (
                <div 
                  key={art.id} 
                  className="p-5 rounded-2xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 hover:bg-[#222222]/90 transition-all duration-300 backdrop-blur-xl flex flex-col gap-2.5 cursor-pointer group" 
                  onClick={() => setSelectedNewsItem(art)}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#C89B2A]/15 border border-[#C89B2A]/30 text-[#DAAE4D] font-black text-[9px] uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="text-slate-400 font-semibold text-[11px]">
                        {art.source}
                      </span>
                    </div>
                    <span className="text-slate-500 font-medium text-[11px]">{art.timeAgo}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-[#DAAE4D] transition-colors leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#DAAE4D] font-bold mt-0.5 group-hover:underline">
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
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Who We Are</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">About GoldFin</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DAAE4D] bg-[#C89B2A]/10 border border-[#C89B2A]/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <Building2 size={14} />
              <span>EST. 2024 • INSTITUTIONAL BULLION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold w-fit">
                <Target size={14} />
                <span>OUR MISSION & VISION</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Democratizing Institutional Precious Metal Intelligence
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                GoldFin was founded with a singular commitment: to bring institutional-grade spot bullion pricing, real-time purity tracking, and 100% transparent GST calculations to individual investors, jewelers, and financial institutions across India.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Whether you are evaluating a family gold purchase, tracking 24K bullion spot movements, or planning long-term Sovereign Gold Bond portfolios, GoldFin delivers real-time bullion exchange feeds with zero delay.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                  <span>Direct Integration with MCX & Indian Bullion (IBJA) Benchmarks</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                  <span>BIS Hallmarked 999.9 Purity Calculation Standard</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                  <span>Automated Indian GST (3%) & Making Charge Itemization</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
              <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Platform Impact & Reach</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#1A1A1A]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-[#C89B2A]/10 flex items-center justify-center text-[#DAAE4D] mb-1">
                    <Coins size={20} />
                  </div>
                  <div className="text-xl font-black text-white">₹500Cr+</div>
                  <div className="text-[11px] font-medium text-slate-400">Monthly Valued Bullion</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1A1A]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-[#C89B2A]/10 flex items-center justify-center text-[#DAAE4D] mb-1">
                    <Zap size={20} />
                  </div>
                  <div className="text-xl font-black text-white">99.99%</div>
                  <div className="text-[11px] font-medium text-slate-400">Spot Feed Uptime</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1A1A]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-[#C89B2A]/10 flex items-center justify-center text-[#DAAE4D] mb-1">
                    <Users size={20} />
                  </div>
                  <div className="text-xl font-black text-white">150,000+</div>
                  <div className="text-[11px] font-medium text-slate-400">Active Investors</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1A1A]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-[#C89B2A]/10 flex items-center justify-center text-[#DAAE4D] mb-1">
                    <Award size={20} />
                  </div>
                  <div className="text-xl font-black text-white">100%</div>
                  <div className="text-[11px] font-medium text-slate-400">BIS Hallmark Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Tips & Market Insights Section */}
        <section id="tips">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Expert Knowledge</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Investment Tips & Market Insights</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DAAE4D] bg-[#C89B2A]/10 border border-[#C89B2A]/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <Lightbulb size={14} />
              <span>CURATED BY EXPERTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gold Investment Tips Card */}
            <div className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">Gold Investment Tips</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Smart Buying Strategy</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Always buy BIS Hallmarked gold — verify the 6-digit HUID number for authenticity and purity assurance.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Diversify between physical gold (coins/bars), Sovereign Gold Bonds (SGBs), and Gold ETFs for balanced risk.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Invest in gold during market dips rather than peaks — track historical patterns using our live rate charts.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Limit gold to 10-15% of your total portfolio to maintain healthy asset allocation.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Complete Gold Investment Guide')}>
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Gold Loan Tips Card */}
            <div className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <Landmark size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">Gold Loan Insights</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Borrow Against Gold</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Gold loans offer lower interest rates (7-9% p.a.) compared to personal loans (12-18%) — ideal for short-term needs.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Banks typically lend 75% of your gold's current market value (LTV ratio) — check live rates before applying.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Compare gold loan schemes from SBI, HDFC, Muthoot, and Manappuram before committing to one lender.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Always repay on time — defaulting on a gold loan means permanent loss of your pledged gold assets.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Gold Loan Complete Guide')}>
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Market Outlook Card */}
            <div className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">Market Outlook 2026</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Macro Trends & Forecast</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Reserve Bank of India (RBI) and domestic institutions continue steady bullion accumulation to reinforce sovereign reserves.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Domestic physical demand and inflation hedging continue to provide a firm floor for Indian gold rates.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>The Indian wedding season (Oct-Feb) historically pushes domestic gold premiums up by 2-4% over spot.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Analysts project healthy long-term domestic appreciation supported by rural savings and jewelry demand.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Full Market Outlook Report')}>
                <span>Read Full Report</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Consumer FAQ Section */}
        <section id="faq">
          <div className="flex flex-col items-center text-center gap-1 mb-8">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Got Questions?</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4 w-full">
            {FAQ_ITEMS.map((faq) => (
              <div 
                key={faq.id} 
                className="p-6 rounded-2xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 transition-all backdrop-blur-xl cursor-pointer flex flex-col gap-3"
                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-[#DAAE4D] shrink-0" />
                    <span className="text-base font-bold text-white">{faq.question}</span>
                  </div>
                  {openFaqId === faq.id ? <ChevronUp size={20} className="text-[#DAAE4D] shrink-0" /> : <ChevronDown size={20} className="text-slate-500 shrink-0" />}
                </div>

                {openFaqId === faq.id && (
                  <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-white/5">{faq.answer}</p>
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
        onScrollToSection={scrollToSection}
      />

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowWalletModal(false)}>
          <div className="bg-[#222222] border border-[#C89B2A]/30 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-extrabold text-white">My Gold Holdings</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setShowWalletModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-[#1A1A1A]">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL PORTFOLIO VALUE</span>
              <h2 className="text-3xl font-black text-[#DAAE4D] my-2">
                ₹96,797
              </h2>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Holdings: 15.50 Grams 24K</span>
                <span className="text-emerald-400 font-bold">+12.4% Profit</span>
              </div>
            </div>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={() => setShowWalletModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Generic Tool / Insight Modal */}
      {activeModalTitle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveModalTitle(null)}>
          <div className="bg-[#222222] border border-[#C89B2A]/30 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-extrabold text-white">{activeModalTitle}</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setActiveModalTitle(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {activeModalTitle.includes('Indices') 
                ? 'SENSEX and NIFTY 50 reflect the overall Indian equity market sentiment. Historically, gold acts as a hedge: when equities face volatility, gold demand surges.'
                : `${activeModalTitle} gives you real-time data feeds, institutional market depth, and instant analytics designed for smart precious metal investors.`}
            </p>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={() => setActiveModalTitle(null)}>
              Close View
            </button>
          </div>
        </div>
      )}

      {/* Live Market Article Detail Modal */}
      {selectedNewsItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedNewsItem(null)}>
          <div className="bg-[#222222] border border-[#C89B2A]/30 p-6 md:p-8 rounded-3xl max-w-lg w-full flex flex-col gap-5 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Newspaper size={20} className="text-[#DAAE4D]" />
                <h3 className="text-lg font-extrabold text-white">Live Market Analysis</h3>
              </div>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setSelectedNewsItem(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-extrabold tracking-wider">
                  {selectedNewsItem.category}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#DAAE4D]/20 border border-[#DAAE4D]/40 text-[#F3C55B] text-[10px] font-extrabold tracking-wider">
                  {selectedNewsItem.source}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Published {selectedNewsItem.timeAgo}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">
                {selectedNewsItem.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed bg-[#1A1A1A] p-4 rounded-2xl border border-white/5">
                {selectedNewsItem.snippet}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              {selectedNewsItem.link && selectedNewsItem.link !== '#' && (
                <a
                  href={selectedNewsItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer text-center no-underline flex items-center justify-center gap-2"
                >
                  <span>Open Full Article</span>
                  <ExternalLink size={16} />
                </a>
              )}
              <button 
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowArticleModal(false)}>
          <div className="bg-[#222222] border border-[#C89B2A]/30 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-extrabold text-white">Market Insight Report</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setShowArticleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-extrabold tracking-wider w-fit">MARKET ALERT</span>
              <h3 className="text-lg font-extrabold text-white">
                Why Central Banks are increasing their Gold reserves.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Global central banks added record volumes of physical bullion to official reserves. Diversification away from single-currency concentration and macro inflation risk remain top drivers.
              </p>
            </div>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={() => setShowArticleModal(false)}>
              Close Article
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
