import { useState, useEffect, useCallback } from 'react'
import {
  Calculator,
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
  Newspaper
} from 'lucide-react'
import heroBg from '../assets/gold_hero_bg.png'
import goldBullionImg from '../assets/hero_gold_broad.jpg'
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
    answer: 'The calculation uses today\'s live 24K pure gold rate fetched from Indian domestic benchmarks (IBJA / MCX). For jewellery karats (22K, 20K, 18K), the rate is calculated based on pure gold content (for example, 22K = 24K Rate × 22/24).'
  },
  {
    id: 2,
    question: 'What is the GST on gold in India?',
    answer: 'In India, a standard 3% GST (Goods and Services Tax) is applicable on the gold value, plus 5% GST on jeweller making charges.'
  },
  {
    id: 3,
    question: 'What is the difference between 24K and 22K Gold?',
    answer: '24K gold is 99.9% pure gold, making it soft and ideal for investment coins and bars. 22K gold (916 hallmark) contains 91.6% pure gold mixed with a little copper or silver to make durable, long-lasting jewellery.'
  },
  {
    id: 4,
    question: 'How often are the live gold rates updated?',
    answer: 'Yes, GoldFin updates live gold prices directly from Indian market benchmarks (IBJA / MCX). Prices are updated daily around 10:00 AM IST and refreshed regularly throughout the day.'
  }
]

interface HomePageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateContact?: () => void
}

