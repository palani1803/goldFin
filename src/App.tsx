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
    const iconUrl = settings.logoUrl || '/mahesbankers.png'
    const linkEl = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null
    if (linkEl) {
      linkEl.href = iconUrl
    }
  }, [settings.siteName, settings.tagline, settings.logoUrl])

  const [selectedBranchCity, setSelectedBranchCity] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path === '/contact') {
        const params = new URLSearchParams(window.location.search)
        return params.get('city') || params.get('branch') || localStorage.getItem('selectedContactBranch') || null
      }
    }
    return null
  })

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path === '/admin') {
        // Check if admin is authenticated
        const token = localStorage.getItem('adminToken')
        return token ? 'admin' : 'admin-login'
      }
      if (path === '/admin-login') return 'admin-login'
      if (path === '/contact') return 'contact'
      if (path === '/about') return 'about'
      if (path === '/branches') return 'branches'
      if (path === '/gold-loan') return 'gold-loan'
      if (path === '/live-rate') return 'live-rate'
    }
    return 'home'
  })

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      const params = new URLSearchParams(window.location.search)
      const branchCity = params.get('city') || params.get('branch')
      if (branchCity) {
        setSelectedBranchCity(branchCity)
        localStorage.setItem('selectedContactBranch', branchCity)
      }

      if (path === '/admin') {
        const token = localStorage.getItem('adminToken')
        setCurrentPage(token ? 'admin' : 'admin-login')
      } else if (path === '/admin-login') {
        setCurrentPage('admin-login')
      } else if (path === '/contact') {
        setCurrentPage('contact')
      } else if (path === '/about') {
        setCurrentPage('about')
      } else if (path === '/branches') {
        setCurrentPage('branches')
      } else if (path === '/gold-loan') {
        setCurrentPage('gold-loan')
      } else if (path === '/live-rate') {
        setCurrentPage('live-rate')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (page: PageType, branchCity?: string) => {
    if (branchCity) {
      setSelectedBranchCity(branchCity)
      localStorage.setItem('selectedContactBranch', branchCity)
      const url = page === 'contact' ? `/contact?city=${encodeURIComponent(branchCity)}` : `/${page}`
      window.history.pushState(null, '', url)
    } else {
      window.history.pushState(null, '', page === 'home' ? '/' : `/${page}`)
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
