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

  // Curated Bilingual FAQ Items
  const curatedFaqs = [
    {
      question: 'எனது தங்கத்திற்கு அதிகபட்சமாக எவ்வளவு கடன் பெற முடியும்? • Maximum Loan Eligibility',
      answer:
        'ஆர்பிஐ (RBI) விதிகளின்படி உங்கள் தங்கத்தின் இன்றைய சந்தை மதிப்பில் 75% வரை கடன் பெறலாம். ₹25,000 முதல் ₹1 கோடி வரை உடனடியாக உங்கள் வங்கிக் கணக்கிற்கு வழங்கப்படுகிறது. You can get up to 75% of your gold’s exact market value with instant bank disbursals.',
    },
    {
      question: 'அடமானம் வைக்கப்பட்ட தங்கம் எவ்வாறு பாதுகாக்கப்படுகிறது? • Gold Storage & Vault Security',
      answer:
        'அனைத்து தங்க நகைகளும் 24/7 சிசிடிவி கண்காணிப்பு மற்றும் 100% முழு தேசிய காப்பீட்டுடன் கூடிய உயர் பாதுகாப்பு வங்கி பெட்டகங்களில் (Bank Vaults) பாதுகாப்பாக வைக்கப்படுகின்றன. Stored in multi-tier bank vaults with 100% full insurance coverage.',
    },
    {
      question: 'கடனை முன்கூட்டியே அடைத்தால் அபராதக் கட்டணம் உண்டா? • Foreclosure Charges',
      answer:
        'இல்லை, கோல்ட்பின் நிறுவனத்தில் எந்தவிதமான மறைமுக அல்லது முன்கூட்டியே அடைப்பதற்கான அபராதக் கட்டணங்களும் (Zero Foreclosure / Prepayment Charges) கிடையாது. Close your loan anytime with zero extra charges.',
    },
    {
      question: 'திருப்பிச் செலுத்துவதற்கு என்னென்ன வழிகள் உள்ளன? • Flexible Repayment Schemes',
      answer:
        '1) மாதாந்திர வட்டி திட்டம் (மாதம் வட்டி மட்டும் செலுத்தி முடிவில் அசல் செலுத்துவது), 2) புல்லட் திட்டம் (முடிவில் வட்டியும் அசலும் செலுத்துவது), 3) வழக்கமான மாதாந்திர EMI தவணை முறை என 3 எளிய முறைகள் உள்ளன.',
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
            <span>தங்க நகை கடன் • INSTANT CASH AGAINST GOLD</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-black text-slate-900 tracking-tight leading-[1.15]">
            உடனடி தங்கக் கடன் சேவைகள் <br />
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
              Instant Gold Loan Services
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
            உங்கள் தங்க நகைகளுக்கு அதிகபட்ச கடன் மற்றும் மிகக் குறைந்த வட்டியில் உடனடி ரொக்கக் கடன் பெறுங்கள். 15 நிமிட அனுமதி, 100% பாதுகாப்பான வங்கி லாக்கர் மற்றும் பூஜ்ஜிய மறைமுகக் கட்டணங்கள். Fast 15-minute sanction with zero hidden fees.
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
              <span>பாதுகாப்பானது • நம்பகமானது • உடனடியானது (SAFE • RELIABLE • INSTANT)</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              உங்கள் தங்கத்திற்கு அதிகபட்ச மதிப்பும் உடனடி ரொக்கமும்{' '}
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                பெறுங்கள்
              </span>
              <span className="block text-lg sm:text-2xl font-bold text-slate-500 mt-1">
                Maximum Value & Instant Cash For Your Gold
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              உங்கள் தங்க நகைகளை அடமானம் வைத்து உடனடி பணத்தைப் பெறுங்கள். ஒரு கிராமுக்கு அதிக கடன் தொகை, குறைந்த மாதாந்திர வட்டி, நெகிழ்வான தவணை முறை மற்றும் 100% பாதுகாப்பான வங்கி லாக்கர் வசதி.
            </p>

            {/* 3 Diamond Bullet Points */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>இன்றைய சந்தை மதிப்பில் 75% வரை உடனடி கடன் தொகை • Up to 75% of Current Market Value</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>முன்கூட்டியே அடைப்பதற்கு எந்த கூடுதல் அபராதக் கட்டணமும் இல்லை • Zero Foreclosure Charges</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>மாதம் வெறும் 0.75% முதல் துவங்கும் குறைந்த வட்டி • Starting From 0.75% per month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Market Rates (Live Rates 1g) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                நேரடி தங்கம் விலை (1 கிராமுக்கு) • LIVE RATES PER 1 GRAM
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                இன்றைய தங்க விலை நிலவரம் <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">Today's Benchmark Gold Rates</span>
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 self-start sm:self-auto shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>சந்தை இயங்குகிறது • LIVE IST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard (22K) Card */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[#FF6B00]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    22K ஆபரண தங்கம் • 22K Hallmarked Gold
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
                  91.6% தூய தங்கம் (916 BIS ஹால்மார்க்) • 1 கிராம்
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
                    24K சுத்த தங்கம் • 24K Pure Gold
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
                  99.9% தூய தங்கம் (24 Karat Pure) • சர்வதேச தரம்
                </span>
              </div>

              <div className="w-full h-[1px] bg-slate-100 rounded-full" />
            </div>
          </div>
        </div>

        {/* Section 4: Why Choose GoldFin (6 Grid Cards) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              ஏன் கோல்ட்பின்? • WHY CHOOSE GOLDFIN
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              கோல்ட்பின் தங்கக் கடனின் சிறப்பம்சங்கள் <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">Key Benefits of GoldFin Loan</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              குறைந்தபட்ச ஆவணங்கள், உடனடி வங்கி பரிமாற்றம் மற்றும் 100% பாதுகாப்பான சேமிப்பு.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Instant Approval */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                15 நிமிட உடனடி கடன் • Instant Sanction
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                விரைவான சரிபார்ப்பு மற்றும் 15 நிமிடங்களில் உங்கள் வங்கிக் கணக்கில் கடன் தொகை வரவு வைக்கப்படும்.
              </p>
            </div>

            {/* Card 2: Highest Valuation */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Scale size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                அதிகபட்ச கடன் மதிப்பு • Highest Value
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                ஆர்பிஐ விதிகளின்படி இன்றைய நேரடி சந்தை மதிப்பில் 75% வரை அதிக கடன் தொகை வழங்கப்படும்.
              </p>
            </div>

            {/* Card 3: Secure Storage */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                100% பாதுகாப்பான பெட்டகம் • Insured Vaults
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                24/7 சிசிடிவி மற்றும் முழு தேசிய காப்பீட்டுடன் கூடிய உயர் பாதுகாப்பு வங்கி பெட்டகங்கள்.
              </p>
            </div>

            {/* Card 4: Minimal Documentation */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                குறைந்தபட்ச ஆவணங்கள் • Minimal KYC
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                வருமான சான்றிதழ் தேவையில்லை. ஆதார் மற்றும் பான் கார்டு கொண்டு உடனடியாக கடன் பெறலாம்.
              </p>
            </div>

            {/* Card 5: Flexible Repayment */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Calendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                நெகிழ்வான தவணை முறை • Flexible Plans
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                மாத வட்டி திட்டம் அல்லது வழக்கமான EMI தவணை முறைகளில் உங்கள் வசதிக்கேற்ப திருப்பிச் செலுத்தலாம்.
              </p>
            </div>

            {/* Card 6: Quick Disbursal */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <CreditCard size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                நேரடி வங்கி வரவு • Instant Transfer
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                UPI, IMPS அல்லது NEFT/RTGS மூலம் உங்கள் வங்கிக் கணக்கில் பணம் உடனடியாக வரவு வைக்கப்படும்.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Five Steps to Gold Loan (Process Stepper) */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              செயல்முறை • HOW IT WORKS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              5 எளிய படிகளில் தங்கக் கடன் <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">5 Simple Steps to Get Your Gold Loan</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              சில நிமிடங்களில் உங்கள் தங்க நகைகளுக்கு ரொக்கம் பெறும் எளிய செயல்முறை.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              {
                num: '01',
                title: 'விண்ணப்பிக்க • Apply',
                desc: 'ஆன்லைன் மூலமாகவோ அல்லது கிளைக்கு நேரடியாகவோ வரவும்.',
              },
              {
                num: '02',
                title: 'தூய்மை சோதனை • Valuation',
                desc: 'உங்கள் முன்னிலையிலேயே லேசர் XRF சோதனை செய்யப்படும்.',
              },
              {
                num: '03',
                title: 'கடன் அனுமதி • Sanction',
                desc: 'இன்றைய உச்சகட்ட விலையில் உடனடி கடன் அனுமதி.',
              },
              {
                num: '04',
                title: 'பாதுகாப்பு • Vault',
                desc: 'நகைகள் சீலிடப்பட்டு வங்கி பெட்டகத்தில் வைக்கப்படும்.',
              },
              {
                num: '05',
                title: 'பணம் பெறுதல் • Disbursal',
                desc: 'வங்கிக் கணக்கில் உடனடியாக பணம் வரவு வைக்கப்படும்.',
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
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              தேவையான ஆவணங்கள் • KYC CHECKLIST
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              எளிய ஆவண சரிபார்ப்பு <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">Minimal Verification Documents</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              எந்தவித சிரமமுமின்றி விரைவான கடன் அனுமதியைப் பெற தேவையானவை.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <FileText size={22} />,
                title: 'அடையாள சான்று • ID Proof',
                desc: 'ஆதார் அட்டை, பாஸ்போர்ட் அல்லது வாக்காளர் அடையாள அட்டை',
              },
              {
                icon: <BadgePercent size={22} />,
                title: 'பான் கார்டு • PAN Card',
                desc: 'வருமான வரித்துறை விதிகளின்படி தேவையான அட்டை',
              },
              {
                icon: <ShieldCheck size={22} />,
                title: 'முகவரி சான்று • Address',
                desc: 'மின் கட்டண ரசீது, ஓட்டுநர் உரிமம் அல்லது ஆதார்',
              },
              {
                icon: <CreditCard size={22} />,
                title: 'வங்கி கணக்கு • Bank Account',
                desc: 'பரிமாற்றத்திற்கான வங்கி பாஸ்புக் அல்லது காசோலை',
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
              அடிக்கடி கேட்கப்படும் கேள்விகள் • FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              தங்கக் கடன் சந்தேகங்கள் & பதில்கள் <span className="block text-base sm:text-lg font-bold text-slate-500 mt-0.5">Gold Loan Queries & Clarity</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              கோல்ட்பின் தங்கக் கடன் பற்றிய முழுமையான தகவல்கள்.
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
                <span>உடனடி தங்கக் கடன் விண்ணப்பம் • Quick Apply</span>
              </div>
              <button
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 border-0 cursor-pointer"
                onClick={() => setApplyModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/80 flex flex-col gap-1 text-xs">
              <span className="text-slate-600">தங்க நகை கடன் • Gold Loan Scheme</span>
              <span className="text-lg font-black text-slate-900">
                தங்க மதிப்பில் 75% வரை உடனடி கடன் (Up to 75% LTV)
              </span>
              <span className="text-xs text-orange-600 font-semibold mt-1">
                மாதம் வெறும் 0.75% முதல் துவங்கும் வட்டி • From 0.75% p.m.
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('விண்ணப்பம் வெற்றிகரமாக பெறப்பட்டது! Application submitted. Our loan specialist will contact you in 15 minutes.')
                setApplyModalOpen(false)
              }}
              className="flex flex-col gap-3.5"
            >
              <input
                type="text"
                required
                placeholder="முழு பெயர் • Full Name (as per Aadhaar)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="tel"
                required
                placeholder="கைபேசி எண் • Mobile Number"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />
              <input
                type="text"
                required
                placeholder="ஊர் / அஞ்சல் குறியீடு • City / Pincode"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#FF6B00]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all border-0 cursor-pointer mt-2 shadow-[0_6px_25px_rgba(249,115,22,0.35)]"
              >
                விண்ணப்பிக்க • Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
