import { useState, useEffect, useCallback } from 'react'
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
  Sparkles,
  X,
  Scale,
  Award,
  BadgePercent
} from 'lucide-react'
import goldLoanBankHero from '../assets/gold_loan_bank_hero.jpg'
import { Navbar, Footer, GoldBackground, TrustBanner } from '../components'
import { useSiteSettings } from '../hooks/useSiteSettings'

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
  onNavigateBranches?: () => void
  onNavigateContact?: (city?: string) => void
}

export default function GoldLoanPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: GoldLoanPageProps) {
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahesh Bankers'
  const bankName = settings.bankPartnerName || 'RBI-Approved Scheduled Commercial Banks'

  // Live rates state
  const [liveRates, setLiveRates] = useState<PurityRate[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Modals & Application State
  const [applyModalOpen, setApplyModalOpen] = useState<boolean>(false)

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

  // Curated FAQ Items
  const curatedFaqs = [
    {
      question: 'How much maximum loan can I get against my gold jewellery?',
      answer:
        'As per RBI guidelines, you can get up to 75% of your gold’s exact live market value. Loan amounts range from ₹25,000 to ₹1.5+ Crores with instant direct bank transfer.',
    },
    {
      question: 'How is my pledged gold stored and secured?',
      answer:
        `All pledged ornaments are sealed in tamper-proof security pouches in your presence and stored in 100% fully insured multi-tier bank lockers with ${bankName} and 24/7 CCTV surveillance.`,
    },
    {
      question: 'Are there any foreclosure or prepayment penalty charges?',
      answer:
        `No, ${companyName} does not charge any foreclosure or pre-closure penalty fees. You can settle your loan at any time with zero extra charges.`,
    },
    {
      question: 'What are the available loan repayment schemes?',
      answer:
        '1) Monthly Interest Scheme (pay monthly interest and settle the principal on maturity), 2) Bullet Scheme (pay principal and accumulated interest together at closure), or 3) Regular EMI plans tailored to your needs.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Reusable White & Orange Ambient Background */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="gold-loan"
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
        spotRate24K={price24kPerGram}
      />

      {/* Main Content Area */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10 w-full flex flex-col gap-12 md:gap-16">
        {/* Section 1: Hero Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} />
            <span>INSTANT CASH AGAINST GOLD • MINIMAL KYC</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-extrabold text-slate-800 tracking-tight leading-[1.15]">
            Instant Gold Loan Services <br />
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
              Fast 15-Minute Sanctions
            </span>
            <span className="block text-sm sm:text-lg font-semibold text-slate-500 mt-2 font-sans">
              உடனடி 15 நிமிட நகைக்கடன் சேவைகள்
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
            Unlock maximum value against your gold jewellery at low interest rates with 15-minute cash or bank transfer, 100% insured bank vault storage, and zero hidden fees.
          </p>
        </div>

        {/* Section 2: Maximum Value & Instant Cash Showcase Card (Image Left, Text Right) */}
        <div className="p-8 md:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          {/* Left Visual — Gold Loan Bank & Jewelry Image */}
          <div className="w-full lg:w-5/12 flex items-center justify-center lg:justify-start shrink-0">
            <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(249,115,22,0.12)] border border-slate-100 group">
              <img
                src={goldLoanBankHero}
                alt="Gold Loan Bank and Jewellery Valuation"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Right Feature Details */}
          <div className="w-full lg:w-7/12 flex flex-col gap-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit">
              <span>SAFE • RELIABLE • INSTANT</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight leading-snug">
              Unlock Maximum Value & Instant Cash{' '}
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                Against Your Gold
              </span>
              <span className="block text-sm sm:text-lg font-semibold text-slate-500 mt-1 font-sans">
                உங்கள் நகைகளுக்கு அதிகபட்ச கடன் மதிப்பும் குறைந்த வட்டியும்
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Pledge your gold jewellery with complete trust. Benefit from maximum per-gram loan valuation, affordable monthly interest, flexible tenure options, and 100% insured German bank safe custody.
            </p>

            {/* 3 Diamond Bullet Points */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Up to 75% of Current Market Value (RBI-Compliant LTV)</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Zero Foreclosure & Pre-Payment Charges</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Attractive Interest Starting from 0.75% Per Month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Market Rates (Live Rates 1g) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                LIVE RATES PER 1 GRAM
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Today's Benchmark Gold Rates
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  இன்றைய நேரடி சந்தை குறிப்பு தங்கம் விலை (1g)
                </span>
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 self-start sm:self-auto shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Market Open • LIVE IST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard (22K) Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[#FF6B00]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    22K Hallmarked Jewellery Gold
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200">
                  <TrendingUp size={12} />
                  <span>+0.81%</span>
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors tracking-tight">
                  {loading ? '...' : `₹${price22kPerGram.toLocaleString('en-IN')} / g`}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  91.6% Pure Gold (916 BIS Hallmark) • 1 Gram
                </span>
              </div>

              <div className="w-full h-[1px] bg-orange-100/80 rounded-full" />
            </div>

            {/* Pure (24K) Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-orange-50/70 via-white to-amber-50/60 border-2 border-orange-400/90 hover:border-orange-500 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group shadow-sm hover:shadow-[0_12px_30px_rgba(249,115,22,0.16)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#FF6B00]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    24K Pure Investment Gold
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200">
                  <TrendingUp size={12} />
                  <span>+0.81%</span>
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors tracking-tight">
                  {loading ? '...' : `₹${price24kPerGram.toLocaleString('en-IN')} / g`}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  99.9% Pure Gold (24 Karat Pure) • International Benchmark
                </span>
              </div>

              <div className="w-full h-[1px] bg-orange-100/80 rounded-full" />
            </div>
          </div>
        </div>

        {/* Section 4: Why Choose GoldFin (6 Grid Cards) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              WHY CHOOSE {companyName.toUpperCase()}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Key Benefits of {companyName} Loan
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                நகைக்கடனின் முக்கிய சிறப்பம்சங்கள்
              </span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Minimal KYC documentation, 15-minute cash disbursal, and 100% insured bank vault security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Instant Approval */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                15-Min Instant Sanction
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Rapid non-destructive appraisal and immediate cash or bank transfer to your account within 15 minutes.
              </p>
            </div>

            {/* Card 2: Highest Valuation */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <Scale size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Highest Loan Valuation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Get up to 75% of your gold's live benchmark market value in compliance with RBI regulations.
              </p>
            </div>

            {/* Card 3: Secure Storage */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                100% Insured Bank Vaults
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                24/7 biometric CCTV surveillance and full national insurance coverage on all pledged jewellery.
              </p>
            </div>

            {/* Card 4: Minimal Documentation */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Minimal KYC Documentation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                No salary slips or income proofs required. Sanction loans instantly with just your Aadhaar and PAN card.
              </p>
            </div>

            {/* Card 5: Flexible Repayment */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <Calendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Flexible Repayment Plans
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Choose between monthly interest payments, bullet repayment schemes, or convenient regular EMIs.
              </p>
            </div>

            {/* Card 6: Quick Disbursal */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <CreditCard size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Direct Bank Disbursal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Funds are disbursed instantly to your savings account via UPI, IMPS, or NEFT/RTGS with zero delay.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Five Steps to Gold Loan (Process Stepper) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              5 Simple Steps to Get Your Gold Loan
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                எளிய 5 படிகளில் உடனடி நகைக்கடன் பெறுங்கள்
              </span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Sanction your gold loan in just a few minutes with our streamlined branch process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative items-stretch">
            {[
              {
                num: '01',
                title: '1. Quick Apply',
                desc: 'Apply online or visit any of our nearby regional branches.',
              },
              {
                num: '02',
                title: '2. Laser Valuation',
                desc: 'German XRF laser testing conducted right in front of you.',
              },
              {
                num: '03',
                title: '3. Instant Sanction',
                desc: 'Maximum loan amount sanctioned based on live spot rates.',
              },
              {
                num: '04',
                title: '4. Safe Vaulting',
                desc: 'Jewellery sealed and stored in 100% insured bank lockers.',
              },
              {
                num: '05',
                title: '5. Instant Disbursal',
                desc: 'Cash or immediate direct bank transfer to your account.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-3 group shadow-2xs hover:shadow-xs h-full"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 text-xs font-black flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs shrink-0">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Verification Documents (4 Cards) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              KYC CHECKLIST
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Minimal Verification Documents
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                எளிய ஆவண சரிபார்ப்பு மற்றும் விரைவான ஒப்புதல்
              </span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Simple documentation for rapid loan sanction and immediate disbursal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <FileText size={22} />,
                title: 'ID Proof',
                desc: 'Aadhaar Card, Passport, or Voter ID Card',
              },
              {
                icon: <BadgePercent size={22} />,
                title: 'PAN Card',
                desc: 'Required as per Income Tax & RBI guidelines',
              },
              {
                icon: <ShieldCheck size={22} />,
                title: 'Address Proof',
                desc: 'Electricity bill, Driving License, or Aadhaar Card',
              },
              {
                icon: <CreditCard size={22} />,
                title: 'Bank Account',
                desc: 'Bank passbook or cancelled cheque for direct transfer',
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col items-center text-center gap-3 group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  {doc.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 8: FAQs Section */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Gold Loan Queries & Clarity
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                நகைக்கடன் பற்றிய பொதுவான சந்தேகங்களும் தீர்வுகளும்
              </span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Clear answers to all your questions regarding {companyName} gold loans.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {curatedFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl cursor-pointer transition-all flex flex-col gap-3 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp size={20} className="text-[#FF6B00] shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400 shrink-0" />
                    )}
                  </div>
                  {isOpen && (
                    <p className="text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

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

      {/* Instant Application Modal */}
      {applyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setApplyModalOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col gap-5 sm:gap-6 shadow-2xl relative text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Zap size={20} className="text-[#FF6B00]" />
                <span>Quick Gold Loan Application</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 border-0 cursor-pointer"
                onClick={() => setApplyModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/80 flex flex-col gap-1 text-xs">
              <span className="text-slate-600">{companyName} Instant Gold Loan</span>
              <span className="text-lg font-black text-slate-900">
                Up to 75% LTV sanctioned instantly
              </span>
              <span className="text-xs text-orange-600 font-semibold mt-1">
                Attractive interest starting from 0.75% per month
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Application submitted successfully! Our loan specialist will contact you in 15 minutes.')
                setApplyModalOpen(false)
              }}
              className="flex flex-col gap-3.5"
            >
              <input
                type="text"
                required
                placeholder="Full Name (as per Aadhaar)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="text"
                required
                placeholder="City / Pincode"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all border-0 cursor-pointer mt-2 shadow-[0_6px_25px_rgba(249,115,22,0.35)]"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
