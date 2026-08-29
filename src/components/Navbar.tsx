import { useState } from 'react'
import { Coins, Menu, X } from 'lucide-react'
import { useSiteSettings } from '../hooks/useSiteSettings'

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
  const { settings } = useSiteSettings()

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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 flex items-center justify-between h-[68px] sm:h-[78px]">
        {/* Brand Logo (Left Side) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 no-underline cursor-pointer group bg-transparent border-0 p-0 text-left shrink-0"
        >
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt={settings.siteName || 'Mahes Bankers'}
              className="h-10 sm:h-12 max-w-[140px] sm:max-w-[180px] object-contain group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF6B00] via-[#F97316] to-[#EA580C] flex items-center justify-center text-white shadow-[0_4px_20px_rgba(249,115,22,0.35)] group-hover:scale-105 transition-transform shrink-0">
              <Coins size={20} className="sm:hidden" />
              <Coins size={24} className="hidden sm:block" />
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-none sm:leading-tight">
              {settings.siteName || 'Mahes Bankers'}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 whitespace-nowrap mt-0.5">
              {settings.tagline || 'Live Rates & Gold Loans'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 ml-auto">
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

          {/* 4. Branches Tab */}
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

        {/* Mobile Actions: Hamburger */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 cursor-pointer active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 py-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left text-sm font-bold py-3 px-4 rounded-xl bg-transparent border-0 cursor-pointer flex items-center justify-between min-h-[44px] ${
              currentPage === 'home' ? 'text-[#FF6B00] bg-orange-50/90' : 'text-slate-700 hover:text-[#FF6B00] hover:bg-slate-50'
            }`}
          >
            <span>Home</span>
          </button>
          <button
            onClick={() => handleNavClick('live-rate')}
            className={`text-left text-sm font-bold py-3 px-4 rounded-xl bg-transparent border-0 cursor-pointer flex items-center justify-between min-h-[44px] ${
              currentPage === 'live-rate' ? 'text-[#FF6B00] bg-orange-50/90' : 'text-slate-700 hover:text-[#FF6B00] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Gold Rates</span>
            </div>
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Live</span>
          </button>
          <button
            onClick={() => handleNavClick('gold-loan')}
            className={`text-left text-sm font-bold py-3 px-4 rounded-xl bg-transparent border-0 cursor-pointer flex items-center justify-between min-h-[44px] ${
              currentPage === 'gold-loan' ? 'text-[#FF6B00] bg-orange-50/90' : 'text-slate-700 hover:text-[#FF6B00] hover:bg-slate-50'
            }`}
          >
            <span>Gold Loan (15-Min)</span>
          </button>
          <button
            onClick={() => handleNavClick('branches')}
            className={`text-left text-sm font-bold py-3 px-4 rounded-xl bg-transparent border-0 cursor-pointer flex items-center justify-between min-h-[44px] ${
              currentPage === 'branches' ? 'text-[#FF6B00] bg-orange-50/90' : 'text-slate-700 hover:text-[#FF6B00] hover:bg-slate-50'
            }`}
          >
            <span>Branches & Vaults</span>
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`text-left text-sm font-bold py-3 px-4 rounded-xl bg-transparent border-0 cursor-pointer flex items-center justify-between min-h-[44px] ${
              currentPage === 'about' ? 'text-[#FF6B00] bg-orange-50/90' : 'text-slate-700 hover:text-[#FF6B00] hover:bg-slate-50'
            }`}
          >
            <span>About Us</span>
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-left text-sm font-bold py-3 px-4 rounded-xl bg-transparent border-0 cursor-pointer flex items-center justify-between min-h-[44px] ${
              currentPage === 'contact' ? 'text-[#FF6B00] bg-orange-50/90' : 'text-slate-700 hover:text-[#FF6B00] hover:bg-slate-50'
            }`}
          >
            <span>Contact & Support</span>
          </button>
        </div>
      )}
    </header>
  )
}
