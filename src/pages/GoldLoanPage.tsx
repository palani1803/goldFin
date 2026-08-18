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
}

export default function GoldLoanPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
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
      question: 'What is the maximum loan amount I can avail against my gold?',
      answer:
        'You can avail up to 75% of your gold’s exact market value (RBI Maximum Permissible LTV). For institutional or high-net-worth portfolios, loans range from ₹25,000 up to ₹5 Crores with customized treasury disbursals.',
    },
    {
      question: 'How is my pledged gold secured, stored, and insured during the tenure?',
      answer:
        'All pledged gold is stored in bank-grade, triple-tier fortified private vaults with 24/7 CCTV surveillance, dual-biometric custody, and 100% full insurance coverage through Lloyd’s syndicate underwriters at no additional cost to you.',
    },
    {
      question: 'Can I repay or foreclose my gold loan early without penalty charges?',
      answer:
        'Yes, GoldFin offers 100% zero foreclosure and zero prepayment penalties. You can close your loan or make partial principal prepayments at any time to reduce your ongoing monthly interest outflow.',
    },
    {
      question: 'What interest repayment schemes are available (Monthly vs Bullet)?',
      answer:
        'We offer three flexible repayment modes: 1) Monthly Interest Servicing (pay interest monthly, principal at end), 2) Bullet Repayment (pay both interest and principal together at maturity), and 3) Standard Structured EMIs.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#121212] text-[#E5E5E5] font-sans antialiased selection:bg-[#C89B2A]/30 selection:text-yellow-200 relative">
      {/* Reusable Gold Luxury Background Component */}
      <GoldBackground textureOpacity={0.08} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="gold-loan"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateLiveRate={onNavigateLiveRate}
        onNavigateGoldLoan={onNavigateGoldLoan}
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
            <span>PRIVATE WEALTH • LIQUIDITY</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.1]">
            Institutional <br />
            <span className="bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] bg-clip-text text-transparent">
              Gold Loan Services
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Unlock the hidden value of your physical gold assets with absolute discretion and precision. Experience institutional liquidity backed by your sovereign holdings.
          </p>
        </div>

        {/* Section 2: Experience Private Wealth Management Feature Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          {/* Left Visual Container */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center items-center p-8 rounded-3xl bg-[#1A1A1A] border border-white/10 shadow-inner relative overflow-hidden group">
            <div className="w-20 h-20 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Lock size={38} />
            </div>
            <span className="text-base font-extrabold text-white tracking-tight uppercase text-center">
              Bank-Grade Vault Custody
            </span>
            <span className="text-xs text-slate-400 text-center mt-1">
              100% Lloyd's Underwritten Insurance
            </span>

            <div className="mt-6 flex items-center gap-2.5 text-xs font-bold text-[#DAAE4D] bg-[#121212] px-4 py-2 rounded-xl border border-white/5">
              <ShieldCheck size={16} />
              <span>0% Risk to Physical Bullion</span>
            </div>
          </div>

          {/* Right Feature Details */}
          <div className="w-full lg:w-7/12 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit">
              <span>COMMERCIAL • PRIVATE</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Experience Private Wealth Management through Gold Loans
            </h2>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-normal">
              Access immediate capital backed by your physical gold assets with zero disruption to your portfolio. Enjoy industry-leading valuation rates, customizable repayment schedules, and state-of-the-art vaulting security for your precious assets.
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

        {/* Section 3: Market Intelligence (Live Spot Rates 1g) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Spot Valuation Benchmark</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Market Intelligence
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#222222]/80 border border-white/10 text-xs font-bold text-slate-300 self-start sm:self-auto backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MARKET OPEN • LIVE IST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Bullion (22K) Card */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[#DAAE4D]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Standard Bullion (22K)
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
                  91.6% Pure Gold (Hallmark 916 Benchmark)
                </span>
              </div>

              <div className="w-full h-[1px] bg-white/5 rounded-full" />
            </div>

            {/* Pure Bullion (24K) Card */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-[#C89B2A]/40 bg-[#222222]/90 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group shadow-[0_10px_30px_rgba(234,179,8,0.1)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#DAAE4D]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Pure Bullion (24K)
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
                  99.9% Fine Bullion (Sovereign Investment Grade)
                </span>
              </div>

              <div className="w-full h-[1px] bg-white/5 rounded-full" />
            </div>
          </div>

          <button
            onClick={onNavigateLiveRate}
            className="flex items-center gap-2 text-xs font-bold text-[#DAAE4D] hover:text-[#F3C55B] transition-colors bg-transparent border-0 p-0 cursor-pointer self-center mt-1"
          >
            <span>View full live market rate analytics</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Section 4: Privileges of GoldFin Gold Loans (6 Grid Cards) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Why Choose GoldFin</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Privileges of GoldFin Gold Loans
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Engineered for seamless liquidity, rapid access, and complete asset protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Instant Approval */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Instant Approval
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Rapid verification with funds disbursed within 15 minutes of non-destructive appraisal.
              </p>
            </div>

            {/* Card 2: Highest Valuation */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Scale size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Highest Valuation
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Maximum permissible Loan-to-Value (LTV) up to 75% of daily Indian spot gold price.
              </p>
            </div>

            {/* Card 3: Secure Storage */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Secure Storage
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Bank-grade triple-tier fortified vaults with 100% full insurance under Lloyd's syndicate.
              </p>
            </div>

            {/* Card 4: Minimal Documentation */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Minimal Documentation
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Zero income proof or credit score prerequisites. Instant KYC with Aadhaar & PAN.
              </p>
            </div>

            {/* Card 5: Flexible Repayment */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Calendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Flexible Repayment
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Choose between monthly interest servicing, bullet repayments, or structured EMIs.
              </p>
            </div>

            {/* Card 6: Quick Disbursal */}
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <CreditCard size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Quick Disbursal
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Direct RTGS or IMPS fund transfer straight to your preferred bank account instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Interactive Loan Eligibility Calculator (Split Card matching HomePage Calculator Style) */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Form Area */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider mb-2">
                <Calculator size={13} />
                <span>DYNAMIC VALUATION ENGINE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Loan Eligibility Calculator
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Calculate your maximum sanctioned liquidity based on today's live Indian 1g spot rates.
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
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-[#DAAE4D]"
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
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-[#DAAE4D] cursor-pointer"
                  >
                    <option value={24}>24K (99.9% Pure Bullion)</option>
                    <option value={22}>22K (91.6% Hallmark 916)</option>
                    <option value={18}>18K (75.0% Diamond Grade)</option>
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
                          : 'bg-[#1A1A1A] text-slate-400 border-white/10 hover:text-white'
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

          {/* Right Gold Output Box (Solid GoldFin Gold Gradient Card) */}
          <div className="w-full lg:w-5/12 rounded-3xl bg-gradient-to-br from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 p-7 md:p-8 flex flex-col justify-between gap-6 shadow-[0_15px_40px_rgba(234,179,8,0.35)] relative overflow-hidden">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900/80">
                ESTIMATED SANCTIONED AMOUNT
              </span>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
                ₹{estimatedLoanAmount.toLocaleString('en-IN')}
              </div>
              <span className="text-xs font-bold text-slate-900/80">
                Instant Liquidity Disbursal (75% LTV)
              </span>
            </div>

            <div className="flex flex-col gap-2.5 py-4 border-y border-slate-950/15 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Total Gold Market Value:</span>
                <span className="font-black text-slate-950">₹{totalMarketValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Sanctioned LTV Ratio:</span>
                <span className="font-black text-slate-950">75.0% Maximum</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Monthly Interest (0.75%):</span>
                <span className="font-black text-slate-950">₹{monthlyInterest.toLocaleString('en-IN')} / mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900/80">Prepayment / Foreclosure:</span>
                <span className="font-black text-slate-950">₹0 (Zero Charges)</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-900/80 leading-relaxed font-semibold">
              * Estimated calculation based on today's official 1g spot rate. Final disbursement subject to physical karatage verification.
            </p>
          </div>
        </div>

        {/* Section 6: Five Steps to Liquidity (Process Stepper) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Execution Workflow</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Five Steps to Liquidity
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              A seamless, confidential process tailored for high-net-worth individuals and retail clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              {
                num: '01',
                title: 'Application',
                desc: 'Submit estimated weight and purity online or at our private desk.',
              },
              {
                num: '02',
                title: 'Appraisal',
                desc: 'Instant non-destructive spectrometer gold valuation in minutes.',
              },
              {
                num: '03',
                title: 'Sanction',
                desc: 'Approval of loan amount based on maximum 75% LTV spot value.',
              },
              {
                num: '04',
                title: 'Vaulting',
                desc: 'Secure biometric sealing inside fortified Lloyd’s insured vaults.',
              },
              {
                num: '05',
                title: 'Disbursement',
                desc: 'Instant RTGS or IMPS fund transfer directly to your bank account.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-3 group"
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
                className="p-6 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col items-center text-center gap-3 group"
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

        {/* Section 8: Curated Queries (FAQ Accordion) */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Got Questions?</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Curated Queries
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Everything you need to know about our institutional gold loan services.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {curatedFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="p-6 rounded-2xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl cursor-pointer transition-all flex flex-col gap-3"
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
                    <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-white/5">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 9: Concierge Support (Private Consultation Form) */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left Info */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit">
                <Clock size={13} />
                <span>24/7 PRIVATE DESK</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Concierge Support
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Prefer a private consultation? Our dedicated bullion advisors are available for confidential doorstep evaluation or private branch consultations.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1A1A] border border-white/5">
                <Phone size={18} className="text-[#DAAE4D]" />
                <span className="font-bold text-white">+91 (800) 456-7890 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1A1A] border border-white/5">
                <Mail size={18} className="text-[#DAAE4D]" />
                <span className="font-bold text-white">concierge@goldfin.in</span>
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
                  Our private wealth advisor will contact you at <strong className="text-white">{conciergeForm.phone}</strong> within 30 minutes to coordinate your gold appraisal.
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
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
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
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
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
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-300">Estimated Gold Weight</label>
                    <input
                      type="number"
                      placeholder="e.g. 100 grams"
                      value={conciergeForm.weight}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, weight: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] border-0 cursor-pointer mt-2"
                >
                  Request Private Consultation →
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
            className="bg-[#222222] border border-[#C89B2A]/30 p-7 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Zap size={20} className="text-[#DAAE4D]" />
                <span>Fast Gold Loan Sanction</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border-0 cursor-pointer"
                onClick={() => setApplyModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/10 flex flex-col gap-1 text-xs">
              <span className="text-slate-400">Sanctioned Amount Estimate</span>
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
                alert('Application Submitted Successfully! Our institutional desk will contact you within 15 minutes for physical pickup or desk appraisal.')
                setApplyModalOpen(false)
              }}
              className="flex flex-col gap-3.5"
            >
              <input
                type="text"
                required
                placeholder="Full Legal Name (as per Aadhaar)"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />
              <input
                type="text"
                required
                placeholder="City / Pincode"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#DAAE4D]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all border-0 cursor-pointer mt-2 shadow-[0_6px_30px_rgba(234,179,8,0.35)]"
              >
                Confirm & Request Disbursal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
