import {
  ShieldCheck,
  Zap,
  Award,
  Lock,
  Building2,
  Users,
  Target,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Mail,
  TrendingUp
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground, AboutTrustHeroBanner } from '../components'

interface AboutPageProps {
  onNavigateHome?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: (city?: string) => void
}

export default function AboutPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateContact,
}: AboutPageProps) {

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Reusable White & Orange Ambient Background */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="about"
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

      {/* Main Content Container */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10 w-full flex flex-col gap-14 md:gap-20">
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase">
                <Sparkles size={14} />
                <span>EST. 2024 • INDIA'S TRUSTED GOLD PLATFORM</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[3.1rem] font-extrabold text-slate-800 tracking-tight leading-[1.15]">
                Your Trusted Partner in <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  Gold Rates & Loans
                </span>
                <span className="block text-sm sm:text-lg font-semibold text-slate-500 mt-2 font-sans">
                  100% வெளிப்படையான விலை மற்றும் வங்கி பாதுகாப்பு
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
                GoldFin is India's premier transparent platform for real-time gold price benchmarks and instant gold-backed financing. We provide live 1-gram purity rates, BIS Hallmark standards, and 100% insured bank vault facilities. Experience complete price transparency with verified standards.
              </p>
            </div>

            {/* Right Image Visual — Vector High Definition: Your Trust. Your Wealth. Your Golden Future. */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[580px] group">
                {/* Decorative Amber Glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500/25 via-amber-400/15 to-transparent rounded-3xl blur-2xl -z-10 group-hover:from-orange-500/35 transition-all duration-500" />

                <AboutTrustHeroBanner />
              </div>
            </div>
          </div>
        </div>

        {/* Core Metrics Strip (4 Impact Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
              <TrendingUp size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-800 group-hover:text-[#FF6B00] transition-colors">
              ₹500+ Cr
            </div>
            <div className="text-xs text-slate-500 font-medium">Monthly Gold Valued</div>
          </div>

          <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
              <Users size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-800 group-hover:text-[#FF6B00] transition-colors">
              10,000+
            </div>
            <div className="text-xs text-slate-500 font-medium">Happy Families Served</div>
          </div>

          <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
              <Zap size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-800 group-hover:text-[#FF6B00] transition-colors">
              99.99%
            </div>
            <div className="text-xs text-slate-500 font-medium">Real-Time Rate Accuracy</div>
          </div>

          <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
              <Award size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-800 group-hover:text-[#FF6B00] transition-colors">
              100%
            </div>
            <div className="text-xs text-slate-500 font-medium">BIS Hallmark Certified</div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.05)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/70 border border-orange-200 text-orange-700 text-xs font-bold w-fit">
                <Target size={14} />
                <span>OUR CORE MISSION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-snug">
                Democratizing Price Transparency
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  வெளிப்படையான தங்கம் விலை மற்றும் நேரடி சந்தை தகவல்கள்
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Our mission is to eliminate hidden markups, giving everyday citizens access to live bullion market prices, exact 1-gram calculations, and clear 3% GST breakdowns.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-orange-100 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Direct IBJA Benchmark Updates</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Live MCX Spot Commodity Rates</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Strict 6-Digit BIS HUID Verification</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.05)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/70 border border-orange-200 text-orange-700 text-xs font-bold w-fit">
                <Building2 size={14} />
                <span>OUR VISION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-snug">
                Building India's Most Trusted Gold Platform
                <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                  இந்தியாவின் முன்னணி நம்பகமான தங்கம் தளம்
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Empowering every Indian family to buy gold jewellery with total clarity and unlock emergency capital against gold at fair, RBI-compliant market valuations.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-orange-100 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Instant 75% RBI-Sanctioned Value</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>100% Insured High-Security Bank Vaults</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Continuous Live Price Benchmarks</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              OUR CORE PILLARS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              The Four Pillars of GoldFin
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                கோல்ட்பின் நிறுவனத்தின் நான்கு அடிப்படை தூண்கள்
              </span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              The core principles and commitments that define GoldFin's integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Certified Purity
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                100% BIS Hallmarked certified standards for 24K (999) pure gold and 22K (916) jewellery gold.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Real-Time Benchmark Rates
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Live price data synchronized directly with official IBJA and MCX national commodity indices.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Transparent 3% GST Breakdown
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Accurate and itemized calculation of gold metal, making charges, and statutory 3% GST.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                100% Insured Bank Vaults
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                24/7 CCTV surveillance, biometric dual-control custody, and full national insurance protection.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-orange-50 via-white to-orange-50 border border-orange-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.08)]">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Need Assistance from GoldFin? <span className="block text-base font-bold text-slate-500 mt-0.5">We're Here to Help You</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have questions about live gold rates, loan calculations, or visiting our nearest branch? Contact our specialists today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => {
                if (onNavigateContact) {
                  onNavigateContact()
                } else {
                  window.location.hash = '#contact'
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0 flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        {/* Trust Banner Component */}
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
