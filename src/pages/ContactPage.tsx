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
    navigator.clipboard?.writeText('9092548347')
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500/20 selection:text-orange-900 relative">
      {/* Reusable White & Orange Ambient Background */}
      <GoldBackground textureOpacity={0.03} showGlows={true} />

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
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#FF6B00] transition-colors bg-transparent border-0 p-0 cursor-pointer text-slate-500"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#FF6B00] font-bold">Contact & Branch Location</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold tracking-wider w-fit uppercase">
            <Sparkles size={14} />
            <span>SIVAKASI BRANCH & CLIENT ADVISORY DESK</span>
          </div>
        </div>

        {/* 2-Column Main Section (Get in Touch & Sivakasi Map Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Get in Touch & Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                Get in <span className="bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Our bullion and gold loan advisory team is standing by to assist you. Visit our Sivakasi branch for verified BIS hallmarking appraisals and instant gold loans.
              </p>
            </div>

            {/* 4 Contact Information Cards */}
            <div className="flex flex-col gap-3.5">
              {/* 1. Branch Location (Sivakasi) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] group">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    SIVAKASI MAIN BRANCH & VAULT
                  </span>
                  <span className="text-sm md:text-base font-extrabold text-slate-900 mt-0.5">
                    GoldFin Bullion Center, Kamarajar Road
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Near Old Bus Stand, Sivakasi, Tamil Nadu 626123
                  </span>
                </div>
              </div>

              {/* 2. Priority Line */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] group">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    PRIORITY TOLL-FREE LINE
                  </span>
                  <div className="flex items-center gap-3 mt-0.5">
                    <a
                      href="tel:+919092548347"
                      className="text-sm md:text-base font-black text-slate-900 hover:text-[#FF6B00] transition-colors no-underline"
                    >
                      +91 90925 48347
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 transition-colors border border-slate-200 cursor-pointer"
                    >
                      {copiedPhone ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Direct access to Gold Rate Desk & Loan Appraisals
                  </span>
                </div>
              </div>

              {/* 3. Digital Concierge */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] group">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                  <Mail size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    DIGITAL CONCIERGE & ADVISORY
                  </span>
                  <a
                    href="mailto:support@goldfin.in"
                    className="text-sm md:text-base font-black text-slate-900 hover:text-[#FF6B00] transition-colors mt-0.5 no-underline"
                  >
                    support@goldfin.in
                  </a>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Local branch email: <span className="text-slate-700 font-medium">sivakasi@goldfin.in</span>
                  </span>
                </div>
              </div>

              {/* 3.5. WhatsApp Business */}
              <a
                href="https://wa.me/919092548347?text=Hi%20GoldFin%2C%20I%20would%20like%20to%20know%20more%20about%20your%20gold%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/40 transition-all flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(16,185,129,0.12)] group no-underline cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#25D366] group-hover:to-[#128C7E] group-hover:text-white transition-all shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">
                    WHATSAPP BUSINESS
                  </span>
                  <span className="text-sm md:text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors mt-0.5">
                    +91 90925 48347
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Chat with our gold advisory team instantly on WhatsApp
                  </span>
                </div>
              </a>

              {/* 4. Business Hours */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-500/35 transition-all flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.1)] group">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#FF6B00] group-hover:to-[#EA580C] group-hover:text-white transition-all shadow-sm">
                  <Clock size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                    BRANCH BUSINESS HOURS (IST)
                  </span>
                  <span className="text-sm md:text-base font-extrabold text-slate-900 mt-0.5">
                    Mon–Sat: 9:00 AM – 6:30 PM
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">
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
                className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#F97316] to-[#EA580C] text-white font-extrabold text-xs hover:brightness-110 transition-all shadow-[0_6px_25px_rgba(249,115,22,0.35)] no-underline flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation size={15} />
                <span>Get Directions</span>
              </a>
              <a
                href="tel:+919092548347"
                className="py-3.5 px-5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:border-orange-500/40 hover:text-[#FF6B00] font-bold text-xs transition-all no-underline flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Phone size={15} className="text-[#FF6B00]" />
                <span>Call Branch</span>
              </a>
              <a
                href="https://wa.me/919092548347?text=Hi%20GoldFin%2C%20I%20would%20like%20to%20know%20more%20about%20your%20gold%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-xl bg-[#25D366] border border-[#20BD5A] text-white hover:brightness-110 font-bold text-xs transition-all no-underline flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(37,211,102,0.3)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dedicated Sivakasi Map Container */}
          <div className="lg:col-span-7 relative flex flex-col h-full min-h-[560px]">
            {/* Ambient Map Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-200/30 via-amber-100/30 to-orange-200/20 blur-xl pointer-events-none" />

            {/* Map Card Wrapper */}
            <div className="relative h-full w-full rounded-3xl bg-white border border-slate-200/80 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden p-4 sm:p-5 gap-4">
              {/* Map Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/80 text-orange-600 flex items-center justify-center shrink-0">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Sivakasi Branch & Vault Map
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Virudhunagar District, Tamil Nadu • PIN 626123
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Branch Open</span>
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Sivakasi,+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 transition-colors flex items-center gap-1 no-underline"
                  >
                    <span>Full Screen</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Interactive Google Map of Sivakasi */}
              <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  title="Sivakasi Branch Map"
                  src="https://maps.google.com/maps?q=Sivakasi,+Tamil+Nadu,+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Gold Branch Pin Badge */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-white/95 border border-orange-300 backdrop-blur-md shadow-lg flex items-center gap-2 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-wider">
                      GOLDFIN SIVAKASI HUB
                    </span>
                    <span className="text-[9px] text-slate-700 font-semibold">
                      Kamarajar Road Bullion Desk
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature & Navigation Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-slate-700">
                  <ShieldCheck size={16} className="text-[#FF6B00] shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    100% Insured Bank Vault Storage
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    Instant 15-Min Loan Sanctions
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-slate-700">
                  <Sparkles size={16} className="text-orange-500 shrink-0" />
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
