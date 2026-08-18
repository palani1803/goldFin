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
  onNavigateAbout?: () => void
}

export default function AboutPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
}: AboutPageProps) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#121212] text-[#E5E5E5] font-sans antialiased selection:bg-[#C89B2A]/30 selection:text-yellow-200 relative">
      {/* Reusable Mild Gold Luxury Background */}
      <GoldBackground textureOpacity={0.08} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="about"
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

      {/* Main Content Container */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10 w-full flex flex-col gap-14 md:gap-20">
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#DAAE4D] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-400"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-[#DAAE4D] font-bold">About GoldFin</span>
          </div>

          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit uppercase">
              <Sparkles size={14} />
              <span>EST. 2024 • INSTITUTIONAL BULLION TECHNOLOGY</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.1]">
              Pioneering Trust in <br />
              <span className="bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] bg-clip-text text-transparent">
                Precious Metal Finance
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              GoldFin is India's premier institutional precious metal platform. We bridge domestic exchange transparency with real-time 1g spot rates, certified BIS hallmarking standards, and ultra-secure bullion liquidity.
            </p>
          </div>
        </div>

        {/* Core Metrics Strip (4 Impact Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-lg">
            <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center mb-1 group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
              <TrendingUp size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors">
              ₹500Cr+
            </div>
            <div className="text-xs text-slate-400 font-medium">Monthly Valued Bullion</div>
          </div>

          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-lg">
            <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center mb-1 group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
              <Users size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors">
              150,000+
            </div>
            <div className="text-xs text-slate-400 font-medium">Active Investors & Jewelers</div>
          </div>

          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-lg">
            <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center mb-1 group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
              <Zap size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors">
              99.99%
            </div>
            <div className="text-xs text-slate-400 font-medium">IBJA & MCX Feed Uptime</div>
          </div>

          <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/40 backdrop-blur-xl transition-all duration-300 flex flex-col gap-2 group shadow-lg">
            <div className="w-11 h-11 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center mb-1 group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
              <Award size={22} />
            </div>
            <div className="text-3xl md:text-4xl font-black text-white group-hover:text-[#DAAE4D] transition-colors">
              100%
            </div>
            <div className="text-xs text-slate-400 font-medium">BIS Hallmark Compliant</div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold w-fit">
                <Target size={14} />
                <span>OUR CORE MISSION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Democratizing Institutional Precious Metal Transparency
              </h2>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Our mission is to eliminate hidden markups and asymmetrical pricing from India's gold market. We provide retail families, seasoned investors, and commercial jewelers with direct institutional exchange feeds, accurate 1-gram valuations, and automated GST compliance.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                <span>Direct integration with India Bullion and Jewellers Association (IBJA)</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                <span>Real-time MCX domestic commodity trading updates</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                <span>Strict 6-digit BIS HUID purity verification standards</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-6 p-8 md:p-10 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold w-fit">
                <Building2 size={14} />
                <span>OUR STRATEGIC VISION</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Building India's Most Trusted Digital Bullion Ecosystem
              </h2>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                We envision a modern financial landscape where every gold asset—from physical sovereign coins to heirloom ornaments—holds verified, instantly redeemable liquidity at fair market value with zero friction.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                <span>Instant gold loan sanctions up to 75% RBI-compliant LTV</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                <span>Lloyd’s syndicate underwritten vault storage security</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                <CheckCircle2 size={18} className="text-[#DAAE4D] shrink-0" />
                <span>Automated daily 10:00 AM IST benchmark price fixes</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#DAAE4D] uppercase">Institutional Standards</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              The Four Pillars of GoldFin
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Every tool, rate feed, and liquidity service on GoldFin is anchored in these foundational principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Certified Purity
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                100% adherence to Bureau of Indian Standards (BIS) Hallmarking for 999.9 24K and 916 22K grades.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Real-Time Feeds
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Low-latency domestic spot prices synchronized directly with IBJA opening benchmarks and MCX trades.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                GST Compliance
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Transparent itemized breakdown of metal value, making charges, and the standard 3% Indian GST.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#222222]/70 border border-white/10 hover:border-[#C89B2A]/30 backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center group-hover:bg-[#DAAE4D] group-hover:text-slate-950 transition-all">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#DAAE4D] transition-colors">
                Vault Custody
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Fortified bank-grade vaults with Lloyd's syndicate insurance coverage and dual biometric authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Regional Bullion Presence (5 Hubs) */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#222222]/70 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider mb-2">
                <MapPin size={13} />
                <span>REGIONAL NETWORK</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Our Institutional Desks
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Connected across India's top 5 bullion trade and jewelry hubs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                city: 'Mumbai (HQ)',
                state: 'Maharashtra',
                address: 'BKC Financial District, Bandra East',
                tag: 'National Spot Desk',
              },
              {
                city: 'Chennai',
                state: 'Tamil Nadu',
                address: 'T. Nagar Bullion Trade Arcade',
                tag: 'MJDMA Hub',
              },
              {
                city: 'Delhi NCR',
                state: 'National Capital',
                address: 'Barakhamba Road, Connaught Place',
                tag: 'DJA Bullion Post',
              },
              {
                city: 'Bengaluru',
                state: 'Karnataka',
                address: 'MG Road Financial Center',
                tag: 'KJMA Association',
              },
              {
                city: 'Hyderabad',
                state: 'Telangana',
                address: 'Banjara Hills Wealth Suite',
                tag: 'TGJA Desk',
              },
            ].map((hub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-[#C89B2A]/30 transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-[#DAAE4D] tracking-wider px-2 py-0.5 rounded bg-[#C89B2A]/10 border border-[#C89B2A]/20">
                    {hub.tag}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#DAAE4D] transition-colors mt-2">
                    {hub.city}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">{hub.state}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed border-t border-white/5 pt-2">
                  {hub.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Contact Strip */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#222222] via-[#1A1A1A] to-[#222222] border border-[#C89B2A]/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Partner with GoldFin Institutional Desk
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Have inquiries regarding institutional precious metal valuation, bulk bullion trading, or treasury integration?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:desk@goldfin.investments"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_6px_30px_rgba(234,179,8,0.35)] cursor-pointer no-underline flex items-center gap-2"
            >
              <Mail size={16} />
              <span>Contact Treasury Desk</span>
            </a>
            <button
              onClick={onNavigateLiveRate}
              className="px-7 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white font-bold text-sm hover:bg-white/10 hover:border-[#C89B2A]/40 transition-all cursor-pointer flex items-center gap-2"
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
