import { Coins, Mail, ShieldCheck, ArrowUpRight } from 'lucide-react'

export interface FooterProps {
  onNavigateHome?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateAbout?: () => void
  onScrollToSection?: (sectionId: string) => void
}

export default function Footer({
  onNavigateHome,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateAbout,
  onScrollToSection,
}: FooterProps) {
  const handleLinkClick = (action: 'home' | 'live-rate' | 'gold-loan' | 'about' | string) => {
    if (action === 'home') {
      if (onNavigateHome) onNavigateHome()
    } else if (action === 'live-rate') {
      if (onNavigateLiveRate) onNavigateLiveRate()
    } else if (action === 'gold-loan') {
      if (onNavigateGoldLoan) onNavigateGoldLoan()
    } else if (action === 'about') {
      if (onNavigateAbout) onNavigateAbout()
      else window.location.hash = '#about'
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
    <footer className="mt-20 border-t border-white/10 bg-[#121212]/95 backdrop-blur-xl py-16 relative z-10 w-full">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => handleLinkClick('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] flex items-center justify-center text-[#121212] shadow-md group-hover:scale-105 transition-transform">
                <Coins size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white group-hover:text-[#DAAE4D] transition-colors">
                  GoldFin
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[#DAAE4D]">
                  INSTITUTIONAL BULLION
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Institutional grade precious metal intelligence, real-time purity rate tracking, and tax calculation platform across India.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <ShieldCheck size={14} />
              <span>BIS Hallmarked Standards (999.9 & 916)</span>
            </div>
          </div>

          {/* Col 2: Platform Features */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Platform Features
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0">
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('about')}
                >
                  About GoldFin
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left flex items-center gap-1"
                  onClick={() => handleLinkClick('live-rate')}
                >
                  <span>24K & 22K Live Rates</span>
                  <ArrowUpRight size={12} className="text-[#DAAE4D]" />
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('live-rate')}
                >
                  Silver 999 Rates
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('calculator')}
                >
                  Live Gold Calculator
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('faq')}
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Market Research */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Market Research
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0">
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('analysis')}
                >
                  Central Bank Gold Reserve Report
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('analysis')}
                >
                  Digital Gold vs Sovereign Bonds (SGB)
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('tips')}
                >
                  Precious Metal Investment Guide
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-400 hover:text-[#DAAE4D] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('tips')}
                >
                  Gold Loan Scheme Comparisons
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Desk */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Institutional Desk
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions regarding institutional bullion pricing, custom metal valuation, or API integrations?
            </p>
            <a
              href="mailto:desk@goldfin.investments"
              className="flex items-center gap-2 text-[#DAAE4D] hover:text-[#F3C55B] font-bold text-xs transition-colors no-underline"
            >
              <Mail size={16} />
              <span>desk@goldfin.investments</span>
            </a>
            <span className="text-[11px] text-slate-500 font-medium">
              Mumbai • Bengaluru • Delhi • Chennai
            </span>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <span>© 2026 GoldFin Inc. All rights reserved. Rates updated continuously from official bullion exchange feeds.</span>
          <span>Privacy Policy • Terms of Service • Compliance Standards</span>
        </div>
      </div>
    </footer>
  )
}
