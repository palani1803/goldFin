import { useState } from 'react'
import { Coins, Menu, X } from 'lucide-react'

export interface NavbarProps {
  currentPage?: 'home' | 'live-rate' | 'gold-loan' | 'about' | 'contact'
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateContact?: () => void
  onScrollToSection?: (sectionId: string) => void
  spotRate24K?: number
}

export default function Navbar({
  currentPage = 'home',
  onNavigateHome,
  onNavigateAbout,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateContact,
  onScrollToSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (action: 'home' | 'about' | 'live-rate' | 'gold-loan' | 'contact' | string) => {
    setMobileMenuOpen(false)
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
      if (currentPage !== 'home' && onNavigateHome) {
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
    <header className="sticky top-0 z-50 w-full bg-[#070D1E]/85 backdrop-blur-xl border-b border-[#1E3159]/60">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 flex items-center justify-between h-[78px]">
        {/* Brand Logo (Left Side) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 no-underline cursor-pointer group bg-transparent border-0 p-0 text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F3C55B] via-[#DAAE4D] to-[#C89B2A] flex items-center justify-center text-[#070D1E] shadow-[0_6px_30px_rgba(234,179,8,0.35)] group-hover:scale-105 transition-transform shrink-0">
            <Coins size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#DAAE4D] transition-colors">
              GoldFin
            </span>
            <span className="text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#C89B2A]/10 border border-[#C89B2A]/30 text-[#DAAE4D]">
              LIVE GOLD RATES & LOANS
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Aligned to the Right Side: Home -> Live Rates -> Gold Loan -> About Us) */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          {/* 1. Home Link */}
          <button
            onClick={() => handleNavClick('home')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer relative ${
              currentPage === 'home' ? 'text-white font-bold' : 'text-slate-400 hover:text-[#DAAE4D]'
            }`}
          >
            <span>Home</span>
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#F3C55B] to-[#C89B2A] rounded-full shadow-[0_0_8px_rgba(218,174,77,0.8)]" />
            )}
          </button>

          {/* 2. Live Rates Tab (Highlighted if active page) */}
          <button
            onClick={() => handleNavClick('live-rate')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer flex items-center gap-2 relative ${
              currentPage === 'live-rate'
                ? 'text-[#DAAE4D] font-bold'
                : 'text-slate-400 hover:text-[#DAAE4D]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Rates</span>
            {currentPage === 'live-rate' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#F3C55B] to-[#C89B2A] rounded-full shadow-[0_0_8px_rgba(218,174,77,0.8)]" />
            )}
          </button>

          {/* 3. Gold Loan Tab (Highlighted if active page) */}
          <button
            onClick={() => handleNavClick('gold-loan')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer flex items-center gap-2 relative ${
              currentPage === 'gold-loan'
                ? 'text-[#DAAE4D] font-bold'
                : 'text-slate-400 hover:text-[#DAAE4D]'
            }`}
          >
            <span>Gold Loan</span>
            {currentPage === 'gold-loan' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#F3C55B] to-[#C89B2A] rounded-full shadow-[0_0_8px_rgba(218,174,77,0.8)]" />
            )}
          </button>

          {/* 4. About Us Tab */}
          <button
            onClick={() => handleNavClick('about')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer relative ${
              currentPage === 'about'
                ? 'text-[#DAAE4D] font-bold'
                : 'text-slate-400 hover:text-[#DAAE4D]'
            }`}
          >
            <span>About Us</span>
            {currentPage === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#F3C55B] to-[#C89B2A] rounded-full shadow-[0_0_8px_rgba(218,174,77,0.8)]" />
            )}
          </button>

          {/* 5. Contact Tab */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer relative ${
              currentPage === 'contact'
                ? 'text-[#DAAE4D] font-bold'
                : 'text-slate-400 hover:text-[#DAAE4D]'
            }`}
          >
            <span>Contact</span>
            {currentPage === 'contact' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#F3C55B] to-[#C89B2A] rounded-full shadow-[0_0_8px_rgba(218,174,77,0.8)]" />
            )}
          </button>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white border-0 cursor-pointer ml-auto"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1329] border-b border-[#1E3159] px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left text-sm font-semibold text-slate-300 hover:text-[#DAAE4D] py-1 bg-transparent border-0 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('live-rate')}
            className="text-left text-sm font-bold text-[#DAAE4D] py-1 bg-transparent border-0 cursor-pointer flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Rates</span>
          </button>
          <button
            onClick={() => handleNavClick('gold-loan')}
            className="text-left text-sm font-bold text-[#DAAE4D] py-1 bg-transparent border-0 cursor-pointer"
          >
            Gold Loan
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="text-left text-sm font-bold text-[#DAAE4D] py-1 bg-transparent border-0 cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-left text-sm font-bold text-[#DAAE4D] py-1 bg-transparent border-0 cursor-pointer"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  )
}
