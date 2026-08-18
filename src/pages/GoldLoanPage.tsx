import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Zap,
  TrendingUp,
  ShieldCheck,
  FileText,
  Calendar,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calculator,
  Phone,
  Mail,
  Lock,
  Clock,
  Sparkles,
  X,
  Scale,
  Award,
  BadgePercent
} from 'lucide-react'
import { Navbar, Footer, GoldBackground } from '../components'

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

interface GoldLoanPageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateContact?: () => void
}

export default function GoldLoanPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateContact,
}: GoldLoanPageProps) {
  // Live rates state
  const [liveRates, setLiveRates] = useState<PurityRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Calculator State
  const [weightGrams, setWeightGrams] = useState<number>(50)
  const [selectedKarat, setSelectedKarat] = useState<number>(22)
  const [selectedTenureMonths, setSelectedTenureMonths] = useState<number>(12)

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Modals & Application State
  const [applyModalOpen, setApplyModalOpen] = useState<boolean>(false)
  const [consultationSuccess, setConsultationSuccess] = useState<boolean>(false)
  const [conciergeForm, setConciergeForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    weight: '',
  })

  // Fetch live rates from backend API
  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch('/api/gold-rates')
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        setLiveRates(json.data)
      }
    } catch (err) {
      console.error('Error fetching live gold rates in GoldLoanPage:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
    const interval = setInterval(fetchRates, 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchRates])

  // Spot Rates per 1 gram
  const rate24k = liveRates.find((r) => r.purityId === '24k')
  const rate22k = liveRates.find((r) => r.purityId === '22k')

  const price24kPerGram = rate24k?.pricePerGram || 13535
  const price22kPerGram = rate22k?.pricePerGram || 12407

  // Rate per gram based on selected karat
  const activeRatePerGram = useMemo(() => {
    if (selectedKarat === 24) return price24kPerGram
    if (selectedKarat === 22) return price22kPerGram
    if (selectedKarat === 18) return Math.round(price24kPerGram * (18 / 24))
    return Math.round(price24kPerGram * (selectedKarat / 24))
  }, [selectedKarat, price24kPerGram, price22kPerGram])

  // Dynamic Loan Calculations
  const totalMarketValue = useMemo(() => {
    return Math.round(weightGrams * activeRatePerGram)
  }, [weightGrams, activeRatePerGram])

  // RBI Standard LTV is 75%
  const estimatedLoanAmount = useMemo(() => {
    return Math.round(totalMarketValue * 0.75)
  }, [totalMarketValue])

  // Monthly interest at institutional 0.75% per month (9% p.a.)
  const monthlyInterest = useMemo(() => {
    return Math.round(estimatedLoanAmount * 0.0075)
  }, [estimatedLoanAmount])

  // Handle Concierge Form Submission
  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConsultationSuccess(true)
  }

  // Curated FAQ Items
  const curatedFaqs = [
    {
      question: 'What is the maximum loan amount I can get against my gold?',
      answer:
        'You can get up to 75% of your gold’s exact market value as per RBI rules. Loans range from ₹25,000 up to ₹1 Crore with instant disbursal directly to your bank account.',
    },
    {
      question: 'How is my pledged gold secured, stored, and insured?',
      answer:
        'All pledged gold is stored in high-security bank locker vaults with 24/7 CCTV surveillance and 100% full insurance coverage at zero extra cost to you.',
    },
    {
      question: 'Can I repay or close my gold loan early without penalty charges?',
      answer:
        'Yes, GoldFin offers 100% zero foreclosure charges and zero prepayment penalties. You can close your loan or make partial payments at any time to reduce your monthly interest.',
    },
    {
      question: 'What repayment options are available?',
      answer:
        'We offer three easy repayment modes: 1) Monthly Interest Scheme (pay interest monthly, principal at end), 2) Bullet Repayment (pay both interest and principal together at maturity), and 3) Regular Monthly EMIs.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#070D1E] text-[#F1F4F9] font-sans antialiased selection:bg-[#C89B2A]/30 selection:text-yellow-200 relative">
      {/* Reusable Gold Luxury Background Component */}
      <GoldBackground textureOpacity={0.08} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="gold-loan"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
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
        spotRate24K={price24kPerGram}
      />

      {/* Main Content Area */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10 w-full flex flex-col gap-12 md:gap-16">
        {/* Section 1: Hero Header (Text Only with Signature HomePage Typography) */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} />
            <span>INSTANT CASH AGAINST GOLD • BEST RATES</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.1]">
            Instant <br />
            <span className="bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] bg-clip-text text-transparent">
              Gold Loan Services
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Get instant cash against your gold jewellery and coins at the lowest interest rates in India. Fast 15-minute approval, 100% safe bank locker storage, and zero hidden fees.
          </p>
        </div>

        {/* Section 2: Experience Private Wealth Management Feature Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] backdrop-blur-xl shadow-[0_20px_60px_rgba(4,8,19,0.6)] flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          {/* Left Visual Container */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center items-center p-8 rounded-3xl bg-[#080E1E] border border-[#1E3159] shadow-inner relative overflow-hidden group">
            <div className="w-20 h-20 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Lock size={38} />
            </div>
            <span className="text-base font-extrabold text-white tracking-tight uppercase text-center">
              Bank Locker Storage
            </span>
            <span className="text-xs text-slate-400 text-center mt-1">
              100% Fully Insured Storage
            </span>

            <div className="mt-6 flex items-center gap-2.5 text-xs font-bold text-[#DAAE4D] bg-[#070D1E] px-4 py-2 rounded-xl border border-[#1E3159]/60">
              <ShieldCheck size={16} />
              <span>100% Safe & Secure Gold Storage</span>
            </div>
          </div>

          {/* Right Feature Details */}
          <div className="w-full lg:w-7/12 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit">
              <span>SAFE • RELIABLE • INSTANT</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Get Maximum Value and Instant Cash for Your Gold
            </h2>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-normal">
              Get instant money by pledging your gold jewellery at the best rates in town. We offer maximum loan per gram, lowest monthly interest, flexible repayment, and 100% safe bank locker storage.
            </p>

            {/* 3 Diamond Bullet Points */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                <span>Up to 75% of Current Market Value as Instant Loan Amount</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                <span>Zero foreclosure charges or pre-payment penalties</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0 mt-0.5" />
                <span>Starting interest rates from 0.75% per month (9% p.a.)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Market Rates (Live Rates 1g) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Live Rates Per 1 Gram</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Today's Gold Rates
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0D172E]/80 border border-[#1E3159] text-xs font-bold text-slate-300 self-start sm:self-auto backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MARKET OPEN • LIVE IST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard (22K) Card */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[#DAAE4D]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    22K Hallmarked Jewellery Gold
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp size={12} />
                  <span>+0.81%</span>
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors tracking-tight">
                  {loading ? '...' : `₹${price22kPerGram.toLocaleString('en-IN')} / g`}
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  91.6% Pure Gold (Hallmark 916)
                </span>
              </div>

              <div className="w-full h-[1px] bg-[#1E3159]/60 rounded-full" />
            </div>

            {/* Pure (24K) Card */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/90 border border-[#C89B2A]/50 bg-[#0E1B38] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group shadow-[0_10px_30px_rgba(234,179,8,0.12)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#DAAE4D]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    24K Pure Gold (Coins & Bars)
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp size={12} />
                  <span>+0.81%</span>
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors tracking-tight">
                  {loading ? '...' : `₹${price24kPerGram.toLocaleString('en-IN')} / g`}
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  99.9% Pure Gold (24 Karat)
                </span>
              </div>

              <div className="w-full h-[1px] bg-[#1E3159]/60 rounded-full" />
            </div>
          </div>

          <button
            onClick={onNavigateLiveRate}
            className="flex items-center gap-2 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors bg-transparent border-0 p-0 cursor-pointer self-center mt-1"
          >
            <span>View today's city-wise live gold rates</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Section 4: Why Choose GoldFin (6 Grid Cards) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Why Choose GoldFin</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Why Choose GoldFin for Your Gold Loan?
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Fastest gold loans with minimum paperwork, instant bank transfer, and 100% safe storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Instant Approval */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Instant Approval
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Quick verification and loan amount credited to your bank account within 15 minutes.
              </p>
            </div>

            {/* Card 2: Highest Valuation */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Scale size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Highest Loan Amount
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Get maximum loan amount up to 75% of today's market rate (as per RBI guidelines).
              </p>
            </div>

            {/* Card 3: Secure Storage */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                100% Safe Storage
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Bank-grade high security vaults with 100% full insurance coverage for your gold.
              </p>
            </div>

            {/* Card 4: Minimal Documentation */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Simple Paperwork
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                No salary slip or CIBIL score needed. Just bring your Aadhaar and PAN card for instant approval.
              </p>
            </div>

            {/* Card 5: Flexible Repayment */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Calendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Flexible Repayment
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Easy repayment options: pay monthly interest and principal at end, or pay monthly EMIs.
              </p>
            </div>

            {/* Card 6: Quick Disbursal */}
            <div className="p-7 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <CreditCard size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Direct Bank Transfer
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Instant money transfer directly to your bank account via UPI, IMPS, or NEFT/RTGS.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Interactive Loan Eligibility Calculator */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0D172E]/85 border border-[#1E3159] backdrop-blur-xl shadow-[0_20px_50px_rgba(4,8,19,0.6)] flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Form Area */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider mb-2">
                <Calculator size={13} />
                <span>INSTANT GOLD LOAN CALCULATOR</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Gold Loan Calculator
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Check how much loan amount you can get against your gold in seconds.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Weight Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">Gold Weight (Grams)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={5000}
                      value={weightGrams || ''}
                      onChange={(e) => setWeightGrams(Math.max(1, Number(e.target.value)))}
                      className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-[#DAAE4D]"
                      placeholder="e.g. 50"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      GRAMS
                    </span>
                  </div>
                </div>

                {/* Karat Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">Gold Purity (Karat)</label>
                  <select
                    value={selectedKarat}
                    onChange={(e) => setSelectedKarat(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-[#DAAE4D] cursor-pointer"
                  >
                    <option value={24}>24K (99.9% Pure Gold - Coins & Bars)</option>
                    <option value={22}>22K (91.6% Hallmarked Jewellery Gold)</option>
                    <option value={18}>18K (75.0% Diamond & Stone Jewellery)</option>
                  </select>
                </div>
              </div>

              {/* Tenure Selection Buttons */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Loan Tenure</span>
                  <span className="text-[#DAAE4D] font-bold">{selectedTenureMonths} Months</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 12, 24].map((tenure) => (
                    <button
                      key={tenure}
                      onClick={() => setSelectedTenureMonths(tenure)}
                      className={`py-2.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedTenureMonths === tenure
                          ? 'bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 border-transparent shadow-md font-black'
                          : 'bg-[#080E1E] text-slate-400 border-[#1E3159] hover:text-white'
                      }`}
                    >
                      {tenure}M
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] border-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap size={18} />
                <span>Apply for Gold Loan</span>
              </button>
              <button
                onClick={() => alert(`Sanction Estimate Generated:\nLoan Amount: ₹${estimatedLoanAmount.toLocaleString('en-IN')}\nWeight: ${weightGrams}g (${selectedKarat}K)\nMonthly Interest: ₹${monthlyInterest.toLocaleString('en-IN')}/mo`)}
                className="py-3.5 px-6 rounded-2xl bg-white/5 border border-white/15 hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Instant Estimate
              </button>
            </div>
          </div>

          {/* Right Gold Output Box */}
          <div className="w-full lg:w-5/12 rounded-3xl bg-gradient-to-br from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 p-7 md:p-8 flex flex-col justify-between gap-6 shadow-[0_15px_40px_rgba(234,179,8,0.35)] relative overflow-hidden">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900/80">
                YOU WILL GET APPROXIMATELY
              </span>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                ₹{estimatedLoanAmount.toLocaleString('en-IN')}
              </div>
              <span className="text-xs font-bold text-slate-900/80">
                Maximum Loan Amount (Up to 75% Value)
              </span>
            </div>

            <div className="flex flex-col gap-2.5 py-4 border-y border-slate-950/15 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Total Gold Market Value:</span>
                <span className="font-black text-slate-950">₹{totalMarketValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Maximum Loan Limit:</span>
                <span className="font-black text-slate-950">75.0% of Market Value</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Monthly Interest (0.75%):</span>
                <span className="font-black text-slate-950">₹{monthlyInterest.toLocaleString('en-IN')} / mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Prepayment / Loan Closing Fee:</span>
                <span className="font-black text-slate-950">₹0 (Free)</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-900/80 leading-relaxed font-semibold">
              * Calculated based on today's live gold rate. Final loan amount depends on physical purity check.
            </p>
          </div>
        </div>

        {/* Section 6: Five Steps to Gold Loan (Process Stepper) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">HOW IT WORKS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              5 Simple Steps to Get Your Gold Loan
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Quick and simple 5-step process to get cash against your gold in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              {
                num: '01',
                title: 'Apply',
                desc: 'Submit your gold weight and purity online or at our branch.',
              },
              {
                num: '02',
                title: 'Purity Check',
                desc: 'Quick and safe purity check in front of you.',
              },
              {
                num: '03',
                title: 'Loan Sanction',
                desc: 'Instant loan sanction at today\'s highest gold rate.',
              },
              {
                num: '04',
                title: 'Safe Locker',
                desc: 'Your gold is packed and sealed safely in bank locker vaults.',
              },
              {
                num: '05',
                title: 'Cash Transfer',
                desc: 'Money is transferred directly to your bank account instantly.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-3 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-black flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Verification Documents (4 Cards) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">KYC Checklist</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Verification Documents
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Minimal documentation required for complete peace of mind and rapid sanction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <FileText size={22} />,
                title: 'Identity Proof',
                desc: 'Aadhaar Card, Passport, or Voter ID',
              },
              {
                icon: <BadgePercent size={22} />,
                title: 'PAN Card',
                desc: 'Required for swift regulatory tax compliance',
              },
              {
                icon: <ShieldCheck size={22} />,
                title: 'Address Proof',
                desc: 'Utility Bill, Driving License, or Aadhaar',
              },
              {
                icon: <CreditCard size={22} />,
                title: 'Bank Account',
                desc: 'Cancelled Cheque or Statement for RTGS transfer',
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl transition-all duration-300 flex flex-col items-center text-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {doc.icon}
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 8: FAQs Section */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Got Questions?</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Everything you need to know about getting a gold loan with GoldFin.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {curatedFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="p-6 rounded-2xl bg-[#0D172E]/80 border border-[#1E3159] hover:border-[#C89B2A]/35 backdrop-blur-xl cursor-pointer transition-all flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-white">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp size={20} className="text-[#DAAE4D] shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-500 shrink-0" />
                    )}
                  </div>
                  {isOpen && (
                    <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-[#1E3159]/60">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 9: Help & Support (Consultation Form) */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#0D172E]/85 border border-[#1E3159] backdrop-blur-xl shadow-[0_20px_50px_rgba(4,8,19,0.6)] flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left Info */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit">
                <Clock size={13} />
                <span>HELP & SUPPORT DESK</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Need Personal Assistance?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Want doorstep service or personal guidance? Our gold loan advisors can visit your home or assist you directly at our nearest branch.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#080E1E] border border-[#1E3159]/60">
                <Phone size={18} className="text-[#DAAE4D]" />
                <span className="font-bold text-white">+91 (800) 456-7890 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#080E1E] border border-[#1E3159]/60">
                <Mail size={18} className="text-[#DAAE4D]" />
                <span className="font-bold text-white">support@goldfin.in</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-7/12">
            {consultationSuccess ? (
              <div className="h-full min-h-[260px] p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-bold text-white">Consultation Request Received!</h4>
                <p className="text-sm text-slate-300 max-w-sm">
                  Our gold loan advisor will contact you at <strong className="text-white">{conciergeForm.phone}</strong> within 15 minutes to assist with your gold loan.
                </p>
                <button
                  onClick={() => setConsultationSuccess(false)}
                  className="mt-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-xs uppercase cursor-pointer border-0"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleConciergeSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-300">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={conciergeForm.firstName}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-300">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharma"
                      value={conciergeForm.lastName}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-300">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={conciergeForm.phone}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-300">Estimated Gold Weight</label>
                    <input
                      type="number"
                      placeholder="e.g. 50 grams"
                      value={conciergeForm.weight}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, weight: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] border-0 cursor-pointer mt-2"
                >
                  Request Call Back / Doorstep Service →
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer via Reusable Component */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
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

      {/* Instant Application Modal */}
      {applyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setApplyModalOpen(false)}
        >
          <div
            className="bg-[#0D172E] border border-[#C89B2A]/40 p-7 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3159]">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Zap size={20} className="text-[#DAAE4D]" />
                <span>Apply for Instant Gold Loan</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border-0 cursor-pointer"
                onClick={() => setApplyModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#080E1E] border border-[#192847] flex flex-col gap-1 text-xs">
              <span className="text-slate-400">Estimated Loan Amount</span>
              <span className="text-3xl font-black text-white">
                ₹{estimatedLoanAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#DAAE4D] font-semibold mt-1">
                For {weightGrams}g ({selectedKarat}K Gold) • 0.75% monthly interest
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Application Submitted Successfully! Our gold loan advisor will call you within 15 minutes to help complete your loan.')
                setApplyModalOpen(false)
              }}
              className="flex flex-col gap-3.5"
            >
              <input
                type="text"
                required
                placeholder="Full Name (as per Aadhaar)"
                className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number"
                className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />
              <input
                type="text"
                required
                placeholder="City / Pincode"
                className="w-full px-4 py-3 bg-[#080E1E] border border-[#1E3159] rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all border-0 cursor-pointer mt-2 shadow-[0_6px_30px_rgba(234,179,8,0.35)]"
              >
                Submit Loan Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
