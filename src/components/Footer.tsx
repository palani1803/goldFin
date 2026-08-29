import { useState, useEffect } from 'react'
import { Coins, Mail, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { useSiteSettings } from '../hooks/useSiteSettings'

export interface FooterProps {
  onNavigateHome?: () => void
  onNavigateLiveRate?: () => void
  onNavigateGoldLoan?: () => void
  onNavigateBranches?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: (city?: string) => void
  onScrollToSection?: (sectionId: string) => void
}

interface FooterBranch {
  id: string
  name: string
  city: string
}

const DEFAULT_FOOTER_BRANCHES: FooterBranch[] = [
  { id: 'sivakasi', name: 'Sivakasi Branch', city: 'Sivakasi' },
  { id: 'srivilliputhur', name: 'Srivilliputhur Branch', city: 'Srivilliputhur' },
  { id: 'puthupatti', name: 'M.Puthupatti Branch', city: 'M.Puthupatti' },
  { id: 'rajapalayam', name: 'Rajapalayam Branch', city: 'Rajapalayam' },
]

export default function Footer({
  onNavigateHome,
  onNavigateLiveRate,
  onNavigateGoldLoan,
  onNavigateBranches,
  onNavigateAbout,
  onNavigateContact,
  onScrollToSection,
}: FooterProps) {
  const [branches, setBranches] = useState<FooterBranch[]>(DEFAULT_FOOTER_BRANCHES)
  const { settings } = useSiteSettings()

  useEffect(() => {
    fetch('/api/branches')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const active = json.data
            .filter((b: any) => b.isActive !== false)
            .map((b: any) => ({
              id: b._id || b.city.toLowerCase(),
              name: b.name,
              city: b.city,
            }))
          setBranches(active)
        }
      })
      .catch(() => {})
  }, [])

  const handleLinkClick = (action: 'home' | 'live-rate' | 'gold-loan' | 'branches' | 'about' | 'contact' | string) => {
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

  const getLocalizedBranchName = (b: FooterBranch) => {
    const c = b.city.toLowerCase()
    if (c.includes('sivakasi')) return 'Sivakasi Main Branch'
    if (c.includes('srivilliputhur')) return 'Srivilliputhur Branch'
    if (c.includes('puthupatti')) return 'M.Puthupatti Branch'
    if (c.includes('rajapalayam')) return 'Rajapalayam Branch'
    if (c.includes('chennai')) return 'Chennai Metro Desk'
    return `${b.name} (${b.city})`
  }

  const cityListString = branches.map((b) => b.city).join(' • ')

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
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.siteName || 'Mahes Bankers'}
                  className="h-10 max-w-[150px] object-contain group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] via-[#F97316] to-[#EA580C] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Coins size={22} />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                  {settings.siteName || 'Mahes Bankers'}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-[#FF6B00]">
                  {settings.tagline || 'Live Rates & Gold Loans'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tamil Nadu's premier platform for real-time gold market benchmarks, transparent 1g valuation, and instant 15-minute gold loans.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>100% BIS Hallmark Certified</span>
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
                  onClick={() => handleLinkClick('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left flex items-center gap-1"
                  onClick={() => handleLinkClick('live-rate')}
                >
                  <span>Live Rates</span>
                  <ArrowUpRight size={12} className="text-[#FF6B00]" />
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('gold-loan')}
                >
                  Gold Loan
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('branches')}
                >
                  Branches
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  onClick={() => handleLinkClick('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Regional Desks */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Our Branches
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0">
              {branches.map((b) => (
                <li key={b.id}>
                  <button
                    className="text-xs text-slate-600 hover:text-[#FF6B00] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                    onClick={() => onNavigateContact ? onNavigateContact(b.city) : handleLinkClick('contact')}
                  >
                    {getLocalizedBranchName(b)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Support & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Customer Support
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.operatingHours || 'Monday–Saturday: 9:00 AM – 6:30 PM'}
            </p>
            <a
              href={`mailto:${settings.contactEmail || 'contact@mahesbankers.com'}`}
              className="flex items-center gap-2 text-[#FF6B00] hover:text-[#EA580C] font-bold text-xs transition-colors no-underline"
            >
              <Mail size={16} />
              <span>{settings.contactEmail || 'contact@mahesbankers.com'}</span>
            </a>
            <a
              href={`tel:${(settings.contactPhone || '+91 90925 48347').replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2 text-slate-700 hover:text-[#FF6B00] font-bold text-xs transition-colors no-underline"
            >
              <Phone size={16} className="text-[#FF6B00]" />
              <span>{settings.contactPhone || '+91 90925 48347'}</span>
            </a>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 mt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <span>© {new Date().getFullYear()} {settings.siteName || 'Mahes Bankers'}. All Rights Reserved. Compliant with RBI guidelines.</span>
          <span>{cityListString}</span>
        </div>
      </div>
    </footer>
  )
}
