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
import { Navbar, Footer, GoldBackground } from '../components'
import { useLanguage } from '../i18n'

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
  onNavigateContact?: () => void
}

export default function GoldLoanPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: GoldLoanPageProps) {
  const { isTamil } = useLanguage()

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
  const curatedFaqs = isTamil ? [
    {
      question: 'எனது தங்கத்திற்கு அதிகபட்சமாக எவ்வளவு கடன் பெற முடியும்?',
      answer:
        'ஆர்பிஐ (RBI) விதிகளின்படி உங்கள் தங்கத்தின் இன்றைய சந்தை மதிப்பில் 75% வரை கடன் பெறலாம். ₹25,000 முதல் ₹1 கோடி வரை உடனடியாக உங்கள் வங்கிக் கணக்கிற்கு வழங்கப்படுகிறது.',
    },
    {
      question: 'அடமானம் வைக்கப்பட்ட தங்கம் எவ்வாறு பாதுகாக்கப்படுகிறது?',
      answer:
        'அனைத்து தங்க நகைகளும் 24/7 சிசிடிவி கண்காணிப்பு மற்றும் 100% முழு காப்பீட்டுடன் கூடிய உயர் பாதுகாப்பு வங்கி பெட்டகங்களில் (Bank Vaults) பாதுகாப்பாக வைக்கப்படுகின்றன.',
    },
    {
      question: 'கடனை முன்கூட்டியே அடைத்தால் அபராதக் கட்டணம் உண்டா?',
      answer:
        'இல்லை, கோல்ட்பின் நிறுவனத்தில் எந்தவிதமான மறைமுக அல்லது முன்கூட்டியே அடைப்பதற்கான அபராதக் கட்டணங்களும் (Zero Foreclosure Charges) கிடையாது.',
    },
    {
      question: 'திருப்பிச் செலுத்துவதற்கு என்னென்ன வழிகள் உள்ளன?',
      answer:
        '1) மாதாந்திர வட்டி திட்டம் (மாதம் வட்டி மட்டும் செலுத்தி முடிவில் அசல் செலுத்துவது), 2) புல்லட் திட்டம் (முடிவில் வட்டியும் அசலும் செலுத்துவது), 3) வழக்கமான மாதாந்திர EMI தவணை முறை என 3 எளிய முறைகள் உள்ளன.',
    },
  ] : [
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
            <span>{isTamil ? 'தங்க நகை கடன் • சிறந்த வட்டி விகிதம்' : 'INSTANT CASH AGAINST GOLD • BEST RATES'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.1]">
            {isTamil ? (
              <>
                உடனடி <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  தங்க கடன் சேவைகள்
                </span>
              </>
            ) : (
              <>
                Instant <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  Gold Loan Services
                </span>
              </>
            )}
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            {isTamil
              ? 'உங்கள் தங்க நகைகளுக்கு அதிகபட்ச கடன் மற்றும் மிகக் குறைந்த வட்டியில் உடனடி ரொக்கக் கடன் பெறுங்கள். 15 நிமிட அனுமதி, 100% பாதுகாப்பான வங்கி லாக்கர் மற்றும் பூஜ்ஜிய மறைமுகக் கட்டணங்கள்.'
              : 'Get instant cash against your gold jewellery and coins at the lowest interest rates in India. Fast 15-minute approval, 100% safe bank locker storage, and zero hidden fees.'}
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
              <span>{isTamil ? 'பாதுகாப்பானது • நம்பகமானது • உடனடியானது' : 'SAFE • RELIABLE • INSTANT'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {isTamil ? (
                <>
                  உங்கள் தங்கத்திற்கு அதிகபட்ச மதிப்பும் உடனடி ரொக்கமும்{' '}
                  <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                    பெறுங்கள்
                  </span>
                </>
              ) : (
                <>
                  Get Maximum Value and Instant Cash for{' '}
                  <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                    Your Gold
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              {isTamil
                ? 'உங்கள் தங்க நகைகளை அடமானம் வைத்து உடனடி பணத்தைப் பெறுங்கள். ஒரு கிராமுக்கு அதிக கடன் தொகை, குறைந்த மாதாந்திர வட்டி, நெகிழ்வான தவணை முறை மற்றும் 100% பாதுகாப்பான வங்கி லாக்கர் வசதி.'
                : 'Get instant money by pledging your gold jewellery at the best rates in town. We offer maximum loan per gram, lowest monthly interest, flexible repayment, and 100% safe bank locker storage.'}
            </p>

            {/* 3 Diamond Bullet Points */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{isTamil ? 'இன்றைய சந்தை மதிப்பில் 75% வரை உடனடி கடன் தொகை' : 'Up to 75% of Current Market Value as Instant Loan Amount'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{isTamil ? 'முன்கூட்டியே அடைப்பதற்கு எந்த கூடுதல் அபராதக் கட்டணமும் இல்லை' : 'Zero foreclosure charges or pre-payment penalties'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{isTamil ? 'மாதம் வெறும் 0.75% முதல் துவங்கும் குறைந்த வட்டி (ஆண்டுக்கு 9%)' : 'Starting interest rates from 0.75% per month (9% p.a.)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Market Rates (Live Rates 1g) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Live Rates Per 1 Gram</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Today's Gold Rates
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 self-start sm:self-auto shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>MARKET OPEN • LIVE IST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard (22K) Card */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
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
                  91.6% Pure Gold (Hallmark 916)
                </span>
              </div>

              <div className="w-full h-[1px] bg-slate-100 rounded-full" />
            </div>

            {/* Pure (24K) Card */}
            <div className="p-7 rounded-3xl bg-white border border-orange-300/70 hover:border-orange-500 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group shadow-[0_6px_25px_rgba(249,115,22,0.08)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.15)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#FF6B00]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    24K Pure Gold (Coins & Bars)
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
                  99.9% Pure Gold (24 Karat)
                </span>
              </div>

              <div className="w-full h-[1px] bg-slate-100 rounded-full" />
            </div>
          </div>

          <button
            onClick={onNavigateLiveRate}
            className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition-colors bg-transparent border-0 p-0 cursor-pointer self-center mt-1"
          >
            
          </button>
        </div>

        {/* Section 4: Why Choose GoldFin (6 Grid Cards) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Why Choose GoldFin</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose GoldFin for Your Gold Loan?
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Fastest gold loans with minimum paperwork, instant bank transfer, and 100% safe storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Instant Approval */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Instant Approval
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Quick verification and loan amount credited to your bank account within 15 minutes.
              </p>
            </div>

            {/* Card 2: Highest Valuation */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Scale size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Highest Loan Amount
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Get maximum loan amount up to 75% of today's market rate (as per RBI guidelines).
              </p>
            </div>

            {/* Card 3: Secure Storage */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                100% Safe Storage
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Bank-grade high security vaults with 100% full insurance coverage for your gold.
              </p>
            </div>

            {/* Card 4: Minimal Documentation */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Simple Paperwork
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                No salary slip or CIBIL score needed. Just bring your Aadhaar and PAN card for instant approval.
              </p>
            </div>

            {/* Card 5: Flexible Repayment */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Calendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Flexible Repayment
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Easy repayment options: pay monthly interest and principal at end, or pay monthly EMIs.
              </p>
            </div>

            {/* Card 6: Quick Disbursal */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <CreditCard size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Direct Bank Transfer
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Instant money transfer directly to your bank account via UPI, IMPS, or NEFT/RTGS.
              </p>
            </div>
          </div>
        </div>



        {/* Section 6: Five Steps to Gold Loan (Process Stepper) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">HOW IT WORKS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              5 Simple Steps to Get Your Gold Loan
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
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
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-3 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-black flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
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
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">KYC Checklist</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Verification Documents
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
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
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Got Questions?</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
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
            className="bg-white border border-slate-200 p-7 md:p-8 rounded-3xl max-w-md w-full flex flex-col gap-6 shadow-2xl relative text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Zap size={20} className="text-[#FF6B00]" />
                <span>{isTamil ? 'உடனடி தங்கக் கடனுக்கு விண்ணப்பிக்கவும்' : 'Apply for Instant Gold Loan'}</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 border-0 cursor-pointer"
                onClick={() => setApplyModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/80 flex flex-col gap-1 text-xs">
              <span className="text-slate-600">{isTamil ? 'தங்க நகை கடன்' : 'Gold Loan'}</span>
              <span className="text-lg font-black text-slate-900">
                {isTamil ? "உங்கள் தங்க மதிப்பில் 75% வரை கடன் பெறலாம்" : "Get up to 75% of your gold's market value"}
              </span>
              <span className="text-xs text-orange-600 font-semibold mt-1">
                {isTamil ? 'மாதம் வெறும் 0.75% முதல் துவங்கும் வட்டி (ஆண்டுக்கு 9%)' : 'Interest starting from 0.75% per month (9% p.a.)'}
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert(isTamil
                  ? 'விண்ணப்பம் வெற்றிகரமாக பெறப்பட்டது! எங்கள் தங்கக் கடன் ஆலோசகர் 15 நிமிடங்களில் உங்களை தொடர்புகொள்வார்.'
                  : 'Application Submitted Successfully! Our gold loan advisor will call you within 15 minutes to help complete your loan.')
                setApplyModalOpen(false)
              }}
              className="flex flex-col gap-3.5"
            >
              <input
                type="text"
                required
                placeholder={isTamil ? 'முழு பெயர் (ஆதாரில் உள்ளபடி)' : 'Full Name (as per Aadhaar)'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="tel"
                required
                placeholder={isTamil ? 'கைபேசி எண்' : 'Mobile Number'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="text"
                required
                placeholder={isTamil ? 'ஊர் / அஞ்சல் குறியீடு (Pincode)' : 'City / Pincode'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all border-0 cursor-pointer mt-2 shadow-[0_6px_25px_rgba(249,115,22,0.35)]"
              >
                {isTamil ? 'விண்ணப்பத்தை சமர்ப்பிக்க' : 'Submit Loan Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
