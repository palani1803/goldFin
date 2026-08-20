import { Coins, Mail, ShieldCheck, ArrowUpRight } from 'lucide-react'

export interface FooterProps {
  onNavigateHome?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: () => void
  onScrollToSection?: (sectionId: string) => void
}

export default function Footer({
  onNavigateHome,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateAbout,
  onNavigateContact,
  onScrollToSection,
}: FooterProps) {
  const handleLinkClick = (action: 'home' | 'live-rate' | 'gold-loan' | 'about' | 'contact' | string) => {
    if (action === 'home') {
      if (onNavigateHome) onNavigateHome()
      else window.location.hash = '#home'
    } else if (action === 'live-rate') {
      if (onNavigateLiveRate) onNavigateLiveRate()
      else window.location.hash = '#live-rate'
    } else if (action === 'gold-loan') {
      if (onNavigateGoldLoan) onNavigateGoldLoan()
      else window.location.hash = '#gold-loan'
    } else if (action === 'about') {
      if (onNavigateAbout) onNavigateAbout()
      else window.location.hash = '#about'
    } else if (action === 'contact') {
      if (onNavigateContact) onNavigateContact()
      else window.location.hash = '#contact'
    } else if (onScrollToSection) {
      if (onNavigateHome) {
        onNavigateHome()
        setTimeout(() => {
          onScrollToSection(action)
        }, 100)
      } else {
        onScrollToSection(action)
      }
    }
  }

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/95 backdrop-blur-xl py-16 relative z-10 w-full">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => handleLinkClick('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] via-[#F97316] to-[#EA580C] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Coins size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  GoldFin
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[#FF6B00]">
                  LIVE GOLD RATES & LOANS
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Live 22K & 24K gold rates, instant gold loan calculator, and transparent GST breakdown across India.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>BIS Hallmarked Gold (24K Pure & 22K 916)</span>
            </div>
          </div>

          {/* Col 2: Platform Features */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0">
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('about')}
                >
                  About GoldFin
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left flex items-center gap-1"
                  onClick={() => handleLinkClick('live-rate')}
                >
                  <span>24K & 22K Live Gold Rates</span>
                  <ArrowUpRight size={12} className="text-[#FF6B00]" />
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('gold-loan')}
                >
                  Instant Gold Loan
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('calculator')}
                >
                  Live Gold Calculator
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('contact')}
                >
                  Contact & Advisory Desk
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('faq')}
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Gold Guides & News */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Gold Guides & News
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0">
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('analysis')}
                >
                  RBI Gold Reserves Update
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('analysis')}
                >
                  Digital Gold vs Sovereign Gold Bonds (SGB)
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('tips')}
                >
                  Gold Buying & Purity Guide
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('tips')}
                >
                  Best Gold Loan Interest Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Customer Support
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Have questions about today's gold rates, applying for a gold loan, or calculating your jewellery value?
            </p>
            <a
              href="mailto:support@goldfin.in"
              className="flex items-center gap-2 text-[#FF6B00] hover:text-[#EA580C] font-bold text-xs transition-colors no-underline"
            >
              <Mail size={16} />
              <span>support@goldfin.in</span>
            </a>
            <span className="text-[11px] text-slate-500 font-medium">
              Chennai • Mumbai • Delhi • Bengaluru • Hyderabad
            </span>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 mt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <span>© 2026 GoldFin. All rights reserved. Live rates benchmarked from Indian gold market (IBJA & MCX).</span>
          <span>Privacy Policy • Terms of Service • Hallmark Standards</span>
        </div>
      </div>
    </footer>
  )
}
