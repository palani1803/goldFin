import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react'
import { Navbar, Footer, TrustBanner, GoldBackground } from '../components'

export interface ContactPageProps {
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateContact?: () => void
}

export default function ContactPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateContact,
}: ContactPageProps) {
  const [copiedPhone, setCopiedPhone] = useState(false)

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText('18004653346')
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#070D1E] text-[#F1F4F9] font-sans antialiased selection:bg-[#C89B2A]/30 selection:text-yellow-200 relative">
      {/* Reusable Gold Luxury Background Component */}
      <GoldBackground textureOpacity={0.08} showGlows={true} />

      {/* Top Header via Reusable Navbar Component */}
      <Navbar
        currentPage="contact"
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

      {/* Main Content Container */}
      <main className="max-w-[1320px] mx-auto px-4 md:px-6 py-10 md:py-14 relative z-10 w-full flex flex-col gap-12 md:gap-16">
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#DAAE4D] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-400"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-[#DAAE4D] font-bold">Contact & Branch Location</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D] text-xs font-bold tracking-wider w-fit uppercase">
            <Sparkles size={14} />
            <span>SIVAKASI BRANCH & CLIENT ADVISORY DESK</span>
          </div>
        </div>

        {/* 2-Column Main Section (Get in Touch & Sivakasi Map Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Get in Touch & Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight leading-[1.15]">
                Get in <span className="bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Our bullion and gold loan advisory team is standing by to assist you. Visit our Sivakasi branch for verified BIS hallmarking appraisals and instant gold loans.
              </p>
            </div>

            {/* 4 Contact Information Cards */}
            <div className="flex flex-col gap-3.5">
              {/* 1. Branch Location (Sivakasi) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D172E]/85 border border-[#1E3159] hover:border-[#DAAE4D]/35 transition-all flex items-start gap-4 shadow-lg group">
                <div className="w-11 h-11 rounded-xl bg-[#C89B2A]/10 border border-[#C89B2A]/25 text-[#DAAE4D] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#F3C55B] group-hover:to-[#C89B2A] group-hover:text-slate-950 transition-all">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DAAE4D]">
                    SIVAKASI MAIN BRANCH & VAULT
                  </span>
                  <span className="text-sm md:text-base font-extrabold text-white mt-0.5">
                    GoldFin Bullion Center, Kamarajar Road
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    Near Old Bus Stand, Sivakasi, Tamil Nadu 626123
                  </span>
                </div>
              </div>

              {/* 2. Priority Line */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D172E]/85 border border-[#1E3159] hover:border-[#DAAE4D]/35 transition-all flex items-start gap-4 shadow-lg group">
                <div className="w-11 h-11 rounded-xl bg-[#C89B2A]/10 border border-[#C89B2A]/25 text-[#DAAE4D] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#F3C55B] group-hover:to-[#C89B2A] group-hover:text-slate-950 transition-all">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DAAE4D]">
                    PRIORITY TOLL-FREE LINE
                  </span>
                  <div className="flex items-center gap-3 mt-0.5">
                    <a
                      href="tel:18004653346"
                      className="text-sm md:text-base font-black text-white hover:text-[#DAAE4D] transition-colors no-underline"
                    >
                      +91 1800-GOLDFIN
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#1E3159] hover:bg-[#DAAE4D] hover:text-slate-950 text-slate-300 transition-colors border-0 cursor-pointer"
                    >
                      {copiedPhone ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5">
                    Direct access to Gold Rate Desk & Loan Appraisals
                  </span>
                </div>
              </div>

              {/* 3. Digital Concierge */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D172E]/85 border border-[#1E3159] hover:border-[#DAAE4D]/35 transition-all flex items-start gap-4 shadow-lg group">
                <div className="w-11 h-11 rounded-xl bg-[#C89B2A]/10 border border-[#C89B2A]/25 text-[#DAAE4D] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#F3C55B] group-hover:to-[#C89B2A] group-hover:text-slate-950 transition-all">
                  <Mail size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DAAE4D]">
                    DIGITAL CONCIERGE & ADVISORY
                  </span>
                  <a
                    href="mailto:support@goldfin.in"
                    className="text-sm md:text-base font-black text-white hover:text-[#DAAE4D] transition-colors mt-0.5 no-underline"
                  >
                    support@goldfin.in
                  </a>
                  <span className="text-xs text-slate-400 mt-0.5">
                    Local branch email: <span className="text-slate-300">sivakasi@goldfin.in</span>
                  </span>
                </div>
              </div>

              {/* 4. Business Hours */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0D172E]/85 border border-[#1E3159] hover:border-[#DAAE4D]/35 transition-all flex items-start gap-4 shadow-lg group">
                <div className="w-11 h-11 rounded-xl bg-[#C89B2A]/10 border border-[#C89B2A]/25 text-[#DAAE4D] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#F3C55B] group-hover:to-[#C89B2A] group-hover:text-slate-950 transition-all">
                  <Clock size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DAAE4D]">
                    BRANCH BUSINESS HOURS (IST)
                  </span>
                  <span className="text-sm md:text-base font-extrabold text-white mt-0.5">
                    Mon–Sat: 9:00 AM – 6:30 PM
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    Sunday & Market Holidays: Closed (Live rate website streams 24/7)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Sivakasi,+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(234,179,8,0.3)] no-underline flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation size={15} />
                <span>Get Directions</span>
              </a>
              <a
                href="tel:18004653346"
                className="py-3 px-5 rounded-xl bg-[#080E1E] border border-[#1E3159] text-white hover:border-[#DAAE4D]/40 font-bold text-xs transition-all no-underline flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone size={15} className="text-[#DAAE4D]" />
                <span>Call Branch</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dedicated Sivakasi Map Container (Perfect Fit) */}
          <div className="lg:col-span-7 relative flex flex-col h-full min-h-[560px]">
            {/* Ambient Map Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#F3C55B]/15 via-[#1E3159]/25 to-[#DAAE4D]/10 blur-xl pointer-events-none" />

            {/* Map Card Wrapper */}
            <div className="relative h-full w-full rounded-3xl bg-[#0D172E]/90 border border-[#1E3159] backdrop-blur-2xl shadow-[0_20px_50px_rgba(4,8,19,0.7)] flex flex-col overflow-hidden p-4 sm:p-5 gap-4">
              {/* Map Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E3159]/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C89B2A]/15 border border-[#C89B2A]/30 text-[#DAAE4D] flex items-center justify-center shrink-0">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      Sivakasi Branch & Vault Map
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Virudhunagar District, Tamil Nadu • PIN 626123
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Branch Open</span>
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Sivakasi,+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#DAAE4D] hover:text-white px-2.5 py-1 rounded-lg bg-[#080E1E] border border-[#1E3159] transition-colors flex items-center gap-1 no-underline"
                  >
                    <span>Full Screen</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Interactive Google Map of Sivakasi */}
              <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#1E3159] bg-[#070D1E] shadow-inner">
                <iframe
                  title="Sivakasi Branch Map"
                  src="https://maps.google.com/maps?q=Sivakasi,+Tamil+Nadu,+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0"
                  style={{
                    filter: 'contrast(1.04) brightness(0.95)',
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Gold Branch Pin Badge */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-[#070D1E]/90 border border-[#DAAE4D]/40 backdrop-blur-md shadow-xl flex items-center gap-2 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F3C55B] animate-ping" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#F3C55B] uppercase tracking-wider">
                      GOLDFIN SIVAKASI HUB
                    </span>
                    <span className="text-[9px] text-slate-300 font-semibold">
                      Kamarajar Road Bullion Desk
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature & Navigation Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-3 rounded-xl bg-[#080E1E] border border-[#1E3159] flex items-center gap-2.5 text-slate-300">
                  <ShieldCheck size={16} className="text-[#DAAE4D] shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    100% Insured Bank Vault Storage
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#080E1E] border border-[#1E3159] flex items-center gap-2.5 text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    Instant 15-Min Loan Sanctions
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#080E1E] border border-[#1E3159] flex items-center gap-2.5 text-slate-300">
                  <Sparkles size={16} className="text-[#F3C55B] shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    BIS Hallmarking Live Appraisals
                  </span>
                </div>
              </div>
            </div>
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
