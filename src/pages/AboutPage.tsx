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
  TrendingUp,
  ArrowRight,
  MapPin,
  Coins
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'
import { useSiteSettings } from '../hooks/useSiteSettings'

import aboutGoldGrowthSvg from '../assets/about_gold_growth.svg'

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
  const { settings } = useSiteSettings()
  const companyName = settings.siteName || 'Mahesh Bankers'
  const bankName = settings.bankPartnerName || '100% Insured Bank Vaults'

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

      {/* Main Content Container with Tightened Top Spacing & Polished Section Rhythm */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 pt-4 sm:pt-6 md:pt-8 pb-14 md:pb-20 relative z-10 w-full flex flex-col gap-14 sm:gap-18 md:gap-22">
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-3 sm:gap-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase shadow-2xs">
                <Sparkles size={14} />
                <span>EST. 2024 • INDIA'S TRUSTED GOLD PLATFORM</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[3.15rem] font-extrabold text-slate-800 tracking-tight leading-[1.15]">
                Your Trusted Partner in <br />
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                  Gold Rates & Loans
                </span>
                <span className="block text-sm sm:text-lg font-semibold text-slate-500 mt-2 font-sans">
                  100% வெளிப்படையான விலை மற்றும் வங்கி பாதுகாப்பு
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
                {companyName} is India's premier transparent platform for real-time gold price benchmarks and instant gold-backed financing. We provide live 1-gram purity rates, BIS Hallmark standards, and {bankName} security. Experience complete price transparency with verified standards.
              </p>
            </div>

            {/* Right Visual — Big, Ultra-Clear 4K/8K Vector Gold Growth Hero Visual */}
            <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[720px] group">
                {/* Decorative Warm Golden Ambient Glow */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#FF6B00]/25 via-amber-400/20 to-orange-500/15 rounded-[36px] blur-2xl -z-10 group-hover:from-[#FF6B00]/35 group-hover:via-amber-400/25 transition-all duration-700" />

                {/* Main Clean High-Definition Image Container without any obstructing tags */}
                <div className="relative rounded-3xl overflow-hidden border border-orange-200/90 shadow-[0_25px_60px_rgba(249,115,22,0.18)] bg-white p-1 sm:p-2">
                  <img
                    src={aboutGoldGrowthSvg}
                    alt={`${companyName} Gold Market Growth & Live Value Appreciation`}
                    className="w-full h-auto rounded-2xl object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Key Features & Action Highlights — Center of the Page */}
        <div className="w-full flex flex-col items-center justify-center gap-5 sm:gap-6 py-1">
          {/* 3 Key Feature Cards Grid — Refined Balanced Typography for both PC & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 md:gap-4 w-full max-w-4xl items-stretch">
            <div className="flex items-center justify-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-orange-300 transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100/60 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck size={22} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-[15px] font-extrabold text-slate-900 leading-tight">100% BIS</span>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">916 & 999 Hallmark</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-orange-300 transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100/60 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Zap size={22} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-[15px] font-extrabold text-slate-900 leading-tight">15-Min Loan</span>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">75% RBI Approved</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-orange-200/80 shadow-2xs hover:shadow-xs hover:border-orange-300 transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100/60 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Lock size={22} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-[15px] font-extrabold text-slate-900 leading-tight">₹0 Storage</span>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">100% Bank Insured</span>
              </div>
            </div>
          </div>

          {/* Action Buttons — Centered */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full pt-1">
            <button
              onClick={onNavigateLiveRate}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_20px_rgba(249,115,22,0.3)] cursor-pointer border-0 flex items-center justify-center gap-2 active:scale-95"
            >
              <Coins size={16} />
              <span>Check Live Rates</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={onNavigateBranches}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-orange-500 text-slate-700 hover:text-orange-600 font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <MapPin size={15} className="text-orange-600" />
              <span>Find Nearest Branch</span>
            </button>
          </div>
        </div>

        {/* Core Metrics Strip (4 Impact Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-full group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-slate-800 group-hover:text-[#FF6B00] transition-colors tracking-tight">
                ₹50000+
              </div>
              <div className="text-xs text-slate-500 font-bold mt-1">Monthly Gold Valued</div>
            </div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-full group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs shrink-0">
              <Users size={24} />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-slate-800 group-hover:text-[#FF6B00] transition-colors tracking-tight">
                10,000+
              </div>
              <div className="text-xs text-slate-500 font-bold mt-1">Happy Families Served</div>
            </div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-full group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-slate-800 group-hover:text-[#FF6B00] transition-colors tracking-tight">
                99.99%
              </div>
              <div className="text-xs text-slate-500 font-bold mt-1">Real-Time Rate Accuracy</div>
            </div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-full group shadow-xs hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-slate-800 group-hover:text-[#FF6B00] transition-colors tracking-tight">
                100%
              </div>
              <div className="text-xs text-slate-500 font-bold mt-1">BIS Hallmark Certified</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-11 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.05)] h-full">
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

            <div className="flex flex-col gap-3.5 border-t border-orange-100 pt-6">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Direct IBJA Benchmark Updates</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Live MCX Spot Commodity Rates</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Strict 6-Digit BIS HUID Verification</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-11 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.05)] h-full">
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

            <div className="flex flex-col gap-3.5 border-t border-orange-100 pt-6">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Instant 75% RBI-Sanctioned Value</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>100% Insured High-Security Bank Vaults</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Continuous Live Price Benchmarks</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col items-center text-center gap-2.5">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">
              OUR CORE PILLARS
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
              The Four Pillars of {companyName}
              <span className="block text-sm sm:text-base font-semibold text-slate-500 mt-1 font-sans">
                {companyName} நிறுவனத்தின் நான்கு அடிப்படை தூண்கள்
              </span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              The core principles and commitments that define {companyName}'s integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Pillar 1: Certified Purity */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs mb-5 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors min-h-[3.25rem] flex items-center mb-2.5 leading-snug">
                  Certified Purity
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  100% BIS Hallmarked certified standards for 24K (999) pure gold and 22K (916) jewellery gold.
                </p>
              </div>
            </div>

            {/* Pillar 2: Real-Time Benchmark Rates */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs mb-5 shrink-0">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors min-h-[3.25rem] flex items-center mb-2.5 leading-snug">
                  Real-Time Benchmark Rates
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Live price data synchronized directly with official IBJA and MCX national commodity indices.
                </p>
              </div>
            </div>

            {/* Pillar 3: Transparent 3% GST Breakdown */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs mb-5 shrink-0">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors min-h-[3.25rem] flex items-center mb-2.5 leading-snug">
                  Transparent 3% GST Breakdown
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Accurate and itemized calculation of gold metal, making charges, and statutory 3% GST.
                </p>
              </div>
            </div>

            {/* Pillar 4: 100% Insured Bank Vaults */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-orange-50/25 to-amber-50/20 border border-orange-200/80 hover:border-orange-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-2xs mb-5 shrink-0">
                  <Lock size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors min-h-[3.25rem] flex items-center mb-2.5 leading-snug">
                  {bankName}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  24/7 CCTV surveillance, biometric dual-control custody, and full national insurance protection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-r from-orange-50 via-white to-orange-50 border border-orange-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-[0_10px_35px_rgba(249,115,22,0.08)]">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Need Assistance from {companyName}? <span className="block text-base sm:text-lg font-bold text-slate-500 mt-1">We're Here to Help You</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Have questions about live gold rates, loan calculations, or visiting our nearest branch? Contact our specialists today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto shrink-0">
            <button
              onClick={() => {
                if (onNavigateContact) {
                  onNavigateContact()
                } else {
                  window.location.hash = '#contact'
                }
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer border-0 flex items-center justify-center gap-2 active:scale-95"
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
