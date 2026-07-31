import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Calculator,
  LineChart,
  ArrowUpRight,
  X,
  Sparkles,
  Mail,
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
  ArrowRight
} from 'lucide-react'
import heroBg from '../assets/gold_hero_bg.png'
import goldBullionImg from '../assets/hero_gold_bullion.png'

interface PurityRate {
  id: string
  name: string
  karat: string
  price: number
  unit: string
  change: number
  isUp: boolean
}

const PURITY_RATES: PurityRate[] = [
  { id: '24k', name: 'GOLD 24K', karat: '24K (99.9% Pure)', price: 6245, unit: 'per gram', change: 0.45, isUp: true },
  { id: '22k', name: 'GOLD 22K', karat: '22K (91.6% Pure)', price: 5720, unit: 'per gram', change: -0.12, isUp: false },
  { id: '18k', name: 'GOLD 18K', karat: '18K (75.0% Pure)', price: 4680, unit: 'per gram', change: 0.28, isUp: true },
  { id: 'silver', name: 'SILVER 999', karat: '99.9% Fine Silver', price: 74.5, unit: 'per gram', change: 1.10, isUp: true },
]

const SIDE_ARTICLES = [
  { id: 1, title: 'Gold vs Digital Assets: Macro Portfolio Allocation in 2024', readTime: '4 MIN READ', date: '2 hours ago' },
  { id: 2, title: 'Impact of Federal Reserve Interest Rate Decisions on Spot Gold', readTime: '6 MIN READ', date: '5 hours ago' },
  { id: 3, title: 'Understanding Sovereign Gold Bond (SGB) Redemption Dynamics', readTime: '5 MIN READ', date: '1 day ago' },
]

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How is the Gold Calculator price calculated?',
    answer: 'The calculation uses the live 24K spot bullion exchange rate as a baseline (currently ₹6,245/g). For lower karats (22K, 20K, 18K), the rate is proportionally derived based on pure gold content (e.g. 22K = 24K Rate × 22/24).'
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
    answer: 'Yes, GoldFin feeds real-time spot pricing directly from institutional bullion exchanges with minimal latency.'
  }
]