export default function HomePage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateContact,
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
    <div className="flex flex-col min-h-screen w-full relative bg-[#070D1E] text-[#F1F4F9] font-sans antialiased selection:bg-[#C89B2A]/30 selection:text-yellow-200">
      {/* Reusable Gold Luxury Background (Texture + Animated Floating Glows) */}
      <GoldBackground textureOpacity={0.08} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="home"
        onNavigateHome={onNavigateHome || (() => scrollToSection('overview'))}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
        onNavigateContact={onNavigateContact}
        onScrollToSection={scrollToSection}
        spotRate24K={spotRate24K}
      />

      {/* Hero Section */}
      <section id="overview" className="relative pt-10 md:pt-14 pb-16 md:pb-24 bg-cover bg-center overflow-hidden border-b border-[#1E3159]/50" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D1E]/92 via-[#0A1329]/85 to-[#070D1E]" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col gap-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit">
                <Sparkles size={14} />
                <span>LIVE GOLD RATES & LOANS</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Secure Your Future, <br />
                <span className="bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] bg-clip-text text-transparent">Invest in Pure Gold</span>
              </h1>
              <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
                Gold is a timeless asset that protects your family savings from inflation. Calculate exact gold prices with GST in seconds, track live city rates, and get instant gold loans with minimum paperwork.
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
                  className="px-7 py-3.5 rounded-2xl bg-[#080E1E]/80 border border-[#1E3159] text-white font-bold text-sm hover:bg-[#0D172E] hover:border-[#DAAE4D]/40 transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md shadow-lg"
                  onClick={() => (onNavigateLiveRate ? onNavigateLiveRate() : scrollToSection('rates'))}
                >
                  <LineChart size={18} />
                  <span>View Live Rates</span>
                </button>
              </div>
            </div>

            {/* Right Broad Unboxed Gold Showcase Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-4 lg:py-0">
              {/* Expansive Ambient Radial Gold & Sapphire Glow behind the unboxed visual */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[110%] h-[110%] max-w-[580px] max-h-[580px] bg-[radial-gradient(circle,rgba(243,197,91,0.18)_0%,rgba(30,64,175,0.12)_45%,transparent_72%)] blur-[50px] animate-aura-pulse" />
              </div>

              {/* Floating Badge: Top Left (Purity Verification) */}
              <div className="absolute -top-3 left-2 sm:left-4 z-20 px-3.5 py-2 rounded-2xl bg-[#080E1E]/90 border border-[#DAAE4D]/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(4,8,19,0.8)] flex items-center gap-2 animate-bounce-subtle">
                <div className="w-6 h-6 rounded-lg bg-[#C89B2A]/20 flex items-center justify-center text-[#F3C55B]">
                  <ShieldCheck size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#F3C55B] tracking-wider uppercase">BIS 916 & 999</span>
                  <span className="text-[9px] font-semibold text-slate-400">Certified Pure Gold</span>
                </div>
              </div>

              {/* Floating Badge: Top Right (Live Rate Pulse) */}
              <div className="absolute top-2 right-2 sm:right-4 z-20 px-3.5 py-2 rounded-2xl bg-[#080E1E]/90 border border-[#1E3159] backdrop-blur-xl shadow-[0_10px_30px_rgba(4,8,19,0.8)] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Live 24K / Gram</span>
                  <span className="text-xs font-black text-white">
                    ₹{spotRate24K > 0 ? spotRate24K.toLocaleString('en-IN') : '13,535'}
                    {rate24kData && <span className={`ml-1 text-[10px] ${rate24kData.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{rate24kData.isUp ? '▲' : '▼'}</span>}
                  </span>
                </div>
              </div>

              {/* Broad Unboxed Gold Ingot Visual with Soft Radial Blend */}
              <div className="relative z-10 w-full max-w-[500px] flex items-center justify-center">
                <img
                  src={goldBullionImg}
                  alt="Pure 24K Gold Bullion Ingot and Sovereign Coins"
                  className="w-full h-auto object-contain rounded-3xl drop-shadow-[0_25px_60px_rgba(218,174,77,0.22)] transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              {/* Floating Badge: Bottom Left (Instant Gold Loan) */}
              <div className="absolute -bottom-3 left-2 sm:left-6 z-20 px-4 py-2 rounded-2xl bg-[#080E1E]/90 border border-[#DAAE4D]/35 backdrop-blur-xl shadow-[0_10px_30px_rgba(4,8,19,0.8)] flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#F3C55B] to-[#C89B2A] flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
                  ⚡
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white">Instant Gold Loans</span>
                  <span className="text-[9px] font-semibold text-[#DAAE4D]">Up to 75% RBI Value • 0.75%/mo</span>
                </div>
              </div>

              {/* Floating Badge: Bottom Right (Safe Vault) */}
              <div className="hidden sm:flex absolute -bottom-1 right-2 sm:right-6 z-20 px-3.5 py-1.5 rounded-2xl bg-[#080E1E]/90 border border-[#1E3159] backdrop-blur-xl shadow-[0_10px_30px_rgba(4,8,19,0.8)] items-center gap-2 text-slate-300">
                <span className="text-xs">🔒</span>
                <span className="text-[10px] font-bold text-slate-300">100% Insured Bank Locker</span>
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
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Instant Gold Calculator</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Gold Rate & Value Calculator</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DAAE4D] bg-[#C89B2A]/10 border border-[#C89B2A]/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <CoinsIcon size={14} />
              <span>TODAY'S 24K RATE: ₹{spotRate24K > 0 ? spotRate24K.toLocaleString('en-IN') : '...'}/g</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <div className="p-6 md:p-8 rounded-3xl bg-[#0D172E]/85 border border-[#1E3159] backdrop-blur-xl shadow-[0_20px_50px_rgba(4,8,19,0.6)] flex flex-col gap-6">
              {/* Dual Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-[#080E1E] rounded-2xl border border-[#192847]">
                <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-0 ${calcMode === 'amount' ? 'bg-gradient-to-r from-[#DAAE4D] to-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-transparent'}`}
                  onClick={() => {
                    setCalcMode('amount')
                    setInputValue('')
                    setIsCalculated(false)
                  }}
                >
                  <Coins size={18} />
                  <span>By Investment Amount (₹)</span>
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
                  <span>By Weight in Grams (g)</span>
                </button>
              </div>

              {/* Input Field */}
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#DAAE4D] font-extrabold text-lg">
                  {calcMode === 'amount' ? '₹' : 'g'}
                </span>
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-4 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white font-bold text-lg focus:outline-none focus:border-[#DAAE4D] transition-colors"
                  placeholder={calcMode === 'amount' ? 'Enter amount in Rupees (e.g. 50000)' : 'Enter weight in grams (e.g. 10)'}
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
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('8')}>8 Grams (1 Pavan)</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('10')}>10 Grams</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('11.66')}>1 Tola (11.66g)</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-[#C89B2A]/10 border border-white/10 hover:border-[#C89B2A]/40 text-slate-300 hover:text-[#DAAE4D] transition-all cursor-pointer" onClick={() => handlePresetSelect('50')}>50 Grams</button>
                  </>
                )}
              </div>

              {/* Karat Value Selector */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Gold Purity (Karat)</div>
                <div className="grid grid-cols-6 gap-2">
                  {[18, 19, 20, 21, 22, 24].map((carat) => (
                    <button
                      key={carat}
                      className={`py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer text-center ${selectedCarat === carat ? 'bg-[#C89B2A]/20 border-[#DAAE4D] text-[#F3C55B] shadow-sm' : 'bg-[#080E1E] border-[#1E3159] text-slate-400 hover:border-[#DAAE4D]/30 hover:text-white'}`}
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

              {/* Result / Instruction Banner Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#080E1E] to-[#0D172E] border border-[#C89B2A]/30 text-center flex flex-col gap-1">
                {calcMode === 'amount' ? (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">You Can Buy Approximately:</div>
                      <div className="text-2xl md:text-3xl font-black text-[#DAAE4D] tracking-tight">
                        {calculatedGoldWeight} Grams of {selectedCarat}K Gold
                      </div>
                      <div className="text-xs font-medium text-slate-400 mt-1">
                        Based on {selectedCarat}K Gold rate: ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-400">
                      Enter your budget amount and karat to see how much gold you can buy.
                    </div>
                  )
                ) : (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Gold Value:</div>
                      <div className="text-2xl md:text-3xl font-black text-[#DAAE4D] tracking-tight">
                        ₹{calculatedRupees}
                      </div>
                      <div className="text-xs font-medium text-slate-400 mt-1">
                        For {parsedVal} Grams of {selectedCarat}K Gold @ ₹{rateForCarat.toLocaleString('en-IN')}/gram
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-slate-400">
                      Enter weight in grams and select karat to calculate your gold's total value.
                    </div>
                  )
                )}
              </div>

              {/* Calculate Action Button */}
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-base hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={handleCalculate}>
                Calculate Gold Value
              </button>

              {/* Note Footer */}
              <div className="text-xs text-slate-500 text-center leading-relaxed">
                <strong className="text-slate-400">Note:</strong> Value is calculated based on today's live market rate. Making charges and 3% GST will be extra at jewellery stores.
              </div>
            </div>
          </div>
        </section>

        {/* Purity Rates Section */}
        <section id="rates">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Today's Gold Rates in India</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Live Purity Rates (Per 1 Gram)</h2>
              {lastUpdatedTime && (
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">Last updated: {lastUpdatedTime}</span>
              )}
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#DAAE4D] bg-[#C89B2A]/10 border border-[#C89B2A]/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE MARKET RATES</span>
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
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-3xl bg-[#0D172E]/75 border border-[#1E3159] backdrop-blur-xl flex flex-col gap-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded-lg w-3/4" />
                  <div className="h-8 bg-white/10 rounded-lg w-1/2" />
                  <div className="h-3 bg-white/5 rounded-lg w-full mt-2" />
                </div>
              ))
            ) : (
              liveRates
                .filter((item) => item.purityId !== 'silver')
                .map((item) => (
                <div key={item.purityId} className={`p-6 rounded-3xl bg-[#0D172E]/80 border backdrop-blur-xl flex flex-col gap-4 group transition-all duration-300 ${item.purityId === '24k' ? 'border-[#C89B2A]/50 bg-[#0E1B38] shadow-[0_10px_30px_rgba(234,179,8,0.12)]' : 'border-[#1E3159] hover:border-[#C89B2A]/40'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold tracking-wider text-slate-300">{item.name}</span>
                    {item.purityId === '24k' && <span className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full bg-[#C89B2A]/20 border border-[#C89B2A]/40 text-[#F3C55B]">24K PURE GOLD</span>}
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
                <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Live Gold Market Updates</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Gold Market News & Daily Trends</h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchMarketNews}
                className="px-3.5 py-1.5 rounded-xl bg-[#080E1E] border border-[#1E3159] hover:border-[#DAAE4D]/40 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
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
                className="lg:col-span-7 relative min-h-[360px] rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-end border border-[#1E3159] group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#DAAE4D]/40 transition-all"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80')` }}
                onClick={() => setSelectedNewsItem(marketNews[0])}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/70 to-transparent" />
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#DAAE4D]/20 border border-[#DAAE4D]/40 text-[#F3C55B] text-[10px] font-extrabold tracking-wider">
                      {marketNews[0].source}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#080E1E]/50 text-slate-300 text-[10px] font-extrabold tracking-wider">
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
              <div className="lg:col-span-7 h-[360px] rounded-3xl bg-[#0D172E]/75 border border-[#1E3159] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#DAAE4D] border-t-transparent animate-spin" />
              </div>
            )}

            {/* Right Side Live Articles List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {marketNews.slice(1, 4).map((art) => (
                <div 
                  key={art.id} 
                  className="p-5 rounded-2xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/40 hover:bg-[#0E1B38] transition-all duration-300 backdrop-blur-xl flex flex-col gap-2.5 cursor-pointer group" 
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
              <span>EST. 2024 • TRUSTED GOLD PLATFORM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Mission Card */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] backdrop-blur-xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-2xl font-bold text-white">100% Honest Market Information</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                GoldFin was created with a single purpose: to give Indian households complete clarity on gold rates, purity calculation, and gold loans without hidden jeweller commissions or misleading terms.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Whether you are buying gold jewellery for a family wedding, investing in coins, or looking for urgent cash through a gold loan, we make sure you know the exact value of your gold.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigateAbout && onNavigateAbout()}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#DAAE4D] hover:underline bg-transparent border-0 cursor-pointer p-0"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Why Choose Us Stats / Highlights */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] backdrop-blur-xl flex flex-col gap-6">
              <h4 className="text-lg font-bold text-white">Why Families Trust GoldFin</h4>
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-[#080E1E]/80 border border-[#192847] flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-semibold">Gold Purity Standard</span>
                  <span className="text-base font-bold text-white">100% BIS Hallmarked (916 & 999)</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#080E1E]/80 border border-[#192847] flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-semibold">City Coverage</span>
                  <span className="text-base font-bold text-white">Daily Live Rates for 15+ Cities</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#080E1E]/80 border border-[#192847] flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-semibold">Gold Loan Interest</span>
                  <span className="text-base font-bold text-[#DAAE4D]">Starting from 0.79% per month</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#080E1E]/80 border border-[#192847] flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-semibold">Hidden Charges</span>
                  <span className="text-base font-bold text-emerald-400">Zero Valuation Fees</span>
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
            <div className="p-6 rounded-3xl bg-[#0D172E]/75 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">Gold Investment Tips</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Smart Buying Strategy</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Always buy BIS Hallmarked gold — verify the 6-digit HUID number for authenticity and purity assurance.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Diversify between physical gold (coins/bars), Sovereign Gold Bonds (SGBs), and Gold ETFs for balanced risk.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Invest in gold during market dips rather than peaks — track historical patterns using our live rate charts.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
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
            <div className="p-6 rounded-3xl bg-[#0D172E]/75 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <Landmark size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">Gold Loan Insights</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Borrow Against Gold</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Gold loans offer lower interest rates (7-9% p.a.) compared to personal loans (12-18%) — ideal for short-term needs.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Banks typically lend 75% of your gold's current market value (LTV ratio) — check live rates before applying.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Compare gold loan schemes from SBI, HDFC, Muthoot, and Manappuram before committing to one lender.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
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
            <div className="p-6 rounded-3xl bg-[#0D172E]/75 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors">Market Outlook 2026</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Macro Trends & Forecast</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Reserve Bank of India (RBI) continues buying gold regularly to strengthen national currency reserves.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Strong wedding season demand and household savings keep gold prices resilient across Indian cities.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>During the Indian wedding season (October to February), gold jewellery demand peaks across the country.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                  <span>Experts expect steady long-term growth in gold value driven by household savings and jewellery purchases.</span>
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
                className="p-6 rounded-2xl bg-[#0D172E]/75 border border-[#1E3159] hover:border-[#C89B2A]/35 transition-all backdrop-blur-xl cursor-pointer flex flex-col gap-3"
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
                  <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-[#1E3159]/60">{faq.answer}</p>
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
        onNavigateContact={onNavigateContact}
        onScrollToSection={scrollToSection}
      />

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowWalletModal(false)}>
          <div className="bg-[#0D172E] border border-[#C89B2A]/40 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E3159]">
              <h3 className="text-xl font-extrabold text-white">My Gold Holdings</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setShowWalletModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-[#080E1E] border border-[#192847]">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL GOLD VALUE</span>
              <h2 className="text-3xl font-black text-[#DAAE4D] my-2">
                ₹96,797
              </h2>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Holdings: 15.50 Grams 24K</span>
                <span className="text-emerald-400 font-bold">+12.4% Gain</span>
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
          <div className="bg-[#0D172E] border border-[#C89B2A]/40 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E3159]">
              <h3 className="text-xl font-extrabold text-white">{activeModalTitle}</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setActiveModalTitle(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeModalTitle.includes('Indices') 
                ? 'SENSEX and NIFTY 50 reflect the overall Indian stock market. Historically, gold acts as a safe haven: when stock markets fluctuate, gold demand goes up.'
                : `${activeModalTitle} provides real-time market updates, purity guides, and accurate calculations to help you make smart decisions with your gold.`}
            </p>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={() => setActiveModalTitle(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Live Market Article Detail Modal */}
      {selectedNewsItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedNewsItem(null)}>
          <div className="bg-[#0D172E] border border-[#C89B2A]/40 p-6 md:p-8 rounded-3xl max-w-lg w-full flex flex-col gap-5 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E3159]">
              <div className="flex items-center gap-2">
                <Newspaper size={20} className="text-[#DAAE4D]" />
                <h3 className="text-lg font-extrabold text-white">Market Update</h3>
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
                <span className="text-xs text-slate-400 font-medium">
                  Published {selectedNewsItem.timeAgo}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">
                {selectedNewsItem.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed bg-[#080E1E] p-4 rounded-2xl border border-[#192847]">
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
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#080E1E] border border-[#1E3159] hover:bg-[#0A1329] text-white font-bold text-sm transition-all cursor-pointer"
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
          <div className="bg-[#0D172E] border border-[#C89B2A]/40 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E3159]">
              <h3 className="text-xl font-extrabold text-white">Market Update</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setShowArticleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-extrabold tracking-wider w-fit">GOLD NEWS</span>
              <h3 className="text-lg font-extrabold text-white">
                Why Central Banks are increasing their Gold reserves.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Central banks across the world and the Reserve Bank of India (RBI) have been buying record amounts of pure gold to protect national wealth against inflation and market risks.
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
