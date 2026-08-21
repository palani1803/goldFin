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
  MapPin,
  CheckCircle2,
  Mail,
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'

interface AboutPageProps {
  onNavigateHome?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: () => void
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
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">About GoldFin</span>
          </div>

          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase">
              <Sparkles size={14} />
              <span>EST. 2024 • INDIA'S TRUSTED GOLD PLATFORM</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.1]">
              Your Trusted Partner in <br />
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">
                Gold Rates & Loans
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              GoldFin is India's trusted platform for live gold rates and instant gold loans. We bring complete price transparency with real-time 1g rates, certified BIS hallmarking standards, and 100% safe bank locker loans.
            </p>
          </div>
        </div>

        {/* Core Metrics Strip (4 Impact Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <TrendingUp size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              ₹500Cr+
            </div>
            <div className="text-xs text-slate-500 font-medium">Monthly Gold Valued</div>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <Users size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              150,000+
            </div>
            <div className="text-xs text-slate-500 font-medium">Happy Users & Families</div>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <Zap size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              99.99%
            </div>
            <div className="text-xs text-slate-500 font-medium">Live Rate Uptime</div>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.12)]">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center mb-1 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
              <Award size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              100%
            </div>
            <div className="text-xs text-slate-500 font-medium">BIS Hallmark Verified</div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold w-fit">
                <Target size={14} />
                <span>OUR CORE MISSION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Democratizing Gold Price Transparency Across India
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Our mission is to eliminate hidden charges and unclear rates from India's gold market. We help families, everyday buyers, and jewellery lovers with live gold rates, accurate 1-gram calculations, and clear 3% GST breakdowns.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Direct updates from India Bullion & Jewellers Association (IBJA)</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Live MCX commodity gold market prices</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Strict 6-digit BIS HUID purity verification standards</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold w-fit">
                <Building2 size={14} />
                <span>OUR VISION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Building India's Most Transparent Gold Ecosystem
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                We envision a simple, transparent gold market where every family can buy gold with confidence and access instant loans at fair market rates with complete security.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Instant gold loan sanctions up to 75% RBI-approved value</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>100% safe bank locker vaults with full insurance</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-[#FF6B00] shrink-0" />
                <span>Daily morning (10:00 AM) and evening (4:30 PM) rate updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Our Standards</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              The Four Pillars of GoldFin
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Every rate update, calculation tool, and loan service on GoldFin follows these four core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Certified Purity
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                100% adherence to Bureau of Indian Standards (BIS) Hallmarking for 24K (999.9) and 22K (916).
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Live Rate Updates
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Real-time gold prices synchronized directly with IBJA opening benchmarks and MCX market prices.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                Clear GST Breakdown
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Transparent itemized breakdown of gold value, making charges, and the standard 3% Indian GST.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-sm">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                100% Safe Vaults
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Bank locker storage with 24/7 CCTV security and 100% full insurance coverage for all pledged gold.
              </p>
            </div>
          </div>
        </div>

        {/* Regional Network (5 Hubs) */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider mb-2">
                <MapPin size={13} />
                <span>REGIONAL NETWORK</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our City Presence
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Connected across India's top 5 gold markets and jewellery hubs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                city: 'Mumbai (HQ)',
                state: 'Maharashtra',
                address: 'BKC Financial District, Bandra East',
                tag: 'IBJA Market Desk',
              },
              {
                city: 'Chennai',
                state: 'Tamil Nadu',
                address: 'T. Nagar Jewellery Trade Arcade',
                tag: 'MJDMA Chennai Desk',
              },
              {
                city: 'Delhi NCR',
                state: 'National Capital',
                address: 'Connaught Place & Chandni Chowk',
                tag: 'DJA Delhi Desk',
              },
              {
                city: 'Bengaluru',
                state: 'Karnataka',
                address: 'MG Road Financial Center',
                tag: 'KJMA Bengaluru Desk',
              },
              {
                city: 'Hyderabad',
                state: 'Telangana',
                address: 'Banjara Hills & Abids Market',
                tag: 'TGJA Hyderabad Desk',
              },
            ].map((hub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-500/40 hover:bg-white transition-all flex flex-col justify-between gap-3 group shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider px-2 py-0.5 rounded bg-orange-100/60 border border-orange-200">
                    {hub.tag}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors mt-2">
                    {hub.city}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">{hub.state}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2">
                  {hub.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-orange-50 via-white to-orange-50 border border-orange-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_35px_rgba(249,115,22,0.08)]">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Need Assistance from GoldFin?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have questions regarding live gold rates, gold loan calculations, or branch appointments?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:support@goldfin.in"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer no-underline flex items-center gap-2"
            >
              <Mail size={16} />
              <span>Contact Support Team</span>
            </a>
            <button
              onClick={onNavigateLiveRate}
              className="px-7 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-orange-500/40 hover:text-[#FF6B00] transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <span>Explore Live Rates</span>
              <ArrowRight size={16} />
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