export default function HomePage() {
  // Modals
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [activeModalTitle, setActiveModalTitle] = useState<string | null>(null)

  // Accordion state
  const [openFaqId, setOpenFaqId] = useState<number | null>(1)

  // --- Reference Gold Calculator State ---
  const [calcMode, setCalcMode] = useState<'amount' | 'gold'>('amount')
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedCarat, setSelectedCarat] = useState<number>(22)
  const [isCalculated, setIsCalculated] = useState<boolean>(false)

  // 24K Base Spot Rate: ₹6,245 per gram
  const spotRate24K = 6245
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
    <div className="flex flex-col min-h-screen w-full relative bg-[#080b10] text-[#f8fafc] font-sans antialiased selection:bg-yellow-500/30 selection:text-yellow-200">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-[radial-gradient(circle,rgba(234,179,8,0.18)_0%,rgba(202,138,4,0.06)_45%,transparent_70%)] pointer-events-none z-0 blur-[40px] animate-float-glow-top" />
      <div className="absolute top-[750px] -right-[250px] w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(234,179,8,0.14)_0%,rgba(30,58,138,0.08)_50%,transparent_70%)] pointer-events-none z-0 blur-[50px] animate-float-glow-mid" />
      <div className="absolute bottom-[250px] -left-[250px] w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(234,179,8,0.13)_0%,rgba(180,83,9,0.06)_50%,transparent_70%)] pointer-events-none z-0 blur-[50px] animate-float-glow-bottom" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-[#080b10]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 flex items-center justify-between h-[78px]">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 no-underline cursor-pointer group" onClick={() => scrollToSection('overview')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fffbeb] via-[#facc15] to-[#ca8a04] flex items-center justify-center text-[#080b10] shadow-[0_6px_30px_rgba(234,179,8,0.35)] group-hover:scale-105 transition-transform">
              <Coins size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-yellow-400 transition-colors">GoldFin</span>
              <span className="text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">INSTITUTIONAL BULLION</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button className="text-sm font-semibold text-slate-400 hover:text-yellow-400 transition-colors py-2 bg-transparent border-0 cursor-pointer" onClick={() => scrollToSection('about')}>About Us</button>
            <button className="text-sm font-semibold text-slate-400 hover:text-yellow-400 transition-colors py-2 bg-transparent border-0 cursor-pointer" onClick={() => scrollToSection('calculator')}>Calculator</button>
            <button className="text-sm font-semibold text-slate-400 hover:text-yellow-400 transition-colors py-2 bg-transparent border-0 cursor-pointer" onClick={() => scrollToSection('rates')}>Live Rates</button>
            <button className="text-sm font-semibold text-slate-400 hover:text-yellow-400 transition-colors py-2 bg-transparent border-0 cursor-pointer" onClick={() => scrollToSection('analysis')}>Market Insights</button>
            <button className="text-sm font-semibold text-slate-400 hover:text-yellow-400 transition-colors py-2 bg-transparent border-0 cursor-pointer" onClick={() => scrollToSection('faq')}>FAQ</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" className="relative pt-10 md:pt-14 pb-16 md:pb-24 bg-cover bg-center overflow-hidden border-b border-white/5" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b10]/92 via-[#080b10]/85 to-[#080b10]" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold tracking-wider w-fit">
                <Sparkles size={14} />
                <span>INSTITUTIONAL BULLION PLATFORM</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Secure Your Future, <br />
                <span className="bg-gradient-to-r from-[#fffbeb] via-[#facc15] to-[#ca8a04] bg-clip-text text-transparent">Invest in Pure Gold</span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
                Gold is a timeless asset that protects wealth from inflation and market volatility. Calculate exact gold rate with taxes in seconds, track live market prices, and make smart investment decisions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#fffbeb] via-[#facc15] to-[#ca8a04] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0 flex items-center gap-2"
                  onClick={() => scrollToSection('calculator')}
                >
                  <Calculator size={18} />
                  <span>Open Calculator</span>
                </button>
                <button
                  className="px-7 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white font-bold text-sm hover:bg-white/10 hover:border-yellow-500/40 transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md"
                  onClick={() => scrollToSection('rates')}
                >
                  <LineChart size={18} />
                  <span>View Live Rates</span>
                </button>
              </div>

              {/* Mini live rate ticker */}
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-bold text-slate-300">24K</span>
                  <span className="font-extrabold text-white">₹6,245/g</span>
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5"><TrendingUp size={12} />+0.45%</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-bold text-slate-300">22K</span>
                  <span className="font-extrabold text-white">₹5,720/g</span>
                  <span className="text-rose-400 text-xs font-bold flex items-center gap-0.5"><TrendingDown size={12} />-0.12%</span>
                </div>
              </div>
            </div>

            {/* Right Gold Bullion Showcase Image */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center pt-10 pb-6 px-6 md:px-8 rounded-3xl bg-[#121824]/60 border border-white/[0.08] backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] group hover:border-yellow-500/25 transition-all duration-500">
              {/* Radial gold glow behind the image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(234,179,8,0.12)_0%,rgba(234,179,8,0.04)_50%,transparent_70%)] blur-[30px]" />
              </div>

              {/* Top badge */}
              <div className="absolute -top-3.5 z-20 px-5 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold text-[11px] tracking-wider shadow-[0_4px_20px_rgba(234,179,8,0.4)] flex items-center gap-1.5">
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
                  <ShieldCheck size={16} className="text-yellow-400" />
                  <span className="text-yellow-300 text-[11px] font-bold tracking-wide">BIS HALLMARK CERTIFIED</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="font-bold text-slate-400">Spot</span>
                  <span className="font-extrabold text-white">₹6,245</span>
                  <span className="text-emerald-400 font-bold">↑</span>
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
              <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Real-Time Metal Valuation</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Gold Rate Calculator</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <CoinsIcon size={14} />
              <span>LIVE SPOT RATE: ₹{spotRate24K}/g</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <div className="p-6 md:p-8 rounded-3xl bg-[#121824]/80 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6">
              {/* Dual Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-[#161e2e] rounded-2xl border border-white/5">
                <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-0 ${calcMode === 'amount' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-transparent'}`}
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
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-0 ${calcMode === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-transparent'}`}
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
                <span className="absolute left-4 text-yellow-400 font-extrabold text-lg">
                  {calcMode === 'amount' ? '₹' : 'g'}
                </span>
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-4 bg-[#161e2e] border border-white/10 rounded-2xl text-white font-bold text-lg focus:outline-none focus:border-yellow-400 transition-colors"
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
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('25000')}>₹25,000</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('50000')}>₹50,000</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('100000')}>₹1,00,000</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('500000')}>₹5,00,000</button>
                  </>
                ) : (
                  <>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('5')}>5 Grams</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('10')}>10 Grams</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('11.66')}>1 Tola (11.66g)</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('50')}>50 Grams</button>
                    <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 hover:bg-yellow-500/10 border border-white/10 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 transition-all cursor-pointer" onClick={() => handlePresetSelect('100')}>100 Grams</button>
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
                      className={`py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer text-center ${selectedCarat === carat ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-sm' : 'bg-[#161e2e] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                      onClick={() => setSelectedCarat(carat)}
                    >
                      {carat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result / Instruction Banner Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161e2e] to-[#121824] border border-yellow-500/20 text-center flex flex-col gap-1">
                {calcMode === 'amount' ? (
                  isCalculated && parsedVal > 0 ? (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Gold Weight:</div>
                      <div className="text-2xl md:text-3xl font-black text-yellow-400 tracking-tight">
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
                      <div className="text-2xl md:text-3xl font-black text-yellow-400 tracking-tight">
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
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#fffbeb] via-[#facc15] to-[#ca8a04] text-slate-950 font-extrabold text-base hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={handleCalculate}>
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
              <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Real-Time Bullion Prices</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Live Purity Rates</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE EXCHANGE FEED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PURITY_RATES.map((item) => (
              <div key={item.id} className={`p-6 rounded-3xl bg-[#121824]/70 border backdrop-blur-xl flex flex-col gap-4 group transition-all duration-300 ${item.id === '24k' ? 'border-yellow-500/40 bg-[#121824]/90 shadow-[0_10px_30px_rgba(234,179,8,0.1)]' : 'border-white/10 hover:border-yellow-500/30'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold tracking-wider text-slate-300">{item.name}</span>
                  {item.id === '24k' && <span className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300">MOST POPULAR</span>}
                </div>
                <div className="text-3xl font-black text-white group-hover:text-yellow-400 transition-colors">₹{item.price.toLocaleString('en-IN')}</div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs font-medium text-slate-400">{item.karat} • {item.unit}</span>
                  <div className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${item.isUp ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'}`}>
                    {item.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{item.isUp ? `+${item.change}%` : `${item.change}%`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Analysis Grid */}
        <section id="analysis">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Macroeconomic Research</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Market Analysis</h2>
            </div>
            <span className="text-yellow-400 font-bold text-xs cursor-pointer flex items-center gap-1 hover:underline" onClick={() => setShowArticleModal(true)}>
              ALL INSIGHTS <ArrowUpRight size={14} />
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Featured Article */}
            <div 
              className="lg:col-span-7 relative h-[360px] rounded-3xl overflow-hidden bg-cover bg-center p-8 flex flex-col justify-end border border-white/10 group cursor-pointer"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80')` }}
              onClick={() => setShowArticleModal(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-[#080b10]/60 to-transparent" />
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-extrabold tracking-wider">MARKET ALERT</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-slate-300 text-[10px] font-extrabold tracking-wider">5 MIN READ</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug group-hover:text-yellow-300 transition-colors">
                  Why Central Banks are increasing their Gold reserves in 2024.
                </h3>
                <p className="text-xs text-slate-400">
                  Analysis by Michael Chen • Financial Advisory Desk
                </p>
              </div>
            </div>

            {/* Right Side Articles */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {SIDE_ARTICLES.map((art) => (
                <div key={art.id} className="p-5 rounded-2xl bg-[#121824]/70 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 backdrop-blur-xl flex flex-col gap-2 cursor-pointer group" onClick={() => setActiveModalTitle(art.title)}>
                  <div className="flex justify-between text-xs text-yellow-400 font-bold">
                    <span>{art.readTime}</span>
                    <span className="text-slate-400 font-normal">{art.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-yellow-400 transition-colors leading-snug">{art.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Who We Are</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">About GoldFin</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <Building2 size={14} />
              <span>EST. 2024 • INSTITUTIONAL BULLION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 p-8 rounded-3xl bg-[#121824]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold w-fit">
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
                  <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                  <span>Direct Integration with MCX & International Spot Feeds</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                  <span>BIS Hallmarked 999.9 Purity Calculation Standard</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                  <span>Automated Indian GST (3%) & Making Charge Itemization</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#121824]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
              <h4 className="text-lg font-bold text-white border-b border-white/5 pb-4">Platform Impact & Reach</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#161e2e]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-1">
                    <Coins size={20} />
                  </div>
                  <div className="text-xl font-black text-white">₹500Cr+</div>
                  <div className="text-[11px] font-medium text-slate-400">Monthly Valued Bullion</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#161e2e]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-1">
                    <Zap size={20} />
                  </div>
                  <div className="text-xl font-black text-white">99.99%</div>
                  <div className="text-[11px] font-medium text-slate-400">Spot Feed Uptime</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#161e2e]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-1">
                    <Users size={20} />
                  </div>
                  <div className="text-xl font-black text-white">150,000+</div>
                  <div className="text-[11px] font-medium text-slate-400">Active Investors</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#161e2e]/80 border border-white/5 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-1">
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
              <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Expert Knowledge</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Investment Tips & Market Insights</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
              <Lightbulb size={14} />
              <span>CURATED BY EXPERTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gold Investment Tips Card */}
            <div className="p-6 rounded-3xl bg-[#121824]/70 border border-white/10 hover:border-yellow-500/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-slate-950 transition-all">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">Gold Investment Tips</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Smart Buying Strategy</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Always buy BIS Hallmarked gold — verify the 6-digit HUID number for authenticity and purity assurance.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Diversify between physical gold (coins/bars), Sovereign Gold Bonds (SGBs), and Gold ETFs for balanced risk.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Invest in gold during market dips rather than peaks — track historical patterns using our live rate charts.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Limit gold to 10-15% of your total portfolio to maintain healthy asset allocation.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Complete Gold Investment Guide')}>
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Gold Loan Tips Card */}
            <div className="p-6 rounded-3xl bg-[#121824]/70 border border-white/10 hover:border-yellow-500/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-slate-950 transition-all">
                  <Landmark size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">Gold Loan Insights</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Borrow Against Gold</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Gold loans offer lower interest rates (7-9% p.a.) compared to personal loans (12-18%) — ideal for short-term needs.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Banks typically lend 75% of your gold's current market value (LTV ratio) — check live rates before applying.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Compare gold loan schemes from SBI, HDFC, Muthoot, and Manappuram before committing to one lender.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Always repay on time — defaulting on a gold loan means permanent loss of your pledged gold assets.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Gold Loan Complete Guide')}>
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Market Outlook Card */}
            <div className="p-6 rounded-3xl bg-[#121824]/70 border border-white/10 hover:border-yellow-500/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-5 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-slate-950 transition-all">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">Market Outlook 2026</h3>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Macro Trends & Forecast</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Central banks globally added 1,037 tonnes of gold in 2025 — the strongest institutional demand in decades.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Rising geopolitical tensions and inflation hedging continue to drive gold prices toward all-time highs.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>The Indian wedding season (Oct-Feb) historically pushes domestic gold premiums up by 2-4% over spot.</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span>Analysts project gold may touch ₹7,200-₹7,500/g by Q4 2026 driven by rate-cut expectations and USD weakness.</span>
                </div>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer bg-transparent border-0 p-0 w-fit" onClick={() => setActiveModalTitle('Full Market Outlook Report')}>
                <span>Read Full Report</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Consumer FAQ Section */}
        <section id="faq">
          <div className="flex flex-col items-center text-center gap-1 mb-8">
            <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Got Questions?</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4 w-full">
            {FAQ_ITEMS.map((faq) => (
              <div 
                key={faq.id} 
                className="p-6 rounded-2xl bg-[#121824]/70 border border-white/10 hover:border-yellow-500/30 transition-all backdrop-blur-xl cursor-pointer flex flex-col gap-3"
                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-yellow-400 shrink-0" />
                    <span className="text-base font-bold text-white">{faq.question}</span>
                  </div>
                  {openFaqId === faq.id ? <ChevronUp size={20} className="text-yellow-400 shrink-0" /> : <ChevronDown size={20} className="text-slate-500 shrink-0" />}
                </div>

                {openFaqId === faq.id && (
                  <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-white/5">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Institutional Trust Banner */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-gradient-to-r from-[#121824] via-[#161e2e] to-[#121824] border border-yellow-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Certified Purity Guarantee</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">All rates correspond to BIS Hallmarked 99.9% 24K and 91.6% 22K certified standards.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Real-Time Exchange Feeds</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">Low-latency live price feeds synchronized directly with global spot markets.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                <Award size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">GST Itemized Compliance</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">Automatic breakdown of base metal price, making charges, and 3% Indian GST.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Website Footer */}
      <footer className="mt-20 border-t border-white/10 bg-[#080b10]/90 backdrop-blur-xl py-16 relative z-10">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fffbeb] via-[#facc15] to-[#ca8a04] flex items-center justify-center text-[#080b10]">
                  <Coins size={22} />
                </div>
                <span className="text-xl font-extrabold text-white">GoldFin</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Institutional grade precious metal intelligence, real-time purity rate tracking, and tax calculation platform.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Platform Features</h4>
              <ul className="flex flex-col gap-2.5 list-none p-0">
                <li><span className="text-xs text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => scrollToSection('about')}>About GoldFin</span></li>
                <li><span className="text-xs text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => scrollToSection('rates')}>24K Gold Rates</span></li>
                <li><span className="text-xs text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => scrollToSection('rates')}>22K Gold Rates</span></li>
                <li><span className="text-xs text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => scrollToSection('rates')}>Silver 999 Rates</span></li>
                <li><span className="text-xs text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => scrollToSection('calculator')}>Live Gold Calculator</span></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Market Research</h4>
              <ul className="flex flex-col gap-2.5 list-none p-0">
                <li><span className="text-xs text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => scrollToSection('analysis')}>Central Bank Gold Reserve Report</span></li>
                <li><span className="text-xs text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => scrollToSection('analysis')}>Digital Gold vs Sovereign Bonds</span></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Institutional Desk</h4>
              <p className="text-xs text-slate-400">
                Have questions regarding high-volume physical bullion pricing or API integrations?
              </p>
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
                <Mail size={16} />
                <span>desk@goldfin.investments</span>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <span>© 2026 GoldFin Inc. All rights reserved. Rates updated continuously from official exchange feeds.</span>
            <span>Privacy Policy • Terms of Service • Compliance</span>
          </div>
        </div>
      </footer>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowWalletModal(false)}>
          <div className="bg-[#121824] border border-yellow-500/30 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-extrabold text-white">My Gold Holdings</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setShowWalletModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-[#161e2e]">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL PORTFOLIO VALUE</span>
              <h2 className="text-3xl font-black text-yellow-400 my-2">
                ₹96,797
              </h2>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Holdings: 15.50 Grams 24K</span>
                <span className="text-emerald-400 font-bold">+12.4% Profit</span>
              </div>
            </div>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#fffbeb] via-[#facc15] to-[#ca8a04] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={() => setShowWalletModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Generic Tool / Insight Modal */}
      {activeModalTitle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveModalTitle(null)}>
          <div className="bg-[#121824] border border-yellow-500/30 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
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
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#fffbeb] via-[#facc15] to-[#ca8a04] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={() => setActiveModalTitle(null)}>
              Close View
            </button>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowArticleModal(false)}>
          <div className="bg-[#121824] border border-yellow-500/30 p-6 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-extrabold text-white">Market Insight Report</h3>
              <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border-0 cursor-pointer" onClick={() => setShowArticleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-extrabold tracking-wider w-fit">MARKET ALERT</span>
              <h3 className="text-lg font-extrabold text-white">
                Why Central Banks are increasing their Gold reserves in 2024.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Global central banks added over 1,000 tonnes of gold to official reserves in recent consecutive years. Diversification away from single-currency concentration and macro inflation risk remain top drivers.
              </p>
            </div>
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#fffbeb] via-[#facc15] to-[#ca8a04] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer border-0" onClick={() => setShowArticleModal(false)}>
              Close Article
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
