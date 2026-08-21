import { useState } from 'react'
import { Coins, Menu, X } from 'lucide-react'

export interface NavbarProps {
  currentPage?: 'home' | 'live-rate' | 'gold-loan' | 'branches' | 'about' | 'contact'
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
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
  onNavigateBranches,
  onNavigateContact,
  onScrollToSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (action: 'home' | 'about' | 'live-rate' | 'gold-loan' | 'branches' | 'contact' | string) => {
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
    } else if (action === 'branches') {
      if (onNavigateBranches) onNavigateBranches()
      else window.location.hash = '#branches'
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
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 flex items-center justify-between h-[78px]">
        {/* Brand Logo (Left Side) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 no-underline cursor-pointer group bg-transparent border-0 p-0 text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B00] via-[#F97316] to-[#EA580C] flex items-center justify-center text-white shadow-[0_4px_20px_rgba(249,115,22,0.35)] group-hover:scale-105 transition-transform shrink-0">
            <Coins size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#FF6B00] transition-colors">
              GoldFin
            </span>
            <span className="text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600">
              LIVE GOLD RATES & LOANS
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          {/* 1. Home Link */}
          <button
            onClick={() => handleNavClick('home')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer relative ${
              currentPage === 'home' ? 'text-[#FF6B00] font-bold' : 'text-slate-600 hover:text-[#FF6B00]'
            }`}
          >
            <span>Home</span>
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            )}
          </button>

          {/* 2. Live Rates Tab */}
          <button
            onClick={() => handleNavClick('live-rate')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer flex items-center gap-2 relative ${
              currentPage === 'live-rate'
                ? 'text-[#FF6B00] font-bold'
                : 'text-slate-600 hover:text-[#FF6B00]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Rates</span>
            {currentPage === 'live-rate' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            )}
          </button>

          {/* 3. Gold Loan Tab */}
          <button
            onClick={() => handleNavClick('gold-loan')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer flex items-center gap-2 relative ${
              currentPage === 'gold-loan'
                ? 'text-[#FF6B00] font-bold'
                : 'text-slate-600 hover:text-[#FF6B00]'
            }`}
          >
            <span>Gold Loan</span>
            {currentPage === 'gold-loan' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            )}
          </button>

          {/* 4. Branches Tab (Positioned immediately after Gold Loan) */}
          <button
            onClick={() => handleNavClick('branches')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer relative ${
              currentPage === 'branches'
                ? 'text-[#FF6B00] font-bold'
                : 'text-slate-600 hover:text-[#FF6B00]'
            }`}
          >
            <span>Branches</span>
            {currentPage === 'branches' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            )}
          </button>

          {/* 5. About Us Tab */}
          <button
            onClick={() => handleNavClick('about')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer relative ${
              currentPage === 'about'
                ? 'text-[#FF6B00] font-bold'
                : 'text-slate-600 hover:text-[#FF6B00]'
            }`}
          >
            <span>About Us</span>
            {currentPage === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            )}
          </button>

          {/* 6. Contact Tab */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-sm font-semibold transition-colors py-2 bg-transparent border-0 cursor-pointer relative ${
              currentPage === 'contact'
                ? 'text-[#FF6B00] font-bold'
                : 'text-slate-600 hover:text-[#FF6B00]'
            }`}
          >
            <span>Contact</span>
            {currentPage === 'contact' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF6B00] to-[#EA580C] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            )}
          </button>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 cursor-pointer ml-auto"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-3 shadow-xl animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left text-sm font-semibold py-2 px-3 rounded-lg bg-transparent border-0 cursor-pointer ${
              currentPage === 'home' ? 'text-[#FF6B00] font-bold bg-orange-50' : 'text-slate-700 hover:text-[#FF6B00]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('live-rate')}
            className={`text-left text-sm font-bold py-2 px-3 rounded-lg bg-transparent border-0 cursor-pointer flex items-center gap-2 ${
              currentPage === 'live-rate' ? 'text-[#FF6B00] bg-orange-50' : 'text-slate-700 hover:text-[#FF6B00]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Rates</span>
          </button>
          <button
            onClick={() => handleNavClick('gold-loan')}
            className={`text-left text-sm font-semibold py-2 px-3 rounded-lg bg-transparent border-0 cursor-pointer ${
              currentPage === 'gold-loan' ? 'text-[#FF6B00] font-bold bg-orange-50' : 'text-slate-700 hover:text-[#FF6B00]'
            }`}
          >
            Gold Loan
          </button>
          <button
            onClick={() => handleNavClick('branches')}
            className={`text-left text-sm font-semibold py-2 px-3 rounded-lg bg-transparent border-0 cursor-pointer ${
              currentPage === 'branches' ? 'text-[#FF6B00] font-bold bg-orange-50' : 'text-slate-700 hover:text-[#FF6B00]'
            }`}
          >
            Branches
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`text-left text-sm font-semibold py-2 px-3 rounded-lg bg-transparent border-0 cursor-pointer ${
              currentPage === 'about' ? 'text-[#FF6B00] font-bold bg-orange-50' : 'text-slate-700 hover:text-[#FF6B00]'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-left text-sm font-semibold py-2 px-3 rounded-lg bg-transparent border-0 cursor-pointer ${
              currentPage === 'contact' ? 'text-[#FF6B00] font-bold bg-orange-50' : 'text-slate-700 hover:text-[#FF6B00]'
            }`}
          >
            Contact
          </button>
        </div>
      )}
    </header>
  )
}
