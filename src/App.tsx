import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import LiveRatePage from './pages/LiveRatePage'
import GoldLoanPage from './pages/GoldLoanPage'
import BranchesPage from './pages/BranchesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { AdminLoginPage, AdminLayout } from './pages/admin'
import { LanguageProvider } from './i18n'
import { WhatsAppFloat } from './components'
import { useSiteSettings } from './hooks/useSiteSettings'

type PageType = 'home' | 'live-rate' | 'gold-loan' | 'branches' | 'about' | 'contact' | 'admin-login' | 'admin'

function App() {
  const { settings } = useSiteSettings()

  useEffect(() => {
    if (settings.siteName) {
      document.title = `${settings.siteName} - ${settings.tagline || 'Live Rates & Gold Loans'}`
    }
  }, [settings.siteName, settings.tagline])

  const [selectedBranchCity, setSelectedBranchCity] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash.startsWith('#contact')) {
        const queryStr = hash.includes('?') ? hash.split('?')[1] : ''
        const params = new URLSearchParams(queryStr)
        return params.get('city') || params.get('branch') || localStorage.getItem('selectedContactBranch') || null
      }
    }
    return null
  })

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.split('?')[0]
      if (hash === '#admin') {
        // Check if admin is authenticated
        const token = localStorage.getItem('adminToken')
        return token ? 'admin' : 'admin-login'
      }
      if (hash === '#admin-login') return 'admin-login'
      if (hash === '#contact') return 'contact'
      if (hash === '#about') return 'about'
      if (hash === '#branches') return 'branches'
      if (hash === '#gold-loan') return 'gold-loan'
      if (hash === '#live-rate') return 'live-rate'
    }
    return 'home'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash
      const [hashPath, hashQuery] = rawHash.split('?')
      const params = new URLSearchParams(hashQuery || '')
      const branchCity = params.get('city') || params.get('branch')
      if (branchCity) {
        setSelectedBranchCity(branchCity)
        localStorage.setItem('selectedContactBranch', branchCity)
      }

      if (hashPath === '#admin') {
        const token = localStorage.getItem('adminToken')
        setCurrentPage(token ? 'admin' : 'admin-login')
      } else if (hashPath === '#admin-login') {
        setCurrentPage('admin-login')
      } else if (hashPath === '#contact') {
        setCurrentPage('contact')
      } else if (hashPath === '#about') {
        setCurrentPage('about')
      } else if (hashPath === '#branches') {
        setCurrentPage('branches')
      } else if (hashPath === '#gold-loan') {
        setCurrentPage('gold-loan')
      } else if (hashPath === '#live-rate') {
        setCurrentPage('live-rate')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (page: PageType, branchCity?: string) => {
    if (branchCity) {
      setSelectedBranchCity(branchCity)
      localStorage.setItem('selectedContactBranch', branchCity)
      window.location.hash = page === 'contact' ? `#contact?city=${encodeURIComponent(branchCity)}` : `#${page}`
    } else {
      window.location.hash = page === 'home' ? '#home' : `#${page}`
    }
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Admin Login Page — standalone, no Navbar/Footer
  if (currentPage === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={() => navigateTo('admin')}
        onNavigateHome={() => navigateTo('home')}
      />
    )
  }

  // Admin Panel — standalone layout with sidebar
  if (currentPage === 'admin') {
    return (
      <AdminLayout
        onLogout={() => navigateTo('admin-login')}
        onNavigateHome={() => navigateTo('home')}
      />
    )
  }

  // Public pages wrapped in LanguageProvider
  return (
    <LanguageProvider>
      <div className="w-full min-h-screen bg-[#F8FAFC]">
        {currentPage === 'contact' ? (
          <ContactPage
            initialCity={selectedBranchCity}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'about' ? (
          <AboutPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'branches' ? (
          <BranchesPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'gold-loan' ? (
          <GoldLoanPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        ) : currentPage === 'live-rate' ? (
          <LiveRatePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
            onNavigateTo={(page) => navigateTo(page as any)}
          />
        ) : (
          <HomePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateLiveRate={() => navigateTo('live-rate')}
            onNavigateGoldLoan={() => navigateTo('gold-loan')}
            onNavigateBranches={() => navigateTo('branches')}
            onNavigateContact={(city?: string) => navigateTo('contact', city)}
          />
        )}

        {/* Global WhatsApp Floating Desk on Customer Pages */}
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  )
}

export default App
